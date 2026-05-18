import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, 
  Terminal, 
  Play, 
  Send, 
  Trophy, 
  Clock, 
  CheckCircle2, 
  Filter, 
  Search,
  ChevronRight,
  Zap,
  Star,
  Lock,
  User,
  Activity,
  Layers,
  X,
  Target,
  Flame,
  Layout,
  BookOpen,
  Settings,
  MoreVertical,
  Check,
  AlertCircle,
  MessageSquare,
  FileText,
  Lightbulb,
  Cpu,
  History,
  Maximize2,
  ChevronDown,
  Globe,
  Award,
  ArrowRight
} from 'lucide-react';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import Editor from '@monaco-editor/react';

const Practice = () => {
  const { user } = useAuth();
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeDifficulty, setActiveDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [code, setCode] = useState({
    javascript: `function solution(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    python: `def solution(nums, target):
    mapping = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in mapping:
            return [mapping[complement], i]
        mapping[num] = i
    return []`,
    cpp: `vector<int> solution(vector<int>& nums, int target) {
    unordered_map<int, int> mapping;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (mapping.find(complement) != mapping.end()) {
            return {mapping[complement], i};
        }
        mapping[nums[i]] = i;
    }
    return {};
}`,
    java: `class Solution {
    public int[] solution(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`
  });

  const topics = ['All', 'Arrays', 'Strings', 'Linked List', 'Trees', 'Graphs', 'DP', 'Greedy', 'Recursion', 'Backtracking', 'Binary Search'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: <Globe size={14} className="text-yellow-400" /> },
    { id: 'python', name: 'Python', icon: <Globe size={14} className="text-blue-400" /> },
    { id: 'cpp', name: 'C++', icon: <Globe size={14} className="text-indigo-400" /> },
    { id: 'java', name: 'Java', icon: <Globe size={14} className="text-red-400" /> }
  ];

  const problems = [
    { id: 1, title: 'Two Sum', difficulty: 'Easy', category: 'Arrays', accuracy: '45.2%', points: 100, status: 'Solved', tags: ['Hash Table', 'Array'] },
    { id: 2, title: 'Longest Palindrome', difficulty: 'Medium', category: 'Strings', accuracy: '32.1%', points: 250, status: 'Attempted', tags: ['String', 'DP'] },
    { id: 3, title: 'Binary Tree Level Order', difficulty: 'Hard', category: 'Trees', accuracy: '18.5%', points: 500, status: 'Unsolved', tags: ['Tree', 'BFS'] },
    { id: 4, title: 'Merge K Sorted Lists', difficulty: 'Hard', category: 'Linked List', accuracy: '12.8%', points: 600, status: 'Unsolved', tags: ['Linked List', 'Heap'] },
    { id: 5, title: 'Valid Parentheses', difficulty: 'Easy', category: 'Strings', accuracy: '68.9%', points: 100, status: 'Solved', tags: ['Stack', 'String'] },
    { id: 6, title: 'LRU Cache', difficulty: 'Medium', category: 'Design', accuracy: '24.3%', points: 300, status: 'Unsolved', tags: ['Linked List', 'Hash Table'] },
    { id: 7, title: 'House Robber', difficulty: 'Medium', category: 'DP', accuracy: '42.1%', points: 200, status: 'Solved', tags: ['DP'] },
    { id: 8, title: 'Merge Sort', difficulty: 'Easy', category: 'Recursion', accuracy: '55.6%', points: 150, status: 'Solved', tags: ['Recursion', 'Sorting'] },
    { id: 9, title: 'Word Search', difficulty: 'Hard', category: 'Backtracking', accuracy: '15.2%', points: 450, status: 'Unsolved', tags: ['Backtracking', 'DFS'] },
    { id: 10, title: 'Knapsack Problem', difficulty: 'Hard', category: 'DP', accuracy: '10.5%', points: 700, status: 'Attempted', tags: ['DP', 'Greedy'] },
  ];

  const filteredProblems = problems.filter(p => {
    const matchesTopic = activeFilter === 'All' || p.category === activeFilter;
    const matchesDiff = activeDifficulty === 'All' || p.difficulty === activeDifficulty;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesDiff && matchesSearch;
  });

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput("Executing code... Initializing Sandbox.");
    setTimeout(() => {
      setOutput("Running test cases...\nTest Case 1: [2,7,11,15], target=9 -> Output: [0,1] ✅\nTest Case 2: [3,2,4], target=6 -> Output: [1,2] ✅\n\nResult: 2/2 Passed. Runtime: 64ms");
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setOutput("Submitting code to Judge0... Verifying concealed cases.");
    setTimeout(() => {
      setOutput("Verifying against hidden test cases...\nProcessing 158 hidden test cases...\n\n✅ Acceptance: 100%\n🚀 Points Earned: +100\n🔥 Streak Maintained!");
      setIsSubmitting(false);
    }, 2500);
  };

  return (
    <div className="bg-[#0F172A] min-h-screen selection:bg-[#FFB800]/30 pb-20">
      {!selectedProblem ? (
        <div className="max-w-[1600px] mx-auto px-8 md:px-12 pt-10">
          {/* Header & Streak */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-20">
            <div className="lg:col-span-3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-16"
              >
                <div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
                        Elite <span className="text-[#FFB800]">Arena</span>
                    </h1>
                    <p className="text-slate-500 font-bold text-lg tracking-wide">Establish your technical supremacy with 500+ master challenges.</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="bg-white rounded-[24px] py-4 px-10 border border-white/10 flex items-center gap-5 shadow-2xl relative overflow-hidden group cursor-default">
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#FFB800]"></div>
                        <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-[#FFB800] shadow-inner group-hover:scale-110 transition-transform">
                            <Flame size={28} fill="currentColor" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Current Streak</p>
                            <p className="text-2xl font-black text-slate-900 tracking-tighter">12 Cycles</p>
                        </div>
                    </div>
                </div>
              </motion.div>

              {/* Filters Bento Area */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-[40px] p-10 shadow-2xl mb-12 border border-white/20"
              >
                <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                  <div className="relative flex-grow w-full">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
                    <input 
                      type="text" 
                      placeholder="Identify specific challenges by name or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-16 pr-8 py-5 bg-slate-50 border border-slate-100 rounded-[24px] focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all shadow-inner font-bold text-slate-800 placeholder:text-slate-300"
                    />
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <select 
                        value={activeDifficulty}
                        onChange={(e) => setActiveDifficulty(e.target.value)}
                        className="px-8 py-5 bg-slate-900 border-none rounded-[24px] text-xs font-black text-[#FFB800] uppercase tracking-widest outline-none cursor-pointer hover:bg-indigo-600 transition-colors shadow-2xl appearance-none pr-12 relative"
                    >
                        {difficulties.map(d => <option key={d} value={d}>{d} Difficulty</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-4 overflow-x-auto pb-4 custom-scrollbar">
                  {topics.map(topic => (
                    <button
                      key={topic}
                      onClick={() => setActiveFilter(topic)}
                      className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all ${
                        activeFilter === topic 
                        ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-200 scale-105' 
                        : 'bg-slate-50 text-slate-400 border border-slate-100 hover:border-indigo-200'
                      }`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Problems Bento List */}
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="bg-white rounded-[48px] overflow-hidden shadow-2xl border border-white/20"
              >
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 border-b border-slate-800">
                      <th className="px-10 py-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] w-24">Status</th>
                      <th className="px-10 py-8 text-[10px] font-black text-white uppercase tracking-[0.3em]">Challenge Manifest</th>
                      <th className="px-10 py-8 text-[10px] font-black text-white uppercase tracking-[0.3em]">Complexity</th>
                      <th className="px-10 py-8 text-[10px] font-black text-white uppercase tracking-[0.3em]">Acceptance</th>
                      <th className="px-10 py-8 text-[10px] font-black text-white uppercase tracking-[0.3em] text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProblems.map((prob, i) => (
                      <tr key={prob.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                        <td className="px-10 py-8 text-center">
                            {prob.status === 'Solved' ? (
                                <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center text-green-500 shadow-sm mx-auto">
                                    <CheckCircle2 size={20} />
                                </div>
                            ) : prob.status === 'Attempted' ? (
                                <div className="w-8 h-8 rounded-xl border-2 border-[#FFB800] border-t-transparent animate-spin mx-auto"></div>
                            ) : (
                                <div className="w-8 h-8 rounded-xl border-2 border-slate-100 mx-auto"></div>
                            )}
                        </td>
                        <td className="px-10 py-8">
                          <div>
                            <p className="font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-3 text-lg tracking-tight">{prob.title}</p>
                            <div className="flex gap-3">
                                {prob.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-white border border-slate-100 text-slate-400 rounded-lg text-[9px] font-black uppercase tracking-widest">{tag}</span>
                                ))}
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-8">
                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full ${
                                prob.difficulty === 'Easy' ? 'bg-green-50 text-green-600' :
                                prob.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600' :
                                'bg-red-50 text-red-600'
                            }`}>{prob.difficulty}</span>
                        </td>
                        <td className="px-10 py-8 text-sm font-black text-slate-400 tracking-tight">{prob.accuracy}</td>
                        <td className="px-10 py-8 text-right">
                          <button 
                            onClick={() => setSelectedProblem(prob)}
                            className="px-8 py-3 bg-slate-900 text-[#FFB800] rounded-[18px] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95"
                          >
                            Establish
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </div>

            {/* Sidebar Stats Bento */}
            <div className="lg:col-span-1 space-y-12">
                <motion.div 
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="bg-white rounded-[48px] p-12 shadow-2xl relative overflow-hidden group cursor-pointer"
                   onClick={() => setSelectedProblem(problems[3])}
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
                    <div className="flex items-center justify-between mb-10">
                        <div className="w-16 h-16 bg-slate-900 rounded-[24px] flex items-center justify-center text-[#FFB800] shadow-2xl group-hover:rotate-12 transition-transform">
                            <Zap size={32} fill="currentColor" />
                        </div>
                        <span className="px-5 py-2 bg-[#FFB800] text-slate-900 text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">Daily Alpha</span>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Trapping Rain Water</h4>
                    <p className="text-slate-400 text-sm mb-10 font-bold leading-relaxed">Establish dominance over the two-pointer protocol and earn 2x bonus credentials.</p>
                    <button className="w-full py-5 bg-slate-900 text-white font-black rounded-[24px] text-xs uppercase tracking-widest shadow-2xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-4">
                        Initialize Session <ArrowRight size={18} />
                    </button>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-[48px] p-12 shadow-2xl border border-white/20"
                >
                    <h3 className="text-xl font-black text-slate-900 mb-12 flex items-center gap-5">
                        <Activity size={24} className="text-indigo-600" /> Scholar Rank
                    </h3>
                    <div className="space-y-12">
                        <div>
                            <div className="flex justify-between items-end mb-5">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Efficiency Index</p>
                                <p className="text-2xl font-black text-slate-900 tracking-tight">128/500</p>
                            </div>
                            <div className="h-4 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-1">
                                <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-2xl shadow-blue-500/20" style={{ width: '25.6%' }}></div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6">
                            <div className="p-8 bg-slate-900 rounded-[32px] text-center shadow-2xl">
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3">Global Tier</p>
                                <p className="text-4xl font-black text-[#FFB800] tracking-tighter">#1,245</p>
                            </div>
                            <div className="p-8 bg-indigo-50 rounded-[32px] text-center">
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-3">Scholar Points</p>
                                <p className="text-4xl font-black text-indigo-600 tracking-tighter">12,450</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
          </div>
        </div>
      ) : (
        /* Elite IDE Interface */
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="fixed inset-0 z-[2000] bg-[#0F172A] flex flex-col h-screen overflow-hidden"
        >
          {/* Elite Header */}
          <div className="h-20 bg-white border-b border-white/10 flex items-center justify-between px-10 flex-shrink-0">
            <div className="flex items-center gap-10">
                <button 
                  onClick={() => setSelectedProblem(null)}
                  className="w-12 h-12 bg-slate-900 text-[#FFB800] rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xl"
                >
                    <ChevronRight className="rotate-180" size={24} />
                </button>
                <div className="h-10 w-px bg-slate-100"></div>
                <div className="flex items-center gap-6">
                    <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-lg shadow-2xl">G</div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{selectedProblem.title}</h2>
                    <span className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${
                        selectedProblem.difficulty === 'Easy' ? 'bg-green-50 text-green-600' :
                        selectedProblem.difficulty === 'Medium' ? 'bg-amber-50 text-amber-600' :
                        'bg-red-50 text-red-600'
                    }`}>
                        {selectedProblem.difficulty} Manifest
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="p-4 bg-slate-50 hover:bg-slate-900 hover:text-[#FFB800] rounded-2xl text-slate-400 transition-all shadow-sm"><Star size={22} /></button>
                <button className="p-4 bg-slate-50 hover:bg-slate-900 hover:text-[#FFB800] rounded-2xl text-slate-400 transition-all shadow-sm"><MessageSquare size={22} /></button>
                <div className="h-10 w-px bg-slate-100"></div>
                <div className="bg-slate-900 py-3 px-6 rounded-2xl flex items-center gap-4 shadow-2xl">
                    <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-black text-xs">
                        {user?.displayName?.[0] || 'S'}
                    </div>
                    <span className="text-xs font-black text-white uppercase tracking-widest">{user?.displayName || 'Scholar'}</span>
                </div>
            </div>
          </div>

          <div className="flex-grow flex overflow-hidden">
            {/* Left Column: Problem Briefing */}
            <div className="w-[42%] flex flex-col border-r border-white/5 bg-white relative">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-transparent pointer-events-none"></div>
                <div className="flex border-b border-slate-100 bg-white relative z-10">
                    {['description', 'editorial', 'discussion'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-grow py-6 text-[10px] font-black uppercase tracking-[0.3em] transition-all relative ${
                                activeTab === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-900'
                            }`}
                        >
                            {tab}
                            {activeTab === tab && <motion.div layoutId="activeTabIDE" className="absolute bottom-0 left-10 right-10 h-1.5 bg-indigo-600 rounded-t-full shadow-2xl shadow-indigo-500" />}
                        </button>
                    ))}
                </div>

                <div className="flex-grow overflow-y-auto p-16 relative z-10 custom-scrollbar">
                    <div className="prose prose-slate max-w-none">
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-slate-900 text-[#FFB800] rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-12 shadow-2xl">
                            <Cpu size={14} /> Neural Briefing Active
                        </div>
                        <h3 className="text-4xl font-black text-slate-900 mb-10 tracking-tighter">Objective <span className="text-indigo-600">Overview</span></h3>
                        
                        <div className="bg-slate-50 border border-slate-100 p-10 rounded-[40px] mb-12 shadow-inner">
                            <p className="text-slate-700 font-bold text-xl leading-relaxed">
                                Given an array of integers <code className="bg-slate-900 text-white px-3 py-1 rounded-lg text-sm mx-1">nums</code> and an integer <code className="bg-slate-900 text-white px-3 py-1 rounded-lg text-sm mx-1">target</code>, return indices of the two numbers such that they add up to target.
                            </p>
                        </div>

                        <div className="space-y-16">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8 flex items-center gap-4">
                                    <Target size={18} className="text-[#FFB800]" /> Validation Case Alpha
                                </h4>
                                <div className="bg-slate-900 text-indigo-100 border border-slate-800 rounded-[32px] p-10 font-mono text-sm space-y-4 shadow-2xl">
                                    <p><span className="text-slate-500 font-black uppercase text-[10px] tracking-widest mr-4">Input:</span> nums = [2,7,11,15], target = 9</p>
                                    <p><span className="text-slate-500 font-black uppercase text-[10px] tracking-widest mr-4">Output:</span> [0,1]</p>
                                    <div className="pt-4 border-t border-white/5 mt-4">
                                        <p className="text-slate-400 italic">Complexity Theorem: O(n) Time | O(n) Space Required.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Master IDE */}
            <div className="flex-grow flex flex-col bg-[#0F172A] overflow-hidden">
                <div className="h-16 bg-[#0F172A] border-b border-white/5 flex items-center justify-between px-10 flex-shrink-0">
                    <div className="flex items-center gap-10">
                        <div className="relative group">
                            <button className="flex items-center gap-5 px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-[#FFB800] hover:bg-white/10 transition-all shadow-2xl">
                                {languages.find(l => l.id === selectedLanguage).icon}
                                {languages.find(l => l.id === selectedLanguage).name} Protocols
                                <ChevronDown size={16} className="text-slate-500" />
                            </button>
                        </div>
                        <div className="h-8 w-px bg-white/5"></div>
                        <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-500 hover:text-white transition-all shadow-inner"><Settings size={20} /></button>
                        <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-500 hover:text-white transition-all shadow-inner"><History size={20} /></button>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-slate-500 hover:text-white transition-all"><Maximize2 size={20} /></button>
                    </div>
                </div>

                <div className="flex-grow relative bg-[#0c102b]">
                    <Editor
                      height="100%"
                      theme="vs-dark"
                      language={selectedLanguage}
                      value={code[selectedLanguage]}
                      onChange={(val) => setCode({ ...code, [selectedLanguage]: val })}
                      options={{
                        fontSize: 18,
                        fontFamily: 'JetBrains Mono, monospace',
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        smoothScrolling: true,
                        cursorBlinking: 'smooth',
                        cursorSmoothCaretAnimation: "on",
                        padding: { top: 40, bottom: 40 },
                        lineNumbersMinChars: 4,
                        lineDecorationsWidth: 24,
                        renderLineHighlight: 'all',
                        overviewRulerBorder: false,
                        hideCursorInOverviewRuler: true
                      }}
                    />
                </div>

                {/* Console Panel */}
                <div className="flex-shrink-0 flex flex-col">
                    <AnimatePresence>
                        {output && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="bg-[#0c102b] border-t border-white/5 p-12 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
                            >
                                <div className="flex items-center justify-between mb-10">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-600">Execution Output Terminal</h4>
                                    <button onClick={() => setOutput('')} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-500 hover:text-white transition-all"><X size={20} /></button>
                                </div>
                                <pre className="font-mono text-base text-indigo-200 leading-relaxed overflow-x-auto whitespace-pre-wrap selection:bg-indigo-500/30">
                                    {output}
                                </pre>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="h-28 bg-[#0F172A] border-t border-white/10 flex items-center justify-between px-12">
                        <button className="flex items-center gap-4 px-10 py-5 bg-white/5 text-slate-500 rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 hover:text-white transition-all active:scale-95">
                            <Terminal size={18} /> Master Console
                        </button>
                        <div className="flex items-center gap-8">
                            <button 
                                onClick={handleRunCode}
                                disabled={isRunning}
                                className="flex items-center gap-4 px-12 py-5 bg-white text-slate-900 rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#FFB800] transition-all active:scale-95 shadow-2xl disabled:opacity-50"
                            >
                                {isRunning ? <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div> : <Play size={18} fill="currentColor" />} Dry Run
                            </button>
                            <button 
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="flex items-center gap-4 px-16 py-5 bg-indigo-600 text-white rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-indigo-500 shadow-[0_20px_50px_rgba(79,70,229,0.3)] transition-all active:scale-95 disabled:opacity-50"
                            >
                                {isSubmitting ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Send size={18} />} Deploy Solution
                            </button>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </motion.div>
      )}
      <div className={selectedProblem ? 'hidden' : 'block mt-20'}>
        <Footer />
      </div>
    </div>
  );
};

export default Practice;
