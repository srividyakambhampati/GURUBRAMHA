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
  X,
  FileText,
  Video
} from 'lucide-react';
import axios from 'axios';
import Footer from '../components/Footer';
import SubscriptionPopup from '../components/SubscriptionPopup';
import { handlePayment } from '../utils/razorpay';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

const Courses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [showSubscription, setShowSubscription] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Frontend', 'Backend', 'Fullstack', 'Data Science', 'System Design', 'AI & ML', 'Interview Prep'];

  // Static Fallback Courses list to ensure the catalog is pre-populated with beautiful mock courses
  const staticCourses = [
    { id: 'static-1', title: 'Python Basics Masterclass', instructor: 'David Miller', rating: 4.9, reviews: '2.4k', students: '12k', duration: '30:00', level: 'Beginner', price: '₹349', originalPrice: '₹2,999', category: 'Backend', thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800', modules: [] },
    { id: 'static-2', title: 'Java Programming Professional', instructor: 'Sarah Johnson', rating: 4.8, reviews: '1.8k', students: '8k', duration: '45:00', level: 'Intermediate', price: '₹349', originalPrice: '₹3,499', category: 'Backend', thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800', modules: [] },
    { id: 'static-3', title: 'MERN Stack Development 2024', instructor: 'Alex River', rating: 4.9, reviews: '3.2k', students: '15k', duration: '60:00', level: 'Advanced', price: '₹349', originalPrice: '₹4,999', category: 'Fullstack', thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800', modules: [] },
    { id: 'static-4', title: 'Full Stack Web Development', instructor: 'Elena Gilbert', rating: 4.7, reviews: '1.5k', students: '10k', duration: '55:00', level: 'Beginner', price: '₹349', originalPrice: '₹3,999', category: 'Fullstack', thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800', modules: [] },
    { id: 'static-5', title: 'React JS Masterclass: UI/UX', instructor: 'Michael Scott', rating: 4.9, reviews: '4.5k', students: '20k', duration: '40:00', level: 'Advanced', price: '₹349', originalPrice: '₹2,999', category: 'Frontend', thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800', modules: [] },
    { id: 'static-6', title: 'Data Structures & Algorithms', instructor: 'Prateek Narang', rating: 5.0, reviews: '5.2k', students: '25k', duration: '90:00', level: 'Advanced', price: '₹349', originalPrice: '₹5,999', category: 'Interview Prep', thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800', modules: [] }
  ];

  // Fetch courses from server
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/courses`);
        if (res.data && res.data.length > 0) {
          // Format server courses to match catalog requirements
          const formatted = res.data.map(c => {
            const priceVal = typeof c.price === 'number' ? c.price : parseFloat(c.price) || 0;
            return {
              id: c._id || `course-${Math.random()}`,
              title: c.name || 'Untitled Course',
              instructor: c.instructor || 'Guest Instructor',
              rating: 4.9,
              reviews: String(c.students ? Math.round(c.students * 0.15) : 42),
              students: c.students ? `${c.students} joined` : '150+ joined',
              duration: c.watchTime || '12 hrs',
              level: c.isPremium ? 'Advanced' : 'All Levels',
              price: `₹${priceVal}`,
              originalPrice: `₹${Math.round(priceVal * 1.5)}`,
              category: c.category || 'General',
              thumbnail: c.demoUrl || 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
              modules: c.modules || []
            };
          });
          
          // Merge dynamic courses at the top, static courses next
          setCourses([...formatted, ...staticCourses]);
        } else {
          setCourses(staticCourses);
        }
      } catch (err) {
        console.error("Error loading courses:", err);
        setCourses(staticCourses);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // When a course is opened, set the active lesson to the first lesson in the curriculum
  useEffect(() => {
    if (selectedCourse) {
      // Find first lesson in module -> submodule hierarchy
      let firstLesson = null;
      if (selectedCourse.modules) {
        for (const mod of selectedCourse.modules) {
          if (mod.submodules) {
            for (const sub of mod.submodules) {
              if (sub.lessons && sub.lessons.length > 0) {
                firstLesson = sub.lessons[0];
                break;
              }
            }
          }
          if (firstLesson) break;
        }
      }
      setActiveLesson(firstLesson);
    } else {
      setActiveLesson(null);
    }
  }, [selectedCourse]);

  const filteredCourses = activeFilter === 'All' 
    ? courses 
    : courses.filter(c => c.category === activeFilter);

  // Auto-trigger subscription popup when video ends
  useEffect(() => {
    let interval;
    if (selectedCourse) {
        interval = setInterval(() => {
            setCurrentTime(prev => {
                const totalSeconds = 600; // default 10 minutes mock watch trigger
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
  }, [selectedCourse, showSubscription]);

  // Helper to parse YouTube URLs for embedding
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) 
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0` 
      : url;
  };

  if (selectedCourse) {
    const isYouTube = activeLesson?.videoUrl && (activeLesson.videoUrl.includes('youtube.com') || activeLesson.videoUrl.includes('youtu.be'));
    const isRelativeVideo = activeLesson?.videoUrl && activeLesson.videoUrl.startsWith('/uploads/');
    const videoSource = isRelativeVideo ? `${API_BASE_URL}${activeLesson.videoUrl}` : activeLesson?.videoUrl;

    return (
      <div className="pt-6 pb-20 bg-[#060813] min-h-screen">
        <div className="section-container">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedCourse(null)}
            className="flex items-center gap-2 text-slate-400 hover:text-blue-500 mb-10 font-black uppercase tracking-widest text-xs transition-all group"
          >
            <ChevronRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to Catalog
          </motion.button>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Video Section */}
            <div className="flex-grow space-y-10">
              <div className="glass-card !p-0 overflow-hidden shadow-2xl relative !bg-black group rounded-[32px] border-slate-800">
                <div className="aspect-video relative w-full h-full min-h-[380px] lg:min-h-[480px]">
                  {activeLesson?.videoUrl ? (
                    isYouTube ? (
                      <iframe 
                        className="w-full h-full absolute inset-0"
                        src={getYouTubeEmbedUrl(activeLesson.videoUrl)}
                        title={activeLesson.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <video 
                        className="w-full h-full absolute inset-0 object-contain"
                        src={videoSource}
                        controls
                        autoPlay
                      ></video>
                    )
                  ) : (
                    <>
                      <img src={selectedCourse.thumbnail} alt={selectedCourse.title} className="w-full h-full object-cover opacity-60 absolute inset-0" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-950/40">
                        <button 
                          onClick={() => {
                            if (!user?.isSubscribed) {
                              setShowSubscription(true);
                            }
                          }}
                          className="w-24 h-24 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center text-white border border-white/20 hover:scale-110 transition-transform shadow-2xl group-hover:bg-white/20"
                        >
                          <Play fill="currentColor" size={40} className="ml-2" />
                        </button>
                        <p className="text-white font-bold text-sm mt-4 tracking-wide text-center">
                          {selectedCourse.modules && selectedCourse.modules.length > 0 
                            ? 'Select a lesson from the curriculum sidebar to start learning!' 
                            : 'No video lessons are available for this course yet.'}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Lesson details & attached PDF Resources */}
              <div className="glass-card !bg-slate-900/80 border-slate-800 shadow-none">
                <h1 className="text-3xl font-black text-white mb-4">{selectedCourse.title}</h1>
                
                {/* Active Lesson Details */}
                {activeLesson && (
                  <div className="mb-6 p-4 bg-slate-950/40 border border-slate-800 rounded-2xl flex items-center gap-3">
                    <Video size={18} className="text-cyan-400" />
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">Currently Playing</span>
                      <span className="text-sm font-bold text-white">{activeLesson.title}</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-8 mb-10 text-sm font-bold text-slate-400">
                    <div className="flex items-center gap-2">
                        <Users size={18} className="text-blue-500" /> {selectedCourse.students}
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={18} className="text-blue-500" /> {selectedCourse.duration} content
                    </div>
                    <div className="flex items-center gap-2">
                        <Star size={18} className="text-amber-500" fill="currentColor" /> {selectedCourse.rating} ({selectedCourse.reviews} reviews)
                    </div>
                    <div className="px-4 py-1.5 bg-blue-500/10 text-blue-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                        {selectedCourse.category}
                    </div>
                </div>

                <div className="prose prose-slate max-w-none text-slate-400 font-medium leading-relaxed">
                    <h3 className="text-xl font-bold text-white mb-4">Mastery Program Details</h3>
                    <p>Unlock industry-standard expertise with our professional curriculum. This session is designed to give you a high-fidelity overview of the core concepts and real-world applications.</p>
                </div>

                {/* PDF Resources Display */}
                {activeLesson?.resources && activeLesson.resources.length > 0 && (
                  <div className="border-t border-slate-800/80 mt-8 pt-8">
                    <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                      <FileText size={14} className="text-emerald-500" /> Lesson PDF Resources & Study Guides
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeLesson.resources.map((res) => {
                        const fileLink = res.url.startsWith('/') ? `${API_BASE_URL}${res.url}` : res.url;
                        return (
                          <a 
                            key={res.id} 
                            href={fileLink}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-slate-950/60 rounded-2xl border border-slate-800 hover:border-emerald-500/40 text-xs font-bold text-slate-300 hover:text-white transition-all group shadow-sm"
                          >
                            <div className="flex items-center gap-3 truncate">
                              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                                <FileText size={16} />
                              </div>
                              <span className="truncate">{res.title}</span>
                            </div>
                            <span className="text-[10px] text-emerald-400 group-hover:underline font-black uppercase tracking-widest">Open PDF</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Curriculum Sidebar */}
            <div className="w-full lg:w-[400px] space-y-8">
              <div className="glass-card !p-8 !bg-slate-900/80 border-slate-800 shadow-none">
                <h3 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
                    <Book size={24} className="text-blue-500" /> Full Curriculum
                </h3>
                
                <div className="space-y-6">
                  {selectedCourse.modules && selectedCourse.modules.length > 0 ? (
                    selectedCourse.modules.map((mod, mIdx) => (
                      <div key={mod.id || mIdx} className="space-y-3">
                        <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
                          <span className="text-xs font-black text-white uppercase tracking-wider">{mod.title}</span>
                        </div>
                        
                        <div className="space-y-4 pl-1">
                          {mod.submodules?.map((sub, sIdx) => (
                            <div key={sub.id || sIdx} className="space-y-2">
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">Submodule: {sub.title}</span>
                              <div className="space-y-2">
                                {sub.lessons?.map((les, lIdx) => {
                                  const isActive = activeLesson?.id === les.id;
                                  const isAllowed = user?.isSubscribed || les.isFreePreview || (selectedCourse.id && typeof selectedCourse.id === 'string' && !selectedCourse.id.startsWith('static-'));
                                  
                                  return (
                                    <div 
                                      key={les.id || lIdx}
                                      onClick={() => {
                                        if (isAllowed) {
                                          setActiveLesson(les);
                                        } else {
                                          setShowSubscription(true);
                                        }
                                      }}
                                      className={`p-4 rounded-xl border transition-all flex items-center justify-between group cursor-pointer ${
                                        isActive ? 'bg-blue-500/10 border-blue-500/30 shadow-lg' : 'bg-slate-800/50 border-slate-800 hover:border-blue-500/30'
                                      }`}
                                    >
                                      <div className="flex items-center gap-3 w-[85%]">
                                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                                          isActive ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300'
                                        }`}>
                                          {lIdx + 1}
                                        </div>
                                        <div className="truncate">
                                          <p className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>{les.title}</p>
                                          {les.videoUrl ? (
                                            <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-widest flex items-center gap-1 mt-0.5"><Play size={8} fill="currentColor" /> Playable Video</span>
                                          ) : (
                                            <span className="text-[9px] text-slate-500 italic block mt-0.5">No video URL</span>
                                          )}
                                        </div>
                                      </div>
                                      {!isAllowed && <Lock size={12} className="text-slate-650 group-hover:text-blue-500 transition-colors" />}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    /* Fallback to static staticCurriculum lessons if modules are empty */
                    <div className="space-y-4">
                      {[
                          { title: 'Intro & Environment', time: '10:00', active: true },
                          { title: 'Foundational Pillars', time: '20:00', active: false },
                          { title: 'Advanced Logic & Flow', time: '25:00', active: false },
                          { title: 'Project Implementation', time: '40:00', active: false }
                      ].map((lesson, i) => (
                          <div key={i} className={`p-5 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer ${
                              lesson.active ? 'bg-blue-500/10 border-blue-500/30 shadow-lg' : 'bg-slate-800/50 border-slate-800 hover:border-blue-500/30'
                          }`}>
                              <div className="flex items-center gap-4">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                                      lesson.active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'bg-slate-700 text-slate-300'
                                  }`}>
                                      {i + 1}
                                  </div>
                                  <div className="space-y-1">
                                      <p className={`text-sm font-black ${lesson.active ? 'text-white' : 'text-slate-300 group-hover:text-white transition-colors'}`}>{lesson.title}</p>
                                      <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{lesson.time}</p>
                                  </div>
                              </div>
                              {!lesson.active && <Lock size={14} className="text-slate-600 group-hover:text-blue-500 transition-colors" />}
                          </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-10 p-6 bg-slate-800/50 rounded-3xl text-center border border-dashed border-slate-700">
                    <p className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">Pricing for Full Course</p>
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <span className="text-4xl font-black text-white">{selectedCourse.price}</span>
                        <span className="text-lg font-bold text-slate-500 line-through">{selectedCourse.originalPrice}</span>
                    </div>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            if (user?.isSubscribed) alert('🚀 Accessing Full Course Content...');
                            else setShowSubscription(true);
                        }}
                        className="w-full py-5 btn-radiant-orange text-white font-black rounded-2xl flex items-center justify-center gap-3 border-none"
                    >
                        {user?.isSubscribed ? 'Continue Full Course' : 'Buy This Course'} <ArrowRight size={18} />
                    </button>
                </div>
              </div>

              <div className="glass-card !p-8 !bg-slate-900 !border-slate-800 text-center">
                <h4 className="font-black text-white text-lg mb-4">Unlimited Access Plan</h4>
                <p className="text-xs font-medium text-slate-400 mb-8 leading-relaxed">Join our Monthly or Yearly subscription to unlock all 10+ courses instantly.</p>
                <button 
                    onClick={() => setShowSubscription(true)}
                    className="w-full py-4 bg-transparent border-2 border-[#6366F1]/30 hover:border-[#6366F1] text-slate-200 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#6366F1]/10 transition-all duration-300"
                >
                    View All Plans
                </button>
              </div>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {showSubscription && <SubscriptionPopup onClose={() => setShowSubscription(false)} />}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="pt-6 pb-20 bg-[#060813] min-h-screen">
      <div className="section-container">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20">
            <div className="max-w-2xl">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#090d20] shadow-lg shadow-blue-900/10 border border-white/5 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] mb-10"
                >
                    <Book size={14} /> Global Academy Catalog
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="heading-xl text-white mb-6"
                >
                    Elite Course <br /> <span className="text-gradient-rose">Library</span>
                </motion.h1>
                <p className="text-slate-400 font-medium text-xl leading-relaxed">
                    Master industry-standard skills for just <span className="text-cyan-405 font-black">₹349</span>. High-fidelity technical education designed by FAANG experts.
                </p>
            </div>
            <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="relative flex-grow lg:w-96">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input 
                      type="text" 
                      placeholder="Search for subjects, mentors..."
                      className="w-full pl-16 pr-6 py-5 bg-[#090d20]/80 border border-white/5 rounded-[24px] focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-550 outline-none shadow-xl shadow-black/50 font-medium text-white placeholder-slate-650"
                    />
                </div>
            </div>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-row flex-nowrap items-center gap-4 mb-16 overflow-x-auto pb-4 w-full custom-scrollbar">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-8 py-3.5 rounded-[18px] text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                        activeFilter === cat 
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/50 border-blue-500' 
                        : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-blue-500 hover:text-white'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Course Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-400 text-sm font-bold">Loading Elite Course Catalog...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredCourses.map((course, i) => (
                  <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -12 }}
                      className="glass-card !p-0 overflow-hidden group cursor-pointer border-slate-800 hover:shadow-2xl hover:shadow-blue-900/30 transition-all duration-500 !bg-slate-900/80"
                  >
                      <div className="h-56 relative overflow-hidden" onClick={() => setSelectedCourse(course)}>
                          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute top-6 left-6 flex flex-col gap-2">
                              <span className="bg-slate-900/90 backdrop-blur-md text-blue-500 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-xl shadow-lg border border-slate-700">{course.category}</span>
                              <span className="bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-xl shadow-lg border border-white/10">{course.level}</span>
                          </div>
                          <div className="absolute inset-0 bg-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-2xl scale-0 group-hover:scale-100 transition-transform">
                                  <Play fill="currentColor" size={24} className="ml-1" />
                              </div>
                          </div>
                      </div>
                      <div className="p-8">
                          <div className="flex items-center gap-2 mb-4 text-amber-500 font-black text-sm">
                              <Star size={18} fill="currentColor" /> {course.rating} <span className="text-slate-500 font-bold">({course.reviews})</span>
                          </div>
                          <h3 className="text-xl font-black text-white mb-4 group-hover:text-blue-500 transition-colors leading-snug line-clamp-2" onClick={() => setSelectedCourse(course)}>{course.title}</h3>
                          <p className="text-slate-400 text-sm font-medium mb-8 flex items-center gap-2">
                              <Users size={16} className="text-slate-500" /> {course.students}
                          </p>
                          
                          <div className="flex items-center justify-between pt-8 border-t border-slate-800">
                              <div className="flex flex-col">
                                  <span className="text-2xl font-black text-blue-500">{course.price}</span>
                                  <span className="text-[10px] font-black text-slate-500 line-through uppercase tracking-widest">{course.originalPrice}</span>
                              </div>
                              <button 
                                  onClick={(e) => {
                                      e.stopPropagation();
                                      if (user?.isSubscribed) setSelectedCourse(course);
                                      else setShowSubscription(true);
                                  }}
                                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border-none transition-all duration-300 ${
                                      user?.isSubscribed ? 'btn-radiant-cyan text-white' : 'btn-radiant-orange text-white'
                                  }`}
                              >
                                  {user?.isSubscribed ? 'Enter Course' : 'Enroll Now'}
                              </button>
                          </div>
                      </div>
                  </motion.div>
              ))}
          </div>
        )}
      </div>
      
      <AnimatePresence>
        {showSubscription && <SubscriptionPopup onClose={() => setShowSubscription(false)} />}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
};

export default Courses;
