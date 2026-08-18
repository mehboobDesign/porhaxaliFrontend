import React, { useState } from 'react';
import { 
  Search, Plus, Folder, FileText, Trash2, 
  Clock, Tag, Star, X, Check, Grid, List 
} from 'lucide-react';
import Sidebar from './Sidebar';
import { studentTabs } from '../commom/CommonArrays';

const INITIAL_NOTES = [
  {
    id: 1,
    title: "Organic Chemistry Revision Pointers",
    content: "Focus heavily on electrophilic substitution mechanisms. Prof. Baruah mentioned that questions regarding resonance stability of the carbocation intermediate are highly likely this semester.",
    category: "Science",
    updatedAt: "2 hours ago",
    pinned: true,
    tags: ["Exam Prep", "Chemistry"]
  },
  {
    id: 2,
    title: "Project Architecture Ideas",
    content: "Break down the core service into a modular component structure. Use Context API for general layout states and Tailwind for swift UI iterations.",
    category: "Programming",
    updatedAt: "Yesterday",
    pinned: true,
    tags: ["React", "UI/UX"]
  },
  {
    id: 3,
    title: "Calculus Formula Sheet",
    content: "Double-check limits, integration by parts formulas ($udv = uv - vdu$), and vectors theorems before the Tuesday morning review session.",
    category: "Mathematics",
    updatedAt: "3 days ago",
    pinned: false,
    tags: ["Math"]
  }
];

const CATEGORIES = ["All Notes", "Science", "Mathematics", "Programming", "Personal"];

export default function NotesPage() {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [activeCategory, setActiveCategory] = useState("All Notes");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  
  // Note Creation / Editing State
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState({ title: "", content: "", category: "Science", tags: [] });

  // Filter Logic
  const filteredNotes = notes.filter(note => {
    const matchesCategory = activeCategory === "All Notes" || note.category === activeCategory;
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          note.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSaveNote = (e) => {
    e.preventDefault();
    if (!currentNote.title.trim()) return;

    if (currentNote.id) {
      setNotes(notes.map(n => n.id === currentNote.id ? { ...currentNote, updatedAt: "Just now" } : n));
    } else {
      setNotes([{ ...currentNote, id: Date.now(), updatedAt: "Just now", pinned: false }, ...notes]);
    }
    setIsPanelOpen(false);
    setCurrentNote({ title: "", content: "", category: "Science", tags: [] });
  };

  const handleDeleteNote = (id, e) => {
    e.stopPropagation();
    setNotes(notes.filter(n => n.id !== id));
  };

  const togglePin = (id, e) => {
    e.stopPropagation();
    setNotes(notes.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  };

  return (
    <div className="flex min-h-screen font-montserrat bg-gray-50/50 text-gray-800">
      <Sidebar pageId="Notes" tabs={studentTabs}/>
      
      {/* 1. Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 px-2 mb-8">
            <div className="bg-rose-500 text-white p-2 rounded-xl shadow-md shadow-rose-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">Workspace</span>
          </div>

          <button 
            onClick={() => { setCurrentNote({ title: "", content: "", category: "Science", tags: [] }); setIsPanelOpen(true); }}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-medium py-2.5 px-4 rounded-xl shadow-sm transition flex items-center justify-center gap-2 mb-6"
          >
            <Plus className="w-4 h-4" /> New Note
          </button>

          <nav className="space-y-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">Notebooks</p>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition ${
                  activeCategory === cat 
                    ? 'bg-rose-50 text-rose-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Folder className={`w-4 h-4 ${activeCategory === cat ? 'text-rose-500' : 'text-gray-400'}`} />
                {cat}
              </button>
            ))}
          </nav>
        </div>

        <div className="text-xs text-gray-400 px-2">
          Syncing to cloud updated
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full">
        
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search your notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent shadow-sm transition text-sm"
            />
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* View Mode Switcher */}
            <div className="bg-white border border-gray-200 p-1 rounded-xl flex shadow-sm">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition ${viewMode === 'grid' ? 'bg-gray-100 text-gray-800' : 'text-gray-400'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition ${viewMode === 'list' ? 'bg-gray-100 text-gray-800' : 'text-gray-400'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Fab Trigger */}
            <button 
              onClick={() => { setCurrentNote({ title: "", content: "", category: "Science", tags: [] }); setIsPanelOpen(true); }}
              className="md:hidden bg-rose-500 text-white p-2 rounded-xl shadow-sm"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Workspace Headline */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{activeCategory}</h1>
          <p className="text-sm text-gray-500 mt-0.5">{filteredNotes.length} notes available</p>
        </div>

        {/* 3. Notes Layout Structure */}
        {filteredNotes.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
            {filteredNotes.map((note) => (
              <div 
                key={note.id}
                onClick={() => { setCurrentNote(note); setIsPanelOpen(true); }}
                className={`bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                  note.pinned ? 'border-rose-200 bg-rose-50/10' : 'border-gray-200'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 group-hover:text-rose-600 transition leading-snug line-clamp-1 pr-6">{note.title}</h3>
                    <button 
                      onClick={(e) => togglePin(note.id, e)}
                      className="absolute top-4 right-4 text-gray-300 hover:text-amber-500 transition"
                    >
                      <Star className={`w-4 h-4 ${note.pinned ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-3 mb-4 leading-relaxed">{note.content}</p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {note.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                        <Tag className="w-2 h-2" /> {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {note.updatedAt}</span>
                    <button 
                      onClick={(e) => handleDeleteNote(note.id, e)}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition p-1 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
            <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm font-medium">No workspace notes found here.</p>
          </div>
        )}
      </main>

      {/* 4. Sliding Context / Creation Panel */}
      {isPanelOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-xs transition-opacity" onClick={() => setIsPanelOpen(false)} />
          
          <div className="relative w-full max-w-lg bg-white h-full shadow-xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <span className="text-sm font-semibold text-gray-700">{currentNote.id ? 'Edit Note' : 'Create Note'}</span>
              <button onClick={() => setIsPanelOpen(false)} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNote} className="flex-1 flex flex-col p-6 overflow-y-auto">
              <input 
                type="text" 
                placeholder="Untitled Note"
                value={currentNote.title}
                onChange={(e) => setCurrentNote({...currentNote, title: e.target.value})}
                className="text-xl font-bold text-gray-900 outline-none placeholder-gray-300 mb-4"
              />
              
              <div className="flex gap-4 mb-6 text-sm">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Folder className="w-4 h-4" />
                  <select 
                    value={currentNote.category}
                    onChange={(e) => setCurrentNote({...currentNote, category: e.target.value})}
                    className="bg-transparent font-medium text-gray-700 outline-none cursor-pointer"
                  >
                    {CATEGORIES.filter(c => c !== "All Notes").map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <textarea 
                placeholder="Start typing your notes context here..."
                value={currentNote.content}
                onChange={(e) => setCurrentNote({...currentNote, content: e.target.value})}
                className="flex-1 w-full text-sm leading-relaxed outline-none resize-none placeholder-gray-400"
              />

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsPanelOpen(false)}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-sm font-medium shadow-sm transition flex items-center gap-1"
                >
                  <Check className="w-4 h-4" /> Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}