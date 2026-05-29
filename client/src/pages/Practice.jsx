import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Terminal, Play, Send, Trophy, Clock, CheckCircle2, Filter, Search,
  ChevronRight, Zap, Star, Lock, User, Activity, Layers, X, Target, Flame,
  Layout, BookOpen, Settings, MoreVertical, Check, AlertCircle, MessageSquare,
  FileText, Lightbulb, Cpu, History, Maximize2, Minimize2, ChevronDown, Globe, Award, ArrowRight,
  Database, BarChart3, Sun, Moon, RefreshCw, ChevronLeft, List, Plus
} from 'lucide-react';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import Editor from '@monaco-editor/react';

// Starter templates for all 9 requested languages
const defaultCodeTemplates = {
    javascript: `// JavaScript Playground\nfunction solution(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}\n\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nif (input.length >= 2) {\n    const nums = input[0].split(',').map(Number);\n    const target = parseInt(input[1]);\n    console.log(JSON.stringify(solution(nums, target)));\n}`,
    typescript: `// TypeScript Playground\nfunction solution(nums: number[], target: number): number[] {\n    const map = new Map<number, number>();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement)!, i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n}\n\n// Driver stub is compatible with JavaScript parser\nconst fs = require('fs');\nconst input = fs.readFileSync(0, 'utf-8').trim().split('\\n');\nif (input.length >= 2) {\n    const nums = input[0].split(',').map(Number);\n    const target = parseInt(input[1]);\n    console.log(JSON.stringify(solution(nums, target)));\n}`,
    python: `# Python 3.10 Playground\ndef solution(nums, target):\n    mapping = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in mapping:\n            return [mapping[complement], i]\n        mapping[num] = i\n    return []\n\nif __name__ == '__main__':\n    import sys, json\n    lines = sys.stdin.read().splitlines()\n    if len(lines) >= 2:\n        nums = [int(x) for x in lines[0].split(',')]\n        target = int(lines[1])\n        print(json.dumps(solution(nums, target)))`,
    java: `// Java Virtual Environment\nimport java.util.*;\n\nclass Solution {\n    public int[] solution(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (map.containsKey(complement)) {\n                return new int[] { map.get(complement), i };\n            }\n            map.put(nums[i], i);\n        }\n        return new int[] {};\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextLine()) {\n            String[] parts = sc.nextLine().split(",");\n            int[] nums = new int[parts.length];\n            for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());\n            int target = sc.nextInt();\n            int[] ans = new Solution().solution(nums, target);\n            System.out.println(Arrays.toString(ans));\n        }\n    }\n}`,
    cpp: `// C++ GCC Compiler\n#include <iostream>\n#include <vector>\n#include <unordered_map>\n#include <string>\n#include <sstream>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> solution(vector<int>& nums, int target) {\n        unordered_map<int, int> mapping;\n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (mapping.find(complement) != mapping.end()) {\n                return {mapping[complement], i};\n            }\n            mapping[nums[i]] = i;\n        }\n        return {};\n    }\n};\n\nint main() {\n    string line1;\n    if (getline(cin, line1)) {\n        stringstream ss(line1);\n        string token;\n        vector<int> nums;\n        while (getline(ss, token, ',')) nums.push_back(stoi(token));\n        int target;\n        cin >> target;\n        vector<int> ans = Solution().solution(nums, target);\n        if (ans.size() == 2) cout << "[" << ans[0] << "," << ans[1] << "]" << endl;\n        else cout << "[]" << endl;\n    }\n    return 0;\n}`,
    c: `// C Standard GCC Sandbox\n#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint* solution(int* nums, int numsSize, int target, int* returnSize) {\n    for (int i = 0; i < numsSize; i++) {\n        for (int j = i + 1; j < numsSize; j++) {\n            if (nums[i] + nums[j] == target) {\n                int* res = (int*)malloc(2 * sizeof(int));\n                res[0] = i;\n                res[1] = j;\n                *returnSize = 2;\n                return res;\n            }\n        }\n    }\n    *returnSize = 0;\n    return NULL;\n}\n\nint main() {\n    char buf[1024];\n    if (fgets(buf, sizeof(buf), stdin)) {\n        int nums[500];\n        int numsSize = 0;\n        char* token = strtok(buf, ",\\n");\n        while (token) {\n            nums[numsSize++] = atoi(token);\n            token = strtok(NULL, ",\\n");\n        }\n        int target;\n        if (scanf("%d", &target) == 1) {\n            int returnSize = 0;\n            int* ans = solution(nums, numsSize, target, &returnSize);\n            if (returnSize == 2) printf("[%d,%d]\\n", ans[0], ans[1]);\n            else printf("[]\\n");\n        }\n    }\n    return 0;\n}`,
    csharp: `// C# Core Sandbox\nusing System;\nusing System.Collections.Generic;\n\npublic class Solution {\n    public int[] SolutionMethod(int[] nums, int target) {\n        var map = new Dictionary<int, int>();\n        for (int i = 0; i < nums.Length; i++) {\n            int complement = target - nums[i];\n            if (map.ContainsKey(complement)) {\n                return new int[] { map[complement], i };\n            }\n            map[nums[i]] = i;\n        }\n        return new int[] {};\n    }\n}\n\npublic class Program {\n    public static void Main() {\n        string line1 = Console.ReadLine();\n        if (line1 != null) {\n            string[] parts = line1.Split(',');\n            int[] nums = Array.ConvertAll(parts, int.Parse);\n            int target = int.Parse(Console.ReadLine());\n            int[] ans = new Solution().SolutionMethod(nums, target);\n            Console.WriteLine("[" + string.Join(",", ans) + "]");\n        }\n    }\n}`,
    go: `// Go Core Environment\npackage main\nimport (\n    "fmt"\n    "bufio"\n    "os"\n    "strings"\n    "strconv"\n)\n\nfunc solution(nums []int, target int) []int {\n    mapping := make(map[int]int)\n    for i, num := range nums {\n        complement := target - num\n        if idx, found := mapping[complement]; found {\n            return []int{idx, i}\n        }\n        mapping[num] = i\n    }\n    return []int{}\n}\n\nfunc main() {\n    reader := bufio.NewReader(os.Stdin)\n    line1, _ := reader.ReadString('\\n')\n    line1 = strings.TrimSpace(line1)\n    if line1 != "" {\n        parts := strings.Split(line1, ",")\n        var nums []int\n        for _, p := range parts {\n            v, _ := strconv.Atoi(strings.TrimSpace(p))\n            nums = append(nums, v)\n        }\n        line2, _ := reader.ReadString('\\n')\n        target, _ := strconv.Atoi(strings.TrimSpace(line2))\n        ans := solution(nums, target)\n        if len(ans) == 2 {\n            fmt.Printf("[%d,%d]\\n", ans[0], ans[1])\n        } else {\n            fmt.Println("[]")\n        }\n    }\n}`,
    kotlin: `// Kotlin Virtual Environment\nimport java.util.Scanner\n\nclass Solution {\n    fun solution(nums: IntArray, target: Int): IntArray {\n        val map = HashMap<Int, Int>()\n        for (i in nums.indices) {\n            val complement = target - nums[i]\n            if (map.containsKey(complement)) {\n                return intArrayOf(map[complement]!!, i)\n            }\n            map[nums[i]] = i\n        }\n        return intArrayOf()\n    }\n}\n\nfun main(args: Array<String>) {\n    val sc = Scanner(System.in)\n    if (sc.hasNextLine()) {\n        val parts = sc.nextLine().split(",")\n        val nums = IntArray(parts.size)\n        for (i in parts.indices) nums[i] = parts[i].trim().toInt()\n        val target = sc.nextInt()\n        val ans = Solution().solution(nums, target)\n        println(ans.joinToString(prefix = "[", postfix = "]"))\n    }\n}`,
    sql: `-- SQL Sandbox Playground\nSELECT employee_id, first_name, salary \nFROM employees \nWHERE salary > 50000 \nORDER BY salary DESC;`,
    bash: `# Bash Shell Scripting Playground\nread input_str\nfor word in $input_str; do\n    echo $word\ndone`
};

const Practice = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');
  const { user } = useAuth();
  
  // Platform themes (LeetCode White / Space Navy Dark)
  const [uiTheme, setUiTheme] = useState(() => localStorage.getItem('arena_ui_theme') || 'dark');
  const [editorTheme, setEditorTheme] = useState(() => localStorage.getItem('arena_editor_theme') || 'vs-dark');
  
  // Split Panel Dragging metrics
  const [splitPercentage, setSplitPercentage] = useState(48);
  const [isDragging, setIsDragging] = useState(false);
  
  // Problems state loading
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  
  // IDE Navigation tabs
  const [leftTab, setLeftTab] = useState('description'); // 'description', 'editorial', 'solutions', 'submissions'
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  
  // Filters & Searching
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeCompany, setActiveCompany] = useState('All');
  const [activeLevel, setActiveLevel] = useState('All');
  const [activeDifficulty, setActiveDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [activeTrack, setActiveTrack] = useState('All Code Essentials');
  
  // Compiler state cache
  const [code, setCode] = useState(defaultCodeTemplates);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('All changes saved locally');

  // Testcase Panels
  const [activeTestcaseIndex, setActiveTestcaseIndex] = useState(0);
  const [customTestcases, setCustomTestcases] = useState([
    { input: '2,7,11,15\n9', expected: '[0,1]', label: 'Case 1' }
  ]);
  const [activeRightSubTab, setActiveRightSubTab] = useState('testcase'); // 'testcase', 'result'
  const [verdictStats, setVerdictStats] = useState(null); // { status, passed, total, runtime, memory, log }
  
  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mobile layout state
  const [mobileTab, setMobileTab] = useState('description'); // 'description', 'editor', 'console'

  const dragBarRef = useRef(null);

  // Sync themes to localStorage
  useEffect(() => {
    localStorage.setItem('arena_ui_theme', uiTheme);
  }, [uiTheme]);

  useEffect(() => {
    localStorage.setItem('arena_editor_theme', editorTheme);
  }, [editorTheme]);

  // Load problems database
  const fetchChallenges = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/problems`);
      const data = await response.json();
      setProblems(data);
    } catch (e) {
      console.error('Failed to load challenges:', e);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  // Sync starter code or loaded localStorage caches
  useEffect(() => {
    if (selectedProblem) {
      // 1. Initialize custom testcases using problem's seeded cases
      if (selectedProblem.testCases && selectedProblem.testCases.length > 0) {
        const mapped = selectedProblem.testCases.map((tc, idx) => ({
          input: tc.input || '',
          expected: tc.expectedOutput || '',
          label: `Case ${idx + 1}`
        }));
        setCustomTestcases(mapped);
        setActiveTestcaseIndex(0);
      } else {
        setCustomTestcases([{ input: '2,7,11,15\n9', expected: '[0,1]', label: 'Case 1' }]);
      }

      // 1.5. Dynamic default language switcher based on problem track
      const track = getTrackForProblem(selectedProblem);
      if (track === 'Database') {
        setSelectedLanguage('sql');
      } else if (track === 'Shell') {
        setSelectedLanguage('bash');
      } else if (track === 'JavaScript') {
        setSelectedLanguage('javascript');
      } else if (track === 'Pandas') {
        setSelectedLanguage('python');
      } else {
        if (selectedLanguage === 'sql' || selectedLanguage === 'bash') {
          setSelectedLanguage('javascript');
        }
      }

      // 2. Load cached code from localStorage if exists, otherwise fallback
      const templates = { ...defaultCodeTemplates };
      if (selectedProblem.starterCode && selectedProblem.starterCode.length > 0) {
        selectedProblem.starterCode.forEach(sc => {
          templates[sc.language] = sc.code;
        });
      }
      
      const loadedCodes = {};
      Object.keys(templates).forEach(lang => {
        const cache = localStorage.getItem(`cache_code_${selectedProblem._id}_${lang}`);
        loadedCodes[lang] = cache !== null ? cache : templates[lang];
      });
      setCode(loadedCodes);
      
    } else {
      setCode(defaultCodeTemplates);
    }
    
    setOutput('');
    setVerdictStats(null);
    setActiveRightSubTab('testcase');
  }, [selectedProblem]);

  // Autosave current workspace code changes to localStorage
  const handleCodeChange = (newVal) => {
    if (!selectedProblem) return;
    
    setCode(prev => {
      const updated = { ...prev, [selectedLanguage]: newVal };
      localStorage.setItem(`cache_code_${selectedProblem._id}_${selectedLanguage}`, newVal);
      return updated;
    });

    setAutoSaveStatus('Saving changes...');
    setTimeout(() => {
      setAutoSaveStatus('All changes saved locally');
    }, 800);
  };

  // Draggable slider split panel effect
  const startResizing = (mouseDownEvent) => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const newPercentage = (e.clientX / window.innerWidth) * 100;
      if (newPercentage > 20 && newPercentage < 80) {
        setSplitPercentage(newPercentage);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const topics = ['All', 'Algorithms', 'Database', 'Shell', 'Concurrency', 'JavaScript', 'pandas'];
  const topicIcons = {
    All: <Layers size={14} className="text-slate-400" />,
    Algorithms: <Cpu size={14} className="text-cyan-400" />,
    Database: <Database size={14} className="text-blue-400" />,
    Shell: <Terminal size={14} className="text-emerald-400" />,
    Concurrency: <Activity size={14} className="text-purple-400" />,
    JavaScript: <Globe size={14} className="text-yellow-400" />,
    pandas: <BarChart3 size={14} className="text-indigo-400" />
  };

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  
  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: 'JS' },
    { id: 'typescript', name: 'TypeScript', icon: 'TS' },
    { id: 'python', name: 'Python', icon: 'PY' },
    { id: 'java', name: 'Java', icon: 'JV' },
    { id: 'cpp', name: 'C++', icon: 'C++' },
    { id: 'c', name: 'C', icon: 'C' },
    { id: 'csharp', name: 'C#', icon: 'C#' },
    { id: 'go', name: 'Go', icon: 'GO' },
    { id: 'kotlin', name: 'Kotlin', icon: 'KT' },
    { id: 'sql', name: 'SQL', icon: 'SQL' },
    { id: 'bash', name: 'Bash', icon: 'SH' }
  ];

  const tracksList = [
    { 
      id: 'All Code Essentials', 
      name: 'All Code Essentials', 
      desc: 'Master beginner-to-advanced Data Structures & Algorithms roadmaps.', 
      icon: <Layers size={20} className="text-cyan-400" /> 
    },
    { 
      id: 'Algorithms', 
      name: 'Algorithms', 
      desc: 'Sharpen your optimization, searching, and advanced DSA skills.', 
      icon: <Cpu size={20} className="text-emerald-400" /> 
    },
    { 
      id: 'Database', 
      name: 'Database', 
      desc: 'Practice SQL queries, JOINs, aggregations, and subqueries.', 
      icon: <Database size={20} className="text-amber-400" /> 
    },
    { 
      id: 'Shell', 
      name: 'Shell', 
      desc: 'Learn Linux shell scripting, text processing, awk, sed, and grep.', 
      icon: <Terminal size={20} className="text-pink-400" /> 
    },
    { 
      id: 'Concurrency', 
      name: 'Concurrency', 
      desc: 'Deep-dive into multithreading, mutexes, locks, and synchronization.', 
      icon: <RefreshCw size={20} className="text-blue-400" /> 
    },
    { 
      id: 'JavaScript', 
      name: 'JavaScript', 
      desc: 'Master Closures, Promises, Async/Await, and Event Loop cycles.', 
      icon: <Globe size={20} className="text-yellow-400" /> 
    },
    { 
      id: 'Pandas', 
      name: 'Pandas', 
      desc: 'Practice Python Data Analysis, DataFrame cleaning, and GroupBy.', 
      icon: <BarChart3 size={20} className="text-violet-400" /> 
    }
  ];

  const trackTopics = {
    'All Code Essentials': ['All', 'Arrays', 'Strings', 'Hash Maps', 'Linked Lists', 'Stack', 'Queue', 'Trees', 'Graphs', 'Binary Search', 'Dynamic Programming', 'Greedy', 'Recursion', 'Backtracking'],
    'Algorithms': ['All', 'Sorting', 'Searching', 'Sliding Window', 'Two Pointer', 'BFS/DFS', 'Topological Sort', 'Union Find', 'Segment Trees', 'Heaps', 'Bit Manipulation'],
    'Database': ['All', 'SELECT queries', 'JOINS', 'GROUP BY', 'HAVING', 'Subqueries', 'Window Functions', 'CTEs'],
    'Shell': ['All', 'awk', 'sed', 'grep', 'bash scripting', 'file handling', 'text processing'],
    'Concurrency': ['All', 'Threads', 'Mutex', 'Synchronization', 'Producer-consumer', 'Deadlock handling'],
    'JavaScript': ['All', 'Closures', 'Promises', 'Async/Await', 'DOM logic', 'Event loop', 'Functional programming'],
    'Pandas': ['All', 'DataFrames', 'Filtering', 'Aggregation', 'Merge', 'GroupBy', 'Cleaning data']
  };

  const getTrackForProblem = (p) => {
    const cat = p.category ? p.category.toLowerCase() : '';
    if (cat === 'database' || cat === 'sql') return 'Database';
    if (cat === 'shell' || cat === 'bash') return 'Shell';
    if (cat === 'concurrency' || cat === 'multithreading') return 'Concurrency';
    if (cat === 'javascript' || cat === 'js') return 'JavaScript';
    if (cat === 'pandas' || cat === 'dataframe') return 'Pandas';
    
    // Algorithms track contains advanced algorithms
    const algoTopics = ['sorting', 'searching', 'sliding window', 'two pointer', 'bfs', 'dfs', 'bfs/dfs', 'topological sort', 'union find', 'segment trees', 'heaps', 'bit manipulation'];
    const hasAlgoTag = (p.tags || []).some(t => algoTopics.includes(t.toLowerCase())) || algoTopics.includes(cat);
    if (hasAlgoTag) return 'Algorithms';

    // Fallback to All Code Essentials
    return 'All Code Essentials';
  };

  const companies = ['All', 'Google', 'Amazon', 'Microsoft', 'Meta', 'Adobe', 'TCS', 'Infosys', 'Zoho', 'Flipkart'];
  const dsaLevels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Query database filtering & sorting
  const filteredProblems = problems.filter(p => {
    const track = getTrackForProblem(p);
    const matchesTrack = activeTrack === 'All' || track === activeTrack;
    
    // Sub-topic matching
    const matchesTopic = activeFilter === 'All' || 
      (p.tags && p.tags.some(t => t.toLowerCase() === activeFilter.toLowerCase())) || 
      (p.category && p.category.toLowerCase() === activeFilter.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(activeFilter.toLowerCase()));

    const matchesDiff = activeDifficulty === 'All' || p.difficulty === activeDifficulty;
    const matchesCompany = activeCompany === 'All' || (p.companyTags && p.companyTags.includes(activeCompany));
    const matchesLevel = activeLevel === 'All' || p.level === activeLevel;
    const matchesSearch = searchQuery === '' || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      (p.companyTags && p.companyTags.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesTrack && matchesTopic && matchesDiff && matchesCompany && matchesLevel && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'accuracyAsc') {
      return (a.accuracy || 0) - (b.accuracy || 0);
    }
    if (sortBy === 'accuracyDesc') {
      return (b.accuracy || 0) - (a.accuracy || 0);
    }
    return 0; // Default sort
  });

  // Problem list index matching
  const currentIndex = selectedProblem ? problems.findIndex(p => p._id === selectedProblem._id) : -1;
  const prevProblem = currentIndex > 0 ? problems[currentIndex - 1] : null;
  const nextProblem = currentIndex < problems.length - 1 ? problems[currentIndex + 1] : null;

  // Single testcase code compile (Run Code)
  const handleRunCode = async () => {
    if (!code[selectedLanguage]) return;
    setIsRunning(true);
    setActiveRightSubTab('result');
    setVerdictStats(null);
    setOutput("Compiling program... Connecting with Secure Sandbox Execution Engine.");

    const activeCase = customTestcases[activeTestcaseIndex];
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/submissions/execute`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                language: selectedLanguage,
                code: code[selectedLanguage],
                stdin: activeCase ? activeCase.input : ""
            })
        });
        const result = await response.json();
        
        if (result.stdout !== undefined) {
            let out = result.stdout ? result.stdout.trim() : '';
            let err = result.stderr ? result.stderr.trim() : '';
            
            if (err) {
                setOutput(`Compilation/Interpreter Error:\n${err}`);
                setVerdictStats({
                  status: 'Runtime Error',
                  passed: 0,
                  total: 1,
                  runtime: 0,
                  memory: 0,
                  log: err
                });
            } else {
                const expected = activeCase ? activeCase.expected.trim() : '';
                const isMatch = out === expected;
                setOutput(out);
                setVerdictStats({
                  status: isMatch ? 'Accepted' : 'Wrong Answer',
                  passed: isMatch ? 1 : 0,
                  total: 1,
                  runtime: result.time ? Math.round(parseFloat(result.time) * 1000) : 12,
                  memory: result.memory ? Math.round(result.memory / 1024) : 4,
                  log: `Expected: "${expected}"\nReceived: "${out}"`
                });
            }
        } else {
            setOutput(`Sandbox Engine Execution failed:\n${result.error || 'Unknown compiler server error.'}`);
            setVerdictStats({
              status: 'Runtime Error',
              passed: 0,
              total: 1,
              runtime: 0,
              memory: 0,
              log: result.error || 'Execution failed'
            });
        }
    } catch (e) {
        setOutput(`Execution Pipeline Offline.\nNetwork Error: ${e.message}\nPlease check backend server compiler status.`);
    } finally {
        setIsRunning(false);
    }
  };

  // Full submission evaluate (Submit Code)
  const handleSubmit = async () => {
    if (!selectedProblem || !user) {
      return alert('Mandatory Action: Please login to save submission coordinates.');
    }
    setIsSubmitting(true);
    setActiveRightSubTab('result');
    setVerdictStats(null);
    setOutput("Submitting code to Judge... Running bulk evaluation parameters.");
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/submissions/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: selectedProblem._id,
          userId: user.id || user._id,
          language: selectedLanguage,
          code: code[selectedLanguage]
        })
      });
      const res = await response.json();
      
      if (res.success) {
        const sub = res.submission;
        let outLog = `Acceptance Status: ${sub.status}\n`;
        outLog += `Passed Cases: ${res.passedCount} / ${res.totalCount}\n`;
        outLog += `Runtime Speed: ${sub.runtime} ms\n`;
        outLog += `Memory Allocated: ${sub.memory || 24} MB\n`;
        
        if (sub.status === 'Accepted') {
          outLog += `\n Acceptance: 100% Correct!\n🚀 Scholar points earned: +${sub.pointsEarned || 100} XP\n🔥 Elite Coding Streak Maintained!`;
        } else {
          outLog += `\n Failure Output Details:\n${sub.errorDetails || 'Incorrect output matching expected case.'}`;
        }
        
        setOutput(outLog);
        setVerdictStats({
          status: sub.status,
          passed: res.passedCount,
          total: res.totalCount,
          runtime: sub.runtime,
          memory: sub.memory || 24,
          log: sub.errorDetails || 'All matches confirmed.'
        });

        // Trigger parent challenge list re-evaluation
        fetchChallenges();
        
      } else {
        setOutput(`Judgement failed: ${res.error || 'Compiler service error.'}`);
        setVerdictStats({
          status: 'Runtime Error',
          passed: 0,
          total: 0,
          runtime: 0,
          memory: 0,
          log: res.error || 'Judgement failed'
        });
      }
    } catch (err) {
      setOutput(`Submission Pipeline Offline.\nNetwork Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen selection:bg-[#FFB800]/30 transition-colors duration-300 pb-20 pt-24 ${
      uiTheme === 'dark' ? 'bg-[#0F172A] text-slate-200' : 'bg-[#F3F4F6] text-slate-700'
    }`}>
      
      {!selectedProblem ? (
        // DASHBOARD VIEW
        <div className="max-w-[1600px] mx-auto px-8 md:px-12 pt-10 space-y-12">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-12"
          >
            <div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                    Elite <span className="text-[#FFB800]">Arena</span>
                </h1>
                <p className="text-slate-500 font-bold text-lg tracking-wide mt-2">Establish your technical supremacy with master challenges.</p>
            </div>
            
            {/* Theme Toggle in Dashboard */}
            <div className="flex gap-4">
              <button 
                onClick={() => setUiTheme(uiTheme === 'dark' ? 'light' : 'dark')}
                className={`p-3 rounded-xl border flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md ${
                  uiTheme === 'dark' ? 'bg-slate-800 border-slate-700 text-yellow-400' : 'bg-white border-slate-200 text-indigo-600'
                }`}
                title="Toggle Platform UI Theme"
              >
                {uiTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </motion.div>

          {/* Scholar Stats - Stretched Horizontally! */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className={`rounded-[40px] p-8 shadow-2xl relative overflow-hidden border transition-all ${
               uiTheme === 'dark' ? 'bg-[#1E293B] border-slate-800' : 'bg-white border-slate-200'
             }`}
          >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-600 to-amber-500"></div>
              <div className="flex items-center justify-between mb-8">
                  <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                    <Trophy className="text-[#FFB800]" size={20} />
                    Scholar Stats
                  </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Solved Problems */}
                  <div className={`border rounded-2xl p-6 flex items-center justify-between transition-colors ${
                    uiTheme === 'dark' ? 'bg-slate-900/50 border-slate-850 hover:border-slate-700' : 'bg-slate-50 border-slate-100 hover:border-slate-200'
                  }`}>
                      <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Solved Problems</p>
                          <p className={`text-3xl font-black mt-1 ${uiTheme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                            {problems.filter(p => p.status === 'Solved').length} / {problems.length}
                          </p>
                      </div>
                      <Award className="text-emerald-400" size={32} />
                  </div>

                  {/* Streak */}
                  <div className={`border rounded-2xl p-6 flex items-center justify-between transition-colors ${
                    uiTheme === 'dark' ? 'bg-slate-900/50 border-slate-850 hover:border-slate-700' : 'bg-slate-50 border-slate-100 hover:border-slate-200'
                  }`}>
                      <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Coding Streak</p>
                          <p className={`text-3xl font-black mt-1 ${uiTheme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                            {user?.currentStreak || 0} Cycles
                          </p>
                      </div>
                      <Flame className="text-[#FFB800]" size={32} fill="currentColor" />
                  </div>

                  {/* Points */}
                  <div className={`border rounded-2xl p-6 flex items-center justify-between transition-colors ${
                    uiTheme === 'dark' ? 'bg-slate-900/50 border-slate-850 hover:border-slate-700' : 'bg-slate-50 border-slate-100 hover:border-slate-200'
                  }`}>
                      <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score / Accuracy</p>
                          <p className={`text-3xl font-black mt-1 ${uiTheme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                            {user?.scholarPoints || 0} XP ({(user?.solvedProblems || []).length > 0 ? "82.5%" : "0.0%"})
                          </p>
                      </div>
                      <Star className="text-yellow-400" size={32} fill="currentColor" />
                  </div>
              </div>
          </motion.div>

          {/* Learning Tracks Portal */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className={`rounded-[40px] p-8 shadow-2xl border transition-all ${
               uiTheme === 'dark' ? 'bg-[#1E293B] border-slate-800' : 'bg-white border-slate-200'
             }`}
          >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <h3 className="text-sm font-black uppercase tracking-wider flex items-center gap-2">
                      <Layers className="text-orange-500 animate-pulse" size={20} />
                      GuruBramha Professional Learning Tracks
                  </h3>
                  <span className="self-start sm:self-auto text-[10px] font-black uppercase text-orange-500 tracking-[0.2em] bg-orange-500/10 border border-orange-500/20 px-3.5 py-1.5 rounded-full">
                    {activeTrack} Active
                  </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {tracksList.map((track, idx) => {
                      const trackProblems = problems.filter(p => getTrackForProblem(p) === track.id);
                      const solvedCount = trackProblems.filter(p => p.status === 'Solved').length;
                      const totalCount = trackProblems.length;
                      const percentVal = totalCount > 0 ? (solvedCount / totalCount) * 100 : 0;
                      
                      const isSelected = activeTrack === track.id;

                      return (
                          <div 
                              key={idx} 
                              onClick={() => {
                                  setActiveTrack(track.id);
                                  setActiveFilter('All');
                              }}
                              className={`cursor-pointer space-y-4 border rounded-3xl p-6 transition-all duration-300 active:scale-[0.98] ${
                                  isSelected 
                                  ? uiTheme === 'dark'
                                      ? 'bg-slate-900 border-orange-500 shadow-[0_8px_30px_rgba(249,115,22,0.15)] scale-[1.02]'
                                      : 'bg-orange-500/5 border-orange-500 shadow-[0_8px_30px_rgba(249,115,22,0.1)] scale-[1.02]'
                                  : uiTheme === 'dark'
                                      ? 'bg-slate-900/30 border-slate-800/60 hover:border-slate-700 hover:bg-slate-900/50'
                                      : 'bg-slate-50 border-slate-100 hover:border-slate-200 hover:bg-slate-100/50'
                              }`}
                          >
                              <div className="flex items-center justify-between">
                                  <div className="p-3 bg-slate-950/20 rounded-2xl border border-slate-800/20">
                                      {track.icon}
                                  </div>
                                  <span className="text-[10px] font-black font-mono text-slate-400">
                                      {solvedCount}/{totalCount} Solved
                                  </span>
                              </div>
                              
                              <div>
                                  <h4 className={`font-black text-md tracking-tight ${
                                      uiTheme === 'dark' ? 'text-white' : 'text-slate-800'
                                  }`}>{track.name}</h4>
                                  <p className="text-[11px] text-slate-400 mt-1 font-medium leading-relaxed line-clamp-2 h-8">
                                      {track.desc}
                                  </p>
                              </div>

                              <div className="space-y-1.5 pt-2">
                                  <div className="flex justify-between text-[9px] font-black uppercase tracking-wider text-slate-500">
                                      <span>Progress</span>
                                      <span>{Math.round(percentVal)}%</span>
                                  </div>
                                  <div className={`w-full h-2 rounded-full overflow-hidden border ${
                                      uiTheme === 'dark' ? 'bg-slate-950 border-slate-900' : 'bg-slate-200 border-slate-350'
                                  }`}>
                                      <div 
                                          className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500" 
                                          style={{ width: `${percentVal}%` }}
                                      ></div>
                                  </div>
                              </div>
                          </div>
                      );
                  })}
              </div>
          </motion.div>

          {/* Filters Bento Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className={`rounded-[40px] p-10 shadow-2xl border transition-all ${
              uiTheme === 'dark' ? 'bg-[#1E293B] border-white/20' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
              <div className="relative flex-grow w-full">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                <input 
                  type="text" 
                  placeholder="Identify specific challenges by name, topic, or company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-16 pr-8 py-5 border rounded-[24px] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all shadow-inner font-bold placeholder:text-slate-400 ${
                    uiTheme === 'dark' ? 'bg-slate-900/50 border-slate-750 text-slate-200' : 'bg-slate-50 border-slate-300 text-slate-800'
                  }`}
                />
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <select 
                    value={activeDifficulty}
                    onChange={(e) => setActiveDifficulty(e.target.value)}
                    className={`px-8 py-5 border-none rounded-[24px] text-xs font-black uppercase tracking-widest outline-none cursor-pointer hover:brightness-105 transition-colors shadow-2xl appearance-none pr-12 relative ${
                      uiTheme === 'dark' ? 'bg-slate-900 text-[#FFB800]' : 'bg-[#FFB800] text-slate-900'
                    }`}
                >
                    {difficulties.map(d => <option key={d} value={d}>{d} Difficulty</option>)}
                </select>

                <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`px-8 py-5 border-none rounded-[24px] text-xs font-black uppercase tracking-widest outline-none cursor-pointer hover:brightness-105 transition-colors shadow-2xl appearance-none pr-12 relative ${
                      uiTheme === 'dark' ? 'bg-slate-900 text-emerald-400' : 'bg-emerald-600 text-white'
                    }`}
                >
                    <option value="default">Default Sort</option>
                    <option value="accuracyDesc">Acceptance: High to Low</option>
                    <option value="accuracyAsc">Acceptance: Low to High</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Problems Bento List */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className={`rounded-[48px] overflow-hidden shadow-2xl border transition-all ${
               uiTheme === 'dark' ? 'bg-[#1E293B] border-white/20' : 'bg-white border-slate-200'
             }`}
          >
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`border-b ${uiTheme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-300'}`}>
                  <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] w-24">Status</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em]">Challenge Manifest</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em]">Complexity</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em]">Acceptance</th>
                  <th className="px-10 py-8 text-[10px] font-black uppercase tracking-[0.3em] text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems.map((prob, i) => (
                  <tr key={prob.id || prob._id} className={`border-b transition-colors group ${
                    uiTheme === 'dark' ? 'border-slate-800 hover:bg-slate-900/50' : 'border-slate-200 hover:bg-slate-55'
                  }`}>
                    <td className="px-10 py-8 text-center">
                        {prob.status === 'Solved' ? (
                            <div className="w-8 h-8 bg-green-500/20 rounded-xl flex items-center justify-center text-green-500 shadow-sm mx-auto animate-pulse">
                                <CheckCircle2 size={20} />
                            </div>
                        ) : prob.status === 'Attempted' ? (
                            <div className="w-8 h-8 rounded-xl border-2 border-[#FFB800] border-t-transparent animate-spin mx-auto"></div>
                        ) : (
                            <div className="w-8 h-8 rounded-xl border-2 border-slate-700 mx-auto"></div>
                        )}
                    </td>
                    <td className="px-10 py-8">
                      <div>
                        <p className={`font-black group-hover:text-orange-500 transition-colors mb-3 text-lg tracking-tight flex items-center gap-2 ${
                          uiTheme === 'dark' ? 'text-white' : 'text-slate-800'
                        }`}>
                            {prob.isDebug && <AlertCircle size={16} className="text-orange-500" />}
                            {prob.title ? (prob.problemId ? `${prob.problemId}. ${prob.title}` : prob.title) : ''}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {prob.tags && prob.tags.map(tag => (
                                <span key={tag} className={`px-3 py-1 border rounded-lg text-[9px] font-black uppercase tracking-widest ${
                                  uiTheme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-500'
                                }`}>{tag}</span>
                            ))}
                            {prob.companyTags && prob.companyTags.map(comp => (
                                <span key={comp} className={`px-3 py-1 border rounded-lg text-[9px] font-black uppercase tracking-widest ${
                                  uiTheme === 'dark' ? 'bg-blue-950/20 border-blue-900/30 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600'
                                }`}>{comp}</span>
                            ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full ${
                            prob.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                            prob.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                            'bg-red-500/20 text-red-400'
                        }`}>{prob.difficulty}</span>
                    </td>
                    <td className="px-10 py-8 text-sm font-black text-slate-400 tracking-tight">{prob.accuracy || 74.5}%</td>
                    <td className="px-10 py-8 text-right">
                      <button 
                        onClick={() => setSelectedProblem(prob)}
                        className={`px-8 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-orange-600 hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95 ${
                          uiTheme === 'dark' ? 'bg-slate-900 text-[#FFB800] border border-slate-850' : 'bg-slate-100 text-slate-700 border border-slate-300'
                        }`}
                      >
                        Code
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      ) : (
        
        // LEETCODE STYLE SPLIT SCREEN PRACTICE ARENA
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className={`w-full max-w-[1920px] mx-auto flex flex-col h-[calc(100vh-6rem)] overflow-hidden shadow-2xl transition-all ${
             isFullscreen ? 'fixed inset-0 z-50 h-screen bg-slate-900' : 'rounded-t-[30px] border border-slate-800'
           }`}
        >
          {/* Top Elite Navigation Action Bar */}
          <div className={`h-16 border-b flex items-center justify-between px-6 flex-shrink-0 transition-colors ${
            uiTheme === 'dark' ? 'bg-[#1E293B] border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
          }`}>
            {/* Top Left: Navigation */}
            <div className="flex items-center gap-3">
                <button 
                  onClick={() => setSelectedProblem(null)}
                  className={`w-9 h-9 border rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md ${
                    uiTheme === 'dark' ? 'bg-slate-900 border-slate-800 hover:text-[#FFB800]' : 'bg-slate-100 border-slate-200 hover:text-orange-600'
                  }`}
                  title="Back to Challenge Directory"
                >
                    <List size={18} />
                </button>
                <div className="h-6 w-px bg-slate-800"></div>
                
                {/* Prev challenge */}
                <button 
                  disabled={!prevProblem}
                  onClick={() => setSelectedProblem(prevProblem)}
                  className={`w-9 h-9 border rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30 ${
                    uiTheme === 'dark' ? 'bg-slate-900 border-slate-800 hover:text-white' : 'bg-slate-100 border-slate-200 hover:text-slate-850'
                  }`}
                  title="Previous Challenge"
                >
                    <ChevronLeft size={18} />
                </button>

                {/* Next challenge */}
                <button 
                  disabled={!nextProblem}
                  onClick={() => setSelectedProblem(nextProblem)}
                  className={`w-9 h-9 border rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-30 ${
                    uiTheme === 'dark' ? 'bg-slate-900 border-slate-800 hover:text-white' : 'bg-slate-100 border-slate-200 hover:text-slate-850'
                  }`}
                  title="Next Challenge"
                >
                    <ChevronRight size={18} />
                </button>

                <h2 className={`text-md font-bold tracking-tight hidden md:inline-block ml-2 ${
                  uiTheme === 'dark' ? 'text-white' : 'text-slate-800'
                }`}>{selectedProblem.problemId ? `${selectedProblem.problemId}. ` : ''}{selectedProblem.title}</h2>
            </div>

            {/* Mobile Tab Selectors (only visible below lg screen width) */}
            <div className="flex lg:hidden bg-slate-900/60 p-1 border border-slate-800 rounded-xl">
              {[
                { id: 'description', label: 'Desc' },
                { id: 'editor', label: 'Code' },
                { id: 'console', label: 'Console' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setMobileTab(t.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    mobileTab === t.id ? 'bg-[#FFB800] text-slate-900 shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Top Right Actions */}
            <div className="flex items-center gap-4">
                <span className="text-[10px] text-slate-500 font-bold hidden sm:inline-block border border-slate-800/80 px-3 py-1.5 rounded-lg bg-slate-900/20 font-mono">
                  {autoSaveStatus}
                </span>

                {/* Reset Code */}
                <button 
                  onClick={() => {
                    if (confirm("Restore active starter template? This will erase code edits caches in local browser state.")) {
                      localStorage.removeItem(`cache_code_${selectedProblem._id}_${selectedLanguage}`);
                      const baseCode = (selectedProblem.starterCode || []).find(sc => sc.language === selectedLanguage)?.code 
                        || defaultCodeTemplates[selectedLanguage] || '';
                      setCode(prev => ({ ...prev, [selectedLanguage]: baseCode }));
                    }
                  }}
                  className={`p-2.5 border rounded-xl hover:scale-105 active:scale-95 transition-all ${
                    uiTheme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-rose-400' : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-rose-600'
                  }`}
                  title="Reset starter template code"
                >
                  <RefreshCw size={15} />
                </button>

                {/* Editor Theme Light/Dark */}
                <button 
                  onClick={() => {
                    setEditorTheme(editorTheme === 'vs-dark' ? 'light' : 'vs-dark');
                    setUiTheme(uiTheme === 'dark' ? 'light' : 'dark');
                  }}
                  className={`p-2.5 border rounded-xl hover:scale-105 active:scale-95 transition-all ${
                    uiTheme === 'dark' ? 'bg-slate-900 border-slate-800 text-yellow-400' : 'bg-slate-100 border-slate-200 text-indigo-600'
                  }`}
                  title="Toggle Light/Dark Editor View"
                >
                  {uiTheme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
                </button>

                {/* Toggle fullscreen */}
                <button 
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className={`p-2.5 border rounded-xl hover:scale-105 active:scale-95 transition-all ${
                    uiTheme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900'
                  }`}
                  title={isFullscreen ? "Exit Fullscreen Editor" : "Fullscreen Editor"}
                >
                  {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                </button>
            </div>
          </div>

          {/* SPLIT PANEL CONTENT LAYER */}
          <div className="flex-grow flex overflow-hidden relative">
            
            {/* LEFT PANEL: PROBLEM BRIEFING */}
            <div 
              style={{ width: `${splitPercentage}%` }}
              className={`flex flex-col border-r relative flex-shrink-0 transition-colors ${
                mobileTab === 'description' ? 'flex w-full lg:w-auto' : 'hidden lg:flex'
              } ${
                uiTheme === 'dark' ? 'bg-[#1E293B] border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
                {/* Tabs */}
                <div className={`flex border-b flex-shrink-0 transition-colors ${
                  uiTheme === 'dark' ? 'bg-[#1E293B] border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                    {[
                      { id: 'description', label: 'Description', icon: <FileText size={13} /> },
                      { id: 'editorial', label: 'Editorial', icon: <Lightbulb size={13} /> },
                      { id: 'solutions', label: 'Solutions', icon: <MessageSquare size={13} /> },
                      { id: 'submissions', label: 'Submissions', icon: <History size={13} /> }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setLeftTab(tab.id)}
                            className={`flex-grow py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative flex items-center justify-center gap-1.5 ${
                                leftTab === tab.id 
                                  ? 'text-orange-500 bg-slate-900/10' 
                                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/5'
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                            {leftTab === tab.id && <motion.div layoutId="activeTabIDE" className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />}
                        </button>
                    ))}
                </div>

                {/* Tab content space */}
                <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
                    
                    {/* TAB 1: DESCRIPTION */}
                    {leftTab === 'description' && (
                      <div className="space-y-6">
                        {/* Title & Stats */}
                        <div>
                          <h3 className={`text-2xl font-black mb-3 tracking-tighter ${uiTheme === 'dark' ? 'text-white' : 'text-slate-850'}`}>
                             {selectedProblem.problemId ? `${selectedProblem.problemId}. ` : ''}{selectedProblem.title}
                          </h3>
                          
                          <div className="flex flex-wrap gap-2.5 items-center">
                            {/* Difficulty */}
                            <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3.5 py-1 rounded-full ${
                                selectedProblem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-500' :
                                selectedProblem.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-500' :
                                'bg-red-500/20 text-red-500'
                            }`}>{selectedProblem.difficulty}</span>

                            {/* DSA Level */}
                            <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3.5 py-1 rounded-full ${
                              uiTheme === 'dark' ? 'bg-slate-850 text-slate-300' : 'bg-slate-100 text-slate-600'
                            }`}>{selectedProblem.level || 'Intermediate'}</span>

                            {/* Solved Status badge */}
                            {selectedProblem.status === 'Solved' && (
                              <span className="text-[9px] font-black uppercase tracking-[0.2em] px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center gap-1">
                                <Check size={10} /> Solved
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Statement */}
                        <div className={`prose max-w-none text-sm leading-relaxed ${
                          uiTheme === 'dark' ? 'prose-invert text-slate-300' : 'text-slate-650'
                        }`}>
                          {/* Parse newlines as HTML paragraphs safely */}
                          {(selectedProblem.description || '')
                            .split('\n\n')
                            .map((paragraph, index) => (
                              <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                          ))}
                        </div>

                        {/* Examples */}
                        {selectedProblem.sampleInput && (
                          <div className="space-y-3">
                            <h4 className={`text-xs font-black uppercase tracking-wider ${uiTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Sample Case:</h4>
                            <div className={`border rounded-[20px] p-6 font-mono text-xs space-y-3 ${
                              uiTheme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
                            }`}>
                              <p><span className="text-slate-500 font-bold uppercase tracking-wider mr-4">Input:</span> {selectedProblem.sampleInput}</p>
                              <p><span className="text-slate-500 font-bold uppercase tracking-wider mr-4">Output:</span> {selectedProblem.sampleOutput}</p>
                              {selectedProblem.explanation && (
                                <p className={`mt-2 border-t pt-2 border-dashed ${uiTheme === 'dark' ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-550'}`}>
                                  <span className="text-slate-500 font-bold uppercase tracking-wider mr-2">Explanation:</span> {selectedProblem.explanation}
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Constraints */}
                        {selectedProblem.constraints && (
                          <div className="space-y-3">
                            <h4 className={`text-xs font-black uppercase tracking-wider ${uiTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Constraints:</h4>
                            <ul className={`list-disc pl-6 space-y-1.5 text-xs font-mono ${
                              uiTheme === 'dark' ? 'text-rose-350' : 'text-rose-700'
                            }`}>
                              {selectedProblem.constraints.split('\n').map((c, i) => <li key={i}>{c}</li>)}
                            </ul>
                          </div>
                        )}

                        {/* Extra Tags drawer */}
                        <div className={`pt-6 border-t space-y-4 ${uiTheme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
                          {/* DSA Tags */}
                          {selectedProblem.tags && selectedProblem.tags.length > 0 && (
                            <div>
                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">DSA Topics:</p>
                              <div className="flex flex-wrap gap-2">
                                {selectedProblem.tags.map(t => (
                                  <span key={t} className={`px-2.5 py-1 rounded-md text-[9px] font-bold ${
                                    uiTheme === 'dark' ? 'bg-slate-900 text-slate-400 border border-slate-800' : 'bg-slate-100 text-slate-600 border border-slate-250'
                                  }`}>{t}</span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Company Tags */}
                          {selectedProblem.companyTags && selectedProblem.companyTags.length > 0 && (
                            <div>
                              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Enterprise Interview Preparation:</p>
                              <div className="flex flex-wrap gap-2">
                                {selectedProblem.companyTags.map(c => (
                                  <span key={c} className={`px-2.5 py-1 rounded-md text-[9px] font-bold ${
                                    uiTheme === 'dark' ? 'bg-blue-950/20 text-blue-400 border border-blue-900/30' : 'bg-blue-50 text-blue-600 border border-blue-200'
                                  }`}>{c}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* TAB 2: EDITORIAL */}
                    {leftTab === 'editorial' && (
                      <div className="space-y-6">
                        <h4 className={`text-xl font-black ${uiTheme === 'dark' ? 'text-white' : 'text-slate-805'}`}>Official Editorial Analysis</h4>
                        <div className={`p-6 rounded-2xl border text-sm leading-relaxed ${
                          uiTheme === 'dark' ? 'bg-slate-900/50 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}>
                          <p className="mb-4">This challenge tests your understanding of optimum lookup mappings and sliding window optimizations.</p>
                          <h5 className="font-bold text-orange-500 mb-2">Method 1: HashMap Complement (O(N) Time, O(N) Space)</h5>
                          <p className="mb-4">By mapping key values directly to indices, lookup time becomes constant O(1), bringing the runtime down from quadratic brute force to linear scan.</p>
                          <h5 className="font-bold text-orange-500 mb-2">Hints Board:</h5>
                          <ul className="list-decimal pl-6 space-y-2">
                            {selectedProblem.hints && selectedProblem.hints.length > 0
                              ? selectedProblem.hints.map((h, i) => <li key={i}>{h}</li>)
                              : <li>Try utilizing a hash map or sorting array pointers.</li>
                            }
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* TAB 3: SOLUTIONS */}
                    {leftTab === 'solutions' && (
                      <div className="space-y-6">
                        <h4 className={`text-xl font-black ${uiTheme === 'dark' ? 'text-white' : 'text-slate-805'}`}>Scholar Community Solutions</h4>
                        <div className="space-y-4">
                          {[
                            { author: 'srividya_k', votes: 142, desc: 'Ultra simple Python O(N) linear scan mapping solution' },
                            { author: 'deepmind_agent', votes: 98, desc: 'Optimal C++ standard unordered_map pointer array' },
                            { author: 'bramha_student', votes: 54, desc: 'Clear JavaScript solution with exhaustive explainers' }
                          ].map((sol, i) => (
                            <div key={i} className={`p-4 border rounded-xl ${
                              uiTheme === 'dark' ? 'bg-slate-900/30 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-600'
                            }`}>
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-bold text-xs text-orange-500">@{sol.author}</span>
                                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-white font-mono">▲ {sol.votes} votes</span>
                              </div>
                              <p className="text-xs">{sol.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB 4: SUBMISSIONS LOG */}
                    {leftTab === 'submissions' && (
                      <div className="space-y-6">
                        <h4 className={`text-xl font-black ${uiTheme === 'dark' ? 'text-white' : 'text-slate-850'}`}>Your Submissions Logs</h4>
                        
                        <div className="space-y-3">
                          {user ? (
                            <div className="text-xs text-slate-400 bg-slate-900/40 p-4 border border-slate-800 rounded-xl text-center">
                              Submissions log ledger loaded successfully from MongoDB. Keep solving to log more execution records!
                            </div>
                          ) : (
                            <div className="text-xs text-rose-500 bg-rose-500/10 p-4 border border-rose-500/20 rounded-xl text-center">
                              Please login to monitor submission statistics.
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                </div>
            </div>

            {/* RESIZABLE SLIDER DIVIDER DRAG BAR (only visible on screen width >= lg) */}
            <div 
              ref={dragBarRef}
              onMouseDown={startResizing}
              className={`hidden lg:flex w-2 select-none cursor-col-resize hover:bg-orange-500 active:bg-orange-600 transition-colors z-20 flex-col items-center justify-center relative ${
                isDragging ? 'bg-orange-500' : uiTheme === 'dark' ? 'bg-slate-900 border-x border-slate-800' : 'bg-slate-100 border-x border-slate-250'
              }`}
              title="Drag to resize split panels"
            >
              <div className={`w-0.5 h-10 rounded-full ${uiTheme === 'dark' ? 'bg-slate-700' : 'bg-slate-350'}`}></div>
            </div>

            {/* RIGHT PANEL: PREMIUM CODE EDITOR & CONSOLE */}
            <div 
              style={{ width: `${100 - splitPercentage}%` }}
              className={`flex-grow flex flex-col h-full overflow-hidden ${
                mobileTab === 'editor' || mobileTab === 'console' ? 'flex w-full lg:w-auto' : 'hidden lg:flex'
              } ${
                uiTheme === 'dark' ? 'bg-[#080d17]' : 'bg-[#F0F4F8]'
              }`}
            >
                {/* ══════════════════════════════════════════════════════ */}
                {/* PREMIUM LANGUAGE SELECTOR TOOLBAR */}
                {/* ══════════════════════════════════════════════════════ */}
                <div className={`border-b flex-shrink-0 transition-colors ${
                  uiTheme === 'dark'
                    ? 'bg-gradient-to-r from-[#0d1425] via-[#111827] to-[#0d1425] border-slate-800/80'
                    : 'bg-white border-slate-200'
                }`}>
                  {/* Language Tabs Row */}
                  <div className="flex items-center overflow-x-auto scrollbar-hide">
                    {languages.map(l => {
                      const isActive = selectedLanguage === l.id;
                      const langColors = {
                        javascript: { active: '#F7DF1E', bg: 'from-yellow-500/20 to-yellow-600/5', border: 'border-yellow-500/50', text: 'text-yellow-400' },
                        typescript: { active: '#3178C6', bg: 'from-blue-500/20 to-blue-600/5', border: 'border-blue-500/50', text: 'text-blue-400' },
                        python:     { active: '#3776AB', bg: 'from-cyan-500/20 to-cyan-600/5', border: 'border-cyan-500/50', text: 'text-cyan-400' },
                        java:       { active: '#E76F00', bg: 'from-orange-500/20 to-orange-600/5', border: 'border-orange-500/50', text: 'text-orange-400' },
                        cpp:        { active: '#659AD2', bg: 'from-indigo-500/20 to-indigo-600/5', border: 'border-indigo-500/50', text: 'text-indigo-400' },
                        c:          { active: '#A8B9CC', bg: 'from-slate-500/20 to-slate-600/5', border: 'border-slate-500/50', text: 'text-slate-400' },
                        csharp:     { active: '#9B4993', bg: 'from-purple-500/20 to-purple-600/5', border: 'border-purple-500/50', text: 'text-purple-400' },
                        go:         { active: '#00ACD7', bg: 'from-sky-500/20 to-sky-600/5', border: 'border-sky-500/50', text: 'text-sky-400' },
                        kotlin:     { active: '#7F52FF', bg: 'from-violet-500/20 to-violet-600/5', border: 'border-violet-500/50', text: 'text-violet-400' },
                        sql:        { active: '#F29111', bg: 'from-amber-500/20 to-amber-600/5', border: 'border-amber-500/50', text: 'text-amber-400' },
                        bash:       { active: '#4EAA25', bg: 'from-emerald-500/20 to-emerald-600/5', border: 'border-emerald-500/50', text: 'text-emerald-400' },
                      };
                      const c = langColors[l.id] || langColors.javascript;
                      return (
                        <button
                          key={l.id}
                          onClick={() => setSelectedLanguage(l.id)}
                          title={l.name}
                          className={`relative flex items-center gap-1.5 px-4 py-3.5 text-[10px] font-black uppercase tracking-widest flex-shrink-0 transition-all duration-200 ${
                            isActive
                              ? `bg-gradient-to-b ${c.bg} ${c.text} border-b-2 ${c.border}`
                              : uiTheme === 'dark'
                                ? 'text-slate-500 hover:text-slate-300 hover:bg-white/3 border-b-2 border-transparent'
                                : 'text-slate-400 hover:text-slate-700 border-b-2 border-transparent'
                          }`}
                        >
                          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded font-mono ${
                            isActive
                              ? `bg-gradient-to-br ${c.bg} border ${c.border} ${c.text}`
                              : uiTheme === 'dark' ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-400'
                          }`}>{l.icon}</span>
                          <span className="hidden sm:inline">{l.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ══════════════════════════════════════════════════════ */}
                {/* PREMIUM MONACO EDITOR CONTAINER */}
                {/* ══════════════════════════════════════════════════════ */}
                <div className={`flex-grow relative border-b transition-all ${
                  mobileTab === 'console' ? 'h-[30%] flex-grow-0' : 'h-[60%]'
                } ${
                  uiTheme === 'dark' ? 'border-slate-800/80 bg-[#080d17]' : 'border-slate-200 bg-[#fdfdff]'
                }`}>
                  {/* Decorative ambient glow behind editor */}
                  {uiTheme === 'dark' && (
                    <div className="absolute inset-0 pointer-events-none z-0">
                      <div className="absolute top-0 left-0 w-64 h-32 bg-blue-600/5 rounded-full blur-3xl" />
                      <div className="absolute bottom-0 right-0 w-48 h-24 bg-orange-500/5 rounded-full blur-3xl" />
                    </div>
                  )}
                  {/* Editor line count indicator */}
                  <div className={`absolute top-3 right-4 z-10 flex items-center gap-2 ${
                    uiTheme === 'dark' ? 'text-slate-700' : 'text-slate-300'
                  }`}>
                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase">{selectedLanguage}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="Editor Ready"></span>
                  </div>
                  <div className="relative z-1 h-full">
                    <Editor
                      height="100%"
                      theme={editorTheme}
                      language={selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage === 'kotlin' ? 'kotlin' : selectedLanguage === 'bash' ? 'shell' : selectedLanguage}
                      value={code[selectedLanguage] || ''}
                      onChange={handleCodeChange}
                      options={{
                        fontSize: 14,
                        fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
                        fontLigatures: true,
                        minimap: { enabled: true, scale: 1, showSlider: 'mouseover' },
                        scrollBeyondLastLine: false,
                        padding: { top: 20, bottom: 20 },
                        roundedSelection: true,
                        cursorBlinking: 'expand',
                        cursorSmoothCaretAnimation: 'on',
                        lineHeight: 24,
                        wordWrap: 'on',
                        smoothScrolling: true,
                        renderLineHighlight: 'all',
                        lineNumbersMinChars: 3,
                        bracketPairColorization: { enabled: true },
                        guides: { bracketPairs: true },
                        scrollbar: {
                          verticalScrollbarSize: 6,
                          horizontalScrollbarSize: 6,
                        }
                      }}
                    />
                  </div>
                </div>

                {/* ══════════════════════════════════════════════════════ */}
                {/* PREMIUM CONSOLE PANEL */}
                {/* ══════════════════════════════════════════════════════ */}
                <div className={`flex-shrink-0 flex flex-col ${
                  mobileTab === 'console' ? 'flex-grow h-[70%]' : 'h-[40%]'
                } ${
                  uiTheme === 'dark' ? 'bg-[#0d1425]' : 'bg-white'
                }`}>
                  {/* Console Header Tabs */}
                  <div className={`flex items-center justify-between px-5 py-0 border-b flex-shrink-0 ${
                    uiTheme === 'dark' ? 'border-slate-800/80 bg-[#0d1425]' : 'border-slate-200 bg-slate-50'
                  }`}>
                    <div className="flex items-center">
                      {[
                        { id: 'testcase', label: 'Test Cases', icon: <Target size={12} /> },
                        { id: 'result', label: 'Output', icon: <Terminal size={12} /> },
                      ].map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveRightSubTab(tab.id)}
                          className={`flex items-center gap-1.5 px-5 py-3 text-[10px] font-black uppercase tracking-widest border-b-2 transition-all ${
                            activeRightSubTab === tab.id
                              ? 'border-orange-500 text-orange-400'
                              : uiTheme === 'dark'
                                ? 'border-transparent text-slate-500 hover:text-slate-300'
                                : 'border-transparent text-slate-400 hover:text-slate-700'
                          }`}
                        >
                          {tab.icon}
                          {tab.label}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      {/* Autosave status */}
                      <span className={`text-[9px] font-mono font-bold hidden sm:flex items-center gap-1.5 ${
                        uiTheme === 'dark' ? 'text-slate-600' : 'text-slate-400'
                      }`}>
                        <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                        {autoSaveStatus}
                      </span>
                      {output && (
                        <button
                          onClick={() => setOutput('')}
                          className={`p-1 rounded transition-colors ${
                            uiTheme === 'dark' ? 'text-slate-600 hover:text-slate-300' : 'text-slate-400 hover:text-slate-700'
                          }`}
                        >
                          <X size={13} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Console Body */}
                  <div className="flex-grow overflow-y-auto custom-scrollbar">

                    {/* ─── TESTCASE PANEL ─── */}
                    {activeRightSubTab === 'testcase' && (
                      <div className="p-5 space-y-4">
                        {/* Case selector tabs */}
                        <div className="flex flex-wrap items-center gap-2">
                          {customTestcases.map((tc, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveTestcaseIndex(idx)}
                              className={`px-4 py-1.5 rounded-lg text-[10px] font-black border transition-all ${
                                activeTestcaseIndex === idx
                                  ? uiTheme === 'dark'
                                    ? 'bg-[#FFB800]/10 border-[#FFB800]/40 text-[#FFB800]'
                                    : 'bg-orange-50 border-orange-300 text-orange-600'
                                  : uiTheme === 'dark'
                                    ? 'bg-slate-900/50 border-slate-800 text-slate-500 hover:border-slate-600 hover:text-slate-300'
                                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
                              }`}
                            >
                              {tc.label}
                            </button>
                          ))}
                          <button
                            onClick={() => {
                              setCustomTestcases(prev => [
                                ...prev,
                                { input: '', expected: '', label: `Case ${prev.length + 1}` }
                              ]);
                              setActiveTestcaseIndex(customTestcases.length);
                            }}
                            className={`px-3 py-1.5 rounded-lg border border-dashed text-[10px] font-black flex items-center gap-1 transition-all ${
                              uiTheme === 'dark'
                                ? 'border-slate-700 text-slate-600 hover:border-slate-500 hover:text-slate-400'
                                : 'border-slate-300 text-slate-400 hover:border-slate-400 hover:text-slate-600'
                            }`}
                          >
                            <Plus size={11} /> Add
                          </button>
                        </div>

                        {/* Input / Expected side by side */}
                        {customTestcases[activeTestcaseIndex] && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <p className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                                uiTheme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                              }`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                Input
                              </p>
                              <textarea
                                value={customTestcases[activeTestcaseIndex].input}
                                onChange={(e) => {
                                  setCustomTestcases(prev => {
                                    const u = [...prev];
                                    u[activeTestcaseIndex].input = e.target.value;
                                    return u;
                                  });
                                }}
                                className={`w-full h-20 border rounded-xl p-3 font-mono text-xs outline-none transition-all resize-none ${
                                  uiTheme === 'dark'
                                    ? 'bg-[#080d17] border-slate-800 text-slate-300 focus:border-blue-500/50 placeholder:text-slate-700'
                                    : 'bg-slate-50 border-slate-200 text-slate-700 focus:border-blue-400 placeholder:text-slate-400'
                                }`}
                                placeholder="stdin input lines..."
                              />
                            </div>
                            <div className="space-y-2">
                              <p className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                                uiTheme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                              }`}>
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                Expected Output
                              </p>
                              <input
                                type="text"
                                value={customTestcases[activeTestcaseIndex].expected}
                                onChange={(e) => {
                                  setCustomTestcases(prev => {
                                    const u = [...prev];
                                    u[activeTestcaseIndex].expected = e.target.value;
                                    return u;
                                  });
                                }}
                                className={`w-full border rounded-xl px-3 py-2.5 font-mono text-xs outline-none transition-all ${
                                  uiTheme === 'dark'
                                    ? 'bg-[#080d17] border-slate-800 text-slate-300 focus:border-emerald-500/50 placeholder:text-slate-700'
                                    : 'bg-slate-50 border-slate-200 text-slate-700 focus:border-emerald-400 placeholder:text-slate-400'
                                }`}
                                placeholder="expected stdout match..."
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* ─── OUTPUT/RESULT PANEL ─── */}
                    {activeRightSubTab === 'result' && (
                      <div className="p-5 space-y-4">

                        {/* Verdict Banner */}
                        {verdictStats && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`relative overflow-hidden rounded-2xl border p-4 ${
                              verdictStats.status === 'Accepted'
                                ? uiTheme === 'dark'
                                  ? 'bg-gradient-to-r from-emerald-950/60 to-green-950/40 border-emerald-800/60'
                                  : 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-300'
                                : uiTheme === 'dark'
                                  ? 'bg-gradient-to-r from-rose-950/60 to-red-950/40 border-rose-800/60'
                                  : 'bg-gradient-to-r from-rose-50 to-red-50 border-rose-300'
                            }`}
                          >
                            {/* Glowing accent line */}
                            <div className={`absolute top-0 left-0 w-full h-0.5 ${
                              verdictStats.status === 'Accepted'
                                ? 'bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400'
                                : 'bg-gradient-to-r from-rose-400 via-red-300 to-rose-400'
                            }`} />
                            <div className="flex flex-wrap items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                {verdictStats.status === 'Accepted' ? (
                                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                                    <CheckCircle2 size={22} className="text-emerald-400" />
                                  </div>
                                ) : (
                                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center">
                                    <AlertCircle size={22} className="text-rose-400" />
                                  </div>
                                )}
                                <div>
                                  <p className={`text-base font-black tracking-tight ${
                                    verdictStats.status === 'Accepted' ? 'text-emerald-400' : 'text-rose-400'
                                  }`}>{verdictStats.status}</p>
                                  <p className={`text-[10px] font-bold ${
                                    uiTheme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                                  }`}>
                                    {verdictStats.passed}/{verdictStats.total} cases passed
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[10px] font-black font-mono ${
                                  uiTheme === 'dark' ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-600'
                                }`}>
                                  <Zap size={11} className="text-yellow-400" />
                                  {verdictStats.runtime} ms
                                </div>
                                <div className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[10px] font-black font-mono ${
                                  uiTheme === 'dark' ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-600'
                                }`}>
                                  <Cpu size={11} className="text-blue-400" />
                                  {verdictStats.memory} MB
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Output Content */}
                        <div>
                          {(() => {
                            const sqlTableData = (() => {
                              try {
                                const cleaned = (output || '').trim();
                                if (cleaned.startsWith('[') && cleaned.endsWith(']')) {
                                  const parsed = JSON.parse(cleaned);
                                  if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
                                    return parsed;
                                  }
                                }
                              } catch (e) {}
                              return null;
                            })();

                            if (sqlTableData) {
                              const headers = Object.keys(sqlTableData[0]);
                              return (
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <p className={`text-[9px] font-black uppercase tracking-widest ${
                                      uiTheme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                                    }`}>SQL Query Results</p>
                                    <span className="text-[9px] font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                                      {sqlTableData.length} rows
                                    </span>
                                  </div>
                                  <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-[#050912]">
                                    <table className="w-full text-left border-collapse font-mono text-[11px]">
                                      <thead>
                                        <tr className={`border-b ${
                                          uiTheme === 'dark' ? 'bg-slate-900/80 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                                        }`}>
                                          {headers.map(h => <th key={h} className="px-4 py-2.5 font-black text-[10px] uppercase tracking-wider">{h}</th>)}
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {sqlTableData.map((row, rIdx) => (
                                          <tr key={rIdx} className={`border-b transition-colors ${
                                            uiTheme === 'dark' ? 'border-slate-900 hover:bg-slate-900/60 text-slate-300' : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                                          }`}>
                                            {headers.map(h => <td key={h} className="px-4 py-2.5">{String(row[h] !== undefined ? row[h] : 'NULL')}</td>)}
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              );
                            }

                            return (
                              <div className="space-y-2">
                                <p className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                                  uiTheme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                                }`}>
                                  <Terminal size={10} />
                                  Standard Output
                                </p>
                                <pre className={`font-mono text-xs rounded-xl p-4 border max-h-48 overflow-auto leading-relaxed ${
                                  uiTheme === 'dark'
                                    ? 'bg-[#050912] border-slate-800/80 text-slate-300'
                                    : 'bg-slate-50 border-slate-200 text-slate-700'
                                }`}>
                                  {output || <span className={uiTheme === 'dark' ? 'text-slate-700 italic' : 'text-slate-400 italic'}>Output idle — run your code to see results.</span>}
                                </pre>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ══════════════════════════════════════════════════════ */}
                  {/* PREMIUM RUN & SUBMIT ACTION BAR */}
                  {/* ══════════════════════════════════════════════════════ */}
                  <div className={`border-t flex-shrink-0 transition-colors ${
                    uiTheme === 'dark'
                      ? 'bg-gradient-to-r from-[#0d1425] via-[#0f1a2e] to-[#0d1425] border-slate-800/80'
                      : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex items-center justify-between px-5 py-3">
                      {/* Left: Problem stats micro info */}
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider ${
                          uiTheme === 'dark' ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          <Target size={10} />
                          <span>{selectedProblem?.difficulty || '—'}</span>
                        </div>
                        {selectedProblem?.accuracy && (
                          <div className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider ${
                            uiTheme === 'dark' ? 'text-slate-600' : 'text-slate-400'
                          }`}>
                            <BarChart3 size={10} />
                            <span>{selectedProblem.accuracy}% accepted</span>
                          </div>
                        )}
                      </div>

                      {/* Right: Action Buttons */}
                      <div className="flex items-center gap-3">
                        {/* Run Code Button */}
                        <button
                          onClick={handleRunCode}
                          disabled={isRunning || isSubmitting}
                          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-40 ${
                            isRunning
                              ? uiTheme === 'dark'
                                ? 'bg-slate-800 border border-slate-700 text-slate-400 cursor-not-allowed'
                                : 'bg-slate-100 border border-slate-300 text-slate-400 cursor-not-allowed'
                              : uiTheme === 'dark'
                                ? 'bg-slate-800/80 hover:bg-slate-700 border border-slate-700/80 hover:border-slate-600 text-slate-200 hover:text-white hover:scale-105 active:scale-95 shadow-lg'
                                : 'bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 hover:text-slate-900 hover:scale-105 active:scale-95 shadow'
                          }`}
                        >
                          {isRunning ? (
                            <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Play size={12} />
                          )}
                          {isRunning ? 'Running...' : 'Run'}
                        </button>

                        {/* Submit Button - Premium */}
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting || isRunning}
                          className={`relative overflow-hidden flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-40 text-white shadow-xl ${
                            isSubmitting
                              ? 'bg-gradient-to-r from-orange-700 to-amber-600 cursor-not-allowed'
                              : 'bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 hover:scale-105 active:scale-95 hover:shadow-orange-500/30'
                          }`}
                          style={{ boxShadow: isSubmitting ? 'none' : '0 4px 24px -4px rgba(249,115,22,0.4)' }}
                        >
                          {/* Shimmer effect */}
                          {!isSubmitting && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
                          )}
                          {isSubmitting ? (
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Send size={12} />
                          )}
                          {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Practice;
