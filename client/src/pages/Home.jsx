import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  ChevronRight, 
  Star, 
  ArrowRight,
  Clock,
  User,
  Zap,
  CheckCircle2,
  X,
  BookOpen,
  Volume2,
  Maximize2,
  Rocket,
  ShieldCheck,
  Lock,
  Folder,
  DollarSign,
  Layout,
  Briefcase,
  Trophy,
  FileText,
  Mic
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import SubscriptionPopup from '../components/SubscriptionPopup';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedDemo, setSelectedDemo] = useState(null);
  const [showSubscription, setShowSubscription] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const features = [
    { title: 'Candidate Profile', desc: 'View & edit your info', icon: <User className="text-indigo-500" />, color: 'bg-indigo-50', path: '/profile' },
    { title: 'My Documents', desc: 'Certificates & uploads', icon: <Folder className="text-blue-500" />, color: 'bg-blue-50', path: '/documents' },
    { title: 'Finance', desc: 'Payments & history', icon: <DollarSign className="text-amber-500" />, color: 'bg-amber-50', isComingSoon: true },
    { title: 'Internships', desc: 'Find opportunities', icon: <Layout className="text-teal-500" />, color: 'bg-teal-50', isComingSoon: true },
    { title: 'Jobs', desc: 'Browse job listings', icon: <Briefcase className="text-red-500" />, color: 'bg-red-50', isComingSoon: true },
    { title: 'Hackathons', desc: 'Compete & win', icon: <Trophy className="text-orange-500" />, color: 'bg-orange-50', isComingSoon: true },
    { title: 'Resume Builder', desc: 'Create your resume', icon: <FileText className="text-purple-500" />, color: 'bg-purple-50', isComingSoon: true },
    { title: 'Podcasts', desc: 'Learn on the go', icon: <Mic className="text-pink-500" />, color: 'bg-pink-50', isComingSoon: true },
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

  useEffect(() => {
    let interval;
    if (selectedDemo) {
        interval = setInterval(() => {
            setCurrentTime(prev => {
                const totalSeconds = parseInt(selectedDemo.duration.split(':')[0]) * 60;
                if (prev >= totalSeconds && !showSubscription && !user?.isSubscribed) {
                    setShowSubscription(true);
                }
                return prev + 1;
            });
        }, 1000);
    } else {
        setCurrentTime(0);
    }
    return () => clearInterval(interval);
  }, [selectedDemo, showSubscription]);

  return (
    <div className="bg-[#0F172A]">
      {/* New Premium Dark Hero Section */}
      <section className="relative min-h-[75vh] flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[150px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800/50 via-transparent to-transparent"></div>
        </div>

        <div className="section-container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-800/50 backdrop-blur-md border border-slate-700 text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-2xl"
          >
            <Rocket size={14} className="text-amber-400" /> India's #1 Career-Ready Platform
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
          >
            Welcome to <span className="text-[#FFB800]">GuruBramha</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-10 font-medium leading-relaxed"
          >
            Explore our demo classes below before exploring the full library of advanced job preparation content and premium tutorials!
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <Link to="/signup" className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-black text-base shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
              <Rocket size={18} /> Get Started
            </Link>
            <Link to="/courses" className="px-8 py-4 border-2 border-slate-700 text-white rounded-2xl font-black text-base hover:bg-slate-800/50 transition-all">
              Explore Courses
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-slate-800/50 pt-12"
          >
            {[
                { v: '10+', l: 'Courses' },
                { v: '500+', l: 'Students' },
                { v: '50+', l: 'Companies' },
                { v: '95%', l: 'Placement Rate' }
            ].map((stat, i) => (
                <div key={i} className="text-center">
                    <p className="text-4xl font-black text-[#FFB800] mb-2">{stat.v}</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.l}</p>
                </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="bg-[#0F172A] pt-12 pb-16 relative z-20">
        <div className="section-container">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-12">
                {features.map((feature, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={!feature.isComingSoon ? { y: -8, scale: 1.02 } : {}}
                        onClick={() => {
                            if (feature.path && !feature.isComingSoon) {
                                navigate(feature.path);
                            }
                        }}
                        className={`glass-card !p-6 !bg-white border-slate-100 shadow-xl transition-all relative overflow-hidden group h-full ${
                            feature.isComingSoon ? 'opacity-60 grayscale-[0.5] cursor-not-allowed' : 'hover:shadow-2xl cursor-pointer'
                        }`}
                    >
                        {feature.isComingSoon && (
                            <div className="absolute top-3 right-3 px-3 py-1 bg-slate-100 text-slate-400 text-[8px] font-black uppercase tracking-widest rounded-full border border-slate-200">
                                Coming Soon
                            </div>
                        )}
                        <div className={`w-14 h-14 ${feature.color} rounded-[20px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            {feature.icon}
                        </div>
                        <h4 className="font-black text-slate-900 mb-2 text-lg">{feature.title}</h4>
                        <p className="text-xs font-bold text-slate-500">{feature.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* Demo Classes Section */}
            <div className="text-center mb-12 border-t border-slate-800/50 pt-16">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-800/50 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-slate-700"
                >
                    <BookOpen size={14} /> Academy Preview
                </motion.div>
                <h2 className="heading-lg mb-4 text-3xl md:text-4xl text-white">Explore <span className="text-[#FFB800]">Demo Classes</span></h2>
                <p className="text-slate-400 font-medium text-base max-w-2xl mx-auto">Experience the quality of GuruBramha with our free sessions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {demoCourses.map((course, i) => (
                    <motion.div 
                      key={course.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -12 }}
                      onClick={() => setSelectedDemo(course)}
                      className="glass-card !p-0 overflow-hidden group cursor-pointer border-slate-100 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 !bg-white"
                    >
                        <div className="h-44 relative overflow-hidden">
                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-indigo-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-xl shadow-lg border border-white/50">
                                Free
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 bg-white/30 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/40 scale-0 group-hover:scale-100 transition-transform duration-500">
                                    <Play fill="currentColor" size={20} className="ml-1" />
                                </div>
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="flex items-center gap-1 mb-2 text-amber-500 font-black text-xs">
                                <Star size={14} fill="currentColor" /> {course.rating}
                            </div>
                            <h3 className="font-black text-slate-900 mb-1 text-sm group-hover:text-indigo-600 transition-colors line-clamp-1">{course.title}</h3>
                            <p className="text-slate-400 text-[10px] font-bold mb-4">Mentor: {course.mentor}</p>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                <span className="text-indigo-600 font-black text-base">₹299</span>
                                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
                                    Watch <ArrowRight size={12} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedDemo && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            >
                <motion.div 
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="relative w-full max-w-6xl bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 flex flex-col lg:flex-row h-[85vh]"
                >
                    <button 
                        onClick={() => setSelectedDemo(null)}
                        className="absolute top-6 right-6 p-3 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-2xl transition-all z-20"
                    >
                        <X size={24} />
                    </button>

                    <div className="flex-grow flex flex-col bg-slate-50 h-full overflow-hidden">
                        <div className="aspect-video bg-black relative flex-shrink-0">
                            <img src={selectedDemo.thumbnail} alt={selectedDemo.title} className="w-full h-full object-cover opacity-50" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center text-white border border-white/20 animate-pulse">
                                    <Play fill="currentColor" size={40} className="ml-2" />
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                                <div className="h-1.5 w-full bg-white/20 rounded-full mb-6 overflow-hidden">
                                    <div className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)]" style={{ width: `${(currentTime / (parseInt(selectedDemo.duration.split(':')[0]) * 60)) * 100}%` }}></div>
                                </div>
                                <div className="flex items-center justify-between text-white font-bold text-sm">
                                    <div className="flex items-center gap-6">
                                        <Play fill="currentColor" size={24} />
                                        <Volume2 size={24} />
                                        <span>{Math.floor(currentTime / 60)}:{String(currentTime % 60).padStart(2, '0')} / {selectedDemo.duration}</span>
                                    </div>
                                    <Maximize2 size={24} className="opacity-80" />
                                </div>
                            </div>
                        </div>
                        <div className="p-10 overflow-y-auto">
                            <h2 className="text-3xl font-black text-slate-900 mb-2">{selectedDemo.title}</h2>
                            <p className="text-slate-500 font-medium mb-8">By {selectedDemo.mentor} • Senior Academy Mentor</p>
                        </div>
                    </div>

                    <div className="w-full lg:w-[400px] bg-white border-l border-slate-100 flex flex-col h-full overflow-hidden">
                        <div className="p-8 border-b border-slate-50 bg-slate-50/50 text-center">
                            <h3 className="text-xl font-black text-slate-900 flex items-center justify-center gap-3">
                                <BookOpen className="text-indigo-600" /> Lesson Playlist
                            </h3>
                        </div>
                        <div className="flex-grow overflow-y-auto p-6 space-y-4">
                            {[
                                { t: 'Introduction', d: '05:00', active: true },
                                { t: 'Core Fundamentals', d: '15:20', active: false },
                                { t: 'Advanced Logic & Flow', d: '25:40', active: false }
                            ].map((item, i) => (
                                <div key={i} className={`p-5 rounded-3xl border transition-all flex items-center justify-between group cursor-pointer ${
                                    item.active ? 'bg-indigo-50 border-indigo-200 shadow-lg' : 'bg-white border-slate-100 hover:border-indigo-200'
                                }`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs ${item.active ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                                            {item.active ? <Play size={14} fill="currentColor" /> : i + 1}
                                        </div>
                                        <div>
                                            <p className={`text-sm font-black ${item.active ? 'text-indigo-900' : 'text-slate-700'}`}>{item.t}</p>
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">{item.d}</p>
                                        </div>
                                    </div>
                                    {!item.active && <Lock size={14} className="text-slate-200" />}
                                </div>
                            ))}
                        </div>
                        <div className="p-8 border-t border-slate-50 bg-slate-50/50">
                            <button 
                                onClick={() => {
                                    if (user?.isSubscribed) alert('🚀 You already have Full Access!');
                                    else setShowSubscription(true);
                                }} 
                                className="w-full py-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black rounded-3xl shadow-2xl shadow-indigo-200 flex items-center justify-center gap-3"
                            >
                                {user?.isSubscribed ? 'Premium Access Active' : 'Unlock All Content'} {user?.isSubscribed ? <CheckCircle2 size={18} /> : <Lock size={18} />}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSubscription && (
          <SubscriptionPopup onClose={() => setShowSubscription(false)} />
        )}
      </AnimatePresence>
 
      <Footer />
    </div>
  );
};

export default Home;
