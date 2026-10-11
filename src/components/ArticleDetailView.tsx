import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Eye, 
  Bookmark, 
  Share2, 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  ThumbsUp, 
  Send, 
  Copy, 
  Check, 
  Facebook, 
  Twitter 
} from 'lucide-react';
import { Article, Comment } from '../types';

interface ArticleDetailViewProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  relatedArticles: Article[];
  isSaved: boolean;
  onToggleSave: (article: Article) => void;
  comments: Comment[];
  onAddComment: (articleId: string, author: string, content: string) => void;
  onLikeComment: (commentId: string) => void;
}

export const ArticleDetailView: React.FC<ArticleDetailViewProps> = ({
  article,
  onBack,
  onSelectArticle,
  relatedArticles,
  isSaved,
  onToggleSave,
  comments,
  onAddComment,
  onLikeComment,
}) => {
  const [articleFontSize, setArticleFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isPlayingSpeech, setIsPlayingSpeech] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  // Web Speech API for reading the article out loud in Bengali
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('আপনার ব্রাউজার টেক্সট-টু-স্পিচ সমর্থন করে না।');
      return;
    }

    if (isPlayingSpeech) {
      window.speechSynthesis.cancel();
      setIsPlayingSpeech(false);
    } else {
      const fullText = `${article.title}। ${article.excerpt}। ${article.content.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.lang = 'bn-BD';
      utterance.rate = 0.95;

      utterance.onend = () => setIsPlayingSpeech(false);
      utterance.onerror = () => setIsPlayingSpeech(false);

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
      setIsPlayingSpeech(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    onAddComment(article.id, newCommentName.trim() || 'পাঠক', newCommentText.trim());
    setNewCommentText('');
  };

  const articleComments = comments.filter((c) => c.articleId === article.id);

  const getFontSizeClass = () => {
    if (articleFontSize === 'large') return 'text-base sm:text-lg leading-relaxed';
    if (articleFontSize === 'xlarge') return 'text-lg sm:text-xl leading-loose';
    return 'text-sm sm:text-base leading-relaxed';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 sm:py-8">
      {/* Back to Home Button & Breadcrumbs */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-slate-200">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-red-600 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>মূল পাতায় ফিরে যান</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium truncate">
          <span>হোম</span>
          <span>/</span>
          <span className="text-red-600 font-semibold">{article.category}</span>
          <span>/</span>
          <span className="truncate max-w-[200px]">{article.title}</span>
        </div>
      </div>

      {/* Article Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          {article.isBreaking && (
            <span className="bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-2xs">
              ব্রেকিং নিউজ
            </span>
          )}
          <span 
            className="text-white text-[11px] font-bold px-2.5 py-0.5 rounded shadow-2xs"
            style={{ backgroundColor: article.categoryColor || '#dc2626' }}
          >
            {article.category}
          </span>
          <span className="text-slate-400 text-xs">•</span>
          <span className="text-xs text-slate-500 font-medium">{article.readTime}</span>
        </div>

        {/* Big Headline */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 leading-snug sm:leading-tight mb-4">
          {article.title}
        </h1>

        {/* Excerpt Lead */}
        <p className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed border-l-4 border-red-600 pl-4 py-1 mb-6 bg-red-50/40 rounded-r-lg">
          {article.excerpt}
        </p>

        {/* Author & Publishing Meta Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-slate-200 text-xs sm:text-sm text-slate-600">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-bold text-slate-900">
              প্রতিবেদক: <span className="text-red-600">{article.author}</span>
            </span>
            <span>প্রকাশ: {article.publishedAt}</span>
            <span className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              {article.timeAgo}
            </span>
            {article.views && (
              <span className="flex items-center gap-1 text-slate-500">
                <Eye className="w-3.5 h-3.5" />
                {article.views}
              </span>
            )}
          </div>

          {/* Reading Toolbar (Font Size, Audio Read, Bookmark, Share) */}
          <div className="flex items-center gap-2">
            {/* Font scale buttons */}
            <div className="flex items-center bg-slate-100 rounded p-0.5 text-xs font-semibold text-slate-700">
              <button
                type="button"
                onClick={() => setArticleFontSize('normal')}
                className={`px-2 py-1 rounded transition-colors ${articleFontSize === 'normal' ? 'bg-white shadow-2xs font-bold' : ''}`}
                title="সাধারণ ফন্ট"
              >
                অ
              </button>
              <button
                type="button"
                onClick={() => setArticleFontSize('large')}
                className={`px-2 py-1 rounded transition-colors ${articleFontSize === 'large' ? 'bg-white shadow-2xs font-bold' : ''}`}
                title="বড় ফন্ট"
              >
                অ+
              </button>
              <button
                type="button"
                onClick={() => setArticleFontSize('xlarge')}
                className={`px-2 py-1 rounded transition-colors ${articleFontSize === 'xlarge' ? 'bg-white shadow-2xs font-bold' : ''}`}
                title="অনেক বড় ফন্ট"
              >
                অ++
              </button>
            </div>

            {/* Audio Read-Aloud Button */}
            <button
              type="button"
              onClick={handleToggleSpeech}
              className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                isPlayingSpeech
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title="সংবাদটি অডিওতে শুনুন"
            >
              {isPlayingSpeech ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isPlayingSpeech ? 'থামুন' : 'শুনুন'}</span>
            </button>

            {/* Bookmark button */}
            <button
              type="button"
              onClick={() => onToggleSave(article)}
              className={`p-1.5 rounded-md border transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-red-600 border-red-600 text-white'
                  : 'border-slate-300 text-slate-600 hover:text-red-600 hover:bg-slate-50'
              }`}
              title={isSaved ? 'সংরক্ষিত তালিকা থেকে মুছুন' : 'সংরক্ষণ করুন'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            {/* Share / Copy Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="p-1.5 rounded-md border border-slate-300 text-slate-600 hover:text-red-600 hover:bg-slate-50 transition-colors cursor-pointer relative"
              title="লিংক কপি করুন"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Featured Photo */}
      <div className="mb-8">
        <div className="rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-auto max-h-[500px] object-cover object-center"
          />
        </div>
        {article.imageCaption && (
          <p className="text-xs text-slate-500 mt-2 italic text-center font-medium">
            ছবি: {article.imageCaption}
          </p>
        )}
      </div>

      {/* Article Body Paragraphs */}
      <div className={`space-y-5 text-slate-800 ${getFontSizeClass()} font-serif-bangla leading-relaxed border-b border-slate-200 pb-8 mb-8`}>
        {article.content.map((paragraph, index) => (
          <p key={index} className="indent-4 sm:indent-6">
            {paragraph}
          </p>
        ))}

        {/* Highlight Callout Box */}
        <div className="my-6 p-4 sm:p-5 bg-slate-50 border-l-4 border-slate-900 rounded-r-lg">
          <p className="text-xs sm:text-sm font-semibold text-slate-900 italic">
            "আইনের দৃষ্টিতে যেকোনো প্রাণীর চিকিৎসায় মানসম্মত প্রোটোকল মেনে চলা বাধ্যতামূলক। কোনো প্রতিষ্ঠানের অবহেলার কারণে রোগীর বা পোষ্য প্রাণীর ক্ষতি হলে তার দায় সংশ্লিষ্ট কর্তৃপক্ষকেই বহন করতে হবে।"
          </p>
          <span className="block text-right text-[11px] font-bold text-slate-500 mt-2">
            — দেশবার্তা লিগ্যাল অ্যান্ড হিউম্যান রাইটস ডেস্ক
          </span>
        </div>
      </div>

      {/* Tags Section */}
      <div className="mb-10">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          সম্পর্কিত বিষয়সমূহ:
        </h4>
        <div className="flex flex-wrap items-center gap-2">
          {article.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 text-xs font-medium rounded-md transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Interactive Comments Section */}
      <section className="mb-12 bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center gap-2 pb-3 mb-6 border-b border-slate-100">
          <MessageSquare className="w-5 h-5 text-red-600" />
          <h3 className="font-bold text-lg text-slate-900">
            পাঠক মন্তব্য ({articleComments.length + article.commentsCount})
          </h3>
        </div>

        {/* New Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-8 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={newCommentName}
              onChange={(e) => setNewCommentName(e.target.value)}
              placeholder="আপনার নাম (ঐচ্ছিক)"
              className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-red-500 focus:bg-white"
            />
          </div>
          <textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="আপনার সুচিন্তিত মতামত লিখুন..."
            rows={3}
            required
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-red-500 focus:bg-white resize-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-5 py-2 rounded-lg transition-colors cursor-pointer active:scale-98"
            >
              <Send className="w-3.5 h-3.5" />
              <span>মন্তব্য প্রকাশ করুন</span>
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="space-y-4">
          {articleComments.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-4">
              এখনও কোনো নতুন মন্তব্য যুক্ত হয়নি। আপনার মতামত সবার আগে জানান!
            </p>
          ) : (
            articleComments.map((comm) => (
              <div key={comm.id} className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-xs sm:text-sm text-slate-900">
                    {comm.author}
                  </span>
                  <span className="text-[11px] text-slate-400">{comm.timeAgo}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-2">
                  {comm.content}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onLikeComment(comm.id)}
                    className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${comm.userLiked ? 'text-red-600 fill-current' : ''}`} />
                    <span>{comm.likes} ভালো লেগেছে</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Related News (সম্পর্কিত খবর) */}
      <section>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 pb-2 border-b-2 border-red-600 inline-block">
          আরও পড়ুন
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedArticles.slice(0, 3).map((rel) => (
            <div
              key={rel.id}
              onClick={() => onSelectArticle(rel)}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow group cursor-pointer flex flex-col"
            >
              <div className="aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={rel.image}
                  alt={rel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-red-600 uppercase mb-1 block">
                    {rel.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                    {rel.title}
                  </h4>
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  {rel.timeAgo}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
