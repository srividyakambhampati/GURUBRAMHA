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
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import SubscriptionPopup from '../components/SubscriptionPopup';
import { useAuth } from '../context/AuthContext';

const Interview = () => {
  const { user } = useAuth();
  const [showSubscription, setShowSubscription] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [bookmarked, setBookmarked] = useState([]);

  const filters = ['All', 'Product Based', 'Service Based', 'Startup'];

  const companyData = [
    // PRODUCT-BASED COMPANIES
    {
      id: 1,
      name: 'Google',
      type: 'Product Based',
      logo: 'https://www.svgrepo.com/show/475656/google-color.svg',
      package: '₹18L - ₹45L',
      difficulty: 'Expert',
      overview: 'Focuses on core computer science fundamentals, DSA, and problem-solving skills.',
      eligibility: 'B.E/B.Tech/M.E/M.Tech (CS/IT/ECE preferred). 70% throughout academic career.',
      skills: ['Data Structures', 'Algorithms', 'System Design', 'Operating Systems', 'OOPs'],
      process: ['Online Assessment', 'Technical Phone Screen', '4-5 Onsite Rounds', 'Hiring Committee Review'],
      rounds: [
        { title: 'Aptitude & Reasoning', topics: ['Probability', 'Number Systems', 'Logical Puzzles', 'Patterns'] },
        { title: 'Coding Round', topics: ['Graphs', 'Dynamic Programming', 'Heaps', 'Backtracking'] },
        { title: 'Technical Round', topics: ['Memory Management', 'Multithreading', 'Scalability', 'DB Optimization'] },
        { title: 'Face-to-Face', topics: ['Googliness & Leadership', 'Project Architecture', 'Situation Handling'] }
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
      logo: 'https://www.svgrepo.com/show/448239/microsoft.svg',
      package: '₹16L - ₹42L',
      difficulty: 'Hard',
      overview: 'Strong emphasis on software engineering principles and efficient code writing.',
      eligibility: 'B.Tech/M.Tech/MCA. No active backlogs.',
      skills: ['C++', 'Java', 'C#', 'SQL', 'Data Structures', 'OS'],
      process: ['Coding Test', 'Technical Interview 1', 'Technical Interview 2', 'AA (As Appropriate) Round'],
      rounds: [
        { title: 'Aptitude', topics: ['Time & Work', 'Percentages', 'Profit & Loss'] },
        { title: 'Coding', topics: ['Linked Lists', 'Binary Trees', 'Arrays'] },
        { title: 'Technical', topics: ['OOPs Concepts', 'DBMS', 'Computer Networks'] },
        { title: 'F2F Interview', topics: ['Behavioral Questions', 'Resume Walkthrough'] }
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
        logo: 'https://www.svgrepo.com/show/331301/amazon-aws.svg',
        package: '₹15L - ₹38L',
        difficulty: 'Hard',
        overview: 'Unique focus on 14 Leadership Principles alongside heavy DSA.',
        eligibility: 'Engineering graduates. Strong analytical skills.',
        skills: ['Java/C++', 'Leadership Principles', 'Object Oriented Design', 'Distributed Systems'],
        process: ['Online Test', '2 Technical Rounds', 'Bar Raiser Round', 'Managerial Round'],
        rounds: [
            { title: 'Coding Round', topics: ['Sliding Window', 'Greedy Algorithms', 'Stack/Queues'] },
            { title: 'Technical Round', topics: ['System Design', 'Code Quality', 'Error Handling'] },
            { title: 'Leadership Round', topics: ['14 Principles Case Studies', 'Past Conflict Resolution'] }
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
      logo: 'https://www.svgrepo.com/show/342023/meta.svg',
      package: '₹20L - ₹50L',
      difficulty: 'Expert',
      overview: 'Focuses on speed and accuracy in solving medium-to-hard LeetCode problems.',
      eligibility: 'Degree in CS or related field. High performance in coding competitions.',
      skills: ['Fast Coding', 'Algorithms', 'System Design', 'React/Mobile (for specific roles)'],
      process: ['Intro Call', 'Technical Screening', 'Loop (Coding, Design, Behavioral)'],
      rounds: [
        { title: 'Coding Round', topics: ['BFS/DFS', 'Binary Search', 'Topological Sort'] },
        { title: 'Design Round', topics: ['System Design', 'Product Design (API/DB Schema)'] }
      ],
      roadmap30Days: [
        { week: 1, focus: 'Meta Top Tagged LeetCode Questions' },
        { week: 2, focus: 'System Design Patterns' },
        { week: 3, focus: 'Product Knowledge & Culture' },
        { week: 4, focus: 'Speed Drills (2 Mediums in 40 mins)' }
      ]
    },
    // SERVICE-BASED COMPANIES
    {
      id: 8,
      name: 'TCS',
      type: 'Service Based',
      logo: 'https://www.svgrepo.com/show/331306/tata.svg',
      package: '₹3.5L - ₹7.5L',
      difficulty: 'Medium',
      overview: 'Mass hiring through NQT (National Qualifier Test). Focuses on foundations.',
      eligibility: '60% throughout 10th, 12th, and Graduation.',
      skills: ['Basic Programming', 'Numerical Ability', 'Verbal Ability', 'Reasoning'],
      process: ['NQT Online Test', 'Technical Interview', 'HR Interview'],
      rounds: [
        { title: 'NQT Aptitude', topics: ['Percentages', 'Time & Distance', 'Statistics'] },
        { title: 'Coding Round', topics: ['Loops', 'Arrays', 'Strings (Basic)'] },
        { title: 'Technical Interview', topics: ['Java/Python Basics', 'Project Info', 'SQL'] }
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
      logo: 'https://www.svgrepo.com/show/331440/infosys.svg',
      package: '₹3.6L - ₹8.0L',
      difficulty: 'Medium',
      overview: 'Hiring through InfyTQ and HackWithInfy. Strong focus on logical reasoning.',
      eligibility: 'BE/BTech/ME/MTech/MSc/MCA graduates.',
      skills: ['Python/Java', 'Logic Building', 'DBMS', 'Communication'],
      process: ['Online Assessment', 'Technical Interview', 'HR Interview'],
      rounds: [
        { title: 'Aptitude', topics: ['Cryptarithmetic', 'Syllogism', 'Data Interpretation'] },
        { title: 'Coding Round', topics: ['Basic Algorithms', 'Matrix Problems'] }
      ],
      roadmap30Days: [
        { week: 1, focus: 'InfyTQ Sample Papers & Mock Tests' },
        { week: 2, focus: 'Core Java/Python Fundamentals' },
        { week: 3, focus: 'Logical Reasoning (Puzzles)' },
        { week: 4, focus: 'Behavioral Prep & Project Demo' }
      ]
    },
    // STARTUPS
    {
      id: 13,
      name: 'Zoho',
      type: 'Startup',
      logo: 'https://www.svgrepo.com/show/331652/zoho.svg',
      package: '₹6.5L - ₹12L',
      difficulty: 'Hard',
      overview: 'Unique process involving paper-pencil coding and building an app from scratch.',
      eligibility: 'Any graduate. Skills over degrees.',
      skills: ['C/Java', 'Logic Building', 'App Development', 'Problem Solving'],
      process: ['Aptitude', 'Paper Coding', 'Advanced Programming (App Building)', 'HR'],
      rounds: [
        { title: 'Logical Reasoning', topics: ['Flowcharts', 'Puzzles', 'Algorithms'] },
        { title: 'App Building Round', topics: ['Implement a Mini-System (e.g. Railway Booking)'] }
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
        logo: 'https://www.svgrepo.com/show/331393/flipkart.svg',
        package: '₹14L - ₹32L',
        difficulty: 'Hard',
        overview: 'Machine Coding round is the main filter here.',
        eligibility: 'Graduates with strong engineering foundations.',
        skills: ['Machine Coding', 'LLD', 'HLD', 'Clean Code'],
        process: ['Online Test', 'Machine Coding Round', 'Technical Round', 'Hiring Manager Round'],
        rounds: [
          { title: 'Machine Coding', topics: ['Clean Code Principles', 'Working Model in 2 Hours'] },
          { title: 'Design Round', topics: ['Ecommerce Scalability', 'Caching Strategies'] }
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
    } else {
      setShowSubscription(true);
    }
  };

  const toggleBookmark = (id) => {
    setBookmarked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="bg-[#0F172A] min-h-screen selection:bg-[#FFB800]/30 pb-20">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12 pt-10">
        {/* Elite Header */}
        <div className="flex flex-col items-center text-center mb-24">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-[#FFB800] text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-2xl"
            >
                <Gem size={16} /> Advanced Placement Protocols
            </motion.div>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-8xl font-black text-slate-900 mb-10 tracking-tight"
            >
                Elite <span className="text-[#FFB800]">Roadmaps</span>
            </motion.h1>
            <p className="text-slate-400 text-xl font-bold max-w-3xl leading-relaxed tracking-wide">
                Establish technical dominance with proprietary preparation guides for global MNCs, high-growth startups, and product giants.
            </p>
        </div>

        {/* Search & Filter Bento */}
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-white rounded-[48px] p-12 shadow-2xl mb-20 border border-white/20"
        >
            <div className="flex flex-col lg:flex-row items-center gap-10">
                <div className="relative flex-grow w-full group">
                    <div className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-600 transition-colors">
                        <Search size={24} />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Identify specific company roadmaps (e.g. Google, Amazon...)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-20 pr-10 py-6 bg-slate-50 border border-slate-100 rounded-[30px] font-black text-slate-900 shadow-inner outline-none focus:ring-4 focus:ring-orange-500/10 transition-all placeholder:text-slate-300"
                    />
                </div>
                <div className="flex items-center gap-4 overflow-x-auto pb-4 lg:pb-0 w-full lg:w-auto">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-10 py-5 rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap shadow-2xl ${
                                activeFilter === filter 
                                    ? 'bg-slate-900 text-[#FFB800] scale-105 shadow-slate-900/40' 
                                    : 'bg-slate-50 text-slate-400 border border-slate-100 hover:border-orange-200'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>

        {/* Company Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredCompanies.map((company, i) => (
                <motion.div
                    key={company.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-[48px] p-0 shadow-2xl hover:shadow-orange-500/20 transition-all group overflow-hidden flex flex-col border border-white/20"
                >
                    <div className="p-10 flex-grow">
                        <div className="flex items-start justify-between mb-10">
                            <div className="w-20 h-20 rounded-[30px] bg-slate-900 flex items-center justify-center p-4 shadow-2xl group-hover:scale-110 transition-transform">
                                <img src={company.logo} alt={company.name} className="w-full h-full object-contain brightness-0 invert" />
                            </div>
                            <button 
                                onClick={(e) => { e.stopPropagation(); toggleBookmark(company.id); }}
                                className={`p-4 rounded-2xl transition-all shadow-sm ${bookmarked.includes(company.id) ? 'bg-[#FFB800] text-slate-900' : 'bg-slate-50 text-slate-300 hover:text-orange-600'}`}
                            >
                                <Bookmark size={22} fill={bookmarked.includes(company.id) ? 'currentColor' : 'none'} />
                            </button>
                        </div>
                        <div className="mb-10">
                            <h3 className="text-3xl font-black text-slate-900 mb-3 group-hover:text-orange-600 transition-colors tracking-tight">{company.name}</h3>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-1.5 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                                    {company.type}
                                </span>
                                <span className={`px-4 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-full ${
                                    company.difficulty === 'Expert' ? 'bg-red-600 text-slate-900' : 
                                    company.difficulty === 'Hard' ? 'bg-orange-500 text-slate-900' : 'bg-green-500 text-slate-900'
                                } shadow-lg shadow-black/10`}>
                                    {company.difficulty}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                                <span className="text-slate-400">Yield</span>
                                <span className="text-slate-900">{company.package}</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                                <span className="text-slate-400">Complexity</span>
                                <span className="text-slate-900">{company.rounds.length} Operations</span>
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={() => handleAction(company)}
                        className="w-full py-7 bg-slate-900 text-white font-black uppercase text-[10px] tracking-[0.3em] group-hover:bg-orange-600 group-hover:text-[#FFB800] transition-all flex items-center justify-center gap-4"
                    >
                        Access Roadmap <ChevronRight size={18} />
                    </button>
                </motion.div>
            ))}
        </div>

        {/* Empty State */}
        {filteredCompanies.length === 0 && (
            <div className="py-40 text-center">
                <div className="w-24 h-24 bg-white/5 rounded-[40px] flex items-center justify-center text-slate-800 mx-auto mb-8 border border-white/5 shadow-2xl">
                    <Shield size={44} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">No protocols identified</h3>
                <p className="text-slate-500 font-bold text-lg">Try adjusting your filtration parameters.</p>
            </div>
        )}
      </div>

      {/* Detailed Prep Modal */}
      <AnimatePresence>
        {selectedCompany && (
            <div className="fixed inset-0 z-[1000] bg-[#0F172A]/90 backdrop-blur-3xl flex items-center justify-center p-6 md:p-12 overflow-y-auto">
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 30 }}
                    className="w-full max-w-7xl bg-white rounded-[64px] shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative border border-white/20 overflow-hidden flex flex-col lg:flex-row max-h-[90vh]"
                >
                    <button onClick={() => setSelectedCompany(null)} className="absolute top-10 right-10 p-5 text-slate-400 hover:text-orange-600 bg-slate-50 rounded-[24px] transition-all z-[1010] shadow-xl"><X size={32} /></button>
                    
                    {/* Left Info Panel */}
                    <div className="lg:w-[450px] bg-slate-900 p-16 overflow-y-auto flex-shrink-0 flex flex-col">
                        <div className="w-32 h-32 bg-white rounded-[40px] flex items-center justify-center p-6 shadow-2xl mb-16 self-center lg:self-start">
                            <img src={selectedCompany.logo} alt={selectedCompany.name} className="w-full h-full object-contain" />
                        </div>
                        <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter leading-none">{selectedCompany.name}</h2>
                        <div className="inline-block self-start px-6 py-2 bg-[#FFB800] text-slate-900 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-16 shadow-2xl">
                            {selectedCompany.type}
                        </div>
                        
                        <div className="space-y-16 flex-grow">
                            <div>
                                <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-6">Eligibility Protocol</h4>
                                <p className="text-slate-300 font-bold leading-relaxed text-lg tracking-wide">{selectedCompany.eligibility}</p>
                            </div>
                            <div>
                                <h4 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mb-6">Core Competencies</h4>
                                <div className="flex flex-wrap gap-3">
                                    {selectedCompany.skills.map(skill => (
                                        <span key={skill} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-[#FFB800] uppercase tracking-widest shadow-xl">{skill}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-16 pt-10 border-t border-white/5 text-center lg:text-left">
                            <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em]">Proprietary Training Active</p>
                        </div>
                    </div>

                    {/* Right Roadmap Panel */}
                    <div className="flex-grow p-12 md:p-20 overflow-y-auto custom-scrollbar bg-white">
                        <div className="flex items-center gap-8 mb-20">
                            <div className="w-20 h-20 bg-slate-900 rounded-[32px] flex items-center justify-center text-[#FFB800] shadow-2xl">
                                <Activity size={36} />
                            </div>
                            <div>
                                <h3 className="text-4xl font-black text-slate-900 tracking-tighter">Strategic Roadmap</h3>
                                <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[10px] mt-2">Establishment Plan for {selectedCompany.name}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                            {selectedCompany.roadmap30Days.map((step, idx) => (
                                <div key={idx} className="bg-slate-50 rounded-[48px] p-12 border border-slate-100 shadow-sm relative group hover:bg-white hover:shadow-2xl transition-all">
                                    <div className="absolute -top-6 -left-6 w-16 h-16 bg-slate-900 text-[#FFB800] rounded-[24px] flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform shadow-2xl">
                                        W{step.week}
                                    </div>
                                    <h4 className="text-2xl font-black text-slate-900 mb-4 mt-6 tracking-tight">Phase {step.week} Cycle</h4>
                                    <p className="text-slate-500 font-bold leading-relaxed text-lg">{step.focus}</p>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-10">
                            <h3 className="text-3xl font-black text-slate-900 mb-12 flex items-center gap-6">
                                <Layout className="text-orange-600" /> Operational Breakdown
                            </h3>
                            {selectedCompany.rounds.map((round, idx) => (
                                <details key={idx} className="group bg-slate-50 border border-slate-100 rounded-[40px] overflow-hidden transition-all shadow-sm open:shadow-2xl open:bg-white">
                                    <summary className="p-10 flex items-center justify-between cursor-pointer list-none transition-colors">
                                        <div className="flex items-center gap-8">
                                            <div className="w-14 h-14 rounded-[20px] bg-slate-900 text-[#FFB800] flex items-center justify-center font-black text-lg shadow-2xl">
                                                0{idx + 1}
                                            </div>
                                            <h4 className="text-2xl font-black text-slate-900 tracking-tight">{round.title}</h4>
                                        </div>
                                        <ChevronRight size={28} className="text-slate-300 group-open:rotate-90 transition-transform" />
                                    </summary>
                                    <div className="p-12 border-t border-slate-100 bg-white">
                                        <h5 className="text-[10px] font-black text-orange-600 uppercase tracking-[0.4em] mb-8">Target Competencies:</h5>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {round.topics.map(topic => (
                                                <div key={topic} className="flex items-center gap-4 bg-slate-50 p-5 rounded-[24px] border border-slate-100">
                                                    <div className="w-3 h-3 rounded-full bg-orange-600 shadow-lg shadow-orange-500/50"></div>
                                                    <span className="text-sm font-black text-slate-700 uppercase tracking-widest">{topic}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </details>
                            ))}
                        </div>

                        <div className="mt-24 p-16 bg-slate-900 rounded-[56px] text-slate-900 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 rounded-full blur-[100px]"></div>
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="max-w-xl text-center md:text-left">
                                    <h3 className="text-4xl font-black mb-4 tracking-tighter leading-none">Simulate Reality?</h3>
                                    <p className="text-slate-400 text-lg font-bold">Practice with senior architects from {selectedCompany.name} and receive instant protocol feedback.</p>
                                </div>
                                <button className="px-12 py-6 bg-[#FFB800] text-slate-900 rounded-[24px] font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl hover:scale-[1.05] active:scale-95 transition-all">
                                    Initialize Mock Session
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSubscription && (
          <SubscriptionPopup onClose={() => setShowSubscription(false)} />
        )}
      </AnimatePresence>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default Interview;
