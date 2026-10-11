import React from 'react';
import { Clock, Play, Volume2 } from 'lucide-react';
import { Article } from '../types';

interface TrendingSidebarProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onPlayAudioBulletin: () => void;
  isPlayingAudio: boolean;
}

export const TrendingSidebar: React.FC<TrendingSidebarProps> = ({
  articles,
  onSelectArticle,
  onPlayAudioBulletin,
  isPlayingAudio,
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
          <h3 className="font-bold text-base sm:text-lg text-slate-900">
            আজকের আলোচিত
          </h3>
        </div>
        <button
          type="button"
          onClick={() => {
            if (articles.length > 0) onSelectArticle(articles[0]);
          }}
          className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors cursor-pointer"
        >
          সব দেখুন
        </button>
      </div>

      {/* List of Trending Stories */}
      <div className="divide-y divide-slate-100 flex-1">
        {articles.slice(0, 3).map((article, idx) => {
          const bengaliDigits = ['১', '২', '৩'];
          return (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="p-3.5 sm:p-4 hover:bg-slate-50 transition-colors cursor-pointer group flex items-start gap-3"
            >
              {/* Rank Badge */}
              <div className="w-6 h-6 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                {bengaliDigits[idx] || (idx + 1)}
              </div>

              {/* Thumbnail */}
              <div className="w-20 h-16 sm:w-24 sm:h-18 rounded-md overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-bold uppercase mb-1" style={{ color: article.categoryColor || '#dc2626' }}>
                  {article.category}
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h4>
                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1.5 font-medium">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{article.timeAgo}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Audio Bulletin Bar */}
      <div className="p-3 bg-red-50/70 border-t border-red-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-800">
          <span className="text-amber-500">⚡</span>
          <span>আজকের অডিও বুলেটিন</span>
        </div>

        <button
          type="button"
          onClick={onPlayAudioBulletin}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold transition-all shadow-xs cursor-pointer ${
            isPlayingAudio
              ? 'bg-red-700 text-white animate-pulse'
              : 'bg-red-600 hover:bg-red-700 text-white hover:shadow'
          }`}
        >
          {isPlayingAudio ? (
            <Volume2 className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current" />
          )}
          <span>{isPlayingAudio ? 'চলছে...' : 'শুনুন (৩ মি.)'}</span>
        </button>
      </div>
    </div>
  );
};
