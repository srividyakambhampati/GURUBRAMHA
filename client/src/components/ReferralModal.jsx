import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X, ArrowRight } from 'lucide-react';

const ReferralModal = ({ isOpen, onClose, onProceed }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
          ></motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md glass rounded-[2.5rem] p-10 text-center shadow-2xl border-white/20"
          >
            <div className="w-20 h-20 bg-indigo-600/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Gift size={40} className="text-indigo-600" />
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Referral Bonus</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Enter your friend's referral code to unlock an exclusive <span className="text-indigo-600 font-bold">10% discount</span> on any premium plan.</p>
            
            <div className="space-y-4">
                <input 
                    type="text" 
                    placeholder="ENTER CODE HERE"
                    className="w-full px-6 py-4 bg-white/5 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-center font-bold tracking-[0.2em] uppercase placeholder:tracking-normal placeholder:font-medium"
                />
                
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button 
                        onClick={onClose}
                        className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                    >
                        Skip for now
                    </button>
                    <button 
                        onClick={onProceed}
                        className="btn-primary flex-1 !py-4 flex items-center justify-center gap-2"
                    >
                        Proceed <ArrowRight size={18} />
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
