import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Clock, 
  Bookmark, 
  Newspaper, 
  Search, 
  Sparkles, 
  Volume2, 
  ChevronRight, 
  ChevronLeft,
  X,
  Share2,
  Calendar
} from 'lucide-react';
import { BREAKING_TICKER_ITEMS, PRAYER_TIMES_LIST } from '../data/mockNews';

interface HeaderProps {
  fontSizeScale: number;
  setFontSizeScale: (scale: number | ((prev: number) => number)) => void;
  savedArticlesCount: number;
  onOpenSavedDrawer: () => void;
  onOpenEPaper: () => void;
  onOpenWeather: () => void;
  onOpenPrayerTimes: () => void;
  onOpenAIAssistant: (initialPrompt?: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  fontSizeScale,
  setFontSizeScale,
  savedArticlesCount,
  onOpenSavedDrawer,
  onOpenEPaper,
  onOpenWeather,
  onOpenPrayerTimes,
  onOpenAIAssistant,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  onGoHome,
}) => {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [isTickerPaused, setIsTickerPaused] = useState(false);

  // Auto-rotate breaking news ticker
  useEffect(() => {
    if (isTickerPaused) return;
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % BREAKING_TICKER_ITEMS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isTickerPaused]);

  const navCategories = [
    { id: 'all', label: 'সব খবর' },
    { id: 'top', label: 'শীর্ষ সংবাদ' },
    { id: 'politics', label: 'রাজনীতি' },
    { id: 'economy', label: 'অর্থনীতি' },
    { id: 'national', label: 'সারাদেশ' },
    { id: 'health', label: 'স্বাস্থ্য' },
    { id: 'crime', label: 'অপরাধ' },
    { id: 'international', label: 'আন্তর্জাতিক' },
    { id: 'sports', label: 'খেলাধুলা' },
    { id: 'technology', label: 'প্রযুক্তি' },
    { id: 'opinion', label: 'মতামত' },
    { id: 'video', label: '🔴 ভিডিও', isVideo: true },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-200">
      {/* 1. Top Utility Header Bar */}
      <div className="bg-[#f8fafc] border-b border-slate-200 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-3">
          {/* Left items: Date & Location, Weather, Prayer Time */}
          <div className="flex items-center flex-wrap gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>শনিবার, ২৮ সেপ্টেম্বর ২০২৪ • ঢাকা, বাংলাদেশ</span>
            </div>

            <button
              onClick={onOpenWeather}
              type="button"
              className="flex items-center gap-1 hover:text-amber-600 transition-colors cursor-pointer group"
              title="আবহাওয়ার বিস্তারিত দেখতে ক্লিক করুন"
            >
              <Sun className="w-3.5 h-3.5 text-amber-500 group-hover:rotate-45 transition-transform" />
              <span>৩৭° সে. রোদোজ্জ্বল</span>
            </button>

            <button
              onClick={onOpenPrayerTimes}
              type="button"
              className="flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer"
              title="আজকের পাঁচ ওয়াক্ত নামাজের সময়সূচি"
            >
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>নামাজের সময়: আসর ৪:০৫</span>
            </button>
          </div>

          {/* Right items: Font Adjusters, Saved Articles, E-Paper */}
          <div className="flex items-center gap-3">
            {/* Font size zoom buttons */}
            <div className="flex items-center bg-white border border-slate-200 rounded px-1 py-0.5 text-[11px] font-semibold text-slate-600 shadow-xs">
              <button
                type="button"
                onClick={() => setFontSizeScale((prev) => Math.max(0.85, prev - 0.05))}
                className="px-1.5 py-0.5 hover:bg-slate-100 rounded transition-colors"
                title="ফন্ট সাইজ কমান"
              >
                অ-
              </button>
              <button
                type="button"
                onClick={() => setFontSizeScale(1)}
                className="px-1.5 py-0.5 hover:bg-slate-100 rounded transition-colors"
                title="স্বাভাবিক ফন্ট"
              >
                অ
              </button>
              <button
                type="button"
                onClick={() => setFontSizeScale((prev) => Math.min(1.25, prev + 0.05))}
                className="px-1.5 py-0.5 hover:bg-slate-100 rounded transition-colors"
                title="ফন্ট সাইজ বাড়ান"
              >
                অ+
              </button>
            </div>

            {/* Saved Articles */}
            <button
              type="button"
              onClick={onOpenSavedDrawer}
              className="flex items-center gap-1 bg-white hover:bg-slate-50 border border-slate-200 px-2 py-0.5 rounded text-slate-700 transition-colors cursor-pointer"
            >
              <Bookmark className={`w-3.5 h-3.5 ${savedArticlesCount > 0 ? 'fill-red-600 text-red-600' : 'text-slate-500'}`} />
              <span>সংরক্ষিত খবর ({savedArticlesCount})</span>
            </button>

            {/* E-Paper button */}
            <button
              type="button"
              onClick={onOpenEPaper}
              className="flex items-center gap-1 bg-[#dc2626] hover:bg-[#b91c1c] text-white px-2.5 py-0.5 rounded font-medium transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Newspaper className="w-3.5 h-3.5" />
              <span>ই-পেপার</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Breaking News Ticker (জরুরি সংবাদ) */}
      <div 
        className="bg-[#fef2f2] border-b border-red-100 py-1.5 text-xs"
        onMouseEnter={() => setIsTickerPaused(true)}
        onMouseLeave={() => setIsTickerPaused(false)}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden flex-1">
            {/* Red Badge */}
            <div className="flex items-center gap-1 bg-[#dc2626] text-white px-2.5 py-0.5 rounded-full font-bold shrink-0 text-[11px] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-yellow-300 animate-ping" />
              <span>জরুরি সংবাদ</span>
            </div>

            {/* Ticker Content */}
            <div className="flex-1 truncate font-medium text-slate-800">
              <span className="inline-block transition-opacity duration-300">
                {BREAKING_TICKER_ITEMS[tickerIndex]}
              </span>
            </div>
          </div>

          {/* Time & Controls */}
          <div className="flex items-center gap-2 shrink-0 text-slate-500 text-[11px]">
            <span className="hidden sm:inline">⏱️ ৫ মিনিট আগে</span>
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                onClick={() => setTickerIndex((prev) => (prev - 1 + BREAKING_TICKER_ITEMS.length) % BREAKING_TICKER_ITEMS.length)}
                className="p-1 hover:bg-red-100 rounded text-slate-600"
                title="পূর্ববর্তী খবর"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setTickerIndex((prev) => (prev + 1) % BREAKING_TICKER_ITEMS.length)}
                className="p-1 hover:bg-red-100 rounded text-slate-600"
                title="পরবর্তী খবর"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Brand Masthead & Search & AI Assistant */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div 
          onClick={onGoHome}
          className="cursor-pointer group flex flex-col items-center md:items-start text-center md:text-left select-none"
        >
          <div className="flex items-center gap-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 group-hover:text-red-700 transition-colors">
              দেশ<span className="relative inline-block">বা<span className="text-red-600">র্তা</span><span className="absolute -top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full"></span></span>
            </h1>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5">
            সত্য ও বস্তুনিষ্ঠ সংবাদের নির্ভীক প্রতীক
          </p>
        </div>

        {/* Search Bar & AI Button */}
        <div className="flex items-center flex-wrap sm:flex-nowrap gap-3 w-full md:w-auto justify-center md:justify-end">
          {/* Search Form */}
          <form 
            onSubmit={onSearchSubmit}
            className="relative flex items-center w-full sm:w-80 md:w-96"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="সংবাদ খুঁজুন (যেমন: স্বাস্থ্য, রাজনীতি, অপরাধ)..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-3 pr-20 py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:bg-white transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-16 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-3 rounded-md text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <Search className="w-3 h-3 text-slate-600" />
              <span>অনুসন্ধান</span>
            </button>
          </form>

          {/* AI Assistant Button */}
          <button
            type="button"
            onClick={() => onOpenAIAssistant()}
            className="flex items-center gap-1.5 bg-linear-to-r from-[#991b1b] to-[#dc2626] hover:from-[#7f1d1d] hover:to-[#b91c1c] text-white px-3.5 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-95 shrink-0 group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span>এআই সংবাদ সহকারী</span>
            <span className="bg-red-950 text-amber-200 text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-wide uppercase">
              BETA
            </span>
          </button>
        </div>
      </div>

      {/* 4. Primary Category Navigation Bar */}
      <nav className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none font-semibold text-xs sm:text-sm text-slate-700 whitespace-nowrap">
            {navCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat.id);
                    }}
                    className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#dc2626] text-white font-bold shadow-xs'
                        : 'text-slate-700 hover:text-red-600 hover:bg-slate-50'
                    }`}
                  >
                    {cat.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
};
