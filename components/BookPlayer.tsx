
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize, ZoomIn, ZoomOut, Loader2 } from 'lucide-react';

interface BookPlayerProps {
  pdfUrl: string;
  title: string;
}

const BookPlayer: React.FC<BookPlayerProps> = ({ pdfUrl, title }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10); // Mocked for UI demo
  const [isLoading, setIsLoading] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsFlipping(false);
      }, 400);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsFlipping(false);
      }, 400);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6 w-full max-w-5xl mx-auto">
      {/* Book Container */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-slate-200 rounded-3xl shadow-2xl overflow-hidden group perspective-1000">
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center">
            <Loader2 className="text-white animate-spin" size={48} />
          </div>
        )}

        {/* Flip Page Layout */}
        <div className="flex w-full h-full p-4 md:p-8 gap-1 bg-slate-300">
          
          {/* Left Page (Static or Previous) */}
          <div className="flex-1 bg-white shadow-inner rounded-l-lg overflow-hidden relative border-r border-slate-200">
            <div className="absolute inset-0 flex items-center justify-center text-slate-100 font-bold text-9xl select-none">
              {currentPage}
            </div>
            <img 
              src={`https://picsum.photos/seed/page${currentPage}/800/1100`} 
              className="w-full h-full object-cover opacity-80"
              alt="Left Page"
            />
          </div>

          {/* Right Page (Flipping Part) */}
          <div className={`flex-1 bg-white shadow-inner rounded-r-lg overflow-hidden relative transform-gpu transition-all duration-500 origin-left ${
            isFlipping ? 'rotate-y-[-20deg] brightness-90 shadow-2xl' : ''
          }`}>
             <div className="absolute inset-0 flex items-center justify-center text-slate-100 font-bold text-9xl select-none">
              {currentPage + 1}
            </div>
            <img 
              src={`https://picsum.photos/seed/page${currentPage + 1}/800/1100`} 
              className="w-full h-full object-cover"
              alt="Right Page"
            />
          </div>

          {/* Spine Detail */}
          <div className="absolute left-1/2 top-0 bottom-0 w-4 bg-gradient-to-r from-black/10 via-white/20 to-black/10 -translate-x-1/2"></div>
        </div>

        {/* Navigation Buttons Overlay */}
        <div className="absolute inset-y-0 left-0 w-20 flex items-center justify-center">
          <button 
            onClick={prevPage}
            disabled={currentPage <= 1}
            className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
          >
            <ChevronLeft size={32} />
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 w-20 flex items-center justify-center">
          <button 
            onClick={nextPage}
            disabled={currentPage >= totalPages}
            className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg"><ZoomOut size={20} /></button>
          <span className="text-sm font-bold text-slate-600">100%</span>
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg"><ZoomIn size={20} /></button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-500">หน้า {currentPage} จาก {totalPages}</span>
          <div className="flex bg-slate-100 p-1 rounded-xl">
             <button 
              onClick={prevPage}
              className="px-4 py-2 hover:bg-white rounded-lg transition-all text-slate-600 disabled:opacity-30"
              disabled={currentPage <= 1}
             >
              <ChevronLeft size={18} />
             </button>
             <button 
              onClick={nextPage}
              className="px-4 py-2 hover:bg-white rounded-lg transition-all text-slate-600 disabled:opacity-30"
              disabled={currentPage >= totalPages}
             >
              <ChevronRight size={18} />
             </button>
          </div>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">
          <Maximize size={18} />
          เต็มหน้าจอ
        </button>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1500px; }
        .rotate-y-[-20deg] { transform: rotateY(-20deg); }
      `}</style>
    </div>
  );
};

export default BookPlayer;
