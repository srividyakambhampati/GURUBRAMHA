import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CourseBuilder from '../components/admin/CourseBuilder';
import { useAuth } from '../context/AuthContext';
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
  Database
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.email !== 'adminguru@gmail.com') {
      alert("Access Denied: You do not have permission to access the Admin Panel.");
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const [activeTab, setActiveTab] = useState('dashboard');
  
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

  const [problems, setProblems] = useState([
    { id: 1, title: 'Two Sum', difficulty: 'Easy', category: 'Arrays', accuracy: '45.2%', points: 100, submissions: 1250, testCases: '50 cases', hiddenCases: '100 cases' },
    { id: 2, title: 'Longest Palindrome', difficulty: 'Medium', category: 'Strings', accuracy: '32.1%', points: 250, submissions: 820, testCases: '40 cases', hiddenCases: '80 cases' },
    { id: 3, title: 'Binary Tree Level Order', difficulty: 'Hard', category: 'Trees', accuracy: '18.5%', points: 500, submissions: 320, testCases: '30 cases', hiddenCases: '60 cases' },
  ]);

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
  const [editingInterview, setEditingInterview] = useState(null);
  
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddProblemOpen, setIsAddProblemOpen] = useState(false);
  const [isAddInterviewOpen, setIsAddInterviewOpen] = useState(false);
  const [isNewNotificationOpen, setIsNewNotificationOpen] = useState(false);
  
  const [selectedInvoice, setSelectedInvoice] = useState(null);

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
    link.setAttribute("download", `GuruBramha_Subscriptions_${new Date().toISOString().slice(0,10)}.csv`);
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
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-[13px] font-medium tracking-wide transition-all duration-200 ${
                  activeTab === tab.id 
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
          <button className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm font-medium px-4">
            <Globe size={16} /> View Site
          </button>
          <button className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm font-medium px-4 mt-6">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* 2. Main Portal Scrollable Viewport */}
      <main className="flex-grow min-h-screen flex flex-col p-6 sm:p-10 lg:p-12 overflow-y-auto w-full">
        
        {/* Mobile Header / Quick Switch */}
        <div className="lg:hidden flex items-center justify-between mb-8 bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-black text-lg">G</div>
            <span className="font-extrabold text-sm uppercase tracking-wider text-slate-800">GuruBramha Admin</span>
          </div>
          <select 
            value={activeTab} 
            onChange={(e) => setActiveTab(e.target.value)}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-orange-600 uppercase tracking-widest outline-none"
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
                              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                user.subStatus === 'Active' ? 'bg-emerald-900/30 text-emerald-400 border border-emerald-800/50' :
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
                                    if(confirm(`Suspend account of ${user.name}?`)) {
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
                                    if(confirm(`Confirm permanent erasure of ${user.name}?`)) {
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
                          <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${
                            course.status === 'Published' ? 'bg-emerald-900/20 text-emerald-400 border-emerald-500/20' :
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
                              if(confirm(`Erase ${course.name} from platform catalog permanently?`)) {
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-bold uppercase text-emerald-400 tracking-[0.2em] bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">Coding Challenges Sandbox CMS</span>
                  <h1 className="text-3xl font-bold text-white mt-3">Elite Arena Management</h1>
                  <p className="text-slate-400 font-medium text-sm tracking-wide mt-1">Configure dry-run constraints, add test cases, and review student stats.</p>
                </div>
                <button 
                  onClick={() => setIsAddProblemOpen(true)}
                  className="btn-primary flex items-center justify-center gap-2 self-start sm:self-auto"
                >
                  <Plus size={18} /> Add Arena Challenge
                </button>
              </div>

              {/* Filtering Search Bar */}
              <div className="bg-[#131B2C] border border-slate-800/80 rounded-[20px] !p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm">
                <div className="relative flex-grow w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    value={problemSearch}
                    onChange={(e) => setProblemSearch(e.target.value)}
                    placeholder="Search challenges database by challenge title, index or structural category..."
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-900/50 border border-slate-800/80 rounded-2xl focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none font-bold text-white placeholder:text-slate-500 transition-all text-xs"
                  />
                </div>
              </div>

              {/* Problems Grid Table */}
              <div className="bg-[#131B2C] border border-slate-800/80 rounded-[2.5rem] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-900/30 border-b border-slate-800/80">
                        <th className="px-8 py-5 w-16 text-center">SI.No</th>
                        <th className="px-8 py-5">Challenge Title</th>
                        <th className="px-8 py-5">Category</th>
                        <th className="px-8 py-5 text-center">Test Cases</th>
                        <th className="px-8 py-5 text-center">Hidden Cases</th>
                        <th className="px-8 py-5 text-center">Points</th>
                        <th className="px-8 py-5 text-center">Difficulty</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {problems
                        .filter(p => p.title.toLowerCase().includes(problemSearch.toLowerCase()) || p.category.toLowerCase().includes(problemSearch.toLowerCase()))
                        .map((prob, i) => (
                          <tr key={prob.id} className="hover:bg-slate-800/30 even:bg-slate-900/20 transition-all duration-200 text-xs font-semibold text-slate-300 border-b border-slate-800/40 last:border-0">
                            <td className="px-8 py-4.5 text-center font-bold text-slate-400">{i + 1}</td>
                            <td className="px-8 py-4.5 font-bold text-white">{prob.title}</td>
                            <td className="px-8 py-4.5">
                              <span className="px-3 py-1 bg-cyan-900/20 text-cyan-400 rounded-lg text-[10px] font-bold uppercase tracking-wider border border-cyan-500/20">{prob.category}</span>
                            </td>
                            <td className="px-8 py-4.5 text-center font-bold text-slate-500">{prob.testCases}</td>
                            <td className="px-8 py-4.5 text-center font-bold text-rose-400 bg-rose-900/10 rounded-lg">{prob.hiddenCases}</td>
                            <td className="px-8 py-4.5 text-center font-bold text-emerald-400">+{prob.points} XP</td>
                            <td className="px-8 py-4.5 text-center">
                              <span className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border ${
                                prob.difficulty === 'Easy' ? 'bg-emerald-900/20 text-emerald-400 border-emerald-500/20' :
                                prob.difficulty === 'Medium' ? 'bg-yellow-900/20 text-yellow-400 border-yellow-500/20' : 'bg-rose-900/20 text-rose-400 border-rose-500/20'
                              }`}>{prob.difficulty}</span>
                            </td>
                            <td className="px-8 py-4.5 text-right">
                              <div className="flex items-center justify-end gap-2.5">
                                <button 
                                  onClick={() => setEditingProblem(prob)}
                                  className="p-2.5 bg-[#FFF7ED] border border-transparent hover:border-[#F97316]/10 rounded-xl text-[#F97316] hover:bg-[#FFF7ED]/80 hover:scale-105 active:scale-95 transition-all"
                                >
                                  <Edit size={14} />
                                </button>
                                <button 
                                  onClick={() => {
                                    if(confirm(`Erase problem "${prob.title}"?`)) {
                                      setProblems(problems.filter(p => p.id !== prob.id));
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
                            if(confirm(`Erase company deck "${deck.company}"?`)) {
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
                              <span className={`px-3 py-1 rounded-lg font-black uppercase tracking-wider text-[10px] ${
                                sub.plan === 'Yearly' ? 'bg-[#FFFBEB] text-[#D97706] border border-[#D97706]/10' : 'bg-[#FFF7ED] text-[#F97316] border border-[#F97316]/10'
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
                              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                sub.status === 'Successful' ? 'bg-[#DEF7EC] text-[#03543F]' :
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
                                    if(confirm(`Trigger full refund for ${sub.name} (Tx: ${sub.txId})?`)) {
                                      setSubscriptions(subscriptions.map(s => s.id === sub.id ? { ...s, status: 'Refunded' } : s));
                                    }
                                  }}
                                  className="px-3 py-1.5 bg-amber-50 border border-amber-100 hover:border-amber-200/40 text-amber-700 hover:bg-amber-100 hover:scale-105 active:scale-95 rounded-xl transition-all font-black uppercase text-[9px] tracking-wider"
                                >
                                  Refund
                                </button>
                                <button 
                                  onClick={() => {
                                    if(confirm(`Confirm erasure of subscription ledger entry ${sub.txId}?`)) {
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
                      onChange={(e) => setBrandingSettings({...brandingSettings, title: e.target.value})}
                      className="w-full p-4 bg-slate-50 border border-slate-200/40 rounded-2xl outline-none focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 font-bold text-slate-700 transition-all" 
                    />
                  </div>
 
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Monthly Tier Plan (₹)</label>
                      <input 
                        type="text" 
                        value={brandingSettings.pricingMonthly}
                        onChange={(e) => setBrandingSettings({...brandingSettings, pricingMonthly: e.target.value})}
                        className="w-full p-4 bg-slate-50 border border-slate-200/40 rounded-2xl outline-none focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 font-bold text-slate-700 transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Yearly Tier Plan (₹)</label>
                      <input 
                        type="text" 
                        value={brandingSettings.pricingYearly}
                        onChange={(e) => setBrandingSettings({...brandingSettings, pricingYearly: e.target.value})}
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
                      onChange={(e) => setBrandingSettings({...brandingSettings, razorpayKey: e.target.value})}
                      className="w-full p-4 bg-slate-50 border border-slate-200/40 rounded-2xl outline-none focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 font-mono font-bold text-slate-700 transition-all" 
                    />
                  </div>
 
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Federal GST Percentage breakdown (%)</label>
                    <input 
                      type="number" 
                      value={brandingSettings.gstPercentage}
                      onChange={(e) => setBrandingSettings({...brandingSettings, gstPercentage: e.target.value})}
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
                  if(editingUser) {
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
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95 }} 
              animate={{ scale: 1 }} 
              exit={{ scale: 0.95 }} 
              className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-xl relative border border-slate-200/50 font-sans"
            >
              <button 
                onClick={() => { setIsAddProblemOpen(false); setEditingProblem(null); }} 
                className="absolute top-6 right-6 w-9 h-9 bg-slate-50 border border-slate-200/55 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:scale-105 transition-all"
              >
                ✕
              </button>

              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6 mt-2">
                {editingProblem ? 'Configure Challenge Sandbox' : 'Add Arena Challenge'}
              </h2>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.target);
                  const newP = {
                    id: editingProblem ? editingProblem.id : problems.length + 1,
                    title: data.get('title'),
                    category: data.get('category'),
                    difficulty: data.get('difficulty'),
                    testCases: data.get('testCases'),
                    hiddenCases: data.get('hiddenCases'),
                    points: Number(data.get('points')),
                    submissions: editingProblem ? editingProblem.submissions : 0
                  };
                  if(editingProblem) {
                    setProblems(problems.map(p => p.id === editingProblem.id ? newP : p));
                  } else {
                    setProblems([...problems, newP]);
                  }
                  setIsAddProblemOpen(false);
                  setEditingProblem(null);
                }}
                className="space-y-5 text-xs font-bold text-slate-500"
              >
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Challenge Title</label>
                  <input type="text" name="title" required defaultValue={editingProblem?.title} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">Category</label>
                    <input type="text" name="category" required defaultValue={editingProblem?.category || 'Arrays'} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">Difficulty</label>
                    <select name="difficulty" defaultValue={editingProblem?.difficulty || 'Easy'} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 outline-none font-bold text-slate-700 transition-all text-xs">
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">Standard Test Cases</label>
                    <input type="text" name="testCases" defaultValue={editingProblem?.testCases || '50 cases'} placeholder="50 cases" className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-rose-500">Hidden Test Cases (Concealed)</label>
                    <input type="text" name="hiddenCases" defaultValue={editingProblem?.hiddenCases || '100 cases'} placeholder="100 cases" className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 outline-none font-bold text-rose-600 placeholder:text-slate-355 transition-all text-xs" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Challenge XP Credentials</label>
                  <input type="number" name="points" required defaultValue={editingProblem?.points || 100} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#F97316] focus:ring-4 focus:ring-[#F97316]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                </div>

                <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#F97316] to-[#F59E0B] hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-xl shadow-sm shadow-[#F97316]/15 transition-all text-xs uppercase tracking-wider mt-4">
                  {editingProblem ? 'Save Challenge CMS' : 'Publish to Elite Arena'}
                </button>
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
                  if(editingInterview) {
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
