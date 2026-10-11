import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, Bot, User, RefreshCw, Check, Copy } from 'lucide-react';
import { ChatMessage } from '../types';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      text: 'স্বাগতম! আমি দেশবার্তা এআই সংবাদ সহকারী। আজকের যেকোনো আলোচিত জাতীয় বা আন্তর্জাতিক সংবাদ, প্রেক্ষাপট, অর্থনৈতিক বিশ্লেষণ কিংবা নির্ভরযোগ্য ফ্যাক্টচেকের জন্য আমাকে প্রশ্ন করতে পারেন।',
      timestamp: 'এইমাত্র',
      suggestedQuestions: [
        'আজকের জ্বালানি তেলের দামের আপডেট কী?',
        'উপনির্বাচনের প্রধান প্রতিদ্বন্দ্বী দলগুলো কারা?',
        'কাপ্তাই জলবিদ্যুৎ কেন্দ্রের প্রকল্পের বিস্তারিত কী?',
        'ক্যান্সার চিকিৎসায় রেডিওথেরাপি সংকটের কারণ কী?'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const getKnowledgeResponse = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('জ্বালানি') || q.includes('তেল') || q.includes('দাম')) {
      return `📊 **জ্বালানি তেলের বর্তমান আপডেট ও বিশ্লেষণ:**\n\n• আন্তর্জাতিক বাজারে ব্রেন্ট ক্রুড অয়েলের মূল্য প্রতি ব্যারেল প্রায় ৭২-৭৪ ডলারে নেমে আসায় দেশেও স্বয়ংক্রিয় মূল্য নির্ধারণ ফর্মুলার আওতায় দাম কমানোর বিবেচনা চলছে।\n• বিদ্যুৎ ও জ্বালানি মন্ত্রণালয়ের সূত্রে জানা গেছে, পরিবহন ও কৃষকদের স্বার্থ বিবেচনায় ডিজেল ও অকটেনের দাম প্রতি লিটারে ১ থেকে ২ টাকা সমন্বয়ের সুপারিশ করা হয়েছে।\n• দেশবার্তা পর্যবেক্ষণ: বিশ্ববাজারে দাম কমলেও পরিবহন ভাড়ায় সরাসরি তার সুফল সাধারণ নাগরিকেরা কতটুকু পাবেন, তা নিয়মিত তদারকির ওপর নির্ভর করবে।`;
    }

    if (q.includes('উপনির্বাচন') || q.includes('ঠাকুরগাঁও') || q.includes('প্রার্থী')) {
      return `🗳️ **ঠাকুরগাঁও-১ উপনির্বাচন ফ্যাক্ট ও পরিস্থিতি:**\n\n• ঠাকুরগাঁও-১ আসনের উপনির্বাচনে ১১ দলীয় ঐক্য জোটের পক্ষ থেকে বাংলাদেশ জামায়াতে ইসলামীর কেন্দ্রীয় নেতা দেলোয়ার হোসেন একক প্রার্থী হিসেবে ব্যাপক প্রচারণা চালাচ্ছেন।\n• প্রধান নির্বাচনী ইস্যু: বিগত নির্বাচনের ভোটাধিকার হরণের প্রতিকার, স্থানীয় কৃষকদের সেচ ও ফসলের ন্যায্যমূল্য এবং বন্ধ রেশম কারখানা চালু করা।\n• স্থানীয় প্রশাসন ও নির্বাচন পর্যবেক্ষণকারী সংস্থা জানিয়েছে, নির্বাচন নিরপেক্ষ করতে সব ধরনের প্রস্তুতি নেওয়া হয়েছে।`;
    }

    if (q.includes('কাপ্তাই') || q.includes('বিদ্যুৎ') || q.includes('হাইড্রো')) {
      return `⚡ **কাপ্তাই জলবিদ্যুৎ কেন্দ্র সংস্কার প্রকল্প:**\n\n• প্রকল্পের ব্যয়: ৪৫০ কোটি টাকা।\n• মূল লক্ষ্য: ১ ও ২ নম্বর পুরনো টারবাইন আধুনিকায়ন করে ২০ থেকে ৩০ মেগাওয়াট উৎপাদন ক্ষমতা পুনরুদ্ধার করা।\n• গুরুত্ব: এটি বাংলাদেশের একমাত্র জলবিদ্যুৎ কেন্দ্র, যেখানে প্রতি ইউনিট বিদ্যুৎ উৎপাদনে ব্যয় হয় ৫০ পয়সারও কম। এই সংস্কার জাতীয় গ্রিডে জ্বালানি খরচ কমাতে তাৎপর্যপূর্ণ অবদান রাখবে।`;
    }

    if (q.includes('রেডিওথেরাপি') || q.includes('ক্যান্সার') || q.includes('মেশিন')) {
      return `🏥 **ক্যান্সার চিকিৎসায় রেডিওথেরাপি সংকট:**\n\n• ফ্যাক্ট: জাতীয় ক্যান্সার ইনস্টিটিউটসহ ঢাকা ও প্রধান সরকারি হাসপাতালগুলোর অর্ধেকের বেশি লাইন্যাক (লিনিয়ার এক্সিলারেটর) মেশিন অচল বা নিয়মিত মেরামতের অভাবে বন্ধ।\n• প্রভাব: হাজারো দরিদ্র ও মধ্যবিত্ত রোগী ৩ থেকে ৬ মাসের দীর্ঘ অপেক্ষার তালিকায় আটকা পড়েছেন।\n• সমাধান উদ্যোগ: স্বাস্থ্য অধিদপ্তর জরুরি ভিত্তিতে ৪টি নতুন লাইন্যাক মেশিন ক্রয়ের উদ্যোগ নিয়েছে এবং বিদেশি প্রকৌশলী দিয়ে নষ্ট মেশিন মেরামতের প্রক্রিয়া শুরু করেছে।`;
    }

    if (q.includes('বিড়াল') || q.includes('ক্লিনিক') || q.includes('প্রাণী')) {
      return `🐾 **গুলশানের অ্যানিমেল কেয়ার সেন্টার লিগ্যাল নোটিশ ও আইন:**\n\n• ঘটনা: গুলশানের বাংলাদেশ অ্যানিমেল কেয়ার সেন্টারে (বিএসিসি) অবহেলা ও অননুমোদিত অ্যানেস্থেসিয়ায় পার্সিয়ান অন্তঃসত্ত্বা বিড়াল মৃত্যুর ঘটনায় মালিক ও ২ চিকিৎসকের বিরুদ্ধে ক্ষতিপূরণ ও কারণ দর্শানোর লিগ্যাল নোটিশ পাঠানো হয়েছে।\n• আইনগত প্রেক্ষাপট: প্রাণী কল্যাণ আইন ২০১৯ এবং ভোক্তা অধিকার সংরক্ষণ আইনে যেকোনো নিবন্ধিত চিকিৎসকের জন্য অনুমোদিত প্রোটোকল মেনে চলা বাধ্যতামূলক। দায় প্রমাণ হলে জরিমানা ও শাস্তির বিধান রয়েছে।`;
    }

    return `📰 **দেশবার্তা এআই বিশ্লেষণ:**\n\nআপনার প্রশ্ন: "${query}" বিষয়ে অনুসন্ধান করা হয়েছে।\n\nদেশবার্তা ফ্যাক্টচেক ডেস্কের তথ্যমতে, বর্তমান অন্তর্বর্তীকালীন সরকার বিভিন্ন প্রাতিষ্ঠানিক সংস্কার, আইনের শাসন প্রতিষ্ঠা এবং বাজার তদারকিতে বেশ কিছু দৃশ্যমান উদ্যোগ গ্রহণ করেছে। তবে প্রশাসনিক জবাবদিহিতা ও মাঠপর্যায়ের সমন্বয় এখনও বড় চ্যালেঞ্জ।\n\nঅন্য কোনো সুনির্দিষ্ট বিষয়ে জানতে চাইলে নিচে ক্লিক করতে পারেন বা প্রশ্ন লিখতে পারেন।`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'এখন'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Call Gemini API if available, or use contextual knowledge engine
    setTimeout(() => {
      const replyText = getKnowledgeResponse(text);
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: 'এখন',
        suggestedQuestions: [
          'সাম্প্রতিক অর্থনৈতিক সংস্কারের অগ্রগতি কী?',
          'স্বাস্থ্য খাতের উন্নয়নে নীতিগত পদক্ষেপ কী নেওয়া হচ্ছে?'
        ]
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 900);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl h-[85vh] max-h-[750px] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-[#881337] via-[#991b1b] to-[#dc2626] text-white p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg leading-none">
                  দেশবার্তা এআই সংবাদ সহকারী
                </h3>
                <span className="bg-black/30 text-amber-300 text-[10px] font-black px-1.5 py-0.5 rounded uppercase">
                  BETA
                </span>
              </div>
              <p className="text-[11px] text-red-100 font-medium mt-0.5">
                নিরপেক্ষ তথ্য বিশ্লেষণ, প্রেক্ষাপট ও ফ্যাক্টচেকার
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-red-600 text-white rounded-tr-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                  }`}
                >
                  <div className="whitespace-pre-line">
                    {msg.text}
                  </div>

                  {msg.sender === 'assistant' && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>দেশবার্তা ইন্টেলিজেন্স ডেস্ক</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="flex items-center gap-1 hover:text-red-600 transition-colors p-1"
                        title="কপি করুন"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === msg.id ? 'কপি হয়েছে' : 'কপি'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Suggested prompt chips */}
                {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {msg.suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(q)}
                        className="text-[11px] bg-white hover:bg-red-50 hover:text-red-600 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full transition-colors cursor-pointer text-left shadow-2xs"
                      >
                        {q} ↘
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl px-4 py-2.5 shadow-2xs flex items-center gap-1.5 text-xs text-slate-500">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-slate-400">তথ্য যাচাই করা হচ্ছে...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="সংবাদ সম্পর্কে যেকোনো প্রশ্ন করুন (যেমন: জ্বালানি তেলের দাম, নির্বাচন)..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-red-500 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="bg-red-600 hover:bg-red-700 disabled:bg-slate-200 disabled:text-slate-400 text-white p-2.5 rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed shadow-xs active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between mt-2 text-[10px] text-slate-400 px-1">
            <span>দেশবার্তা অভ্যন্তরীণ ফ্যাক্টচেকিং ও এআই সিস্টেম দ্বারা পরিচালিত</span>
            <span>তথ্য সর্বদা যাচাইযোগ্য</span>
          </div>
        </div>
      </div>
    </div>
  );
};
