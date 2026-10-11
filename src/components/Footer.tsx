import React from 'react';
import { Facebook, Twitter, Youtube, Linkedin, Smartphone, ArrowUp } from 'lucide-react';

interface FooterProps {
  onCategoryClick: (categorySlug: string) => void;
  onGoHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onCategoryClick, onGoHome }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b1120] text-slate-300 border-t border-slate-800">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Column 1: Brand & Bio (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={onGoHome}
              className="cursor-pointer inline-block select-none"
            >
              <h2 className="text-3xl font-extrabold tracking-tight text-white">
                দেশ<span className="relative inline-block">বা<span className="text-red-600">র্তা</span><span className="absolute -top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full"></span></span>
              </h2>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              বাংলাদেশের বিশ্বস্ত ও নির্ভরযোগ্য সংবাদের বিশ্বস্ত ঠিকানা। রাজনৈতিক বিশ্লেষণ, অর্থনীতি, সমসাময়িক সংকট ও প্রাসঙ্গিক জীবনের বস্তুনিষ্ঠ সাংবাদিকতায় আমরা অঙ্গীকারবদ্ধ।
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#linkedin"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: বিভাগসমূহ */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-2">
              বিভাগসমূহ
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onCategoryClick('politics')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  জাতীয় ও রাজনীতি
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onCategoryClick('economy')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  অর্থ ও বাণিজ্য
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onCategoryClick('international')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  আন্তর্জাতিক খবর
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onCategoryClick('crime')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  আইন ও অপরাধ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onCategoryClick('health')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  স্বাস্থ্য ও জীবনধারা
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onCategoryClick('technology')}
                  className="hover:text-red-400 transition-colors cursor-pointer"
                >
                  বিজ্ঞান ও প্রযুক্তি
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: গুরুত্বপূর্ণ লিংক */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-2">
              গুরুত্বপূর্ণ লিংক
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#about" className="hover:text-red-400 transition-colors">
                  আমাদের সম্পর্কে
                </a>
              </li>
              <li>
                <a href="#advertisement" className="hover:text-red-400 transition-colors">
                  বিজ্ঞাপন মূল্যতালিকা
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-red-400 transition-colors">
                  গোপনীয়তা নীতি
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-red-400 transition-colors">
                  ব্যবহারের শর্তাবলী
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-red-400 transition-colors">
                  যোগাযোগ ও ঠিকানা
                </a>
              </li>
              <li>
                <a href="#sitemap" className="hover:text-red-400 transition-colors">
                  সাইটম্যাপ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: মোবাইল অ্যাপস */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-red-600 pl-2">
              মোবাইল অ্যাপস
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              স্মার্টফোনে সর্বশেষ খবরের তাৎক্ষণিক নোটিফিকেশন পেতে অ্যাপ নামিয়ে নিন।
            </p>

            <div className="space-y-2.5">
              {/* Google Play Button */}
              <a
                href="#googleplay"
                className="flex items-center gap-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3.5 py-2 rounded-lg text-white transition-colors group cursor-pointer"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-wide text-slate-400 leading-none">
                    GET IT ON
                  </div>
                  <div className="text-xs font-bold leading-tight">Google Play</div>
                </div>
              </a>

              {/* App Store Button */}
              <a
                href="#appstore"
                className="flex items-center gap-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3.5 py-2 rounded-lg text-white transition-colors group cursor-pointer"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-sky-400" />
                </div>
                <div className="text-left">
                  <div className="text-[9px] uppercase tracking-wide text-slate-400 leading-none">
                    DOWNLOAD ON
                  </div>
                  <div className="text-xs font-bold leading-tight">App Store</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-800/80 bg-[#070b14] py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © ২০২৪ দেশবার্তা মিডিয়া লিমিটেড — সর্বস্বত্ব সংরক্ষিত
          </div>
          <div>
            সম্পাদক ও প্রকাশক: মো. রফিকুল হাসান | ঢাকা, বাংলাদেশ থেকে প্রকাশিত
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors p-1"
            title="পৃষ্ঠার শুরুতে যান"
          >
            <span>উপরে যান</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
