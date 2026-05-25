import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Phone, Gift, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ReferralModal from '../components/ReferralModal';
import { useAuth } from '../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Signup = () => {
  const [showReferral, setShowReferral] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    referral: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    // Simulate standard signup success
    setTimeout(() => {
      setIsLoading(false);
      login({ 
        displayName: formData.username, 
        email: formData.email,
        photoURL: null
      });
      setShowReferral(true);
    }, 1500);
  };

  const handleGoogleSignup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      setError('');
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        
        const userData = {
          uid: res.data.sub,
          displayName: res.data.name,
          email: res.data.email,
          photoURL: res.data.picture,
          token: tokenResponse.access_token
        };
        
        login(userData);
        setShowReferral(true);
      } catch (err) {
        setError("Failed to fetch Google profile. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => setError("Google login failed. Please try again."),
    prompt: 'select_account'
  });

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden bg-slate-50 selection:bg-orange-500/30">
      {/* Decorative Elite Blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-orange-600/10 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-amber-400/10 rounded-full blur-[150px]"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-white p-10 md:p-14 rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 relative z-10"
      >
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-[24px] flex items-center justify-center text-white font-black text-3xl mx-auto mb-8 shadow-2xl shadow-orange-500/30 group-hover:rotate-6 transition-transform">
            G
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Academic <span className="text-orange-500">Registration</span></h1>
          <p className="text-slate-500 font-bold text-sm tracking-wide">Join 50,000+ scholars mastering the future</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] px-1">Legal Identity</label>
                <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="e.g. Alex River"
                        className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:bg-white focus:border-orange-500/30 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-400"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        required
                    />
                </div>
            </div>
            <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] px-1">Comm Channel</label>
                <div className="relative group">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                    <input 
                        type="tel" 
                        placeholder="+91 98765..."
                        className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:bg-white focus:border-orange-500/30 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-400"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                    />
                </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] px-1">Scholar Email</label>
            <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                <input 
                    type="email" 
                    placeholder="scholar@gurubramha.edu"
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:bg-white focus:border-orange-500/30 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-400"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] px-1 flex justify-between items-center">
                Referral Protocol <span className="text-orange-500 text-[8px] font-black uppercase">Optional 10% Discount</span>
            </label>
            <div className="relative group">
                <Gift className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                <input 
                    type="text" 
                    placeholder="Enter Protocol Code"
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:bg-white focus:border-orange-500/30 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-400"
                    value={formData.referral}
                    onChange={(e) => setFormData({...formData, referral: e.target.value})}
                />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] px-1">Security Key</label>
                <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••"
                        className="w-full pl-14 pr-14 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:bg-white focus:border-orange-500/30 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-400"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                    />
                    <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-600 transition-all"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>
            <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] px-1">Re-Verify Key</label>
                <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
                    <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••"
                        className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-orange-500/10 focus:bg-white focus:border-orange-500/30 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-400"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        required
                    />
                </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-2xl shadow-2xl shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 text-sm uppercase tracking-widest disabled:opacity-70"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>Establish Scholar Profile <ArrowRight size={20} /></>
            )}
          </button>

          <div className="relative py-2 flex items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-6 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Direct Integration</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          <button 
            type="button" 
            onClick={handleGoogleSignup}
            disabled={isLoading}
            className="w-full py-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-center gap-4 hover:bg-slate-50 transition-all font-black text-[10px] uppercase tracking-widest text-slate-700 shadow-sm disabled:opacity-70"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            <span>Register with Google Vault</span>
          </button>

          <p className="text-center text-slate-500 font-bold text-sm">
            Already an established scholar? <Link to="/login" className="text-orange-600 font-black hover:underline ml-1">Secure Login</Link>
          </p>
        </form>
      </motion.div>

      <ReferralModal 
        isOpen={showReferral} 
        onClose={() => navigate('/dashboard')} 
        onProceed={() => {
          setShowReferral(false);
          navigate('/dashboard'); 
        }}
      />
    </div>
  );
};

export default Signup;
