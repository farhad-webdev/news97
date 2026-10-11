import React, { useState } from 'react';
import { X, Sun, CloudRain, Wind, Droplets, Compass } from 'lucide-react';
import { CITIES_WEATHER } from '../data/mockNews';

interface WeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WeatherModal: React.FC<WeatherModalProps> = ({ isOpen, onClose }) => {
  const [selectedCityIndex, setSelectedCityIndex] = useState(0);

  if (!isOpen) return null;

  const current = CITIES_WEATHER[selectedCityIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-amber-500 to-orange-600 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Sun className="w-6 h-6 animate-spin [animation-duration:15s]" />
            <div>
              <h3 className="font-extrabold text-base sm:text-lg leading-tight">
                সারাদেশের আবহাওয়া বুলেটিন
              </h3>
              <p className="text-xs text-amber-100">
                বাংলাদেশ আবহাওয়া অধিদপ্তর সূত্রে সর্বশেষ আপডেট
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

        {/* Division Selector Tabs */}
        <div className="p-3 bg-slate-100 flex items-center gap-1.5 overflow-x-auto scrollbar-none border-b border-slate-200">
          {CITIES_WEATHER.map((city, idx) => (
            <button
              key={city.city}
              type="button"
              onClick={() => setSelectedCityIndex(idx)}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCityIndex === idx
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200'
              }`}
            >
              {city.bengaliCity}
            </button>
          ))}
        </div>

        {/* Main Weather Display */}
        <div className="p-6 text-center">
          <div className="inline-block p-4 rounded-full bg-amber-50 mb-3">
            <Sun className="w-14 h-14 text-amber-500 mx-auto" />
          </div>
          <div className="text-4xl sm:text-5xl font-black text-slate-900 mb-1">
            {current.temp}° সে.
          </div>
          <p className="text-base font-bold text-slate-700 mb-1">
            {current.conditionBengali}
          </p>
          <p className="text-xs text-slate-400">
            সর্বোচ্চ: {current.high}° সে. • সর্বনিম্ন: {current.low}° সে.
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-slate-100">
            <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-3 text-left">
              <Droplets className="w-5 h-5 text-sky-500" />
              <div>
                <span className="text-[11px] text-slate-400 block">আর্দ্রতা</span>
                <span className="text-sm font-bold text-slate-800">{current.humidity}%</span>
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-3 text-left">
              <Wind className="w-5 h-5 text-teal-500" />
              <div>
                <span className="text-[11px] text-slate-400 block">বাতাসের গতি</span>
                <span className="text-sm font-bold text-slate-800">{current.windSpeed} কিমি/ঘণ্টা</span>
              </div>
            </div>
          </div>
        </div>

        {/* Advisory */}
        <div className="p-3.5 bg-amber-50/60 border-t border-amber-100 text-center text-xs text-amber-900 font-medium">
          ☀️ তীব্র তাপদাহ ও রোদ থেকে বাঁচতে পর্যাপ্ত পানি পান করুন এবং ছাতা ব্যবহার করুন।
        </div>
      </div>
    </div>
  );
};
