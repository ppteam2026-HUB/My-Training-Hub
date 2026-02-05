
import React, { useState, useEffect } from 'react';
import { User, StudentStats } from '../types';
import { api } from '../api';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Play, CheckCircle, Clock, Trophy, Loader2 } from 'lucide-react';

interface DashboardProps {
  user: User;
  onStartLearning: (courseId: string, lessonId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onStartLearning }) => {
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getStudentStats(user.userId).then(data => {
      setStats(data);
      setLoading(false);
    });
  }, [user.userId]);

  if (loading || !stats) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">สวัสดี, {user.fullName} 👋</h1>
        <p className="text-slate-500 mt-1">ยินดีต้อนรับกลับสู่ระบบการเรียนรู้ของคุณ</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Play className="text-blue-600" />} 
          label="คอร์สที่กำลังเรียน" 
          value={stats.coursesInProgress.toString()} 
          bgColor="bg-blue-50" 
        />
        <StatCard 
          icon={<CheckCircle className="text-green-600" />} 
          label="เรียนจบแล้ว" 
          value={stats.completedCourses.toString()} 
          bgColor="bg-green-50" 
        />
        <StatCard 
          icon={<Clock className="text-purple-600" />} 
          label="ชั่วโมงเรียนรวม" 
          value={stats.totalStudyHours.toString()} 
          bgColor="bg-purple-50" 
        />
        <StatCard 
          icon={<Trophy className="text-amber-600" />} 
          label="คะแนนสะสม" 
          value={stats.learningPoints.toLocaleString()} 
          bgColor="bg-amber-50" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-xl">กิจกรรมการเรียนรู้สัปดาห์นี้</h3>
            <div className="bg-slate-50 p-1 rounded-xl flex gap-1">
               <button className="px-3 py-1 text-xs font-bold bg-white shadow-sm rounded-lg text-indigo-600">สัปดาห์นี้</button>
               <button className="px-3 py-1 text-xs font-bold text-slate-400 hover:text-slate-600">ย้อนหลัง</button>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.weeklyActivity}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
          <h3 className="font-bold text-xl mb-6">เรียนต่อจากที่ค้าง</h3>
          <div className="space-y-4 flex-1">
            <ContinueItem 
              title="Foundations of Project Planning" 
              lesson="บทที่ 3: การจัดการทรัพยากร"
              progress={65}
              onPlay={() => onStartLearning('CRS001', 'L1')}
            />
            <ContinueItem 
              title="Advanced Communication" 
              lesson="บทที่ 1: การฟังอย่างมีประสิทธิภาพ"
              progress={20}
              onPlay={() => onStartLearning('CRS002', 'L1')}
            />
          </div>
          <button className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all">
            เข้าดูคอร์สทั้งหมด
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; bgColor: string }> = ({ icon, label, value, bgColor }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-lg transition-all group">
    <div className={`p-4 rounded-2xl ${bgColor} group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </div>
  </div>
);

const ContinueItem: React.FC<{ title: string; lesson: string; progress: number; onPlay: () => void }> = ({ title, lesson, progress, onPlay }) => (
  <div className="group p-5 bg-slate-50 rounded-2xl border-2 border-transparent hover:border-indigo-100 hover:bg-white transition-all">
    <div className="flex justify-between items-start mb-3">
      <div className="overflow-hidden">
        <h4 className="font-bold text-sm text-slate-900 truncate">{title}</h4>
        <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-0.5">{lesson}</p>
      </div>
      <button 
        onClick={onPlay}
        className="bg-indigo-600 text-white p-2.5 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 group-hover:scale-110"
      >
        <Play size={16} fill="currentColor" />
      </button>
    </div>
    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
      <div className="bg-indigo-600 h-full rounded-full transition-all duration-1000" style={{width: `${progress}%`}}></div>
    </div>
    <div className="flex justify-between mt-2">
      <span className="text-[10px] font-bold text-slate-400">Progress</span>
      <span className="text-[10px] font-bold text-indigo-600">{progress}%</span>
    </div>
  </div>
);

export default Dashboard;
