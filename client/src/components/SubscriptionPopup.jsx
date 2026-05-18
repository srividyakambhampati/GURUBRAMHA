import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Check, Star, Zap, Crown, ShieldCheck, ArrowRight, Play } from 'lucide-react';
import { handlePayment } from '../utils/razorpay';
import { useAuth } from '../context/AuthContext';

const SubscriptionPopup = ({ onClose, type }) => {
  const { user, setSubscribed } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(1); // Default to Annual

  const plans = [
    { id: 0, name: 'Monthly Plan', price: 299, displayPrice: '₹299', period: 'month', icon: <Zap className="text-blue-500" />, desc: 'Best for short-term mastery' },
    { id: 1, name: 'Annual Savings', price: 2999, displayPrice: '₹2999', period: 'year', icon: <Crown className="text-amber-500" />, desc: 'Elite access with 2 months free', recommended: true }
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
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="relative w-full max-w-4xl bg-white rounded-[48px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] overflow-hidden border border-slate-100"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-3 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-2xl transition-all z-10"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Left Side: Branding & Info */}
          <div className="lg:w-[45%] p-12 md:p-16 bg-slate-50/50 flex flex-col justify-between">
            <div className="space-y-8">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-500/20">
                G
              </div>
              <div>
                <h2 className="text-4xl font-black text-slate-900 leading-tight mb-4">Unlock Full <br />GuruBramha Access</h2>
                <p className="text-slate-500 font-medium leading-relaxed text-sm">
                    Don't let the learning stop! Subscribe now to unlock our complete catalog of 200+ professional courses.
                </p>
              </div>
              
              <div className="space-y-4">
                {benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-4 text-xs font-bold text-slate-700">
                        <div className="w-6 h-6 rounded-lg bg-green-50 flex items-center justify-center text-green-500">
                            <Check size={14} strokeWidth={4} />
                        </div>
                        {b}
                    </div>
                ))}
              </div>
            </div>

            <div className="pt-12 flex items-center gap-3 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                <ShieldCheck size={16} /> Secure checkout via Guru Vault
            </div>
          </div>

          {/* Right Side: Pricing Plans */}
          <div className="lg:w-[55%] p-12 md:p-16 bg-white space-y-10">
            <div className="text-center lg:text-left">
                <h3 className="text-2xl font-black text-slate-900 mb-2">Select Your Plan</h3>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Risk-free 7-day money back guarantee</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {plans.map((plan) => (
                    <motion.div 
                        key={plan.id}
                        whileHover={{ y: -5 }}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`p-8 rounded-[32px] border-2 transition-all cursor-pointer relative ${
                            selectedPlan === plan.id 
                                ? 'border-indigo-600 bg-indigo-50/30' 
                                : 'border-slate-100 hover:border-indigo-200'
                        }`}
                    >
                        {plan.recommended && (
                            <div className="absolute -top-4 right-8 px-4 py-1.5 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">Most Popular</div>
                        )}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                                    {plan.icon}
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-900">{plan.name}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{plan.desc}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-black text-indigo-600">{plan.displayPrice}</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">/{plan.period}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Selected Billing Tier</label>
              <select 
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(Number(e.target.value))}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-bold text-slate-700 transition-all text-sm cursor-pointer"
              >
                <option value={0}>Monthly Plan — ₹299 / month</option>
                <option value={1}>Annual Savings — ₹2,999 / year (Recommended)</option>
              </select>
            </div>

            <div className="flex flex-col gap-4">
                <button 
                    onClick={handleSubscribe}
                    className="btn-primary w-full py-5 text-lg shadow-2xl shadow-indigo-100 flex items-center justify-center gap-3"
                >
                    Subscribe Now <ArrowRight size={20} />
                </button>
                <button 
                  onClick={onClose}
                  className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2"
                >
                    <Play size={14} className="fill-current" /> Continue Free Demo
                </button>
            </div>
            
            <div className="flex items-center justify-center gap-4 text-xs font-black uppercase tracking-widest text-slate-300">
                <Star size={14} fill="currentColor" className="text-amber-400" /> 
                Trusted by 50,000+ Scholars
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SubscriptionPopup;
