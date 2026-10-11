import React, { useState } from 'react';
import { Clock, Sparkles, Send, CheckCircle2, TrendingUp, HelpCircle } from 'lucide-react';
import { Article, Poll } from '../types';

interface RightSidebarProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onOpenAIAssistant: (initialPrompt?: string) => void;
  poll: Poll;
  onVotePoll: (optionId: string) => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  articles,
  onSelectArticle,
  onOpenAIAssistant,
  poll,
  onVotePoll,
}) => {
  const [selectedPollOption, setSelectedPollOption] = useState<string>('');
  const [pollHasVoted, setPollHasVoted] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Most read articles list
  const mostReadArticles = [
    {
      id: 'banasree-road-accident',
      rank: '১',
      title: 'বনশ্রীতে কাভার্ডভ্যানের ধাক্কায় মোটরসাইকেলের দুই আরোহী নিহত',
      time: '৩ ঘণ্টা আগে',
    },
    {
      id: 'cancer-radiotherapy-crisis',
      rank: '২',
      title: 'তীব্র মেশিন সংকটের কারণে হাজারো ক্যান্সার রোগীকে রেডিওথেরাপির জন্য অপেক্ষা',
      time: '৪ ঘণ্টা আগে',
    },
    {
      id: 'cat-legal-notice',
      rank: '৩',
      title: 'অন্তঃসত্ত্বা বিড়ালের মৃত্যু: চিকিৎসা প্রতিষ্ঠানের মালিকের ওপর ক্ষোভের আগুন',
      time: '২ ঘণ্টা আগে',
    },
    {
      id: 'kaptai-dam-project',
      rank: '৪',
      title: 'কাপ্তাই জলবিদ্যুৎ কেন্দ্রের ২০-৩০ মেগাওয়াট উৎপাদন সক্ষমতা পুনরুদ্ধারের প্রক্রিয়া শুরু',
      time: '৮ ঘণ্টা আগে',
    },
    {
      id: 'thakurgaon-by-election',
      rank: '৫',
      title: 'ঠাকুরগাঁও-১ আসনের উপনির্বাচনে ১১ দলীয় ঐক্যের নতুন কর্মসূচি ঘোষণা',
      time: '৬ ঘণ্টা আগে',
    },
  ];

  const handlePollVote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPollOption) return;
    onVotePoll(selectedPollOption);
    setPollHasVoted(true);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setNewsletterSuccess(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 4000);
  };

  return (
    <aside className="space-y-6">
      {/* 1. সর্বাধিক পঠিত (Most Read Widget) */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-slate-100 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-red-600" />
          <h3 className="font-bold text-slate-900 text-base">
            সর্বাধিক পঠিত
          </h3>
        </div>

        <div className="divide-y divide-slate-100">
          {mostReadArticles.map((item) => {
            const fullArticle = articles.find((a) => a.id === item.id);
            return (
              <div
                key={item.id}
                onClick={() => fullArticle && onSelectArticle(fullArticle)}
                className="p-3.5 hover:bg-slate-50 transition-colors cursor-pointer group flex items-start gap-3"
              >
                <span className="text-red-600 font-extrabold text-sm sm:text-base shrink-0 select-none">
                  #{item.rank}
                </span>
                <div className="flex-1">
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1 font-medium">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. দেশবার্তা কৃত্রিম বুদ্ধিমত্তা (AI Assistant Promo Card) */}
      <div className="bg-gradient-to-br from-[#1e1b4b] via-[#0f172a] to-[#020617] text-white rounded-xl p-5 shadow-sm border border-slate-800 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-600/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            দেশবার্তা কৃত্রিম বুদ্ধিমত্তা
          </span>
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <span>এআই সংবাদ বিশ্লেষণ ও ফ্যাক্টচেক</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            যেকোনো সমসাময়িক আলোচিত সংবাদের দ্রুত নিরপেক্ষ সারসংক্ষেপ, তথ্যসূত্র যাচাই কিংবা প্রাসঙ্গিক প্রেক্ষাপট জানতে প্রশ্ন করুন আমাদের এআইকে।
          </p>

          {/* Quick Prompts */}
          <div className="space-y-2 mb-4">
            <button
              type="button"
              onClick={() => onOpenAIAssistant('আজকের জ্বালানি তেলের দামের আপডেট কী?')}
              className="w-full text-left bg-white/10 hover:bg-white/15 border border-white/10 px-3 py-2 rounded-lg text-xs text-slate-200 transition-colors flex items-center justify-between group cursor-pointer"
            >
              <span className="truncate">"আজকের জ্বালানি তেলের দামের আপডেট কী?"</span>
              <span className="text-slate-400 group-hover:text-white transition-colors">↘</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenAIAssistant('উপনির্বাচনের প্রধান প্রতিদ্বন্দ্বী দলগুলো কারা?')}
              className="w-full text-left bg-white/10 hover:bg-white/15 border border-white/10 px-3 py-2 rounded-lg text-xs text-slate-200 transition-colors flex items-center justify-between group cursor-pointer"
            >
              <span className="truncate">"উপনির্বাচনের প্রধান প্রতিদ্বন্দ্বী দলগুলো কারা?"</span>
              <span className="text-slate-400 group-hover:text-white transition-colors">↘</span>
            </button>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={() => onOpenAIAssistant()}
            className="w-full bg-linear-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold py-2.5 px-4 rounded-lg text-xs sm:text-sm transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>💬 এআই চ্যাট শুরু করুন</span>
          </button>
        </div>
      </div>

      {/* 3. নিউজলেটার সাবস্ক্রাইব করুন (Newsletter Card) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs text-center">
        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <Send className="w-5 h-5 -rotate-12" />
        </div>

        <h3 className="font-bold text-base text-slate-900 mb-1.5">
          নিউজলেটার সাবস্ক্রাইব করুন
        </h3>
        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          প্রতিদিনের গুরুত্বপূর্ণ ও ব্রেকিং সংবাদগুলো সরাসরি আপনার ইমেইলে সবার আগে পেতে যুক্ত হোন।
        </p>

        {newsletterSuccess ? (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg p-3 text-xs flex items-center justify-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>ধন্যবাদ! আপনি সফলভাবে দেশবার্তা নিউজলেটারে যুক্ত হয়েছেন।</span>
          </div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="space-y-2.5">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="আপনার সচল ইমেইল ঠিকানা দিন"
              required
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:bg-white text-center"
            />
            <button
              type="submit"
              className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold py-2 px-4 rounded-lg text-xs transition-colors cursor-pointer active:scale-98"
            >
              যুক্ত হোন
            </button>
            <p className="text-[10px] text-slate-400">
              আমরা কোনো স্প্যাম পাঠাই না। যে কোনো সময় আনসাবস্ক্রাইব করা যাবে।
            </p>
          </form>
        )}
      </div>

      {/* 4. জনমত জরিপ (Opinion Poll Widget) */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-base">
            জনমত জরিপ
          </h3>
          <span className="text-[11px] font-medium text-slate-400">
            {poll.date}
          </span>
        </div>

        <p className="text-xs font-semibold text-slate-800 mb-4 leading-relaxed">
          {poll.question}
        </p>

        <form onSubmit={handlePollVote} className="space-y-2.5">
          {poll.options.map((option) => {
            const isSelected = selectedPollOption === option.id;
            return (
              <label
                key={option.id}
                className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                  isSelected
                    ? 'border-red-600 bg-red-50/50 text-slate-900 font-semibold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="opinionPoll"
                    value={option.id}
                    checked={isSelected}
                    onChange={() => setSelectedPollOption(option.id)}
                    className="accent-red-600 cursor-pointer"
                  />
                  <span>{option.text}</span>
                </div>
                <span className="text-slate-500 font-medium">
                  ({option.percentage}%)
                </span>
              </label>
            );
          })}

          <button
            type="submit"
            disabled={!selectedPollOption}
            className="w-full mt-3 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-2 rounded-lg text-xs transition-colors cursor-pointer disabled:cursor-not-allowed"
          >
            {pollHasVoted ? 'ভোট সম্পন্ন হয়েছে ✓' : 'ভোট দিন'}
          </button>
        </form>
      </div>
    </aside>
  );
};
