import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const Admin = () => {
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

  const [courses, setCourses] = useState([
    { id: 1, name: 'Python for Beginners', instructor: 'Dr. Smith', category: 'Programming', price: 2999, isPremium: true, status: 'Published', students: 1240, watchTime: '1,450 hrs', demoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', notesName: 'python_essentials_vol1.pdf' },
    { id: 2, name: 'Full Stack JavaScript', instructor: 'Dev Karan', category: 'Web Development', price: 4999, isPremium: true, status: 'Published', students: 850, watchTime: '980 hrs', demoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4', notesName: 'js_advanced_guide.pdf' },
    { id: 3, name: 'Advanced Java Mastery', instructor: 'Sarah Johnson', category: 'Programming', price: 3999, isPremium: true, status: 'Draft', students: 0, watchTime: '0 hrs', demoUrl: '', notesName: '' },
    { id: 4, name: 'React Native Blueprint', instructor: 'Alex Lee', category: 'Mobile Dev', price: 3499, isPremium: false, status: 'Published', students: 420, watchTime: '510 hrs', demoUrl: '', notesName: 'mobile_basics.pdf' },
    { id: 5, name: 'Machine Learning A-Z', instructor: 'Dr. Elena', category: 'Data Science', price: 6999, isPremium: true, status: 'Scheduled', students: 0, watchTime: '0 hrs', demoUrl: '', notesName: '' },
  ]);

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
    { label: 'Total Scholars', value: users.length, sub: 'Active & Free', icon: <Users size={20} />, bgClass: 'bg-[#EEF4FF]', iconClass: 'text-[#4F8CFF]' },
    { label: 'Subscribed Users', value: users.filter(u => u.subStatus === 'Active').length, sub: 'Active Plans', icon: <CheckCircle size={20} />, bgClass: 'bg-[#E6F8F0]', iconClass: 'text-[#10B981]' },
    { label: 'Total Courses Offered', value: courses.length, sub: 'LMS catalog', icon: <BookOpen size={20} />, bgClass: 'bg-[#F5F3FF]', iconClass: 'text-[#7C6CFF]' },
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
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex selection:bg-indigo-500/10 relative overflow-hidden font-sans">
      
      {/* 1. Left Sleek Bento Sidebar Navigation */}
      <aside className="w-80 bg-white/70 backdrop-blur-xl border-r border-slate-200/40 p-8 flex flex-col justify-between hidden lg:flex h-screen sticky top-0 z-40">
        <div className="space-y-12">
          {/* Logo Brand area */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-tr from-[#4F8CFF] to-[#7C6CFF] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-[#4F8CFF]/15">
              G
            </div>
            <div>
              <h2 className="font-extrabold text-lg leading-tight tracking-tight text-slate-900">GuruBramha</h2>
              <span className="text-[10px] font-bold text-[#7C6CFF] uppercase tracking-widest bg-[#F5F3FF] border border-[#7C6CFF]/10 px-2.5 py-0.5 rounded-full">LMS Console</span>
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
                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all duration-300 relative ${
                  activeTab === tab.id 
                    ? 'bg-[#EEF4FF] text-[#4F8CFF] shadow-sm shadow-[#4F8CFF]/5 border border-[#4F8CFF]/10' 
                    : 'text-[#64748B] hover:bg-[#EEF4FF]/30 hover:text-[#4F8CFF] hover:translate-x-1'
                }`}
              >
                <span className={`${activeTab === tab.id ? 'text-[#4F8CFF]' : 'text-slate-400'}`}>{tab.icon}</span>
                <span className="flex-grow text-left">{tab.name}</span>
                {activeTab === tab.id && <ChevronRight size={14} className="text-[#4F8CFF]" />}
              </button>
            ))}
          </nav>
        </div>

        {/* User administrative profile footer */}
        <div className="bg-[#F8FAFC]/55 rounded-2xl p-4.5 flex items-center gap-4 border border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center font-bold text-white shadow-md">
            AG
          </div>
          <div>
            <p className="text-xs font-black uppercase text-slate-800 tracking-wider">Admin Guru</p>
            <p className="text-[10px] font-bold text-slate-400">Super Administrator</p>
          </div>
        </div>
      </aside>

      {/* 2. Main Portal Scrollable Viewport */}
      <main className="flex-grow min-h-screen flex flex-col p-6 sm:p-10 lg:p-12 overflow-y-auto w-full">
        
        {/* Mobile Header / Quick Switch */}
        <div className="lg:hidden flex items-center justify-between mb-8 bg-white p-5 rounded-3xl border border-slate-200/50 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg">G</div>
            <span className="font-extrabold text-sm uppercase tracking-wider text-slate-800">GuruBramha Admin</span>
          </div>
          <select 
            value={activeTab} 
            onChange={(e) => setActiveTab(e.target.value)}
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-indigo-600 uppercase tracking-widest outline-none"
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
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
              {/* Header Title */}
              <div>
                <span className="text-xs font-black uppercase text-[#7C6CFF] tracking-[0.15em] bg-[#F5F3FF] border border-[#7C6CFF]/10 px-3.5 py-1.5 rounded-full">Overview Analytics</span>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mt-4">LMS Management Dashboard</h1>
                <p className="text-slate-500 font-bold text-sm tracking-wide mt-1">Real-time metrics, payment tracking, and analytics index.</p>
              </div>

              {/* Stats bento deck */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsOverview.map((item, i) => (
                  <div key={i} className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative group cursor-default overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4F8CFF] to-[#7C6CFF] opacity-0 group-hover:opacity-100 transition-opacity rounded-t-full"></div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.15em]">{item.label}</span>
                      <div className={`p-3 ${item.bgClass} ${item.iconClass} rounded-xl transition-all duration-300`}>{item.icon}</div>
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">{item.value}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{item.sub}</p>
                  </div>
                ))}
              </div>

              {/* Graphic Chart Bento Zone (Requirement 1 & 14) */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* SVG Revenue Line Chart */}
                <div className="bg-white border border-slate-200/50 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[450px]">
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">LMS Sales Growth Metrics</h4>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">Monthly Subscriptions Graph</h3>
                      </div>
                      <span className="px-4 py-1.5 bg-[#E6F8F0] text-[#10B981] text-[10px] font-black uppercase tracking-widest rounded-full flex items-center gap-1.5 border border-[#10B981]/10">
                        <TrendingUp size={12} /> +18.4% YoY
                      </span>
                    </div>
                  </div>
                  {/* Styled Animated SVG Chart */}
                  <div className="flex-grow flex items-end justify-center relative text-[#4F8CFF]">
                    <svg viewBox="0 0 500 180" className="w-full h-full pr-4">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgb(79, 140, 255)" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="rgb(124, 108, 255)" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,150 Q50,90 100,120 T200,60 T300,90 T400,30 T500,10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        className="animate-pulse"
                      />
                      <path
                        d="M0,150 Q50,90 100,120 T200,60 T300,90 T400,30 T500,10 L500,180 L0,180 Z"
                        fill="url(#chartGrad)"
                      />
                      {/* Grid Lines */}
                      <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(0,0,0,0.02)" strokeDasharray="5 5" />
                      <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(0,0,0,0.02)" strokeDasharray="5 5" />
                      <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(0,0,0,0.02)" strokeDasharray="5 5" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest pt-6 border-t border-slate-100 mt-4">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May (Current)</span>
                  </div>
                </div>

                {/* SVG Active Students Bar Chart */}
                <div className="bg-white border border-slate-200/50 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-[450px]">
                  <div>
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">Scholar Engagement index</h4>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-1">Coding Practice Arena Activity</h3>
                  </div>
                  <div className="flex-grow flex items-end justify-between gap-4 px-4 h-48 mt-10">
                    {[
                      { label: 'Week 1', height: '35%', count: 420 },
                      { label: 'Week 2', height: '65%', count: 850 },
                      { label: 'Week 3', height: '50%', count: 680 },
                      { label: 'Week 4', height: '85%', count: 1240 },
                      { label: 'Week 5', height: '95%', count: 1450 },
                    ].map((bar, index) => (
                      <div key={index} className="flex-grow flex flex-col items-center group cursor-pointer">
                        <span className="text-[10px] font-black text-slate-500 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white px-2.5 py-1 rounded-md">
                          {bar.count}
                        </span>
                        <div className="w-full bg-slate-50 rounded-t-xl overflow-hidden h-36 flex items-end relative shadow-inner">
                          <div 
                            className="w-full bg-gradient-to-t from-[#4F8CFF] to-[#7C6CFF] rounded-t-xl group-hover:brightness-105 transition-all duration-500" 
                            style={{ height: bar.height }}
                          ></div>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 mt-3 uppercase tracking-wider">{bar.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest pt-6 border-t border-slate-100 mt-4">
                    <span>LMS Arena Activity log index (Updates Realtime)</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity Log Deck */}
              <div className="bg-white border border-slate-200/50 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <Activity size={18} className="text-[#7C6CFF]" /> Recent Administrative Activity Logs
                </h3>
                <div className="space-y-4">
                  {[
                    { log: 'Alex Mercer initialized dry run on "Two Sum"', time: '12 mins ago', type: 'practice' },
                    { log: 'New subscription processed: Priya Sharma (Plan: Monthly, Transaction: GB2026SUB0002)', time: '2 hrs ago', type: 'payment' },
                    { log: 'Platform administrator uploaded "python_essentials_vol1.pdf" resource doc', time: '1 day ago', type: 'system' },
                    { log: 'Broadcast: Promotional Announcement "Summer Internship Drive 2026" triggered', time: '2 days ago', type: 'broadcast' },
                  ].map((act, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-[#F8FAFC]/55 hover:bg-[#EEF4FF]/10 rounded-2xl border border-slate-100/40 transition-all duration-200">
                      <div className="flex items-center gap-4">
                        <div className={`w-2.5 h-2.5 rounded-full ${
                          act.type === 'practice' ? 'bg-[#7C6CFF]' :
                          act.type === 'payment' ? 'bg-[#10B981]' :
                          act.type === 'system' ? 'bg-[#4F8CFF]' : 'bg-[#F59E0B]'
                        }`}></div>
                        <span className="text-sm font-bold text-slate-700">{act.log}</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{act.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: USER MANAGEMENT */}
          {activeTab === 'users' && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 font-sans">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-black uppercase text-[#7C6CFF] tracking-[0.15em] bg-[#F5F3FF] border border-[#7C6CFF]/10 px-3.5 py-1.5 rounded-full">User Accounts Directory</span>
                  <h1 className="text-4xl font-black text-slate-900 mt-4">LMS Scholar Management</h1>
                  <p className="text-slate-500 font-bold text-sm tracking-wide mt-1">Suspend, delete, review courses log, and manage roles.</p>
                </div>
                <button 
                  onClick={() => setIsAddUserOpen(true)}
                  className="px-6 py-3.5 bg-gradient-to-r from-[#4F8CFF] to-[#7C6CFF] hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-xl shadow-sm shadow-[#4F8CFF]/15 transition-all flex items-center justify-center gap-2 self-start sm:self-auto text-xs uppercase tracking-wider"
                >
                  <Plus size={18} /> Enroll New Scholar
                </button>
              </div>

              {/* Filtering Search Bar */}
              <div className="bg-white border border-slate-200/50 rounded-2xl !p-5 flex flex-col md:flex-row items-center gap-6 shadow-sm shadow-slate-100/30">
                <div className="relative flex-grow w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search scholars by name, email coordinates, or phone number..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-200/50 rounded-xl focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 placeholder:text-slate-300 transition-all text-xs"
                  />
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white border border-slate-200/50 rounded-3xl overflow-hidden shadow-sm shadow-slate-100/50">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-left text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-50/50 border-b border-slate-200/40 sticky top-0 z-10">
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
                          <tr key={user.id} className="hover:bg-[#EEF4FF]/10 even:bg-slate-50/30 transition-all duration-200 text-xs font-semibold text-[#0F172A]">
                            <td className="px-8 py-4.5 text-center font-bold text-slate-400">{i + 1}</td>
                            <td className="px-8 py-4.5">
                              <div className="flex items-center gap-4">
                                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-slate-100 shadow-sm" />
                                <div>
                                  <p className="font-black text-slate-900 leading-none">{user.name}</p>
                                  <span className="text-[11px] text-slate-400 font-semibold mt-1 inline-block">{user.email}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-4.5 font-bold text-slate-500">{user.phone}</td>
                            <td className="px-8 py-4.5 font-bold text-slate-400">{user.joinedDate}</td>
                            <td className="px-8 py-4.5">
                              <span className="px-3 py-1 bg-slate-50 border border-slate-200/30 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-wider">{user.activeDuration}</span>
                            </td>
                            <td className="px-8 py-4.5 text-center">
                              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                user.subStatus === 'Active' ? 'bg-[#DEF7EC] text-[#03543F]' :
                                user.subStatus === 'Free' ? 'bg-[#EEF4FF] text-[#4F8CFF]' :
                                'bg-[#FDF2F2] text-[#EF4444]'
                              }`}>
                                {user.subStatus} {user.plan !== 'None' ? `(${user.plan})` : ''}
                              </span>
                            </td>
                            <td className="px-8 py-4.5 text-right">
                              <div className="flex items-center justify-end gap-2.5">
                                <button 
                                  onClick={() => setEditingUser(user)}
                                  className="p-2.5 bg-[#EEF4FF] border border-transparent hover:border-[#4F8CFF]/10 rounded-xl text-[#4F8CFF] hover:bg-[#EEF4FF]/80 hover:scale-105 active:scale-95 transition-all"
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
                                  className="p-2.5 bg-amber-50 border border-transparent hover:border-amber-200/40 rounded-xl text-amber-600 hover:bg-amber-100 hover:scale-105 active:scale-95 transition-all"
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
                  <span className="text-xs font-black uppercase text-[#7C6CFF] tracking-[0.15em] bg-[#F5F3FF] border border-[#7C6CFF]/10 px-3.5 py-1.5 rounded-full">LMS COURSE CMS</span>
                  <h1 className="text-4xl font-black text-slate-900 mt-4">LMS Course Management</h1>
                  <p className="text-slate-500 font-bold text-sm tracking-wide mt-1">Upload videos, attach notes/PDFs, set pricing, and manage status.</p>
                </div>
                <button 
                  onClick={() => setIsAddCourseOpen(true)}
                  className="px-6 py-3.5 bg-gradient-to-r from-[#4F8CFF] to-[#7C6CFF] hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-xl shadow-sm shadow-[#4F8CFF]/15 transition-all flex items-center justify-center gap-2 self-start sm:self-auto text-xs uppercase tracking-wider"
                >
                  <Plus size={18} /> Add New Course
                </button>
              </div>

              {/* Filtering Search Bar */}
              <div className="bg-white border border-slate-200/50 rounded-2xl !p-5 flex flex-col md:flex-row items-center gap-6 shadow-sm shadow-slate-100/30">
                <div className="relative flex-grow w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                    placeholder="Search courses catalog by name, instructor, or structural topic..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-200/50 rounded-xl focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 placeholder:text-slate-300 transition-all text-xs"
                  />
                </div>
              </div>

              {/* Courses Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {courses
                  .filter(c => c.name.toLowerCase().includes(courseSearch.toLowerCase()) || c.instructor.toLowerCase().includes(courseSearch.toLowerCase()))
                  .map((course) => (
                    <div key={course.id} className="bg-white border border-slate-200/50 rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4F8CFF] to-[#7C6CFF] opacity-0 group-hover:opacity-100 transition-opacity rounded-t-full"></div>
                      
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <span className="px-3.5 py-1 bg-[#EEF4FF] text-[#4F8CFF] text-[10px] font-black uppercase tracking-wider rounded-md border border-[#4F8CFF]/10">
                            {course.category}
                          </span>
                          <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-md ${
                            course.status === 'Published' ? 'bg-[#DEF7EC] text-[#03543F]' :
                            course.status === 'Scheduled' ? 'bg-[#FFF7ED] text-[#F97316]' :
                            'bg-[#F3F4F6] text-[#4B5563]'
                          }`}>
                            {course.status}
                          </span>
                        </div>
 
                        <div>
                          <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">{course.name}</h3>
                          <p className="text-xs font-bold text-slate-400 mt-1">Instructor: <span className="text-slate-700 font-semibold">{course.instructor}</span></p>
                        </div>
 
                        <div className="space-y-3 bg-[#F8FAFC]/55 border border-slate-100/40 rounded-2xl p-4.5 text-xs font-semibold text-slate-500">
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-slate-400"><Video size={14} /> Video Resource:</span>
                            <span className="font-bold text-slate-700">{course.demoUrl ? `${course.demoUrl} ✅` : 'No Media Uploaded'}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-slate-400"><FileText size={14} /> Syllabus PDF:</span>
                            <span className="font-bold text-slate-700 truncate max-w-[150px]">{course.notesName || 'No Notes Attached'}</span>
                          </div>
                          <div className="flex items-center justify-between border-t border-slate-100/50 pt-2 mt-2">
                            <span className="text-slate-400">Watch time logged:</span>
                            <span className="font-bold text-slate-700">{course.watchTime || '0'} hrs</span>
                          </div>
                        </div>
                      </div>
 
                      <div className="mt-8 pt-6 border-t border-slate-100/60">
                        <div className="flex items-center justify-between mb-5">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Course Pricing</p>
                            <p className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">₹{course.price.toLocaleString()}</p>
                          </div>
                          <span className="px-3.5 py-1.5 bg-[#FFFBEB] text-[#D97706] text-[9px] font-black uppercase tracking-widest rounded-md border border-[#D97706]/10 flex items-center gap-1">
                            ★ Premium Access
                          </span>
                        </div>
 
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => setEditingCourse(course)}
                            className="flex-grow py-3.5 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                          >
                            <Edit size={14} /> Edit Course CMS
                          </button>
                          <button 
                            onClick={() => {
                              if(confirm(`Erase ${course.name} from platform catalog permanently?`)) {
                                setCourses(courses.filter(c => c.id !== course.id));
                              }
                            }}
                            className="p-3.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl hover:scale-105 active:scale-95 transition-all duration-150"
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
                  <span className="text-xs font-black uppercase text-indigo-600 tracking-[0.2em] bg-indigo-50 px-3 py-1 rounded-full">Coding Challenges Sandbox CMS</span>
                  <h1 className="text-4xl font-black text-slate-900 mt-3">Elite Arena Management</h1>
                  <p className="text-slate-500 font-bold text-sm tracking-wide mt-1">Configure dry-run constraints, add test cases, and review student stats.</p>
                </div>
                <button 
                  onClick={() => setIsAddProblemOpen(true)}
                  className="btn-primary flex items-center justify-center gap-2 self-start sm:self-auto"
                >
                  <Plus size={18} /> Add Arena Challenge
                </button>
              </div>

              {/* Filtering Search Bar */}
              <div className="glass-card !p-6 flex flex-col md:flex-row items-center gap-6">
                <div className="relative flex-grow w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    value={problemSearch}
                    onChange={(e) => setProblemSearch(e.target.value)}
                    placeholder="Search challenges database by challenge title, index or structural category..."
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500/10 outline-none font-bold text-slate-700 placeholder:text-slate-300"
                  />
                </div>
              </div>

              {/* Problems Grid Table */}
              <div className="glass rounded-[2.5rem] overflow-hidden shadow-2xl bg-white border border-slate-200/50">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs font-black text-slate-400 uppercase tracking-widest bg-slate-50/50 border-b border-slate-100">
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
                    <tbody className="divide-y divide-slate-100/70">
                      {problems
                        .filter(p => p.title.toLowerCase().includes(problemSearch.toLowerCase()) || p.category.toLowerCase().includes(problemSearch.toLowerCase()))
                        .map((prob, i) => (
                          <tr key={prob.id} className="hover:bg-[#EEF4FF]/10 even:bg-slate-50/30 transition-all duration-200 text-xs font-semibold text-[#0F172A]">
                            <td className="px-8 py-4.5 text-center font-bold text-slate-400">{i + 1}</td>
                            <td className="px-8 py-4.5 font-black text-slate-900">{prob.title}</td>
                            <td className="px-8 py-4.5">
                              <span className="px-3 py-1 bg-[#EEF4FF] text-[#4F8CFF] rounded-lg text-[10px] font-black uppercase tracking-wider border border-[#4F8CFF]/10">{prob.category}</span>
                            </td>
                            <td className="px-8 py-4.5 text-center font-bold text-slate-500">{prob.testCases}</td>
                            <td className="px-8 py-4.5 text-center font-bold text-rose-600 bg-rose-50/40 rounded-lg">{prob.hiddenCases}</td>
                            <td className="px-8 py-4.5 text-center font-black text-slate-900">+{prob.points} XP</td>
                            <td className="px-8 py-4.5 text-center">
                              <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                prob.difficulty === 'Easy' ? 'bg-[#DEF7EC] text-[#03543F]' :
                                prob.difficulty === 'Medium' ? 'bg-[#FFF7ED] text-[#F97316]' : 'bg-[#FDF2F2] text-[#EF4444]'
                              }`}>{prob.difficulty}</span>
                            </td>
                            <td className="px-8 py-4.5 text-right">
                              <div className="flex items-center justify-end gap-2.5">
                                <button 
                                  onClick={() => setEditingProblem(prob)}
                                  className="p-2.5 bg-[#EEF4FF] border border-transparent hover:border-[#4F8CFF]/10 rounded-xl text-[#4F8CFF] hover:bg-[#EEF4FF]/80 hover:scale-105 active:scale-95 transition-all"
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
                  <span className="text-xs font-black uppercase text-[#7C6CFF] tracking-[0.15em] bg-[#F5F3FF] border border-[#7C6CFF]/10 px-3.5 py-1.5 rounded-full">Interview Preparation Deck CMS</span>
                  <h1 className="text-4xl font-black text-slate-900 mt-4">Interview Preparation Management</h1>
                  <p className="text-slate-500 font-bold text-sm tracking-wide mt-1">Upload company preparation guides, aptitude, HR, and technical rounds.</p>
                </div>
                <button 
                  onClick={() => setIsAddInterviewOpen(true)}
                  className="px-6 py-3.5 bg-gradient-to-r from-[#4F8CFF] to-[#7C6CFF] hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-xl shadow-sm shadow-[#4F8CFF]/15 transition-all flex items-center justify-center gap-2 self-start sm:self-auto text-xs uppercase tracking-wider"
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
                  <span className="text-xs font-black uppercase text-[#7C6CFF] tracking-[0.15em] bg-[#F5F3FF] border border-[#7C6CFF]/10 px-3.5 py-1.5 rounded-full">Subscriptions Vault</span>
                  <h1 className="text-4xl font-black text-slate-900 mt-4">LMS Sales & Subscriptions</h1>
                  <p className="text-slate-500 font-bold text-sm tracking-wide mt-1">Automatic Transaction ID indexing, GST PDF Invoicing, and Razorpay logs.</p>
                </div>
                <button 
                  onClick={exportSubscriptionsCSV}
                  className="px-6 py-3.5 bg-[#EEF4FF] hover:bg-[#EEF4FF]/80 text-[#4F8CFF] border border-[#4F8CFF]/10 font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
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
                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-slate-200/50 rounded-xl focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 placeholder:text-slate-300 transition-all text-xs"
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
                          <tr key={sub.id} className="hover:bg-[#EEF4FF]/10 even:bg-slate-50/30 transition-all duration-200 text-xs font-semibold text-[#0F172A]">
                            <td className="px-8 py-4.5 text-center font-bold text-slate-400">{i + 1}</td>
                            <td className="px-8 py-4.5 font-black text-slate-900 text-sm">{sub.name}</td>
                            <td className="px-8 py-4.5 space-y-1">
                              <p className="font-bold text-slate-700">{sub.email}</p>
                              <p className="text-[10px] text-slate-400 font-bold">{sub.phone}</p>
                            </td>
                            <td className="px-8 py-4.5">
                              <span className={`px-3 py-1 rounded-lg font-black uppercase tracking-wider text-[10px] ${
                                sub.plan === 'Yearly' ? 'bg-[#FFFBEB] text-[#D97706] border border-[#D97706]/10' : 'bg-[#EEF4FF] text-[#4F8CFF] border border-[#4F8CFF]/10'
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
                                  className="px-3 py-2 bg-[#EEF4FF] border border-[#4F8CFF]/10 text-[#4F8CFF] hover:bg-[#EEF4FF]/80 rounded-xl transition-all flex items-center gap-1.5 font-bold uppercase text-[9px] tracking-wider hover:scale-[1.02] active:scale-[0.98]"
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
                  <span className="text-xs font-black uppercase text-[#7C6CFF] tracking-[0.15em] bg-[#F5F3FF] border border-[#7C6CFF]/10 px-3.5 py-1.5 rounded-full">Scholar Alerts Log</span>
                  <h1 className="text-4xl font-black text-slate-900 mt-4">Notification Broadcast Control</h1>
                  <p className="text-slate-500 font-bold text-sm tracking-wide mt-1">Broadcast reminders, announcements, and promotional decks instantly.</p>
                </div>
                <button 
                  onClick={() => setIsNewNotificationOpen(true)}
                  className="px-6 py-3.5 bg-gradient-to-r from-[#4F8CFF] to-[#7C6CFF] hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-xl shadow-sm shadow-[#4F8CFF]/15 transition-all flex items-center justify-center gap-2 self-start sm:self-auto text-xs uppercase tracking-wider"
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
                        <tr key={notif.id} className="hover:bg-[#EEF4FF]/10 even:bg-slate-50/30 transition-all duration-200 text-xs font-semibold text-[#0F172A]">
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
                <span className="text-xs font-black uppercase text-[#7C6CFF] tracking-[0.15em] bg-[#F5F3FF] border border-[#7C6CFF]/10 px-3.5 py-1.5 rounded-full">Branding & configs</span>
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
                      className="w-full p-4 bg-slate-50 border border-slate-200/40 rounded-2xl outline-none focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 font-bold text-slate-700 transition-all" 
                    />
                  </div>
 
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Monthly Tier Plan (₹)</label>
                      <input 
                        type="text" 
                        value={brandingSettings.pricingMonthly}
                        onChange={(e) => setBrandingSettings({...brandingSettings, pricingMonthly: e.target.value})}
                        className="w-full p-4 bg-slate-50 border border-slate-200/40 rounded-2xl outline-none focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 font-bold text-slate-700 transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Yearly Tier Plan (₹)</label>
                      <input 
                        type="text" 
                        value={brandingSettings.pricingYearly}
                        onChange={(e) => setBrandingSettings({...brandingSettings, pricingYearly: e.target.value})}
                        className="w-full p-4 bg-slate-50 border border-slate-200/40 rounded-2xl outline-none focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 font-bold text-slate-700 transition-all" 
                      />
                    </div>
                  </div>
 
                  <button 
                    onClick={() => alert('CMS Branding and configuration successfully saved in MongoDB instance!')}
                    className="w-full py-4 bg-gradient-to-r from-[#4F8CFF] to-[#7C6CFF] hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-2xl shadow-sm shadow-[#4F8CFF]/15 transition-all text-xs font-black uppercase tracking-wider mt-4"
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
                      className="w-full p-4 bg-slate-50 border border-slate-200/40 rounded-2xl outline-none focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 font-mono font-bold text-slate-700 transition-all" 
                    />
                  </div>
 
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Federal GST Percentage breakdown (%)</label>
                    <input 
                      type="number" 
                      value={brandingSettings.gstPercentage}
                      onChange={(e) => setBrandingSettings({...brandingSettings, gstPercentage: e.target.value})}
                      className="w-full p-4 bg-slate-50 border border-slate-200/40 rounded-2xl outline-none focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 font-bold text-slate-700 transition-all" 
                    />
                  </div>
 
                  <div className="p-4 bg-[#FFFBEB] text-[#D97706] rounded-2xl border border-[#D97706]/10 text-xs font-semibold leading-relaxed flex gap-3">
                    <AlertCircle size={18} className="flex-shrink-0 text-[#D97706]" />
                    <span>LMS Payment sandbox is currently in Test Mode. Auto-generation of Transaction ID protocol is live.</span>
                  </div>
 
                  <button 
                    onClick={() => alert('Razorpay gateway parameters successfully saved in local process environment!')}
                    className="w-full py-4 bg-[#EEF4FF] hover:bg-[#EEF4FF]/80 text-[#4F8CFF] border border-[#4F8CFF]/10 font-bold rounded-2xl active:scale-[0.98] transition-all text-xs font-black uppercase tracking-wider mt-4"
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
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-[20px] flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-indigo-100">
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
                  <h3 className="text-2xl font-black text-slate-950 mt-4">Total Paid: <span className="text-indigo-600 ml-4">₹{selectedInvoice.amount.toLocaleString()}</span></h3>
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
                onClick={() => { setIsAddCourseOpen(false); setEditingCourse(null); }} 
                className="absolute top-6 right-6 w-9 h-9 bg-slate-50 border border-slate-200/55 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:scale-105 transition-all"
              >
                ✕
              </button>

              <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6 mt-2">
                {editingCourse ? 'Edit Course Details' : 'Add New LMS Course'}
              </h2>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.target);
                  const newC = {
                    id: editingCourse ? editingCourse.id : courses.length + 1,
                    name: data.get('name'),
                    instructor: data.get('instructor'),
                    category: data.get('category'),
                    price: Number(data.get('price')),
                    isPremium: data.get('isPremium') === 'on',
                    status: data.get('status'),
                    students: editingCourse ? editingCourse.students : 0,
                    watchTime: editingCourse ? editingCourse.watchTime : '0 hrs',
                    demoUrl: data.get('demoUrl'),
                    notesName: data.get('notesName')
                  };
                  if(editingCourse) {
                    setCourses(courses.map(c => c.id === editingCourse.id ? newC : c));
                  } else {
                    setCourses([...courses, newC]);
                  }
                  setIsAddCourseOpen(false);
                  setEditingCourse(null);
                }}
                className="space-y-5 text-xs font-bold text-slate-500"
              >
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Course Title</label>
                  <input type="text" name="name" required defaultValue={editingCourse?.name} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 placeholder:text-slate-350 transition-all text-xs" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">Instructor</label>
                    <input type="text" name="instructor" required defaultValue={editingCourse?.instructor} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">Category</label>
                    <input type="text" name="category" required defaultValue={editingCourse?.category || 'Programming'} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">Pricing (₹)</label>
                    <input type="number" name="price" required defaultValue={editingCourse?.price || 2999} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">LMS Status</label>
                    <select name="status" defaultValue={editingCourse?.status || 'Published'} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 transition-all text-xs">
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                      <option value="Scheduled">Scheduled</option>
                    </select>
                  </div>
                </div>

                {/* Media assets */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Mock Video Resource link</label>
                  <input type="text" name="demoUrl" defaultValue={editingCourse?.demoUrl} placeholder="https://..." className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-mono font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Attached Syllabus Document (Notes PDF)</label>
                  <input type="text" name="notesName" defaultValue={editingCourse?.notesName} placeholder="python_syllabus.pdf" className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                </div>

                <div className="flex items-center justify-between p-4 bg-[#F8FAFC]/65 rounded-xl border border-slate-200/40">
                  <span className="font-bold text-slate-650 text-xs">Lock course under Premium Tier?</span>
                  <input type="checkbox" name="isPremium" defaultChecked={editingCourse?.isPremium} className="w-5 h-5 accent-[#4F8CFF] rounded cursor-pointer" />
                </div>

                <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#4F8CFF] to-[#7C6CFF] hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-xl shadow-sm shadow-[#4F8CFF]/15 transition-all text-xs uppercase tracking-wider mt-4">
                  {editingCourse ? 'Save Changes' : 'Publish Course'}
                </button>
              </form>
            </motion.div>
          </motion.div>
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
                  <input type="text" name="name" required defaultValue={editingUser?.name} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Email Coordinate</label>
                  <input type="email" name="email" required defaultValue={editingUser?.email} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Phone coordinates</label>
                  <input type="text" name="phone" required defaultValue={editingUser?.phone} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">Subscription Status</label>
                    <select name="subStatus" defaultValue={editingUser?.subStatus || 'Free'} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 transition-all text-xs">
                      <option value="Active">Active</option>
                      <option value="Free">Free</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">Tier Plan</label>
                    <select name="plan" defaultValue={editingUser?.plan || 'None'} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 transition-all text-xs">
                      <option value="None">None</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#4F8CFF] to-[#7C6CFF] hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-xl shadow-sm shadow-[#4F8CFF]/15 transition-all text-xs uppercase tracking-wider mt-4">
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
                  <input type="text" name="title" required defaultValue={editingProblem?.title} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">Category</label>
                    <input type="text" name="category" required defaultValue={editingProblem?.category || 'Arrays'} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">Difficulty</label>
                    <select name="difficulty" defaultValue={editingProblem?.difficulty || 'Easy'} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 transition-all text-xs">
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">Standard Test Cases</label>
                    <input type="text" name="testCases" defaultValue={editingProblem?.testCases || '50 cases'} placeholder="50 cases" className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-rose-500">Hidden Test Cases (Concealed)</label>
                    <input type="text" name="hiddenCases" defaultValue={editingProblem?.hiddenCases || '100 cases'} placeholder="100 cases" className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-rose-600 placeholder:text-slate-355 transition-all text-xs" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Challenge XP Credentials</label>
                  <input type="number" name="points" required defaultValue={editingProblem?.points || 100} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                </div>

                <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#4F8CFF] to-[#7C6CFF] hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-xl shadow-sm shadow-[#4F8CFF]/15 transition-all text-xs uppercase tracking-wider mt-4">
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
                    <input type="text" name="company" required defaultValue={editingInterview?.company} placeholder="Google" className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">Interview Category</label>
                    <input type="text" name="category" required defaultValue={editingInterview?.category || 'Algorithms'} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Specific Round Protocol Name</label>
                  <input type="text" name="round" required defaultValue={editingInterview?.round} placeholder="Technical Protocol 1" className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Number of Available Queries</label>
                  <input type="number" name="questions" required defaultValue={editingInterview?.questions || 10} className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400">Attached Study Material (Notes / Workbook name)</label>
                  <input type="text" name="materials" defaultValue={editingInterview?.materials} placeholder="System Design Workbook PDF" className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                </div>

                <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#4F8CFF] to-[#7C6CFF] hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-xl shadow-sm shadow-[#4F8CFF]/15 transition-all text-xs uppercase tracking-wider mt-4">
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
                  <input type="text" name="title" required placeholder="GuruBramha Summer Hackathon 2026 Registration open!" className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 placeholder:text-slate-355 transition-all text-xs" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">Alert Type Tag</label>
                    <select name="type" className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 transition-all text-xs">
                      <option value="Promotional">Promotional</option>
                      <option value="Reminder">Reminder</option>
                      <option value="System alert">System alert</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400">Target Segment</label>
                    <select name="target" className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200/50 rounded-xl focus:bg-white focus:border-[#4F8CFF] focus:ring-4 focus:ring-[#4F8CFF]/5 outline-none font-bold text-slate-700 transition-all text-xs">
                      <option value="All Scholars">All Scholars</option>
                      <option value="Monthly Users">Monthly Users Only</option>
                      <option value="Free Tier Scholars">Free Tier Scholars Only</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#4F8CFF] to-[#7C6CFF] hover:brightness-105 active:scale-[0.98] text-white font-bold rounded-xl shadow-sm shadow-[#4F8CFF]/15 transition-all text-xs uppercase tracking-wider mt-4">
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
