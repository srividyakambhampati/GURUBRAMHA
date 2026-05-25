import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    // Simulate standard login success
    setTimeout(() => {
      setIsLoading(false);
      login({ 
        displayName: 'Guru Scholar', 
        email: formData.email,
        photoURL: null
      });
      navigate('/dashboard'); 
    }, 1500);
  };

  const handleGoogleLogin = useGoogleLogin({
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
        navigate('/dashboard'); 
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
    <div className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden bg-slate-50 selection:bg-orange-500/30">
      {/* Decorative Elite Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-orange-600/10 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-amber-400/10 rounded-full blur-[150px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-[500px] bg-white p-10 md:p-14 rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 relative z-10"
      >
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-[24px] flex items-center justify-center text-white font-black text-3xl mx-auto mb-8 shadow-2xl shadow-orange-500/30 group-hover:rotate-6 transition-transform">
            G
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Elite <span className="text-orange-500">Access</span></h1>
          <p className="text-slate-500 font-bold text-sm tracking-wide">Enter the GuruBramha Academy Vault</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] px-1 flex justify-between items-center">
                   Email Scholar <span><ShieldCheck size={12} className="text-orange-500" /></span>
                </label>
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
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] px-1">Academy Credentials</label>
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
          </div>

          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest px-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  className="peer w-5 h-5 rounded-lg border-slate-300 bg-white text-orange-500 focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                />
              </div>
              <span className="text-slate-500 group-hover:text-slate-700 transition-colors">Remember Session</span>
            </label>
            <a href="#" className="text-orange-500 hover:text-orange-600 transition-colors">Forgot Access?</a>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black rounded-2xl shadow-2xl shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 text-sm uppercase tracking-widest disabled:opacity-70"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>Initialize Secure Login <ArrowRight size={20} /></>
            )}
          </button>

          <div className="relative py-2 flex items-center">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-6 text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Social Auth Gateway</span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          <button 
            type="button" 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-center gap-4 hover:bg-slate-50 transition-all font-black text-[10px] uppercase tracking-widest text-slate-700 shadow-sm disabled:opacity-70"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            <span>Connect with Google</span>
          </button>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-4"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-slate-500 font-bold text-sm">
            Not an authorized scholar? <Link to="/signup" className="text-orange-600 font-black hover:underline ml-1">Join the Academy</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
