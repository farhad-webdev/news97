import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LeadHero } from './components/LeadHero';
import { TrendingSidebar } from './components/TrendingSidebar';
import { NewsGrid } from './components/NewsGrid';
import { RightSidebar } from './components/RightSidebar';
import { Footer } from './components/Footer';
import { ArticleDetailView } from './components/ArticleDetailView';
import { AIAssistantModal } from './components/AIAssistantModal';
import { EPaperModal } from './components/EPaperModal';
import { AudioBulletinPlayer } from './components/AudioBulletinPlayer';
import { SavedArticlesDrawer } from './components/SavedArticlesDrawer';
import { WeatherModal } from './components/WeatherModal';
import { PrayerTimesModal } from './components/PrayerTimesModal';
import { VideoSection } from './components/VideoSection';
import { INITIAL_ARTICLES, INITIAL_POLL, INITIAL_COMMENTS } from './data/mockNews';
import { Article, Poll, Comment } from './types';

export default function App() {
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [fontSizeScale, setFontSizeScale] = useState<number>(1);
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>([]);
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [poll, setPoll] = useState<Poll>(INITIAL_POLL);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Drawers state
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isEPaperOpen, setIsEPaperOpen] = useState(false);
  const [isWeatherOpen, setIsWeatherOpen] = useState(false);
  const [isPrayerOpen, setIsPrayerOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string | undefined>();
  const [isPlayingAudioBulletin, setIsPlayingAudioBulletin] = useState(false);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('deshbarta_saved_articles');
      if (stored) {
        setSavedArticleIds(JSON.parse(stored));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Save bookmarks to localStorage
  const handleToggleSave = (article: Article) => {
    setSavedArticleIds((prev) => {
      let updated: string[];
      if (prev.includes(article.id)) {
        updated = prev.filter((id) => id !== article.id);
      } else {
        updated = [...prev, article.id];
      }
      try {
        localStorage.setItem('deshbarta_saved_articles', JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  const handleRemoveSaved = (articleId: string) => {
    setSavedArticleIds((prev) => {
      const updated = prev.filter((id) => id !== articleId);
      try {
        localStorage.setItem('deshbarta_saved_articles', JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  const handleClearAllSaved = () => {
    setSavedArticleIds([]);
    try {
      localStorage.removeItem('deshbarta_saved_articles');
    } catch (e) {
      // ignore
    }
  };

  // Poll voting
  const handleVotePoll = (optionId: string) => {
    setPoll((prev) => {
      const total = prev.totalVotes + 1;
      const updatedOptions = prev.options.map((opt) => {
        const isTarget = opt.id === optionId;
        const newVotes = isTarget ? opt.votes + 1 : opt.votes;
        const newPct = Math.round((newVotes / total) * 100);
        return {
          ...opt,
          votes: newVotes,
          percentage: newPct,
        };
      });

      return {
        ...prev,
        options: updatedOptions,
        totalVotes: total,
        userVotedOptionId: optionId,
      };
    });
  };

  // Comments
  const handleAddComment = (articleId: string, author: string, content: string) => {
    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      articleId,
      author,
      content,
      timeAgo: 'এইমাত্র',
      likes: 1,
      userLiked: true,
    };
    setComments((prev) => [newComment, ...prev]);
  };

  const handleLikeComment = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          const liked = !c.userLiked;
          return {
            ...c,
            likes: liked ? c.likes + 1 : Math.max(0, c.likes - 1),
            userLiked: liked,
          };
        }
        return c;
      })
    );
  };

  // AI Assistant trigger
  const handleOpenAIAssistant = (initialPrompt?: string) => {
    setAiInitialPrompt(initialPrompt);
    setIsAIAssistantOpen(true);
  };

  // Search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSelectedArticle(null);
    setActiveCategory('all');
  };

  // Filter articles based on active category & search query
  const getFilteredArticles = () => {
    return articles.filter((art) => {
      // Category filter
      if (activeCategory !== 'all' && activeCategory !== 'top' && activeCategory !== 'video') {
        if (art.categorySlug !== activeCategory) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = art.title.toLowerCase().includes(q);
        const matchesExcerpt = art.excerpt.toLowerCase().includes(q);
        const matchesCategory = art.category.toLowerCase().includes(q);
        const matchesTag = art.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesExcerpt && !matchesCategory && !matchesTag) {
          return false;
        }
      }

      return true;
    });
  };

  const leadArticle = articles.find((a) => a.isLead) || articles[0];
  const trendingArticles = articles.filter((a) => a.isTrending);
  const gridArticles = getFilteredArticles().filter((a) => a.id !== leadArticle.id);
  const savedArticles = articles.filter((a) => savedArticleIds.includes(a.id));

  return (
    <div 
      className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 selection:bg-red-600 selection:text-white"
      style={{ fontSize: `${fontSizeScale * 100}%` }}
    >
      {/* 1. Complete Header */}
      <Header
        fontSizeScale={fontSizeScale}
        setFontSizeScale={setFontSizeScale}
        savedArticlesCount={savedArticleIds.length}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        onOpenEPaper={() => setIsEPaperOpen(true)}
        onOpenWeather={() => setIsWeatherOpen(true)}
        onOpenPrayerTimes={() => setIsPrayerOpen(true)}
        onOpenAIAssistant={handleOpenAIAssistant}
        activeCategory={activeCategory}
        setActiveCategory={(cat) => {
          setActiveCategory(cat);
          setSelectedArticle(null);
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
        onGoHome={() => {
          setSelectedArticle(null);
          setActiveCategory('all');
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {selectedArticle ? (
          /* View 1: Detailed Article Reading Screen */
          <ArticleDetailView
            article={selectedArticle}
            onBack={() => {
              setSelectedArticle(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectArticle={(art) => {
              setSelectedArticle(art);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            relatedArticles={articles.filter((a) => a.id !== selectedArticle.id)}
            isSaved={savedArticleIds.includes(selectedArticle.id)}
            onToggleSave={handleToggleSave}
            comments={comments}
            onAddComment={handleAddComment}
            onLikeComment={handleLikeComment}
          />
        ) : activeCategory === 'video' ? (
          /* View 2: Video Section */
          <VideoSection />
        ) : (
          /* View 3: Homepage Exact Layout from Image 1.png */
          <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-8">
            {/* Search result indicator if search query is active */}
            {searchQuery && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs sm:text-sm text-amber-900 flex items-center justify-between">
                <span>
                  অনুসন্ধান ফলাফল: <strong>"{searchQuery}"</strong> ({gridArticles.length}টি সংবাদ পাওয়া গেছে)
                </span>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="font-bold text-red-600 hover:underline cursor-pointer"
                >
                  সব খবর দেখুন
                </button>
              </div>
            )}

            {/* Top Section: Lead Story (Hero) & Trending Today Sidebar */}
            {!searchQuery && activeCategory === 'all' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Left: Lead Story (approx 65% width) */}
                <div className="lg:col-span-8 flex">
                  <LeadHero
                    article={leadArticle}
                    onSelectArticle={(art) => {
                      setSelectedArticle(art);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    isSaved={savedArticleIds.includes(leadArticle.id)}
                    onToggleSave={handleToggleSave}
                  />
                </div>

                {/* Right: Trending Stories Sidebar (approx 35% width) */}
                <div className="lg:col-span-4 flex">
                  <TrendingSidebar
                    articles={trendingArticles}
                    onSelectArticle={(art) => {
                      setSelectedArticle(art);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onPlayAudioBulletin={() => setIsPlayingAudioBulletin(true)}
                    isPlayingAudio={isPlayingAudioBulletin}
                  />
                </div>
              </div>
            )}

            {/* Bottom Section: তাজা সংবাদ ও বিশেষ প্রতিবেদন Grid + Right Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Main Content Column (approx 65-70% width) */}
              <div className="lg:col-span-8">
                <NewsGrid
                  articles={gridArticles}
                  onSelectArticle={(art) => {
                    setSelectedArticle(art);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  savedArticleIds={savedArticleIds}
                  onToggleSave={handleToggleSave}
                />
              </div>

              {/* Right Sidebar Column (approx 30-35% width) */}
              <div className="lg:col-span-4">
                <RightSidebar
                  articles={articles}
                  onSelectArticle={(art) => {
                    setSelectedArticle(art);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onOpenAIAssistant={handleOpenAIAssistant}
                  poll={poll}
                  onVotePoll={handleVotePoll}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onCategoryClick={(slug) => {
          setActiveCategory(slug);
          setSelectedArticle(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onGoHome={() => {
          setSelectedArticle(null);
          setActiveCategory('all');
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Floating Audio Bulletin Player */}
      <AudioBulletinPlayer
        isOpen={isPlayingAudioBulletin}
        onClose={() => setIsPlayingAudioBulletin(false)}
      />

      {/* Saved News Drawer */}
      <SavedArticlesDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedArticles={savedArticles}
        onSelectArticle={(art) => {
          setSelectedArticle(art);
          setIsSavedDrawerOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onRemoveSaved={handleRemoveSaved}
        onClearAll={handleClearAllSaved}
      />

      {/* E-Paper Modal */}
      <EPaperModal
        isOpen={isEPaperOpen}
        onClose={() => setIsEPaperOpen(false)}
      />

      {/* Weather Modal */}
      <WeatherModal
        isOpen={isWeatherOpen}
        onClose={() => setIsWeatherOpen(false)}
      />

      {/* Prayer Times Modal */}
      <PrayerTimesModal
        isOpen={isPrayerOpen}
        onClose={() => setIsPrayerOpen(false)}
      />

      {/* Deshbarta AI News Assistant & Fact-Checker Modal */}
      <AIAssistantModal
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
        initialPrompt={aiInitialPrompt}
      />
    </div>
  );
}
