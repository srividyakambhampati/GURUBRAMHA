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
                    dlBtn.classList.add('bg-green-500/20', 'text-green-400');
                    
                    setTimeout(() => {
                        dlBtn.innerHTML = originalContent;
                        dlBtn.classList.remove('bg-green-500/20', 'text-green-400');
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

  const totalStorage = documents.reduce((acc, doc) => acc + parseFloat(doc.size), 0);

  return (
    <div className="bg-[#0F172A] min-h-screen text-slate-100 selection:bg-cyan-500/30 pb-20 relative overflow-hidden font-sans antialiased">
      {/* Background ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-900/10 blur-[150px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-12 relative z-10">
        
        {/* Simple Minimalist Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Academic <span className="text-[#FFB800]">Vault</span></h1>
            <p className="text-slate-400 text-sm font-medium mt-1">Securely manage, preview, and deploy your scholar credentials.</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => document.getElementById('fileInput').click()}
              className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Plus size={16} /> Initialize Upload
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

        {/* Unified Premium Card Interface */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[32px] p-8 sm:p-10 shadow-2xl relative overflow-hidden space-y-10">
          
          {/* Top Panel: Symmetrical Minimal Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-slate-800/60 pb-8">
            <div className="md:col-span-6 space-y-3">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
                <span>Vault Storage Capacity</span>
                <span className="text-white font-black">{totalStorage.toFixed(1)} / 100 MB</span>
              </div>
              <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-850 p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-[#FFB800] rounded-full transition-all duration-700" 
                  style={{ width: `${Math.min((totalStorage / 100) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="md:col-span-6 flex gap-4 justify-end">
              <div className="bg-slate-950/40 px-6 py-3 border border-slate-850 rounded-2xl text-center min-w-[120px]">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Total Files</p>
                <p className="text-lg font-black text-white">{documents.length}</p>
              </div>
              <div className="bg-slate-950/40 px-6 py-3 border border-slate-850 rounded-2xl text-center min-w-[120px]">
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1">Verified Assets</p>
                <p className="text-lg font-black text-green-400">{documents.filter(d => d.status === 'Uploaded').length}</p>
              </div>
            </div>
          </div>

          {/* Minimal Drag and Drop Zone */}
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput').click()}
            className={`border-2 border-dashed rounded-[24px] p-10 transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
              isDragging 
                ? 'border-[#FFB800] bg-slate-950/60 scale-[0.99]' 
                : 'border-slate-800 bg-slate-950/20 hover:border-[#FFB800] hover:bg-slate-950/40'
            }`}
          >
            <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-[#FFB800] mb-4">
              <Upload size={22} />
            </div>
            <h3 className="text-lg font-black text-white mb-1 tracking-tight">Expand the Vault</h3>
            <p className="text-slate-400 font-bold text-xs">Drag and drop or click to securely upload credentials.</p>
          </div>

          {/* File Manifest List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-black text-white tracking-tight">Academic Manifest</h3>
              <span className="text-[10px] font-bold tracking-widest uppercase text-cyan-400 bg-cyan-950/30 border border-cyan-800/20 px-3 py-1 rounded-full">{documents.length} Entities</span>
            </div>

            {documents.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 bg-slate-950/50 border border-slate-850 rounded-2xl flex items-center justify-center text-slate-600 mx-auto mb-4">
                  <FileText size={28} />
                </div>
                <p className="text-slate-500 font-bold uppercase text-[9px] tracking-[0.3em]">The Vault remains empty</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-800/60">
                {documents.map((doc) => (
                  <motion.div 
                    key={doc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group transition-all"
                  >
                    <div className="flex items-center gap-4">
                      {/* Document Icon */}
                      <div className="w-12 h-12 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-[#FFB800] transition-colors">
                        {['PDF', 'RESUME'].includes(doc.type) ? <FileText size={20} /> : <CreditCard size={20} />}
                      </div>
                      
                      {/* Doc Info */}
                      <div>
                        <h4 className="font-bold text-white text-sm tracking-tight line-clamp-1 group-hover:text-[#FFB800] transition-colors">{doc.name}</h4>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-md text-[9px] font-bold uppercase tracking-wider">{doc.bundle}</span>
                          <span className="text-[10px] text-slate-500 font-bold">{doc.size}</span>
                          <span className="text-[10px] text-slate-500 font-bold">•</span>
                          <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">{doc.status}</span>
                        </div>
                      </div>
                    </div>

                    {/* Minimal Inline Action Controls */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button 
                        onClick={() => handleAction('view', doc)} 
                        className="p-2.5 bg-slate-950 hover:bg-slate-850 rounded-xl text-slate-400 hover:text-white border border-slate-850 transition-colors flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider"
                        title="Inspect"
                      >
                        <Eye size={14} /> Inspect
                      </button>
                      <button 
                        id={`dl-${doc.id}`}
                        onClick={() => handleAction('download', doc)} 
                        className="p-2.5 bg-slate-950 hover:bg-slate-850 rounded-xl text-slate-400 hover:text-white border border-slate-850 transition-colors flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider"
                        title="Download"
                      >
                        <Download size={14} /> Deploy
                      </button>
                      <button 
                        onClick={() => handleAction('share', doc)} 
                        className="p-2.5 bg-slate-950 hover:bg-slate-850 rounded-xl text-slate-400 hover:text-cyan-400 border border-slate-850 transition-colors"
                        title="Share Link"
                      >
                        <Share2 size={14} />
                      </button>
                      <button 
                        onClick={() => handleAction('delete', doc)} 
                        className="p-2.5 bg-slate-950 hover:bg-red-950/40 rounded-xl text-slate-500 hover:text-red-400 border border-slate-850 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
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
                    className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-[32px] shadow-2xl p-8"
                >
                    <button onClick={() => setUploadPendingFile(null)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-[#FFB800] hover:bg-slate-800 rounded-full transition-colors"><X size={20} /></button>
                    
                    <h2 className="text-2xl font-black text-white mb-6">File Details</h2>
                    
                    <div className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-450 uppercase tracking-widest mb-2">File Name</label>
                            <input 
                                type="text"
                                value={uploadFileName}
                                onChange={(e) => setUploadFileName(e.target.value)}
                                className="w-full px-5 py-3.5 bg-slate-950 border border-slate-850 rounded-xl text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all placeholder:text-slate-650"
                                placeholder="Enter file name"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-widest mb-2">Bundle Category</label>
                            <div className="flex flex-wrap gap-2.5">
                                {DOCUMENT_BUNDLES.map(bundle => (
                                    <button
                                        key={bundle}
                                        onClick={() => setUploadBundle(bundle)}
                                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                                            uploadBundle === bundle 
                                                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/25' 
                                                : 'bg-slate-950 border-slate-850 text-slate-400 hover:bg-slate-850 hover:text-white'
                                        }`}
                                    >
                                        {bundle}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-8">
                        <button onClick={() => setUploadPendingFile(null)} className="flex-1 py-3.5 text-slate-500 font-bold uppercase text-[10px] tracking-widest hover:text-white transition-colors">Cancel</button>
                        <button onClick={confirmUpload} className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-blue-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all">Upload File</button>
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
                    className="relative w-full max-w-5xl bg-slate-900 rounded-[36px] shadow-2xl overflow-hidden border border-slate-800 p-8 md:p-10 h-[85vh] flex flex-col animate-all"
                >
                    <button onClick={() => setViewingDoc(null)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-[#FFB800] hover:bg-slate-800 rounded-full transition-colors z-20"><X size={24} /></button>
                    
                    <div className="flex items-center gap-6 mb-8 flex-shrink-0">
                      <div className="w-16 h-16 bg-slate-950 border border-slate-850 rounded-2xl flex items-center justify-center text-[#FFB800] shadow-inner">
                          {['PNG', 'JPG', 'JPEG'].includes(viewingDoc.type) ? <Upload size={28} /> : <FileText size={28} />}
                      </div>
                      <div>
                          <h2 className="text-2xl font-black text-white tracking-tight">{viewingDoc.name}</h2>
                          <p className="text-slate-400 font-bold uppercase tracking-wider text-[9px] mt-1.5">Vault Verified Asset • {viewingDoc.type} • {viewingDoc.size}</p>
                      </div>
                    </div>
                    
                    <div className="flex-grow bg-slate-950 rounded-[24px] border border-slate-850 overflow-hidden relative shadow-inner">
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
                    
                    <div className="flex items-center justify-end gap-4 mt-8 flex-shrink-0">
                        <button onClick={() => setViewingDoc(null)} className="px-6 py-3.5 text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] hover:text-white transition-colors">Exit Inspector</button>
                        <button onClick={() => handleAction('download', viewingDoc)} className="px-10 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold uppercase text-[10px] tracking-[0.3em] shadow-lg shadow-blue-600/25 hover:scale-[1.02] active:scale-[0.98] transition-all">Secure Download</button>
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
