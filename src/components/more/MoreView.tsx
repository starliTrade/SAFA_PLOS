import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Bookmark,
  MapPin,
  Calendar,
  Volume2,
  Sparkles,
  Sun,
  Moon,
  User,
  Sliders,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useStateContext } from '../../context/StateContext';
import { useNavigation } from '../../navigation/NavigationContext';
import { useTheme } from '../theme/ThemeProvider';
import {
  PageHeader,
  Section,
  Badge,
  SegmentedControl,
  List,
  ListItem,
} from '../primitives';
import { transitions } from '../../theme/motion';

export const MoreView: React.FC = () => {
  const { resurfacedMemory, userProfile } = useStateContext();
  const { theme, toggleTheme, setTheme } = useTheme();
  const { setPeekItem, navigateToExperience } = useNavigation();

  const [activeTab, setActiveTab] = useState<'memories' | 'profile' | 'settings'>('memories');

  const memories = [
    resurfacedMemory,
    {
      id: 'mem_isfahan_dome',
      title: 'Afternoon Light inside Sheikh Lotfollah Mosque',
      persianTitle: 'نور بعدازظهر در گنبد مسجد شیخ لطف‌الله',
      date: 'April 12, 2025',
      location: 'Naqsh-e Jahan, Isfahan',
      persianLocation: 'میدان نقش جهان، اصفهان',
      imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
      quote: 'The golden spiral does not simply terminate; it dissolves into the infinite light of the apex.',
      persianQuote: '«مارپیچ طلایی مقرنس‌ها پایان نمی‌پذیرد؛ در روشنایی آسمان حل می‌شود.»',
      audioDuration: '2m 10s',
      tags: ['Isfahan', 'Geometry', 'Architecture', 'Sufi'],
    },
    {
      id: 'mem_grand_bazaar_tea',
      title: 'Tea with Master Reza at Silk Passage',
      persianTitle: 'استکان چای با حاج رضا در راسته ابریشم‌فروشان',
      date: 'June 04, 2026',
      location: 'Grand Bazaar, Tehran',
      persianLocation: 'بازار بزرگ، تهران',
      imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      quote: 'A real silk fabric whispers when you fold it against the warp.',
      persianQuote: '«ابریشم اصل وقتی روی تار و پودش تا می‌خورد، نجوا می‌کند.»',
      audioDuration: '0m 54s',
      tags: ['TehranBazaar', 'Textiles', 'Silk', 'Mentorship'],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={transitions.easeAtmospheric}
      className="space-y-6 text-left"
    >
      {/* 1. Header */}
      <PageHeader
        eyebrow="Sanctuary • Archive & Space"
        persianEyebrow="آرشیو و تنظیمات صفا"
        title="Memories, Identity & Settings"
        persianTitle="خاطرات، هویت و تنظیمات"
        description="Resurfaced sensorial moments, personal profile configuration, and visual theme preferences."
        actions={
          <SegmentedControl
            items={[
              { id: 'memories', label: 'Memories', count: memories.length },
              { id: 'profile', label: 'Profile' },
              { id: 'settings', label: 'Settings' },
            ]}
            activeId={activeTab}
            onChange={setActiveTab}
          />
        }
      />

      {/* 2. Tab Views */}
      {activeTab === 'memories' && (
        <div className="space-y-5">
          <Section
            title="Resurfaced Sensory Moments"
            persianTitle="لحظات متبلور حسی"
            description="Audio textures, field recordings, and poetry reflections from Iran and abroad"
            action={
              <button
                onClick={() => navigateToExperience('reflection')}
                className="px-3 py-1.5 rounded-lg bg-[var(--safa-accent-secondary-subtle)] text-[var(--safa-accent-secondary)] text-[12px] font-medium flex items-center gap-1.5 hover:bg-[var(--safa-accent-secondary)] hover:text-white transition-colors cursor-pointer"
              >
                <Sparkles size={13} />
                <span>Evening Reflection</span>
              </button>
            }
            border
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {memories.map((mem) => (
                <div
                  key={mem.id}
                  onClick={() => setPeekItem({ type: 'memory', id: mem.id })}
                  className="rounded-xl border border-[var(--safa-border-subtle)] bg-[var(--safa-bg-surface-subtle)]/40 hover:border-[var(--safa-border-default)] p-4 cursor-pointer transition-colors space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-[14.5px] font-semibold text-[var(--safa-content-primary)]">
                        {mem.title}
                      </h4>
                      <span className="font-persian text-[11.5px] text-[var(--safa-content-tertiary)] block" dir="rtl">
                        {mem.persianTitle}
                      </span>
                    </div>
                    {mem.audioDuration && (
                      <Badge variant="default" size="xs">
                        <Volume2 size={11} />
                        {mem.audioDuration}
                      </Badge>
                    )}
                  </div>

                  {mem.imageUrl && (
                    <div className="h-32 w-full rounded-lg overflow-hidden border border-[var(--safa-border-subtle)]">
                      <img
                        src={mem.imageUrl}
                        alt={mem.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {mem.quote && (
                    <blockquote className="font-editorial text-[14px] text-[var(--safa-content-secondary)] italic border-l-2 border-[var(--safa-accent-primary)] pl-2.5">
                      "{mem.quote}"
                    </blockquote>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-[var(--safa-content-muted)] pt-1 border-t border-[var(--safa-border-subtle)]">
                    <span className="flex items-center gap-1">
                      <MapPin size={11} />
                      {mem.location}
                    </span>
                    <span>{mem.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      )}

      {activeTab === 'profile' && (
        <div className="max-w-2xl space-y-6">
          <Section title="Personal Studio Profile" persianTitle="پروفایل صفا" border>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-full object-cover border-2 border-[var(--safa-border-default)]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[17px] font-semibold text-[var(--safa-content-primary)]">
                      {userProfile.name}
                    </h3>
                    <span className="font-persian text-[14px] text-[var(--safa-content-tertiary)]" dir="rtl">
                      {userProfile.persianName}
                    </span>
                  </div>
                  <p className="text-[13px] text-[var(--safa-accent-primary)]">
                    {userProfile.role} • {userProfile.persianRole}
                  </p>
                  <p className="text-[11.5px] text-[var(--safa-content-muted)] flex items-center gap-1 mt-0.5">
                    <MapPin size={11} />
                    {userProfile.city} ({userProfile.persianCity})
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[var(--safa-bg-surface-subtle)] text-[13px] text-[var(--safa-content-secondary)] leading-relaxed space-y-2">
                <p>{userProfile.bio}</p>
                <p className="font-persian text-right text-[12.5px] pt-1 border-t border-[var(--safa-border-subtle)]" dir="rtl">
                  {userProfile.persianBio}
                </p>
              </div>
            </div>
          </Section>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="max-w-2xl space-y-6">
          <Section title="Interface Appearance" persianTitle="تنظیمات ظاهر" border>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--safa-bg-surface-subtle)]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[13.5px] font-medium text-[var(--safa-content-primary)]">
                      Current Theme: {theme === 'dark' ? 'Obsidian Sanctuary Dark' : 'Warm Paper Light'}
                    </span>
                  </div>
                  <p className="text-[12px] text-[var(--safa-content-secondary)] mt-0.5">
                    Calibrated semantic color tokens for eyes and editorial balance.
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className="px-3 py-1.5 rounded-lg bg-[var(--safa-bg-surface)] border border-[var(--safa-border-default)] text-[12px] font-medium text-[var(--safa-content-primary)] flex items-center gap-1.5 hover:bg-[var(--safa-bg-surface-raised)] transition-colors cursor-pointer"
                >
                  {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                  <span>Switch Mode</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                    theme === 'light'
                      ? 'border-[var(--safa-accent-primary)] bg-[var(--safa-accent-primary-subtle)]/40'
                      : 'border-[var(--safa-border-subtle)] bg-[var(--safa-bg-surface)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-[#1E1B18]">Warm Paper</span>
                    {theme === 'light' && <CheckCircle2 size={15} className="text-[var(--safa-accent-primary)]" />}
                  </div>
                  <p className="text-[11px] text-[#635E59] mt-1">Soft editorial light paper</p>
                </button>

                <button
                  onClick={() => setTheme('dark')}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                    theme === 'dark'
                      ? 'border-[var(--safa-accent-primary)] bg-[var(--safa-accent-primary-subtle)]/40'
                      : 'border-[var(--safa-border-subtle)] bg-[var(--safa-bg-surface)]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-[#FAF5EE]">Obsidian Dark</span>
                    {theme === 'dark' && <CheckCircle2 size={15} className="text-[var(--safa-accent-primary)]" />}
                  </div>
                  <p className="text-[11px] text-[#9E968D] mt-1">Deep sanctuary darkness</p>
                </button>
              </div>
            </div>
          </Section>
        </div>
      )}
    </motion.div>
  );
};
