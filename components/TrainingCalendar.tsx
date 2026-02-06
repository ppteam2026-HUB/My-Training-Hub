import React from 'react';
import { Calendar as LucideCalendar, ChevronLeft, ChevronRight, MapPin, Clock, ExternalLink } from 'lucide-react';

const MOCK_EVENTS = [
  {
    id: 'EVT001',
    title: 'Workshop: Project Management Essentials',
    date: '24 Mar 2024',
    time: '09:00 - 12:00',
    location: 'ห้องประชุม 401 หรือ Online Zoom',
    type: 'Workshop',
    color: 'bg-blue-100 text-blue-700 border-blue-200'
  },
  {
    id: 'EVT002',
    title: 'Seminar: AI in Business 2024',
    date: '26 Mar 2024',
    time: '13:30 - 16:30',
    location: 'Auditorium ชั้น 2',
    type: 'Seminar',
    color: 'bg-indigo-100 text-indigo-700 border-indigo-200'
  },
  {
    id: 'EVT003',
    title: 'Exam: Security Awareness Certification',
    date: '28 Mar 2024',
    time: '10:00 - 11:00',
    location: 'Online Platform',
    type: 'Exam',
    color: 'bg-rose-100 text-rose-700 border-rose-200'
  }
];

const TrainingCalendar: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">ปฏิทินการอบรม</h1>
          <p className="text-slate-500 mt-1">ติดตามกิจกรรมการเรียนรู้แบบกลุ่มและสัมมนาต่างๆ</p>
        </div>

        <div className="flex items-center gap-2 bg-white border border-slate-200 p-1.5 rounded-2xl shadow-sm">
          <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
            <ChevronLeft size={18} />
          </button>
          <span className="px-4 font-bold text-slate-700">มีนาคม 2024</span>
          <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Grid Mockup */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-7 border-b border-slate-100">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {Array.from({length: 31}).map((_, i) => {
              const day = i + 1;
              const hasEvent = [24, 26, 28].includes(day);
              const isToday = day === 21;

              return (
                <div 
                  key={i} 
                  className={`min-h-[120px] p-2 border-r border-b border-slate-100 transition-colors hover:bg-slate-50 cursor-pointer ${
                    isToday ? 'bg-indigo-50/30' : ''
                  }`}
                >
                  <div className="flex justify-between">
                    <span className={`text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full ${
                      isToday ? 'bg-indigo-600 text-white' : 'text-slate-600'
                    }`}>
                      {day}
                    </span>
                  </div>
                  {hasEvent && (
                    <div className="mt-2 p-1.5 bg-indigo-100 rounded-lg text-[10px] font-bold text-indigo-700 line-clamp-2 leading-tight">
                      อบรม/กิจกรรม
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcomming Events List */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900 px-2 flex items-center gap-2">
            กิจกรรมเร็วๆ นี้
            <span className="bg-indigo-100 text-indigo-600 text-[10px] px-2 py-0.5 rounded-full">3 รายการ</span>
          </h3>
          <div className="space-y-4">
            {MOCK_EVENTS.map(event => (
              <div 
                key={event.id}
                className={`p-5 rounded-3xl border-2 transition-all hover:scale-[1.02] cursor-pointer ${event.color}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-white/50 px-2 py-0.5 rounded-md">
                    {event.type}
                  </span>
                  <ExternalLink size={16} className="opacity-40" />
                </div>
                <h4 className="font-bold text-lg leading-tight mb-4">{event.title}</h4>
                <div className="space-y-2 opacity-80">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Clock size={14} />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm font-medium">
                    <MapPin size={14} className="mt-1 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <button className="w-full mt-6 py-2.5 bg-white rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-shadow">
                  จองที่นั่ง / เข้าร่วม
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingCalendar;
