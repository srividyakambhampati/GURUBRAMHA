import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layout, 
  Book, 
  Code, 
  Trophy, 
  Clock, 
  ChevronRight, 
  Play, 
  Star,
  Zap,
  Activity,
  Calendar,
  CheckCircle2,
  FileText,
  TrendingUp,
  Award,
  ArrowRight,
  Bell,
  User,
  Folder,
  DollarSign,
  Briefcase,
  Mic,
  Rocket,
  X,
  BookOpen,
  Lock,
  Volume2,
  Maximize2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import SubscriptionPopup from '../components/SubscriptionPopup';
import { useAuth } from '../context/AuthContext';
import { handlePayment } from '../utils/razorpay';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedDemo, setSelectedDemo] = useState(null);
  const [showSubscription, setShowSubscription] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const features = [
    { title: 'Scholar Profile', desc: 'Manage Identity', icon: <User className="text-indigo-600" />, color: 'bg-indigo-50', path: '/profile' },
    { title: 'Academic Vault', desc: 'Secure Documents', icon: <Folder className="text-blue-600" />, color: 'bg-blue-50', path: '/documents' },
    { title: 'Financials', desc: 'Scholarship Logs', icon: <DollarSign className="text-amber-600" />, color: 'bg-amber-50', isComingSoon: true },
    { title: 'Elite Internships', desc: 'Career Gateway', icon: <Layout className="text-teal-600" />, color: 'bg-teal-50', isComingSoon: true },
    { title: 'Placements', desc: 'Corporate Tie-ups', icon: <Briefcase className="text-red-600" />, color: 'bg-red-50', isComingSoon: true },
    { title: 'Hackathons', desc: 'Compete Global', icon: <Trophy className="text-orange-600" />, color: 'bg-orange-50', isComingSoon: true },
    { title: 'CV Architect', desc: 'Premium Resume', icon: <FileText className="text-purple-600" />, color: 'bg-purple-50', isComingSoon: true },
    { title: 'Guru Podcasts', desc: 'Listen & Learn', icon: <Mic className="text-pink-600" />, color: 'bg-pink-50', isComingSoon: true },
  ];

  const demoCourses = [
    { id: 1, title: 'Python Basics Masterclass', mentor: 'David Miller', duration: '30:00', rating: 4.9, students: '12k', thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500' },
    { id: 2, title: 'Java Programming Professional', mentor: 'Sarah Johnson', duration: '45:00', rating: 4.8, students: '8k', thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500' },
    { id: 3, title: 'MERN Stack Development 2024', mentor: 'Alex River', duration: '60:00', rating: 4.9, students: '15k', thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500' },
    { id: 4, title: 'Full Stack Web Development', mentor: 'Elena Gilbert', duration: '55:00', rating: 4.7, students: '10k', thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=500' },
    { id: 5, title: 'React JS Masterclass: UI/UX', mentor: 'Michael Scott', duration: '40:00', rating: 4.9, students: '20k', thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=500' },
    { id: 6, title: 'Data Structures & Algorithms', mentor: 'Prateek Narang', duration: '90:00', rating: 5.0, students: '25k', thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=500' },
    { id: 7, title: 'Machine Learning Basics', mentor: 'Dr. Angela Yu', duration: '75:00', rating: 4.8, students: '11k', thumbnail: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=500' },
    { id: 8, title: 'SQL & Database Management Pro', mentor: 'Josh Comeau', duration: '35:00', rating: 4.6, students: '9k', thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500' },
    { id: 9, title: 'Aptitude & Reasoning Training', mentor: 'Rohan Sharma', duration: '50:00', rating: 4.7, students: '30k', thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500' },
    { id: 10, title: 'Elite Interview Preparation', mentor: 'Vikram Malhotra', duration: '120:00', rating: 4.9, students: '40k', thumbnail: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500' },
  ];

  // Logic to show subscription popup when demo video ends
  useEffect(() => {
    let interval;
    if (selectedDemo) {
        interval = setInterval(() => {
            setCurrentTime(prev => {
                const totalSeconds = parseInt(selectedDemo.duration.split(':')[0]) * 60;
                if (prev >= totalSeconds && !showSubscription) {
                    setShowSubscription(true);
                }
                return prev + 1;
            });
        }, 1000);
    } else {
        setCurrentTime(0);
        setShowSubscription(false);
    }
    return () => clearInterval(interval);
  }, [selectedDemo, showSubscription]);

  return (
    <div className="bg-slate-50 min-h-screen selection:bg-orange-500/30">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12 pt-10 pb-20">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-12 mb-16">
            <div>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-4xl md:text-5xl font-black mb-4 text-slate-900 tracking-tight"
                >
                    Scholar <span className="text-orange-500">Control Center</span>
                </motion.h1>
                <p className="text-slate-500 font-bold text-lg tracking-wide">Manage your academic journey and explore elite content.</p>
            </div>
            <div className="flex items-center gap-6">
                <div className="bg-white py-4 px-10 border border-slate-200 rounded-[24px] flex items-center gap-5 shadow-sm">
                    <Calendar size={22} className="text-orange-500" />
                    <div className="text-left">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Academic Cycle</p>
                        <p className="text-sm font-black text-slate-900">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {features.map((feature, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={!feature.isComingSoon ? { y: -10, scale: 1.02 } : {}}
                    onClick={() => {
                        if (feature.path && !feature.isComingSoon) {
                            navigate(feature.path);
                        }
                    }}
                    className={`bg-white rounded-[40px] p-10 shadow-sm border border-slate-100 transition-all relative overflow-hidden group h-full ${
                        feature.isComingSoon ? 'opacity-60 cursor-not-allowed grayscale-[0.3]' : 'hover:shadow-md hover:border-slate-200 cursor-pointer'
                    }`}
                >
                    {feature.isComingSoon && (
                        <div className="absolute top-6 right-6 px-4 py-1.5 bg-slate-100 text-slate-500 text-[8px] font-black uppercase tracking-[0.2em] rounded-full">
                            Developing
                        </div>
                    )}
                    <div className={`w-16 h-16 ${feature.color} rounded-[24px] flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform shadow-sm`}>
                        {feature.icon}
                    </div>
                    <h4 className="font-black text-slate-900 mb-2 text-xl tracking-tight">{feature.title}</h4>
                    <p className="text-xs font-bold text-slate-400 tracking-wide leading-relaxed">{feature.desc}</p>
                </motion.div>
            ))}
        </div>

        {/* Demo Classes Section */}
        <section className="relative mt-32">
            <div className="text-center mb-20">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
                >
                    <BookOpen size={16} /> Restricted Academic Catalog
                </motion.div>
                <h2 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Open <span className="text-orange-500">Sessions</span></h2>
                <p className="text-slate-500 font-bold text-xl max-w-2xl mx-auto">Establish your technical foundation with our high-fidelity free sessions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
                {demoCourses.map((course, i) => (
                    <motion.div 
                      key={course.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -15 }}
                      onClick={() => setSelectedDemo(course)}
                      className="bg-white border border-slate-100 p-0 overflow-hidden group cursor-pointer hover:border-orange-200 hover:shadow-lg transition-all duration-500 rounded-[32px]"
                    >
                        <div className="h-48 relative overflow-hidden">
                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90" />
                            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/5 transition-all"></div>
                            <div className="absolute top-5 left-5 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-xl shadow-sm">
                                Free
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-14 h-14 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center text-white border border-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                                    <Play fill="currentColor" size={24} className="ml-1" />
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex items-center gap-2 mb-4 text-orange-500 font-black text-xs">
                                <Star size={16} fill="currentColor" /> {course.rating}
                            </div>
                            <h3 className="font-black text-slate-900 mb-2 text-base group-hover:text-orange-500 transition-colors line-clamp-1 tracking-tight">{course.title}</h3>
                            <p className="text-slate-500 text-[10px] font-black mb-8 italic uppercase tracking-widest">Expert: {course.mentor}</p>
                            
                            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                <span className="text-slate-900 font-black text-lg tracking-tighter">₹299</span>
                                <button className="flex items-center gap-3 px-5 py-2.5 bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white hover:border-transparent transition-all">
                                    Watch Now <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedDemo && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1000] flex items-center justify-center p-6 md:p-12 bg-[#0F172A]/80 backdrop-blur-2xl"
            >
                <motion.div 
                    initial={{ scale: 0.95, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    className="relative w-full max-w-[1400px] bg-[#0F172A] rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10 flex flex-col lg:flex-row h-[90vh]"
                >
                    <button 
                        onClick={() => setSelectedDemo(null)}
                        className="absolute top-8 right-8 p-4 text-slate-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all z-[1001]"
                    >
                        <X size={28} />
                    </button>

                    {/* Main Player Area */}
                    <div className="flex-grow flex flex-col bg-black h-full overflow-hidden relative">
                        <div className="aspect-video bg-black relative flex-shrink-0 group">
                            <img src={selectedDemo.thumbnail} alt={selectedDemo.title} className="w-full h-full object-cover opacity-40" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 bg-white/5 backdrop-blur-3xl rounded-full flex items-center justify-center text-white border border-white/10 shadow-2xl animate-pulse">
                                    <Play fill="currentColor" size={48} className="ml-2" />
                                </div>
                            </div>
                            
                            <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black to-transparent">
                                <div className="h-2 w-full bg-white/10 rounded-full mb-8 overflow-hidden">
                                    <div 
                                        className="h-full bg-[#FFB800] shadow-[0_0_20px_rgba(255,184,0,0.8)] transition-all duration-300" 
                                        style={{ width: `${(currentTime / (parseInt(selectedDemo.duration.split(':')[0]) * 60)) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="flex items-center justify-between text-white">
                                    <div className="flex items-center gap-10">
                                        <Play fill="currentColor" size={28} className="cursor-pointer hover:text-[#FFB800] transition-colors" />
                                        <Volume2 size={28} className="cursor-pointer hover:text-[#FFB800] transition-colors" />
                                        <span className="text-sm font-black tracking-widest opacity-80 uppercase">
                                            {Math.floor(currentTime / 60)}:{String(currentTime % 60).padStart(2, '0')} <span className="mx-2 text-slate-600">/</span> {selectedDemo.duration}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="text-[10px] font-black px-4 py-1.5 bg-white/5 rounded-lg border border-white/5 uppercase tracking-widest">Premium 4K</span>
                                        <Maximize2 size={28} className="cursor-pointer hover:text-[#FFB800] transition-colors opacity-80" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-12 overflow-y-auto custom-scrollbar flex-grow bg-gradient-to-b from-[#0F172A] to-black">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h2 className="text-4xl font-black text-white mb-4 tracking-tight">{selectedDemo.title}</h2>
                                <p className="text-orange-500 font-black text-sm uppercase tracking-[0.3em] mb-10">By {selectedDemo.mentor} • Master Academy Mentor</p>
                                <div className="prose prose-invert prose-slate max-w-none text-slate-400 font-bold text-lg leading-relaxed">
                                    <p>Experience industry-standard pedagogical excellence. This high-fidelity session establishes the conceptual architecture required for professional mastery.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Playlist Sidebar */}
                    <div className="w-full lg:w-[450px] bg-[#0F172A] border-l border-white/5 flex flex-col h-full overflow-hidden">
                        <div className="p-10 border-b border-white/5 bg-white/5 text-center">
                            <h3 className="text-xl font-black text-white flex items-center justify-center gap-4">
                                <Activity className="text-[#FFB800]" /> Academy Roadmap
                            </h3>
                        </div>
                        <div className="flex-grow overflow-y-auto custom-scrollbar p-8 space-y-6">
                            {[
                                { t: 'Introduction', d: '05:00', active: true },
                                { t: 'Core Fundamentals', d: '15:20', active: false },
                                { t: 'Advanced Logic & Flow', d: '25:40', active: false },
                                { t: 'Project Walkthrough', d: '45:00', active: false }
                            ].map((item, i) => (
                                <div key={i} className={`p-6 rounded-[24px] border transition-all flex items-center justify-between group cursor-pointer ${
                                    item.active ? 'bg-white/10 border-[#FFB800]/50 shadow-2xl' : 'bg-white/5 border-white/5 hover:border-white/20'
                                }`}>
                                    <div className="flex items-center gap-6">
                                        <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center font-black text-sm shadow-inner transition-colors ${
                                            item.active ? 'bg-[#FFB800] text-[#0F172A]' : 'bg-white/5 text-slate-600'
                                        }`}>
                                            {item.active ? <Play size={18} fill="currentColor" /> : i + 1}
                                        </div>
                                        <div>
                                            <p className={`text-base font-black tracking-tight ${item.active ? 'text-white' : 'text-slate-400'}`}>{item.t}</p>
                                            <p className="text-[10px] font-black uppercase text-slate-600 tracking-widest mt-1.5">{item.d} Duration</p>
                                        </div>
                                    </div>
                                    {!item.active && <Lock size={18} className="text-slate-800" />}
                                </div>
                            ))}
                        </div>
                        <div className="p-10 border-t border-slate-800 bg-slate-900">
                            <button 
                                onClick={() => handlePayment({ amount: 299, description: `Demo: ${selectedDemo.title}`, user })}
                                className="w-full py-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-[24px] shadow-lg shadow-orange-500/20 hover:scale-[1.05] active:scale-[0.95] transition-all flex items-center justify-center gap-4 text-sm uppercase tracking-widest"
                            >
                                Unlock Academy Vault <Lock size={20} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Subscription Popup Logic */}
      <AnimatePresence>
        {showSubscription && (
            <SubscriptionPopup 
                onClose={() => setShowSubscription(false)} 
            />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Dashboard;
