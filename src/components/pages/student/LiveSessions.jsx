import React, { useState } from 'react';
import { Video, Calendar, Clock, User, Radio, Search, ChevronRight } from 'lucide-react';
import Sidebar from './Sidebar';
import { studentTabs } from '../commom/CommonArrays';

// Mock data matching your platform's style and instructors
const INITIAL_SESSIONS = [
  {
    id: 1,
    title: "Organic Chemistry: Mechanisms of Electrophilic Substitution",
    instructor: "Prof. Baruah",
    category: "Science",
    status: "live",
    viewers: 142,
    time: "Started 15m ago",
    thumbnail: "🧪"
  },
  {
    id: 2,
    title: "Calculus & Vectors: Advanced Integration Techniques",
    instructor: "Ms. R. Saikia",
    category: "Mathematics",
    status: "live",
    viewers: 98,
    time: "Started 5m ago",
    thumbnail: "📐"
  },
  {
    id: 3,
    title: "Database Design: Schema Normalization & Indexing",
    instructor: "Prof. Mukhtarul Haque",
    category: "Programming",
    status: "upcoming",
    date: "Today, June 28",
    time: "4:00 PM (IST)",
    thumbnail: "🗄️"
  },
  {
    id: 4,
    title: "Advanced Physics: Quantum Mechanics Fundamentals",
    instructor: "Dr. K. Das",
    category: "Science",
    status: "upcoming",
    date: "Tomorrow, June 29",
    time: "11:00 AM (IST)",
    thumbnail: "⚛️"
  }
];

const CATEGORIES = ["All", "Science", "Mathematics", "Programming", "Humanities"];

export default function LiveSessions() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter logic
  const filteredSessions = INITIAL_SESSIONS.filter(session => {
    const matchesCategory = activeCategory === "All" || session.category === activeCategory;
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          session.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const liveNow = filteredSessions.filter(s => s.status === 'live');
  const upcoming = filteredSessions.filter(s => s.status === 'upcoming');

  return (
    <div className="min-h-screen font-montserrat bg-gray-50/50 text-gray-800 flex">
        <Sidebar pageId="LiveSessions" tabs={studentTabs}/>
        
      {/* Header Section */}
      <div className="w-full mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Live Sessions</h1>
        <p className="text-gray-500 mt-1">Join ongoing interactive classes or schedule your upcoming week.</p>
      </div>

      {/* Controls: Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search live sessions or instructors..."
            value={searchQuery}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent shadow-sm transition"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Badges */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === category
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Live Now Section */}
      {liveNow.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <h2 className="text-xl font-bold text-gray-800">Happening Now</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liveNow.map((session) => (
              <div key={session.id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-3xl bg-gray-50 p-2.5 rounded-xl border border-gray-100">{session.thumbnail}</span>
                    <span className="bg-red-50 text-red-600 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wider">
                      <Radio className="w-3.5 h-3.5 animate-pulse" /> {session.viewers} Watching
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 leading-snug line-clamp-2">{session.title}</h3>
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-2">
                    <User className="w-4 h-4" />
                    <span>{session.instructor}</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-400">{session.time}</span>
                  <button className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition flex items-center gap-1">
                    Join Stream <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Sessions Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-gray-700" />
          <h2 className="text-xl font-bold text-gray-800">Upcoming Live Classes</h2>
        </div>

        {upcoming.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((session) => (
              <div key={session.id} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-3xl bg-gray-50 p-2.5 rounded-xl border border-gray-100">{session.thumbnail}</span>
                    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
                      {session.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-gray-900 leading-snug line-clamp-2">{session.title}</h3>
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm mt-2">
                    <User className="w-4 h-4" />
                    <span>{session.instructor}</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-rose-500" /> {session.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-rose-500" /> {session.time}</span>
                  </div>
                  <button className="w-full bg-gray-50 hover:bg-rose-50 hover:text-rose-600 text-gray-700 text-sm font-semibold py-2 rounded-xl border border-gray-200 hover:border-rose-200 transition">
                    Set Reminder
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          liveNow.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
              <Video className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No live sessions found matching your criteria.</p>
            </div>
          )
        )}
      </div>
      </div>
    </div>
  );
}