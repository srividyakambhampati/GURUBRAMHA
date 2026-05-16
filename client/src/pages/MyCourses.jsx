import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Play, 
  Clock, 
  Award, 
  ChevronRight, 
  TrendingUp,
  Search,
  Rocket
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const MyCourses = () => {
  // Empty array to simulate no subscriptions initially as requested
  const [subscribedCourses, setSubscribedCourses] = useState([]);

  return (
    <div className="pt-32 pb-20 bg-[#F8FAFC] min-h-screen">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
            <div>
                <motion.h1 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
                >
                    My <span className="text-gradient">Learning</span>
                </motion.h1>
                <p className="text-slate-500 font-medium text-lg">Continue where you left off and achieve your career goals.</p>
            </div>
            
            <div className="relative group w-full md:w-auto">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                    <Search size={18} />
                </div>
                <input 
                    type="text" 
                    placeholder="Search your courses..." 
                    className="w-full md:w-80 pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl font-bold text-slate-700 shadow-sm focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                />
            </div>
        </div>

        {subscribedCourses.length === 0 ? (
            /* Empty State: "Start your career, subscribe to the course" */
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-24 px-8 bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50 text-center max-w-3xl mx-auto"
            >
                <div className="w-24 h-24 bg-indigo-50 rounded-[35px] flex items-center justify-center text-indigo-600 mx-auto mb-8 shadow-xl shadow-indigo-100">
                    <Rocket size={40} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4">Start Your Career Journey</h2>
                <p className="text-slate-500 font-medium text-lg mb-10 leading-relaxed">
                    You haven't subscribed to any courses yet. <br />
                    Unlock premium industry-expert courses and take the first step towards your dream job.
                </p>
                <Link 
                    to="/courses" 
                    className="inline-flex items-center gap-3 px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-indigo-200 hover:scale-105 active:scale-95 transition-all"
                >
                    Browse Courses <ChevronRight size={18} />
                </Link>
            </motion.div>
        ) : (
            /* Subscribed Courses List */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {subscribedCourses.map((course) => (
                    <motion.div 
                        key={course.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card !p-0 !bg-white border-slate-100 shadow-xl hover:shadow-2xl transition-all overflow-hidden group"
                    >
                        <div className="aspect-video relative overflow-hidden">
                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 flex items-center gap-2">
                                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-black text-white uppercase tracking-widest">
                                    {course.category}
                                </span>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">{course.title}</h3>
                            <div className="flex items-center gap-4 text-slate-400 mb-6">
                                <div className="flex items-center gap-1 text-xs font-bold">
                                    <Clock size={14} /> {course.duration}
                                </div>
                                <div className="flex items-center gap-1 text-xs font-bold">
                                    <TrendingUp size={14} /> {course.progress}% Done
                                </div>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-indigo-600 rounded-full" 
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <button className="w-full flex items-center justify-center gap-3 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200">
                                <Play size={14} fill="currentColor" /> Continue Learning
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyCourses;
