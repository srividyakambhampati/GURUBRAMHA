import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, Gift, ArrowRight, Eye, EyeOff, MapPin, Check, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ReferralModal from '../components/ReferralModal';
import { useAuth } from '../context/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

const Signup = () => {
  const [showReferral, setShowReferral] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    referral: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const [touched, setTouched] = useState({
    username: false,
    email: false,
    phone: false,
    address: false,
    password: false,
    confirmPassword: false
  });

  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Password Requirements Checks
  const pwChecks = {
    hasUpper: /[A-Z]/.test(formData.password),
    hasLower: /[a-z]/.test(formData.password),
    hasNumber: /\d/.test(formData.password),
    hasSpecial: /[@$!%*?&#]/.test(formData.password),
    hasMinLen: formData.password.length >= 8
  };

  const isPasswordValid = Object.values(pwChecks).every(Boolean);

  // Sanitization function (Frontend layer helper)
  const sanitizeInput = (str) => {
    return str.replace(/<[^>]*>/g, '').trim();
  };

  // Real-time validations
  useEffect(() => {
    // Validate Name
    if (touched.username) {
      const sanitizedVal = sanitizeInput(formData.username);
      if (formData.username.length > 0 && /[0-9]/.test(sanitizedVal)) {
        setErrors(prev => ({ ...prev, username: 'Numerical values are not allowed in name field.' }));
      } else if (formData.username.length > 0 && /[^a-zA-Z\s]/.test(sanitizedVal)) {
        setErrors(prev => ({ ...prev, username: 'Special characters are not allowed.' }));
      } else {
        setErrors(prev => ({ ...prev, username: '' }));
      }
    }

    // Validate Email
    if (touched.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email.length > 0 && !emailRegex.test(formData.email)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address.' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    }

    // Validate Phone
    if (touched.phone) {
      if (formData.phone.length > 0 && /[^\d]/.test(formData.phone)) {
        setErrors(prev => ({ ...prev, phone: 'Only numerical values are allowed.' }));
      } else if (formData.phone.length > 0 && formData.phone.length !== 10) {
        setErrors(prev => ({ ...prev, phone: 'Phone number must contain exactly 10 digits.' }));
      } else {
        setErrors(prev => ({ ...prev, phone: '' }));
      }
    }

    // Validate Address
    if (touched.address) {
      if (formData.address.length > 0 && formData.address.length < 5) {
        setErrors(prev => ({ ...prev, address: 'Please enter a valid address.' }));
      } else {
        setErrors(prev => ({ ...prev, address: '' }));
      }
    }

    // Validate Password
    if (touched.password) {
      if (formData.password.length > 0 && !isPasswordValid) {
        setErrors(prev => ({ ...prev, password: 'Password must contain uppercase, lowercase, number, and special character.' }));
      } else {
        setErrors(prev => ({ ...prev, password: '' }));
      }
    }

    // Validate Confirm Password
    if (touched.confirmPassword) {
      if (formData.confirmPassword.length > 0 && formData.confirmPassword !== formData.password) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match.' }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }
  }, [formData, touched, isPasswordValid]);

  // Live Phone existence check against database
  const handlePhoneBlurOrChange = async (val) => {
    const cleanVal = val.replace(/[^\d]/g, '');
    if (cleanVal.length === 10) {
      try {
        const res = await axios.post(`${API_BASE_URL}/api/auth/check-phone`, { phone: cleanVal });
        if (res.data.exists) {
          setErrors(prev => ({ ...prev, phone: 'This phone number is already registered.' }));
        }
      } catch (err) {
        console.error('Check Phone Error:', err);
      }
    }
  };

  // Form Submission Block Validation
  const isFormValid = 
    formData.username.length > 0 && !errors.username &&
    formData.email.length > 0 && !errors.email &&
    formData.phone.length === 10 && !errors.phone &&
    formData.address.length >= 5 && !errors.address &&
    isPasswordValid && !errors.password &&
    formData.confirmPassword === formData.password && !errors.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, {
        displayName: sanitizeInput(formData.username),
        email: sanitizeInput(formData.email),
        phone: sanitizeInput(formData.phone),
        address: sanitizeInput(formData.address),
        password: formData.password
      });

      if (response.status === 201) {
        setSuccessMsg('Account created successfully.');
        login({ 
          displayName: formData.username, 
          email: formData.email,
          photoURL: null
        });
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
    <div className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden bg-[#0A0E1A] selection:bg-white/20">
      {/* Decorative Elite Blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-slate-900/30 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-slate-900/30 rounded-full blur-[150px]"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-[#111625]/90 backdrop-blur-2xl p-10 md:p-14 rounded-[40px] shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-slate-800/80 relative z-10 hover:border-cyan-500/20 transition-colors duration-500"
      >
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-tr from-[#FF8E9C] via-[#F43F5E] to-[#E11D48] rounded-[24px] flex items-center justify-center text-white font-black text-3xl mx-auto mb-8 shadow-[0_0_20px_rgba(244,63,94,0.45)] hover:rotate-6 transition-transform border border-rose-400/20">
            G
          </div>
          <h1 className="text-4xl font-black text-white mb-4 tracking-tight">Academic <span className="text-gradient-rose">Registration</span></h1>
          <p className="text-slate-400 font-bold text-sm tracking-wide">Join 50,000+ scholars mastering the future</p>
        </div>

        {/* Global Error and Success Alerts */}
        {error && (
          <div className="mb-6 p-4.5 bg-rose-500/10 border border-rose-500/20 text-rose-450 rounded-2xl text-xs font-bold uppercase tracking-widest text-center shadow-lg">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="mb-6 p-4.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl text-xs font-bold uppercase tracking-widest text-center shadow-lg">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-400 group-focus-within:text-purple-400 transition-colors drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]" size={20} />
                <input 
                  type="text" 
                  placeholder="e.g. Alex River"
                  className={`w-full pl-14 pr-6 py-5 bg-[#0E1321] border rounded-2xl outline-none transition-all font-bold text-white placeholder:text-slate-400 focus:ring-4 ${
                    !touched.username ? 'border-slate-800 focus:border-cyan-400 focus:ring-cyan-500/10' :
                    errors.username ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/10' :
                    'border-emerald-500/50 focus:border-emerald-500 focus:ring-emerald-500/10'
                  }`}
                  value={formData.username}
                  onBlur={() => setTouched({ ...touched, username: true })}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required
                />
              </div>
              {touched.username && errors.username && <p className="text-red-400 text-xs font-bold px-1 mt-1">{errors.username}</p>}
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Phone Number</label>
              <div className="relative group">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-teal-400 group-focus-within:text-cyan-400 transition-colors drop-shadow-[0_0_6px_rgba(45,212,191,0.4)]" size={20} />
                <input 
                  type="tel" 
                  placeholder="9876543210"
                  className={`w-full pl-14 pr-6 py-5 bg-[#0E1321] border rounded-2xl outline-none transition-all font-bold text-white placeholder:text-slate-400 focus:ring-4 ${
                    !touched.phone ? 'border-slate-800 focus:border-teal-400 focus:ring-teal-500/10' :
                    errors.phone ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/10' :
                    'border-emerald-500/50 focus:border-emerald-500 focus:ring-emerald-500/10'
                  }`}
                  value={formData.phone}
                  onBlur={() => setTouched({ ...touched, phone: true })}
                  onChange={(e) => {
                    const cleanPhone = e.target.value.replace(/[^\d]/g, '');
                    setFormData({...formData, phone: cleanPhone});
                    handlePhoneBlurOrChange(cleanPhone);
                  }}
                  required
                />
              </div>
              {touched.phone && errors.phone && <p className="text-red-400 text-xs font-bold px-1 mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-400 group-focus-within:text-pink-400 transition-colors drop-shadow-[0_0_6px_rgba(129,140,248,0.4)]" size={20} />
              <input 
                type="email" 
                placeholder="scholar@gurubramha.edu"
                className={`w-full pl-14 pr-6 py-5 bg-[#0E1321] border rounded-2xl outline-none transition-all font-bold text-white placeholder:text-slate-400 focus:ring-4 ${
                  !touched.email ? 'border-slate-800 focus:border-indigo-400 focus:ring-indigo-500/10' :
                  errors.email ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/10' :
                  'border-emerald-500/50 focus:border-emerald-500 focus:ring-emerald-500/10'
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
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Address</label>
            <div className="relative group">
              <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-sky-400 group-focus-within:text-violet-400 transition-colors drop-shadow-[0_0_6px_rgba(56,189,248,0.4)]" size={20} />
              <input 
                type="text" 
                placeholder="Enter your street address (e.g. 123 Main Street)"
                className={`w-full pl-14 pr-6 py-5 bg-[#0E1321] border rounded-2xl outline-none transition-all font-bold text-white placeholder:text-slate-400 focus:ring-4 ${
                  !touched.address ? 'border-slate-800 focus:border-sky-400 focus:ring-sky-500/10' :
                  errors.address ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/10' :
                  'border-emerald-500/50 focus:border-emerald-500 focus:ring-emerald-500/10'
                }`}
                value={formData.address}
                onBlur={() => setTouched({ ...touched, address: true })}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                required
              />
            </div>
            {touched.address && errors.address && <p className="text-red-400 text-xs font-bold px-1 mt-1">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-fuchsia-400 group-focus-within:text-rose-400 transition-colors drop-shadow-[0_0_6px_rgba(232,121,249,0.4)]" size={20} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className={`w-full pl-14 pr-14 py-5 bg-[#0E1321] border rounded-2xl outline-none transition-all font-bold text-white placeholder:text-slate-400 focus:ring-4 ${
                    !touched.password ? 'border-slate-800 focus:border-fuchsia-400 focus:ring-fuchsia-500/10' :
                    errors.password ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/10' :
                    'border-emerald-500/50 focus:border-emerald-500 focus:ring-emerald-500/10'
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
              {/* Dynamic live checklist */}
              <div className="mt-3 grid grid-cols-2 gap-2 p-4 bg-slate-950/40 rounded-2xl border border-slate-800/80">
                {[
                  { key: 'hasUpper', text: 'Uppercase letter' },
                  { key: 'hasLower', text: 'Lowercase letter' },
                  { key: 'hasNumber', text: 'Number' },
                  { key: 'hasSpecial', text: 'Special character' },
                  { key: 'hasMinLen', text: 'Minimum 8 characters' }
                ].map((item) => (
                  <div key={item.key} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                    {pwChecks[item.key] ? (
                      <Check className="text-emerald-400" size={12} />
                    ) : (
                      <X className="text-slate-500" size={12} />
                    )}
                    <span className={pwChecks[item.key] ? 'text-emerald-400' : 'text-slate-500'}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Confirm Password</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-fuchsia-400 group-focus-within:text-rose-400 transition-colors drop-shadow-[0_0_6px_rgba(232,121,249,0.4)]" size={20} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className={`w-full pl-14 pr-6 py-5 bg-[#0E1321] border rounded-2xl outline-none transition-all font-bold text-white placeholder:text-slate-400 focus:ring-4 ${
                    !touched.confirmPassword ? 'border-slate-800 focus:border-fuchsia-400 focus:ring-fuchsia-500/10' :
                    errors.confirmPassword ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/10' :
                    'border-emerald-500/50 focus:border-emerald-500 focus:ring-emerald-500/10'
                  }`}
                  value={formData.confirmPassword}
                  onBlur={() => setTouched({ ...touched, confirmPassword: true })}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  required
                />
              </div>
              {touched.confirmPassword && errors.confirmPassword && <p className="text-red-400 text-xs font-bold px-1 mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !isFormValid}
            className={`w-full py-5 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-4 text-sm uppercase tracking-widest border border-cyan-400/20 ${
              !isFormValid 
                ? 'bg-slate-800/80 border-slate-700/50 text-slate-500 cursor-not-allowed shadow-none' 
                : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:brightness-110 active:scale-[0.98] shadow-[0_0_25px_rgba(6,182,212,0.45)]'
            }`}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>Establish Scholar Profile <ArrowRight size={20} /></>
            )}
          </button>

          <div className="relative py-2 flex items-center">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-6 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Direct Integration</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>

          <button 
            type="button" 
            onClick={handleGoogleSignup}
            disabled={isLoading}
            className="w-full py-4 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl flex items-center justify-center gap-4 hover:bg-slate-800/80 transition-all font-black text-[10px] uppercase tracking-widest text-white shadow-sm disabled:opacity-70"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            <span>Register with Google Vault</span>
          </button>

          <p className="text-center text-slate-400 font-bold text-sm">
            Already an established scholar? <Link to="/login" className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-black hover:underline ml-1">Secure Login</Link>
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
