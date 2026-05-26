import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X, ArrowRight } from 'lucide-react';

const ReferralModal = ({ isOpen, onClose, onProceed }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 text-slate-100 font-sans">
          
          {/* Backdrop Blur Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          ></motion.div>
          
          {/* Premium Glassmorphic Referral Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-slate-900/90 backdrop-blur-2xl rounded-[36px] p-10 text-center shadow-2xl border border-slate-800 overflow-hidden"
          >
            {/* Ambient gold glow in background */}
            <div className="absolute top-[-40px] right-[-40px] w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
            
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
            >
              <X size={18} />
            </button>

            {/* Glowing Icon Container */}
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-cyan-500/5">
                <Gift size={36} className="text-cyan-400" />
            </div>
            
            <h2 className="text-3xl font-black text-white mb-3 tracking-tight">Referral Protocol</h2>
            <p className="text-slate-400 font-bold text-xs leading-relaxed mb-8 px-2">
              Enter your friend's referral protocol code to unlock an exclusive <span className="text-cyan-400 font-black">10% discount</span> on any academy tier.
            </p>
            
            <div className="space-y-6">
                <input 
                  type="text" 
                  placeholder="ENTER REFERRAL CODE"
                  className="w-full px-6 py-5 bg-slate-950/60 border border-slate-800 rounded-2xl outline-none text-center font-black tracking-[0.2em] uppercase placeholder:tracking-normal placeholder:font-bold text-white transition-all focus:border-cyan-500/50 focus:ring-4 focus:ring-cyan-500/10"
                />
                
                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={onClose}
                    className="flex-1 py-4 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
                  >
                    Skip Code
                  </button>
                  <button 
                    onClick={onProceed}
                    className="flex-1 py-4 px-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-black rounded-2xl shadow-lg shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest"
                  >
                    Proceed <ArrowRight size={14} />
                  </button>
                </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ReferralModal;
