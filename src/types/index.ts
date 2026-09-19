/**
 * SAFA (صفا) — Core Domain Types Index
 */

export * from './inspiration';
export * from './atelier';

export interface UserProfile {
  id: string;
  name: string;
  persianName: string;
  avatarUrl: string;
  role: string;
  persianRole: string;
  bio: string;
  persianBio: string;
  city: string;
  persianCity: string;
  currentMoodFrequency: number; // 1 to 5
}

export interface DailyIntention {
  id: string;
  text: string;
  persianText?: string;
  completed: boolean;
  category: 'atelier' | 'university' | 'wellness' | 'ritual';
  priority?: 'high' | 'normal' | 'low';
}

export interface MoodEntry {
  id: string;
  date: string;
  time: string;
  level: number; // 1-5
  label: string;
  persianLabel: string;
  note?: string;
  persianNote?: string;
}

export interface Memory {
  id: string;
  title: string;
  persianTitle: string;
  date: string;
  location: string;
  persianLocation: string;
  imageUrl?: string;
  quote?: string;
  persianQuote?: string;
  audioDuration?: string;
  tags: string[];
}

export interface LifeMilestone {
  id: string;
  title: string;
  persianTitle: string;
  targetDate: string;
  category: 'academic' | 'creative' | 'personal';
  progress: number; // 0-100
  notes?: string;
}

export interface RitualMoment {
  id: string;
  title: string;
  persianTitle: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening';
  description: string;
  persianDescription: string;
  iconName: string;
  completed: boolean;
}
