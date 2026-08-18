import React, { useState } from 'react';
import { 
  User, Mail, Phone, Lock, Eye, EyeOff, 
  Bell, Shield, Globe, Camera, Check, Trash2 
} from 'lucide-react';
import Sidebar from './Sidebar';
import UseAuth from '../../Hooks/UseAuth';
import { studentTabs } from '../commom/CommonArrays';

export default function ProfileSettings() {
  // Form State
  const [profile, setProfile] = useState({
    name: 'Ankur Baruah',
    email: 'ankur.baruah@example.com',
    phone: '+91 98765 43210',
    bio: 'Full Stack Developer & Educator. Passionate about building clean user interfaces and teaching clean code.',
    language: 'English (US)',
    timezone: 'GMT+05:30 (IST)',
    emailNotifications: true,
    marketingEmails: false,
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000); // Reset toast notification
  };

  const { auth } = UseAuth();

  return (
    <div className="flex w-full font-montserrat bg-gray-50 antialiased text-gray-900">
      <Sidebar pageId="ProfileSettings" tabs={studentTabs}/>
      {/* Toast Success Banner */}
      {isSaved && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-lg transition animate-in fade-in slide-in-from-bottom-4">
          <Check className="w-4 h-4" />
          <span className="text-sm font-medium">Changes saved successfully!</span>
        </div>
      )}
      <div className='w-full'>
        {/* Header */}
        <div className="pb-6 pt-6 pl-6">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Account Settings</h1>
          <p className="text-gray-500 mt-1">Manage your profile information, security preferences, and configuration.</p>
        </div>
      <div className="">
        
        {/* Left Column: Avatar Profile Card */}
        <div className="flex flex-nowrap items-start gap-6 p-6">
          <div className="w-1/2 bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
            <div className="relative w-28 h-28 mx-auto mb-4">
              <div className="w-full h-full rounded-full bg-rose-50 border-2 border-rose-500/20 flex items-center justify-center text-rose-500 text-3xl font-bold overflow-hidden">
                AB
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white border border-gray-200 shadow-sm rounded-full text-gray-600 hover:text-rose-500 transition">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-lg font-bold text-gray-900">{auth.userName}</h2>
            <p className="text-sm text-gray-500">{auth.userEmail}</p>
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center gap-2">
              <span className="text-xs font-medium bg-rose-50 text-rose-600 px-2.5 py-1 rounded-full">{auth.userRole}</span>
              <span className="text-xs font-medium bg-gray-100 text-green-600 px-2.5 py-1 rounded-full">Verified</span>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="w-1/2 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hidden md:block">
            <nav className="space-y-1">
              <a href="#personal-info" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium bg-rose-50 text-rose-600 transition">
                <User className="w-4 h-4" /> Personal Info
              </a>
              <a href="#security" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                <Shield className="w-4 h-4" /> Security
              </a>
              <a href="#preferences" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                <Bell className="w-4 h-4" /> Preferences
              </a>
            </nav>
          </div>
        </div>

        <div className='flex flex-nowrap gap-6 items-start p-6'>
          {/* Section 1: Personal Info */}
        <section id="personal-info" className=" w-1/2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 pb-3 border-b border-gray-100">
              <User className="w-5 h-5 text-rose-500" /> Personal Information
            </h3>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                      type="text" 
                      name="name"
                      value={auth.userName} 
                      onChange={handleProfileChange}
                      className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                      type="text" 
                      name="phone"
                      value={profile.phone} 
                      onChange={handleProfileChange}
                      className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition shadow-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                      type="text" 
                      name="name"
                      value={auth.userName} 
                      onChange={handleProfileChange}
                      className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                      type="text" 
                      name="phone"
                      value={profile.phone} 
                      onChange={handleProfileChange}
                      className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition shadow-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input 
                    type="email" 
                    name="email"
                    value={auth.userEmail} 
                    onChange={handleProfileChange}
                    className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                    disabled
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-1">To change your email address, please contact support.</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Bio</label>
                <textarea 
                  name="bio"
                  rows="3" 
                  value={profile.bio} 
                  onChange={handleProfileChange}
                  className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition shadow-sm resize-none leading-relaxed"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition">
                  Save Settings
                </button>
              </div>
            </form>
          </section>
          {/* Section 2: Security */}
          <section id="security" className="w-1/2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 pb-3 border-b border-gray-100">
              <Lock className="w-5 h-5 text-rose-500" /> Update Password
            </h3>
            
            <form className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password.current}
                    onChange={(e) => setPassword({...password, current: e.target.value})}
                    className="w-full pl-9 pr-10 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition shadow-sm"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">New Password</label>
                  <input 
                    type="password" 
                    value={password.new}
                    onChange={(e) => setPassword({...password, new: e.target.value})}
                    className="w-full px-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Confirm New Password</label>
                  <input 
                    type="password" 
                    value={password.confirm}
                    onChange={(e) => setPassword({...password, confirm: e.target.value})}
                    className="w-full px-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition shadow-sm"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button type="button" className="bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition">
                  Update Password
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* Right Column: Settings Forms */}
        <div className="flex flex-nowrap items-start gap-6 p-6">
          
          
          

          

          {/* Section 3: Preferences / Notifications */}
          <section id="preferences" className="w-1/2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2 pb-3 border-b border-gray-100">
              <Globe className="w-5 h-5 text-rose-500" /> System Preferences
            </h3>
            
            <div className="space-y-4">
              {/* Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Language</label>
                  <select 
                    name="language"
                    value={profile.language}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition shadow-sm outline-none cursor-pointer"
                  >
                    <option>English (US)</option>
                    <option>Assamese</option>
                    <option>Hindi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Timezone</label>
                  <select 
                    name="timezone"
                    value={profile.timezone}
                    onChange={handleProfileChange}
                    className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition shadow-sm outline-none cursor-pointer"
                  >
                    <option>GMT+05:30 (IST)</option>
                    <option>GMT+00:00 (UTC)</option>
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-4 border-t border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Email Notifications</h4>
                    <p className="text-xs text-gray-500">Receive summaries about upcoming live classes and assignments.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="emailNotifications"
                      checked={profile.emailNotifications}
                      onChange={handleProfileChange}
                      className="sr-only peer" 
                    />
                    <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Marketing & Promotional Content</h4>
                    <p className="text-xs text-gray-500">Stay updated with newly launched course tracks or updates.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="marketingEmails"
                      checked={profile.marketingEmails}
                      onChange={handleProfileChange}
                      className="sr-only peer" 
                    />
                    <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <div className="w-1/2 bg-red-50/40 border border-red-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-red-900">Deactivate Account</h4>
              <p className="text-xs text-red-700/80 mt-0.5">This action hides your profile completely from the platform directory.</p>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition flex items-center gap-1.5 whitespace-nowrap">
              <Trash2 className="w-3.5 h-3.5" /> Request Deactivation
            </button>
          </div>

        </div>
      </div>
      </div>
    </div>
  );
}