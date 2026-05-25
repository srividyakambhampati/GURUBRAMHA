import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Shield, 
  Bell, 
  CreditCard, 
  LogOut,
  ChevronRight,
  Award,
  CheckCircle2,
  Lock,
  Globe,
  Settings,
  Activity,
  Calendar,
  Code,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const Profile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (err) {
      console.error(err);
    }
  };

  const menuItems = [
    { id: 'profile', label: 'Identity Hub', icon: <User size={20} /> },
    { id: 'security', label: 'Security Vault', icon: <Shield size={20} /> },
    { id: 'billing', label: 'Financials', icon: <CreditCard size={20} /> },
    { id: 'notifications', label: 'Systems', icon: <Settings size={20} /> },
  ];

  return (
    <div className="bg-slate-50 min-h-screen selection:bg-orange-500/30 pb-20">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12 pt-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Menu */}
          <div className="w-full lg:w-96 space-y-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[48px] p-12 text-center shadow-sm border border-slate-100 relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-amber-500"></div>
                <div className="relative inline-block mb-10 group">
                    {user?.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-44 h-44 rounded-[40px] object-cover border-8 border-white shadow-lg transition-transform group-hover:scale-105 duration-500" />
                    ) : (
                        <div className="w-44 h-44 rounded-[40px] bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-6xl font-black shadow-lg transition-transform group-hover:scale-105 duration-500">
                            {user?.displayName ? user.displayName[0] : 'U'}
                        </div>
                    )}
                    <button className="absolute bottom-2 right-2 w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center text-slate-600 hover:scale-110 hover:text-orange-500 transition-all border border-slate-100">
                        <Camera size={24} />
                    </button>
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">{user?.displayName || 'Guru Scholar'}</h2>
                <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.3em] mb-10">Academy Scholar Level 1</p>
                
                <div className="p-5 bg-orange-50 rounded-[24px] text-orange-600 text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-sm">
                    <Award size={18} /> Verified Professional
                </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="bg-white rounded-[48px] p-6 space-y-3 shadow-sm border border-slate-100"
            >
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center justify-between px-8 py-5 rounded-[24px] transition-all group ${
                            activeTab === item.id 
                                ? 'bg-orange-50 text-orange-600 shadow-sm border border-orange-100' 
                                : 'text-slate-500 hover:bg-slate-50'
                        }`}
                    >
                        <div className="flex items-center gap-5">
                            <span className={activeTab === item.id ? 'text-orange-600' : 'text-slate-400 group-hover:text-orange-500'}>{item.icon}</span>
                            <span className="font-black text-xs uppercase tracking-widest">{item.label}</span>
                        </div>
                        <ChevronRight size={18} className={activeTab === item.id ? 'opacity-100' : 'opacity-20'} />
                    </button>
                ))}
                <div className="h-px bg-slate-50 my-6 mx-4"></div>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-5 px-8 py-5 text-red-500 hover:bg-red-50 rounded-[24px] transition-all"
                >
                    <LogOut size={20} />
                    <span className="font-black text-xs uppercase tracking-widest">Terminate Session</span>
                </button>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-white rounded-[56px] p-12 md:p-16 min-h-[850px] shadow-sm border border-slate-100 relative overflow-hidden"
            >
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-orange-50 rounded-full blur-[100px] opacity-50"></div>
                <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-amber-50 rounded-full blur-[100px] opacity-50"></div>

                {activeTab === 'profile' && (
                    <div className="relative z-10 space-y-20">
                        <div>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                                <div>
                                    <h3 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Identity <span className="text-orange-500">Blueprint</span></h3>
                                    <p className="text-slate-500 font-bold text-sm">Manage your professional academic credentials.</p>
                                </div>
                                <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-orange-600 transition-all shadow-md">Edit Profile</button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                                {[
                                    { label: 'Full Scholar Name', p: 'Alex Gurubramha', icon: <User size={18} /> },
                                    { label: 'Academic Age', p: '24 Years', icon: <Activity size={18} /> },
                                    { label: 'Gender Identity', p: 'Male/Female', icon: <User size={18} /> },
                                    { label: 'Secure Phone', p: '+91 98765 43210', icon: <Phone size={18} /> },
                                    { label: 'Academy Email', p: 'scholar@gurubramha.edu', icon: <Mail size={18} /> },
                                    { label: 'Affiliated College', p: 'IIT Madras / MIT', icon: <Award size={18} /> },
                                    { label: 'University Domain', p: 'Tech University', icon: <Globe size={18} /> },
                                    { label: 'Tech Branch', p: 'Computer Science', icon: <Settings size={18} /> },
                                    { label: 'Academic Year', p: 'Final Year', icon: <Calendar size={18} /> },
                                    { label: 'Local District', p: 'Academy HQ', icon: <MapPin size={18} /> },
                                    { label: 'Regional State', p: 'Silicon State', icon: <MapPin size={18} /> },
                                    { label: 'Postal Code', p: '000 001', icon: <MapPin size={18} /> }
                                ].map((field, i) => (
                                    <div key={i} className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">{field.label}</label>
                                        <div className="relative group">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-orange-500 transition-colors">
                                                {field.icon}
                                            </div>
                                            <input 
                                                type="text" 
                                                placeholder={field.p}
                                                className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-800 shadow-sm text-sm focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/30 outline-none transition-all placeholder:text-slate-400"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-5">
                                <Code size={28} className="text-orange-500" /> Professional Vaults
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                {[
                                    { label: 'GitHub Repository', icon: <Code size={18} /> },
                                    { label: 'LeetCode Stats', icon: <Activity size={18} /> },
                                    { label: 'CodeChef Rank', icon: <Zap size={18} /> }
                                ].map((link, i) => (
                                    <div key={i} className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">{link.label}</label>
                                        <div className="relative group">
                                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-orange-500 transition-colors">
                                                {link.icon}
                                            </div>
                                            <input 
                                                type="text" 
                                                placeholder={`URL to ${link.label}`}
                                                className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-slate-800 shadow-sm text-xs focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500/30 outline-none placeholder:text-slate-400"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-8 pt-10 border-t border-slate-50">
                            <button className="px-10 py-5 text-xs font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-all">Discard Changes</button>
                            <button className="px-12 py-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] shadow-lg shadow-orange-500/20 hover:scale-[1.05] active:scale-[0.95] transition-all">Save Blueprint</button>
                        </div>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="relative z-10 space-y-16">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-4">
                            <div>
                                <h3 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Security <span className="text-orange-500">Vault</span></h3>
                                <p className="text-slate-500 font-bold text-sm">Manage your academy authentication protocols.</p>
                            </div>
                            <div className="px-6 py-3 bg-green-50 rounded-full text-green-600 text-[10px] font-black uppercase tracking-[0.2em] border border-green-100 flex items-center gap-3">
                                <CheckCircle2 size={16} /> All Systems Secure
                            </div>
                        </div>
                        
                        <div className="space-y-8">
                            {[
                                { title: 'Two-Factor Authentication', desc: 'Secure your vault with an secondary verification layer.', icon: <Lock size={26} />, color: 'bg-amber-50 text-amber-500', active: false },
                                { title: 'Google Identity Link', desc: 'Managed via elite direct oauth integration.', icon: <CheckCircle2 size={26} />, color: 'bg-indigo-50 text-indigo-600', active: true },
                                { title: 'Activity Monitoring', desc: 'Real-time tracking of academy sessions.', icon: <Activity size={26} />, color: 'bg-blue-50 text-blue-500', active: true }
                            ].map((sec, i) => (
                                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-10 rounded-[40px] border border-slate-50 hover:bg-slate-50/50 hover:shadow-2xl hover:shadow-slate-100 transition-all group gap-8">
                                    <div className="flex items-center gap-8">
                                        <div className={`w-20 h-20 ${sec.color} rounded-[28px] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                                            {sec.icon}
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900 text-xl mb-1 tracking-tight">{sec.title}</p>
                                            <p className="text-sm font-bold text-slate-400">{sec.desc}</p>
                                        </div>
                                    </div>
                                    {typeof sec.active === 'boolean' && (
                                        <div className={`w-16 h-8 rounded-full relative cursor-pointer transition-all ${sec.active ? 'bg-indigo-600 shadow-lg shadow-indigo-200' : 'bg-slate-200'}`}>
                                            <div className={`absolute top-1.5 w-5 h-5 bg-white rounded-full transition-all shadow-md ${sec.active ? 'right-1.5' : 'left-1.5'}`}></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        <div className="pt-16 border-t border-slate-50 flex justify-between items-center">
                            <p className="text-xs font-bold text-slate-400 max-w-sm">DANGER: Terminating your account will permanently revoke all access to GuruBramha Academy resources.</p>
                            <button className="px-10 py-5 border-2 border-red-50 text-red-500 rounded-[20px] font-black text-[10px] uppercase tracking-[0.2em] hover:bg-red-50 transition-all">Deactivate Account</button>
                        </div>
                    </div>
                )}
            </motion.div>
          </div>
        </div>
      </div>
      <div className="mt-20">
         <Footer />
      </div>
    </div>
  );
};

export default Profile;
