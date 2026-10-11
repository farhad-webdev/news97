import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, Download, ChevronLeft, ChevronRight, Printer, Share2 } from 'lucide-react';
import { EPAPER_PAGES } from '../data/mockNews';

interface EPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EPaperModal: React.FC<EPaperModalProps> = ({ isOpen, onClose }) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!isOpen) return null;

  const currentPage = EPAPER_PAGES[currentPageIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden text-white">
        {/* Top Control Bar */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <h3 className="font-extrabold text-base sm:text-lg flex items-center gap-2">
              <span className="text-red-500">দেশবার্তা</span>
              <span className="text-slate-300 font-normal text-xs sm:text-sm">ডিজিটাল ই-পেপার</span>
            </h3>
            <span className="hidden sm:inline-block bg-slate-800 text-slate-300 text-xs px-2.5 py-0.5 rounded-full">
              ২৮ সেপ্টেম্বর ২০২৪
            </span>
          </div>

          {/* Controls: Page navigation, Zoom, Download, Close */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Page Nav */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setCurrentPageIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentPageIndex === 0}
                className="p-1 hover:bg-slate-700 disabled:opacity-40 rounded transition-colors"
                title="পূর্ববর্তী পৃষ্ঠা"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 font-semibold">
                পৃষ্ঠা {currentPage.pageNumber} / {EPAPER_PAGES.length}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPageIndex((prev) => Math.min(EPAPER_PAGES.length - 1, prev + 1))}
                disabled={currentPageIndex === EPAPER_PAGES.length - 1}
                className="p-1 hover:bg-slate-700 disabled:opacity-40 rounded transition-colors"
                title="পরবর্তী পৃষ্ঠা"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setZoomLevel((prev) => Math.max(0.8, prev - 0.1))}
                className="p-1.5 hover:bg-slate-700 rounded transition-colors"
                title="জুম কমান"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                className="px-1.5 text-[11px] font-bold"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel((prev) => Math.min(1.5, prev + 0.1))}
                className="p-1.5 hover:bg-slate-700 rounded transition-colors"
                title="জুম বাড়ান"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Print / Download */}
            <button
              type="button"
              onClick={() => window.print()}
              className="hidden sm:flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-xs px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              title="প্রিন্ট করুন"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>প্রিন্ট</span>
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 flex items-center justify-center transition-colors text-white cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Newspaper Reader Stage */}
        <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center bg-slate-900/60">
          <div 
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
            className="w-full max-w-3xl bg-[#fcfbf9] text-slate-900 rounded-md shadow-2xl p-6 sm:p-10 border border-amber-100 transition-transform duration-200 select-none"
          >
            {/* Newspaper Header Masthead */}
            <div className="border-b-4 border-slate-900 pb-3 mb-4 text-center">
              <div className="flex justify-between items-center text-[11px] font-semibold text-slate-600 border-b border-slate-300 pb-1 mb-2">
                <span>বর্ষ ১১ • সংখ্যা ২৭৪</span>
                <span>ঢাকা, শনিবার, ২৮ সেপ্টেম্বর ২০২৪</span>
                <span>মূল্য: ১২ টাকা</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950 font-serif-bangla">
                দেশ<span className="relative inline-block">বা<span className="text-red-600">র্তা</span><span className="absolute -top-1.5 right-1 w-3.5 h-3.5 bg-red-600 rounded-full"></span></span>
              </h1>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest mt-1">
                সত্য ও বস্তুনিষ্ঠ সংবাদের নির্ভীক জাতীয় দৈনিক
              </p>
            </div>

            {/* Page Title & Section Header */}
            <div className="bg-slate-900 text-white px-3 py-1 text-xs font-bold flex justify-between items-center mb-5 rounded-xs">
              <span>{currentPage.title}</span>
              <span>পৃষ্ঠা নং: {currentPage.pageNumber}</span>
            </div>

            {/* Lead Broadsheet Article Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Main Column (2 cols) */}
              <div className="md:col-span-2 space-y-4">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 leading-tight font-serif-bangla">
                  {currentPage.leadHeadline}
                </h2>

                <div className="rounded overflow-hidden border border-slate-200">
                  <img
                    src={currentPage.previewUrl}
                    alt={currentPage.leadHeadline}
                    className="w-full h-56 object-cover"
                  />
                  <div className="bg-slate-100 p-2 text-[11px] text-slate-600 italic">
                    বিশেষ প্রতিবেদন ও আলোকচিত্র — দেশবার্তা প্রকাশনা
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-3 font-serif-bangla columns-1 sm:columns-2 gap-4">
                  <p>
                    রাজধানী ঢাকাসহ দেশের প্রধান শহরগুলোতে নাগরিক জীবন, অর্থনৈতিক গতিশীলতা ও প্রশাসনিক স্বচ্ছতা নিশ্চিত করতে শুরু হয়েছে সমন্বিত উদ্যোগ। সরকারি ও বেসরকারি খাতের অংশীদারিত্বে নতুন নীতিমালার আলোকে স্বাস্থ্য, শিক্ষা ও সেবা খাতে যুগান্তকারী পরিবর্তনের রূপরেখা প্রণীত হচ্ছে।
                  </p>
                  <p>
                    বিশেষজ্ঞরা বলছেন, আইনের সঠিক প্রয়োগ এবং নাগরিক সচেতনতা নিশ্চিত করা গেলে অনিয়ম ও দুর্নীতির লাগাম টেনে ধরা সম্ভব হবে। দেশবার্তা টিম মাঠপর্যায়ের অনুসন্ধান থেকে নিয়মিত তথ্য তুলে ধরছে।
                  </p>
                </div>
              </div>

              {/* Sidebar Column (1 col) */}
              <div className="border-t md:border-t-0 md:border-l border-slate-300 md:pl-5 space-y-5">
                <h3 className="font-bold text-xs uppercase tracking-wider text-red-600 border-b border-red-200 pb-1">
                  এই পাতার অন্যান্য গুরুত্বপূর্ণ সংবাদ
                </h3>

                {currentPage.subHeadlines.map((head, idx) => (
                  <div key={idx} className="pb-3 border-b border-slate-200">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug hover:text-red-600">
                      • {head}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                      প্রতিবেদক দল কর্তৃক মাঠপর্যায়ে অনুসন্ধান শেষে সংগৃহীত পূর্ণাঙ্গ বিবরণ ও বিশ্লেষণ।
                    </p>
                  </div>
                ))}

                {/* Newspaper Classified / Ad Placeholder */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded text-center">
                  <span className="text-[10px] font-bold text-amber-800 uppercase block mb-1">
                    বিজ্ঞাপন ও নোটিশ
                  </span>
                  <p className="text-[11px] text-slate-700 font-medium">
                    ই-পেপারে বিজ্ঞাপন প্রচার ও ক্লাসিফায়েড সেবার জন্য যোগাযোগ করুন: 01700-000000
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Footer Info of Newspaper */}
            <div className="border-t-2 border-slate-900 mt-8 pt-3 flex justify-between text-[10px] text-slate-500 font-medium">
              <span>মুদ্রণ ও প্রকাশনা: দেশবার্তা প্রেস, তেজগাঁও শিল্প এলাকা, ঢাকা</span>
              <span>www.deshbarta.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Page Thumbnails Strip */}
        <div className="bg-slate-950 p-2 border-t border-slate-800 flex items-center justify-center gap-2 overflow-x-auto shrink-0">
          {EPAPER_PAGES.map((page, idx) => (
            <button
              key={page.pageNumber}
              type="button"
              onClick={() => setCurrentPageIndex(idx)}
              className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                currentPageIndex === idx
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              পৃষ্ঠা {page.pageNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
