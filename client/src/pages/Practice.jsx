import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Terminal, Play, Send, Trophy, Clock, CheckCircle2, Filter, Search,
  ChevronRight, Zap, Star, Lock, User, Activity, Layers, X, Target, Flame,
  Layout, BookOpen, Settings, MoreVertical, Check, AlertCircle, MessageSquare,
  FileText, Lightbulb, Cpu, History, Maximize2, ChevronDown, Globe, Award, ArrowRight
} from 'lucide-react';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import Editor from '@monaco-editor/react';

const defaultCodeTemplates = {
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
    cpp: `#include <vector>
#include <unordered_map>
using namespace std;

vector<int> solution(vector<int>& nums, int target) {
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
    java: `import java.util.*;

class Solution {
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
};

const debugCodeTemplates = {
    javascript: `// DEBUG THIS CODE
// Problem: Reverse the array. There is a bug in the loop logic.
function reverseArray(arr) {
  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i];
    // Bug: Indexing is incorrect and loop runs too many times
    arr[i] = arr[arr.length - i]; 
    arr[arr.length - i] = temp;
  }
  return arr;
}
console.log(reverseArray([1, 2, 3, 4, 5]));`,
    python: `# DEBUG THIS CODE
# Problem: Reverse the array.
def reverse_array(arr):
    for i in range(len(arr)):
        temp = arr[i]
        # Bug: Index out of bounds and overwrites incorrectly
        arr[i] = arr[len(arr) - i] 
        arr[len(arr) - i] = temp
    return arr
    
print(reverse_array([1, 2, 3, 4, 5]))`,
    cpp: `#include <iostream>
#include <vector>
using namespace std;

// DEBUG THIS CODE
vector<int> reverseArray(vector<int> arr) {
    for (int i = 0; i < arr.size(); i++) {
        int temp = arr[i];
        // Bug: Index out of bounds
        arr[i] = arr[arr.size() - i];
        arr[arr.size() - i] = temp;
    }
    return arr;
}

int main() {
    vector<int> res = reverseArray({1, 2, 3, 4, 5});
    for(int n : res) cout << n << " ";
    return 0;
}`,
    java: `import java.util.Arrays;

class Solution {
    // DEBUG THIS CODE
    public static int[] reverseArray(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            int temp = arr[i];
            // Bug: Index out of bounds
            arr[i] = arr[arr.length - i];
            arr[arr.length - i] = temp;
        }
        return arr;
    }
    
    public static void main(String[] args) {
        System.out.println(Arrays.toString(reverseArray(new int[]{1, 2, 3, 4, 5})));
    }
}`
};

const Practice = () => {
  const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');
  const { user } = useAuth();
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeDifficulty, setActiveDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [code, setCode] = useState(defaultCodeTemplates);
  const [output, setOutput] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  useEffect(() => {
    if (selectedProblem) {
      if (selectedProblem.starterCode && selectedProblem.starterCode.length > 0) {
        const templates = {};
        selectedProblem.starterCode.forEach(sc => {
          templates[sc.language] = sc.code;
        });
        // Backwards compatibility fallbacks
        ['javascript', 'python', 'cpp', 'java'].forEach(lang => {
          if (!templates[lang]) {
            templates[lang] = defaultCodeTemplates[lang] || '';
          }
        });
        setCode(templates);
      } else {
        setCode(defaultCodeTemplates);
      }
    } else {
      setCode(defaultCodeTemplates);
    }
    setOutput('');
    setCustomInput('');
  }, [selectedProblem]);

  const topics = ['All', 'Arrays', 'Strings', 'Linked List', 'Trees', 'Graphs', 'DP', 'Greedy', 'Recursion', 'Backtracking', 'Binary Search'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];
  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: <Globe size={14} className="text-yellow-400" /> },
    { id: 'python', name: 'Python', icon: <Globe size={14} className="text-blue-400" /> },
    { id: 'cpp', name: 'C++', icon: <Globe size={14} className="text-orange-400" /> },
    { id: 'java', name: 'Java', icon: <Globe size={14} className="text-red-400" /> }
  ];

  const filteredProblems = problems.filter(p => {
    const matchesTopic = activeFilter === 'All' || p.category === activeFilter;
    const matchesDiff = activeDifficulty === 'All' || p.difficulty === activeDifficulty;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesDiff && matchesSearch;
  });

  const handleRunCode = async () => {
    if (!code[selectedLanguage]) return;
    setIsRunning(true);
    setOutput("Executing code via Code Engine...");
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/submissions/execute`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                language: selectedLanguage,
                code: code[selectedLanguage],
                stdin: customInput || ""
            })
        });
        const result = await response.json();
        
        if (result.stdout !== undefined) {
            let out = result.stdout;
            let err = result.stderr;
            
            if (err) {
                setOutput(`Execution Error:\n${err}`);
            } else {
                setOutput(`Output:\n${out || 'Program finished successfully without standard output.'}`);
            }
        } else {
            setOutput(`Execution failed: ${result.error || 'Unknown compiler error.'}`);
        }
    } catch (e) {
        setOutput(`Network Error: ${e.message}\nPlease check backend server compiler status.`);
    } finally {
        setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedProblem || !user) {
      return alert('Mandatory Action: Please login to save submission coordinates.');
    }
    setIsSubmitting(true);
    setOutput("Submitting code to Judge... Evaluating hidden test cases.");
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/submissions/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: selectedProblem._id,
          userId: user.id || user._id, // Support different token models
          language: selectedLanguage,
          code: code[selectedLanguage]
        })
      });
      const res = await response.json();
      
      if (res.success) {
        const sub = res.submission;
        let log = `STATUS: ${sub.status}\n`;
        log += `PASSED TEST CASES: ${res.passedCount} / ${res.totalCount}\n`;
        log += `AVERAGE RUNTIME: ${sub.runtime} ms\n`;
        
        if (sub.status === 'Accepted') {
          log += `\n✅ Acceptance: 100%\n🚀 Points Earned: +${sub.pointsEarned} XP\n🔥 Streak Maintained!`;
        } else {
          log += `\n❌ Failure Output:\n${sub.errorDetails || 'Incorrect output matching expected case.'}`;
        }
        setOutput(log);
      } else {
        setOutput(`Acceptance failed: ${res.error || 'Compiler service error.'}`);
      }
    } catch (err) {
      setOutput(`Submission Network Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0F172A] min-h-screen selection:bg-[#FFB800]/30 pb-20 pt-24">
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
                    <p className="text-slate-500 font-bold text-lg tracking-wide">Establish your technical supremacy with master challenges.</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="bg-[#1E293B] rounded-[24px] py-4 px-10 border border-white/10 flex items-center gap-5 shadow-2xl relative overflow-hidden group cursor-default">
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#FFB800]"></div>
                        <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-[#FFB800] shadow-inner group-hover:scale-110 transition-transform">
                            <Flame size={28} fill="currentColor" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Current Streak</p>
                            <p className="text-2xl font-black text-white tracking-tighter">12 Cycles</p>
                        </div>
                    </div>
                </div>
              </motion.div>

              {/* Filters Bento Area */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[#1E293B] rounded-[40px] p-10 shadow-2xl mb-12 border border-white/20"
              >
                <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
                  <div className="relative flex-grow w-full">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
                    <input 
                      type="text" 
                      placeholder="Identify specific challenges by name or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-16 pr-8 py-5 bg-slate-900/50 border border-slate-700 rounded-[24px] focus:ring-4 focus:ring-orange-500/10 outline-none transition-all shadow-inner font-bold text-slate-200 placeholder:text-slate-300"
                    />
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <select 
                        value={activeDifficulty}
                        onChange={(e) => setActiveDifficulty(e.target.value)}
                        className="px-8 py-5 bg-slate-900 border-none rounded-[24px] text-xs font-black text-[#FFB800] uppercase tracking-widest outline-none cursor-pointer hover:bg-orange-600 transition-colors shadow-2xl appearance-none pr-12 relative"
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
                        ? 'bg-orange-600 text-white shadow-2xl shadow-orange-900/50 scale-105' 
                        : 'bg-slate-900/50 text-slate-400 border border-slate-700 hover:border-orange-500/50'
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
                 className="bg-[#1E293B] rounded-[48px] overflow-hidden shadow-2xl border border-white/20"
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
                      <tr key={prob.id} className="border-b border-slate-800 hover:bg-slate-900/50 transition-colors group">
                        <td className="px-10 py-8 text-center">
                            {prob.status === 'Solved' ? (
                                <div className="w-8 h-8 bg-green-500/20 rounded-xl flex items-center justify-center text-green-500 shadow-sm mx-auto">
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
                            <p className="font-black text-white group-hover:text-orange-500 transition-colors mb-3 text-lg tracking-tight flex items-center gap-2">
                                {prob.isDebug && <AlertCircle size={16} className="text-orange-500" />}
                                {prob.title}
                            </p>
                            <div className="flex gap-3">
                                {prob.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1 bg-[#1E293B] border border-slate-700 text-slate-400 rounded-lg text-[9px] font-black uppercase tracking-widest">{tag}</span>
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
                        <td className="px-10 py-8 text-sm font-black text-slate-400 tracking-tight">{prob.accuracy}</td>
                        <td className="px-10 py-8 text-right">
                          <button 
                            onClick={() => setSelectedProblem(prob)}
                            className="px-8 py-3 bg-slate-900 text-[#FFB800] border border-slate-800 rounded-[18px] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-orange-600 hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95"
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
                   className="bg-[#1E293B] rounded-[48px] p-12 shadow-2xl relative overflow-hidden group cursor-pointer border border-slate-800"
                   onClick={() => setSelectedProblem(problems.find(p => p.id === 11))}
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-600 to-amber-500"></div>
                    <div className="flex items-center justify-between mb-10">
                        <div className="w-16 h-16 bg-slate-900 rounded-[24px] flex items-center justify-center text-[#FFB800] shadow-2xl group-hover:rotate-12 transition-transform">
                            <Zap size={32} fill="currentColor" />
                        </div>
                        <span className="px-5 py-2 bg-[#FFB800] text-slate-900 text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg">Daily Alpha</span>
                    </div>
                    <h4 className="text-2xl font-black text-white mb-4 tracking-tight">Debug: Array Logic</h4>
                    <p className="text-slate-400 text-sm mb-10 font-bold leading-relaxed">Fix the out-of-bounds array reversal bug and claim today's bonus XP.</p>
                    <button className="w-full py-5 bg-slate-900 text-[#FFB800] font-black rounded-[24px] text-xs uppercase tracking-widest shadow-2xl hover:bg-orange-600 hover:text-white transition-all flex items-center justify-center gap-4 border border-slate-800">
                        Initialize Session <ArrowRight size={18} />
                    </button>
                </motion.div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        /* Integrated Inline IDE Interface (CodeChef Style) */
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           className="w-full max-w-[1900px] mx-auto flex flex-col h-[calc(100vh-6rem)] rounded-t-[40px] overflow-hidden border border-slate-800 shadow-2xl"
        >
          {/* Elite Header */}
          <div className="h-16 bg-[#1E293B] border-b border-white/10 flex items-center justify-between px-8 flex-shrink-0">
            <div className="flex items-center gap-8">
                <button 
                  onClick={() => setSelectedProblem(null)}
                  className="w-10 h-10 bg-slate-900 text-slate-400 hover:text-[#FFB800] border border-slate-800 rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl"
                >
                    <ChevronRight className="rotate-180" size={20} />
                </button>
                <div className="h-8 w-px bg-slate-800/80"></div>
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-black text-white tracking-tight">{selectedProblem.title}</h2>
                    <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-sm ${
                        selectedProblem.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                        selectedProblem.difficulty === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                    }`}>
                        {selectedProblem.difficulty}
                    </span>
                    {selectedProblem.isDebug && (
                        <span className="px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] bg-indigo-500/20 text-indigo-400">Debug Practice</span>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 px-6 py-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl transition-all"><BookOpen size={14} /> Tutorial</button>
            </div>
          </div>

          <div className="flex-grow flex overflow-hidden">
            {/* Left Column: Problem Briefing */}
            <div className="w-[45%] flex flex-col border-r border-white/5 bg-[#1E293B] relative">
                <div className="flex border-b border-slate-800 bg-[#1E293B] flex-shrink-0">
                    {['description', 'editorial', 'submissions'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-grow py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${
                                activeTab === tab ? 'text-orange-500 bg-slate-900/50' : 'text-slate-400 hover:text-white hover:bg-slate-900/30'
                            }`}
                        >
                            {tab}
                            {activeTab === tab && <motion.div layoutId="activeTabIDE" className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500" />}
                        </button>
                    ))}
                </div>

                <div className="flex-grow overflow-y-auto p-10 custom-scrollbar">
                    <div className="prose prose-slate prose-invert max-w-none">
                        <h3 className="text-3xl font-black text-white mb-8 tracking-tighter">
                            {selectedProblem.isDebug ? 'Debug the Code' : 'Problem Statement'}
                        </h3>
                        
                        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[24px] mb-8">
                            <p className="text-slate-300 font-medium text-lg leading-relaxed">
                                {selectedProblem.isDebug ? (
                                    "The code provided in the editor contains a logical error causing it to produce incorrect output or throw an exception. Identify the bug and fix it so the array reverses correctly."
                                ) : (
                                    "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution."
                                )}
                            </p>
                        </div>

                        <div className="space-y-10">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-3">
                                    <Target size={16} className="text-[#FFB800]" /> Sample Test Case
                                </h4>
                                <div className="bg-slate-900 border border-slate-800 rounded-[20px] p-6 font-mono text-sm space-y-3">
                                    <p><span className="text-slate-500 font-black uppercase text-[10px] tracking-widest mr-4">Input:</span> {selectedProblem.isDebug ? 'arr = [1, 2, 3, 4, 5]' : 'nums = [2,7,11,15], target = 9'}</p>
                                    <p><span className="text-slate-500 font-black uppercase text-[10px] tracking-widest mr-4">Output:</span> {selectedProblem.isDebug ? '[5, 4, 3, 2, 1]' : '[0,1]'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Code Editor & Console */}
            <div className="flex-grow flex flex-col bg-[#0F172A] overflow-hidden">
                <div className="h-14 bg-[#1E293B] border-b border-slate-800 flex items-center justify-between px-6 flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <select 
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="bg-slate-900 border border-slate-700 text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-lg px-4 py-2 outline-none"
                        >
                            {languages.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                        </select>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="text-slate-500 hover:text-white transition-colors"><History size={16} /></button>
                        <button className="text-slate-500 hover:text-white transition-colors"><Settings size={16} /></button>
                    </div>
                </div>

                <div className="flex-grow relative border-b border-slate-800 bg-[#0F172A]">
                    <Editor
                      height="100%"
                      theme="vs-dark"
                      language={selectedLanguage}
                      value={code[selectedLanguage]}
                      onChange={(val) => setCode({ ...code, [selectedLanguage]: val })}
                      options={{
                        fontSize: 15,
                        fontFamily: 'JetBrains Mono, monospace',
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        padding: { top: 20 },
                        roundedSelection: true,
                        cursorBlinking: 'smooth'
                      }}
                    />
                </div>

                {/* Custom Input & Output Console */}
                <div className="flex-shrink-0 flex flex-col max-h-[40vh] bg-[#1E293B]">
                    <div className="flex items-center justify-between px-6 py-2 border-b border-slate-800">
                        <div className="flex items-center gap-6">
                            <button 
                                onClick={() => setShowCustomInput(!showCustomInput)}
                                className={`text-[10px] font-black uppercase tracking-widest transition-colors ${showCustomInput ? 'text-orange-500' : 'text-slate-400 hover:text-white'}`}
                            >
                                Custom Input
                            </button>
                            <button 
                                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                            >
                                Test Results
                            </button>
                        </div>
                        {output && (
                            <button onClick={() => setOutput('')} className="text-slate-500 hover:text-white">
                                <X size={16} />
                            </button>
                        )}
                    </div>
                    
                    <div className="flex-grow overflow-y-auto">
                        {showCustomInput && (
                            <div className="p-4 border-b border-slate-800 bg-slate-900/50">
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Provide standard input (stdin):</p>
                                <textarea 
                                    value={customInput}
                                    onChange={(e) => setCustomInput(e.target.value)}
                                    className="w-full h-24 bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-300 font-mono text-sm outline-none focus:border-orange-500/50"
                                    placeholder="Enter custom test cases here..."
                                />
                            </div>
                        )}
                        
                        {output && (
                            <div className="p-6">
                                <pre className="font-mono text-sm text-slate-300 whitespace-pre-wrap">
                                    {output}
                                </pre>
                            </div>
                        )}
                    </div>

                    <div className="h-16 bg-[#1E293B] border-t border-slate-800 flex items-center justify-end px-6 gap-4 flex-shrink-0">
                        <button 
                            onClick={handleRunCode}
                            disabled={isRunning}
                            className="px-8 py-2.5 bg-slate-900 text-slate-300 border border-slate-700 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 hover:text-white transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                            {isRunning ? <div className="w-3 h-3 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div> : <Play size={12} />} 
                            Run Code
                        </button>
                        <button 
                            onClick={handleSubmit}
                            disabled={isSubmitting || isRunning}
                            className="px-8 py-2.5 bg-orange-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                            {isSubmitting ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Send size={12} />} 
                            Submit
                        </button>
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
