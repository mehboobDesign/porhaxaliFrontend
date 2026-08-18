import React, { useState } from 'react';
import { EllipsisVertical, X, Home, Globe, NotebookPen, HelpCircle, BookOpen, Radio } from 'lucide-react'; // Optional: icon library
import StudentDashboard from '../student/studentDeshboard';
//import VideoCarousel from './VideoCarousel';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex bg-gray-100 overflow-hidden">
      
      {/* 1. Toggle Button (Visible when sidebar is closed) */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-3 left-52  p-2 z-50 rounded-md bg-white shadow-md text-stone-800 hover:bg-slate-800 hover:cursor-pointer hover:text-blue-400 transition-all"
        >
          {/* <Menu className="h-6 w-6" /> */}
          <EllipsisVertical className="h-6 w-6" />
        </button>
      )}

      {/* 2. Backdrop Overlay (Mobile only - closes sidebar when clicked outside) */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* 3. Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-stone-50 text-[rgba(244,87,128)] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center gap-2 pl-5 pt-5 pb-3.5 pr-5 border-b border-gray-100 shadow-md">
            <span className='text-2xl tracking-wide'><BookOpen/></span>
            <h2 className="text-2xl font-bold tracking-wide">Porhaxali</h2>
          {/* Close Button */}
          <button
            onClick={toggleSidebar}
            className="ml-auto p-1.5 rounded-lg bg-[rgba(244,87,128)] hover:cursor-pointer text-white hover:text-white hover:bg-slate-700 transition-colors focus:outline-none"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2 p-5">
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-stone-800 hover:bg-slate-800 hover:text-white rounded-lg transition-colors group">
            <Home className="h-5 w-5 text-stone-800 group-hover:text-blue-400" />
            <span>Home</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-stone-800 hover:bg-slate-800 hover:text-white rounded-lg transition-colors group">
            <Globe className="h-5 w-5 text-stone-800 group-hover:text-blue-400"/>
            <span>Browse Courses</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-stone-800 hover:bg-slate-800 hover:text-white rounded-lg transition-colors group">
            <Radio className="h-5 w-5 text-stone-800 group-hover:text-blue-400"/>
            <span>Live Sessions</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-stone-800 hover:bg-slate-800 hover:text-white rounded-lg transition-colors group">
            <NotebookPen className="h-5 w-5 text-stone-800 group-hover:text-blue-400" />
            <span>Notes</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-stone-800 hover:bg-slate-800 hover:text-white rounded-lg transition-colors group">
            <HelpCircle className="h-5 w-5 text-stone-800 group-hover:text-blue-400" />
            <span>Help</span>
          </a>
        </nav>
      </aside>

      {/* 4. Main Content Area */}
      <main className="flex transition-all duration-300 w-full">
        <StudentDashboard/>
      </main>
    </div>
  );
}