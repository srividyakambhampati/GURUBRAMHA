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
  Maximize2,
  ShoppingBag
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import SubscriptionPopup from '../components/SubscriptionPopup';
import { useAuth } from '../context/AuthContext';
import { handlePayment } from '../utils/razorpay';
import ProductDetails from '../components/ProductDetails';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedDemo, setSelectedDemo] = useState(null);
  const [showSubscription, setShowSubscription] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showStore, setShowStore] = useState(false);

  const features = [
    { title: 'Candidate Profile', desc: 'View & edit your info', icon: <User className="text-white" />, color: 'bg-white/5 text-white border border-white/10', path: '/profile' },
    { title: 'My Documents', desc: 'Certificates & uploads', icon: <Folder className="text-white" />, color: 'bg-white/5 text-white border border-white/10', path: '/documents' },
    { title: 'Finance', desc: 'Payments & history', icon: <DollarSign className="text-slate-400" />, color: 'bg-white/5 text-slate-400 border border-white/5', isComingSoon: true },
    { title: 'Internships', desc: 'Find opportunities', icon: <Layout className="text-slate-400" />, color: 'bg-white/5 text-slate-400 border border-white/5', isComingSoon: true },
    { title: 'Jobs', desc: 'Browse job listings', icon: <Briefcase className="text-slate-400" />, color: 'bg-white/5 text-slate-400 border border-white/5', isComingSoon: true },
    { title: 'Hackathons', desc: 'Compete & win', icon: <Trophy className="text-slate-400" />, color: 'bg-white/5 text-slate-400 border border-white/5', isComingSoon: true },
    { title: 'Podcasts', desc: 'Learn on the go', icon: <Mic className="text-slate-400" />, color: 'bg-white/5 text-slate-400 border border-white/5', isComingSoon: true },
    { title: 'Guru Store', desc: 'Premium Scholar Gear', icon: <ShoppingBag className="text-white" />, color: 'bg-white/5 text-white border border-white/10', path: '#scholar-store' },
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
    <div className="bg-[#0A0E1A] min-h-screen selection:bg-white/20 text-white relative overflow-hidden">
      {/* Background Glowing Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-slate-900/30 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] bg-slate-900/30 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-transparent to-transparent"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-8 md:px-12 pt-20 pb-20 relative z-10">
        
        {/* Welcome Hero Section in Premium Dark Theme */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-800/50 backdrop-blur-md border border-slate-700/50 text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-2xl"
          >
            <Rocket size={14} className="text-white" /> India's #1 Career-Ready Platform
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight text-glow"
          >
            Welcome to <span className="text-gradient">GuruBramha</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
          >
            Manage your academic profile, secure your files in the vault, and explore your premium scholar accessories store!
          </motion.p>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-slate-850 pt-12"
          >
            {[
                { v: '10+', l: 'Courses' },
                { v: '500+', l: 'Students' },
                { v: '50+', l: 'Companies' },
                { v: '95%', l: 'Placement Rate' }
            ].map((stat, i) => (
                <div key={i} className="text-center">
                    <p className="text-4xl font-black text-white mb-2 text-glow">{stat.v}</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.l}</p>
                </div>
            ))}
          </motion.div>
        </div>

        {/* Features Bento Grid (Glassmorphic Dark Theme Cards) */}
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
                            if (feature.path === '#scholar-store') {
                                setShowStore(true);
                            } else if (feature.path.startsWith('#')) {
                                document.getElementById(feature.path.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                            } else {
                                navigate(feature.path);
                            }
                        }
                    }}
                    className={`premium-glow-card rounded-[32px] p-8 relative overflow-hidden group h-full cursor-pointer ${
                        feature.isComingSoon ? 'opacity-65 cursor-not-allowed grayscale-[0.2]' : ''
                    }`}
                >
                    {feature.isComingSoon && (
                        <div className="absolute top-6 right-6 px-3 py-1 bg-slate-800/80 border border-slate-700/50 text-slate-400 text-[8px] font-black uppercase tracking-widest rounded-full">
                            Coming Soon
                        </div>
                    )}
                    <div className={`w-14 h-14 ${feature.color} rounded-[20px] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform shadow-md`}>
                        {feature.icon}
                    </div>
                    <h4 className="font-black text-white mb-2 text-xl tracking-tight text-glow">{feature.title}</h4>
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
                    className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-slate-800/50 border border-slate-700/50 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8"
                >
                    <BookOpen size={16} /> Restricted Academic Catalog
                </motion.div>
                <h2 className="text-5xl font-black text-white mb-6 tracking-tight">Open <span className="text-white opacity-80">Sessions</span></h2>
                <p className="text-slate-455 font-bold text-xl max-w-2xl mx-auto">Establish your technical foundation with our high-fidelity free sessions.</p>
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
                      className="bg-[#0B0F19]/40 border border-white/5 p-0 overflow-hidden group cursor-pointer hover:border-white/20 hover:shadow-lg transition-all duration-500 rounded-[32px]"
                    >
                        <div className="h-48 relative overflow-hidden">
                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90" />
                            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/5 transition-all"></div>
                            <div className="absolute top-5 left-5 bg-white text-[#0A0E1A] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-xl shadow-sm">
                                Free
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-14 h-14 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center text-white border border-white/20 scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                                    <Play fill="currentColor" size={24} className="ml-1" />
                                </div>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex items-center gap-2 mb-4 text-white font-black text-xs opacity-80">
                                <Star size={16} fill="currentColor" className="text-white" /> {course.rating}
                            </div>
                            <h3 className="font-black text-white mb-2 text-base group-hover:text-white/80 transition-colors line-clamp-1 tracking-tight">{course.title}</h3>
                            <p className="text-slate-400 text-[10px] font-black mb-8 italic uppercase tracking-widest">Expert: {course.mentor}</p>
                            
                            <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                <span className="text-white font-black text-lg tracking-tighter">₹349</span>
                                <button className="flex items-center gap-3 px-5 py-2.5 bg-white text-[#0A0E1A] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all">
                                    Watch Now <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
      </div>      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedDemo && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1000] flex items-center justify-center p-6 md:p-12 bg-[#0A0E1A]/80 backdrop-blur-2xl"
            >
                <motion.div 
                    initial={{ scale: 0.95, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    className="relative w-full max-w-[1400px] bg-[#0A0E1A] rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden border border-white/10 flex flex-col lg:flex-row h-[90vh]"
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
                                        className="h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-all duration-300" 
                                        style={{ width: `${(currentTime / (parseInt(selectedDemo.duration.split(':')[0]) * 60)) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="flex items-center justify-between text-white">
                                    <div className="flex items-center gap-10">
                                        <Play fill="currentColor" size={28} className="cursor-pointer hover:text-white transition-colors" />
                                        <Volume2 size={28} className="cursor-pointer hover:text-white transition-colors" />
                                        <span className="text-sm font-black tracking-widest opacity-80 uppercase">
                                            {Math.floor(currentTime / 60)}:{String(currentTime % 60).padStart(2, '0')} <span className="mx-2 text-slate-600">/</span> {selectedDemo.duration}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <span className="text-[10px] font-black px-4 py-1.5 bg-white/5 rounded-lg border border-white/5 uppercase tracking-widest">Premium 4K</span>
                                        <Maximize2 size={28} className="cursor-pointer hover:text-white transition-colors opacity-80" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-12 overflow-y-auto custom-scrollbar flex-grow bg-gradient-to-b from-[#0A0E1A] to-black">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h2 className="text-4xl font-black text-white mb-4 tracking-tight">{selectedDemo.title}</h2>
                                <p className="text-white opacity-80 font-black text-sm uppercase tracking-[0.3em] mb-10">By {selectedDemo.mentor} • Master Academy Mentor</p>
                                <div className="prose prose-invert prose-slate max-w-none text-slate-400 font-bold text-lg leading-relaxed">
                                    <p>Experience industry-standard pedagogical excellence. This high-fidelity session establishes the conceptual architecture required for professional mastery.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Playlist Sidebar */}
                    <div className="w-full lg:w-[450px] bg-[#0A0E1A] border-l border-white/5 flex flex-col h-full overflow-hidden">
                        <div className="p-10 border-b border-white/5 bg-white/5 text-center">
                            <h3 className="text-xl font-black text-white flex items-center justify-center gap-4">
                                <Activity className="text-white" /> Academy Roadmap
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
                                    item.active ? 'bg-white/10 border-white/50 shadow-2xl' : 'bg-white/5 border-white/5 hover:border-white/20'
                                }`}>
                                    <div className="flex items-center gap-6">
                                        <div className={`w-12 h-12 rounded-[18px] flex items-center justify-center font-black text-sm shadow-inner transition-colors ${
                                            item.active ? 'bg-white text-[#0A0E1A]' : 'bg-white/5 text-slate-650'
                                        }`}>
                                            {item.active ? <Play size={18} fill="currentColor" /> : i + 1}
                                        </div>
                                        <div>
                                            <p className={`text-base font-black tracking-tight ${item.active ? 'text-white' : 'text-slate-400'}`}>{item.t}</p>
                                            <p className="text-[10px] font-black uppercase text-slate-650 tracking-widest mt-1.5">{item.d} Duration</p>
                                        </div>
                                    </div>
                                    {!item.active && <Lock size={18} className="text-slate-800" />}
                                </div>
                            ))}
                        </div>
                        <div className="p-10 border-t border-white/5 bg-[#0B0F19]">
                            <button 
                                onClick={() => handlePayment({ amount: 349, description: `Demo: ${selectedDemo.title}`, user })}
                                className="w-full py-6 bg-white text-[#0A0E1A] font-black rounded-[24px] shadow-lg shadow-white/5 hover:scale-[1.05] active:scale-[0.95] transition-all flex items-center justify-center gap-4 text-sm uppercase tracking-widest"
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

      {/* Luxury Store Overlay Modal */}
      <AnimatePresence>
        {showStore && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1000] overflow-y-auto bg-slate-950/80 backdrop-blur-2xl p-4 sm:p-8 flex items-center justify-center pt-24"
            >
                <div className="relative w-full max-w-[1450px] mx-auto my-auto">
                    <button 
                        onClick={() => setShowStore(false)}
                        className="absolute top-8 right-8 z-[1002] w-12 h-12 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 border border-white/10"
                    >
                        <X size={20} />
                    </button>
                    <ProductDetails />
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Dashboard;
