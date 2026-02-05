
import React, { useState } from 'react';
import { User } from '../types';
import { api } from '../api';
import { LogIn, ShieldCheck, Mail, Lock, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await api.login(email, password);
      
      if (result.success && result.user) {
        onLogin(result.user);
      } else {
        setError(result.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] aspect-square bg-indigo-800 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] aspect-square bg-indigo-500/20 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-4xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10 animate-in fade-in zoom-in duration-500">
        {/* Left Side: Branding */}
        <div className="md:w-1/2 bg-indigo-600 p-12 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md">
                <ShieldCheck size={32} />
              </div>
              <span className="text-2xl font-black tracking-tight uppercase">Training Hub</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight mb-6">
              Empower Your <br />
              <span className="text-indigo-200">Knowledge</span>
            </h1>
            <p className="text-indigo-100/80 leading-relaxed max-w-xs">
              แพลตฟอร์มการเรียนรู้ออนไลน์สมบูรณ์แบบที่เชื่อมต่อข้อมูลผ่าน Google Sheets โดยตรง
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full"></div>
              <span>จัดการคอร์สผ่าน Google Sheets</span>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full"></div>
              <span>รองรับวิดีโอและ E-Book Flip Page</span>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full"></div>
              <span>ระบบเช็คชื่อ (Attention Check)</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-12 flex flex-col justify-center bg-white">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">เข้าสู่ระบบ</h2>
            <p className="text-slate-500">ใส่ข้อมูลพนักงานเพื่อเริ่มต้นการเรียนรู้</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 animate-in slide-in-from-top-2">
              <AlertCircle size={20} />
              <span className="text-sm font-bold">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">อีเมลพนักงาน</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@company.com"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-indigo-600 focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">รหัสผ่าน</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent rounded-2xl focus:border-indigo-600 focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn size={20} />
                  เข้าสู่ระบบ
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-slate-400 text-xs">
              Copyright © 2024 Corporate Training LMS. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
