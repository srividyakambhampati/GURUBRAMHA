import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Code, User, Star, Search, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] pt-16 pb-12 px-6 relative z-10 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-indigo-200 group-hover:rotate-6 transition-transform">
                G
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Guru<span className="text-[#FFB800]">Bramha</span>
              </span>
            </Link>
            <p className="text-slate-400 font-medium leading-relaxed text-sm">
              The world's premier EdTech platform for advanced technical education, coding mastery, and career growth.
            </p>
            <div className="flex items-center gap-4">
              {[Mail, User, Star, Search].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white hover:scale-110 transition-all border border-slate-700">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black mb-5 uppercase tracking-[0.2em] text-[10px]">Academy</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link to="/courses" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2">All Courses</Link></li>
              <li><Link to="/practice" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2">Coding Arena</Link></li>
              <li><Link to="/interview" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2">Career Prep</Link></li>
              <li><Link to="/dashboard" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2">Scholar Dashboard</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-black mb-5 uppercase tracking-[0.2em] text-[10px]">Support</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Scholar Help Center</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Academic Terms</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Instructor Program</a></li>
            </ul>
          </div>

          {/* Newsletter/Contact */}
          <div>
            <h4 className="text-white font-black mb-4 uppercase tracking-[0.2em] text-[10px]">Newsletter</h4>
            <p className="text-[10px] font-medium text-slate-400 mb-3 leading-relaxed">Join 50k+ scholars and get the latest tech insights.</p>
            <div className="relative">
                <input 
                  type="email" 
                  placeholder="scholar@email.com" 
                  className="w-full pl-4 pr-12 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 text-xs font-bold text-white placeholder:text-slate-600"
                />
                <button className="absolute right-2 top-2 w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-200">
                    <ArrowRight size={18} />
                </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <p>© 2024 GuruBramha Academy. Engineered for Excellence.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
