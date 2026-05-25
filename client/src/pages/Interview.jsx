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
    <div className="bg-[#0B0F19] min-h-screen selection:bg-blue-600/30 pb-20 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-900/10 blur-[150px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-10 relative z-10">
        {/* Premium Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6 shadow-lg backdrop-blur-md"
          >
            <Gem size={14} className="text-blue-400 animate-pulse" /> Advanced Placement Protocols
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight"
          >
            Elite <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Interview Roadmaps</span>
          </motion.h1>
          <p className="text-slate-400 text-lg md:text-xl font-normal max-w-3xl leading-relaxed">
            Establish technical dominance with proprietary preparation guides for global tech giants, high-growth startups, and product leaders.
          </p>
        </div>

        {/* Search & Filter Bento */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl mb-12 border border-slate-800/80"
        >
          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="relative flex-grow w-full group">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-400 transition-colors">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder="Identify specific company roadmaps (e.g. Google, Amazon, Zoho...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4.5 bg-slate-950/50 border border-slate-800 rounded-2xl font-medium text-white shadow-inner outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-500 text-base"
              />
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-none">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeFilter === filter 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105' 
                      : 'bg-slate-950/40 text-slate-400 border border-slate-850 hover:bg-slate-800/50 hover:text-slate-350'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Company Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCompanies.map((company, i) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-slate-900/40 backdrop-blur-md rounded-2xl p-0 shadow-xl hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex flex-col border border-slate-800/80 hover:border-blue-500/30"
            >
              <div className="p-6 md:p-8 flex-grow">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-slate-950/80 border border-slate-850 flex items-center justify-center p-3.5 shadow-md group-hover:scale-105 transition-transform duration-300">
                    <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleBookmark(company.id); }}
                    className={`p-3 rounded-xl transition-all shadow-sm ${bookmarked.includes(company.id) ? 'bg-blue-600 text-white' : 'bg-slate-950/60 text-slate-450 hover:text-blue-400 hover:bg-slate-800/50'}`}
                  >
                    <Bookmark size={18} fill={bookmarked.includes(company.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2.5 group-hover:text-blue-400 transition-colors tracking-tight">{company.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className={`px-3 py-1 text-[9px] font-semibold uppercase tracking-wider rounded-full ${
                      company.type === 'Product Based' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                      company.type === 'Startup' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                    }`}>
                      {company.type}
                    </span>
                    <span className={`px-3 py-1 text-[9px] font-semibold uppercase tracking-wider rounded-full ${
                      company.difficulty === 'Expert' ? 'bg-rose-500/10 text-rose-450 border border-rose-500/20' : 
                      company.difficulty === 'Hard' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {company.difficulty}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-850">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-450">CTC Package</span>
                    <span className="text-slate-200 font-semibold">{company.package}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-450">Assessment</span>
                    <span className="text-slate-200 font-semibold">{company.rounds.length} Interview Rounds</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => handleAction(company)}
                className="w-full py-4.5 bg-slate-950/80 text-slate-300 font-bold uppercase text-[10px] tracking-widest group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2 border-t border-slate-850/50 group-hover:border-transparent"
              >
                Access Roadmap <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCompanies.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-16 h-16 bg-slate-900/60 rounded-2xl flex items-center justify-center text-slate-450 mx-auto mb-6 border border-slate-800 shadow-xl">
              <Shield size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">No protocols identified</h3>
            <p className="text-slate-555 font-medium text-sm">Try adjusting your filtration parameters or search query.</p>
          </div>
        )}
      </div>

      {/* Detailed Prep Modal */}
      <AnimatePresence>
        {selectedCompany && (
          <div className="fixed inset-0 z-[1000] bg-slate-955/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="w-full max-w-6xl bg-slate-950/95 rounded-2xl shadow-2xl relative border border-slate-800/80 overflow-hidden flex flex-col lg:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setSelectedCompany(null)} 
                className="absolute top-6 right-6 p-2.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-all z-[1010]"
              >
                <X size={20} />
              </button>
              
              {/* Left Info Panel */}
              <div className="lg:w-[380px] bg-slate-900/60 p-8 border-b lg:border-b-0 lg:border-r border-slate-800/80 overflow-y-auto flex-shrink-0 flex flex-col">
                <div className="w-24 h-24 bg-slate-950 rounded-2xl flex items-center justify-center p-5 shadow-lg mb-8 self-center lg:self-start border border-slate-850">
                  <img src={selectedCompany.logo} alt={selectedCompany.name} className="w-full h-full object-contain" />
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight leading-tight text-center lg:text-left">{selectedCompany.name}</h2>
                <div className="inline-block self-center lg:self-start px-3.5 py-1.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider rounded-full mb-8 shadow-sm">
                  {selectedCompany.type}
                </div>
                
                <div className="space-y-8 flex-grow">
                  <div>
                    <h4 className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-2">Eligibility Protocol</h4>
                    <p className="text-slate-300 text-sm leading-relaxed">{selectedCompany.eligibility}</p>
                  </div>
                  <div>
                    <h4 className="text-slate-500 text-[10px] font-bold uppercase tracking-wider mb-3">Core Competencies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCompany.skills.map(skill => (
                        <span key={skill} className="px-3 py-1.5 bg-slate-950/60 border border-slate-850 rounded-lg text-[10px] font-semibold text-slate-300 uppercase tracking-wide">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Roadmap Panel */}
              <div className="flex-grow p-6 md:p-10 overflow-y-auto bg-slate-950">
                <div className="flex items-center gap-5 mb-8">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-md">
                    <Activity size={22} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Strategic Prep Roadmap</h3>
                    <p className="text-slate-500 uppercase tracking-widest text-[9px] mt-1">30-Day execution cycle for {selectedCompany.name}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {selectedCompany.roadmap30Days.map((step, idx) => (
                    <div key={idx} className="bg-slate-900/40 rounded-xl p-5 border border-slate-850 shadow-sm relative group hover:bg-slate-900/70 hover:border-slate-800 transition-all duration-300">
                      <div className="absolute top-4 right-4 w-9 h-9 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center font-bold text-sm">
                        W{step.week}
                      </div>
                      <h4 className="text-base font-bold text-white mb-2 tracking-tight">Phase {step.week} Cycle</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.focus}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                    <Layout size={18} className="text-blue-400" /> Interview Process breakdown
                  </h3>
                  {selectedCompany.rounds.map((round, idx) => (
                    <details key={idx} className="group bg-slate-900/40 border border-slate-850 rounded-xl overflow-hidden transition-all duration-300 open:bg-slate-900/60 open:border-slate-800">
                      <summary className="p-5 flex items-center justify-between cursor-pointer list-none select-none">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-slate-950 text-blue-400 flex items-center justify-center font-bold text-xs border border-slate-850">
                            0{idx + 1}
                          </div>
                          <h4 className="text-sm font-bold text-white tracking-tight">{round.title}</h4>
                        </div>
                        <ChevronRight size={18} className="text-slate-400 group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="px-5 pb-5 pt-3 border-t border-slate-850/60 bg-slate-950/40">
                        <h5 className="text-[9px] font-bold text-blue-400 uppercase tracking-widest mb-3">Target Competencies:</h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {round.topics.map(topic => (
                            <div key={topic} className="flex items-center gap-2.5 bg-slate-950/65 px-4 py-2.5 rounded-lg border border-slate-850">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-md"></div>
                              <span className="text-xs font-semibold text-slate-350">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </details>
                  ))}
                </div>

                <div className="mt-10 p-6 bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/20 rounded-xl text-white shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px]"></div>
                  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="max-w-xl text-center md:text-left">
                      <h3 className="text-xl font-bold mb-2 tracking-tight">Simulate Realistic Interviews</h3>
                      <p className="text-slate-400 text-sm">Practice live mock sessions with senior engineers and architects from {selectedCompany.name} and get instant detailed feedback.</p>
                    </div>
                    <button className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold uppercase text-[10px] tracking-widest shadow-lg shadow-blue-600/20 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-98 transition-all whitespace-nowrap">
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
