import { 
  LayoutDashboard, 
  BookOpen, 
  Code, 
  Users, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  User
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };
  
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Courses', icon: <BookOpen size={20} />, path: '/courses' },
    { name: 'Practice', icon: <Code size={20} />, path: '/practice' },
    { name: 'Interview Prep', icon: <Users size={20} />, path: '/interview' },
    { name: 'Admin Hub', icon: <Settings size={20} />, path: '/admin' },
  ];

  return (
    <motion.div 
      animate={{ width: isCollapsed ? 90 : 280 }}
      className="h-screen fixed left-0 top-0 bg-[#0F172A] border-r border-white/5 flex flex-col z-[100] overflow-hidden"
    >
      {/* Sidebar Header */}
      <div className="p-8 mb-6">
        <Link to="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-500/20 group-hover:rotate-6 transition-transform flex-shrink-0">
            G
          </div>
          {!isCollapsed && (
            <span className="text-xl font-black tracking-tight text-white">
              Guru<span className="text-gradient-rose">Bramha</span>
            </span>
          )}
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-grow px-6 space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all relative group ${
              location.pathname === item.path 
                ? 'bg-[#FFB800] text-[#0F172A] shadow-lg shadow-[#FFB800]/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className="flex-shrink-0">{item.icon}</div>
            {!isCollapsed && <span className="font-bold text-sm tracking-wide">{item.name}</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-6 px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-white/10">
                {item.name}
              </div>
            )}
          </Link>
        ))}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-6 border-t border-white/5 space-y-3 bg-white/5 backdrop-blur-sm">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center gap-4 px-5 py-4 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          {!isCollapsed && <span className="font-bold text-sm">Collapse</span>}
        </button>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-5 py-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all"
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="font-bold text-sm">Sign Out</span>}
        </button>
      </div>
    </motion.div>
  );
};

const AppLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="flex min-h-screen bg-[#0F172A] selection:bg-[#FFB800]/30">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      <main 
        className="flex-grow transition-all duration-300 min-h-screen flex flex-col"
        style={{ marginLeft: isCollapsed ? 90 : 280 }}
      >
        {/* App Header */}
        <header className="sticky top-0 z-50 bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/5 px-10 py-5 flex items-center justify-between">
          <div className="relative w-full max-w-xl hidden md:block group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#FFB800] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search subjects, scholars, courses..."
              className="w-full pl-16 pr-6 py-3.5 bg-white/5 border border-white/5 rounded-[20px] outline-none focus:ring-4 focus:ring-[#FFB800]/10 focus:bg-white/10 transition-all text-sm font-bold text-white placeholder:text-slate-600"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="p-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl relative transition-all">
              <Bell size={22} />
              <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#FFB800] rounded-full border-2 border-[#0F172A] shadow-lg"></span>
            </button>
            <div className="h-8 w-px bg-white/10 mx-2"></div>
            <div className="relative profile-dropdown-container">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-4 p-1.5 hover:bg-white/5 rounded-3xl transition-all pr-5"
              >
                <div className="text-right hidden sm:block">
                  <p className="font-black text-sm text-white">{user?.displayName || 'Janu Gurubramha'}</p>
                  <p className="text-[10px] font-black text-[#FFB800] uppercase tracking-widest">Scholar Level 1</p>
                </div>
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-11 h-11 rounded-2xl object-cover shadow-2xl border border-white/10" />
                ) : (
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-2xl">
                    {user?.displayName ? user.displayName[0] : 'J'}
                  </div>
                )}
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-72 bg-[#0F172A] rounded-[32px] p-3 shadow-2xl border border-white/10 z-[100]"
                  >
                    <div className="px-6 py-5 border-b border-white/5 mb-3">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">Authenticated Scholar</p>
                      <p className="font-black text-white truncate text-base">{user?.displayName || 'Janu Gurubramha'}</p>
                      <p className="text-xs font-bold text-slate-500 truncate mt-1">{user?.email || 'janu@gurubramha.edu'}</p>
                    </div>
                    
                    <div className="space-y-1">
                      {[
                        { to: "/profile", icon: <User size={18} />, label: "Personal Profile" },
                        { to: "/courses", icon: <BookOpen size={18} />, label: "Academic Vault" },
                        { to: "/settings", icon: <Settings size={18} />, label: "System Preferences" }
                      ].map((item) => (
                        <Link 
                          key={item.to}
                          to={item.to} 
                          onClick={() => setShowProfileMenu(false)}
                          className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/5 rounded-2xl transition-all text-sm font-bold text-slate-400 hover:text-white"
                        >
                          {item.icon} {item.label}
                        </Link>
                      ))}
                    </div>
                    
                    <div className="h-px bg-white/5 my-3 mx-4"></div>
                    
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-4 px-5 py-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all text-sm font-black uppercase tracking-widest"
                    >
                      <LogOut size={18} /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <div className="p-10 flex-grow">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
