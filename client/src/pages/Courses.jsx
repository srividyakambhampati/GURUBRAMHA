import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  ChevronRight,
  Book,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  Activity,
  Volume2,
  Maximize2,
  X
} from 'lucide-react';
import Footer from '../components/Footer';
import SubscriptionPopup from '../components/SubscriptionPopup';
import { handlePayment } from '../utils/razorpay';
import { useAuth } from '../context/AuthContext';

const Courses = () => {
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showSubscription, setShowSubscription] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentTime, setCurrentTime] = useState(0);

  const categories = ['All', 'Frontend', 'Backend', 'Fullstack', 'Data Science', 'System Design', 'AI & ML', 'Interview Prep'];

  const courses = [
    { id: 1, title: 'Python Basics Masterclass', instructor: 'David Miller', rating: 4.9, reviews: '2.4k', students: '12k', duration: '30:00', level: 'Beginner', price: '₹299', originalPrice: '₹2,999', category: 'Backend', thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800' },
    { id: 2, title: 'Java Programming Professional', instructor: 'Sarah Johnson', rating: 4.8, reviews: '1.8k', students: '8k', duration: '45:00', level: 'Intermediate', price: '₹299', originalPrice: '₹3,499', category: 'Backend', thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800' },
    { id: 3, title: 'MERN Stack Development 2024', instructor: 'Alex River', rating: 4.9, reviews: '3.2k', students: '15k', duration: '60:00', level: 'Advanced', price: '₹299', originalPrice: '₹4,999', category: 'Fullstack', thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800' },
    { id: 4, title: 'Full Stack Web Development', instructor: 'Elena Gilbert', rating: 4.7, reviews: '1.5k', students: '10k', duration: '55:00', level: 'Beginner', price: '₹299', originalPrice: '₹3,999', category: 'Fullstack', thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800' },
    { id: 5, title: 'React JS Masterclass: UI/UX', instructor: 'Michael Scott', rating: 4.9, reviews: '4.5k', students: '20k', duration: '40:00', level: 'Advanced', price: '₹299', originalPrice: '₹2,999', category: 'Frontend', thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800' },
    { id: 6, title: 'Data Structures & Algorithms', instructor: 'Prateek Narang', rating: 5.0, reviews: '5.2k', students: '25k', duration: '90:00', level: 'Advanced', price: '₹299', originalPrice: '₹5,999', category: 'Interview Prep', thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800' },
    { id: 7, title: 'Machine Learning for Everyone', instructor: 'Dr. Angela Yu', rating: 4.8, reviews: '2.1k', students: '11k', duration: '75:00', level: 'Intermediate', price: '₹299', originalPrice: '₹4,499', category: 'AI & ML', thumbnail: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=800' },
    { id: 8, title: 'SQL & Database Management Pro', instructor: 'Josh Comeau', rating: 4.6, reviews: '1.2k', students: '9k', duration: '35:00', level: 'Beginner', price: '₹299', originalPrice: '₹2,499', category: 'Backend', thumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800' },
    { id: 9, title: 'Aptitude & Reasoning Training', instructor: 'Rohan Sharma', rating: 4.7, reviews: '6k', students: '30k', duration: '50:00', level: 'Beginner', price: '₹299', originalPrice: '₹1,999', category: 'Interview Prep', thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800' },
    { id: 10, title: 'Elite Interview Preparation', instructor: 'Vikram Malhotra', rating: 4.9, reviews: '8k', students: '40k', duration: '120:00', level: 'Advanced', price: '₹299', originalPrice: '₹6,999', category: 'Interview Prep', thumbnail: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800' },
  ];

  const filteredCourses = activeFilter === 'All' 
    ? courses 
    : courses.filter(c => c.category === activeFilter);

  // Auto-trigger subscription popup when video ends or near end
  useEffect(() => {
    let interval;
    if (selectedCourse) {
        interval = setInterval(() => {
            setCurrentTime(prev => {
                const totalSeconds = parseInt(selectedCourse.duration.split(':')[0]) * 60;
                // Show popup when video ends if not subscribed
                if (prev >= totalSeconds && !showSubscription && !user?.isSubscribed) {
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
  }, [selectedCourse, showSubscription]);

  if (selectedCourse) {
    return (
      <div className="pt-24 pb-20 bg-[#F8FAFC] min-h-screen">
        <div className="section-container">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedCourse(null)}
            className="flex items-center gap-2 text-slate-500 hover:text-orange-600 mb-10 font-black uppercase tracking-widest text-xs transition-all group"
          >
            <ChevronRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to Catalog
          </motion.button>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Video Section */}
            <div className="flex-grow space-y-10">
              <div className="glass-card !p-0 overflow-hidden shadow-2xl relative !bg-black group rounded-[32px]">
                <div className="aspect-video relative">
                  <img src={selectedCourse.thumbnail} alt={selectedCourse.title} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-24 h-24 bg-white/20 backdrop-blur-2xl rounded-full flex items-center justify-center text-white border border-white/30 hover:scale-110 transition-transform shadow-2xl group-hover:bg-white/30">
                      <Play fill="currentColor" size={40} className="ml-2" />
                    </button>
                  </div>
                  
                  {/* Player Controls Mock */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                    <div className="h-1.5 w-full bg-white/20 rounded-full mb-6 overflow-hidden">
                        <div 
                            className="h-full bg-orange-500 shadow-[0_0_15px_rgba(99,102,241,0.8)] transition-all duration-1000" 
                            style={{ width: `${(currentTime / (parseInt(selectedCourse.duration.split(':')[0]) * 60)) * 100}%` }}
                        ></div>
                    </div>
                    <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-6">
                            <Play fill="currentColor" size={24} />
                            <Volume2 size={24} />
                            <span className="text-sm font-bold opacity-80">
                                {Math.floor(currentTime / 60)}:{String(currentTime % 60).padStart(2, '0')} / {selectedCourse.duration}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-lg">4K Quality</span>
                            <Maximize2 size={24} className="opacity-80" />
                        </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card !bg-white">
                <h1 className="text-3xl font-black text-slate-900 mb-6">{selectedCourse.title}</h1>
                <div className="flex flex-wrap items-center gap-8 mb-10 text-sm font-bold text-slate-500">
                    <div className="flex items-center gap-2">
                        <Users size={18} className="text-orange-500" /> {selectedCourse.students} Scholars
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={18} className="text-orange-500" /> {selectedCourse.duration} content
                    </div>
                    <div className="flex items-center gap-2">
                        <Star size={18} className="text-amber-500" fill="currentColor" /> {selectedCourse.rating} ({selectedCourse.reviews})
                    </div>
                    <div className="px-4 py-1.5 bg-orange-50 text-orange-600 rounded-xl text-[10px] font-black uppercase tracking-widest">
                        {selectedCourse.category}
                    </div>
                </div>
                <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Mastery Program Details</h3>
                    <p>Unlock industry-standard expertise with our professional curriculum. This session is designed to give you a high-fidelity overview of the core concepts and real-world applications.</p>
                </div>
              </div>
            </div>

            {/* Curriculum Sidebar */}
            <div className="w-full lg:w-[400px] space-y-8">
              <div className="glass-card !p-8 !bg-white shadow-2xl shadow-orange-100 border-orange-100">
                <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                    <Book size={24} className="text-orange-600" /> Full Curriculum
                </h3>
                <div className="space-y-4">
                    {[
                        { title: 'Intro & Environment', time: '10:00', active: true },
                        { title: 'Foundational Pillars', time: '20:00', active: false },
                        { title: 'Advanced Logic & Flow', time: '25:00', active: false },
                        { title: 'Project Implementation', time: '40:00', active: false }
                    ].map((lesson, i) => (
                        <div key={i} className={`p-5 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer ${
                            lesson.active ? 'bg-orange-50 border-orange-200 shadow-lg' : 'bg-slate-50 border-slate-50 hover:border-orange-100'
                        }`}>
                            <div className="flex items-center gap-4">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                                    lesson.active ? 'bg-orange-600 text-white' : 'bg-white text-slate-400'
                                }`}>
                                    {i + 1}
                                </div>
                                <div className="space-y-1">
                                    <p className={`text-sm font-black ${lesson.active ? 'text-indigo-900' : 'text-slate-700'}`}>{lesson.title}</p>
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{lesson.time}</p>
                                </div>
                            </div>
                            {!lesson.active && <Lock size={14} className="text-slate-200 group-hover:text-orange-300" />}
                        </div>
                    ))}
                </div>
                <div className="mt-10 p-6 bg-slate-50 rounded-3xl text-center border border-dashed border-slate-200">
                    <p className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">Pricing for Full Course</p>
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="text-4xl font-black text-slate-900">{selectedCourse.price}</span>
                        <span className="text-lg font-bold text-slate-300 line-through">{selectedCourse.originalPrice}</span>
                    </div>
                    <button 
                        onClick={() => {
                            if (user?.isSubscribed) alert('🚀 Accessing Full Course Content...');
                            else setShowSubscription(true);
                        }}
                        className="w-full py-5 bg-orange-600 text-white font-black rounded-2xl shadow-xl shadow-orange-100 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                    >
                        {user?.isSubscribed ? 'Continue Full Course' : 'Buy This Course'} <ArrowRight size={18} />
                    </button>
                </div>
              </div>

              <div className="glass-card !p-8 !bg-orange-50 !border-none text-center">
                <h4 className="font-black text-indigo-900 text-lg mb-4">Unlimited Access Plan</h4>
                <p className="text-xs font-medium text-indigo-700/70 mb-8 leading-relaxed">Join our Monthly or Yearly subscription to unlock all 10+ courses instantly.</p>
                <button 
                    onClick={() => setShowSubscription(true)}
                    className="w-full py-4 bg-white border-2 border-orange-200 text-orange-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 hover:text-slate-900 transition-all"
                >
                    View All Plans
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 mesh-gradient min-h-screen">
      <div className="section-container">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20">
            <div className="max-w-2xl">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white shadow-lg shadow-orange-100/50 border border-slate-100 text-orange-600 text-[10px] font-black uppercase tracking-[0.2em] mb-10"
                >
                    <Book size={14} /> Global Academy Catalog
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="heading-xl mb-6"
                >
                    Elite Course <br /> <span className="text-gradient">Library</span>
                </motion.h1>
                <p className="text-slate-500 font-medium text-xl leading-relaxed">
                    Master industry-standard skills for just <span className="text-orange-600 font-black">₹299</span>. High-fidelity technical education designed by FAANG experts.
                </p>
            </div>
            <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="relative flex-grow lg:w-96">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    <input 
                      type="text" 
                      placeholder="Search for subjects, mentors..."
                      className="w-full pl-16 pr-6 py-5 bg-white border border-slate-100 rounded-[24px] focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none shadow-xl shadow-slate-100 font-medium"
                    />
                </div>
            </div>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center gap-4 mb-16 overflow-x-auto pb-4 custom-scrollbar">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-8 py-3.5 rounded-[18px] text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                        activeFilter === cat 
                        ? 'bg-orange-600 text-white shadow-xl shadow-orange-200' 
                        : 'bg-white text-slate-500 border border-slate-100 hover:border-orange-200'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCourses.map((course, i) => (
                <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -12 }}
                    className="glass-card !p-0 overflow-hidden group cursor-pointer border-slate-100 hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500 !bg-white"
                >
                    <div className="h-56 relative overflow-hidden" onClick={() => setSelectedCourse(course)}>
                        <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                            <span className="bg-white/90 backdrop-blur-md text-orange-600 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-xl shadow-lg border border-white/50">{course.category}</span>
                            <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-xl shadow-lg border border-white/10">{course.level}</span>
                        </div>
                        <div className="absolute inset-0 bg-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-orange-600 shadow-2xl scale-0 group-hover:scale-100 transition-transform">
                                <Play fill="currentColor" size={24} className="ml-1" />
                            </div>
                        </div>
                    </div>
                    <div className="p-8">
                        <div className="flex items-center gap-2 mb-4 text-amber-500 font-black text-sm">
                            <Star size={18} fill="currentColor" /> {course.rating} <span className="text-slate-300 font-bold">({course.reviews})</span>
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-orange-600 transition-colors leading-snug line-clamp-2" onClick={() => setSelectedCourse(course)}>{course.title}</h3>
                        <p className="text-slate-500 text-sm font-medium mb-8 flex items-center gap-2">
                            <Users size={16} className="text-slate-400" /> {course.students} joined
                        </p>
                        
                        <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                            <div className="flex flex-col">
                                <span className="text-2xl font-black text-orange-600">{course.price}</span>
                                <span className="text-[10px] font-black text-slate-300 line-through uppercase tracking-widest">{course.originalPrice}</span>
                            </div>
                            <button 
                                onClick={() => {
                                    if (user?.isSubscribed) setSelectedCourse(course);
                                    else setShowSubscription(true);
                                }}
                                className="px-6 py-2.5 bg-orange-50 group-hover:bg-orange-600 group-hover:text-white text-orange-600 rounded-xl transition-all shadow-inner text-[10px] font-black uppercase tracking-widest"
                            >
                                {user?.isSubscribed ? 'Enter Course' : 'Enroll Now'}
                            </button>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
      
      <AnimatePresence>
        {showSubscription && <SubscriptionPopup onClose={() => setShowSubscription(false)} />}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
};

export default Courses;
