import React, { useState, useEffect } from "react";

import Sidebar from "../student/Sidebar";
import {adminTabs} from '../commom/CommonArrays'


const Dashboard = () => {
  const [currentView, setCurrentView] = useState("courses"); // views: dashboard, courses, students, teachers
  

  

  const [students, setStudents] = useState([
    { id: "S501", name: "Rahul Kalita", email: "rahul@mail.com", class: "Class 10" },
    { id: "S502", name: "Sneha Sarma", email: "sneha@mail.com", class: "Olympiad Cohort" },
  ]);

  const [teachers, setTeachers] = useState([
    { id: "T301", name: "Dr. Ananya Baruah", department: "Mathematics", experience: "10+ Years" },
    { id: "T302", name: "Rahul Sharma", department: "Physics", experience: "8 Years" },
  ]);

  // Handlers placeholder triggers
  const handleAdd = (type) => alert(`Open "Add New ${type}" Modal / Route`);
  const handleEdit = (type, id) => alert(`Edit ${type} with ID: ${id}`);
  const handleDelete = (type, id) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === "course") setCourses(courses.filter(c => c.id !== id));
      if (type === "student") setStudents(students.filter(s => s.id !== id));
      if (type === "teacher") setTeachers(teachers.filter(t => t.id !== id));
    }
  };

  
  

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800 font-montserrat">
      
     
        <Sidebar pageId="adminDashboard" tabs={adminTabs}/>
       

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1">
        <div className="p-8">
          
          {/* VIEW: OVERVIEW DASHBOARD */}
          {currentView === "dashboard" && (
            <div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <p className="text-sm font-medium text-gray-400 uppercase">Active Curriculums</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{courses.length}</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <p className="text-sm font-medium text-gray-400 uppercase">Enrolled Scholars</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{students.length}</p>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <p className="text-sm font-medium text-gray-400 uppercase">Academic Mentors</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{teachers.length}</p>
                </div>
              </div>
              <div className="rounded-2xl border border-dashed border-gray-200 p-12 text-center text-gray-400 bg-white">
                Select specific database vectors from the sidebar navigation panel to begin CRUD allocations.
              </div>
            </div>
          )}

          

          {/* VIEW: STUDENTS CRUD */}
          {currentView === "students" && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Registered Scholars</h2>
                  <p className="text-sm text-gray-400">Inspect classroom diagnostics or discharge entries.</p>
                </div>
                <button onClick={() => handleAdd("Student")} className="rounded-xl bg-gray-900 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-gray-800 active:scale-95 shadow-sm">
                  + Admit Student
                </button>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                    <th className="p-4 pl-6">ID</th>
                    <th className="p-4">Full Name</th>
                    <th className="p-4">Email Address</th>
                    <th className="p-4">Standard</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm font-medium">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50/70">
                      <td className="p-4 pl-6 font-mono text-xs text-gray-400">{student.id}</td>
                      <td className="p-4 font-bold text-gray-900">{student.name}</td>
                      <td className="p-4 text-gray-500">{student.email}</td>
                      <td className="p-4 text-gray-600">{student.class}</td>
                      <td className="p-4 pr-6 text-right space-x-2">
                        <button onClick={() => handleEdit("student", student.id)} className="text-xs font-semibold text-blue-600 hover:underline">Modify</button>
                        <button onClick={() => handleDelete("student", student.id)} className="text-xs font-semibold text-red-500 hover:underline">Expel</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* VIEW: TEACHERS CRUD */}
          {currentView === "teachers" && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Faculty Assignments</h2>
                  <p className="text-sm text-gray-400">Onboard verified academic heads or track experience tenure.</p>
                </div>
                <button onClick={() => handleAdd("Teacher")} className="rounded-xl bg-gray-900 px-4 py-2 text-xs font-bold text-white transition-all hover:bg-gray-800 active:scale-95 shadow-sm">
                  + Onboard Faculty
                </button>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                    <th className="p-4 pl-6">ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Tenure Stats</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm font-medium">
                  {teachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-gray-50/70">
                      <td className="p-4 pl-6 font-mono text-xs text-gray-400">{teacher.id}</td>
                      <td className="p-4 font-bold text-gray-900">{teacher.name}</td>
                      <td className="p-4 text-gray-500">{teacher.department}</td>
                      <td className="p-4 text-gray-600">{teacher.experience}</td>
                      <td className="p-4 pr-6 text-right space-x-2">
                        <button onClick={() => handleEdit("teacher", teacher.id)} className="text-xs font-semibold text-blue-600 hover:underline">Edit Info</button>
                        <button onClick={() => handleDelete("teacher", teacher.id)} className="text-xs font-semibold text-red-500 hover:underline">Resign</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Dashboard;