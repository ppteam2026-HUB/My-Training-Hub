import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  UserPlus, 
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  FileText,
  CheckCircle
} from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'courses' | 'content'>('users');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">จัดการระบบ</h1>
        <p className="text-slate-500 mt-1">ดูแลจัดการข้อมูลผู้ใช้งานและเนื้อหาคอร์สเรียน</p>
      </div>

      {/* Admin Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">นักเรียนทั้งหมด</p>
            <h4 className="text-3xl font-bold">1,248</h4>
            <p className="text-emerald-500 text-xs font-medium mt-2 flex items-center gap-1">
              <TrendingUp size={12} /> +12% จากเดือนก่อน
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600">
            <Users size={28} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">คอร์สที่เปิดสอน</p>
            <h4 className="text-3xl font-bold">42</h4>
            <p className="text-emerald-500 text-xs font-medium mt-2 flex items-center gap-1">
              <Plus size={12} /> เพิ่มใหม่ 3 คอร์ส
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600">
            <BookOpen size={28} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">แบบทดสอบที่ผ่าน</p>
            <h4 className="text-3xl font-bold">8,520</h4>
            <p className="text-indigo-500 text-xs font-medium mt-2 flex items-center gap-1">
              <FileText size={12} /> ดูรายงานสรุป
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600">
            <CheckCircle size={28} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-8 py-5 font-bold text-sm transition-all border-b-2 ${
              activeTab === 'users' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            รายชื่อผู้ใช้งาน
          </button>
          <button 
            onClick={() => setActiveTab('courses')}
            className={`px-8 py-5 font-bold text-sm transition-all border-b-2 ${
              activeTab === 'courses' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            จัดการคอร์ส
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={`px-8 py-5 font-bold text-sm transition-all border-b-2 ${
              activeTab === 'content' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            ไลบรารีและเนื้อหา
          </button>
        </div>

        <div className="p-8">
          {/* Action Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="ค้นหา..."
                className="pl-10 pr-4 py-2.5 bg-slate-50 border-0 rounded-xl focus:ring-2 focus:ring-indigo-500 w-full md:w-80 text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all">
                <UserPlus size={18} />
                เพิ่มผู้ใช้งานใหม่
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-100">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">ชื่อ-นามสกุล</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">อีเมล</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">ล่าสุด</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { name: 'Sompong Jaidee', email: 'sompong@company.com', role: 'Student', last: '2 ชม. ที่แล้ว' },
                  { name: 'Wichai Rakthai', email: 'wichai@company.com', role: 'Admin', last: 'ตอนนี้' },
                  { name: 'Malee Sornsiri', email: 'malee@company.com', role: 'Student', last: '1 วันที่แล้ว' },
                  { name: 'Anan Preecha', email: 'anan@company.com', role: 'Student', last: '3 วันที่แล้ว' },
                ].map((user, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs uppercase">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-bold text-slate-700">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-500">{user.email}</td>
                    <td className="px-6 py-5">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        user.role === 'Admin' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-500">{user.last}</td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <p className="text-xs text-slate-400 font-medium italic">Showing 4 of 1,248 users</p>
            <div className="flex items-center gap-2">
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-400 disabled:opacity-30">
                <ChevronLeft size={16} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center bg-indigo-600 text-white rounded-lg font-bold text-xs">1</button>
              <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 text-slate-600 rounded-lg font-bold text-xs">2</button>
              <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 text-slate-600 rounded-lg font-bold text-xs">3</button>
              <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
