const express = require('express');
const router = express.Router();
const axios = require('axios');
const Submission = require('../models/Submission');
const Problem = require('../models/Problem');
const User = require('../models/User');

const PISTON_URL = 'https://emkc.org/api/v2/piston/execute';

const languageMap = {
  javascript: 'javascript',
  typescript: 'typescript',
  python: 'python',
  cpp: 'c++',
  java: 'java',
  c: 'c',
  csharp: 'csharp',
  go: 'go',
  kotlin: 'kotlin',
  sql: 'sqlite3',
  bash: 'bash'
};

const versionMap = {
  javascript: '18.15.0',
  typescript: '5.0.3',
  python: '3.10.0',
  cpp: '10.2.0',
  java: '15.0.2',
  c: '10.2.0',
  csharp: '6.12.0',
  go: '1.16.2',
  kotlin: '1.8.20',
  sql: '3.36.0',
  bash: '5.1.0'
};

// Helper function to execute code via Piston API
const executeCodeHelper = async (language, code, stdin) => {
  try {
    const response = await axios.post(PISTON_URL, {
      language: languageMap[language] || 'javascript',
      version: versionMap[language] || '18.15.0',
      files: [{ content: code }],
      stdin: stdin || ''
    }, { timeout: 8000 }); // 8 seconds timeout
    
    return response.data;
  } catch (err) {
    console.error('Piston Execution Error:', err.message);
    throw new Error('Compiler service timeout or network error');
  }
};

// 1. GET ALL SUBMISSIONS (FOR ADMIN LIVE LOG MONITOR)
router.get('/', async (req, res) => {
  try {
    const { problemId, userId, status, language } = req.query;
    let query = {};

    if (problemId) query.problem = problemId;
    if (userId) query.user = userId;
    if (status && status !== 'All') query.status = status;
    if (language && language !== 'All') query.language = language;

    const submissions = await Submission.find(query)
      .populate('user', 'displayName email')
      .populate('problem', 'title difficulty category points')
      .sort({ createdAt: -1 });

    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch submissions log', details: err.message });
  }
});

// 2. GET SYSTEM-WIDE LEADERBOARD
router.get('/leaderboard', async (req, res) => {
  try {
    // Return users sorted by points. We include banned status so the admin dashboard can see and toggle it.
    const users = await User.find({})
      .select('displayName email scholarPoints currentStreak solvedProblems isBanned')
      .sort({ scholarPoints: -1, displayName: 1 });
    
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard data', details: err.message });
  }
});

// 3. RESET LEADERBOARD
router.post('/leaderboard/reset', async (req, res) => {
  try {
    // Reset points and streaks for all users
    await User.updateMany({}, {
      $set: { scholarPoints: 0, currentStreak: 0, solvedProblems: [] }
    });
    
    // Clear all submissions log
    await Submission.deleteMany({});
    
    res.json({ message: 'Leaderboard and submission history have been fully reset' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reset leaderboard', details: err.message });
  }
});

// 4. BAN / UNBAN SCHOLAR ACCOUNT
router.put('/users/:id/ban', async (req, res) => {
  try {
    const { isBanned } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { isBanned }, { new: true });
    if (!user) return res.status(404).json({ error: 'Scholar not found' });
    
    res.json({ message: `Scholar has been successfully ${isBanned ? 'banned' : 'unbanned'}`, user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle account ban status', details: err.message });
  }
});

// 5. DRY-RUN CODE (FOR CODE EXECUTION & TEST RESULTS PREVIEW)
router.post('/execute', async (req, res) => {
  try {
    const { language, code, stdin } = req.body;
    if (!code) return res.status(400).json({ error: 'Code content required' });

    const result = await executeCodeHelper(language, code, stdin);
    if (result.run) {
      res.json({
        stdout: result.run.stdout,
        stderr: result.run.stderr,
        code: result.run.code,
        signal: result.run.signal
      });
    } else {
      res.status(500).json({ error: 'Compiler executed without return value', details: result.message });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. COMPILE AND SUBMIT PROBLEM (FULL CRITERIA SCORING & persisted stats)
router.post('/submit', async (req, res) => {
  try {
    const { problemId, userId, language, code, contestId } = req.body;

    if (!problemId || !userId || !code || !language) {
      return res.status(400).json({ error: 'Missing mandatory parameters' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Scholar account not found' });
    if (user.isBanned) {
      return res.status(403).json({ error: 'Your account is currently banned from submitting code' });
    }

    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ error: 'Challenge question not found' });

    const testCases = problem.testCases || [];
    if (testCases.length === 0) {
      return res.status(400).json({ error: 'No test cases configured for this problem yet.' });
    }

    let testCasesPassed = 0;
    let status = 'Accepted';
    let runtimeSum = 0;
    let errorDetails = '';

    // Run each testcase in parallel via Piston compiler
    const testcaseRuns = testCases.map(async (tc, index) => {
      try {
        const runRes = await executeCodeHelper(language, code, tc.input);
        
        let passed = false;
        let outcome = 'Wrong Answer';
        let runtime = 50; // default estimated runtime
        let stderr = '';
        
        if (runRes.run) {
          stderr = runRes.run.stderr || '';
          const stdoutClean = (runRes.run.stdout || '').trim().replace(/\r\n/g, '\n');
          const expectedClean = (tc.expectedOutput || '').trim().replace(/\r\n/g, '\n');
          
          if (stderr) {
            outcome = 'Runtime Error';
          } else if (stdoutClean === expectedClean) {
            passed = true;
            outcome = 'Accepted';
          }
        } else {
          outcome = 'Compilation Error';
        }
        
        return { index, passed, outcome, stderr, runtime };
      } catch (err) {
        return { index, passed: false, outcome: 'Compilation Error', stderr: err.message, runtime: 0 };
      }
    });

    const runResults = await Promise.all(testcaseRuns);

    // Calculate pass metric
    runResults.forEach(r => {
      if (r.passed) {
        testCasesPassed++;
      } else {
        // First failing testcase determines the overall status and logs error
        if (status === 'Accepted') {
          status = r.outcome;
          errorDetails = r.stderr || `Test case ${r.index + 1} Failed: Output mismatch`;
        }
      }
      runtimeSum += r.runtime;
    });

    // Score XP calculation
    let pointsEarned = 0;
    if (status === 'Accepted') {
      pointsEarned = problem.points || 100;
      
      // Update solved list & XP score if first time solving
      const alreadySolved = user.solvedProblems.includes(problemId);
      if (!alreadySolved) {
        user.solvedProblems.push(problemId);
        user.scholarPoints += pointsEarned;
        user.currentStreak += 1;
        await user.save();
      }
    } else {
      // Small deduction or simple streak break depending on difficulty
      user.currentStreak = 0;
      await user.save();
    }

    // Save final Submission document
    const submission = new Submission({
      user: userId,
      problem: problemId,
      contest: contestId || null,
      code,
      language,
      status,
      runtime: Math.round(runtimeSum / testCases.length),
      memory: 24, // Estimate for mock sandbox
      testCasesPassed,
      totalTestCases: testCases.length,
      errorDetails,
      pointsEarned
    });

    await submission.save();

    // Recalculate accuracy for problem
    const totalSubs = await Submission.countDocuments({ problem: problemId });
    const passedSubs = await Submission.countDocuments({ problem: problemId, status: 'Accepted' });
    problem.accuracy = totalSubs > 0 ? Number(((passedSubs / totalSubs) * 100).toFixed(1)) : 0;
    await problem.save();

    res.json({
      success: true,
      submission,
      passedCount: testCasesPassed,
      totalCount: testCases.length
    });

  } catch (err) {
    res.status(500).json({ error: 'Failed to process compilation & submission', details: err.message });
  }
});

module.exports = router;
