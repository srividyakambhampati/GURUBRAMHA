import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Sanitization helper
  const sanitizeInput = (str) => {
    return str.replace(/<[^>]*>/g, '').trim();
  };

  // Real-time validations
  useEffect(() => {
    if (touched.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email.length > 0 && !emailRegex.test(formData.email)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address.' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    }

    if (touched.password) {
      if (formData.password.length > 0 && formData.password.length < 1) {
        setErrors(prev => ({ ...prev, password: 'Password is required.' }));
      } else {
        setErrors(prev => ({ ...prev, password: '' }));
      }
    }
  }, [formData, touched]);

  const isFormValid = formData.email.length > 0 && !errors.email && formData.password.length > 0 && !errors.password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email: sanitizeInput(formData.email),
        password: formData.password
      });

      if (response.data.user) {
        login(response.data.user);
        if (response.data.user.email === 'adminguru@gmail.com') {
          navigate('/admin');
        } else {
          navigate('/dashboard'); 
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
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
    <div className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden bg-[#0F172A] selection:bg-cyan-400/30">
      {/* Decorative Elite Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-cyan-500/10 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-400/10 rounded-full blur-[150px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-[500px] bg-slate-800/80 backdrop-blur-xl p-10 md:p-14 rounded-[48px] shadow-2xl border border-slate-700 relative z-10"
      >
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-[24px] flex items-center justify-center text-white font-black text-3xl mx-auto mb-8 shadow-2xl shadow-cyan-400/30 group-hover:rotate-6 transition-transform">
            G
          </div>
          <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Elite <span className="text-cyan-400">Access</span></h1>
          <p className="text-slate-400 font-bold text-sm tracking-wide">Enter the GuruBramha Academy Vault</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1 flex justify-between items-center">
                Email Scholar <span><ShieldCheck size={12} className="text-cyan-400" /></span>
              </label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors" size={20} />
                <input 
                  type="email" 
                  placeholder="scholar@gurubramha.edu"
                  className={`w-full pl-14 pr-6 py-5 bg-slate-900/50 border rounded-2xl outline-none transition-all font-bold text-white placeholder:text-slate-500 focus:ring-4 ${
                    !touched.email ? 'border-slate-700 focus:border-cyan-400/30 focus:ring-cyan-400/10' :
                    errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' :
                    'border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/10'
                  }`}
                  value={formData.email}
                  onBlur={() => setTouched({ ...touched, email: true })}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              {touched.email && errors.email && <p className="text-red-400 text-xs font-bold px-1 mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Academy Credentials</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-400 transition-colors" size={20} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className={`w-full pl-14 pr-14 py-5 bg-slate-900/50 border rounded-2xl outline-none transition-all font-bold text-white placeholder:text-slate-500 focus:ring-4 ${
                    !touched.password ? 'border-slate-700 focus:border-cyan-400/30 focus:ring-cyan-400/10' :
                    errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' :
                    'border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/10'
                  }`}
                  value={formData.password}
                  onBlur={() => setTouched({ ...touched, password: true })}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-500 transition-all"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {touched.password && errors.password && <p className="text-red-400 text-xs font-bold px-1 mt-1">{errors.password}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest px-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  className="peer w-5 h-5 rounded-lg border-slate-700 bg-slate-900 text-cyan-400 focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                />
              </div>
              <span className="text-slate-400 group-hover:text-slate-300 transition-colors">Remember Session</span>
            </label>
            <Link to="/forgot-password" className="text-cyan-400 hover:text-cyan-500 transition-colors">Forgot Access?</Link>
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !isFormValid}
            className="w-full py-5 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-black rounded-2xl shadow-2xl shadow-cyan-400/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 text-sm uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>Initialize Secure Login <ArrowRight size={20} /></>
            )}
          </button>

          <div className="relative py-2 flex items-center">
            <div className="flex-grow border-t border-slate-700"></div>
            <span className="flex-shrink mx-6 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Social Auth Gateway</span>
            <div className="flex-grow border-t border-slate-700"></div>
          </div>

          <button 
            type="button" 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-4 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center gap-4 hover:bg-slate-700 transition-all font-black text-[10px] uppercase tracking-widest text-white shadow-sm disabled:opacity-70"
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

          <p className="text-center text-slate-400 font-bold text-sm">
            Not an authorized scholar? <Link to="/signup" className="text-cyan-400 font-black hover:underline ml-1">Join the Academy</Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
