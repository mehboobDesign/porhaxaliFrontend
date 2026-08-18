import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Search } from 'lucide-react'; 
import { studentTabs } from '../commom/CommonArrays';

// Sample data matching your platform's vibe
const INITIAL_COURSES = [
  {
    id: 1,
    title: 'Advanced Physics',
    instructor: 'Dr. K. Das',
    category: 'Science',
    lessonsCompleted: 18,
    totalLessons: 24,
    progress: 75,
    image: '⚛️',
  },
  {
    id: 2,
    title: 'Organic Chemistry',
    instructor: 'Prof. Baruah',
    category: 'Science',
    lessonsCompleted: 12,
    totalLessons: 30,
    progress: 40,
    image: '🧪',
  },
  {
    id: 3,
    title: 'Calculus & Vectors',
    instructor: 'Ms. R. Saikia',
    category: 'Mathematics',
    lessonsCompleted: 18,
    totalLessons: 20,
    progress: 90,
    image: '📐',
  },
  {
    id: 4,
    title: 'React JS with Vue concepts',
    instructor: 'Mr. Mehboob Alam',
    category: 'Programming',
    lessonsCompleted: 24,
    totalLessons: 24,
    progress: 100,
    image: '💻',
  },
  {
    id: 5,
    title: 'Database Design in Springboot',
    instructor: 'Prof. Mukhtarul Haque',
    category: 'Programming',
    lessonsCompleted: 30,
    totalLessons: 30,
    progress: 100,
    image: '🗄️',
  },
  {
    id: 6,
    title: 'Advanced English Literature',
    instructor: 'Prof. M Haque',
    category: 'Humanities',
    lessonsCompleted: 5,
    totalLessons: 20,
    progress: 25,
    image: '📚',
  },
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Science', 'Mathematics', 'Programming', 'Humanities'];

  // Filter Logic
  const filteredCourses = INITIAL_COURSES.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen  font-montserrat bg-gray-50  text-gray-800 flex">
       
        <Sidebar pageId="BrowseCourses" tabs={studentTabs}/>
        
        <div className="w-full transition-transform duration-300 ease-in-out">
{/* Header Section */}
<div className="flex flex-col pt-6 pl-6 pr-6 md:pt-6 md:pl-6 md:pr-6 md:flex-row md:items-center md:justify-between mb-8 gap-4">
  <div>
    <h1 className="text-3xl font-bold text-gray-900">Explore Courses</h1>
    <p className="text-gray-500 mt-1">Keep learning and expanding your horizons.</p>
  </div>
</div>
 {/* Controls: Search & Filters */}
<div className="flex flex-col pl-6 pr-6 md:flex-row md:items-center justify-between gap-4 mb-4">
 {/* Search Bar */}
 <div className="relative flex-1 max-w-md">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search courses or instructors..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
      />
  </div>
  {/* Category Pill Filters */}
  <div className="flex flex-wrap gap-2">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => setSelectedCategory(category)}
        className={`px-4 py-2 rounded-full font-medium text-sm transition-all shadow-sm ${
          selectedCategory === category
            ? 'bg-linear-to-r from-pink-500 to-rose-500 text-white shadow-pink-200'
            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'
        }`}
      >
      {category}
      </button>
    ))}
  </div>
</div>
{/* Courses Grid */}
{filteredCourses.length > 0 ? (
  <div className="pl-6 pr-6 pb-6 md:pl-6 md:pr-6 md:pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredCourses.map((course) => (
      <div 
        key={course.id} 
        className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group"
      >
        {/* Course Header/Thumbnail Background */}
        <div className="p-6 pb-0 flex items-start justify-between">
          <div className="text-4xl p-3 bg-pink-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
            {course.image}
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            course.progress === 100 
              ? 'bg-green-50 text-green-700 border border-green-100' 
              : 'bg-blue-50 text-blue-700 border border-blue-100'
          }`}>
            {course.category}
          </span>
        </div>

        {/* Course Content */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="font-bold text-xl text-gray-900 group-hover:text-pink-600 transition-colors line-clamp-1">
              {course.title}
            </h3>
            <p className="text-gray-500 text-sm mt-1">by {course.instructor}</p>
          </div>

          {/* Progress Section */}
          <div className="mt-auto">
            <div className="flex justify-between items-center text-sm font-medium text-gray-600 mb-2">
              <span>{course.lessonsCompleted} of {course.totalLessons} lessons</span>
              <span className={course.progress === 100 ? 'text-green-600 font-bold' : 'text-gray-900'}>
                {course.progress}%
              </span>
            </div>
            
            {/* Progress Bar Container */}
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-5">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  course.progress === 100 
                    ? 'bg-linear-to-r from-green-400 to-emerald-500' 
                    : 'bg-linear-to-r from-pink-500 to-rose-500'
                }`}
                style={{ width: `${course.progress}%` }}
              />
            </div>

            {/* Action Button */}
            <button className={`w-full py-2.5 rounded-xl font-semibold transition-all text-sm border ${
              course.progress === 100
                ? 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                : 'bg-linear-to-r from-pink-500 to-rose-500 text-white hover:opacity-95 shadow-sm shadow-pink-100'
            }`}>
              {course.progress === 100 ? 'Restart Class' : 'Resume Class'}
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  /* Empty State */
  <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
    <span className="text-5xl">🔍</span>
    <h3 className="text-lg font-bold text-gray-800 mt-4">No courses found</h3>
    <p className="text-gray-500 mt-1">Try adjusting your search criteria or category filter.</p>
  </div>
)}

</div>
    </div>
  );
}