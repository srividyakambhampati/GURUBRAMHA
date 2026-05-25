import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Search, 
  User, 
  Bell, 
  Book, 
  Code, 
  Trophy, 
  Star,
  ChevronDown,
  Settings,
  LogOut,
  UserCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest('.profile-dropdown-container')) {
        setShowProfileMenu(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  const navLinks = [
    { name: 'Courses', path: '/courses', icon: <Book size={18} /> },
    { name: 'Practice', path: '/practice', icon: <Code size={18} /> },
    { name: 'Interview', path: '/interview', icon: <Trophy size={18} /> },
  ];

  const profileLinks = [
    { name: 'My Profile', path: '/profile', icon: <UserCircle size={18} /> },
    { name: 'My Courses', path: '/my-courses', icon: <Book size={18} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={18} /> },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl py-2 shadow-lg shadow-slate-200/50' : 'bg-transparent py-3'}`}>
      <div className="section-container">
        <div className="flex items-center justify-between gap-8">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/20 group-hover:rotate-6 transition-transform">
                G
              </div>
              <span className={`text-2xl font-black tracking-tight ${scrolled ? 'text-slate-900' : location.pathname === '/' ? 'text-white' : 'text-slate-900'}`}>
                Guru<span className="text-orange-600">Bramha</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav - Center */}
          <div className="hidden lg:flex flex-grow justify-center">
            <div className="flex items-center bg-slate-50/50 p-1.5 rounded-2xl border border-slate-100/50 backdrop-blur-md">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                    location.pathname === link.path 
                      ? 'bg-white text-orange-600 shadow-sm' 
                      : (scrolled || location.pathname !== '/' ? 'text-slate-500 hover:text-orange-600' : 'text-slate-400 hover:text-white')
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Actions - Right */}
          <div className="hidden lg:flex items-center space-x-5 flex-shrink-0">
            <button className={`p-2.5 rounded-xl transition-all ${scrolled || location.pathname !== '/' ? 'text-slate-400 hover:text-orange-600 hover:bg-orange-50' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
              <Search size={20} />
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <button className={`p-2.5 rounded-xl relative transition-all ${scrolled || location.pathname !== '/' ? 'text-slate-400 hover:text-orange-600 hover:bg-orange-50' : 'text-white/70 hover:text-white hover:bg-white/10'}`}>
                  <Bell size={20} />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                
                {/* Profile Dropdown */}
                <div className="relative profile-dropdown-container">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowProfileMenu(!showProfileMenu);
                    }}
                    className="flex items-center space-x-2 p-1 bg-white border border-slate-100 rounded-full shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="w-9 h-9 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-sm">
                      {user.displayName?.[0] || 'U'}
                    </div>
                    <ChevronDown size={14} className={`text-slate-400 mr-2 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-60 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
                      >
                        <div className="p-6 bg-slate-50 border-b border-slate-100">
                          <p className="text-sm font-black text-slate-900 line-clamp-1">{user.displayName || 'Scholar'}</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Premium Learner</p>
                        </div>
                        <div className="p-3">
                          {profileLinks.map((link) => (
                            <Link 
                              key={link.name}
                              to={link.path}
                              onClick={() => setShowProfileMenu(false)}
                              className="flex items-center gap-3 p-3 rounded-2xl text-sm font-bold text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-all"
                            >
                              {link.icon}
                              {link.name}
                            </Link>
                          ))}
                          <div className="h-px bg-slate-100 my-2"></div>
                          <button 
                            onClick={() => {
                              logout();
                              setShowProfileMenu(false);
                            }}
                            className="w-full flex items-center gap-3 p-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
                          >
                            <LogOut size={18} />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className={`text-sm font-bold px-4 ${scrolled || location.pathname !== '/' ? 'text-slate-600 hover:text-orange-600' : 'text-white hover:text-white/80'}`}>Log in</Link>
                <Link to="/signup" className="btn-primary !px-6 !py-2.5 !text-sm !shadow-none hover:scale-105 active:scale-95 transition-all">Join for Free</Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button 
            className={`lg:hidden p-2 rounded-xl ${scrolled || location.pathname !== '/' ? 'text-slate-600 hover:bg-slate-50' : 'text-white hover:bg-white/10'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-8 space-y-6">
              {user && (
                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-3xl mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center text-white font-bold text-xl">
                    {user.displayName?.[0] || 'U'}
                  </div>
                  <div>
                    <p className="font-black text-slate-900">{user.displayName || 'Scholar'}</p>
                    <p className="text-xs font-bold text-orange-600 uppercase tracking-widest">Premium Account</p>
                  </div>
                </div>
              )}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 text-lg font-bold text-slate-700 hover:text-orange-600 p-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-orange-600">
                    {link.icon}
                  </div>
                  {link.name}
                </Link>
              ))}
              <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
                {user ? (
                   profileLinks.map((link) => (
                    <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="flex items-center gap-4 text-lg font-bold text-slate-700 p-2">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                            {link.icon}
                        </div>
                        {link.name}
                    </Link>
                   ))
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="btn-secondary text-center">Log In</Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)} className="btn-primary text-center">Sign Up</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
