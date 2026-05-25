import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock } from 'lucide-react';
import Footer from '../components/Footer';

const ComingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#0F172A] min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[150px]"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[150px]"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 bg-white rounded-[40px] p-12 md:p-16 max-w-2xl w-full text-center shadow-2xl"
        >
          <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <Clock size={40} className="text-indigo-600" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Coming <span className="text-[#FFB800]">Soon</span>
          </h1>
          
          <p className="text-slate-500 font-bold text-lg mb-12">
            We are working hard to bring this feature to you. Stay tuned for updates!
          </p>

          <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl hover:shadow-indigo-200"
          >
            <ArrowLeft size={18} /> Back to Home
          </button>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default ComingSoon;
