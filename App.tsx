
import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  BookOpen, 
  LayoutDashboard, 
  Calendar as CalendarIcon, 
  Settings, 
  LogOut,
  User as UserIcon,
  Play,
  CheckCircle,
  Clock,
  ChevronRight
} from 'lucide-react';
import { User, UserRole, Course } from './types';
import Dashboard from './components/Dashboard';
import CourseList from './components/CourseList';
import Player from './components/Player';
import AdminPanel from './components/AdminPanel';
import TrainingCalendar from './components/TrainingCalendar';
import Login from './components/Login';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activePage, setActivePage] = useState<string>('dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    setActivePage('login');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const navigateToPlayer = (courseId: string, lessonId: string) => {
    setSelectedCourseId(courseId);
    setSelectedLessonId(lessonId);
    setActivePage('player');
  };

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard user={user} onStartLearning={(c, l) => navigateToPlayer(c, l)} />;
      case 'courses':
        return <CourseList onSelectLesson={navigateToPlayer} />;
      case 'player':
        return selectedCourseId && selectedLessonId ? (
          <Player 
            courseId={selectedCourseId} 
            lessonId={selectedLessonId} 
            onBack={() => setActivePage('courses')} 
          />
        ) : <Dashboard user={user} onStartLearning={(c, l) => navigateToPlayer(c, l)} />;
      case 'calendar':
        return <TrainingCalendar />;
      case 'admin':
        return user.role === UserRole.ADMIN ? <AdminPanel /> : <Dashboard user={user} onStartLearning={(c, l) => navigateToPlayer(c, l)} />;
      default:
        return <Dashboard user={user} onStartLearning={(c, l) => navigateToPlayer(c, l)} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-slate-900 text-white fixed h-full transition-all duration-300 z-50">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <BookOpen size={24} />
            </div>
            <span className="font-bold text-xl tracking-tight">Training Hub</span>
          </div>

          <nav className="space-y-1">
            <SidebarItem icon={<LayoutDashboard size={20} />} label="หน้าหลัก" active={activePage === 'dashboard'} onClick={() => setActivePage('dashboard')} />
            <SidebarItem icon={<Play size={20} />} label="คอร์สเรียน" active={activePage === 'courses' || activePage === 'player'} onClick={() => setActivePage('courses')} />
            <SidebarItem icon={<CalendarIcon size={20} />} label="ปฏิทินอบรม" active={activePage === 'calendar'} onClick={() => setActivePage('calendar')} />
            
            {user.role === UserRole.ADMIN && (
              <div className="pt-4 mt-4 border-t border-slate-800">
                <p className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">Admin Management</p>
                <SidebarItem icon={<Settings size={20} />} label="จัดการระบบ" active={activePage === 'admin'} onClick={() => setActivePage('admin')} />
              </div>
            )}
          </nav>
        </div>

        <div className="absolute bottom-0 w-full p-6 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-indigo-500/10 p-2 rounded-full">
              <UserIcon size={20} className="text-indigo-400" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{user.fullName}</p>
              <p className="text-xs text-slate-400 capitalize">{user.role}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
            <LogOut size={18} /> ออกจากระบบ
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        {renderContent()}
      </main>
    </div>
  );
};

const SidebarItem: React.FC<{ icon: React.ReactNode; label: string; active: boolean; onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
      active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </button>
);

export default App;
