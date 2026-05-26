import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
  Zap,
  Loader,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

const Profile = () => {
  const { user, login, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  // Editable Profile States
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [academicAge, setAcademicAge] = useState(localStorage.getItem('guru_academicAge') || '');
  const [gender, setGender] = useState(localStorage.getItem('guru_gender') || '');
  const [phone, setPhone] = useState(localStorage.getItem('guru_phone') || '');
  const [college, setCollege] = useState(localStorage.getItem('guru_college') || '');
  const [universityDomain, setUniversityDomain] = useState(localStorage.getItem('guru_universityDomain') || '');
  const [techBranch, setTechBranch] = useState(localStorage.getItem('guru_techBranch') || '');
  const [academicYear, setAcademicYear] = useState(localStorage.getItem('guru_academicYear') || '');
  const [localDistrict, setLocalDistrict] = useState(localStorage.getItem('guru_localDistrict') || '');
  const [regionalState, setRegionalState] = useState(localStorage.getItem('guru_regionalState') || '');
  const [postalCode, setPostalCode] = useState(localStorage.getItem('guru_postalCode') || '');

  // Vault/Link States
  const [github, setGithub] = useState(localStorage.getItem('guru_github') || '');
  const [leetcode, setLeetcode] = useState(localStorage.getItem('guru_leetcode') || '');
  const [codechef, setCodechef] = useState(localStorage.getItem('guru_codechef') || '');

  // Security Vault Toggle States
  const [tfaEnabled, setTfaEnabled] = useState(false);
  const [googleLinked, setGoogleLinked] = useState(true);
  const [activityMonitoring, setActivityMonitoring] = useState(true);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (err) {
      console.error(err);
    }
  };

  const handleCameraButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/documents/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        const photoURL = `${API_BASE_URL}${data.url}`;
        const updatedUser = { ...user, photoURL };
        login(updatedUser);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Server error during upload');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveBlueprint = () => {
    localStorage.setItem('guru_academicAge', academicAge);
    localStorage.setItem('guru_gender', gender);
    localStorage.setItem('guru_phone', phone);
    localStorage.setItem('guru_college', college);
    localStorage.setItem('guru_universityDomain', universityDomain);
    localStorage.setItem('guru_techBranch', techBranch);
    localStorage.setItem('guru_academicYear', academicYear);
    localStorage.setItem('guru_localDistrict', localDistrict);
    localStorage.setItem('guru_regionalState', regionalState);
    localStorage.setItem('guru_postalCode', postalCode);
    localStorage.setItem('guru_github', github);
    localStorage.setItem('guru_leetcode', leetcode);
    localStorage.setItem('guru_codechef', codechef);

    const updatedUser = { ...user, displayName, email };
    login(updatedUser);
    alert('Identity blueprint saved successfully!');
  };

  const menuItems = [
    { id: 'profile', label: 'Identity Hub', icon: <User size={20} /> },
    { id: 'security', label: 'Security Vault', icon: <Shield size={20} /> },
  ];

  return (
    <div className="bg-[#060813] min-h-screen text-slate-100 selection:bg-blue-600/30 pb-20 relative overflow-hidden">
      {/* Ambient background glows removed as requested for a clean plain navy blue look */}

      {/* Hidden file input for photo upload */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handlePhotoUpload} 
        accept="image/*" 
        className="hidden" 
      />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-10 relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2.5 text-slate-400 hover:text-cyan-400 mb-8 font-black uppercase tracking-widest text-[10px] transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Menu */}
          <div className="w-full lg:w-96 space-y-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#090d20]/90 backdrop-blur-md rounded-[32px] p-10 text-center shadow-[0_0_50px_-12px_rgba(236,72,153,0.3)] border border-pink-500/30 hover:border-pink-500/50 transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-400 via-pink-500 to-fuchsia-600"></div>
              <div className="relative inline-block mb-8 group">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-40 h-40 rounded-[32px] object-cover border-4 border-slate-800 shadow-lg transition-transform group-hover:scale-102 duration-500" />
                ) : (
                  <div className="w-40 h-40 rounded-[32px] bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-5xl font-extrabold shadow-lg transition-transform group-hover:scale-102 duration-500">
                    {user?.displayName ? user.displayName[0] : 'U'}
                  </div>
                )}
                <button 
                  onClick={handleCameraButtonClick}
                  disabled={uploading}
                  className="absolute bottom-2 right-2 w-12 h-12 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl shadow-lg flex items-center justify-center transition-all border border-cyan-550/30 hover:scale-105"
                >
                  {uploading ? <Loader size={20} className="animate-spin" /> : <Camera size={20} />}
                </button>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">{user?.displayName || 'Guru Scholar'}</h2>
              <p className="text-cyan-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-8">Academy Scholar Level 1</p>
              
              <div className="p-4 bg-purple-500/5 border border-purple-500/30 rounded-[20px] text-purple-400 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(168,85,247,0.1)] backdrop-blur-md">
                <Award size={16} className="text-purple-405 animate-pulse" /> Verified Professional
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#090d20]/90 backdrop-blur-md rounded-[32px] p-6 space-y-2.5 shadow-xl border border-white/5"
            >
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all group ${
                    activeTab === item.id 
                      ? 'bg-gradient-to-r from-cyan-500 via-pink-500 to-fuchsia-600 text-white shadow-[0_4px_25px_rgba(236,72,153,0.35)]' 
                      : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-cyan-400'}>{item.icon}</span>
                    <span className="font-semibold text-xs uppercase tracking-wider">{item.label}</span>
                  </div>
                  <ChevronRight size={16} className={activeTab === item.id ? 'opacity-100' : 'opacity-20'} />
                </button>
              ))}
              <div className="h-px bg-slate-800/60 my-5 mx-4"></div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-6 py-4 text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all font-semibold text-xs uppercase tracking-wider"
              >
                <LogOut size={20} />
                <span>Terminate Session</span>
              </button>
            </motion.div>
          </div>

          {/* Main Content Area */}
          <div className="flex-grow">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#090d20]/80 backdrop-blur-md rounded-[40px] p-8 md:p-12 min-h-[800px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 relative overflow-hidden"
            >
              {/* Ambient backgrounds removed as requested for plain dark navy blue look */}

              {activeTab === 'profile' && (
                <div className="relative z-10 space-y-16">
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                      <div>
                        <h3 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Identity <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Blueprint</span></h3>
                        <p className="text-slate-400 font-medium text-sm">Manage your professional academic credentials.</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                      {[
                        { label: 'Full Scholar Name', value: displayName, setter: setDisplayName, icon: <User size={18} className="text-cyan-400" /> },
                        { label: 'Academic Age', value: academicAge, setter: setAcademicAge, icon: <Activity size={18} className="text-purple-400" /> },
                        { label: 'Gender Identity', value: gender, setter: setGender, icon: <User size={18} className="text-fuchsia-400" /> },
                        { label: 'Secure Phone', value: phone, setter: setPhone, icon: <Phone size={18} className="text-blue-400" /> },
                        { label: 'Academy Email', value: email, setter: setEmail, icon: <Mail size={18} className="text-cyan-400" /> },
                        { label: 'Affiliated College', value: college, setter: setCollege, icon: <Award size={18} className="text-purple-400" /> },
                        { label: 'University Domain', value: universityDomain, setter: setUniversityDomain, icon: <Globe size={18} className="text-blue-400" /> },
                        { label: 'Tech Branch', value: techBranch, setter: setTechBranch, icon: <Settings size={18} className="text-fuchsia-400" /> },
                        { label: 'Academic Year', value: academicYear, setter: setAcademicYear, icon: <Calendar size={18} className="text-cyan-400" /> },
                        { label: 'Local District', value: localDistrict, setter: setLocalDistrict, icon: <MapPin size={18} className="text-blue-400" /> },
                        { label: 'Regional State', value: regionalState, setter: setRegionalState, icon: <MapPin size={18} className="text-cyan-400" /> },
                        { label: 'Postal Code', value: postalCode, setter: setPostalCode, icon: <MapPin size={18} className="text-blue-400" /> }
                      ].map((field, i) => (
                        <div key={i} className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">{field.label}</label>
                          <div className="relative group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:scale-105 transition-all">
                              {field.icon}
                            </div>
                            <input 
                              type="text" 
                              value={field.value}
                              onChange={(e) => field.setter(e.target.value)}
                              className="w-full pl-14 pr-5 py-4 bg-[#090d20]/50 border border-slate-800/80 rounded-xl font-medium text-white shadow-inner text-sm focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 outline-none transition-all placeholder:text-slate-650"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-4 border-b border-slate-800/60 pb-3">
                      <Code size={22} className="text-cyan-400" /> Professional Vaults
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[
                        { label: 'GitHub Repository', value: github, setter: setGithub, icon: <Code size={18} className="text-cyan-400" /> },
                        { label: 'LeetCode Stats', value: leetcode, setter: setLeetcode, icon: <Activity size={18} className="text-purple-400" /> },
                        { label: 'CodeChef Rank', value: codechef, setter: setCodechef, icon: <Zap size={18} className="text-blue-400" /> }
                      ].map((link, i) => (
                        <div key={i} className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">{link.label}</label>
                          <div className="relative group">
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:scale-105 transition-all">
                              {link.icon}
                            </div>
                            <input 
                              type="text" 
                              value={link.value}
                              onChange={(e) => link.setter(e.target.value)}
                              placeholder={`URL to ${link.label}`}
                              className="w-full pl-14 pr-5 py-4 bg-[#090d20]/50 border border-slate-800/80 rounded-xl font-medium text-white shadow-inner text-xs focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10 outline-none placeholder:text-slate-650 transition-all"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-6 pt-8 border-t border-slate-800/60">
                    <button 
                      onClick={() => {
                        setDisplayName(user?.displayName || '');
                        setEmail(user?.email || '');
                        setAcademicAge(localStorage.getItem('guru_academicAge') || '');
                        setGender(localStorage.getItem('guru_gender') || '');
                        setPhone(localStorage.getItem('guru_phone') || '');
                        setCollege(localStorage.getItem('guru_college') || '');
                        setUniversityDomain(localStorage.getItem('guru_universityDomain') || '');
                        setTechBranch(localStorage.getItem('guru_techBranch') || '');
                        setAcademicYear(localStorage.getItem('guru_academicYear') || '');
                        setLocalDistrict(localStorage.getItem('guru_localDistrict') || '');
                        setRegionalState(localStorage.getItem('guru_regionalState') || '');
                        setPostalCode(localStorage.getItem('guru_postalCode') || '');
                        setGithub(localStorage.getItem('guru_github') || '');
                        setLeetcode(localStorage.getItem('guru_leetcode') || '');
                        setCodechef(localStorage.getItem('guru_codechef') || '');
                      }}
                      className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-all"
                    >
                      Discard Changes
                    </button>
                    <button 
                      onClick={handleSaveBlueprint}
                      className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl text-[10px] uppercase tracking-widest shadow-lg shadow-blue-600/20 hover:scale-[1.03] active:scale-[0.97] transition-all"
                    >
                      Save Blueprint
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="relative z-10 space-y-12">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-2">
                    <div>
                      <h3 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Security <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Vault</span></h3>
                      <p className="text-slate-400 font-medium text-sm">Manage your academy authentication protocols.</p>
                    </div>
                    <div className="px-5 py-2.5 bg-emerald-500/10 rounded-full text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20 flex items-center gap-2.5 backdrop-blur-md">
                      <CheckCircle2 size={14} /> All Systems Secure
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      { id: 'tfa', title: 'Two-Factor Authentication', desc: 'Secure your vault with a secondary verification layer.', icon: <Lock size={22} />, color: 'bg-amber-500/10 text-amber-400 border border-amber-500/20', active: tfaEnabled, toggle: () => setTfaEnabled(!tfaEnabled) },
                      { id: 'google', title: 'Google Identity Link', desc: 'Managed via elite direct oauth integration.', icon: <CheckCircle2 size={22} />, color: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20', active: googleLinked, toggle: () => setGoogleLinked(!googleLinked) },
                      { id: 'activity', title: 'Activity Monitoring', desc: 'Real-time tracking of academy sessions.', icon: <Activity size={22} />, color: 'bg-blue-500/10 text-blue-400 border border-blue-500/20', active: activityMonitoring, toggle: () => setActivityMonitoring(!activityMonitoring) }
                    ].map((sec, i) => (
                      <div 
                        key={i} 
                        onClick={sec.toggle}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl border border-slate-800/80 hover:bg-slate-850/20 transition-all group gap-6 cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-5">
                          <div className={`w-14 h-14 ${sec.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                            {sec.icon}
                          </div>
                          <div>
                            <p className="font-bold text-white text-lg mb-0.5 tracking-tight">{sec.title}</p>
                            <p className="text-xs font-medium text-slate-400">{sec.desc}</p>
                          </div>
                        </div>
                        {typeof sec.active === 'boolean' && (
                          <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-all ${sec.active ? 'bg-blue-600 shadow-md shadow-blue-600/20' : 'bg-slate-800'}`}>
                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow ${sec.active ? 'right-1' : 'left-1'}`}></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-10 border-t border-slate-800/60 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs font-medium text-slate-455 max-w-sm text-center md:text-left">DANGER: Terminating your account will permanently revoke all access to GuruBramha Academy resources.</p>
                    <button 
                      onClick={() => {
                        if (window.confirm("⚠️ WARNING: Are you absolutely sure you want to deactivate your GuruBramha Academy account? This action is permanent and completely irreversible.")) {
                          alert("Your GuruBramha account is successfully scheduled for deactivation.");
                        }
                      }}
                      className="px-8 py-4 border border-rose-500/20 text-rose-455 rounded-xl font-bold text-[10px] uppercase tracking-wider hover:bg-rose-500/10 transition-all"
                    >
                      Deactivate Account
                    </button>
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
