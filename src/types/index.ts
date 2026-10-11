export interface Article {
  id: string;
  category: string;
  categorySlug: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  imageCaption?: string;
  author: string;
  publishedAt: string;
  timeAgo: string;
  views?: string;
  commentsCount: number;
  tags: string[];
  isBreaking?: boolean;
  isLead?: boolean;
  isTrending?: boolean;
  trendingRank?: number;
  isMostRead?: boolean;
  mostReadRank?: number;
  readTime: string;
  audioDuration?: string;
  sourceUrl?: string;
}

export interface Comment {
  id: string;
  articleId: string;
  author: string;
  timeAgo: string;
  content: string;
  likes: number;
  userLiked?: boolean;
}

export interface PollOption {
  id: string;
  text: string;
  percentage: number;
  votes: number;
}

export interface Poll {
  id: string;
  date: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  userVotedOptionId?: string;
}

export interface WeatherData {
  city: string;
  bengaliCity: string;
  temp: number;
  condition: string;
  conditionBengali: string;
  humidity: number;
  windSpeed: number;
  high: number;
  low: number;
}

export interface PrayerTimeItem {
  id: string;
  name: string;
  bengaliName: string;
  time: string;
  isCurrent?: boolean;
}

export interface EPaperPage {
  pageNumber: number;
  title: string;
  date: string;
  leadHeadline: string;
  subHeadlines: string[];
  previewUrl: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  sources?: string[];
}
