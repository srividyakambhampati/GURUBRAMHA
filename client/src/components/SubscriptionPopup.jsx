import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Star, Zap, Crown, ShieldCheck, ArrowRight, Play } from 'lucide-react';
import { handlePayment } from '../utils/razorpay';
import { useAuth } from '../context/AuthContext';

const SubscriptionPopup = ({ onClose, type }) => {
  const { user, setSubscribed } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(1); // Default to Annual

  const plans = [
    { id: 0, name: 'Monthly Plan', price: 349, displayPrice: '₹349', period: 'month', icon: <Zap className="text-blue-450" />, desc: 'Best for short-term mastery' },
    { id: 1, name: 'Annual Savings', price: 2499, displayPrice: '₹2499', period: 'year', icon: <Crown className="text-amber-450" />, desc: 'Elite access with 2 months free', recommended: true }
  ];

  const benefits = [
    'Unlimited Course Access',
    'Integrated Coding Arena',
    'Career Roadmaps & Interview Prep',
    'Daily Mock Tests & Quizzes',
    'Verified Certificates & PDFs',
    '1-on-1 Mentor Support'
  ];

  const handleSubscribe = () => {
    const plan = plans[selectedPlan];
    handlePayment({
        amount: plan.price,
        description: `Subscription: ${plan.name}`,
        user,
        onSuccess: () => {
            setSubscribed(true);
            onClose();
        }
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 15 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-4xl bg-[#090d20] rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] overflow-y-auto max-h-[90vh] border border-white/10 custom-scrollbar"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all z-10"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Left Side: Branding & Info */}
          <div className="lg:w-[45%] p-8 md:p-10 bg-[#060813]/85 flex flex-col justify-between border-r border-white/5 gap-8">
            <div className="space-y-6">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FB923C] via-[#F43F5E] to-[#EC4899] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl shadow-rose-500/20">
                G
              </div>
              <div>
                <h2 className="text-3xl font-black text-white leading-tight mb-3">
                  Unlock Full <br />
                  <span className="text-gradient-rose">GuruBramha</span> Access
                </h2>
                <p className="text-slate-400 font-medium leading-relaxed text-xs">
                    Don't let the learning stop! Subscribe now to unlock our complete catalog of professional courses.
                </p>
              </div>
              
              <div className="space-y-3.5">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-350">
                    <div className="w-5.5 h-5.5 rounded-lg bg-green-500/10 flex items-center justify-center text-green-405">
                      <Check size={12} strokeWidth={4} />
                    </div>
                    {b}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 flex items-center gap-2.5 text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] border-t border-white/5">
              <ShieldCheck size={14} /> Secure checkout via Guru Vault
            </div>
          </div>

          {/* Right Side: Pricing Plans */}
          <div className="lg:w-[55%] p-8 md:p-10 bg-[#090d20] space-y-6 flex flex-col justify-between">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-black text-white mb-1.5">Select Your Plan</h3>
              <p className="text-slate-405 font-bold text-[10px] uppercase tracking-widest">Risk-free 7-day money back guarantee</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {plans.map((plan) => (
                <motion.div 
                  key={plan.id}
                  whileHover={{ y: -2 }}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`p-5 rounded-[24px] border-2 transition-all cursor-pointer relative ${
                    selectedPlan === plan.id 
                      ? 'border-[#EC4899] bg-[#EC4899]/5' 
                      : 'border-white/5 bg-[#060813]/40 hover:border-white/20'
                  }`}
                >
                  {plan.recommended && (
                    <div className="absolute -top-3.5 right-6 px-3 py-1 bg-gradient-to-r from-[#FB923C] to-[#EC4899] text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg">Most Popular</div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 text-white">
                        {plan.icon}
                      </div>
                      <div>
                        <h4 className="font-black text-sm text-white">{plan.name}</h4>
                        <p className="text-[9px] font-bold text-slate-450 uppercase tracking-widest mt-0.5">{plan.desc}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-[#EC4899]">{plan.displayPrice}</p>
                      <p className="text-[9px] font-black text-slate-450 uppercase tracking-widest">/{plan.period}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-450">Selected Billing Tier</label>
              <select 
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(Number(e.target.value))}
                className="w-full px-5 py-3 bg-[#060813] border border-white/10 rounded-xl focus:border-[#EC4899] outline-none font-bold text-slate-200 transition-all text-xs cursor-pointer"
              >
                <option value={0} className="bg-[#090d20]">Monthly Plan — ₹349 / month</option>
                <option value={1} className="bg-[#090d20]">Annual Savings — ₹2,499 / year (Recommended)</option>
              </select>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={handleSubscribe}
                className="btn-radiant-orange w-full py-4 text-base flex items-center justify-center gap-3 border-none !rounded-xl"
              >
                Subscribe Now <ArrowRight size={18} />
              </button>
              <button 
                onClick={onClose}
                className="w-full py-2 text-[9px] font-black uppercase tracking-[0.2em] text-slate-450 hover:text-[#EC4899] transition-colors flex items-center justify-center gap-1.5"
              >
                <Play size={12} className="fill-current" /> Continue Free Demo
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500 border-t border-white/5 pt-4">
              <Star size={12} fill="currentColor" className="text-amber-400" /> 
              Trusted by 50,000+ Scholars
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SubscriptionPopup;
