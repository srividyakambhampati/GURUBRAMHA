const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

// Helper to generate slug
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// 1. GET ALL PROBLEMS WITH SEARCH & FILTERS
router.get('/', async (req, res) => {
  try {
    const { searchQuery, difficulty, category, status, company, level } = req.query;
    let query = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: 'i' } },
        { tags: { $in: [new RegExp(searchQuery, 'i')] } },
        { companyTags: { $in: [new RegExp(searchQuery, 'i')] } }
      ];
    }
    if (difficulty && difficulty !== 'All') {
      query.difficulty = difficulty;
    }
    if (category && category !== 'All') {
      query.category = category;
    }
    if (status && status !== 'All') {
      query.status = status;
    }
    if (company && company !== 'All') {
      query.companyTags = { $in: [new RegExp(company, 'i')] };
    }
    if (level && level !== 'All') {
      query.level = level;
    }

    const problems = await Problem.find(query).sort({ order: 1, createdAt: -1 });
    res.json(problems);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch problems', details: err.message });
  }
});

// 2. GET SINGLE PROBLEM
router.get('/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ error: 'Problem not found' });
    res.json(problem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch problem details', details: err.message });
  }
});

// 3. CREATE PROBLEM
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    if (!data.slug) {
      data.slug = generateSlug(data.title) + '-' + Math.floor(1000 + Math.random() * 9000);
    }
    
    // Set order value to end of list
    const count = await Problem.countDocuments();
    data.order = count;

    const problem = new Problem(data);
    await problem.save();
    res.status(201).json(problem);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create problem', details: err.message });
  }
});

// 4. UPDATE PROBLEM
router.put('/:id', async (req, res) => {
  try {
    const data = req.body;
    if (data.title && !data.slug) {
      data.slug = generateSlug(data.title);
    }
    const problem = await Problem.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!problem) return res.status(404).json({ error: 'Problem not found' });
    res.json(problem);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update problem', details: err.message });
  }
});

// 5. DELETE PROBLEM
router.delete('/:id', async (req, res) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);
    if (!problem) return res.status(404).json({ error: 'Problem not found' });
    res.json({ message: 'Problem deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete problem', details: err.message });
  }
});

// 6. DUPLICATE PROBLEM
router.post('/:id/duplicate', async (req, res) => {
  try {
    const original = await Problem.findById(req.params.id);
    if (!original) return res.status(404).json({ error: 'Original problem not found' });

    const originalObj = original.toObject();
    delete originalObj._id;
    delete originalObj.createdAt;
    delete originalObj.updatedAt;
    
    originalObj.title = `${originalObj.title} (Copy)`;
    originalObj.slug = generateSlug(originalObj.title) + '-' + Math.floor(1000 + Math.random() * 9000);
    originalObj.status = 'Draft'; // Duplicated starts as Draft

    const count = await Problem.countDocuments();
    originalObj.order = count;

    const duplicate = new Problem(originalObj);
    await duplicate.save();
    res.status(201).json(duplicate);
  } catch (err) {
    res.status(400).json({ error: 'Failed to duplicate problem', details: err.message });
  }
});

// 7. DRAG & DROP REORDER PROBLEMS
router.put('/reorder', async (req, res) => {
  try {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ error: 'orderedIds array required' });
    }

    const bulkOps = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { order: index } }
      }
    }));

    await Problem.bulkWrite(bulkOps);
    res.json({ message: 'Reordered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reorder problems', details: err.message });
  }
});

// 8. BULK IMPORT PROBLEMS (With Duplicate Prevention & Safe Sync)
router.post('/import', async (req, res) => {
  try {
    const { problems } = req.body;
    if (!Array.isArray(problems) || problems.length === 0) {
      return res.status(400).json({ error: 'Invalid problems array' });
    }

    const importedProblems = [];
    let duplicateCount = 0;

    for (let prob of problems) {
      if (!prob.title || !prob.description) continue;
      
      // Calculate active slug index
      const targetSlug = prob.slug || (generateSlug(prob.title) + '-' + Math.floor(1000 + Math.random() * 9000));
      
      // Duplicate Prevention by Title or Slug mapping
      const existing = await Problem.findOne({ 
        $or: [
          { title: { $regex: `^${prob.title.trim()}$`, $options: 'i' } },
          { slug: targetSlug }
        ] 
      });

      if (existing) {
        duplicateCount++;
        continue; // Skip duplicate record silently
      }

      prob.slug = targetSlug;
      prob.difficulty = prob.difficulty || 'Easy';
      prob.category = prob.category || 'Arrays';
      prob.points = Number(prob.points) || 100;
      prob.status = prob.status || 'Published'; // Auto-publish seeded challenges
      prob.accuracy = Number(prob.accuracy) || 72.5;
      prob.level = prob.level || 'Intermediate';
      prob.tags = Array.isArray(prob.tags) ? prob.tags : (prob.tags ? prob.tags.split(',').map(t => t.trim()) : []);
      prob.companyTags = Array.isArray(prob.companyTags) ? prob.companyTags : (prob.companyTags ? prob.companyTags.split(',').map(c => c.trim()) : []);

      // Starter code templates default
      if (!prob.starterCode || prob.starterCode.length === 0) {
        prob.starterCode = [
          { language: 'javascript', code: `function solution() {\n  // your code here\n}` },
          { language: 'python', code: `def solution():\n    # your code here\n    pass` }
        ];
      }
      
      // Test cases format check
      if (!prob.testCases || prob.testCases.length === 0) {
        prob.testCases = [
          { input: '1 2', expectedOutput: '3', explanation: 'Sample case', isHidden: false }
        ];
      }

      // Reorder indexing count
      const count = await Problem.countDocuments();
      prob.order = count;

      const problem = new Problem(prob);
      await problem.save();
      importedProblems.push(problem);
    }

    res.status(201).json({ 
      message: `Sync completed successfully. Imported ${importedProblems.length} new problems, skipped ${duplicateCount} duplicate records.`, 
      data: importedProblems,
      importedCount: importedProblems.length,
      skippedCount: duplicateCount
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to import problems', details: err.message });
  }
});

// 9. AI CHALLENGE ARCHITECT GENERATOR
router.post('/ai-generate', async (req, res) => {
  try {
    const { topic, difficulty, prompt } = req.body;

    const mockAiTemplates = {
      Arrays: {
        Easy: {
          title: 'Maximum Subarray Value',
          description: 'Given an integer array `nums`, find the subarray with the maximum sum and return its value.',
          constraints: '`1 <= nums.length <= 10^5` \n `-10^4 <= nums[i] <= 10^4`',
          inputFormat: 'A space-separated array of integers representation.',
          outputFormat: 'Single integer representing the maximum sum value.',
          sampleInput: '-2 1 -3 4 -1 2 1 -5 4',
          sampleOutput: '6',
          explanation: 'The subarray `[4,-1,2,1]` has the largest sum = 6.',
          hints: ['Think about Dynamic Programming or Kadane\'s algorithm.', 'Keep track of current max and global max.'],
          tags: ['Arrays', 'Dynamic Programming'],
          testCases: [
            { input: '-2 1 -3 4 -1 2 1 -5 4', expectedOutput: '6', explanation: 'Standard Kadane test case', isHidden: false },
            { input: '1 2 3 4', expectedOutput: '10', explanation: 'All positive numbers', isHidden: false },
            { input: '-1 -2 -3', expectedOutput: '-1', explanation: 'All negative numbers', isHidden: true },
            { input: '5 -4 6 -2 3', expectedOutput: '8', explanation: 'Alternating positives and negatives', isHidden: true }
          ]
        },
        Medium: {
          title: 'Container With Most Water',
          description: 'You are given an integer array `height` of length `n`. Find two lines that together with the x-axis form a container, such that the container contains the most water.',
          constraints: '`n == height.length` \n `2 <= n <= 10^5` \n `0 <= height[i] <= 10^4`',
          inputFormat: 'A space-separated integer array representing height values.',
          outputFormat: 'Single integer representing the maximum area of water.',
          sampleInput: '1 8 6 2 5 4 8 3 7',
          sampleOutput: '49',
          explanation: 'The lines at index 1 and 8 have height 8 and 7, width is 7. Area = min(8,7) * 7 = 49.',
          hints: ['Use the two-pointer approach.', 'Shrink the width by moving the pointer pointing to the shorter line.'],
          tags: ['Arrays', 'Two Pointers'],
          testCases: [
            { input: '1 8 6 2 5 4 8 3 7', expectedOutput: '49', explanation: 'LeetCode standard container case', isHidden: false },
            { input: '1 1', expectedOutput: '1', explanation: 'Minimal base width', isHidden: false },
            { input: '4 3 2 1 4', expectedOutput: '16', explanation: 'Peak container at boundaries', isHidden: true }
          ]
        }
      },
      Strings: {
        Easy: {
          title: 'Valid Palindrome Sequence',
          description: 'Given a string `s`, return `true` if it is a palindrome, or `false` otherwise, ignoring cases and non-alphanumeric characters.',
          constraints: '`1 <= s.length <= 2 * 10^5` \n `s` consists of printable ASCII characters.',
          inputFormat: 'A single string `s` enclosed in a line.',
          outputFormat: '`true` or `false` text.',
          sampleInput: 'A man, a plan, a canal: Panama',
          sampleOutput: 'true',
          explanation: '"amanaplanacanalpanama" is a palindrome.',
          hints: ['Use two pointers moving inwards.', 'Clean non-alphanumeric characters first.'],
          tags: ['Strings', 'Two Pointers'],
          testCases: [
            { input: 'A man, a plan, a canal: Panama', expectedOutput: 'true', explanation: 'Standard palindrome case', isHidden: false },
            { input: 'race a car', expectedOutput: 'false', explanation: 'Standard non-palindrome case', isHidden: false },
            { input: ' ', expectedOutput: 'true', explanation: 'Empty space evaluates to true', isHidden: true }
          ]
        }
      }
    };

    // Synthesize based on template or construct from prompt
    let generated = null;
    const cleanTopic = topic || 'Arrays';
    const cleanDiff = difficulty || 'Easy';

    if (mockAiTemplates[cleanTopic] && mockAiTemplates[cleanTopic][cleanDiff]) {
      generated = { ...mockAiTemplates[cleanTopic][cleanDiff] };
    } else {
      // General synthesised topic problem fallback
      generated = {
        title: `${topic || 'Algorithmic'} Challenge Builder`,
        description: `Create an optimized solution for a ${difficulty.toLowerCase()} algorithm involving ${topic || 'programming concepts'} based on: "${prompt || 'General practice question'}".`,
        constraints: '`1 <= N <= 10^5` \n Time Limit: 1.0s',
        inputFormat: 'Standard inputs of corresponding datatypes.',
        outputFormat: 'Outputs formatted according to evaluation criteria.',
        sampleInput: '10 20 30',
        sampleOutput: '60',
        explanation: 'The sum of all inputs equals 60.',
        hints: ['Consider memory consumption.', 'Use modular functions.'],
        tags: [topic || 'General', 'Logic'],
        testCases: [
          { input: '10 20 30', expectedOutput: '60', explanation: 'Sample sum evaluation', isHidden: false },
          { input: '5 5 5', expectedOutput: '15', explanation: 'Uniform values sum', isHidden: true }
        ]
      };
    }

    // Embed starter code templates
    generated.starterCode = [
      {
        language: 'javascript',
        code: `function solution(inputStr) {\n  // Write JavaScript logic\n  return "";\n}`
      },
      {
        language: 'python',
        code: `def solution(input_str):\n    # Write Python logic\n    return ""`
      },
      {
        language: 'cpp',
        code: `#include <iostream>\n#include <string>\nusing namespace std;\n\nstring solution(string s) {\n    // Write C++ logic\n    return "";\n}`
      },
      {
        language: 'java',
        code: `import java.util.*;\n\nclass Solution {\n    public String solution(String s) {\n        // Write Java logic\n        return "";\n    }\n}`
      }
    ];

    generated.status = 'Draft';
    generated.points = cleanDiff === 'Easy' ? 100 : cleanDiff === 'Medium' ? 250 : 500;

    res.json({
      success: true,
      message: 'AI Coding Problem generated successfully!',
      data: generated
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate AI question', details: err.message });
  }
});

// 10. AUTOMATED LEETCODE SYSTEM SYNC ENGINE
router.post('/sync-leetcode', async (req, res) => {
  try {
    const { syncUrl, categories, limitCount } = req.body;
    let problemsToSync = [];

    if (syncUrl) {
      // Dynamic remote sync from user-defined JSON database url
      const axios = require('axios');
      const response = await axios.get(syncUrl);
      problemsToSync = Array.isArray(response.data) ? response.data : [response.data];
    } else {
      // Fallback local high-fidelity database sync
      const fs = require('fs');
      const path = require('path');
      const dbPath = path.join(__dirname, '../config/leetcode_problems_db.json');
      if (fs.existsSync(dbPath)) {
        const raw = fs.readFileSync(dbPath, 'utf8');
        problemsToSync = JSON.parse(raw);
      } else {
        return res.status(404).json({ error: 'Local problems database not found' });
      }
    }

    if (categories && Array.isArray(categories) && categories.length > 0) {
      problemsToSync = problemsToSync.filter(p => categories.includes(p.category));
    }

    if (limitCount && Number(limitCount) > 0) {
      problemsToSync = problemsToSync.slice(0, Number(limitCount));
    }

    const syncedProblems = [];
    let duplicateCount = 0;

    for (let prob of problemsToSync) {
      if (!prob.title || !prob.description) continue;

      const targetSlug = prob.slug || prob.title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      
      // Duplicate prevention
      const existing = await Problem.findOne({
        $or: [
          { title: { $regex: `^${prob.title.trim()}$`, $options: 'i' } },
          { slug: targetSlug }
        ]
      });

      if (existing) {
        duplicateCount++;
        continue;
      }

      prob.slug = targetSlug;
      prob.difficulty = prob.difficulty || 'Easy';
      prob.category = prob.category || 'Arrays';
      prob.points = Number(prob.points) || 100;
      prob.status = 'Published'; // Automatically publish synced problems
      prob.accuracy = Number(prob.accuracy) || 72.5;
      prob.level = prob.level || 'Intermediate';
      prob.tags = Array.isArray(prob.tags) ? prob.tags : (prob.tags ? prob.tags.split(',').map(t => t.trim()) : []);
      prob.companyTags = Array.isArray(prob.companyTags) ? prob.companyTags : (prob.companyTags ? prob.companyTags.split(',').map(c => c.trim()) : []);
      
      // Map Problem ID cleanly
      const count = await Problem.countDocuments();
      prob.problemId = prob.problemId || String(count + 1);
      prob.order = count;

      if (!prob.starterCode || prob.starterCode.length === 0) {
        prob.starterCode = [
          { language: 'javascript', code: `function solution() {\n  // your code here\n}` },
          { language: 'python', code: `def solution():\n    # your code here\n    pass` }
        ];
      }

      if (!prob.testCases || prob.testCases.length === 0) {
        prob.testCases = [
          { input: '1 2', expectedOutput: '3', explanation: 'Sample case', isHidden: false }
        ];
      }

      const problem = new Problem(prob);
      await problem.save();
      syncedProblems.push(problem);
    }

    res.status(201).json({
      message: `Sync completed successfully. Synced ${syncedProblems.length} new problems, skipped ${duplicateCount} duplicate records.`,
      syncedCount: syncedProblems.length,
      skippedCount: duplicateCount,
      data: syncedProblems
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to sync LeetCode problems', details: err.message });
  }
});

module.exports = router;
