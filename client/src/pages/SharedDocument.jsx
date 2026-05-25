import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Download, ShieldCheck } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

const SharedDocument = () => {
    const { filename } = useParams();
    const fileUrl = `${API_BASE_URL}/uploads/${filename}`;
    
    // Determine type from extension
    const ext = filename.split('.').pop().toLowerCase();
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);

    return (
        <div className="min-h-screen bg-[#0F172A] flex flex-col items-center p-6 md:p-12">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-5xl flex items-center justify-between mb-8"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-white">Shared Document</h1>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">GuruBramha Secure Vault</p>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 text-green-400 text-xs font-bold bg-green-900/20 px-3 py-1.5 rounded-full border border-green-800/30">
                        <ShieldCheck size={14} /> End-to-end Verified
                    </div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-5xl flex-grow bg-slate-900 rounded-[32px] border border-slate-700 overflow-hidden shadow-2xl flex flex-col"
            >
                <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center">
                    <p className="text-slate-300 font-bold truncate pr-4 text-sm">{filename}</p>
                    <a 
                        href={fileUrl}
                        download
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                    >
                        <Download size={14} /> Download
                    </a>
                </div>
                
                <div className="flex-grow flex items-center justify-center bg-slate-900/50 p-4 min-h-[60vh]">
                    {isImage ? (
                        <img src={fileUrl} alt={filename} className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-lg" />
                    ) : (
                        <iframe 
                            src={fileUrl} 
                            className="w-full h-full min-h-[70vh] border-none rounded-xl"
                            title="Document Viewer"
                        />
                    )}
                </div>
            </motion.div>
            
            <p className="mt-8 text-slate-500 text-xs font-bold">Powered by GuruBramha Academy</p>
        </div>
    );
};

export default SharedDocument;
