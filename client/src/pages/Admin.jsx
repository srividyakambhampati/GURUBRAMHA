import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  Video, 
  BarChart, 
  Plus, 
  Trash2, 
  Edit,
  TrendingUp,
  Search,
  Bell
} from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('courses');

  const stats = [
    { label: 'Total Revenue', value: '₹4,52,800', icon: <DollarSign className="text-green-500" />, trend: '+12.5%' },
    { label: 'Total Students', value: '12,450', icon: <Users className="text-blue-500" />, trend: '+8.2%' },
    { label: 'Active Courses', value: '48', icon: <BookOpen className="text-purple-500" />, trend: '+2' },
    { label: 'Watch Time', value: '145k hrs', icon: <Video className="text-orange-500" />, trend: '+15.4%' },
  ];

  return (
    <div className="pb-12 flex min-h-screen">
      {/* Main Content */}
      <div className="flex-grow">
        <div className="space-y-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between">
            <div className="relative w-96 hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search analytics..."
                className="w-full pl-12 pr-4 py-2.5 glass !bg-white/50 dark:!bg-white/5 rounded-2xl outline-none"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2.5 glass rounded-xl text-slate-500 relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary-600 rounded-full"></span>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-white/10">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold">Admin Guru</p>
                  <p className="text-xs text-slate-400">Super Admin</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="glass-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white dark:bg-white/5 rounded-xl shadow-sm">{stat.icon}</div>
                  <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-lg flex items-center gap-1">
                    <TrendingUp size={12} /> {stat.trend}
                  </span>
                </div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Table Area */}
          <div className="glass rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-slate-100 dark:border-white/10 flex items-center justify-between bg-white/30 dark:bg-black/10">
              <h3 className="text-xl font-bold">Recent Courses</h3>
              <button className="btn-primary py-2.5 px-6 flex items-center gap-2">
                <Plus size={18} /> Add New Course
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50 dark:bg-black/5">
                    <th className="px-8 py-5">Course Name</th>
                    <th className="px-8 py-5">Instructor</th>
                    <th className="px-8 py-5 text-center">Status</th>
                    <th className="px-8 py-5 text-center">Enrolled</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                  {[
                    { name: 'Python for Beginners', instructor: 'Dr. Smith', status: 'Published', students: 1240 },
                    { name: 'Full Stack JavaScript', instructor: 'Dev Karan', status: 'Published', students: 850 },
                    { name: 'Advanced Java', instructor: 'Sarah Johnson', status: 'Draft', students: 0 },
                    { name: 'React Native', instructor: 'Alex Lee', status: 'Published', students: 420 },
                    { name: 'Machine Learning', instructor: 'Dr. Elena', status: 'Scheduled', students: 0 },
                  ].map((course, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary-600/10 flex items-center justify-center text-primary-600 font-bold">
                            {course.name[0]}
                          </div>
                          <span className="font-bold">{course.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-slate-500">{course.instructor}</td>
                      <td className="px-8 py-5 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          course.status === 'Published' ? 'bg-green-500/10 text-green-600' :
                          course.status === 'Draft' ? 'bg-slate-500/10 text-slate-500' :
                          'bg-blue-500/10 text-blue-600'
                        }`}>
                          {course.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-center font-medium">{course.students}</td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button className="p-2 hover:bg-primary-600/10 rounded-lg text-slate-400 hover:text-primary-600 transition-all">
                            <Edit size={18} />
                          </button>
                          <button className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-500 transition-all">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
