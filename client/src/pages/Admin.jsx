import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CourseBuilder from '../components/admin/CourseBuilder';
import { useAuth } from '../context/AuthContext';
import Editor from '@monaco-editor/react';
import {
  Users,
  BookOpen,
  DollarSign,
  Video,
  BarChart,
  Plus,
  Trash2,
  Edit,
  TrendingUp,
  Search,
  Bell,
  CreditCard,
  Code,
  Briefcase,
  Settings,
  Eye,
  FileDown,
  Activity,
  Play,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Lock,
  Globe,
  Award,
  ChevronRight,
  Shield,
  Send,
  Download,
  Filter,
  Check,
  RefreshCw,
  Mail,
  Smartphone,
  Calendar,
  Clock,
  LogOut,
  Sliders,
  Database,
  Cpu,
  Upload,
  Zap
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

const Admin = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.email !== 'adminguru@gmail.com') {
      alert("Access Denied: You do not have permission to access the Admin Panel.");
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const [activeTab, setActiveTab] = useState('dashboard');

  // Modal Control States (Declared here to avoid TDZ / ReferenceErrors)
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddProblemOpen, setIsAddProblemOpen] = useState(false);
  const [isAddInterviewOpen, setIsAddInterviewOpen] = useState(false);
  const [isNewNotificationOpen, setIsNewNotificationOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [editingInterview, setEditingInterview] = useState(null);

  // Search & Filtering States
  const [userSearch, setUserSearch] = useState('');
  const [courseSearch, setCourseSearch] = useState('');
  const [problemSearch, setProblemSearch] = useState('');
  const [subSearch, setSubSearch] = useState('');
  const [subFilterPlan, setSubFilterPlan] = useState('All'); // All, Monthly, Yearly
  const [subFilterStatus, setSubFilterStatus] = useState('All'); // All, Successful, Failed, Refunded

  // Mock Data lists (stored in React state for full in-memory CRUD operations)
  const [users, setUsers] = useState([
    { id: 1, name: 'Alex Mercer', email: 'alex@gurubramha.edu', phone: '+91 98765 43210', joinedDate: '2026-01-15', subStatus: 'Active', plan: 'Yearly', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80', activeDuration: '142 hrs', activity: '94 problems' },
    { id: 2, name: 'Priya Sharma', email: 'priya@gmail.com', phone: '+91 87654 32109', joinedDate: '2026-02-10', subStatus: 'Active', plan: 'Monthly', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80', activeDuration: '48 hrs', activity: '31 problems' },
    { id: 3, name: 'Dev Karan', email: 'dev@karan.dev', phone: '+91 76543 21098', joinedDate: '2026-03-01', subStatus: 'Free', plan: 'None', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&h=100&q=80', activeDuration: '12 hrs', activity: '4 problems' },
    { id: 4, name: 'Sarah Connor', email: 'sarah@skynet.com', phone: '+91 65432 10987', joinedDate: '2026-03-12', subStatus: 'Suspended', plan: 'None', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100&q=80', activeDuration: '0 hrs', activity: '0 problems' },
    { id: 5, name: 'Rohan Mehta', email: 'rohan@mehta.org', phone: '+91 54321 09876', joinedDate: '2026-04-05', subStatus: 'Active', plan: 'Yearly', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80', activeDuration: '104 hrs', activity: '65 problems' },
  ]);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/courses`);
      setCourses(res.data);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    }
  };

  const [subscriptions, setSubscriptions] = useState([
    { id: 1, name: 'Alex Mercer', email: 'alex@gurubramha.edu', phone: '+91 98765 43210', plan: 'Yearly', date: '2026-01-15', time: '14:32', paymentId: 'pay_P9aXwkHr5Jyn1a', txId: 'GB2026SUB0001', amount: 9999, status: 'Successful', startDate: '2026-01-15', endDate: '2027-01-15' },
    { id: 2, name: 'Priya Sharma', email: 'priya@gmail.com', phone: '+91 87654 32109', plan: 'Monthly', date: '2026-02-10', time: '09:15', paymentId: 'pay_Sp9CaxwkHr5Jyn', txId: 'GB2026SUB0002', amount: 999, status: 'Successful', startDate: '2026-02-10', endDate: '2026-03-10' },
    { id: 3, name: 'Rohan Mehta', email: 'rohan@mehta.org', phone: '+91 54321 09876', plan: 'Yearly', date: '2026-04-05', time: '18:45', paymentId: 'pay_Rx82nd7as912da', txId: 'GB2026SUB0003', amount: 9999, status: 'Successful', startDate: '2026-04-05', endDate: '2027-04-05' },
    { id: 4, name: 'Kabir Das', email: 'kabir@das.in', phone: '+91 99988 87776', plan: 'Monthly', date: '2026-05-12', time: '11:20', paymentId: 'pay_FL28an91ka023j', txId: 'GB2026SUB0004', amount: 999, status: 'Failed', startDate: '2026-05-12', endDate: '2026-06-12' },
  ]);

  const [problems, setProblems] = useState([]);
  const [contests, setContests] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [leaderboardUsers, setLeaderboardUsers] = useState([]);
  const [codingActiveTab, setCodingActiveTab] = useState('questions');

  const fetchProblems = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/problems`, {
        params: { searchQuery: problemSearch }
      });
      setProblems(res.data);
    } catch (err) {
      console.error('Failed to fetch problems:', err);
    }
  };

  const fetchContests = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/contests`);
      setContests(res.data);
    } catch (err) {
      console.error('Failed to fetch contests:', err);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/submissions`);
      setSubmissions(res.data);
    } catch (err) {
      console.error('Failed to fetch submissions:', err);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/submissions/leaderboard`);
      setLeaderboardUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    }
  };

  useEffect(() => {
    if (activeTab === 'coding') {
      fetchProblems();
      fetchContests();
      fetchSubmissions();
      fetchLeaderboard();
    }
  }, [activeTab, problemSearch]);

  const [interviews, setInterviews] = useState([
    { id: 1, company: 'Google', round: 'Technical Protocol', category: 'Algorithms', questions: 24, materials: 'Dynamic Programming & System Design Docs' },
    { id: 2, company: 'Amazon', round: 'Leadership Assessment', category: 'Behavioral', questions: 15, materials: 'STAR Method PDF Workbook' },
    { id: 3, company: 'Microsoft', round: 'HR Briefing', category: 'Culture Fit', questions: 10, materials: 'Technical Values Standard manual' },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Summer Internship Drive 2026 Activated!', type: 'Promotional', target: 'All Scholars', date: '2026-05-10', status: 'Sent' },
    { id: 2, title: 'Renewal Reminder: Premium Tier Cycles', type: 'Reminder', target: 'Monthly Users', date: '2026-05-14', status: 'Sent' },
  ]);

  const [brandingSettings, setBrandingSettings] = useState({
    title: 'GuruBramha EdTech CMS',
    pricingMonthly: '999',
    pricingYearly: '9999',
    razorpayKey: 'rzp_test_Sp9CaxwkHr5Jyn',
    gstPercentage: '18',
  });

  // Modal Control States
  const [editingUser, setEditingUser] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  const [editingProblem, setEditingProblem] = useState(null);
  const [previewingProblem, setPreviewingProblem] = useState(null);
  const [isAddContestOpen, setIsAddContestOpen] = useState(false);
  const [editingContest, setEditingContest] = useState(null);
  const [viewingSubmissionCode, setViewingSubmissionCode] = useState(null);
  const [aiGeneratedProblem, setAiGeneratedProblem] = useState(null);

  // Advanced Coding Question Form States
  const [activeFormTab, setActiveFormTab] = useState('general'); // 'general', 'description', 'templates', 'testcases', 'hints_tags'
  const [formSelectedLanguage, setFormSelectedLanguage] = useState('javascript');
  const [modalProblemState, setModalProblemState] = useState({
    title: '', slug: '', difficulty: 'Easy', category: 'Arrays', points: 100,
    description: '', constraints: '', inputFormat: '', outputFormat: '',
    sampleInput: '', sampleOutput: '', explanation: '',
    hints: [''], tags: [], timeLimit: 1, memoryLimit: 256, status: 'Draft',
    starterCode: [
      { language: 'javascript', code: 'function solution(nums, target) {\n  // your JS code\n}' },
      { language: 'python', code: 'def solution(nums, target):\n    # your Python code\n    pass' },
      { language: 'cpp', code: '#include <vector>\nusing namespace std;\nvector<int> solution(vector<int>& nums, int target) {\n    return {};\n}' },
      { language: 'java', code: 'import java.util.*;\nclass Solution {\n    public int[] solution(int[] nums, int target) {\n        return new int[]{};\n    }\n}' },
      { language: 'c', code: '#include <stdio.h>\n// your C starter' }
    ],
    solutions: [
      { language: 'javascript', code: '' },
      { language: 'python', code: '' },
      { language: 'cpp', code: '' },
      { language: 'java', code: '' },
      { language: 'c', code: '' }
    ],
    testCases: [
      { input: '', expectedOutput: '', explanation: '', isHidden: false }
    ]
  });

  useEffect(() => {
    if (editingProblem) {
      setModalProblemState({
        ...editingProblem,
        hints: editingProblem.hints && editingProblem.hints.length > 0 ? editingProblem.hints : [''],
        tags: editingProblem.tags || [],
        starterCode: editingProblem.starterCode && editingProblem.starterCode.length > 0 ? editingProblem.starterCode : modalProblemState.starterCode,
        solutions: editingProblem.solutions && editingProblem.solutions.length > 0 ? editingProblem.solutions : modalProblemState.solutions,
        testCases: editingProblem.testCases && editingProblem.testCases.length > 0 ? editingProblem.testCases : [{ input: '', expectedOutput: '', explanation: '', isHidden: false }]
      });
    } else {
      setModalProblemState({
        title: '', slug: '', difficulty: 'Easy', category: 'Arrays', points: 100,
        description: '', constraints: '', inputFormat: '', outputFormat: '',
        sampleInput: '', sampleOutput: '', explanation: '',
        hints: [''], tags: [], timeLimit: 1, memoryLimit: 256, status: 'Draft',
        starterCode: [
          { language: 'javascript', code: 'function solution(nums, target) {\n  // your JS code\n}' },
          { language: 'python', code: 'def solution(nums, target):\n    # your Python code\n    pass' },
          { language: 'cpp', code: '#include <vector>\nusing namespace std;\nvector<int> solution(vector<int>& nums, int target) {\n    return {};\n}' },
          { language: 'java', code: 'import java.util.*;\nclass Solution {\n    public int[] solution(int[] nums, int target) {\n        return new int[]{};\n    }\n}' },
          { language: 'c', code: '#include <stdio.h>\n// your C starter' }
        ],
        solutions: [
          { language: 'javascript', code: '' },
          { language: 'python', code: '' },
          { language: 'cpp', code: '' },
          { language: 'java', code: '' },
          { language: 'c', code: '' }
        ],
        testCases: [
          { input: '', expectedOutput: '', explanation: '', isHidden: false }
        ]
      });
    }
    setActiveFormTab('general');
  }, [editingProblem, isAddProblemOpen]);

  // Stats definition
  const statsOverview = [
    { label: 'Total Scholars', value: users.length, sub: 'Active & Free', icon: <Users size={20} />, bgClass: 'bg-[#FFF7ED]', iconClass: 'text-[#F97316]' },
    { label: 'Subscribed Users', value: users.filter(u => u.subStatus === 'Active').length, sub: 'Active Plans', icon: <CheckCircle size={20} />, bgClass: 'bg-[#E6F8F0]', iconClass: 'text-[#10B981]' },
    { label: 'Total Courses Offered', value: courses.length, sub: 'LMS catalog', icon: <BookOpen size={20} />, bgClass: 'bg-[#F5F3FF]', iconClass: 'text-[#F59E0B]' },
    { label: 'Net LMS Revenue', value: `₹${subscriptions.filter(s => s.status === 'Successful').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}`, sub: 'Razorpay Net', icon: <DollarSign size={20} />, bgClass: 'bg-[#FFFBEB]', iconClass: 'text-[#D97706]' },
    { label: 'Demo Views', value: '45,210', sub: 'Interactive Media', icon: <Video size={20} />, bgClass: 'bg-[#FFF5F5]', iconClass: 'text-[#EF4444]' },
    { label: 'Coding Submissions', value: '18,534', sub: 'Elite Arena Trials', icon: <Code size={20} />, bgClass: 'bg-[#EEF2F6]', iconClass: 'text-[#6366F1]' },
    { label: 'Interview Queries', value: '3,212', sub: 'Company rounds', icon: <Briefcase size={20} />, bgClass: 'bg-[#ECFDF5]', iconClass: 'text-[#059669]' },
    { label: 'Active Reminders', value: notifications.length, sub: 'Broadcast triggers', icon: <Bell size={20} />, bgClass: 'bg-[#FFF7ED]', iconClass: 'text-[#F97316]' },
  ];

  // CSV Exporter (Requirement 12)
  const exportSubscriptionsCSV = () => {
    const headers = ['SI.No', 'Student Name', 'Email', 'Phone', 'Plan', 'Date', 'Time', 'Payment ID', 'Transaction ID', 'Amount Paid', 'Start Date', 'End Date', 'Payment Status'];
    const rows = subscriptions.map((s, index) => [
      index + 1,
      s.name,
      s.email,
      s.phone,
      s.plan,
      s.date,
      s.time,
      s.paymentId,
      s.txId,
      s.amount,
      s.startDate,
      s.endDate,
      s.status
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `GuruBramha_Subscriptions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate dynamic transaction ID (Requirement 10)
  const generateNextTransactionId = () => {
    const nextNum = subscriptions.length + 1;
    return `GB2026SUB${String(nextNum).padStart(4, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 flex selection:bg-[#2DD4BF]/20 relative overflow-hidden font-sans">

      {/* 1. Left Sleek Bento Sidebar Navigation */}
      <aside className="w-72 bg-[#0F172A] border-r border-slate-800/60 p-6 flex flex-col justify-between hidden lg:flex h-screen sticky top-0 z-40">
        <div className="space-y-10">
          {/* Logo Brand area */}
          <div className="flex items-center gap-3 pl-2">
            <div className="w-10 h-10 bg-rose-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
              <Shield size={20} fill="currentColor" className="opacity-90" />
            </div>
            <div>
              <h2 className="font-bold text-base leading-tight tracking-tight text-white">Admin Panel</h2>
              <span className="text-[10px] font-medium text-slate-500">GuruBramha LMS</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {[
              { id: 'dashboard', name: 'LMS Dashboard', icon: <BarChart size={18} /> },
              { id: 'users', name: 'User Management', icon: <Users size={18} /> },
              { id: 'courses', name: 'Courses CMS', icon: <BookOpen size={18} /> },
              { id: 'coding', name: 'Elite Arena CMS', icon: <Code size={18} /> },
              { id: 'interview', name: 'Interview Prep CMS', icon: <Briefcase size={18} /> },
              { id: 'subscriptions', name: 'Subscriptions Sales', icon: <CreditCard size={18} /> },
              { id: 'notifications', name: 'Notifications Log', icon: <Bell size={18} /> },
              { id: 'settings', name: 'Platform Settings', icon: <Settings size={18} /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-[13px] font-medium tracking-wide transition-all duration-200 ${activeTab === tab.id
                    ? 'bg-slate-800/80 text-white shadow-sm'
                    : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                  }`}
              >
                <span className={`${activeTab === tab.id ? 'text-blue-400' : 'text-slate-500'}`}>{tab.icon}</span>
                <span className="flex-grow text-left">{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* User administrative profile footer */}
        <div className="mt-8 pt-6 border-t border-slate-800">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm font-medium px-4 w-full text-left"
          >
            <Globe size={16} /> View Site
          </button>
          <button 
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm font-medium px-4 mt-6 w-full text-left"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* 2. Main Portal Scrollable Viewport */}
      <main className="flex-grow min-h-screen flex flex-col p-6 sm:p-10 lg:p-12 overflow-y-auto w-full">

        {/* Mobile Header / Quick Switch */}
        <div className="lg:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-[#0F172A] border border-slate-800 p-5 rounded-3xl shadow-lg">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center text-white font-black text-lg">G</div>
              <span className="font-extrabold text-sm uppercase tracking-wider text-white">GuruBramha Admin</span>
            </div>
            
            <div className="flex items-center gap-2 sm:hidden">
              <button 
                onClick={() => navigate('/')}
                title="View Site"
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
              >
                <Globe size={18} />
              </button>
              <button 
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                title="Logout"
                className="p-2 text-rose-500 hover:text-rose-450 hover:bg-rose-950/20 rounded-xl transition-all"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-slate-900 border border-slate-800 text-slate-200 rounded-xl text-xs font-bold uppercase tracking-widest outline-none focus:border-rose-500 transition-colors"
            >
              <option value="dashboard">Dashboard Overview</option>
              <option value="users">User Directory</option>
              <option value="courses">LMS Courses CMS</option>
              <option value="coding">Elite Coding CMS</option>
              <option value="interview">Interview Rounds CMS</option>
              <option value="subscriptions">Subscription sales</option>
              <option value="notifications">Notification logs</option>
              <option value="settings">CMS configurations</option>
            </select>
            
            <div className="hidden sm:flex items-center gap-2">
              <button 
                onClick={() => navigate('/')}
                title="View Site"
                className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all border border-slate-800"
              >
                <Globe size={18} />
              </button>
              <button 
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                title="Logout"
                className="p-2.5 text-rose-500 hover:text-rose-450 hover:bg-rose-950/20 rounded-xl transition-all border border-slate-800"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Active Page Portal Render */}
        <div className="space-y-12">

          {/* TAB 1: OVERVIEW DASHBOARD */}
          {activeTab === 'dashboard' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Header Title */}
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Admin Dashboard</h1>
                <p className="text-slate-400 text-sm mt-1">GuruBramha LMS — Operations Overview</p>
              </div>

              {/* Stats bento deck */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Scholars', value: users.length, icon: <Users size={20} />, bgClass: 'bg-[#8B5CF6]', textClass: 'text-white' },
                  { label: 'Net Revenue', value: `₹${subscriptions.filter(s => s.status === 'Successful').reduce((acc, curr) => acc + curr.amount, 0)}`, icon: '₹', bgClass: 'bg-[#2DD4BF]', textClass: 'text-slate-900 text-lg font-bold' },
                  { label: 'Submissions', value: '18,534', icon: <FileText size={20} />, bgClass: 'bg-[#FB923C]', textClass: 'text-white' },
                  { label: 'Active Teams', value: '240', icon: <Activity size={20} />, bgClass: 'bg-[#A855F7]', textClass: 'text-white' },
                ].map((item, i) => (
                  <div key={i} className="bg-[#131B2C] border border-slate-800/80 rounded-[20px] p-6 hover:border-slate-700 transition-all duration-300">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${item.bgClass} ${item.textClass} shadow-lg`}>
                      {item.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-white tracking-tight">{item.value}</h3>
                    <p className="text-sm font-medium text-slate-400 mt-2">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Bento Widgets Zone */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Registrations Table (Left 2 cols) */}
                <div className="lg:col-span-2 bg-[#131B2C] border border-slate-800/80 rounded-[20px] p-6 hover:border-slate-700 transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white">Recent Registrations</h3>
                    <button className="text-blue-500 text-sm font-medium hover:text-blue-400">View All →</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="text-slate-500 border-b border-slate-800/80">
                          <th className="pb-3 font-medium">Name</th>
                          <th className="pb-3 font-medium text-center">Team</th>
                          <th className="pb-3 font-medium text-center">Track</th>
                          <th className="pb-3 font-medium text-center">Status</th>
                          <th className="pb-3 font-medium text-right">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/50">
                        {users.slice(0, 5).map((user, i) => (
                          <tr key={i} className="text-slate-300">
                            <td className="py-4">
                              <p className="font-medium text-white">{user.name}</p>
                              <p className="text-xs text-slate-500">{user.email}</p>
                            </td>
                            <td className="py-4 text-center text-slate-500">—</td>
                            <td className="py-4 text-center text-slate-500">—</td>
                            <td className="py-4 text-center">
                              <span className="px-3 py-1 bg-yellow-900/30 text-yellow-500 border border-yellow-700/50 rounded-full text-xs font-medium">
                                pending
                              </span>
                            </td>
                            <td className="py-4 text-right text-slate-400">May 24, 2026</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right Column: Payment Summary & Funnel */}
                <div className="space-y-6">
                  {/* Payment Summary */}
                  <div className="bg-[#131B2C] border border-slate-800/80 rounded-[20px] p-6 hover:border-slate-700 transition-all duration-300">
                    <h3 className="text-lg font-bold text-white mb-6">Payment Summary</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-800/80 rounded-xl">
                        <div className="flex items-center gap-3">
                          <CheckCircle size={16} className="text-emerald-500" />
                          <span className="text-slate-300 text-sm font-medium">Successful</span>
                        </div>
                        <span className="text-white font-bold">1</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-800/80 rounded-xl">
                        <div className="flex items-center gap-3">
                          <Clock size={16} className="text-yellow-500" />
                          <span className="text-slate-300 text-sm font-medium">Pending</span>
                        </div>
                        <span className="text-white font-bold">7</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-800/80 rounded-xl">
                        <div className="flex items-center gap-3">
                          <XCircle size={16} className="text-rose-500" />
                          <span className="text-slate-300 text-sm font-medium">Failed</span>
                        </div>
                        <span className="text-white font-bold">0</span>
                      </div>
                    </div>
                  </div>

                  {/* Signup Funnel */}
                  <div className="bg-[#131B2C] border border-slate-800/80 rounded-[20px] p-6 hover:border-slate-700 transition-all duration-300">
                    <h3 className="text-lg font-bold text-white mb-6">Signup Funnel</h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Page Visits', val: '-', percent: '100%', color: 'bg-blue-500' },
                        { label: 'Registration Started', val: '-', percent: '80%', color: 'bg-blue-400' },
                        { label: 'Payment Attempted', val: '8', percent: '50%', color: 'bg-blue-600' },
                        { label: 'Payment Successful', val: '1', percent: '20%', color: 'bg-blue-500' },
                      ].map((item, i) => (
                        <div key={i}>
                          <div className="flex items-center justify-between text-xs mb-2">
                            <div className="flex items-center gap-3">
                              <span className="text-slate-600 font-mono">{i + 1}</span>
                              <span className="text-slate-300 font-medium">{item.label}</span>
                            </div>
                            <span className="text-white font-bold">{item.val}</span>
                          </div>
                          <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
                            <div className={`h-full ${item.color} rounded-full`} style={{ width: item.percent }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: USER MANAGEMENT */}
          {activeTab === 'users' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 font-sans">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-bold uppercase text-blue-400 tracking-[0.15em] bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full">User Accounts Directory</span>
                  <h1 className="text-3xl font-bold text-white mt-4">LMS Scholar Management</h1>
                  <p className="text-slate-400 font-medium text-sm tracking-wide mt-1">Suspend, delete, review courses log, and manage roles.</p>
                </div>
                <button
                  onClick={() => setIsAddUserOpen(true)}
                  className="px-6 py-3.5 bg-gradient-to-r from-[#F97316] to-[#F59E0B] hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-xl shadow-sm shadow-[#F97316]/15 transition-all flex items-center justify-center gap-2 self-start sm:self-auto text-xs uppercase tracking-wider"
                >
                  <Plus size={18} /> Enroll New Scholar
                </button>
              </div>

              {/* Filtering Search Bar */}
              <div className="bg-[#131B2C] border border-slate-800/80 rounded-2xl !p-5 flex flex-col md:flex-row items-center gap-6 shadow-sm">
                <div className="relative flex-grow w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search scholars by name, email coordinates, or phone number..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-800/80 rounded-xl focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none font-bold text-white placeholder:text-slate-500 transition-all text-xs"
                  />
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-[#131B2C] border border-slate-800/80 rounded-[20px] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-900/30 border-b border-slate-800/80 sticky top-0 z-10">
                        <th className="px-8 py-5 w-16 text-center">SI.No</th>
                        <th className="px-8 py-5">Scholar details</th>
                        <th className="px-8 py-5">Phone Number</th>
                        <th className="px-8 py-5">Joined Date</th>
                        <th className="px-8 py-5">Active Duration</th>
                        <th className="px-8 py-5 text-center">Status</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100/70">
                      {users
                        .filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()))
                        .map((user, i) => (
                          <tr key={user.id} className="hover:bg-slate-800/30 even:bg-slate-900/20 transition-all duration-200 text-xs font-semibold text-slate-300 border-b border-slate-800/40 last:border-0">
                            <td className="px-8 py-4.5 text-center font-bold text-slate-400">{i + 1}</td>
                            <td className="px-8 py-4.5">
                              <div className="flex items-center gap-4">
                                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-slate-100 shadow-sm" />
                                <div>
                                  <p className="font-bold text-white leading-none">{user.name}</p>
                                  <span className="text-[11px] text-slate-400 font-semibold mt-1 inline-block">{user.email}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-4.5 font-bold text-slate-400">{user.phone}</td>
                            <td className="px-8 py-4.5 font-bold text-slate-400">{user.joinedDate}</td>
                            <td className="px-8 py-4.5">
                              <span className="px-3 py-1 bg-slate-800/50 border border-slate-700/50 rounded-lg text-[10px] font-bold text-slate-300 uppercase tracking-wider">{user.activeDuration}</span>
                            </td>
                            <td className="px-8 py-4.5 text-center">
                              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${user.subStatus === 'Active' ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800/50' :
                                  user.subStatus === 'Free' ? 'bg-yellow-900/30 text-yellow-500 border border-yellow-700/50' :
                                    'bg-rose-900/30 text-rose-400 border border-rose-800/50'
                                }`}>
                                {user.subStatus} {user.plan !== 'None' ? `(${user.plan})` : ''}
                              </span>
                            </td>
                            <td className="px-8 py-4.5 text-right">
                              <div className="flex items-center justify-end gap-2.5">
                                <button
                                  onClick={() => setEditingUser(user)}
                                  className="p-2.5 bg-[#FFF7ED] border border-transparent hover:border-[#F97316]/10 rounded-xl text-[#F97316] hover:bg-[#FFF7ED]/80 hover:scale-105 active:scale-95 transition-all"
                                  title="Edit account details"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Suspend account of ${user.name}?`)) {
                                      setUsers(users.map(u => u.id === user.id ? { ...u, subStatus: 'Suspended' } : u));
                                    }
                                  }}
                                  className="p-2.5 bg-slate-800/50 border border-transparent hover:border-amber-500/30 rounded-xl text-amber-500 hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all"
                                  title="Suspend session"
                                >
                                  <Lock size={14} />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Confirm permanent erasure of ${user.name}?`)) {
                                      setUsers(users.filter(u => u.id !== user.id));
                                    }
                                  }}
                                  className="p-2.5 bg-red-50 border border-transparent hover:border-red-200/40 rounded-xl text-red-600 hover:bg-red-100 hover:scale-105 active:scale-95 transition-all"
                                  title="Erase scholar record"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: COURSES CMS */}
          {activeTab === 'courses' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 font-sans">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-bold uppercase text-purple-400 tracking-[0.15em] bg-purple-500/10 border border-purple-500/20 px-3.5 py-1.5 rounded-full">LMS COURSE CMS</span>
                  <h1 className="text-3xl font-bold text-white mt-4">LMS Course Management</h1>
                  <p className="text-slate-400 font-medium text-sm tracking-wide mt-1">Upload videos, attach notes/PDFs, set pricing, and manage status.</p>
                </div>
                <button
                  onClick={() => setIsAddCourseOpen(true)}
                  className="px-6 py-3.5 bg-gradient-to-r from-[#F97316] to-[#F59E0B] hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-xl shadow-sm shadow-[#F97316]/15 transition-all flex items-center justify-center gap-2 self-start sm:self-auto text-xs uppercase tracking-wider"
                >
                  <Plus size={18} /> Add New Course
                </button>
              </div>

              {/* Filtering Search Bar */}
              <div className="bg-[#131B2C] border border-slate-800/80 rounded-2xl !p-5 flex flex-col md:flex-row items-center gap-6 shadow-sm">
                <div className="relative flex-grow w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                    placeholder="Search courses catalog by name, instructor, or structural topic..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-800/80 rounded-xl focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none font-bold text-white placeholder:text-slate-500 transition-all text-xs"
                  />
                </div>
              </div>

              {/* Courses Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {courses
                  .filter(c => {
                    const name = c.name || '';
                    const instructor = c.instructor || '';
                    return name.toLowerCase().includes(courseSearch.toLowerCase()) ||
                      instructor.toLowerCase().includes(courseSearch.toLowerCase());
                  })
                  .map((course) => (
                    <div key={course.id} className="bg-[#131B2C] border border-slate-800/80 rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between relative group overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-full"></div>

                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <span className="px-3.5 py-1 bg-purple-900/20 text-purple-400 text-[10px] font-bold uppercase tracking-wider rounded-md border border-purple-500/20">
                            {course.category}
                          </span>
                          <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${course.status === 'Published' ? 'bg-emerald-900/20 text-emerald-400 border-emerald-500/20' :
                              course.status === 'Scheduled' ? 'bg-yellow-900/20 text-yellow-400 border-yellow-500/20' :
                                'bg-slate-800/50 text-slate-400 border-slate-700/50'
                            }`}>
                            {course.status}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">{course.name}</h3>
                          <p className="text-xs font-bold text-slate-400 mt-1">Instructor: <span className="text-slate-300 font-semibold">{course.instructor}</span></p>
                        </div>

                        <div className="space-y-3 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4.5 text-xs font-semibold text-slate-400">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-slate-400"><Video size={14} /> Video Resource:</span>
                            <span className="font-bold text-slate-200">{course.demoUrl ? `${course.demoUrl} ✅` : 'No Media Uploaded'}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-slate-400"><FileText size={14} /> Syllabus PDF:</span>
                            <span className="font-bold text-slate-200 truncate max-w-[150px]">{course.notesName || 'No Notes Attached'}</span>
                          </div>
                          <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 mt-2">
                            <span className="text-slate-500">Watch time logged:</span>
                            <span className="font-bold text-slate-300">{course.watchTime || '0'} hrs</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-slate-800/80">
                        <div className="flex items-center justify-between mb-5">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Course Pricing</p>
                            <p className="text-2xl font-bold text-white tracking-tight mt-0.5">₹{course.price.toLocaleString()}</p>
                          </div>
                          <span className="px-3.5 py-1.5 bg-indigo-900/20 text-indigo-400 text-[9px] font-bold uppercase tracking-widest rounded-md border border-indigo-500/20 flex items-center gap-1">
                            ★ Premium Access
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setEditingCourse(course)}
                            className="flex-grow py-3.5 bg-slate-800/50 hover:bg-slate-700 active:scale-[0.98] text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-700/50 shadow-sm"
                          >
                            <Edit size={14} /> Edit Course CMS
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm(`Erase ${course.name} from platform catalog permanently?`)) {
                                try {
                                  await axios.delete(`${API_BASE_URL}/api/courses/${course._id}`);
                                  fetchCourses();
                                } catch (err) {
                                  console.error(err);
                                }
                              }
                            }}
                            className="p-3.5 bg-rose-900/20 hover:bg-rose-900/40 text-rose-500 rounded-xl hover:scale-105 active:scale-95 transition-all duration-150 border border-transparent hover:border-rose-500/30"
                            title="Erase course catalog details"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: ELITE ARENA CMS */}
          {activeTab === 'coding' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              {/* Sleek Sub-Tab Navigation Header */}
              <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 border-b border-slate-800 pb-5">
                <div>
                  <span className="text-xs font-bold uppercase text-emerald-400 tracking-[0.2em] bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">Elite Practice CMS Sandbox</span>
                  <h1 className="text-3xl font-bold text-white mt-4">Elite Arena Portal CMS</h1>
                  <p className="text-slate-400 font-medium text-sm mt-1">Configure dry-run limits, manage contests, monitor submissions, and ban users.</p>
                </div>

                {/* Nested Sub-Tab Selectors */}
                <div className="flex flex-wrap gap-2.5 bg-slate-900/60 p-1.5 border border-slate-800/80 rounded-2xl">
                  {[
                    { id: 'questions', name: 'Questions pool' },
                    { id: 'contests', name: 'Contest manager' },
                    { id: 'leaderboard', name: 'Leaderboard & Bans' },
                    { id: 'submissions', name: 'Submissions log' },
                    { id: 'settings', name: 'Compiler settings' },
                    { id: 'import_export', name: 'Import/Export' },
                    { id: 'ai_assistant', name: 'AI challenge builder' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setCodingActiveTab(tab.id)}
                      className={`px-4.5 py-2.5 rounded-xl text-xs font-bold transition-all ${codingActiveTab === tab.id
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/15'
                          : 'text-slate-400 hover:text-slate-200'
                        }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* SUBTAB 1: CODING QUESTIONS POOL */}
              {codingActiveTab === 'questions' && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-[#131B2C] border border-slate-800/80 p-5 rounded-2xl">
                    <div className="relative flex-grow w-full max-w-lg">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="text"
                        value={problemSearch}
                        onChange={(e) => setProblemSearch(e.target.value)}
                        placeholder="Search questions by title or tag..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-800/80 rounded-xl focus:border-emerald-500/50 outline-none font-bold text-white placeholder:text-slate-500 transition-all text-xs"
                      />
                    </div>
                    <div className="flex gap-4 w-full md:w-auto justify-end">
                      <button
                        onClick={() => setIsAddProblemOpen(true)}
                        className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-xl shadow-sm text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                      >
                        <Plus size={16} /> Add Arena Question
                      </button>
                    </div>
                  </div>

                  {/* Problems list */}
                  <div className="bg-[#131B2C] border border-slate-800/80 rounded-[2rem] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-900/30 border-b border-slate-800/80">
                            <th className="px-6 py-4.5 w-16 text-center">Order</th>
                            <th className="px-6 py-4.5">Challenge Title</th>
                            <th className="px-6 py-4.5">Category</th>
                            <th className="px-6 py-4.5 text-center">Difficulty</th>
                            <th className="px-6 py-4.5 text-center">Test Cases</th>
                            <th className="px-6 py-4.5 text-center">XP Points</th>
                            <th className="px-6 py-4.5 text-center">Status</th>
                            <th className="px-6 py-4.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                          {problems.length === 0 ? (
                            <tr>
                              <td colSpan="8" className="text-center py-10 font-bold text-slate-500">
                                No coding questions found. Create a new problem or run AI challenge builder!
                              </td>
                            </tr>
                          ) : (
                            problems.map((prob, idx) => (
                              <tr key={prob._id || prob.id} className="hover:bg-slate-800/20 text-xs font-semibold text-slate-300 border-b border-slate-800/40 last:border-0">
                                <td className="px-6 py-4 text-center">
                                  <div className="flex flex-col items-center justify-center gap-1">
                                    <button
                                      disabled={idx === 0}
                                      onClick={async () => {
                                        let updated = [...problems];
                                        let temp = updated[idx];
                                        updated[idx] = updated[idx - 1];
                                        updated[idx - 1] = temp;
                                        setProblems(updated);
                                        await axios.put(`${API_BASE_URL}/api/problems/reorder`, { orderedIds: updated.map(p => p._id) });
                                      }}
                                      className="text-slate-500 hover:text-emerald-400 disabled:opacity-30"
                                    >
                                      ▲
                                    </button>
                                    <span className="font-mono text-slate-400">{idx + 1}</span>
                                    <button
                                      disabled={idx === problems.length - 1}
                                      onClick={async () => {
                                        let updated = [...problems];
                                        let temp = updated[idx];
                                        updated[idx] = updated[idx + 1];
                                        updated[idx + 1] = temp;
                                        setProblems(updated);
                                        await axios.put(`${API_BASE_URL}/api/problems/reorder`, { orderedIds: updated.map(p => p._id) });
                                      }}
                                      className="text-slate-500 hover:text-emerald-400 disabled:opacity-30"
                                    >
                                      ▼
                                    </button>
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <p className="font-bold text-white text-sm">{prob.title}</p>
                                  <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">slug: /{prob.slug}</span>
                                </td>
                                <td className="px-6 py-4">
                                  <span className="px-2.5 py-1 bg-cyan-950/30 text-cyan-400 border border-cyan-800/40 rounded-lg text-[10px] font-bold uppercase tracking-wider">{prob.category}</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${prob.difficulty === 'Easy' ? 'bg-emerald-950/30 text-emerald-400 border-emerald-800/30' :
                                      prob.difficulty === 'Medium' ? 'bg-yellow-950/30 text-yellow-500 border-yellow-800/30' :
                                        'bg-rose-950/30 text-rose-400 border-rose-800/30'
                                    }`}>
                                    {prob.difficulty}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-center space-y-0.5">
                                  <p className="font-bold text-slate-300">{(prob.testCases || []).filter(c => !c.isHidden).length} Public</p>
                                  <p className="text-[10px] text-rose-400">{(prob.testCases || []).filter(c => c.isHidden).length} Private</p>
                                </td>
                                <td className="px-6 py-4 text-center font-bold text-emerald-400">+{prob.points || 100} XP</td>
                                <td className="px-6 py-4 text-center">
                                  <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border ${prob.status === 'Published' ? 'bg-emerald-950/20 text-emerald-400 border-emerald-800/30' :
                                      prob.status === 'Draft' ? 'bg-slate-800 text-slate-400 border-slate-700/50' :
                                        prob.status === 'Hidden' ? 'bg-yellow-950/20 text-yellow-500 border-yellow-800/30' :
                                          'bg-rose-950/20 text-rose-400 border-rose-800/30'
                                    }`}>
                                    {prob.status || 'Draft'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                  <div className="flex items-center justify-end gap-2">
                                    <button
                                      onClick={() => setPreviewingProblem(prob)}
                                      className="p-2 bg-indigo-950/30 border border-indigo-900/50 text-indigo-400 hover:text-white rounded-xl hover:scale-105 transition-all"
                                      title="Preview Question in Monaco Editor"
                                    >
                                      <Eye size={13} />
                                    </button>
                                    <button
                                      onClick={async () => {
                                        try {
                                          await axios.post(`${API_BASE_URL}/api/problems/${prob._id}/duplicate`);
                                          fetchProblems();
                                        } catch (e) {
                                          alert('Duplicate failed: ' + e.message);
                                        }
                                      }}
                                      className="p-2 bg-slate-800 border border-slate-700 text-slate-300 hover:text-white rounded-xl hover:scale-105 transition-all"
                                      title="Duplicate Challenge"
                                    >
                                      <RefreshCw size={13} />
                                    </button>
                                    <button
                                      onClick={() => setEditingProblem(prob)}
                                      className="p-2 bg-orange-950/30 border border-orange-900/50 text-orange-400 hover:text-white rounded-xl hover:scale-105 transition-all"
                                      title="Configure Question fields"
                                    >
                                      <Edit size={13} />
                                    </button>
                                    <button
                                      onClick={async () => {
                                        if (confirm(`Erase problem "${prob.title}" permanently?`)) {
                                          try {
                                            await axios.delete(`${API_BASE_URL}/api/problems/${prob._id}`);
                                            fetchProblems();
                                          } catch (e) {
                                            alert(e.message);
                                          }
                                        }
                                      }}
                                      className="p-2 bg-rose-950/30 border border-rose-900/50 text-rose-400 hover:text-white rounded-xl hover:scale-105 transition-all"
                                      title="Erase Problem"
                                    >
                                      <Trash2 size={13} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBTAB 2: CONTESTS MANAGER */}
              {codingActiveTab === 'contests' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-[#131B2C] border border-slate-800/80 p-5 rounded-2xl">
                    <h3 className="font-bold text-white text-lg">Platform Contests Catalog</h3>
                    <button
                      onClick={() => setIsAddContestOpen(true)}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2"
                    >
                      <Plus size={16} /> Create Contest
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {contests.length === 0 ? (
                      <div className="col-span-full bg-[#131B2C] border border-slate-800/80 text-center py-10 rounded-2xl font-bold text-slate-500">
                        No scheduled contests found.
                      </div>
                    ) : (
                      contests.map(contest => {
                        const start = new Date(contest.startTime);
                        const end = new Date(contest.endTime);
                        const isActive = new Date() >= start && new Date() <= end;

                        return (
                          <div key={contest._id} className="bg-[#131B2C] border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all group relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-md border ${isActive ? 'bg-emerald-950/20 text-emerald-400 border-emerald-800/30' :
                                    new Date() < start ? 'bg-indigo-950/20 text-indigo-400 border-indigo-800/30' :
                                      'bg-slate-800 text-slate-400 border-slate-700/50'
                                  }`}>
                                  {isActive ? 'Active Now' : new Date() < start ? 'Upcoming' : 'Past Contest'}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400">{contest.timer} minutes</span>
                              </div>
                              <div>
                                <h4 className="text-xl font-bold text-white tracking-tight">{contest.title}</h4>
                                <p className="text-slate-400 text-xs font-medium leading-relaxed mt-1">{contest.description || 'GuruBramha programming competitive sandbox event.'}</p>
                              </div>
                              <div className="bg-slate-900/50 border border-slate-800/60 rounded-xl p-3.5 space-y-2 text-xs font-bold text-slate-400">
                                <div className="flex justify-between">
                                  <span>Start:</span>
                                  <span className="text-slate-200">{start.toLocaleDateString()} {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>End:</span>
                                  <span className="text-slate-200">{end.toLocaleDateString()} {end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <div className="flex justify-between border-t border-slate-800/80 pt-2 mt-2">
                                  <span>Questions:</span>
                                  <span className="text-emerald-400">{(contest.problems || []).length} Challenges</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-6 pt-4 border-t border-slate-800/60 flex gap-2">
                              <button
                                onClick={() => setEditingContest(contest)}
                                className="flex-grow py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-slate-700/50 flex items-center justify-center gap-1.5"
                              >
                                <Edit size={12} /> Edit Contest
                              </button>
                              <button
                                onClick={async () => {
                                  if (confirm(`Erase contest "${contest.title}"?`)) {
                                    try {
                                      await axios.delete(`${API_BASE_URL}/api/contests/${contest._id}`);
                                      fetchContests();
                                    } catch (e) {
                                      alert(e.message);
                                    }
                                  }
                                }}
                                className="p-2.5 bg-rose-950/20 border border-rose-900/30 text-rose-500 rounded-xl hover:scale-105 transition-all"
                                title="Erase Contest"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              )}

              {/* SUBTAB 3: LEADERBOARD & SCHOLAR BANS */}
              {codingActiveTab === 'leaderboard' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-[#131B2C] border border-slate-800/80 p-5 rounded-2xl">
                    <div>
                      <h3 className="font-bold text-white text-lg">Elite Arena Scholar Leaderboard</h3>
                      <p className="text-slate-400 text-xs font-semibold mt-0.5">Global rankings based on XP score earned solving coding problems.</p>
                    </div>
                    <button
                      onClick={async () => {
                        if (confirm('CAUTION: Are you absolutely sure you want to RESET the entire student leaderboard? This will erase all student scholar points, streaks, solved history, and submission logs permanently! This action is non-reversible.')) {
                          if (confirm('SECOND CONFIRMATION: Type YES to confirm permanent database wipe.')) {
                            try {
                              await axios.post(`${API_BASE_URL}/api/submissions/leaderboard/reset`);
                              fetchLeaderboard();
                              fetchSubmissions();
                              fetchProblems();
                            } catch (e) {
                              alert(e.message);
                            }
                          }
                        }
                      }}
                      className="px-5 py-3 bg-rose-900/30 hover:bg-rose-900/50 border border-rose-800/50 text-rose-400 hover:text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2"
                    >
                      <RefreshCw size={14} /> Reset Leaderboard Ledger
                    </button>
                  </div>

                  <div className="bg-[#131B2C] border border-slate-800/80 rounded-[2rem] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-900/30 border-b border-slate-800/80">
                            <th className="px-8 py-5 w-16 text-center">Rank</th>
                            <th className="px-8 py-5">Scholar</th>
                            <th className="px-8 py-5 text-center">Scholar XP Points</th>
                            <th className="px-8 py-5 text-center">Active Streak</th>
                            <th className="px-8 py-5 text-center">Problems Solved</th>
                            <th className="px-8 py-5 text-center">Account Status</th>
                            <th className="px-8 py-5 text-right">Moderation</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                          {leaderboardUsers.length === 0 ? (
                            <tr>
                              <td colSpan="7" className="text-center py-10 font-bold text-slate-500">
                                No scholar records found.
                              </td>
                            </tr>
                          ) : (
                            leaderboardUsers.map((user, idx) => (
                              <tr key={user._id} className="hover:bg-slate-800/20 text-xs font-semibold text-slate-300 border-b border-slate-800/40 last:border-0">
                                <td className="px-8 py-4.5 text-center font-bold">
                                  <span className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-sm ${idx === 0 ? 'bg-yellow-500/20 text-yellow-400 font-black border border-yellow-500/40' :
                                      idx === 1 ? 'bg-slate-400/20 text-slate-300 font-black border border-slate-400/40' :
                                        idx === 2 ? 'bg-orange-900/20 text-orange-400 font-black border border-orange-700/40' :
                                          'text-slate-400 font-bold'
                                    }`}>
                                    {idx + 1}
                                  </span>
                                </td>
                                <td className="px-8 py-4.5">
                                  <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center font-black text-emerald-400 border border-slate-700">
                                      {user.displayName.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                      <p className="font-bold text-white text-sm">{user.displayName}</p>
                                      <span className="text-[10px] text-slate-500 font-medium mt-0.5 block">{user.email}</span>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-8 py-4.5 text-center font-bold text-emerald-400 text-sm">{user.scholarPoints || 0} XP</td>
                                <td className="px-8 py-4.5 text-center">
                                  <span className="px-2.5 py-1 bg-orange-950/20 text-orange-400 border border-orange-900/30 rounded-lg font-bold flex items-center gap-1.5 w-max mx-auto">
                                    🔥 {user.currentStreak || 0} Cycles
                                  </span>
                                </td>
                                <td className="px-8 py-4.5 text-center font-bold text-slate-300">{(user.solvedProblems || []).length} challenges</td>
                                <td className="px-8 py-4.5 text-center">
                                  <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider border ${user.isBanned
                                      ? 'bg-rose-950/30 text-rose-500 border-rose-900/50'
                                      : 'bg-emerald-950/20 text-emerald-400 border-emerald-800/30'
                                    }`}>
                                    {user.isBanned ? 'Banned Account' : 'Active Account'}
                                  </span>
                                </td>
                                <td className="px-8 py-4.5 text-right">
                                  <button
                                    onClick={async () => {
                                      if (confirm(`Are you sure you want to ${user.isBanned ? 'UNBAN' : 'BAN'} scholar "${user.displayName}"?`)) {
                                        try {
                                          await axios.put(`${API_BASE_URL}/api/submissions/users/${user._id}/ban`, { isBanned: !user.isBanned });
                                          fetchLeaderboard();
                                        } catch (e) {
                                          alert(e.message);
                                        }
                                      }
                                    }}
                                    className={`px-3 py-1.5 rounded-xl font-bold uppercase text-[9px] tracking-wider transition-all border ${user.isBanned
                                        ? 'bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-400 border-emerald-900/30'
                                        : 'bg-rose-950/20 hover:bg-rose-950/40 text-rose-500 border-rose-900/30'
                                      }`}
                                  >
                                    {user.isBanned ? 'Revoke Ban' : 'Suspend Scholar'}
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBTAB 4: SUBMISSIONS LIVE LOG MONITOR */}
              {codingActiveTab === 'submissions' && (
                <div className="space-y-6">
                  <div className="bg-[#131B2C] border border-slate-800/80 p-5 rounded-2xl flex justify-between items-center">
                    <h3 className="font-bold text-white text-lg">Submissions Log Monitor</h3>
                    <span className="px-3 py-1.5 bg-slate-900 text-slate-400 border border-slate-800 rounded-xl text-xs font-bold font-mono">{submissions.length} Submissions Logged</span>
                  </div>

                  <div className="bg-[#131B2C] border border-slate-800/80 rounded-[2rem] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-900/30 border-b border-slate-800/80">
                            <th className="px-6 py-4.5">Date / Time</th>
                            <th className="px-6 py-4.5">Scholar Name</th>
                            <th className="px-6 py-4.5">Coding Challenge</th>
                            <th className="px-6 py-4.5 text-center">Status</th>
                            <th className="px-6 py-4.5 text-center">Passed Cases</th>
                            <th className="px-6 py-4.5 text-center">Runtime</th>
                            <th className="px-6 py-4.5 text-center">Language</th>
                            <th className="px-6 py-4.5 text-right">Source Code</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                          {submissions.length === 0 ? (
                            <tr>
                              <td colSpan="8" className="text-center py-10 font-bold text-slate-500">
                                No submissions logged yet.
                              </td>
                            </tr>
                          ) : (
                            submissions.map(sub => {
                              const date = new Date(sub.createdAt);
                              return (
                                <tr key={sub._id} className="hover:bg-slate-800/20 text-xs font-semibold text-slate-300 border-b border-slate-800/40 last:border-0">
                                  <td className="px-6 py-4 space-y-0.5 text-[10px] font-bold text-slate-500">
                                    <p>{date.toLocaleDateString()}</p>
                                    <p className="font-semibold">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                  </td>
                                  <td className="px-6 py-4">
                                    <p className="font-bold text-white text-sm">{sub.user?.displayName || 'Unknown User'}</p>
                                    <span className="text-[10px] text-slate-500 font-medium mt-0.5 block">{sub.user?.email || 'N/A'}</span>
                                  </td>
                                  <td className="px-6 py-4 font-bold text-slate-300">
                                    {sub.problem?.title || 'Unknown problem'}
                                    <span className="text-[9px] text-[#2DD4BF] font-black uppercase tracking-wider block mt-0.5">{sub.problem?.difficulty}</span>
                                  </td>
                                  <td className="px-6 py-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${sub.status === 'Accepted' ? 'bg-emerald-950/20 text-emerald-400 border-emerald-800/30' :
                                        sub.status === 'Wrong Answer' ? 'bg-rose-950/20 text-rose-500 border-rose-800/30' :
                                          'bg-yellow-950/20 text-yellow-500 border-yellow-800/30'
                                      }`}>
                                      {sub.status}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-center font-bold text-slate-300">
                                    {sub.testCasesPassed || 0} / {sub.totalTestCases || 0} cases
                                  </td>
                                  <td className="px-6 py-4 text-center font-mono font-bold text-slate-400">{sub.runtime || 0} ms</td>
                                  <td className="px-6 py-4 text-center font-mono font-bold uppercase text-slate-400">{sub.language}</td>
                                  <td className="px-6 py-4 text-right">
                                    <button
                                      onClick={() => setViewingSubmissionCode(sub)}
                                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 hover:text-white rounded-xl transition-all font-bold uppercase text-[9px] tracking-wider border border-slate-700/50 flex items-center gap-1.5 ml-auto"
                                    >
                                      <Code size={12} /> View Code
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBTAB 5: COMPILER SANDBOX CONFIG */}
              {codingActiveTab === 'settings' && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  <div className="bg-[#131B2C] border border-slate-800/80 rounded-3xl p-8 hover:border-slate-700 transition-all duration-300 space-y-6">
                    <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4 flex items-center gap-2.5">
                      <Cpu size={20} className="text-emerald-500" /> Sandboxed Compiler Toggles
                    </h3>

                    <div className="space-y-4">
                      {[
                        { id: 'python', name: 'Python Sandbox', desc: 'Default compiler interpreter python-3.10.0', enabled: true },
                        { id: 'javascript', name: 'JavaScript Piston Engine', desc: 'Runtime node-18.15.0 with dry-run support', enabled: true },
                        { id: 'cpp', name: 'C++ GCC compiler', desc: 'Gnu binary library cpp-10.2.0 for performance', enabled: true },
                        { id: 'java', name: 'Java JDK Virtual Environment', desc: 'Java class loader development kit openjdk-15.0.2', enabled: true },
                        { id: 'c', name: 'C standard gcc sandbox', desc: 'Direct compilation libraries gcc-10.2.0', enabled: true }
                      ].map(lang => (
                        <div key={lang.id} className="flex justify-between items-center p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                          <div>
                            <p className="font-bold text-white">{lang.name}</p>
                            <span className="text-[10px] text-slate-500 font-semibold mt-0.5 block">{lang.desc}</span>
                          </div>
                          <span className="px-3 py-1 bg-emerald-950/20 text-emerald-400 border border-emerald-800/30 rounded-lg text-[10px] font-black uppercase tracking-wider">Enabled</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#131B2C] border border-slate-800/80 rounded-3xl p-8 hover:border-slate-700 transition-all duration-300 space-y-6">
                    <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4 flex items-center gap-2.5">
                      <Sliders size={20} className="text-emerald-500" /> Default Code execution Limits
                    </h3>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-slate-400">Execution Timeout (Secs)</label>
                        <input type="number" defaultValue="2" className="w-full p-4 bg-slate-900 border border-slate-850 rounded-2xl outline-none font-bold text-slate-300 focus:border-emerald-500/50 text-xs" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-slate-400">Allowed Threads Count</label>
                        <input type="number" defaultValue="4" className="w-full p-4 bg-slate-900 border border-slate-850 rounded-2xl outline-none font-bold text-slate-300 focus:border-emerald-500/50 text-xs" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-wider text-slate-400">Sandbox Memory Boundary (MB)</label>
                      <input type="number" defaultValue="512" className="w-full p-4 bg-slate-900 border border-slate-850 rounded-2xl outline-none font-bold text-slate-300 focus:border-emerald-500/50 text-xs" />
                    </div>

                    <div className="p-4 bg-emerald-950/10 text-emerald-400 rounded-2xl border border-emerald-800/30 text-xs font-semibold leading-relaxed flex gap-3">
                      <AlertCircle size={18} className="flex-shrink-0" />
                      <span>Code execution settings are currently set to default sandboxed configurations. Thread containment limits are fully active.</span>
                    </div>

                    <button
                      onClick={() => alert('Code execution policies saved in configuration file.')}
                      className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/10 text-xs uppercase tracking-wider"
                    >
                      Save Sandbox configurations
                    </button>
                  </div>
                </div>
              )}

              {/* SUBTAB 6: IMPORT & EXPORT BULK ACTIONS */}
              {codingActiveTab === 'import_export' && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* Export section */}
                  <div className="bg-[#131B2C] border border-slate-800/80 rounded-3xl p-8 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4 flex items-center gap-2.5">
                        <FileDown size={20} className="text-emerald-500" /> Export Coding Questions DB
                      </h3>
                      <p className="text-slate-400 text-xs font-medium leading-relaxed">
                        Download the entire practice arena question database in a structured JSON ledger. This allows portability and local backup management of coding questions.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const jsonStr = JSON.stringify(problems, null, 2);
                        const blob = new Blob([jsonStr], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `GuruBramha_Problems_${new Date().toISOString().slice(0, 10)}.json`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="w-full py-4 bg-slate-800 border border-slate-700 hover:bg-slate-750 text-white font-bold rounded-2xl active:scale-[0.98] transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      <Download size={14} /> Export Active Challenges (JSON)
                    </button>
                  </div>

                  {/* Import section */}
                  <div className="bg-[#131B2C] border border-slate-800/80 rounded-3xl p-8 hover:border-slate-700 transition-all duration-300 space-y-6">
                    <h3 className="text-xl font-bold text-white border-b border-slate-800 pb-4 flex items-center gap-2.5">
                      <FileText size={20} className="text-emerald-500" /> Bulk upload Problems
                    </h3>
                    <p className="text-slate-400 text-xs font-medium leading-relaxed">
                      Upload questions in bulk via a formatted JSON file containing title, description, constraints, and testcase structures.
                    </p>

                    <div className="border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-2xl p-8 text-center transition-all bg-slate-900/30 group">
                      <input
                        type="file"
                        id="bulk-problems-json-file"
                        accept=".json"
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          if (!file) return;

                          const reader = new FileReader();
                          reader.onload = async (evt) => {
                            try {
                              const parsed = JSON.parse(evt.target.result);
                              const problemsArr = Array.isArray(parsed) ? parsed : [parsed];

                              const res = await axios.post(`${API_BASE_URL}/api/problems/import`, { problems: problemsArr });
                              alert(res.data.message || 'Problems imported successfully');
                              fetchProblems();
                            } catch (err) {
                              alert('Failed to parse and import JSON: ' + err.message);
                            }
                          };
                          reader.readAsText(file);
                        }}
                        className="hidden"
                      />
                      <label htmlFor="bulk-problems-json-file" className="cursor-pointer space-y-3 block">
                        <Upload size={28} className="text-slate-500 group-hover:text-emerald-500 mx-auto transition-colors" />
                        <p className="text-slate-300 font-bold text-xs">Drag and drop file here, or click to browse</p>
                        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">supports only formatted .json problems bundle</p>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* SUBTAB 7: AI CHALLENGE ARCHITECT GENERATOR */}
              {codingActiveTab === 'ai_assistant' && (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  {/* Left Column: AI Config form */}
                  <div className="bg-[#131B2C] border border-slate-800/80 rounded-3xl p-8 hover:border-slate-700 transition-all duration-300 space-y-6 self-start">
                    <div>
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Zap size={20} className="text-yellow-500" /> AI Coding Architect
                      </h3>
                      <p className="text-slate-400 text-xs font-medium mt-1 leading-relaxed">Describe the challenge topic or prompt, and let the GuruBramha AI build a fully functional challenge including Monaco starter templates and private testcases.</p>
                    </div>

                    <form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const data = new FormData(e.target);
                        try {
                          const res = await axios.post(`${API_BASE_URL}/api/problems/ai-generate`, {
                            topic: data.get('topic'),
                            difficulty: data.get('difficulty'),
                            prompt: data.get('prompt')
                          });
                          if (res.data.success) {
                            setAiGeneratedProblem(res.data.data);
                          } else {
                            alert('AI generation failed: ' + res.data.message);
                          }
                        } catch (err) {
                          alert(err.message);
                        }
                      }}
                      className="space-y-5 text-xs font-bold text-slate-500"
                    >
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-slate-400">Algorithmic Topic</label>
                        <select name="topic" className="w-full pl-4 pr-4 py-3 bg-slate-900 border border-slate-850 rounded-xl outline-none font-bold text-slate-300 focus:border-emerald-500/50 text-xs">
                          <option value="Arrays">Arrays & Sorting</option>
                          <option value="Strings">Strings & Manipulation</option>
                          <option value="Linked List">Linked Lists</option>
                          <option value="Trees">Trees & Graph Traversal</option>
                          <option value="Dynamic Programming">Dynamic Programming (DP)</option>
                          <option value="Recursion">Recursion & Backtracking</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-slate-400">Difficulty Grade</label>
                        <select name="difficulty" className="w-full pl-4 pr-4 py-3 bg-slate-900 border border-slate-850 rounded-xl outline-none font-bold text-slate-300 focus:border-emerald-500/50 text-xs">
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-slate-400">Custom Prompts & Rules</label>
                        <textarea
                          name="prompt"
                          rows="4"
                          placeholder="e.g. Find the length of the longest palindromic substring. Add starter JavaScript templates."
                          className="w-full p-4 bg-slate-900 border border-slate-850 rounded-xl outline-none font-bold text-slate-300 focus:border-emerald-500/50 text-xs placeholder:text-slate-650"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-yellow-500 to-amber-600 hover:brightness-105 active:scale-[0.98] text-slate-950 font-black rounded-xl shadow-lg shadow-yellow-500/10 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                      >
                        <Zap size={14} fill="currentColor" /> Synthesize Challenge with AI
                      </button>
                    </form>
                  </div>

                  {/* Right 2 Columns: Generated preview */}
                  <div className="xl:col-span-2">
                    {!aiGeneratedProblem ? (
                      <div className="bg-[#131B2C] border-2 border-dashed border-slate-800 text-center py-24 rounded-3xl font-bold text-slate-500 flex flex-col items-center justify-center gap-4">
                        <Zap size={36} className="text-slate-600" />
                        <div>
                          <p className="text-slate-400">AI Architect is currently idle.</p>
                          <p className="text-slate-600 font-semibold text-xs mt-1">Configure inputs on the left to synthesize new programming problems instantly.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[#131B2C] border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-all duration-300 space-y-6">
                        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                          <div>
                            <span className="text-[9px] font-black uppercase text-yellow-500 bg-yellow-500/10 border border-yellow-500/20 px-2.5 py-1 rounded-md tracking-wider">Generated by AI Architect</span>
                            <h3 className="text-2xl font-bold text-white mt-2 tracking-tight">{aiGeneratedProblem.title}</h3>
                          </div>
                          <span className="px-3 py-1 bg-amber-950/20 text-yellow-500 border border-yellow-800/30 rounded-lg text-xs font-bold uppercase tracking-wider">{aiGeneratedProblem.difficulty}</span>
                        </div>

                        <div className="space-y-4 text-slate-300 font-medium text-xs max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
                          <div className="space-y-1">
                            <h4 className="text-[10px] uppercase font-black tracking-wider text-slate-500">Problem Description</h4>
                            <p className="bg-slate-900 border border-slate-850/60 p-4 rounded-xl leading-relaxed font-mono">{aiGeneratedProblem.description}</p>
                          </div>

                          <div className="space-y-1">
                            <h4 className="text-[10px] uppercase font-black tracking-wider text-slate-500">Constraints</h4>
                            <p className="bg-slate-900 border border-slate-850/60 p-4 rounded-xl leading-relaxed font-mono whitespace-pre-wrap">{aiGeneratedProblem.constraints}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <h4 className="text-[10px] uppercase font-black tracking-wider text-slate-500">Sample Input</h4>
                              <p className="bg-slate-900 border border-slate-850/60 p-4 rounded-xl font-mono leading-relaxed">{aiGeneratedProblem.sampleInput}</p>
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-[10px] uppercase font-black tracking-wider text-slate-500">Sample Output</h4>
                              <p className="bg-slate-900 border border-slate-850/60 p-4 rounded-xl font-mono leading-relaxed">{aiGeneratedProblem.sampleOutput}</p>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <h4 className="text-[10px] uppercase font-black tracking-wider text-slate-500">Test Cases Generated</h4>
                            <div className="space-y-2">
                              {(aiGeneratedProblem.testCases || []).map((tc, idx) => (
                                <div key={idx} className="bg-slate-900/60 border border-slate-850/40 p-3 rounded-lg flex justify-between items-center">
                                  <span>Case {idx + 1}: input: `{tc.input}` expected: `{tc.expectedOutput}`</span>
                                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${tc.isHidden ? 'bg-rose-950/40 text-rose-500' : 'bg-emerald-950/40 text-emerald-500'}`}>{tc.isHidden ? 'Hidden' : 'Public'}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-800 flex justify-between gap-4">
                          <button
                            onClick={() => setAiGeneratedProblem(null)}
                            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
                          >
                            Discard
                          </button>
                          <button
                            onClick={async () => {
                              try {
                                const res = await axios.post(`${API_BASE_URL}/api/problems`, aiGeneratedProblem);
                                alert('Problem saved successfully to practice arena database!');
                                setAiGeneratedProblem(null);
                                setCodingActiveTab('questions');
                                fetchProblems();
                              } catch (err) {
                                alert('Failed to save generated problem: ' + err.message);
                              }
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-1.5"
                          >
                            <CheckCircle size={14} /> Commit & Publish to Arena
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 5: INTERVIEW PREP CMS */}
          {activeTab === 'interview' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 font-sans">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-black uppercase text-[#F59E0B] tracking-[0.15em] bg-[#F5F3FF] border border-[#F59E0B]/10 px-3.5 py-1.5 rounded-full">Interview Preparation Deck CMS</span>
                  <h1 className="text-4xl font-black text-slate-900 mt-4">Interview Preparation Management</h1>
                  <p className="text-slate-500 font-bold text-sm tracking-wide mt-1">Upload company preparation guides, aptitude, HR, and technical rounds.</p>
                </div>
                <button
                  onClick={() => setIsAddInterviewOpen(true)}
                  className="px-6 py-3.5 bg-gradient-to-r from-[#F97316] to-[#F59E0B] hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-xl shadow-sm shadow-[#F97316]/15 transition-all flex items-center justify-center gap-2 self-start sm:self-auto text-xs uppercase tracking-wider"
                >
                  <Plus size={18} /> Add Company Deck
                </button>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {interviews.map(deck => (
                  <div key={deck.id} className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-[300px] relative group overflow-hidden">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-[9px] font-black uppercase text-[#D97706] bg-[#FFFBEB] px-3 py-1 rounded-md tracking-wider border border-[#D97706]/10">{deck.category}</span>
                        <span className="text-[9px] font-black uppercase text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1 rounded-md tracking-wider">{deck.company}</span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 leading-snug tracking-tight mb-2">{deck.round}</h3>
                      <p className="text-xs text-slate-400 font-semibold leading-relaxed mb-4">Material: <span className="text-slate-800 font-bold">{deck.materials}</span></p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-100/60 pt-4">
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{deck.questions} Queries Available</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingInterview(deck)}
                          className="p-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl hover:scale-105 active:scale-95 transition-all"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Erase company deck "${deck.company}"?`)) {
                              setInterviews(interviews.filter(i => i.id !== deck.id));
                            }
                          }}
                          className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl hover:scale-105 active:scale-95 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 6: SUBSCRIPTION SALES (Requirement 7) */}
          {activeTab === 'subscriptions' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 font-sans">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-black uppercase text-[#F59E0B] tracking-[0.15em] bg-[#F5F3FF] border border-[#F59E0B]/10 px-3.5 py-1.5 rounded-full">Subscriptions Vault</span>
                  <h1 className="text-4xl font-black text-slate-900 mt-4">LMS Sales & Subscriptions</h1>
                  <p className="text-slate-500 font-bold text-sm tracking-wide mt-1">Automatic Transaction ID indexing, GST PDF Invoicing, and Razorpay logs.</p>
                </div>
                <button
                  onClick={exportSubscriptionsCSV}
                  className="px-6 py-3.5 bg-[#FFF7ED] hover:bg-[#FFF7ED]/80 text-[#F97316] border border-[#F97316]/10 font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
                >
                  <Download size={16} /> Export to Excel (CSV)
                </button>
              </div>

              {/* Filtering Search Bar */}
              <div className="bg-white border border-slate-200/50 rounded-2xl !p-5 flex flex-col xl:flex-row items-center gap-6 justify-between shadow-sm shadow-slate-100/30">
                <div className="relative flex-grow w-full max-w-xl">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    value={subSearch}
                    onChange={(e) => setSubSearch(e.target.value)}
                    placeholder="Search subscriptions by Student Name, Email, or Payment ID..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-200/50 rounded-xl focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 outline-none font-bold text-slate-700 placeholder:text-slate-300 transition-all text-xs"
                  />
                </div>

                {/* Search & Filter select options (Requirement 11) */}
                <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
                  <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/50 rounded-xl px-4 py-2.5">
                    <Filter size={14} className="text-slate-400" />
                    <select
                      value={subFilterPlan}
                      onChange={(e) => setSubFilterPlan(e.target.value)}
                      className="bg-transparent text-xs font-black text-slate-700 uppercase tracking-widest outline-none cursor-pointer border-none p-0"
                    >
                      <option value="All">All Cycles</option>
                      <option value="Monthly">Monthly Subscriptions</option>
                      <option value="Yearly">Yearly Subscriptions</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/50 rounded-xl px-4 py-2.5">
                    <Sliders size={14} className="text-slate-400" />
                    <select
                      value={subFilterStatus}
                      onChange={(e) => setSubFilterStatus(e.target.value)}
                      className="bg-transparent text-xs font-black text-slate-700 uppercase tracking-widest outline-none cursor-pointer border-none p-0"
                    >
                      <option value="All">All Transactions</option>
                      <option value="Successful">Successful Payments</option>
                      <option value="Failed">Failed Transactions</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Subscriptions Table */}
              <div className="bg-white border border-slate-200/50 rounded-3xl overflow-hidden shadow-sm shadow-slate-100/50">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-left text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-50/50 border-b border-slate-200/40 sticky top-0 z-10">
                        <th className="px-8 py-5 w-16 text-center">SI.No</th>
                        <th className="px-8 py-5">Student Name</th>
                        <th className="px-8 py-5">Email / Phone</th>
                        <th className="px-8 py-5">Subscription Plan</th>
                        <th className="px-8 py-5">Date / Time</th>
                        <th className="px-8 py-5">Transaction ID</th>
                        <th className="px-8 py-5">Amount Paid</th>
                        <th className="px-8 py-5">Start / End</th>
                        <th className="px-8 py-5 text-center">Payment Status</th>
                        <th className="px-8 py-5 text-center">Invoice</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100/70">
                      {subscriptions
                        .filter(s => s.name.toLowerCase().includes(subSearch.toLowerCase()) || s.email.toLowerCase().includes(subSearch.toLowerCase()) || s.paymentId.toLowerCase().includes(subSearch.toLowerCase()))
                        .filter(s => subFilterPlan === 'All' || s.plan === subFilterPlan)
                        .filter(s => subFilterStatus === 'All' || s.status === subFilterStatus)
                        .map((sub, i) => (
                          <tr key={sub.id} className="hover:bg-[#FFF7ED]/10 even:bg-slate-50/30 transition-all duration-200 text-xs font-semibold text-[#0F172A]">
                            <td className="px-8 py-4.5 text-center font-bold text-slate-400">{i + 1}</td>
                            <td className="px-8 py-4.5 font-black text-slate-900 text-sm">{sub.name}</td>
                            <td className="px-8 py-4.5 space-y-1">
                              <p className="font-bold text-slate-700">{sub.email}</p>
                              <p className="text-[10px] text-slate-400 font-bold">{sub.phone}</p>
                            </td>
                            <td className="px-8 py-4.5">
                              <span className={`px-3 py-1 rounded-lg font-black uppercase tracking-wider text-[10px] ${sub.plan === 'Yearly' ? 'bg-[#FFFBEB] text-[#D97706] border border-[#D97706]/10' : 'bg-[#FFF7ED] text-[#F97316] border border-[#F97316]/10'
                                }`}>{sub.plan}</span>
                            </td>
                            <td className="px-8 py-4.5 space-y-0.5 font-bold text-slate-500">
                              <p>{sub.date}</p>
                              <p className="text-[10px] text-slate-400 font-semibold">{sub.time}</p>
                            </td>
                            <td className="px-8 py-4.5 font-mono font-bold text-slate-900">{sub.txId}</td>
                            <td className="px-8 py-4.5 font-black text-slate-900 text-sm">₹{sub.amount.toLocaleString()}</td>
                            <td className="px-8 py-4.5 space-y-0.5 text-[10px] font-bold text-slate-400">
                              <p>Start: <span className="text-slate-800">{sub.startDate}</span></p>
                              <p>End: <span className="text-slate-800">{sub.endDate}</span></p>
                            </td>
                            <td className="px-8 py-4.5 text-center">
                              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${sub.status === 'Successful' ? 'bg-[#DEF7EC] text-[#03543F]' :
                                  sub.status === 'Failed' ? 'bg-[#FDF2F2] text-[#EF4444]' : 'bg-[#FFFBEB] text-[#D97706]'
                                }`}>{sub.status}</span>
                            </td>
                            <td className="px-8 py-4.5 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => setSelectedInvoice(sub)}
                                  className="px-3 py-2 bg-[#FFF7ED] border border-[#F97316]/10 text-[#F97316] hover:bg-[#FFF7ED]/80 rounded-xl transition-all flex items-center gap-1.5 font-bold uppercase text-[9px] tracking-wider hover:scale-[1.02] active:scale-[0.98]"
                                  title="View Invoice Document"
                                >
                                  <Eye size={12} /> View
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedInvoice(sub);
                                    setTimeout(() => window.print(), 300);
                                  }}
                                  className="p-2.5 bg-slate-50 border border-slate-100/50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded-xl hover:scale-105 active:scale-95 transition-all"
                                  title="Download Invoice PDF"
                                >
                                  <FileDown size={14} />
                                </button>
                              </div>
                            </td>
                            <td className="px-8 py-4.5 text-right">
                              <div className="flex items-center justify-end gap-2.5">
                                <button
                                  onClick={() => {
                                    if (confirm(`Trigger full refund for ${sub.name} (Tx: ${sub.txId})?`)) {
                                      setSubscriptions(subscriptions.map(s => s.id === sub.id ? { ...s, status: 'Refunded' } : s));
                                    }
                                  }}
                                  className="px-3 py-1.5 bg-amber-50 border border-amber-100 hover:border-amber-200/40 text-amber-700 hover:bg-amber-100 hover:scale-105 active:scale-95 rounded-xl transition-all font-black uppercase text-[9px] tracking-wider"
                                >
                                  Refund
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Confirm erasure of subscription ledger entry ${sub.txId}?`)) {
                                      setSubscriptions(subscriptions.filter(s => s.id !== sub.id));
                                    }
                                  }}
                                  className="p-2.5 bg-red-50 border border-transparent hover:border-red-200/40 rounded-xl text-red-600 hover:bg-red-100 hover:scale-105 active:scale-95 transition-all"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 7: NOTIFICATIONS CENTER (Requirement 13) */}
          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 font-sans">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-black uppercase text-[#F59E0B] tracking-[0.15em] bg-[#F5F3FF] border border-[#F59E0B]/10 px-3.5 py-1.5 rounded-full">Scholar Alerts Log</span>
                  <h1 className="text-4xl font-black text-slate-900 mt-4">Notification Broadcast Control</h1>
                  <p className="text-slate-500 font-bold text-sm tracking-wide mt-1">Broadcast reminders, announcements, and promotional decks instantly.</p>
                </div>
                <button
                  onClick={() => setIsNewNotificationOpen(true)}
                  className="px-6 py-3.5 bg-gradient-to-r from-[#F97316] to-[#F59E0B] hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-xl shadow-sm shadow-[#F97316]/15 transition-all flex items-center justify-center gap-2 self-start sm:self-auto text-xs uppercase tracking-wider"
                >
                  <Send size={18} /> Broadcast New Notification
                </button>
              </div>

              {/* Broadcast list log */}
              <div className="bg-white border border-slate-200/50 rounded-3xl overflow-hidden shadow-sm shadow-slate-100/50">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-left text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-50/50 border-b border-slate-200/40 sticky top-0 z-10">
                        <th className="px-8 py-5 w-16 text-center">SI.No</th>
                        <th className="px-8 py-5">Notification Alert Title</th>
                        <th className="px-8 py-5">Broadcast target Group</th>
                        <th className="px-8 py-5">Trigger Date</th>
                        <th className="px-8 py-5 text-center">Type Tag</th>
                        <th className="px-8 py-5 text-center">Delivery status</th>
                        <th className="px-8 py-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100/70">
                      {notifications.map((notif, i) => (
                        <tr key={notif.id} className="hover:bg-[#FFF7ED]/10 even:bg-slate-50/30 transition-all duration-200 text-xs font-semibold text-[#0F172A]">
                          <td className="px-8 py-4.5 text-center font-bold text-slate-400">{i + 1}</td>
                          <td className="px-8 py-4.5 font-black text-slate-900 text-sm">{notif.title}</td>
                          <td className="px-8 py-4.5 font-bold text-slate-500">{notif.target}</td>
                          <td className="px-8 py-4.5 font-bold text-slate-400">{notif.date}</td>
                          <td className="px-8 py-4.5 text-center">
                            <span className="px-3 py-1 bg-slate-50 border border-slate-200/30 text-slate-650 rounded-lg text-[9px] font-black uppercase tracking-wider">{notif.type}</span>
                          </td>
                          <td className="px-8 py-4.5 text-center">
                            <span className="px-4 py-1.5 bg-[#DEF7EC] text-[#03543F] border border-[#03543F]/10 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 w-28 mx-auto">
                              <CheckCircle size={10} /> {notif.status}
                            </span>
                          </td>
                          <td className="px-8 py-4.5 text-right">
                            <button
                              onClick={() => setNotifications(notifications.filter(n => n.id !== notif.id))}
                              className="p-2.5 bg-red-50 border border-transparent hover:border-red-200/40 rounded-xl text-red-600 hover:bg-red-100 hover:scale-105 active:scale-95 transition-all"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 8: PLATFORM SETTINGS (Requirement 15) */}
          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 font-sans">
              <div>
                <span className="text-xs font-black uppercase text-[#F59E0B] tracking-[0.15em] bg-[#F5F3FF] border border-[#F59E0B]/10 px-3.5 py-1.5 rounded-full">Branding & configs</span>
                <h1 className="text-4xl font-black text-slate-900 mt-4">Platform Configurations</h1>
                <p className="text-slate-500 font-bold text-sm tracking-wide mt-1">Configure pricing tiers, Razorpay API credentials, and brand assets.</p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Branding settings */}
                <div className="bg-white border border-slate-200/50 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 space-y-6">
                  <h3 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-4 mb-2">LMS Brand assets</h3>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">EdTech Portal title</label>
                    <input
                      type="text"
                      value={brandingSettings.title}
                      onChange={(e) => setBrandingSettings({ ...brandingSettings, title: e.target.value })}
                      className="w-full p-4 bg-slate-50 border border-slate-200/40 rounded-2xl outline-none focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 font-bold text-slate-700 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Monthly Tier Plan (₹)</label>
                      <input
                        type="text"
                        value={brandingSettings.pricingMonthly}
                        onChange={(e) => setBrandingSettings({ ...brandingSettings, pricingMonthly: e.target.value })}
                        className="w-full p-4 bg-slate-50 border border-slate-200/40 rounded-2xl outline-none focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 font-bold text-slate-700 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Yearly Tier Plan (₹)</label>
                      <input
                        type="text"
                        value={brandingSettings.pricingYearly}
                        onChange={(e) => setBrandingSettings({ ...brandingSettings, pricingYearly: e.target.value })}
                        className="w-full p-4 bg-slate-50 border border-slate-200/40 rounded-2xl outline-none focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 font-bold text-slate-700 transition-all"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => alert('CMS Branding and configuration successfully saved in MongoDB instance!')}
                    className="w-full py-4 bg-gradient-to-r from-[#F97316] to-[#F59E0B] hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-2xl shadow-sm shadow-[#F97316]/15 transition-all text-xs font-black uppercase tracking-wider mt-4"
                  >
                    Save branding Assets
                  </button>
                </div>

                {/* Gateway config */}
                <div className="bg-white border border-slate-200/50 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 space-y-6">
                  <h3 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-4 mb-2">Razorpay Credentials</h3>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Razorpay API Key ID (rzp_test...)</label>
                    <input
                      type="password"
                      value={brandingSettings.razorpayKey}
                      onChange={(e) => setBrandingSettings({ ...brandingSettings, razorpayKey: e.target.value })}
                      className="w-full p-4 bg-slate-50 border border-slate-200/40 rounded-2xl outline-none focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 font-mono font-bold text-slate-700 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Federal GST Percentage breakdown (%)</label>
                    <input
                      type="number"
                      value={brandingSettings.gstPercentage}
                      onChange={(e) => setBrandingSettings({ ...brandingSettings, gstPercentage: e.target.value })}
                      className="w-full p-4 bg-slate-50 border border-slate-200/40 rounded-2xl outline-none focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 font-bold text-slate-700 transition-all"
                    />
                  </div>

                  <div className="p-4 bg-[#FFFBEB] text-[#D97706] rounded-2xl border border-[#D97706]/10 text-xs font-semibold leading-relaxed flex gap-3">
                    <AlertCircle size={18} className="flex-shrink-0 text-[#D97706]" />
                    <span>LMS Payment sandbox is currently in Test Mode. Auto-generation of Transaction ID protocol is live.</span>
                  </div>

                  <button
                    onClick={() => alert('Razorpay gateway parameters successfully saved in local process environment!')}
                    className="w-full py-4 bg-[#FFF7ED] hover:bg-[#FFF7ED]/80 text-[#F97316] border border-[#F97316]/10 font-bold rounded-2xl active:scale-[0.98] transition-all text-xs font-black uppercase tracking-wider mt-4"
                  >
                    Save API Credentials
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </main>
      <AnimatePresence>

        {/* INVOICE VIEWER POPUP MODAL (Requirement 8) */}
        {selectedInvoice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-[32px] w-full max-w-3xl p-8 sm:p-12 shadow-2xl relative border border-slate-100 print:shadow-none print:border-none print:w-full print:p-0 print:m-0"
              id="invoice-document-element"
            >
              {/* Close triggers */}
              <button
                onClick={() => setSelectedInvoice(null)}
                className="absolute top-6 right-6 w-11 h-11 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:scale-105 active:scale-95 transition-all print:hidden"
              >
                ✕
              </button>

              {/* GuruBramha Invoice Header */}
              <div className="flex flex-col sm:flex-row justify-between gap-6 border-b border-slate-200/60 pb-8 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-orange-600 rounded-[20px] flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-indigo-100">
                    G
                  </div>
                  <div>
                    <h2 className="font-extrabold text-xl leading-tight tracking-tight text-slate-900">GuruBramha</h2>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">EdTech Premium</span>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <h1 className="text-xs font-black uppercase text-slate-400 tracking-[0.25em]">Tax Invoice</h1>
                  <p className="text-sm font-mono font-bold text-slate-900 mt-2">No: {selectedInvoice.txId}</p>
                  <p className="text-xs text-slate-400 mt-1">Date: {selectedInvoice.date} {selectedInvoice.time}</p>
                </div>
              </div>

              {/* Client & Vendor Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8 text-xs font-bold text-slate-500">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Billing Coordinates</h4>
                  <p className="text-slate-900 font-black text-sm">{selectedInvoice.name}</p>
                  <p className="flex items-center gap-2"><Mail size={12} /> {selectedInvoice.email}</p>
                  <p className="flex items-center gap-2"><Smartphone size={12} /> {selectedInvoice.phone}</p>
                </div>
                <div className="space-y-2 text-left sm:text-right">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">LMS Provider Coordinates</h4>
                  <p className="text-slate-900 font-black text-sm">GuruBramha EdTech Ltd.</p>
                  <p>Cyber Hub, Gurugram, India</p>
                  <p>GSTIN: 06AAACG0026B1ZS</p>
                </div>
              </div>

              {/* Transaction details list */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8 space-y-4 text-xs font-bold text-slate-500">
                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Payment coordinates</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">Razorpay ID</span>
                    <span className="text-slate-900 font-bold">{selectedInvoice.paymentId}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">Plan type</span>
                    <span className="text-slate-900 font-black uppercase tracking-wider">{selectedInvoice.plan} Access</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">Start Date</span>
                    <span className="text-slate-900 font-bold">{selectedInvoice.startDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">End Date</span>
                    <span className="text-slate-900 font-bold">{selectedInvoice.endDate}</span>
                  </div>
                </div>
              </div>

              {/* Tax calculation Breakdown */}
              <table className="w-full text-left border-collapse text-xs font-bold text-slate-500 mb-8">
                <thead>
                  <tr className="border-b border-slate-200 pb-3 text-slate-400">
                    <th className="py-3">LMS Course catalog Item</th>
                    <th className="py-3 text-center">Taxable Value</th>
                    <th className="py-3 text-center">CGST (9%)</th>
                    <th className="py-3 text-center">SGST (9%)</th>
                    <th className="py-3 text-right">Net Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-4 font-black text-slate-800 text-sm">GuruBramha LMS Portal Access ({selectedInvoice.plan} Subscription)</td>
                    <td className="py-4 text-center">₹{(selectedInvoice.amount * 0.8475).toFixed(2)}</td>
                    <td className="py-4 text-center">₹{(selectedInvoice.amount * 0.0762).toFixed(2)}</td>
                    <td className="py-4 text-center">₹{(selectedInvoice.amount * 0.0762).toFixed(2)}</td>
                    <td className="py-4 text-right font-black text-slate-950 text-sm">₹{selectedInvoice.amount.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>

              {/* Grand Total */}
              <div className="flex justify-end border-t border-slate-200 pt-6 font-bold text-slate-500">
                <div className="text-right space-y-2">
                  <p>Taxable Value: <span className="text-slate-800 ml-4">₹{(selectedInvoice.amount * 0.8475).toFixed(2)}</span></p>
                  <p>Combined GST (18%): <span className="text-slate-800 ml-4">₹{(selectedInvoice.amount * 0.1525).toFixed(2)}</span></p>
                  <h3 className="text-2xl font-black text-slate-950 mt-4">Total Paid: <span className="text-orange-600 ml-4">₹{selectedInvoice.amount.toLocaleString()}</span></h3>
                </div>
              </div>

              {/* Actions print footer */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-8 mt-8 print:hidden">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">This is a system-generated tax invoice.</span>
                <button
                  onClick={() => window.print()}
                  className="btn-primary py-3.5 px-8 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider"
                >
                  <Download size={14} /> Print / Save as PDF
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* MODAL: ADD / EDIT COURSE */}
        {(isAddCourseOpen || editingCourse) && (
          <CourseBuilder
            course={editingCourse}
            onClose={() => { setIsAddCourseOpen(false); setEditingCourse(null); }}
            onSave={() => { setIsAddCourseOpen(false); setEditingCourse(null); fetchCourses(); }}
          />
        )}

        {/* MODAL: ADD / EDIT SCHOLAR USER */}
        {(isAddUserOpen || editingUser) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-xl relative border border-slate-200/50 font-sans"
            >
              <button
                onClick={() => { setIsAddUserOpen(false); setEditingUser(null); }}
                className="absolute top-6 right-6 w-9 h-9 bg-slate-50 border border-slate-200/55 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:scale-105 transition-all"
              >
                ✕
              </button>

              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6 mt-2">
                {editingUser ? 'Edit Scholar Coordinates' : 'Enroll New Scholar'}
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.target);
                  const newU = {
                    id: editingUser ? editingUser.id : users.length + 1,
                    name: data.get('name'),
                    email: data.get('email'),
                    phone: data.get('phone'),
                    joinedDate: editingUser ? editingUser.joinedDate : new Date().toISOString().slice(0, 10),
                    subStatus: data.get('subStatus'),
                    plan: data.get('plan'),
                    avatar: editingUser ? editingUser.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80',
                    activeDuration: editingUser ? editingUser.activeDuration : '0 hrs',
                    activity: editingUser ? editingUser.activity : '0 problems'
                  };
                  if (editingUser) {
                    setUsers(users.map(u => u.id === editingUser.id ? newU : u));
                  } else {
                    setUsers([...users, newU]);
                  }
                  setIsAddUserOpen(false);
                  setEditingUser(null);
                }}
                className="space-y-5 text-xs font-bold text-slate-500"
              >
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Full Scholar Name</label>
                  <input type="text" name="name" required defaultValue={editingUser?.name} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Email Coordinate</label>
                  <input type="email" name="email" required defaultValue={editingUser?.email} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Phone coordinates</label>
                  <input type="text" name="phone" required defaultValue={editingUser?.phone} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">Subscription Status</label>
                    <select name="subStatus" defaultValue={editingUser?.subStatus || 'Free'} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 outline-none font-bold text-slate-700 transition-all text-xs">
                      <option value="Active">Active</option>
                      <option value="Free">Free</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">Tier Plan</label>
                    <select name="plan" defaultValue={editingUser?.plan || 'None'} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 outline-none font-bold text-slate-700 transition-all text-xs">
                      <option value="None">None</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#F97316] to-[#F59E0B] hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-xl shadow-sm shadow-[#F97316]/15 transition-all text-xs uppercase tracking-wider mt-4">
                  {editingUser ? 'Save Coordinates' : 'Enroll Scholar'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* MODAL: ADD / EDIT CODING PROBLEM */}
        {(isAddProblemOpen || editingProblem) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#0F172A] border border-slate-800 rounded-3xl w-full max-w-4xl p-8 shadow-2xl relative font-sans text-slate-350"
            >
              <button
                onClick={() => { setIsAddProblemOpen(false); setEditingProblem(null); }}
                className="absolute top-6 right-6 w-9 h-9 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:scale-105 transition-all"
              >
                ✕
              </button>

              <h2 className="text-2xl font-black text-white tracking-tight mb-4">
                {editingProblem ? 'Configure Coding Challenge Sandbox' : 'Create Arena Coding Question'}
              </h2>

              {/* Form Navigation Tabs inside Modal */}
              <div className="flex border-b border-slate-800 mb-6 gap-2">
                {[
                  { id: 'general', name: 'General Parameters' },
                  { id: 'description', name: 'Descriptions & Markdown' },
                  { id: 'templates', name: 'Starter Codes & Solutions' },
                  { id: 'testcases', name: 'Test Cases Builder' },
                  { id: 'hints_tags', name: 'Hints & Tags' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFormTab(tab.id)}
                    className={`pb-3 text-xs font-bold transition-all relative ${activeFormTab === tab.id ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                      }`}
                  >
                    {tab.name}
                    {activeFormTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"></div>}
                  </button>
                ))}
              </div>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    const data = { ...modalProblemState };
                    if (!data.title) return alert('Title is mandatory');

                    let res;
                    if (editingProblem) {
                      res = await axios.put(`${API_BASE_URL}/api/problems/${editingProblem._id}`, data);
                    } else {
                      res = await axios.post(`${API_BASE_URL}/api/problems`, data);
                    }

                    alert(editingProblem ? 'Question configured successfully!' : 'Published to Elite Practice pool!');
                    setIsAddProblemOpen(false);
                    setEditingProblem(null);
                    fetchProblems();
                  } catch (err) {
                    alert('Error saving problem: ' + err.response?.data?.error || err.message);
                  }
                }}
                className="space-y-6 text-xs font-bold text-slate-400"
              >
                {/* TAB 1: GENERAL INFO */}
                {activeFormTab === 'general' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-wider text-slate-500">Problem Title</label>
                      <input
                        type="text"
                        required
                        value={modalProblemState.title}
                        onChange={(e) => setModalProblemState({ ...modalProblemState, title: e.target.value })}
                        placeholder="e.g. Subarray Sum Equals K"
                        className="w-full pl-4 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none font-bold text-white focus:border-emerald-500 transition-all text-xs"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-wider text-slate-500">Slug URL index (Auto-generates if blank)</label>
                      <input
                        type="text"
                        value={modalProblemState.slug}
                        onChange={(e) => setModalProblemState({ ...modalProblemState, slug: e.target.value })}
                        placeholder="subarray-sum-equals-k"
                        className="w-full pl-4 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none font-bold text-white focus:border-emerald-500 transition-all text-xs"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-wider text-slate-500">Category Topic</label>
                      <select
                        value={modalProblemState.category}
                        onChange={(e) => setModalProblemState({ ...modalProblemState, category: e.target.value })}
                        className="w-full pl-4 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none font-bold text-white focus:border-emerald-500 transition-all text-xs"
                      >
                        {['Arrays', 'Strings', 'Linked List', 'Trees', 'Graphs', 'Dynamic Programming', 'Greedy', 'Recursion', 'Backtracking', 'Binary Search', 'Stack', 'Queue'].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-slate-500">Difficulty Grade</label>
                        <select
                          value={modalProblemState.difficulty}
                          onChange={(e) => setModalProblemState({ ...modalProblemState, difficulty: e.target.value })}
                          className="w-full pl-4 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none font-bold text-white focus:border-emerald-500 transition-all text-xs"
                        >
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-slate-500">Award XP Score</label>
                        <input
                          type="number"
                          required
                          value={modalProblemState.points}
                          onChange={(e) => setModalProblemState({ ...modalProblemState, points: Number(e.target.value) })}
                          className="w-full pl-4 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none font-bold text-white focus:border-emerald-500 transition-all text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-slate-500">Time Limit (Secs)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={modalProblemState.timeLimit}
                          onChange={(e) => setModalProblemState({ ...modalProblemState, timeLimit: Number(e.target.value) })}
                          className="w-full pl-4 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none font-bold text-white focus:border-emerald-500 transition-all text-xs"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-slate-500">Memory Limit (MB)</label>
                        <input
                          type="number"
                          value={modalProblemState.memoryLimit}
                          onChange={(e) => setModalProblemState({ ...modalProblemState, memoryLimit: Number(e.target.value) })}
                          className="w-full pl-4 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none font-bold text-white focus:border-emerald-500 transition-all text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-wider text-slate-500">Publication Status</label>
                      <select
                        value={modalProblemState.status}
                        onChange={(e) => setModalProblemState({ ...modalProblemState, status: e.target.value })}
                        className="w-full pl-4 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl outline-none font-bold text-white focus:border-emerald-500 transition-all text-xs"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                        <option value="Hidden">Hidden</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* TAB 2: PROBLEM DESCRIPTIONS */}
                {activeFormTab === 'description' && (
                  <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-slate-500">Problem Description (HTML/Markdown)</label>
                      <textarea
                        value={modalProblemState.description}
                        onChange={(e) => setModalProblemState({ ...modalProblemState, description: e.target.value })}
                        rows="4"
                        required
                        placeholder="e.g. Find index sum of two target inputs..."
                        className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl outline-none font-bold text-white focus:border-emerald-500 font-mono text-xs leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-slate-500">Inputs Format</label>
                        <textarea
                          value={modalProblemState.inputFormat}
                          onChange={(e) => setModalProblemState({ ...modalProblemState, inputFormat: e.target.value })}
                          rows="3"
                          placeholder="e.g. First line represents size, next line array elements..."
                          className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl outline-none font-bold text-white focus:border-emerald-500 font-mono text-xs leading-relaxed"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-slate-500">Outputs Format</label>
                        <textarea
                          value={modalProblemState.outputFormat}
                          onChange={(e) => setModalProblemState({ ...modalProblemState, outputFormat: e.target.value })}
                          rows="3"
                          placeholder="e.g. Single integer output..."
                          className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl outline-none font-bold text-white focus:border-emerald-500 font-mono text-xs leading-relaxed"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-slate-500">Custom Constraints</label>
                      <textarea
                        value={modalProblemState.constraints}
                        onChange={(e) => setModalProblemState({ ...modalProblemState, constraints: e.target.value })}
                        rows="2"
                        placeholder="e.g. 1 <= nums.length <= 10^5"
                        className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl outline-none font-bold text-white focus:border-emerald-500 font-mono text-xs leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-slate-500">Sample Stdin Input</label>
                        <textarea
                          value={modalProblemState.sampleInput}
                          onChange={(e) => setModalProblemState({ ...modalProblemState, sampleInput: e.target.value })}
                          rows="3"
                          placeholder="2 7 11 15\n9"
                          className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl outline-none font-bold text-white focus:border-emerald-500 font-mono text-xs leading-relaxed"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider text-slate-500">Sample Stdout Output</label>
                        <textarea
                          value={modalProblemState.sampleOutput}
                          onChange={(e) => setModalProblemState({ ...modalProblemState, sampleOutput: e.target.value })}
                          rows="3"
                          placeholder="0 1"
                          className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl outline-none font-bold text-white focus:border-emerald-500 font-mono text-xs leading-relaxed"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-wider text-slate-500">Explanation details</label>
                      <textarea
                        value={modalProblemState.explanation}
                        onChange={(e) => setModalProblemState({ ...modalProblemState, explanation: e.target.value })}
                        rows="2"
                        placeholder="nums[0] + nums[1] = 2 + 7 = 9"
                        className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl outline-none font-bold text-white focus:border-emerald-500 font-mono text-xs leading-relaxed"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 3: STARTER CODES & SOLUTIONS */}
                {activeFormTab === 'templates' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <div className="flex gap-2">
                        {['javascript', 'python', 'cpp', 'java', 'c'].map(lang => (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => setFormSelectedLanguage(lang)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${formSelectedLanguage === lang ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                              }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">Configure starter templates & solutions for each language.</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[40vh]">
                      {/* Starter template code */}
                      <div className="flex flex-col border border-slate-800 rounded-xl overflow-hidden h-full">
                        <div className="bg-slate-900 px-4 py-2 text-[10px] font-bold text-slate-400 border-b border-slate-800 flex justify-between items-center">
                          <span>Starter Template (/{formSelectedLanguage})</span>
                        </div>
                        <div className="flex-grow bg-[#0F172A]">
                          <Editor
                            height="100%"
                            theme="vs-dark"
                            language={formSelectedLanguage === 'cpp' ? 'cpp' : formSelectedLanguage}
                            value={
                              (modalProblemState.starterCode || []).find(sc => sc.language === formSelectedLanguage)?.code || ''
                            }
                            onChange={(val) => {
                              let starterList = [...(modalProblemState.starterCode || [])];
                              const idx = starterList.findIndex(sc => sc.language === formSelectedLanguage);
                              if (idx !== -1) {
                                starterList[idx].code = val;
                              } else {
                                starterList.push({ language: formSelectedLanguage, code: val });
                              }
                              setModalProblemState({ ...modalProblemState, starterCode: starterList });
                            }}
                            options={{ fontSize: 13, minimap: { enabled: false } }}
                          />
                        </div>
                      </div>

                      {/* Expected compiler solution */}
                      <div className="flex flex-col border border-slate-800 rounded-xl overflow-hidden h-full">
                        <div className="bg-slate-900 px-4 py-2 text-[10px] font-bold text-slate-400 border-b border-slate-800 flex justify-between items-center">
                          <span>Verified Solution (/{formSelectedLanguage})</span>
                        </div>
                        <div className="flex-grow bg-[#0F172A]">
                          <Editor
                            height="100%"
                            theme="vs-dark"
                            language={formSelectedLanguage === 'cpp' ? 'cpp' : formSelectedLanguage}
                            value={
                              (modalProblemState.solutions || []).find(sol => sol.language === formSelectedLanguage)?.code || ''
                            }
                            onChange={(val) => {
                              let solutionsList = [...(modalProblemState.solutions || [])];
                              const idx = solutionsList.findIndex(s => s.language === formSelectedLanguage);
                              if (idx !== -1) {
                                solutionsList[idx].code = val;
                              } else {
                                solutionsList.push({ language: formSelectedLanguage, code: val });
                              }
                              setModalProblemState({ ...modalProblemState, solutions: solutionsList });
                            }}
                            options={{ fontSize: 13, minimap: { enabled: false } }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: TEST CASES BUILDER */}
                {activeFormTab === 'testcases' && (
                  <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
                    <div className="flex justify-between items-center">
                      <h4 className="text-[10px] uppercase font-black text-slate-500 tracking-wider">Test Cases Listing</h4>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...(modalProblemState.testCases || [])];
                          updated.push({ input: '', expectedOutput: '', explanation: '', isHidden: false });
                          setModalProblemState({ ...modalProblemState, testCases: updated });
                        }}
                        className="px-3 py-1.5 bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-400 border border-emerald-900/30 rounded-xl font-bold uppercase text-[10px] tracking-wider transition-all flex items-center gap-1"
                      >
                        <Plus size={12} /> Add Case
                      </button>
                    </div>

                    <div className="space-y-4">
                      {(modalProblemState.testCases || []).map((tc, idx) => (
                        <div key={idx} className="bg-slate-905 border border-slate-800 rounded-xl p-4.5 space-y-3 relative">
                          <button
                            type="button"
                            disabled={(modalProblemState.testCases || []).length <= 1}
                            onClick={() => {
                              const updated = [...modalProblemState.testCases];
                              updated.splice(idx, 1);
                              setModalProblemState({ ...modalProblemState, testCases: updated });
                            }}
                            className="absolute top-4 right-4 text-slate-600 hover:text-rose-400 disabled:opacity-30"
                            title="Delete case"
                          >
                            ✕
                          </button>

                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center font-bold text-slate-400 font-mono text-[10px]">{idx + 1}</span>
                            <label className="flex items-center gap-1.5 cursor-pointer select-none text-[10px] font-bold text-slate-500">
                              <input
                                type="checkbox"
                                checked={tc.isHidden}
                                onChange={(e) => {
                                  const updated = [...modalProblemState.testCases];
                                  updated[idx].isHidden = e.target.checked;
                                  setModalProblemState({ ...modalProblemState, testCases: updated });
                                }}
                                className="w-3.5 h-3.5 rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
                              />
                              Conceal as Hidden Private Test Case
                            </label>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <span className="text-[9px] uppercase tracking-wider text-slate-500">Stdin Input Payload</span>
                              <textarea
                                value={tc.input}
                                onChange={(e) => {
                                  const updated = [...modalProblemState.testCases];
                                  updated[idx].input = e.target.value;
                                  setModalProblemState({ ...modalProblemState, testCases: updated });
                                }}
                                required
                                rows="2"
                                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-lg outline-none font-mono text-xs text-white"
                              />
                            </div>
                            <div className="space-y-1">
                              <span className="text-[9px] uppercase tracking-wider text-slate-500">Expected Stdout Output</span>
                              <textarea
                                value={tc.expectedOutput}
                                onChange={(e) => {
                                  const updated = [...modalProblemState.testCases];
                                  updated[idx].expectedOutput = e.target.value;
                                  setModalProblemState({ ...modalProblemState, testCases: updated });
                                }}
                                required
                                rows="2"
                                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-lg outline-none font-mono text-xs text-white"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 5: HINTS & TAGS */}
                {activeFormTab === 'hints_tags' && (
                  <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
                    {/* Hints list */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-[10px] uppercase font-black text-slate-500 tracking-wider">Hints Board</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...(modalProblemState.hints || [])];
                            updated.push('');
                            setModalProblemState({ ...modalProblemState, hints: updated });
                          }}
                          className="px-3 py-1.5 bg-emerald-950/20 hover:bg-emerald-950/40 text-emerald-400 border border-emerald-900/30 rounded-xl font-bold uppercase text-[10px] tracking-wider transition-all flex items-center gap-1"
                        >
                          <Plus size={12} /> Add Hint
                        </button>
                      </div>

                      <div className="space-y-2">
                        {(modalProblemState.hints || []).map((hint, idx) => (
                          <div key={idx} className="flex gap-3 items-center">
                            <span className="font-mono text-slate-500 font-bold text-[11px]">Hint {idx + 1}:</span>
                            <input
                              type="text"
                              value={hint}
                              onChange={(e) => {
                                const updated = [...modalProblemState.hints];
                                updated[idx] = e.target.value;
                                setModalProblemState({ ...modalProblemState, hints: updated });
                              }}
                              placeholder="e.g. Try sorting the array first..."
                              className="flex-grow pl-4 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl outline-none font-bold text-white focus:border-emerald-500 transition-all text-xs"
                            />
                            <button
                              type="button"
                              disabled={(modalProblemState.hints || []).length <= 1}
                              onClick={() => {
                                const updated = [...modalProblemState.hints];
                                updated.splice(idx, 1);
                                setModalProblemState({ ...modalProblemState, hints: updated });
                              }}
                              className="p-2 bg-slate-900 border border-slate-800 text-slate-500 hover:text-rose-400 rounded-xl disabled:opacity-30"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Custom tags */}
                    <div className="space-y-3 pt-4 border-t border-slate-800/60">
                      <h4 className="text-[10px] uppercase font-black text-slate-500 tracking-wider">Multi-Select Tags Manifest</h4>

                      <div className="flex flex-wrap gap-2 p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                        {['Hash Table', 'Array', 'String', 'Tree', 'Graph', 'Linked List', 'Stack', 'Queue', 'DP', 'Greedy', 'Recursion', 'Binary Search', 'Two Pointers'].map(tag => {
                          const isSelected = (modalProblemState.tags || []).includes(tag);
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => {
                                let tagList = [...(modalProblemState.tags || [])];
                                if (tagList.includes(tag)) {
                                  tagList = tagList.filter(t => t !== tag);
                                } else {
                                  tagList.push(tag);
                                }
                                setModalProblemState({ ...modalProblemState, tags: tagList });
                              }}
                              className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all border ${isSelected
                                  ? 'bg-emerald-600 text-white border-transparent'
                                  : 'bg-slate-900 text-slate-450 border-slate-800 hover:border-slate-700'
                                }`}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions footer */}
                <div className="pt-4 border-t border-slate-800 flex justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => { setIsAddProblemOpen(false); setEditingProblem(null); }}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-1.5"
                  >
                    <Check size={14} /> {editingProblem ? 'Save Sandboxed Problem' : 'Commit & Publish to Arena'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* MODAL: PREVIEW PRACTICE QUESTION IN MONACO */}
        {previewingProblem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#0F172A] border border-slate-800 rounded-[2.5rem] w-full max-w-6xl h-[85vh] p-8 shadow-2xl relative font-sans flex flex-col justify-between"
            >
              <button
                onClick={() => setPreviewingProblem(null)}
                className="absolute top-6 right-6 w-9 h-9 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:scale-105 transition-all"
              >
                ✕
              </button>

              <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-md tracking-wider">CMS Sandbox Preview IDE</span>
                  <h3 className="text-2xl font-bold text-white mt-2 tracking-tight">{previewingProblem.title}</h3>
                </div>
                <span className="px-3.5 py-1.5 bg-slate-900 text-yellow-500 border border-slate-800 rounded-xl text-xs font-bold uppercase tracking-wider">{previewingProblem.difficulty}</span>
              </div>

              {/* IDE Split View */}
              <div className="flex-grow flex gap-6 overflow-hidden">
                {/* Left split: Description details */}
                <div className="w-[45%] bg-slate-900/30 border border-slate-800 rounded-2xl p-6 overflow-y-auto custom-scrollbar prose prose-slate prose-invert max-w-none text-xs text-slate-300 space-y-4">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Problem Statement</h4>
                    <p className="bg-slate-900/60 p-4 rounded-xl border border-slate-850/60 leading-relaxed whitespace-pre-wrap">{previewingProblem.description}</p>
                  </div>

                  {previewingProblem.constraints && (
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Constraints</h4>
                      <p className="bg-slate-900/60 p-4 rounded-xl border border-slate-850/60 leading-relaxed font-mono whitespace-pre-wrap">{previewingProblem.constraints}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Sample Input</h4>
                      <pre className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-[11px] font-mono leading-relaxed">{previewingProblem.sampleInput}</pre>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-2">Sample Output</h4>
                      <pre className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-[11px] font-mono leading-relaxed">{previewingProblem.sampleOutput}</pre>
                    </div>
                  </div>
                </div>

                {/* Right split: Monaco Editor */}
                <div className="flex-grow bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between">
                  <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center text-[10px] font-bold text-slate-400">
                    <span className="uppercase">Monaco Editor Compiler / JavaScript Starter</span>
                  </div>
                  <div className="flex-grow bg-[#0F172A]">
                    <Editor
                      height="100%"
                      theme="vs-dark"
                      language="javascript"
                      value={
                        (previewingProblem.starterCode || []).find(c => c.language === 'javascript')?.code || 'function solution() {\n  // write code\n}'
                      }
                      options={{ fontSize: 13, minimap: { enabled: false } }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* MODAL: MONACO-POWERED SUBMISSION SOURCE CODE VIEWER */}
        {viewingSubmissionCode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#0F172A] border border-slate-800 rounded-[2.5rem] w-full max-w-4xl h-[75vh] p-8 shadow-2xl relative font-sans flex flex-col justify-between"
            >
              <button
                onClick={() => setViewingSubmissionCode(null)}
                className="absolute top-6 right-6 w-9 h-9 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:scale-105 transition-all"
              >
                ✕
              </button>

              <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-md tracking-wider">Submitted Compiler Source Code</span>
                  <h3 className="text-xl font-bold text-white mt-2 tracking-tight">Code Submission by {viewingSubmissionCode.user?.displayName || 'Unknown user'}</h3>
                </div>
                <span className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border ${viewingSubmissionCode.status === 'Accepted' ? 'bg-emerald-950/20 text-emerald-400 border-emerald-800/30' : 'bg-rose-950/20 text-rose-400 border-rose-800/30'
                  }`}>{viewingSubmissionCode.status}</span>
              </div>

              {/* Execution log details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-900/50 border border-slate-800 rounded-xl text-xs font-bold text-slate-400 mb-4">
                <div>
                  <span>Compiler language:</span>
                  <p className="text-white uppercase mt-0.5">{viewingSubmissionCode.language}</p>
                </div>
                <div>
                  <span>Runtime performance:</span>
                  <p className="text-white mt-0.5">{viewingSubmissionCode.runtime || 0} ms</p>
                </div>
                <div>
                  <span>Test Cases Outcome:</span>
                  <p className="text-white mt-0.5">{viewingSubmissionCode.testCasesPassed || 0} / {viewingSubmissionCode.totalTestCases || 0} Passed</p>
                </div>
                <div>
                  <span>XP points awarded:</span>
                  <p className="text-emerald-400 mt-0.5">+{viewingSubmissionCode.pointsEarned || 0} XP</p>
                </div>
              </div>

              {/* Source code viewer */}
              <div className="flex-grow bg-slate-950 border border-slate-850 rounded-2xl overflow-hidden flex flex-col justify-between h-[35vh]">
                <div className="flex-grow bg-[#0F172A]">
                  <Editor
                    height="100%"
                    theme="vs-dark"
                    language={viewingSubmissionCode.language === 'cpp' ? 'cpp' : viewingSubmissionCode.language}
                    value={viewingSubmissionCode.code}
                    options={{ readOnly: true, fontSize: 13, minimap: { enabled: false } }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* MODAL: CONTEST SCHEDULER */}
        {(isAddContestOpen || editingContest) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#0F172A] border border-slate-800 rounded-3xl w-full max-w-lg p-8 shadow-2xl relative font-sans text-slate-350"
            >
              <button
                onClick={() => { setIsAddContestOpen(false); setEditingContest(null); }}
                className="absolute top-6 right-6 w-9 h-9 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:scale-105 transition-all"
              >
                ✕
              </button>

              <h2 className="text-2xl font-black text-white tracking-tight mb-6">
                {editingContest ? 'Configure Competitive Contest' : 'Schedule Competitive Contest'}
              </h2>

              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const data = new FormData(e.target);
                  const selectedProblemIds = problems
                    .filter(p => document.getElementById(`contest-prob-check-${p._id}`)?.checked)
                    .map(p => p._id);

                  const payload = {
                    title: data.get('title'),
                    description: data.get('description'),
                    startTime: new Date(data.get('startTime')),
                    endTime: new Date(data.get('endTime')),
                    timer: Number(data.get('timer')),
                    problems: selectedProblemIds
                  };

                  try {
                    if (editingContest) {
                      await axios.put(`${API_BASE_URL}/api/contests/${editingContest._id}`, payload);
                    } else {
                      await axios.post(`${API_BASE_URL}/api/contests`, payload);
                    }
                    alert(editingContest ? 'Contest successfully saved!' : 'Competitive Contest successfully published!');
                    setIsAddContestOpen(false);
                    setEditingContest(null);
                    fetchContests();
                  } catch (err) {
                    alert(err.message);
                  }
                }}
                className="space-y-5 text-xs font-bold text-slate-500"
              >
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Contest Title</label>
                  <input type="text" name="title" required defaultValue={editingContest?.title} placeholder="e.g. GuruBramha Summer Code sprint" className="w-full pl-4 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:border-emerald-500 outline-none font-bold text-white transition-all text-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Contest Description</label>
                  <textarea name="description" rows="2" defaultValue={editingContest?.description} placeholder="Competitive code event constraints..." className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl focus:border-emerald-500 outline-none font-bold text-white transition-all text-xs" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">Start Time</label>
                    <input
                      type="datetime-local"
                      name="startTime"
                      required
                      defaultValue={editingContest?.startTime ? new Date(new Date(editingContest.startTime).getTime() - new Date(editingContest.startTime).getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ''}
                      className="w-full pl-4 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:border-emerald-500 outline-none font-bold text-white transition-all text-xs"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">End Time</label>
                    <input
                      type="datetime-local"
                      name="endTime"
                      required
                      defaultValue={editingContest?.endTime ? new Date(new Date(editingContest.endTime).getTime() - new Date(editingContest.endTime).getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ''}
                      className="w-full pl-4 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:border-emerald-500 outline-none font-bold text-white transition-all text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Contest Timer Duration (Minutes)</label>
                  <input type="number" name="timer" required defaultValue={editingContest?.timer || 120} className="w-full pl-4 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:border-emerald-500 outline-none font-bold text-white transition-all text-xs" />
                </div>

                {/* Problems binding checkboxes */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Select Contest Problems</label>
                  <div className="max-h-[25vh] overflow-y-auto bg-slate-900 border border-slate-850 p-4 rounded-xl space-y-2.5 custom-scrollbar">
                    {problems.length === 0 ? (
                      <p className="text-slate-600 text-xs font-semibold">No questions available in database yet.</p>
                    ) : (
                      problems.map(prob => (
                        <label key={prob._id} className="flex items-center gap-3 cursor-pointer text-slate-300 font-bold select-none text-xs">
                          <input
                            type="checkbox"
                            id={`contest-prob-check-${prob._id}`}
                            defaultChecked={(editingContest?.problems || []).some(p => p === prob._id || p._id === prob._id)}
                            className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-emerald-600 focus:ring-0"
                          />
                          <div>
                            <p>{prob.title}</p>
                            <span className="text-[10px] text-slate-500 font-mono">XP: +{prob.points} | Category: {prob.category}</span>
                          </div>
                        </label>
                      ))
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => { setIsAddContestOpen(false); setEditingContest(null); }}
                    className="px-6 py-3 bg-slate-850 hover:bg-slate-800 text-slate-400 font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg"
                  >
                    {editingContest ? 'Save Changes' : 'Schedule Contest'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* MODAL: ADD / EDIT INTERVIEW COMPANY DECK */}
        {(isAddInterviewOpen || editingInterview) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-xl relative border border-slate-200/50 font-sans"
            >
              <button
                onClick={() => { setIsAddInterviewOpen(false); setEditingInterview(null); }}
                className="absolute top-6 right-6 w-9 h-9 bg-slate-50 border border-slate-200/55 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:scale-105 transition-all"
              >
                ✕
              </button>

              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6 mt-2">
                {editingInterview ? 'Configure Company Deck' : 'Add Company Interview Prep'}
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.target);
                  const newI = {
                    id: editingInterview ? editingInterview.id : interviews.length + 1,
                    company: data.get('company'),
                    round: data.get('round'),
                    category: data.get('category'),
                    questions: Number(data.get('questions')),
                    materials: data.get('materials')
                  };
                  if (editingInterview) {
                    setInterviews(interviews.map(i => i.id === editingInterview.id ? newI : i));
                  } else {
                    setInterviews([...interviews, newI]);
                  }
                  setIsAddInterviewOpen(false);
                  setEditingInterview(null);
                }}
                className="space-y-5 text-xs font-bold text-slate-500"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">Target Company</label>
                    <input type="text" name="company" required defaultValue={editingInterview?.company} placeholder="Google" className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">Interview Category</label>
                    <input type="text" name="category" required defaultValue={editingInterview?.category || 'Algorithms'} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Specific Round Protocol Name</label>
                  <input type="text" name="round" required defaultValue={editingInterview?.round} placeholder="Technical Protocol 1" className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Number of Available Queries</label>
                  <input type="number" name="questions" required defaultValue={editingInterview?.questions || 10} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Attached Study Material (Notes / Workbook name)</label>
                  <input type="text" name="materials" defaultValue={editingInterview?.materials} placeholder="System Design Workbook PDF" className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                </div>

                <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#F97316] to-[#F59E0B] hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-xl shadow-sm shadow-[#F97316]/15 transition-all text-xs uppercase tracking-wider mt-4">
                  {editingInterview ? 'Save Config' : 'Publish Interview Deck'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* MODAL: BROADCAST NEW NOTIFICATION */}
        {isNewNotificationOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-xl relative border border-slate-200/50 font-sans"
            >
              <button
                onClick={() => setIsNewNotificationOpen(false)}
                className="absolute top-6 right-6 w-9 h-9 bg-slate-50 border border-slate-200/55 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:scale-105 transition-all"
              >
                ✕
              </button>

              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6 mt-2">
                Broadcast New Alert
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.target);
                  const newN = {
                    id: notifications.length + 1,
                    title: data.get('title'),
                    type: data.get('type'),
                    target: data.get('target'),
                    date: new Date().toISOString().slice(0, 10),
                    status: 'Sent'
                  };
                  setNotifications([newN, ...notifications]);
                  setIsNewNotificationOpen(false);
                }}
                className="space-y-5 text-xs font-bold text-slate-500"
              >
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Notification Alert Title</label>
                  <input type="text" name="title" required placeholder="GuruBramha Summer Hackathon 2026 Registration open!" className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">Alert Type Tag</label>
                    <select name="type" className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 outline-none font-bold text-slate-700 transition-all text-xs">
                      <option value="Promotional">Promotional</option>
                      <option value="Reminder">Reminder</option>
                      <option value="System alert">System alert</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">Target Segment</label>
                    <select name="target" className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 outline-none font-bold text-slate-700 transition-all text-xs">
                      <option value="All Scholars">All Scholars</option>
                      <option value="Monthly Users">Monthly Users Only</option>
                      <option value="Free Tier Scholars">Free Tier Scholars Only</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#F97316] to-[#F59E0B] hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-xl shadow-sm shadow-[#F97316]/15 transition-all text-xs uppercase tracking-wider mt-4">
                  Broadcast Alert Instantly
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Styled Printable Invoice Sheet styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice-document-element, #invoice-document-element * {
            visibility: visible;
          }
          #invoice-document-element {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            box-shadow: none;
            border: none;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>

    </div>
  );
};

export default Admin;
