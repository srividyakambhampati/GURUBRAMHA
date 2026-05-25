import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        try {
            const res = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`, { email });
            setMessage(res.data.message);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to request password reset.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-[#0F172A] selection:bg-blue-500/30">
            <div className="w-full max-w-[420px] bg-slate-900 border border-slate-700 rounded-[32px] p-10 md:p-12 shadow-2xl relative">
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-[24px] flex items-center justify-center text-white font-black text-3xl mx-auto mb-8 shadow-2xl shadow-cyan-500/30">
                        G
                    </div>
                    <h1 className="text-3xl font-black text-white mb-3 tracking-tight">Vault Recovery</h1>
                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Enter your authorized email to initialize a reset protocol.</p>
                </div>

                {message && (
                    <div className="mb-6 p-4 bg-green-900/30 border border-green-800 text-green-400 rounded-2xl text-xs font-bold text-center">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="mb-6 p-4 bg-red-900/30 border border-red-800 text-red-400 rounded-2xl text-xs font-bold text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 pl-1">Email Scholar</label>
                        <Mail className="absolute left-5 top-11 -translate-y-1 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={20} />
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="scholar@gurubramha.edu"
                            className="w-full pl-14 pr-6 py-5 bg-slate-800/50 border border-slate-700 rounded-2xl focus:ring-4 focus:ring-cyan-500/10 focus:border-cyan-500/30 outline-none transition-all font-bold text-white placeholder:text-slate-500"
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full py-5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-black rounded-2xl shadow-2xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 text-sm uppercase tracking-widest disabled:opacity-70"
                    >
                        {loading ? 'Initializing Protocol...' : <><ShieldCheck size={20} /> Request Recovery Link <ArrowRight size={20} /></>}
                    </button>
                </form>

                <p className="text-center mt-10 text-xs font-bold text-slate-400">
                    <Link to="/login" className="text-cyan-400 font-black hover:underline ml-1">Return to Login</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;
