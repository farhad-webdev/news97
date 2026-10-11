import React from 'react';
import { X, Clock, Compass, Bell } from 'lucide-react';
import { PRAYER_TIMES_LIST } from '../data/mockNews';

interface PrayerTimesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrayerTimesModal: React.FC<PrayerTimesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-emerald-700 to-teal-800 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Clock className="w-6 h-6 text-emerald-200" />
            <div>
              <h3 className="font-extrabold text-base sm:text-lg leading-tight">
                নামাজের সময়সূচি
              </h3>
              <p className="text-xs text-emerald-100">
                ঢাকা ও পার্শ্ববর্তী এলাকা • ইসলামিক ফাউন্ডেশন বাংলাদেশ
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Waqt Highlight */}
        <div className="p-4 bg-emerald-50 border-b border-emerald-100 text-center">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
            বর্তমান ওয়াক্ত
          </span>
          <div className="text-2xl font-black text-emerald-950">
            আসর — ৪:০৫ বিকেল
          </div>
          <span className="text-xs text-emerald-700 font-medium">
            পরবর্তী ওয়াক্ত: মাগরিব (৫:৫১ সন্ধ্যা)
          </span>
        </div>

        {/* 5 Prayers List */}
        <div className="p-4 sm:p-5 divide-y divide-slate-100 space-y-1">
          {PRAYER_TIMES_LIST.map((waqt) => (
            <div
              key={waqt.id}
              className={`py-3 px-3 rounded-lg flex items-center justify-between transition-colors ${
                waqt.isCurrent
                  ? 'bg-emerald-50/80 font-bold text-emerald-900 border border-emerald-200'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-2.5 h-2.5 rounded-full ${waqt.isCurrent ? 'bg-emerald-600 animate-ping' : 'bg-slate-300'}`} />
                <span className="text-sm font-semibold">{waqt.bengaliName}</span>
              </div>
              <span className={`text-sm ${waqt.isCurrent ? 'font-black text-emerald-700' : 'font-medium text-slate-600'}`}>
                {waqt.time}
              </span>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
          * ভৌগোলিক দূরত্বের কারণে অন্যান্য জেলার ক্ষেত্রে ১ থেকে ৭ মিনিট পর্যন্ত সময়ের তারতম্য হতে পারে।
        </div>
      </div>
    </div>
  );
};
