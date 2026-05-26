import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  Share2, 
  Trash2, 
  Download, 
  Eye, 
  ShieldCheck, 
  Plus, 
  X,
  FileCheck,
  CreditCard,
  User,
  MoreVertical,
  CheckCircle2,
  Lock,
  Mail,
  Award,
  Settings,
  Calendar,
  MapPin,
  Globe,
  Activity,
  Zap,
  Phone,
  Code
} from 'lucide-react';
import Footer from '../components/Footer';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

const DOCUMENT_BUNDLES = ['Resume', 'Photos', 'PAN', 'Aadhaar', 'Personal Documents'];

const Documents = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [viewingDoc, setViewingDoc] = useState(null);
  const [documents, setDocuments] = useState([]);
  
  const [uploadPendingFile, setUploadPendingFile] = useState(null);
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadBundle, setUploadBundle] = useState('Personal Documents');

  const handleFileSelect = (file) => {
    if (!file) return;
    setUploadPendingFile(file);
    setUploadFileName(file.name.split('.')[0] || file.name);
    setUploadBundle('Personal Documents');
  };

  const confirmUpload = async () => {
    if (!uploadPendingFile) return;
    
    const formData = new FormData();
    formData.append('file', uploadPendingFile);

    try {
      const response = await fetch(`${API_BASE_URL}/api/documents/upload`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      const previewUrl = `${API_BASE_URL}${data.url}`;
      
      const newDoc = {
          id: Date.now(),
          name: uploadFileName || uploadPendingFile.name,
          bundle: uploadBundle,
          type: uploadPendingFile.name.split('.').pop().toUpperCase(),
          size: (uploadPendingFile.size / 1024 / 1024).toFixed(1) + ' MB',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: 'Uploaded',
          previewUrl: previewUrl,
          filename: data.filename
      };
      setDocuments(prev => [newDoc, ...prev]);
      setUploadPendingFile(null);
      setUploadFileName('');
    } catch (error) {
      console.error('Upload Error:', error);
      alert('Failed to upload document. Please try again.');
    }
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileSelect(files[0]);
    }
  }, []);

  const handleAction = async (action, doc) => {
    switch(action) {
        case 'view':
            setViewingDoc(doc);
            break;
        case 'download':
            const dlBtn = document.getElementById(`dl-${doc.id}`);
            if (dlBtn) {
                const originalContent = dlBtn.innerHTML;
                dlBtn.innerHTML = '<div class="w-4 h-4 border-2 border-indigo-600 border-t-transparent animate-spin rounded-full"></div>';
                
                setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = doc.previewUrl || '#';
                    link.setAttribute('download', doc.name);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    dlBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg> Saved';
                    dlBtn.classList.add('bg-green-50', 'text-green-600');
                    
                    setTimeout(() => {
                        dlBtn.innerHTML = originalContent;
                        dlBtn.classList.remove('bg-green-50', 'text-green-600');
                    }, 2000);
                }, 1000);
            }
            break;
        case 'share':
            if (!doc.filename) {
                alert('This document was not uploaded to the server yet.');
                return;
            }
            const shareUrl = `${window.location.origin}/shared/${doc.filename}`;
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: doc.name,
                        text: `Check out this document from my GuruBramha Vault: ${doc.name}`,
                        url: shareUrl,
                    });
                } catch (err) {
                    console.log('Share failed:', err);
                }
            } else {
                navigator.clipboard.writeText(shareUrl);
                alert('🔗 Link copied to clipboard!');
            }
            break;
        case 'delete':
            if (window.confirm('Are you sure you want to delete this document?')) {
                setDocuments(prev => prev.filter(d => d.id !== doc.id));
            }
            break;
        default: break;
    }
  };

  // Removed DigiLocker integration

  return (
    <div className="bg-[#0F172A] min-h-screen selection:bg-[#FFB800]/30 pb-20">
      <div className="max-w-[1600px] mx-auto px-8 md:px-12 pt-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
            <div>
                <motion.h1 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight"
                >
                    Academic <span className="text-[#FFB800]">Vault</span>
                </motion.h1>
                <p className="text-slate-500 font-bold text-lg tracking-wide">Securely manage and share your scholarly credentials.</p>
            </div>
            <div className="flex items-center gap-6">
                <button 
                    onClick={() => document.getElementById('fileInput').click()}
                    className="flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-blue-500/20 hover:scale-[1.05] transition-all"
                >
                    <Plus size={20} /> Initialize Upload
                </button>
                <input 
                    type="file" 
                    id="fileInput" 
                    className="hidden" 
                    onChange={(e) => {
                        handleFileSelect(e.target.files[0]);
                        e.target.value = null;
                    }} 
                />
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Stats & DigiLocker */}
            <div className="lg:col-span-4 space-y-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-[48px] p-12 shadow-2xl"
                >
                    <h3 className="text-xl font-black text-white mb-10 flex items-center gap-5">
                        <FileCheck size={24} className="text-[#FFB800]" /> Vault Architecture
                    </h3>
                    <div className="space-y-10">
                        <div>
                            <div className="flex justify-between items-end mb-4">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Storage Capacity</p>
                                <p className="text-sm font-black text-white tracking-tight">
                                    {(documents.reduce((acc, doc) => acc + parseFloat(doc.size), 0)).toFixed(1)} <span className="text-slate-500">/ 100 MB</span>
                                </p>
                            </div>
                            <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-700 p-1">
                                <div className="h-full bg-gradient-to-r from-blue-500 to-[#FFB800] rounded-full transition-all duration-700" style={{ width: `${(documents.reduce((acc, doc) => acc + parseFloat(doc.size), 0) / 100) * 100}%` }}></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-slate-900/50 p-6 rounded-[24px] border border-slate-700 text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Files</p>
                                <p className="text-2xl font-black text-white tracking-tight">{documents.length}</p>
                            </div>
                            <div className="bg-slate-900/50 p-6 rounded-[24px] border border-slate-700 text-center">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Verified</p>
                                <p className="text-2xl font-black text-green-400 tracking-tight">{documents.filter(d => d.status === 'Uploaded').length}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Right Column: Upload & List */}
            <div className="lg:col-span-8">
                <motion.div 
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-[56px] p-12 md:p-16 min-h-[500px] shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-[-5%] right-[-5%] w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] opacity-40"></div>
                    
                    <div 
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('fileInput').click()}
                        className={`relative z-10 border-4 border-dashed rounded-[48px] p-16 transition-all flex flex-col items-center justify-center text-center cursor-pointer mb-16 ${
                            isDragging 
                                ? 'border-[#FFB800] bg-slate-900/60 scale-[0.98]' 
                                : 'border-slate-700 bg-slate-900/40 hover:border-[#FFB800] hover:bg-slate-900/60'
                        }`}
                    >
                        <div className="w-24 h-24 bg-slate-800 border border-slate-700 rounded-[32px] flex items-center justify-center text-[#FFB800] mb-8 shadow-2xl group-hover:scale-110 transition-transform">
                            <Upload size={36} />
                        </div>
                        <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Expand the Vault</h3>
                        <p className="text-slate-400 font-bold max-w-sm text-lg leading-relaxed">Establish security for your Resume, Aadhaar, or Degree credentials.</p>
                    </div>

                    <div className="relative z-10 space-y-10">
                        <div className="flex items-center justify-between border-b border-slate-700 pb-8">
                            <h3 className="text-2xl font-black text-white tracking-tight">Academic Manifest</h3>
                            <div className="flex items-center gap-4">
                                <span className="px-5 py-2 bg-slate-900 border border-slate-700 text-[#FFB800] rounded-full text-[10px] font-black uppercase tracking-widest">{documents.length} Entities</span>
                            </div>
                        </div>
                        
                        {documents.length === 0 ? (
                            <div className="py-32 text-center">
                                <div className="w-24 h-24 bg-slate-900/50 border border-slate-700 rounded-[32px] flex items-center justify-center text-slate-600 mx-auto mb-8">
                                    <FileText size={44} />
                                </div>
                                <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.4em]">The Vault remains empty</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {documents.map((doc) => (
                                    <motion.div 
                                        key={doc.id}
                                        layout
                                        whileHover={{ y: -5 }}
                                        className="bg-slate-900/50 p-8 rounded-[40px] border border-slate-700 shadow-sm hover:shadow-2xl hover:bg-slate-800 transition-all group"
                                    >
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="w-16 h-16 bg-slate-800 border border-slate-600 rounded-[24px] flex items-center justify-center text-slate-400 group-hover:text-[#FFB800] transition-all shadow-sm">
                                                {['PDF', 'RESUME'].includes(doc.type) ? <FileText size={28} /> : 
                                                 ['PNG', 'JPG', 'JPEG'].includes(doc.type) ? <Upload size={28} /> : 
                                                 <CreditCard size={28} />}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button onClick={() => handleAction('share', doc)} className="p-3 bg-slate-800 rounded-2xl text-slate-400 hover:text-blue-400 border border-slate-700 shadow-sm transition-all"><Share2 size={18} /></button>
                                                <button onClick={() => handleAction('delete', doc)} className="p-3 bg-slate-800 rounded-2xl text-red-400 hover:bg-red-900/50 border border-slate-700 shadow-sm transition-all"><Trash2 size={18} /></button>
                                            </div>
                                        </div>
                                        <div className="mb-10">
                                            <h4 className="font-black text-white mb-2 text-lg tracking-tight line-clamp-1 group-hover:text-[#FFB800] transition-colors">{doc.name}</h4>
                                            <div className="flex items-center gap-4 flex-wrap mt-2">
                                                <span className="px-3 py-1 bg-blue-900/30 text-blue-400 border border-blue-800/50 rounded-full text-[10px] font-black uppercase tracking-widest">{doc.bundle}</span>
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{doc.size}</span>
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-600"></div>
                                                <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">{doc.status}</span>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button onClick={() => handleAction('view', doc)} className="flex items-center justify-center gap-3 py-4 bg-slate-800 border border-slate-700 text-slate-300 rounded-[20px] text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 hover:text-white transition-all shadow-sm">
                                                <Eye size={16} /> Inspect
                                            </button>
                                            <button 
                                                id={`dl-${doc.id}`}
                                                onClick={() => handleAction('download', doc)} 
                                                className="flex items-center justify-center gap-3 py-4 bg-blue-600 text-white rounded-[20px] text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 shadow-2xl shadow-blue-900/50 transition-all min-w-[120px]"
                                            >
                                                <Download size={16} /> Deploy
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
      </div>

      {/* Upload Details Modal */}
      <AnimatePresence>
        {uploadPendingFile && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-[#0F172A]/90 backdrop-blur-3xl"
            >
                <motion.div 
                    initial={{ scale: 0.95, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    className="relative w-full max-w-lg bg-slate-800 border border-slate-700 rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] p-10"
                >
                    <button onClick={() => setUploadPendingFile(null)} className="absolute top-6 right-6 p-3 text-slate-400 hover:text-[#FFB800] hover:bg-slate-700 rounded-2xl transition-all"><X size={24} /></button>
                    
                    <h2 className="text-3xl font-black text-white mb-8">File Details</h2>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">File Name</label>
                            <input 
                                type="text"
                                value={uploadFileName}
                                onChange={(e) => setUploadFileName(e.target.value)}
                                className="w-full px-6 py-4 bg-slate-900 border border-slate-700 rounded-2xl text-white font-bold focus:outline-none focus:ring-2 focus:ring-[#FFB800]/50 focus:border-[#FFB800] transition-all placeholder:text-slate-600"
                                placeholder="Enter file name"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Bundle Category</label>
                            <div className="flex flex-wrap gap-3">
                                {DOCUMENT_BUNDLES.map(bundle => (
                                    <button
                                        key={bundle}
                                        onClick={() => setUploadBundle(bundle)}
                                        className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${
                                            uploadBundle === bundle 
                                                ? 'bg-[#FFB800] border-[#FFB800] text-slate-900 shadow-lg shadow-[#FFB800]/20' 
                                                : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-700'
                                        }`}
                                    >
                                        {bundle}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-10">
                        <button onClick={() => setUploadPendingFile(null)} className="flex-1 py-4 text-slate-400 font-black uppercase text-[10px] tracking-widest hover:text-white transition-all">Cancel</button>
                        <button onClick={confirmUpload} className="flex-1 py-4 bg-[#FFB800] text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-[#FFB800]/20 hover:scale-[1.02] transition-all">Upload File</button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Preview Modal */}
      <AnimatePresence>
        {viewingDoc && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1000] flex items-center justify-center p-6 md:p-12 bg-[#0F172A]/90 backdrop-blur-3xl"
            >
                <motion.div 
                    initial={{ scale: 0.95, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    className="relative w-full max-w-6xl bg-slate-800 rounded-[56px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden border border-slate-700 p-12 md:p-16 h-[90vh] flex flex-col"
                >
                    <button onClick={() => setViewingDoc(null)} className="absolute top-10 right-10 p-4 text-slate-400 hover:text-[#FFB800] hover:bg-slate-700 rounded-[20px] transition-all z-20 shadow-sm"><X size={32} /></button>
                    
                    <div className="flex items-center gap-10 mb-16 flex-shrink-0">
                        <div className="w-24 h-24 bg-slate-900 border border-slate-700 rounded-[32px] flex items-center justify-center text-[#FFB800] shadow-2xl">
                            {['PNG', 'JPG', 'JPEG'].includes(viewingDoc.type) ? <Upload size={40} /> : <FileText size={40} />}
                        </div>
                        <div>
                            <h2 className="text-4xl font-black text-white tracking-tight">{viewingDoc.name}</h2>
                            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] mt-3">Vault Verified Asset • {viewingDoc.type} • {viewingDoc.size}</p>
                        </div>
                    </div>
                    
                    <div className="flex-grow bg-slate-900 rounded-[40px] border border-slate-800 overflow-hidden relative shadow-inner">
                        {viewingDoc.previewUrl ? (
                            <iframe 
                                src={viewingDoc.previewUrl} 
                                className="w-full h-full border-none opacity-90"
                                title="Academic Asset Preview"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-slate-700 font-black uppercase tracking-[0.5em] text-2xl">Encryption Active</div>
                        )}
                    </div>
                    
                    <div className="flex items-center justify-end gap-6 mt-16 flex-shrink-0">
                        <button onClick={() => setViewingDoc(null)} className="px-10 py-5 text-slate-400 font-black uppercase text-[10px] tracking-[0.2em] hover:text-white transition-all">Exit Inspector</button>
                        <button onClick={() => handleAction('download', viewingDoc)} className="px-12 py-5 bg-blue-600 text-white rounded-[24px] font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl shadow-blue-900/50 hover:scale-[1.05] transition-all">Secure Download</button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-20">
         <Footer />
      </div>
    </div>
  );
};

export default Documents;
