import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, GripVertical, Save, X, Video, FileText, ChevronDown, ChevronRight } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000' : '');

// Basic Sortable Item Component
const SortableModule = ({ module, index, onUpdate, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: module.id });
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(module.title);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleTitleSave = () => {
    onUpdate({ ...module, title: editTitle });
    setIsEditingTitle(false);
  };

  return (
    <div ref={setNodeRef} style={style} className="bg-[#131B2C] border border-slate-800/80 rounded-2xl mb-4 overflow-hidden">
      <div className="p-4 flex items-center justify-between bg-slate-900/40 border-b border-slate-800/80">
        <div className="flex items-center gap-3 flex-grow">
          <div {...attributes} {...listeners} className="cursor-grab hover:bg-slate-800 p-1 rounded">
            <GripVertical size={16} className="text-slate-500" />
          </div>
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-slate-400 hover:text-white transition-colors">
            {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          
          {isEditingTitle ? (
            <div className="flex items-center gap-2 flex-grow max-w-sm">
              <input 
                type="text" 
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleTitleSave(); }}
                autoFocus
                className="w-full bg-slate-950 border border-slate-700 text-white text-sm font-bold rounded-lg px-3 py-1 outline-none focus:border-cyan-500"
              />
              <button onClick={handleTitleSave} className="text-emerald-400 hover:text-emerald-300"><Save size={16}/></button>
              <button onClick={() => { setIsEditingTitle(false); setEditTitle(module.title); }} className="text-rose-400 hover:text-rose-300"><X size={16}/></button>
            </div>
          ) : (
            <span className="text-sm font-bold text-white uppercase tracking-wider">Module {index + 1}: {module.title}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!isEditingTitle && (
            <button onClick={() => setIsEditingTitle(true)} className="text-slate-400 hover:text-cyan-400 p-1"><Edit size={14}/></button>
          )}
          <button onClick={() => onDelete(module.id)} className="text-slate-400 hover:text-rose-500 p-1"><Trash2 size={14}/></button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 bg-slate-900/20">
            {module.submodules?.map((submod, sIdx) => (
              <div key={submod.id} className="mb-4 bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
                <div className="p-3 bg-slate-800/80 border-b border-slate-700/50 flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-300">Submodule {sIdx + 1}: {submod.title}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => {
                        const newTitle = prompt("Enter new submodule title:", submod.title);
                        if (newTitle && newTitle.trim()) {
                           const newSubs = module.submodules.map(s => s.id === submod.id ? {...s, title: newTitle} : s);
                           onUpdate({...module, submodules: newSubs});
                        }
                    }} className="text-slate-500 hover:text-cyan-400 p-1"><Edit size={12}/></button>
                    <button onClick={() => {
                        if (confirm(`Delete ${submod.title}?`)) {
                           onUpdate({...module, submodules: module.submodules.filter(s => s.id !== submod.id)});
                        }
                    }} className="text-slate-500 hover:text-rose-400 p-1"><Trash2 size={12}/></button>
                  </div>
                </div>
                <div className="p-3">
                  {submod.lessons?.map((lesson, lIdx) => (
                    <div key={lesson.id} className="flex flex-col p-3 mb-3 bg-slate-950/80 rounded-xl border border-slate-800/80">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 flex-grow mr-2">
                          <Video size={14} className="text-cyan-400 shrink-0" />
                          <input 
                            type="text" 
                            value={lesson.title}
                            onChange={(e) => {
                              const newLessons = submod.lessons.map(l => l.id === lesson.id ? {...l, title: e.target.value} : l);
                              onUpdate({...module, submodules: module.submodules.map(s => s.id === submod.id ? {...s, lessons: newLessons} : s)});
                            }}
                            placeholder="Video Lesson Title"
                            className="bg-transparent border-b border-transparent hover:border-slate-800 focus:border-cyan-500/50 text-sm font-bold text-white outline-none w-full pb-0.5 transition-colors"
                          />
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                           <button onClick={() => {
                              if (confirm(`Delete ${lesson.title}?`)) {
                                 const newLessons = submod.lessons.filter(l => l.id !== lesson.id);
                                 onUpdate({...module, submodules: module.submodules.map(s => s.id === submod.id ? {...s, lessons: newLessons} : s)});
                              }
                           }} className="text-xs text-rose-500/70 hover:text-rose-500 ml-2"><Trash2 size={12}/></button>
                        </div>
                      </div>
                      
                      {/* Video URL Input */}
                      <div className="mt-1 mb-2">
                        <label className="text-xs uppercase text-slate-500 font-bold block mb-1">Video URL (YouTube, MP4, etc.)</label>
                        <input 
                          type="text" 
                          placeholder="Paste video URL here" 
                          value={lesson.videoUrl || ''} 
                          onChange={(e) => {
                            const newLessons = submod.lessons.map(l => l.id === lesson.id ? {...l, videoUrl: e.target.value} : l);
                            onUpdate({...module, submodules: module.submodules.map(s => s.id === submod.id ? {...s, lessons: newLessons} : s)});
                          }}
                          className="w-full bg-slate-900 border border-slate-800/85 focus:border-cyan-500 text-xs text-white rounded-lg px-2.5 py-1.5 outline-none transition-colors"
                        />
                      </div>

                      {/* PDF / Resources Section */}
                      <div className="mt-2 pt-2 border-t border-slate-800/50">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs uppercase text-slate-500 font-bold">PDF Resources / Attachments</span>
                          <div className="flex items-center gap-3">
                             {/* Upload PDF */}
                             <label className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer font-bold transition-colors">
                               <FileText size={12}/> Upload PDF
                               <input type="file" accept=".pdf" className="hidden" onChange={async (e) => {
                                  const file = e.target.files[0];
                                  if(!file) return;
                                  const formData = new FormData();
                                  formData.append('file', file);
                                  try {
                                     const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/courses/upload`, formData);
                                     const newRes = { id: `res-${Date.now()}`, title: file.name, url: res.data.url, type: 'PDF' };
                                     const newLessons = submod.lessons.map(l => l.id === lesson.id ? {...l, resources: [...(l.resources||[]), newRes]} : l);
                                     onUpdate({...module, submodules: module.submodules.map(s => s.id === submod.id ? {...s, lessons: newLessons} : s)});
                                  } catch (err) {
                                     alert('Failed to upload PDF');
                                  }
                               }} />
                             </label>

                             {/* Add PDF URL */}
                             <button onClick={() => {
                                const pdfUrl = prompt("Enter PDF / Resource URL:");
                                if (pdfUrl && pdfUrl.trim()) {
                                   const pdfTitle = prompt("Enter Resource Title (e.g. Lesson Slides PDF):", "Resource PDF");
                                   const newRes = { id: `res-${Date.now()}`, title: pdfTitle || 'Resource PDF', url: pdfUrl, type: 'PDF' };
                                   const newLessons = submod.lessons.map(l => l.id === lesson.id ? {...l, resources: [...(l.resources||[]), newRes]} : l);
                                   onUpdate({...module, submodules: module.submodules.map(s => s.id === submod.id ? {...s, lessons: newLessons} : s)});
                                }
                             }} className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold transition-colors">
                               <Plus size={12} /> Add PDF URL
                             </button>
                          </div>
                        </div>

                        {/* Display Uploaded/Linked Resources */}
                        <div className="space-y-1">
                          {lesson.resources && lesson.resources.length > 0 ? (
                            lesson.resources.map((res) => (
                               <div key={res.id} className="flex items-center justify-between text-xs bg-slate-900/40 px-2 py-1.5 rounded-md border border-slate-800/40">
                                  <div className="flex items-center gap-2 text-slate-300 truncate">
                                     <FileText size={12} className="text-emerald-500 shrink-0" />
                                     <a href={res.url} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-cyan-400 truncate">{res.title}</a>
                                  </div>
                                  <button onClick={() => {
                                     if (confirm(`Remove resource ${res.title}?`)) {
                                        const newResources = lesson.resources.filter(r => r.id !== res.id);
                                        const newLessons = submod.lessons.map(l => l.id === lesson.id ? {...l, resources: newResources} : l);
                                        onUpdate({...module, submodules: module.submodules.map(s => s.id === submod.id ? {...s, lessons: newLessons} : s)});
                                     }
                                  }} className="text-rose-500 hover:text-rose-400 px-1 transition-colors"><X size={12}/></button>
                               </div>
                            ))
                          ) : (
                            <span className="text-xs text-slate-600 italic">No resources added yet.</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => {
                     const lTitle = prompt("Enter video lesson title:");
                     if (lTitle && lTitle.trim()) {
                         const newLesson = { id: `les-${Date.now()}`, title: lTitle, videoUrl: '' };
                         const newSubs = module.submodules.map(s => s.id === submod.id ? {...s, lessons: [...(s.lessons||[]), newLesson]} : s);
                         onUpdate({...module, submodules: newSubs});
                     }
                  }} className="text-xs text-emerald-400 hover:text-emerald-300 font-bold tracking-wider uppercase mt-2 flex items-center gap-1">
                    <Plus size={12} /> Add Video Lesson
                  </button>
                </div>
              </div>
            ))}

            <button onClick={() => {
              const newSub = { id: `sub-${Date.now()}`, title: 'New Submodule', lessons: [] };
              onUpdate({...module, submodules: [...(module.submodules||[]), newSub]});
            }} className="mt-3 px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-lg text-xs font-bold tracking-widest flex items-center gap-1 transition-colors">
              <Plus size={12} /> Add Submodule
            </button>
        </div>
      )}
    </div>
  );
};

const CourseBuilder = ({ course, onSave, onClose }) => {
  const [courseData, setCourseData] = useState({
    name: course?.name || 'New Course Title',
    instructor: course?.instructor || 'Instructor Name',
    category: course?.category || 'Programming',
    price: course?.price || 999,
    status: course?.status || 'Draft',
    modules: course?.modules || []
  });

  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setCourseData((data) => {
        const oldIndex = data.modules.findIndex((m) => m.id === active.id);
        const newIndex = data.modules.findIndex((m) => m.id === over.id);
        return { ...data, modules: arrayMove(data.modules, oldIndex, newIndex) };
      });
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (course?._id) {
        await axios.put(`${API_BASE_URL}/api/courses/${course._id}`, courseData);
      } else {
        await axios.post(`${API_BASE_URL}/api/courses`, courseData);
      }
      onSave(); // Refresh list and close
    } catch (err) {
      console.error("Failed to save course:", err);
      alert("Error saving course data.");
    } finally {
      setSaving(false);
    }
  };

  const addModule = () => {
    const newMod = { id: `mod-${Date.now()}`, title: 'New Module', submodules: [] };
    setCourseData({ ...courseData, modules: [...courseData.modules, newMod] });
  };

  const deleteModule = (id) => {
    setCourseData({ ...courseData, modules: courseData.modules.filter(m => m.id !== id) });
  };

  const updateModule = (updatedModule) => {
    setCourseData({
      ...courseData,
      modules: courseData.modules.map(m => m.id === updatedModule.id ? updatedModule : m)
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-[9999] bg-[#0F172A] overflow-y-auto font-sans"
    >
      {/* Header Bar */}
      <div className="sticky top-0 z-10 bg-[#131B2C]/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
            <X size={20} />
          </button>
          <div>
            <h1 className="text-xl font-black text-white tracking-tight">Course Builder</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{courseData.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={courseData.status} 
            onChange={(e) => setCourseData({...courseData, status: e.target.value})}
            className="bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold rounded-lg px-3 py-2 outline-none"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
            <option value="Scheduled">Scheduled</option>
          </select>
          <button onClick={handleSave} disabled={saving} className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 active:scale-95 text-white font-bold rounded-xl shadow-sm text-xs uppercase tracking-wider flex items-center gap-2 transition-all">
            <Save size={16} /> {saving ? 'Saving...' : 'Save & Exit'}
          </button>
        </div>
      </div>

      <div className="w-full max-w-full px-12 py-8 flex gap-10">
        {/* Sidebar Settings */}
        <div className="w-[360px] shrink-0 space-y-6">
          <div className="bg-[#131B2C] border border-slate-800/80 rounded-3xl p-6">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Course Settings</h3>
            
            <div className="space-y-4 text-xs font-bold text-slate-300">
              <div className="space-y-2">
                <label className="text-[10px] uppercase text-slate-500">Course Name</label>
                <input type="text" value={courseData.name} onChange={e => setCourseData({...courseData, name: e.target.value})} className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl outline-none focus:border-cyan-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase text-slate-500">Instructor</label>
                <input type="text" value={courseData.instructor} onChange={e => setCourseData({...courseData, instructor: e.target.value})} className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl outline-none focus:border-cyan-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase text-slate-500">Category</label>
                <input type="text" value={courseData.category} onChange={e => setCourseData({...courseData, category: e.target.value})} className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl outline-none focus:border-cyan-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase text-slate-500">Price (₹)</label>
                <input type="number" value={courseData.price} onChange={e => setCourseData({...courseData, price: e.target.value})} className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl outline-none focus:border-cyan-500/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Builder Canvas */}
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-white">Curriculum Map</h2>
            <button onClick={addModule} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-2">
              <Plus size={14} /> Add Module
            </button>
          </div>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={courseData.modules.map(m => m.id)} strategy={verticalListSortingStrategy}>
              {courseData.modules.map((module, index) => (
                <SortableModule key={module.id} module={module} index={index} onDelete={deleteModule} onUpdate={updateModule} />
              ))}
            </SortableContext>
          </DndContext>
          
          {courseData.modules.length === 0 && (
            <div className="p-12 border-2 border-dashed border-slate-800 rounded-3xl text-center text-slate-500 flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4">
                <Plus size={24} className="text-slate-600" />
              </div>
              <h3 className="font-bold text-white mb-1">Your curriculum is empty</h3>
              <p className="text-xs">Start building your course by adding the first module.</p>
              <button onClick={addModule} className="mt-6 px-6 py-2.5 bg-indigo-500/20 text-indigo-400 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-indigo-500/30 transition-all">Add First Module</button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CourseBuilder;
