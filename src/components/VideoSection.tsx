import React, { useState } from 'react';
import { Play, Eye, Clock, X, Tv, Volume2 } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  duration: string;
  views: string;
  timeAgo: string;
  description: string;
}

export const VideoSection: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const videoList: VideoItem[] = [
    {
      id: 'v1',
      title: 'ক্যান্সার হাসপাতালে রেডিওথেরাপি সংকট: সরেজমিন অনুসন্ধানী প্রতিবেদন',
      category: 'স্বাস্থ্য',
      thumbnail: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
      duration: '৫:৩০',
      views: '৮৪.২ হাজার ভিউ',
      timeAgo: '৩ ঘণ্টা আগে',
      description: 'সরকারি বিশেষায়িত হাসপাতালের নষ্ট লাইন্যাক মেশিন এবং দূরদূরান্ত থেকে আসা রোগীদের দুরবস্থার প্রামাণ্য চিত্র।'
    },
    {
      id: 'v2',
      title: 'ঠাকুরগাঁও-১ আসনের নির্বাচনী মাঠ থেকে দেশবার্তা প্রতিনিধির সরাসরি বিশ্লেষণ',
      category: 'রাজনীতি',
      thumbnail: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80',
      duration: '৪:১৫',
      views: '৫৬.৭ হাজার ভিউ',
      timeAgo: '৫ ঘণ্টা আগে',
      description: 'উপনির্বাচনে ১১ দলীয় ঐক্যের গণসংযোগ ও সাধারণ ভোটারদের প্রত্যাশা নিয়ে বিস্তারিত প্রতিবেদন।'
    },
    {
      id: 'v3',
      title: 'কাপ্তাই জলবিদ্যুৎ কেন্দ্রের স্পিলওয়ে খোলা ও উৎপাদন বৃদ্ধির বিশেষ দৃশ্য',
      category: 'অর্থনীতি',
      thumbnail: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=1200&q=80',
      duration: '৩:৪৫',
      views: '৯২.১ হাজার ভিউ',
      timeAgo: '৬ ঘণ্টা আগে',
      description: 'দেশের একমাত্র জলবিদ্যুৎ প্রকল্পের আধুনিকায়ন ও বর্তমান কর্মক্ষমতার ড্রোন ভিডিও ফুটেজ।'
    },
    {
      id: 'v4',
      title: 'উপকূলীয় লবণ চাষে জলবায়ু সংকটের প্রভাব: লবণ মাঠের কান্না',
      category: 'পরিবেশ',
      thumbnail: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1200&q=80',
      duration: '৬:১২',
      views: '২৮.৪ হাজার ভিউ',
      timeAgo: '৮ ঘণ্টা আগে',
      description: 'কক্সবাজার উপকূলের লবণ চাষিদের ক্ষতির খতিয়ান ও বাজারে অস্থিরতার নেপথ্য বাস্তবতা।'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-red-600">
        <div className="flex items-center gap-2">
          <Tv className="w-6 h-6 text-red-600" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            দেশবার্তা ভিডিও সংবাদ ও প্রামাণ্যচিত্র
          </h2>
          <span className="bg-red-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-white" />
            লাইভ
          </span>
        </div>
      </div>

      {/* Featured Main Video */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div 
          onClick={() => setActiveVideo(videoList[0])}
          className="lg:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer aspect-16/9 bg-slate-900 border border-slate-800 shadow-md"
        >
          <img
            src={videoList[0].thumbnail}
            alt={videoList[0].title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 opacity-80 group-hover:opacity-90"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
            <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mb-4 shadow-xl group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>
            <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded w-fit mb-2">
              {videoList[0].category} • {videoList[0].duration}
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight mb-2">
              {videoList[0].title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
              {videoList[0].description}
            </p>
          </div>
        </div>

        {/* Live Broadcast Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded uppercase tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                সরাসরি সম্প্রচার
              </span>
              <span className="text-xs text-slate-400 font-mono">লাইভ স্টুডিও ১</span>
            </div>
            <h4 className="font-extrabold text-lg sm:text-xl text-white mb-3">
              দেশবার্তা সংবাদ বুলেটিন: আজকের দিনের শীর্ষ ঘটনাবলির সরাসরি বিশ্লেষণ
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              স্টুডিও থেকে জ্যেষ্ঠ সাংবাদিকদের সমন্বয়ে পরিচালিত লাইভ প্যানেল আলোচনা। দেশের অর্থনীতি, বিচার বিভাগ ও রাজনীতি সংক্রান্ত বিশ্লেষণ।
            </p>
          </div>

          <button
            type="button"
            onClick={() => setActiveVideo(videoList[1])}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>সরাসরি স্টুডিওতে যুক্ত হোন</span>
          </button>
        </div>
      </div>

      {/* Grid of Other Video Reports */}
      <h3 className="font-bold text-lg text-slate-900 mb-4">
        অন্যান্য ভিডিও প্রতিবেদন
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {videoList.map((vid) => (
          <div
            key={vid.id}
            onClick={() => setActiveVideo(vid)}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-16/10 bg-slate-100 overflow-hidden">
              <img
                src={vid.thumbnail}
                alt={vid.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-mono px-2 py-0.5 rounded">
                {vid.duration}
              </span>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-red-600 uppercase block mb-1">
                  {vid.category}
                </span>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                  {vid.title}
                </h4>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {vid.views}
                </span>
                <span>{vid.timeAgo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col text-white">
            <div className="p-3 sm:p-4 bg-slate-950 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2 truncate pr-4">
                <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {activeVideo.category}
                </span>
                <h4 className="font-bold text-sm sm:text-base truncate">
                  {activeVideo.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Stage Simulation */}
            <div className="relative aspect-16/9 bg-black flex items-center justify-center">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/40">
                <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center mb-4 shadow-2xl animate-pulse">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold max-w-lg mb-2">
                  ভিডিও সম্প্রচার চলছে...
                </h3>
                <p className="text-xs text-slate-300 max-w-md">
                  {activeVideo.description}
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-950 text-xs text-slate-400 flex items-center justify-between">
              <span>দেশবার্তা মাল্টিমিডিয়া নেটওয়ার্ক</span>
              <span>দৈর্ঘ্য: {activeVideo.duration} • {activeVideo.views}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
