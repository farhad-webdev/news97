import React from 'react';
import { Bookmark, Clock, Eye, Edit3, ArrowRight, Check } from 'lucide-react';
import { Article } from '../types';

interface LeadHeroProps {
  article: Article;
  onSelectArticle: (article: Article) => void;
  isSaved: boolean;
  onToggleSave: (article: Article) => void;
}

export const LeadHero: React.FC<LeadHeroProps> = ({
  article,
  onSelectArticle,
  isSaved,
  onToggleSave,
}) => {
  return (
    <article className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow group flex flex-col justify-between">
      {/* Top Media & Badges Container */}
      <div className="relative">
        {/* Badges on image */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          <span className="bg-[#dc2626] text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            সর্বশেষ সংবাদ
          </span>
          <span className="bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded shadow-xs">
            {article.category}
          </span>
        </div>

        {/* Bookmark Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(article);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-sm transition-all shadow-xs cursor-pointer ${
            isSaved
              ? 'bg-red-600 text-white'
              : 'bg-white/90 text-slate-700 hover:bg-white hover:text-red-600'
          }`}
          title={isSaved ? 'সংরক্ষণ তালিকা থেকে সরান' : 'পরে পড়ার জন্য সংরক্ষণ করুন'}
        >
          <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Hero Image */}
        <div 
          onClick={() => onSelectArticle(article)}
          className="relative w-full aspect-16/9 sm:aspect-16/10 overflow-hidden cursor-pointer bg-slate-100"
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
            loading="eager"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Hero Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mb-2.5 font-medium">
            <span className="flex items-center gap-1 text-red-700 font-semibold">
              <Edit3 className="w-3.5 h-3.5" />
              {article.author}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {article.timeAgo}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-slate-400" />
              {article.views}
            </span>
          </div>

          {/* Headline */}
          <h2
            onClick={() => onSelectArticle(article)}
            className="text-xl sm:text-2xl lg:text-[26px] font-bold text-slate-900 leading-snug hover:text-red-600 transition-colors cursor-pointer mb-3"
          >
            {article.title}
          </h2>

          {/* Summary */}
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
            {article.excerpt}
          </p>
        </div>

        {/* Bottom Tags & Read Link */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5">
            {article.tags.slice(0, 2).map((tag, idx) => (
              <span
                key={idx}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Link */}
          <button
            type="button"
            onClick={() => onSelectArticle(article)}
            className="flex items-center gap-1 text-red-600 hover:text-red-700 font-bold text-xs sm:text-sm group-hover:translate-x-1 transition-all cursor-pointer"
          >
            <span>বিস্তারিত পড়ুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
