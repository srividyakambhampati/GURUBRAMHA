import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  ChevronRight, 
  MessageSquare, 
  Code, 
  Target,
  ArrowRight,
  Star,
  Users,
  Award,
  Terminal,
  Activity,
  Briefcase,
  Gem,
  CheckCircle2,
  Lock,
  X,
  Plus,
  BookOpen,
  Zap,
  Globe,
  Clock,
  Layout,
  Bookmark,
  Shield,
  Sparkles,
  TrendingUp,
  Cpu,
  Check,
  Video,
  Volume2,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import SubscriptionPopup from '../components/SubscriptionPopup';
import { useAuth } from '../context/AuthContext';

// Bulletproof and premium company logo component with glowing fallback initial avatar
const CompanyLogo = ({ logoUrl, name, className = "w-full h-full" }) => {
  const [imageError, setImageError] = useState(false);

  if (imageError || !logoUrl) {
    const initial = name ? name.charAt(0) : '?';
    // Harmonies of HSL Tailwind gradients for glowing initials
    const gradients = [
      'from-blue-600 to-indigo-650',
      'from-fuchsia-600 to-purple-650',
      'from-cyan-600 to-blue-650',
      'from-emerald-600 to-teal-650',
      'from-amber-600 to-orange-655',
    ];
    const charCode = name ? name.charCodeAt(0) : 0;
    const gradient = gradients[charCode % gradients.length];

    return (
      <div className={`w-full h-full rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center font-bold text-white text-lg tracking-wider border border-white/10 shadow-lg select-none`}>
        {initial}
      </div>
    );
  }

  return (
    <img 
      src={logoUrl} 
      alt={name} 
      onError={() => setImageError(true)} 
      className="w-full h-full object-contain" 
    />
  );
};

// Modular Round Accordion Card with actual practice questions, code snippets, and explanations
const RoundCard = ({ round, idx }) => {
  const [isOpen, setIsOpen] = useState(idx === 0); // Open the first round by default for high engagement
  const [activeQuestion, setActiveQuestion] = useState(null);

  return (
    <div className="bg-slate-900/40 border border-slate-855 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-800">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-900/60 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="w-8 h-8 rounded-lg bg-indigo-600/10 border border-indigo-500/25 flex items-center justify-center font-bold text-xs text-indigo-400">
            0{idx + 1}
          </span>
          <div>
            <h4 className="text-sm font-bold text-white tracking-tight">{round.title}</h4>
            <span className="text-[9px] text-slate-500 uppercase tracking-widest mt-0.5 block">{round.topics.length} Core Topics</span>
          </div>
        </div>
        <ChevronRight size={16} className={`text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-3 border-t border-slate-850/60 bg-slate-950/20 space-y-5">
          {/* Key Topics List */}
          <div>
            <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-2.5 block">Target Competencies:</span>
            <div className="flex flex-wrap gap-1.5">
              {round.topics.map(topic => (
                <span key={topic} className="px-2.5 py-1 bg-slate-955/70 border border-slate-850 rounded-lg text-xs font-semibold text-slate-350">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Actual Sample Questions & Solutions */}
          {round.practiceQuestions && round.practiceQuestions.length > 0 && (
            <div className="space-y-3">
              <span className="text-[9px] font-bold text-fuchsia-400 uppercase tracking-widest block">🔥 Practice Sheet & Sample Interview Questions:</span>
              <div className="space-y-3">
                {round.practiceQuestions.map((pq, qIdx) => (
                  <div key={qIdx} className="bg-slate-950/80 border border-slate-850 rounded-xl p-4.5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <h5 className="text-xs md:text-sm font-bold text-slate-200 leading-relaxed">{pq.question}</h5>
                      <button 
                        onClick={() => setActiveQuestion(activeQuestion === qIdx ? null : qIdx)}
                        className="px-2.5 py-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/25 rounded-md text-[9px] font-bold uppercase tracking-wider transition-colors shrink-0"
                      >
                        {activeQuestion === qIdx ? 'Hide Solution' : 'View Solution'}
                      </button>
                    </div>

                    {activeQuestion === qIdx && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pt-3.5 border-t border-slate-850/70 space-y-3 text-xs md:text-sm text-slate-400 leading-relaxed font-normal"
                      >
                        <p className="text-slate-300 font-semibold">{pq.explanation}</p>
                        
                        {pq.code && (
                          <pre className="p-4 bg-slate-900 border border-slate-800 rounded-xl font-mono text-[10px] md:text-xs text-indigo-300 overflow-x-auto">
                            <code>{pq.code}</code>
                          </pre>
                        )}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Interview = () => {
  const { user } = useAuth();
  const [showSubscription, setShowSubscription] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [activeModalTab, setActiveModalTab] = useState('blueprint'); // 'blueprint' | 'syllabus' | 'rounds' | 'simulator'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [bookmarked, setBookmarked] = useState([]);
  
  // Local state for interactive mockup simulator
  const [simulating, setSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  const filters = ['All', 'Product Based', 'Service Based', 'Startup'];

  // Deeply expanded company rounds with real prep questions, aptitude sheets, coding templates and behavioral responses
  const companyData = [
    {
      id: 1,
      name: 'Google',
      type: 'Product Based',
      logo: 'https://img.icons8.com/color/96/google-logo.png',
      package: '₹18L - ₹45L',
      difficulty: 'Expert',
      overview: 'Focuses on core computer science fundamentals, DSA, and problem-solving skills.',
      eligibility: 'B.E/B.Tech/M.E/M.Tech (CS/IT/ECE preferred). 70% throughout academic career.',
      skills: ['Data Structures', 'Algorithms', 'System Design', 'Operating Systems', 'OOPs'],
      process: ['Online Assessment', 'Technical Phone Screen', '4-5 Onsite Rounds', 'Hiring Committee Review'],
      rounds: [
        { 
          title: 'Aptitude & Reasoning', 
          topics: ['Probability', 'Number Systems', 'Logical Puzzles', 'Patterns'],
          practiceQuestions: [
            {
              question: "A drawer contains 6 red and 8 blue socks. If 2 socks are drawn at random without replacement, what is the probability that they are a matching pair?",
              explanation: "To get a matching pair, we must draw either 2 Red socks or 2 Blue socks.\n\n• Total Socks = 14\n• Total ways to choose 2 socks = 14C2 = (14 * 13) / 2 = 91\n\n• Ways to choose 2 Red socks = 6C2 = (6 * 5) / 2 = 15\n• Ways to choose 2 Blue socks = 8C2 = (8 * 7) / 2 = 28\n\n• Probability of matching pair = (15 + 28) / 91 = 43/91 ≈ 47.2%"
            },
            {
              question: "You have two identical eggs and access to a 100-story building. Find the minimum number of drops needed to find the highest floor from which an egg can be dropped without breaking.",
              explanation: "This is the classic Two Eggs problem. We drop the first egg at intervals of 'x' floors. If it breaks, we use the second egg to test floors linearly. To minimize drops, we decrease intervals by 1 each time so total drops stay constant:\n\nx + (x-1) + (x-2) + ... + 1 >= 100\n[x * (x + 1)] / 2 >= 100\nFor x = 14, sum is 105. Thus, 14 drops is the minimum required."
            }
          ]
        },
        { 
          title: 'Coding Round', 
          topics: ['Graphs', 'Dynamic Programming', 'Heaps', 'Backtracking'],
          practiceQuestions: [
            {
              question: "Lowest Common Ancestor of a Binary Tree: Find the lowest common node that is an ancestor to both nodes p and q in a tree.",
              explanation: "We traverse the tree recursively. If the current node is null, p, or q, we return the node. We search left and right subtrees. If left search and right search both return non-null values, it means p and q are on opposite sides, so current node is the LCA.",
              code: "function lowestCommonAncestor(root, p, q) {\n  if (!root || root === p || root === q) return root;\n  \n  const left = lowestCommonAncestor(root.left, p, q);\n  const right = lowestCommonAncestor(root.right, p, q);\n  \n  if (left && right) return root;\n  return left || right;\n}"
            }
          ]
        },
        { 
          title: 'Technical Round', 
          topics: ['Memory Management', 'Multithreading', 'Scalability', 'DB Optimization'],
          practiceQuestions: [
            {
              question: "What is a memory leak in V8 engine (JavaScript) and how do we prevent it in high-concurrency systems?",
              explanation: "V8 uses Garbage Collection (Mark-and-Sweep). Memory leaks occur when objects are no longer needed but are still referenced by active parent nodes.\n\n• Key Causes: Accidental global variables, forgotten setInterval timers, out-of-DOM references, and closures retaining large scope.\n• Prevention: Always declare variables with const/let, clear intervals, clean up event listeners, and use WeakMap/WeakSet to hold object references loosely."
            }
          ]
        },
        { 
          title: 'Face-to-Face', 
          topics: ['Googliness & Leadership', 'Project Architecture', 'Situation Handling'],
          practiceQuestions: [
            {
              question: "Google Googliness: 'Describe a time when you worked on a project with vague or ambiguous requirements. How did you handle it?'",
              explanation: "Google looks for comfort with ambiguity, initiative, and bias-for-action.\n\n• Situation: Project required implementing an automated code-compiler with no specifications on compiler scale.\n• Action (STAR method): I conducted stakeholder interviews, researched standard compiler interfaces, drew up 3 distinct architectural options with different latency profiles, and held a alignment meeting with developers.\n• Result: We designed a modular system that accommodated changes dynamically and delivered the feature 2 weeks early."
            }
          ]
        }
      ],
      roadmap30Days: [
        { week: 1, focus: 'Strings & Arrays (Basic to Advanced)' },
        { week: 2, focus: 'Linked Lists, Stacks, Queues & Recursion' },
        { week: 3, focus: 'Trees, Graphs & Dynamic Programming' },
        { week: 4, focus: 'System Design & Googliness Prep' }
      ]
    },
    {
      id: 2,
      name: 'Microsoft',
      type: 'Product Based',
      logo: 'https://img.icons8.com/color/96/microsoft.png',
      package: '₹16L - ₹42L',
      difficulty: 'Hard',
      overview: 'Strong emphasis on software engineering principles and efficient code writing.',
      eligibility: 'B.Tech/M.Tech/MCA. No active backlogs.',
      skills: ['C++', 'Java', 'C#', 'SQL', 'Data Structures', 'OS'],
      process: ['Coding Test', 'Technical Interview 1', 'Technical Interview 2', 'AA (As Appropriate) Round'],
      rounds: [
        { 
          title: 'Aptitude & Logical', 
          topics: ['Time & Work', 'Percentages', 'Profit & Loss', 'Reasoning'],
          practiceQuestions: [
            {
              question: "A pipe can fill a cistern in 20 minutes, while another empty pipe can empty it in 30 minutes. If both are opened together, how long will it take to fill?",
              explanation: "• Rate of filling pipe = 1/20 per minute\n• Rate of emptying pipe = 1/30 per minute\n\n• Combined rate = 1/20 - 1/30 = (3 - 2) / 60 = 1/60 per minute\n\nTherefore, it will take 60 minutes to completely fill the empty cistern."
            }
          ]
        },
        { 
          title: 'Coding Round', 
          topics: ['Linked Lists', 'Binary Trees', 'Arrays', 'Two Pointers'],
          practiceQuestions: [
            {
              question: "Reverse a Linked List in Groups of Size K: Reverse every k nodes of a singly linked list.",
              explanation: "We reverse k nodes using standard iterative pointer manipulation. Then we recursively call the function for the remaining nodes, passing the (k+1)-th node and linking the return node to the tail of our currently reversed segment.",
              code: "function reverseKGroup(head, k) {\n  let curr = head;\n  let count = 0;\n  while (curr && count < k) {\n    curr = curr.next;\n    count++;\n  }\n  if (count < k) return head;\n  \n  let prev = null;\n  let next = null;\n  curr = head;\n  for (let i = 0; i < k; i++) {\n    next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  \n  head.next = reverseKGroup(curr, k);\n  return prev;\n}"
            }
          ]
        },
        { 
          title: 'Technical Round', 
          topics: ['Low Level Design (LLD)', 'DBMS', 'Computer Networks'],
          practiceQuestions: [
            {
              question: "Design an Object-Oriented Parking Lot system. What design patterns apply?",
              explanation: "• Class Structure: ParkingLot (Singleton), Level, ParkingSpot (Abstract), Vehicle (Abstract with Car/Motorcycle extensions).\n• Key Patterns:\n  1. Singleton Pattern: Ensure only one ParkingLot controller exists.\n  2. Factory Pattern: Instantiate Spots and Vehicles dynamically based on size.\n  3. Strategy Pattern: Define parking-slot allotment algorithms (e.g., nearest Spot first vs spots with maximum clearance)."
            }
          ]
        },
        { 
          title: 'F2F Interview (AA)', 
          topics: ['Behavioral Questions', 'Resume Walkthrough', 'Growth Mindset'],
          practiceQuestions: [
            {
              question: "Microsoft Mindset: 'Tell me about a time you failed to deliver on time. What did you learn and how did you communicate it?'",
              explanation: "Microsoft values Satya Nadella's Growth Mindset: admitting failure, learning from it, and building transparency.\n\n• Action: Clearly walk through the scenario. I misjudged api schema parsing delays and realized we would miss a client demo. I immediately notified our PM, set up a revised timeline with a working beta demo, and automated schema validation tests to prevent it in the future."
            }
          ]
        }
      ],
      roadmap30Days: [
        { week: 1, focus: 'Basic DSA & Microsoft OA Questions' },
        { week: 2, focus: 'Advanced DSA (Trees & Graphs)' },
        { week: 3, focus: 'OS, DBMS & Low Level Design' },
        { week: 4, focus: 'Mock Interviews & Behavioral Prep' }
      ]
    },
    {
      id: 3,
      name: 'Amazon',
      type: 'Product Based',
      logo: 'https://img.icons8.com/color/96/amazon.png',
      package: '₹15L - ₹38L',
      difficulty: 'Hard',
      overview: 'Unique focus on 14 Leadership Principles alongside heavy DSA.',
      eligibility: 'Engineering graduates. Strong analytical skills.',
      skills: ['Java/C++', 'Leadership Principles', 'Object Oriented Design', 'Distributed Systems'],
      process: ['Online Test', '2 Technical Rounds', 'Bar Raiser Round', 'Managerial Round'],
      rounds: [
        { 
          title: 'Coding Round', 
          topics: ['Sliding Window', 'Greedy Algorithms', 'Stack/Queues', 'Heaps'],
          practiceQuestions: [
            {
              question: "Merge K Sorted Lists: Given an array of sorted linked lists, merge them into one sorted list.",
              explanation: "We utilize a Min-Heap (or Priority Queue) to store the head node of each list. We extract the minimum element, append it to our dummy result list, and push the next element of the extracted node into the Heap. This ensures O(N log K) time complexity.",
              code: "class MinHeap {\n  // Standard implementation using index parent-child comparisons\n}\n\nfunction mergeKLists(lists) {\n  const heap = new MinHeap();\n  for (let l of lists) {\n    if (l) heap.insert(l);\n  }\n  let dummy = { next: null };\n  let curr = dummy;\n  while (heap.size() > 0) {\n    let node = heap.extractMin();\n    curr.next = node;\n    curr = curr.next;\n    if (node.next) heap.insert(node.next);\n  }\n  return dummy.next;\n}"
            }
          ]
        },
        { 
          title: 'Technical System Design', 
          topics: ['System Design', 'Code Quality', 'Error Handling', 'High Level Design'],
          practiceQuestions: [
            {
              question: "High Level Design (HLD): Design a URL Shortener Service (TinyURL) with high availability.",
              explanation: "• Traffic Scale: 100M URLs created/month, 10:1 Read to Write ratio.\n• System Components:\n  1. Application Servers: Stateless servers for load-balanced key generations.\n  2. Key Generation Service (KGS): Pre-generate unique base62 keys using a range-allocator to avoid duplicates.\n  3. Caching: Memcached/Redis for storing top 20% active links to yield sub-10ms redirect latency."
            }
          ]
        },
        { 
          title: 'Leadership Round (Bar Raiser)', 
          topics: ['14 Principles Case Studies', 'Past Conflict Resolution', 'Customer Obsession'],
          practiceQuestions: [
            {
              question: "Amazon Leadership Principle: 'Give me an example of when you had to disagree with a manager or coworker, but committed anyway (Disagree and Commit).'",
              explanation: "Amazon seeks ownership, analytical disagreement, and operational alignment.\n\n• Action: Walk through the conflict cleanly. Explain how you brought data (load test logs) to argue against a custom caching layout, but when the team decided to move forward with the PM's choice, you committed 100% and built fallback monitoring systems to guarantee its success."
            }
          ]
        }
      ],
      roadmap30Days: [
        { week: 1, focus: 'Amazon SDE Sheet (Top 50 Questions)' },
        { week: 2, focus: 'Leadership Principles Integration' },
        { week: 3, focus: 'System Design Fundamentals' },
        { week: 4, focus: 'Bar Raiser Mock Prep' }
      ]
    },
    {
      id: 4,
      name: 'Meta',
      type: 'Product Based',
      logo: 'https://img.icons8.com/color/96/meta--v1.png',
      package: '₹20L - ₹50L',
      difficulty: 'Expert',
      overview: 'Focuses on speed and accuracy in solving medium-to-hard LeetCode problems.',
      eligibility: 'Degree in CS or related field. High performance in coding competitions.',
      skills: ['Fast Coding', 'Algorithms', 'System Design', 'React/Mobile (for specific roles)'],
      process: ['Intro Call', 'Technical Screening', 'Loop (Coding, Design, Behavioral)'],
      rounds: [
        { 
          title: 'Fast Coding Round', 
          topics: ['BFS/DFS', 'Binary Search', 'Topological Sort', 'HashMaps'],
          practiceQuestions: [
            {
              question: "Find Peak Element: An element is a peak if it is strictly greater than its neighbors. Find a peak index in O(log N) time.",
              explanation: "We utilize Binary Search. We check the mid element. If the element to the right of mid is greater, it means a peak must lie on the right side. If not, a peak lies on the left side (including mid). We repeat until boundary pointers collapse.",
              code: "function findPeakElement(nums) {\n  let left = 0;\n  let right = nums.length - 1;\n  while (left < right) {\n    let mid = Math.floor((left + right) / 2);\n    if (nums[mid] < nums[mid + 1]) {\n      left = mid + 1;\n    } else {\n      right = mid;\n    }\n  }\n  return left;\n}"
            }
          ]
        },
        { 
          title: 'Design Round', 
          topics: ['System Design', 'Product Design (API/DB Schema)', 'Caching'],
          practiceQuestions: [
            {
              question: "Design the Meta News Feed. How do you push feed items to active users?",
              explanation: "• Hybrid approach (Push vs Pull):\n  1. Push (Fan-out on Write): For common users, when they post, push references directly to their followers' in-memory feed lists.\n  2. Pull (Fan-out on Read): For high-profile celebrities, do not push their posts. Instead, merge their posts at read-time when followers refresh their feed. This avoids write bottlenecks."
            }
          ]
        }
      ],
      roadmap30Days: [
        { week: 1, focus: 'Meta Top Tagged LeetCode Questions' },
        { week: 2, focus: 'System Design Patterns' },
        { week: 3, focus: 'Product Knowledge & Culture' },
        { week: 4, focus: 'Speed Drills (2 Mediums in 40 mins)' }
      ]
    },
    {
      id: 8,
      name: 'TCS',
      type: 'Service Based',
      logo: 'https://img.icons8.com/color/96/tata.png',
      package: '₹3.5L - ₹7.5L',
      difficulty: 'Medium',
      overview: 'Mass hiring through NQT (National Qualifier Test). Focuses on foundations.',
      eligibility: '60% throughout 10th, 12th, and Graduation.',
      skills: ['Basic Programming', 'Numerical Ability', 'Verbal Ability', 'Reasoning'],
      process: ['NQT Online Test', 'Technical Interview', 'HR Interview'],
      rounds: [
        { 
          title: 'NQT Aptitude', 
          topics: ['Percentages', 'Time & Distance', 'Statistics', 'Simplification'],
          practiceQuestions: [
            {
              question: "A man covers a distance of 24 km at a speed of 6 km/h, and another 24 km at a speed of 8 km/h. What is his average speed for the entire journey?",
              explanation: "• Time 1 = Distance / Speed = 24 / 6 = 4 hours\n• Time 2 = Distance / Speed = 24 / 8 = 3 hours\n\n• Total Distance = 24 + 24 = 48 km\n• Total Time = 4 + 3 = 7 hours\n\n• Average Speed = Total Distance / Total Time = 48 / 7 ≈ 6.85 km/h"
            }
          ]
        },
        { 
          title: 'Coding Round', 
          topics: ['Loops', 'Arrays', 'Strings (Basic)', 'Number Logic'],
          practiceQuestions: [
            {
              question: "Check if a String is a Palindrome: Ignore special characters and case.",
              explanation: "We clean the string using a regex replace, convert it to lower case, and use two pointers starting at both ends of the string. We increment/decrement and check if characters match.",
              code: "function isPalindrome(str) {\n  const clean = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase();\n  let left = 0;\n  let right = clean.length - 1;\n  while (left < right) {\n    if (clean[left] !== clean[right]) return false;\n    left++;\n    right--;\n  }\n  return true;\n}"
            }
          ]
        },
        { 
          title: 'Technical Interview', 
          topics: ['Java/Python Basics', 'Project Info', 'SQL Queries', 'OOPs Definitions'],
          practiceQuestions: [
            {
              question: "What is the difference between an Abstract Class and an Interface in Java?",
              explanation: "• Abstract Class:\n  1. Can contain both abstract (without body) and concrete (with body) methods.\n  2. Supports state fields and constructor definitions.\n  3. A class can extend only one abstract class (single inheritance).\n\n• Interface:\n  1. Can only contain abstract methods (until Java 8 introduced default/static methods).\n  2. Cannot define states/constructors.\n  3. A class can implement multiple interfaces (multiple inheritance)."
            }
          ]
        }
      ],
      roadmap30Days: [
        { week: 1, focus: 'Numerical & Verbal Ability (NQT Pattern)' },
        { week: 2, focus: 'Logical Reasoning & Basic Coding' },
        { week: 3, focus: 'Common Technical Questions (OOPs, SQL)' },
        { week: 4, focus: 'Mock HR Rounds & Resume Finalization' }
      ]
    },
    {
      id: 9,
      name: 'Infosys',
      type: 'Service Based',
      logo: 'https://img.icons8.com/color/96/infosys.png',
      package: '₹3.6L - ₹8.0L',
      difficulty: 'Medium',
      overview: 'Hiring through InfyTQ and HackWithInfy. Strong focus on logical reasoning.',
      eligibility: 'BE/BTech/ME/MTech/MSc/MCA graduates.',
      skills: ['Python/Java', 'Logic Building', 'DBMS', 'Communication'],
      process: ['Online Assessment', 'Technical Interview', 'HR Interview'],
      rounds: [
        { 
          title: 'Aptitude', 
          topics: ['Cryptarithmetic', 'Syllogism', 'Data Interpretation', 'Puzzles'],
          practiceQuestions: [
            {
              question: "Cryptarithmetic Puzzle: Find the values of letters in: SEND + MORE = MONEY.",
              explanation: "This is a base-10 mathematical puzzle.\n\n• Analysis of Carries:\n  S + M + carry must produce a two digit number starting with M. Since M is the carry, M must be 1.\n  If M = 1, then S must be 8 or 9 to produce a carry. Proceeding logically, we deduce:\n\n• S=9, E=5, N=6, D=7, M=1, O=0, R=8, Y=2.\n  Verification: 9567 + 1085 = 10652. Fits perfectly!"
            }
          ]
        },
        { 
          title: 'Coding Round', 
          topics: ['Basic Algorithms', 'Matrix Problems', 'Sorting'],
          practiceQuestions: [
            {
              question: "Rotate a 2D Square Matrix by 90 Degrees Clockwise in-place.",
              explanation: "First, we transpose the matrix (swap element[i][j] with element[j][i]). Next, we reverse each row of the transposed matrix. This yields a perfect 90-degree clockwise rotation.",
              code: "function rotateMatrix(matrix) {\n  const n = matrix.length;\n  // Transpose\n  for (let i = 0; i < n; i++) {\n    for (let j = i; j < n; j++) {\n      let temp = matrix[i][j];\n      matrix[i][j] = matrix[j][i];\n      matrix[j][i] = temp;\n    }\n  }\n  // Reverse rows\n  for (let i = 0; i < n; i++) {\n    matrix[i].reverse();\n  }\n}"
            }
          ]
        }
      ],
      roadmap30Days: [
        { week: 1, focus: 'InfyTQ Sample Papers & Mock Tests' },
        { week: 2, focus: 'Core Java/Python Fundamentals' },
        { week: 3, focus: 'Logical Reasoning (Puzzles)' },
        { week: 4, focus: 'Behavioral Prep & Project Demo' }
      ]
    },
    {
      id: 13,
      name: 'Zoho',
      type: 'Startup',
      logo: 'https://img.icons8.com/color/96/zoho.png',
      package: '₹6.5L - ₹12L',
      difficulty: 'Hard',
      overview: 'Unique process involving paper-pencil coding and building an app from scratch.',
      eligibility: 'Any graduate. Skills over degrees.',
      skills: ['C/Java', 'Logic Building', 'App Development', 'Problem Solving'],
      process: ['Aptitude', 'Paper Coding', 'Advanced Programming (App Building)', 'HR'],
      rounds: [
        { 
          title: 'Logical Reasoning', 
          topics: ['Flowcharts', 'Puzzles', 'Algorithms', 'Logic Tracing'],
          practiceQuestions: [
            {
              question: "Write an algorithm to print a given string in an 'X' pattern if length is odd. e.g., 'PROGRAM'.",
              explanation: "We iterate through the string using a nested loop from 0 to length-1. In the inner loop, we print the character if the row index equals the column index, or if row index + column index equals length-1. Otherwise, we print a space."
            }
          ]
        },
        { 
          title: 'App Building Round', 
          topics: ['Implement a Mini-System', 'Railway Booking', 'Object-Oriented Design'],
          practiceQuestions: [
            {
              question: "Advanced App Building: Implement a terminal-based Railway Ticket Booking System in 3 hours. How do you manage seats?",
              explanation: "• Key Classes: Passenger, Ticket, BookingSystem (Singleton).\n• Dynamic seat allotment:\n  1. Define lists/maps for available berths (Lower, Middle, Upper) and RAC/Waiting List counts.\n  2. When booking, check preferred berth first. If not available, allot any active berth. If births full, place into RAC (max 18). If RAC full, place into Waiting list (max 10).\n  3. Handle cancellation: Promote RAC to confirmed berth, promote WL to RAC."
            }
          ]
        }
      ],
      roadmap30Days: [
        { week: 1, focus: 'C/Java Syntax & Pointer Logic' },
        { week: 2, focus: 'Logic Building Puzzles (Zoho Pattern)' },
        { week: 3, focus: 'Object Oriented Design (LLD)' },
        { week: 4, focus: 'Building Sample Apps (CLI-based)' }
      ]
    },
    {
      id: 14,
      name: 'Flipkart',
      type: 'Startup',
      logo: 'https://img.icons8.com/color/96/flipkart.png',
      package: '₹14L - ₹32L',
      difficulty: 'Hard',
      overview: 'Machine Coding round is the main filter here.',
      eligibility: 'Graduates with strong engineering foundations.',
      skills: ['Machine Coding', 'LLD', 'HLD', 'Clean Code'],
      process: ['Online Test', 'Machine Coding Round', 'Technical Round', 'Hiring Manager Round'],
      rounds: [
        { 
          title: 'Machine Coding', 
          topics: ['Clean Code Principles', 'Working Model in 2 Hours', 'SOLID Principles'],
          practiceQuestions: [
            {
              question: "Machine Coding Scenario: Create a complete running CLI-based Ride Sharing Application (like Uber/Ola) in 2 hours.",
              explanation: "Focus on clean classes, interfaces, and decoupling. Do not build UI, just mock drivers, riders, and pricing strategies.\n\n• Key Guidelines:\n  1. Interface 'PricingStrategy' to dynamically choose surge-pricing or base-pricing.\n  2. Models: User (Driver/Rider), Ride (Origin, Destination, Fare, Status), Vehicle.\n  3. Decouple logic into RideService, UserService, and MatchingService.",
              code: "class RideSharingSystem {\n  constructor() {\n    this.users = new Map();\n    this.rides = new Map();\n  }\n  \n  registerRider(id, name) { ... }\n  registerDriver(id, name, location) { ... }\n  \n  bookRide(riderId, origin, destination, seats) {\n    // Match nearest driver, calculate fare, create active Ride object\n  }\n}"
            }
          ]
        },
        { 
          title: 'Design Round', 
          topics: ['Ecommerce Scalability', 'Caching Strategies', 'Database Locks'],
          practiceQuestions: [
            {
              question: "How do you handle flash sale concurrency (e.g. 100 iPhone stock, 1M concurrent buyers) without double-booking?",
              explanation: "• Database Locking vs Redis Caching:\n  1. Optimistic Locking: database queries check version columns before write. Too slow for massive traffic peaks.\n  2. Distributed Locking: Utilize Redis ('SETNX' or Redlock) to ensure only one thread acts on a stock at any millisecond.\n  3. Pre-decided Stock Counters: decrement stock directly in Redis (using atomic `DECR` commands). If the decrement returns negative, immediately block subsequent users before touching the persistent SQL database."
            }
          ]
        }
      ],
      roadmap30Days: [
        { week: 1, focus: 'Machine Coding Practice (SOLID Principles)' },
        { week: 2, focus: 'Advanced DSA (Graphs & DP)' },
        { week: 3, focus: 'Low Level Design (LLD) Cases' },
        { week: 4, focus: 'E-commerce Architecture Study' }
      ]
    }
  ];

  const filteredCompanies = useMemo(() => {
    return companyData.filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'All' || company.type === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const handleAction = (company) => {
    if (user?.isSubscribed) {
      setSelectedCompany(company);
      setActiveModalTab('blueprint');
    } else {
      setShowSubscription(true);
    }
  };

  const toggleBookmark = (id) => {
    setBookmarked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // Mocking AI Session trigger in the modal
  const runAISimulator = () => {
    setSimulating(true);
    setSimStep(1);
    setTimeout(() => setSimStep(2), 2500);
    setTimeout(() => setSimStep(3), 5000);
    setTimeout(() => {
      setSimStep(4);
      setSimulating(false);
    }, 7500);
  };

  return (
    <div className="bg-[#030712] min-h-screen selection:bg-indigo-500/30 pb-20 relative overflow-hidden text-slate-100 font-sans">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.25] pointer-events-none z-0" />
      
      {/* Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-600/10 to-indigo-600/10 blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-gradient-to-r from-fuchsia-600/5 to-cyan-600/5 blur-[160px] pointer-events-none z-0" />

      <div className="max-w-[1500px] mx-auto px-6 md:px-12 pt-12 relative z-10">
        
        {/* PREMIUM CINEMATIC HERO SECTION */}
        <div className="flex flex-col items-center text-center mb-16 relative">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-6 shadow-md backdrop-blur-xl"
          >
            <Sparkles size={13} className="text-indigo-400 animate-pulse" />
            <span>AI-Driven Placement Protocols</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl"
          >
            Master the <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">Technical Interview</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-400 text-lg md:text-xl font-normal max-w-2xl leading-relaxed mb-10"
          >
            Formulate high-fidelity preparation strategies with structural syllabus maps, mock simulations, and chronological 30-day target tracks.
          </motion.p>

          {/* Premium Platform Statistics Display */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md shadow-2xl"
          >
            <div className="flex flex-col items-center p-3 border-r border-slate-800/60 last:border-none">
              <span className="text-2xl md:text-3xl font-extrabold text-white">8,450+</span>
              <span className="text-xs text-slate-505 uppercase font-semibold tracking-wider mt-1">Simulated Audits</span>
            </div>
            <div className="flex flex-col items-center p-3 md:border-r border-slate-800/60 last:border-none">
              <span className="text-2xl md:text-3xl font-extrabold text-indigo-400">96.8%</span>
              <span className="text-xs text-slate-505 uppercase font-semibold tracking-wider mt-1">Acceptance Rate</span>
            </div>
            <div className="flex flex-col items-center p-3 border-r border-slate-800/60 last:border-none">
              <span className="text-2xl md:text-3xl font-extrabold text-fuchsia-400">₹50 LPA</span>
              <span className="text-xs text-slate-505 uppercase font-semibold tracking-wider mt-1">Peak Package</span>
            </div>
            <div className="flex flex-col items-center p-3 last:border-none">
              <span className="text-2xl md:text-3xl font-extrabold text-cyan-400">30 Days</span>
              <span className="text-xs text-slate-505 uppercase font-semibold tracking-wider mt-1">Optimized Track</span>
            </div>
          </motion.div>
        </div>

        {/* SEARCH & FILTERS CONTROLS (GLASSMORPHISM BENTO) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/30 border border-slate-800/70 rounded-3xl p-6 md:p-8 backdrop-blur-2xl shadow-xl mb-12"
        >
          <div className="flex flex-col lg:flex-row items-center gap-6">
            
            {/* Elegant Search Input */}
            <div className="relative flex-grow w-full group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-450 group-focus-within:text-indigo-400 transition-colors duration-300">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Identify target company roadmaps (e.g. Google, Amazon, Zoho...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-slate-955/60 border border-slate-850 rounded-2xl text-white shadow-inner focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-305 placeholder:text-slate-500 text-sm md:text-base outline-none"
              />
            </div>
            
            {/* Elegant Segmented Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-none">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 whitespace-nowrap border ${
                    activeFilter === filter 
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/25 scale-[1.03]' 
                      : 'bg-slate-950/40 text-slate-400 border-slate-850 hover:bg-slate-900/50 hover:text-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* BENTO GRID OF COMPANIES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
          {filteredCompanies.map((company, i) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-slate-900/25 border border-slate-800/80 rounded-2xl p-0 flex flex-col justify-between overflow-hidden group hover:border-indigo-500/40 hover:bg-slate-900/40 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-1.5"
            >
              <div className="p-6 md:p-8">
                
                {/* Header elements inside card */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-slate-955 border border-slate-850 flex items-center justify-center p-2 shadow-md group-hover:scale-[1.05] transition-transform duration-300">
                    <CompanyLogo logoUrl={company.logo} name={company.name} className="w-full h-full" />
                  </div>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleBookmark(company.id); }}
                    className={`p-2.5 rounded-lg border transition-all duration-300 ${
                      bookmarked.includes(company.id) 
                        ? 'bg-indigo-600 text-white border-indigo-500' 
                        : 'bg-slate-955/60 text-slate-455 border-slate-855 hover:text-indigo-400 hover:bg-slate-900'
                    }`}
                  >
                    <Bookmark size={15} fill={bookmarked.includes(company.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                
                {/* Mid elements inside card */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300 tracking-tight flex items-center gap-2">
                    {company.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-2 leading-relaxed h-8 font-normal">
                    {company.overview}
                  </p>
                </div>

                {/* Info Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className={`px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md border ${
                    company.type === 'Product Based' ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/25' :
                    company.type === 'Startup' ? 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-505/25' :
                    'bg-cyan-500/10 text-cyan-300 border-cyan-505/25'
                  }`}>
                    {company.type}
                  </span>
                  
                  <span className={`px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md border ${
                    company.difficulty === 'Expert' ? 'bg-rose-500/10 text-rose-355 border-rose-500/25' : 
                    company.difficulty === 'Hard' ? 'bg-amber-500/10 text-amber-300 border-amber-500/25' : 
                    'bg-emerald-500/10 text-emerald-300 border-emerald-500/25'
                  }`}>
                    {company.difficulty}
                  </span>
                </div>

                {/* Details Footer list inside card */}
                <div className="space-y-3.5 pt-4 border-t border-slate-850/60">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500 flex items-center gap-1.5"><Briefcase size={12} /> CTC Range</span>
                    <span className="text-slate-200">{company.package}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-500 flex items-center gap-1.5"><Layout size={12} /> Assessment</span>
                    <span className="text-slate-200">{company.rounds.length} Interview Rounds</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => handleAction(company)}
                className="w-full py-4 bg-slate-950/70 text-slate-300 hover:text-white font-bold uppercase text-[10px] tracking-widest group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-indigo-500 group-hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 border-t border-slate-855/50 group-hover:border-transparent"
              >
                <span>Access Roadmap</span>
                <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCompanies.length === 0 && (
          <div className="py-20 text-center rounded-3xl bg-slate-900/10 border border-slate-800/60 backdrop-blur-md">
            <div className="w-14 h-14 bg-slate-900/80 rounded-xl flex items-center justify-center text-slate-550 mx-auto mb-5 border border-slate-800">
              <Shield size={24} />
            </div>
            <h3 className="text-lg font-bold text-white mb-1.5">No matching roadmaps</h3>
            <p className="text-slate-500 text-sm font-medium">Try modifying your query or select a different filter category.</p>
          </div>
        )}
      </div>

      {/* DETAILED FULL-SCREEN ROADMAP WORKSPACE MODAL */}
      <AnimatePresence>
        {selectedCompany && (
          <div className="fixed inset-0 z-[1000] bg-[#030712] flex flex-col h-screen w-screen overflow-hidden">
            {/* Global dynamic style overrides to guarantee browser scrollbar hiding */}
            <style>{`
              .scrollbar-none::-webkit-scrollbar {
                display: none !important;
              }
            `}</style>
            
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.35 }}
              className="w-full h-full bg-[#080B16] flex flex-col lg:flex-row overflow-hidden relative"
            >
              {/* Floating Full-Screen Close Button */}
              <button 
                onClick={() => setSelectedCompany(null)} 
                className="absolute top-5 right-6 p-2.5 text-slate-400 hover:text-white hover:bg-slate-800/80 rounded-xl transition-all duration-300 z-[1020] shadow-md border border-slate-800/40 bg-slate-900/40 backdrop-blur-md"
                title="Exit Fullscreen Roadmap"
              >
                <X size={20} />
              </button>
              
              {/* LEFT COMPACT BRANDING PANEL */}
              <div className="lg:w-[320px] bg-slate-950/80 p-8 border-b lg:border-b-0 lg:border-r border-slate-850 overflow-y-auto flex-shrink-0 flex flex-col items-center lg:items-start select-none">
                
                <div className="w-18 h-18 bg-slate-900 border border-slate-850 rounded-2xl flex items-center justify-center p-3 shadow-xl mb-5 mt-4">
                  <CompanyLogo logoUrl={selectedCompany.logo} name={selectedCompany.name} className="w-full h-full" />
                </div>
                
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-tight text-center lg:text-left leading-none">
                  {selectedCompany.name}
                </h2>
                
                <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider rounded-md mb-8 shadow-sm">
                  {selectedCompany.type}
                </span>
                
                <div className="space-y-6 w-full">
                  <div>
                    <h4 className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5"><Shield size={11} /> Eligibility Protocol</h4>
                    <p className="text-slate-350 text-xs md:text-sm leading-relaxed font-normal">{selectedCompany.eligibility}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5"><Code size={11} /> Target Syllabus</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCompany.skills.map(skill => (
                        <span key={skill} className="px-2.5 py-1 bg-slate-900/60 border border-slate-850 rounded-lg text-[9px] font-bold text-slate-300 uppercase tracking-wide">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT EXPANDED WORKSPACE CONTENT PORTAL */}
              <div className="flex-grow flex flex-col bg-slate-950 overflow-hidden h-full">
                
                {/* Tab Bar Navigation (Hides scrollbar with inline styles & custom padding) */}
                <div 
                  className="bg-slate-900/60 border-b border-slate-850 px-8 pt-6 pr-20 flex gap-2 overflow-x-auto scrollbar-none select-none"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {[
                    { id: 'blueprint', label: '30-Day Blueprint', icon: <FileText size={13} /> },
                    { id: 'syllabus', label: 'Core Syllabus', icon: <BookOpen size={13} /> },
                    { id: 'rounds', label: 'Interview Process', icon: <Layout size={13} /> },
                    { id: 'simulator', label: 'AI Mock Portal', icon: <Cpu size={13} /> }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveModalTab(tab.id)}
                      className={`px-5 py-3 rounded-t-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-t-2 border-x transition-all duration-300 whitespace-nowrap ${
                        activeModalTab === tab.id
                          ? 'bg-slate-950 text-indigo-400 border-t-indigo-500 border-x-slate-850'
                          : 'bg-transparent text-slate-505 border-t-transparent border-x-transparent hover:text-slate-200'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Tab Panel Body Workspace */}
                <div className="flex-grow p-8 md:p-12 overflow-y-auto h-full pb-32">
                  
                  {/* TAB 1: 30-DAY BLUEPRINT */}
                  {activeModalTab === 'blueprint' && (
                    <div className="space-y-6 max-w-5xl">
                      <div className="flex items-center gap-3.5 mb-2">
                        <div className="w-10 h-10 bg-indigo-500/10 rounded-lg border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-md">
                          <Activity size={18} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white tracking-tight">Structured Preparation Timeline</h3>
                          <p className="text-slate-500 text-[10px] uppercase tracking-wider">Chronological Target roadmap for {selectedCompany.name}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedCompany.roadmap30Days.map((step, idx) => (
                          <div key={idx} className="bg-slate-900/40 border border-slate-850 rounded-xl p-5 relative group hover:bg-slate-900/60 transition-all duration-300">
                            <span className="absolute top-4 right-4 text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 border border-indigo-500/20 rounded">
                              Week 0{step.week}
                            </span>
                            <h4 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Phase {step.week}</h4>
                            <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-normal">{step.focus}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 2: CORE SYLLABUS */}
                  {activeModalTab === 'syllabus' && (
                    <div className="space-y-6 max-w-5xl">
                      <div className="flex items-center gap-3.5 mb-2">
                        <div className="w-10 h-10 bg-indigo-500/10 rounded-lg border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-md">
                          <BookOpen size={18} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white tracking-tight">Core Competencies & Frameworks</h3>
                          <p className="text-slate-500 text-[10px] uppercase tracking-wider">Required foundational elements</p>
                        </div>
                      </div>

                      <div className="bg-slate-900/40 border border-slate-855 rounded-xl p-6">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Syllabus Breakdown Checklist</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {selectedCompany.skills.map((skill, index) => (
                            <div key={index} className="flex items-center gap-3 bg-slate-955/60 p-3.5 rounded-lg border border-slate-855/80">
                              <div className="w-5 h-5 rounded-full bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center text-indigo-400"><Check size={11} /></div>
                              <span className="text-xs font-bold text-slate-300">{skill} Mastery</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: INTERVIEW PROCESS (WITH MODULAR ROUND CARDS & SOLUTIONS) */}
                  {activeModalTab === 'rounds' && (
                    <div className="space-y-6 max-w-5xl">
                      <div className="flex items-center gap-3.5 mb-2">
                        <div className="w-10 h-10 bg-indigo-500/10 rounded-lg border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-md">
                          <Layout size={18} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white tracking-tight">Official Recruitment Pathway</h3>
                          <p className="text-slate-505 text-[10px] uppercase tracking-wider">Expand any round to access custom practice sheets and detailed solutions</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {selectedCompany.rounds.map((round, idx) => (
                          <RoundCard key={idx} round={round} idx={idx} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 4: MOCK SIMULATOR PORTAL */}
                  {activeModalTab === 'simulator' && (
                    <div className="space-y-6 max-w-5xl">
                      <div className="flex items-center gap-3.5 mb-2">
                        <div className="w-10 h-10 bg-indigo-500/10 rounded-lg border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-md">
                          <Cpu size={18} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white tracking-tight">AI Assessment Sandbox</h3>
                          <p className="text-slate-505 text-[10px] uppercase tracking-wider">Voice-Speech & Coding model</p>
                        </div>
                      </div>

                      <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 relative overflow-hidden">
                        
                        <AnimatePresence mode="wait">
                          {!simulating && simStep === 0 && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="text-center py-8"
                            >
                              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mx-auto mb-4 animate-bounce">
                                <Video size={20} />
                              </div>
                              <h4 className="text-sm font-bold text-white mb-1">Begin Mock Auditing</h4>
                              <p className="text-slate-500 text-xs max-w-sm mx-auto mb-6">Launch our targeted real-time voice synthesis and algorithmic compiler framework mock session.</p>
                              
                              <button 
                                onClick={runAISimulator}
                                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 border border-indigo-500 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-md transition-all"
                              >
                                Start Interactive Simulation
                              </button>
                            </motion.div>
                          )}

                          {simulating && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="space-y-6"
                            >
                              {simStep === 1 && (
                                <div className="text-center py-8">
                                  <div className="w-10 h-10 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mx-auto mb-4" />
                                  <h4 className="text-sm font-bold text-white">Synthesizing Vocoder Models...</h4>
                                  <p className="text-slate-500 text-xs">Calibrating acoustic algorithms for {selectedCompany.name} voice metrics.</p>
                                </div>
                              )}

                              {simStep === 2 && (
                                <div className="space-y-4">
                                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                                    <span className="text-xs font-bold text-slate-400">SESSION PHASE: ALGORITHMIC MATRIX</span>
                                    <span className="text-xs text-indigo-400 font-mono animate-pulse">RECORDING AUDIO...</span>
                                  </div>
                                  <div className="p-4 bg-slate-955 rounded-xl border border-slate-855 font-mono text-xs text-slate-350">
                                    <span className="text-fuchsia-400 font-bold">Interviewer:</span> "Given a binary search tree, write an optimal algorithm to find the lowest common ancestor of two nodes in logarithmic time."
                                  </div>
                                  <div className="flex justify-center py-2">
                                    <span className="text-[10px] text-slate-550 italic font-medium">Speak or code answer to activate evaluator...</span>
                                  </div>
                                </div>
                              )}

                              {simStep === 3 && (
                                <div className="text-center py-8">
                                  <div className="w-10 h-10 rounded-full border-2 border-fuchsia-500 border-t-transparent animate-spin mx-auto mb-4" />
                                  <h4 className="text-sm font-bold text-white">Compiling Semantic Answer Graphs...</h4>
                                  <p className="text-slate-500 text-xs">Analyzing audio frequencies and logic trees.</p>
                                </div>
                              )}
                            </motion.div>
                          )}

                          {!simulating && simStep === 4 && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="space-y-4"
                            >
                              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center"><CheckCircle2 size={16} /></div>
                                <div>
                                  <h4 className="text-sm font-bold text-white">Audit Completed Successfully</h4>
                                  <p className="text-slate-500 text-xs">Conceptual logic verified and voice metrics processed.</p>
                                </div>
                              </div>

                              <div className="grid grid-cols-3 gap-3">
                                <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl text-center">
                                  <span className="text-2xl font-extrabold text-indigo-400">92%</span>
                                  <span className="block text-[9px] text-slate-500 uppercase font-bold tracking-wider mt-1">Accuracy</span>
                                </div>
                                <div className="bg-slate-955 p-4 border border-slate-855 rounded-xl text-center">
                                  <span className="text-2xl font-extrabold text-fuchsia-455">High</span>
                                  <span className="block text-[9px] text-slate-505 uppercase font-bold tracking-wider mt-1">Confidence</span>
                                </div>
                                <div className="bg-slate-955 p-4 border border-slate-855 rounded-xl text-center">
                                  <span className="text-2xl font-extrabold text-cyan-400">O(log N)</span>
                                  <span className="block text-[9px] text-slate-550 uppercase font-bold tracking-wider mt-1">Complexity</span>
                                </div>
                              </div>

                              <div className="flex justify-center pt-2">
                                <button 
                                  onClick={() => setSimStep(0)}
                                  className="text-xs text-slate-400 hover:text-white font-bold uppercase tracking-wider underline"
                                >
                                  Restart Test Portal
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

                  {/* BOTTOM ACTION CTA BOX */}
                  <div className="mt-8 pt-6 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl">
                    <p className="text-slate-500 text-xs text-center sm:text-left max-w-sm">Ready to validate your logic in realistic live environments?</p>
                    <button 
                      onClick={() => {
                        setSelectedCompany(null);
                        setShowSubscription(true);
                      }}
                      className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-md shadow-indigo-600/20 hover:scale-[1.02] active:scale-98 transition-all w-full sm:w-auto text-center"
                    >
                      Initialize 1:1 Live Mentor Mock
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Subscription Popup Modal */}
      <AnimatePresence>
        {showSubscription && (
          <SubscriptionPopup onClose={() => setShowSubscription(false)} />
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default Interview;
