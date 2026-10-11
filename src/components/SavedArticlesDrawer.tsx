import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, Clock } from 'lucide-react';
import { Article } from '../types';

interface SavedArticlesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveSaved: (articleId: string) => void;
  onClearAll: () => void;
}

export const SavedArticlesDrawer: React.FC<SavedArticlesDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveSaved,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-red-600 fill-current" />
              <h3 className="font-bold text-base sm:text-lg text-slate-900">
                সংরক্ষিত খবর ({savedArticles.length})
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {savedArticles.length > 0 && (
                <button
                  type="button"
                  onClick={onClearAll}
                  className="text-xs text-slate-500 hover:text-red-600 transition-colors cursor-pointer mr-1"
                >
                  সব মুছুন
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {savedArticles.length === 0 ? (
              <div className="py-16 text-center text-slate-400 space-y-3">
                <Bookmark className="w-12 h-12 mx-auto stroke-1 text-slate-300" />
                <p className="text-sm font-semibold text-slate-600">
                  আপনার সংরক্ষণ তালিকা বর্তমানে খালি
                </p>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  যেকোনো সংবাদের বুকমার্ক আইকনে ক্লিক করে পরে পড়ার জন্য এখানে সংরক্ষণ করুন।
                </p>
              </div>
            ) : (
              savedArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs hover:shadow-sm transition-all group flex gap-3"
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-20 h-16 rounded-md object-cover bg-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span 
                      className="text-[10px] font-bold uppercase block mb-1"
                      style={{ color: article.categoryColor || '#dc2626' }}
                    >
                      {article.category}
                    </span>
                    <h4 
                      onClick={() => {
                        onSelectArticle(article);
                        onClose();
                      }}
                      className="text-xs sm:text-sm font-bold text-slate-900 hover:text-red-600 transition-colors line-clamp-2 cursor-pointer leading-snug"
                    >
                      {article.title}
                    </h4>
                    <div className="flex items-center justify-between mt-2 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.timeAgo}
                      </span>
                      <button
                        type="button"
                        onClick={() => onRemoveSaved(article.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                        title="তালিকা থেকে মুছুন"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
