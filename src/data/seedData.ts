/**
 * SAFA (صفا) — Sanctuary & Lifestyle Seed Data
 * Tailored for Sara, 21-year-old Iranian fashion design student at University of Tehran
 */

import {
  UserProfile,
  DailyIntention,
  MoodEntry,
  Memory,
  LifeMilestone,
  RitualMoment,
} from '../types';

export const seedUserProfile: UserProfile = {
  id: 'usr_sara',
  name: 'Sara',
  persianName: 'سارا',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  role: 'Fashion Designer & Thesis Scholar',
  persianRole: 'طراح لباس و پژوهشگر ارشد مد',
  bio: 'Exploring traditional Persian architectural proportions, botanical textile dyes, and contemporary fluid silhouettes.',
  persianBio: 'کاوش در تناسبات معماری ایرانی، رنگرزی گیاهی و سیلوئت‌های سیال معاصر.',
  city: 'Tehran',
  persianCity: 'تهران',
  currentMoodFrequency: 4,
};

export const seedDailyIntentions: DailyIntention[] = [
  {
    id: 'int_1',
    text: 'Refine armhole drape on Look 01 Architectural Cape Coat',
    persianText: 'اصلاح درز و حلقه آستین شنل‌پالتوی لوک ۰۱',
    completed: true,
    category: 'atelier',
    priority: 'high',
  },
  {
    id: 'int_2',
    text: 'Review Isfahan wool swatch samples with Master Kazemi',
    persianText: 'بررسی نمونه‌های پشم اصفهان با استاد کاظمی',
    completed: false,
    category: 'atelier',
    priority: 'high',
  },
  {
    id: 'int_3',
    text: 'Submit thesis Chapter 03 to Prof. Daneshvar',
    persianText: 'ارسال فصل سوم پایان‌نامه برای استاد راهنما',
    completed: false,
    category: 'university',
    priority: 'normal',
  },
];

export const seedMoodEntries: MoodEntry[] = [
  {
    id: 'mood_1',
    date: '2026-09-18',
    time: '09:30',
    level: 4,
    label: 'Inspired & Grounded',
    persianLabel: 'خلاق و آرام',
    note: 'Morning saffron tea and quiet sketching session brought sudden clarity to the back pleat pattern.',
  },
];

export const seedResurfacedMemory: Memory = {
  id: 'mem_valiasr_autumn',
  title: 'Autumn Rain on Vali-Asr Plane Trees',
  persianTitle: 'باران پاییزی زیر چنارهای ولی‌عصر',
  date: 'October 24, 2025',
  location: 'Vali-Asr St., Tehran',
  persianLocation: 'خیابان ولی‌عصر، تهران',
  imageUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
  quote: '“I am talking from the other side of night, from the other side of darkness...” — Forough Farrokhzad',
  persianQuote: '«من از نهایت شب حرف می‌زنم / من از نهایت تاریکی...» — فروغ فرخزاد',
  audioDuration: '1m 42s',
  tags: ['Autumn', 'Tehran', 'Rain', 'Inspiration'],
};

export const seedLifeMilestones: LifeMilestone[] = [
  {
    id: 'ms_thesis_presentation',
    title: 'Senior Fashion Thesis Jury Defense',
    persianTitle: 'دفاع نهایی ژوژمان پایان‌نامه طراحی لباس',
    targetDate: 'December 14, 2026',
    category: 'academic',
    progress: 72,
    notes: '6 capsule looks, lookbook editorial book, and 120-page research monograph on architectural draping.',
  },
  {
    id: 'ms_studio_launch',
    title: 'SAFA Atelier Private Debut Showroom',
    persianTitle: 'افتتاح رسمی استودیو صفا در تهران',
    targetDate: 'Spring 2027',
    category: 'creative',
    progress: 35,
    notes: 'Private boutique preview in North Tehran.',
  },
];

export const seedRitualMoments: RitualMoment[] = [
  {
    id: 'rit_morning_saffron',
    title: 'Morning Saffron Infusion & Studio Centering',
    persianTitle: 'دم‌نوش زعفران صبحگاهی و آمادگی ذهن',
    timeOfDay: 'morning',
    description: '15 minutes of non-digital tea breathing and silhouette visualization.',
    persianDescription: '۱۵ دقیقه نوشیدن چای در آرامش و مرور بصری طرح‌ها.',
    iconName: 'Sparkles',
    completed: true,
  },
  {
    id: 'rit_evening_journal',
    title: 'Evening Drape Review & Atelier Journal',
    persianTitle: 'مرور خطوط شبانه و ثبت یادداشت‌های استودیو',
    timeOfDay: 'evening',
    description: 'Capture fabric observations and tactile discoveries from the day.',
    persianDescription: 'ثبت جزئیات بافت پارچه و ایده‌های نوآورانه امروز.',
    iconName: 'Moon',
    completed: false,
  },
];
