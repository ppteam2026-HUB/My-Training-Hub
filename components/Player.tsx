
import React, { useState, useEffect } from 'react';
import { ChevronLeft, Play, Pause, Volume2, AlertCircle, CheckCircle2, Clock, BookOpen, Loader2, Star } from 'lucide-react';
import BookPlayer from './BookPlayer';
import { Lesson, User } from '../types';
import { api } from '../api';

interface PlayerProps {
  courseId: string;
  lessonId: string;
  onBack: () => void;
}

const Player: React.FC<PlayerProps> = ({ courseId, lessonId, onBack }) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAttention, setShowAttention] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.getLessons(courseId).then(data => {
      setLessons(data);
      if (lessonId === 'AUTO' && data.length > 0) {
        setCurrentLesson(data[0]);
      } else {
        setCurrentLesson(data.find(l => l.lessonId === lessonId) || data[0]);
      }
      setLoading(false);
    });
  }, [courseId, lessonId]);

  const handleLessonChange = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    setIsPlaying(false);
    setShowAttention(false);
    setCompleted(false);
  };

  const markAsComplete = async () => {
    if (!currentLesson) return;
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    await api.updateProgress({
      userId: currentUser.userId,
      courseId,
      lessonId: currentLesson.lessonId,
      status: 'completed'
    });
    setCompleted(true);
  };

  if (loading || !currentLesson) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button onClick={onBack} className="p-4 bg-white border border-slate-100 rounded-3xl shadow-sm hover:bg-slate-50 transition-all hover:scale-105">
            <ChevronLeft size={24} />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 text-[10px] font-bold rounded-md uppercase tracking-wider">{currentLesson.type}</span>
              <span className="text-xs text-slate-400 font-bold">คอร์ส: {courseId}</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900">{currentLesson.title}</h2>
          </div>
        </div>
        
        {completed ? (
          <div className="flex items-center gap-2 px-6 py-3 bg-emerald-50 text-emerald-600 rounded-2xl font-bold animate-in zoom-in">
            <CheckCircle2 size={20} />
            เรียนจบแล้ว
          </div>
        ) : (
          <button 
            onClick={markAsComplete}
            className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
          >
            ทำเครื่องหมายว่าเรียนจบ
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          {currentLesson.type === 'book' ? (
            <BookPlayer pdfUrl={currentLesson.pdfUrl || ''} title={currentLesson.title} />
          ) : (
            <div className="relative aspect-video bg-black rounded-[3rem] overflow-hidden shadow-2xl border-[8px] border-white ring-1 ring-slate-100 group">
              <div className="w-full h-full flex items-center justify-center bg-slate-900">
                <img 
                  src={`https://picsum.photos/seed/${currentLesson.lessonId}/1280/720`} 
                  className={`w-full h-full object-cover transition-all duration-1000 ${isPlaying ? 'opacity-90' : 'opacity-40 blur-sm'}`} 
                />
                {!isPlaying && (
                  <button onClick={() => setIsPlaying(true)} className="absolute bg-white text-indigo-600 p-10 rounded-full shadow-2xl hover:scale-110 transition-all group-hover:ring-8 ring-white/20">
                    <Play size={48} fill="currentColor" />
                  </button>
                )}
                
                {isPlaying && (
                  <button onClick={() => setIsPlaying(false)} className="absolute bottom-8 right-8 bg-black/40 backdrop-blur-md text-white p-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <Pause size={24} fill="currentColor" />
                  </button>
                )}
              </div>
              
              {showAttention && (
                <div className="absolute inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex items-center justify-center">
                  <div className="bg-white p-12 rounded-[3.5rem] text-center max-w-sm w-full mx-4 shadow-2xl animate-in zoom-in duration-300">
                    <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-8 text-amber-600">
                      <AlertCircle size={48} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-3">ยังเรียนอยู่ไหม?</h3>
                    <p className="text-slate-500 mb-10 text-lg">กรุณากดยืนยันเพื่อบันทึกชั่วโมงเรียน</p>
                    <button onClick={() => setShowAttention(false)} className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-bold text-xl shadow-xl shadow-indigo-100 hover:scale-105 active:scale-95 transition-all">
                      ยืนยันว่ายังเรียนอยู่
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-8 bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-10 -mt-10 opacity-50"></div>
            <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
              <Star className="text-indigo-600" />
              รายละเอียดบทเรียน
            </h3>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-loose text-lg">
                บทเรียนนี้จะครอบคลุมเนื้อหาสำคัญเกี่ยวกับ {currentLesson.title} ซึ่งออกแบบมาเพื่อพัฒนาทักษะเฉพาะด้านของคุณ 
                เนื้อหาผ่านการคัดกรองจากผู้เชี่ยวชาญในองค์กรเพื่อให้มั่นใจว่าคุณจะได้รับความรู้ที่นำไปใช้งานได้จริง
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2">สิ่งที่คุณจะได้รับ:</h4>
                  <ul className="text-sm text-slate-500 space-y-2 list-disc pl-5">
                    <li>ความเข้าใจลึกซึ้งในหลักการทำงาน</li>
                    <li>เทคนิคการแก้ปัญหาเฉพาะหน้า</li>
                    <li>Case Study จากสถานการณ์จริง</li>
                  </ul>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2">เอกสารประกอบ:</h4>
                  <button className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:underline">
                    <BookOpen size={16} /> ดาวน์โหลดคู่มือบทเรียน (PDF)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm sticky top-8">
            <h3 className="font-black text-xl mb-8 flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                <BookOpen size={20} />
              </div>
              เนื้อหาบทเรียน
            </h3>
            <div className="space-y-4">
              {lessons.map((lesson, idx) => (
                <button 
                  key={lesson.lessonId}
                  onClick={() => handleLessonChange(lesson)}
                  className={`w-full group flex items-center gap-4 p-5 rounded-2xl transition-all text-left border-2 ${
                    currentLesson.lessonId === lesson.lessonId 
                      ? 'bg-indigo-50 border-indigo-200 ring-4 ring-indigo-50' 
                      : 'hover:bg-slate-50 border-transparent'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all ${
                    currentLesson.lessonId === lesson.lessonId 
                      ? 'bg-indigo-600 text-white shadow-lg' 
                      : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600'
                  }`}>
                    {lesson.type === 'book' ? <BookOpen size={18} /> : idx + 1}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className={`text-sm font-bold truncate ${currentLesson.lessonId === lesson.lessonId ? 'text-indigo-900' : 'text-slate-700'}`}>
                      {lesson.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{lesson.type}</span>
                      {idx === 0 && <span className="w-1 h-1 bg-slate-300 rounded-full"></span>}
                      {idx === 0 && <span className="text-[10px] font-bold text-indigo-500">แนะนำ</span>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-10 p-6 bg-slate-900 rounded-3xl text-white">
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">ต้องการความช่วยเหลือ?</p>
              <p className="text-sm text-slate-300 mb-4">หากพบบทเรียนมีปัญหา สามารถแจ้งทีม IT Support ได้ทันที</p>
              <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all border border-white/10">
                เปิด Ticket แจ้งปัญหา
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
