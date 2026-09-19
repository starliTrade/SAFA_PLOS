import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  SunMedium,
  CheckCircle2,
  Circle,
  Plus,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useStateContext } from '../../context/StateContext';
import { useNavigation } from '../../navigation/NavigationContext';
import {
  PageHeader,
  Section,
  List,
  ListItem,
  Badge,
} from '../primitives';
import { transitions } from '../../theme/motion';

export const HomeView: React.FC = () => {
  const {
    userProfile,
    dailyIntentions,
    toggleIntention,
    addIntention,
    fashionProjects,
    designs,
    inspirationItems,
    resurfacedMemory,
  } = useStateContext();

  const {
    navigateToDomain,
    navigateToExperience,
    setPeekItem,
    openQuickCapture,
  } = useNavigation();

  const [newIntentionText, setNewIntentionText] = useState('');

  const activeProject = fashionProjects[0];
  const featuredInspiration = inspirationItems[0];

  const handleAddIntentionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIntentionText.trim()) {
      addIntention(newIntentionText.trim(), 'atelier');
      setNewIntentionText('');
    }
  };

  const completedCount = dailyIntentions.filter((i) => i.completed).length;
  const projectProgress = activeProject
    ? Math.round(
        ((activeProject.completedLooksCount || 0) /
          (activeProject.looksTargetCount || 6)) *
          100
      )
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={transitions.easeAtmospheric}
      className="space-y-6 text-left"
    >
      {/* 1. Compact Page Header */}
      <PageHeader
        eyebrow="Sanctuary • Today"
        persianEyebrow="حضور امروز"
        title={`Welcome back, ${userProfile.name}`}
        persianTitle="خوش آمدی صفا"
        description="Your personal studio workspace for mindful creation, garment draping, and sensorial archives."
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateToExperience('morning')}
              className="px-3 py-1.5 rounded-lg bg-[var(--safa-bg-surface-subtle)] hover:bg-[var(--safa-bg-surface-raised)] border border-[var(--safa-border-subtle)] text-[12px] font-medium text-[var(--safa-content-primary)] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <SunMedium size={14} className="text-[var(--safa-accent-gold)]" />
              <span>Morning Ritual</span>
            </button>
            <button
              onClick={openQuickCapture}
              className="px-3 py-1.5 rounded-lg bg-[var(--safa-accent-primary)] hover:bg-[var(--safa-accent-primary-hover)] text-white text-[12px] font-medium flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Plus size={14} strokeWidth={2.5} />
              <span>Capture</span>
            </button>
          </div>
        }
      />

      {/* 2. Main Two-Column Layout (Mobile-first responsive grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Left Column: Today's Intentions & Active Focus (7 cols on desktop) */}
        <div className="lg:col-span-7 space-y-6">
          {/* A. Today's Intentions */}
          <Section
            title="Today's Intentions"
            persianTitle="نیت‌های امروز"
            description={`${completedCount} of ${dailyIntentions.length} completed`}
            action={
              <Badge variant="primary" size="xs">
                {dailyIntentions.length - completedCount} remaining
              </Badge>
            }
            border
          >
            {/* Inline Add Input */}
            <form onSubmit={handleAddIntentionSubmit} className="mb-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--safa-bg-surface-subtle)] border border-[var(--safa-border-subtle)] focus-within:border-[var(--safa-border-focus)] transition-colors">
                <Plus size={14} className="text-[var(--safa-content-muted)] shrink-0" />
                <input
                  type="text"
                  value={newIntentionText}
                  onChange={(e) => setNewIntentionText(e.target.value)}
                  placeholder="Add intention or task (press Enter)..."
                  className="w-full bg-transparent text-[13px] text-[var(--safa-content-primary)] placeholder-[var(--safa-content-muted)] outline-none"
                />
              </div>
            </form>

            {/* List */}
            <List divided>
              {dailyIntentions.map((intent) => (
                <ListItem
                  key={intent.id}
                  onClick={() => toggleIntention(intent.id)}
                  leading={
                    intent.completed ? (
                      <CheckCircle2 size={16} className="text-[var(--safa-accent-secondary)]" />
                    ) : (
                      <Circle size={16} className="text-[var(--safa-content-muted)]" />
                    )
                  }
                  title={
                    <span className={intent.completed ? 'line-through text-[var(--safa-content-muted)]' : ''}>
                      {intent.text}
                    </span>
                  }
                  persianTitle={intent.persianText}
                  trailing={
                    <Badge variant={intent.category === 'atelier' ? 'primary' : 'default'} size="xs">
                      {intent.category}
                    </Badge>
                  }
                  density="compact"
                />
              ))}
            </List>
          </Section>

          {/* B. Continue Creative Focus */}
          {activeProject && (
            <Section
              title="Current Atelier Capsule"
              persianTitle="کپسول فعال کارگاه"
              action={
                <button
                  onClick={() => navigateToDomain('create', { projectId: activeProject.id })}
                  className="text-[12px] text-[var(--safa-accent-primary)] font-medium flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Open Atelier</span>
                  <ArrowRight size={12} />
                </button>
              }
              border
            >
              <div
                onClick={() => setPeekItem({ type: 'project', id: activeProject.id })}
                className="group p-3 rounded-lg bg-[var(--safa-bg-surface-subtle)]/60 hover:bg-[var(--safa-bg-surface-subtle)] border border-[var(--safa-border-subtle)] flex items-center justify-between gap-3 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-[var(--safa-bg-surface)] border border-[var(--safa-border-subtle)] shrink-0">
                    <img
                      src={activeProject.coverImage || activeProject.palette[0]?.hex}
                      alt={activeProject.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[14px] text-[var(--safa-content-primary)] truncate">
                        {activeProject.title}
                      </span>
                      <Badge variant="primary" size="xs">
                        {activeProject.season}
                      </Badge>
                    </div>
                    <p className="text-[12px] text-[var(--safa-content-secondary)] truncate mt-0.5">
                      {activeProject.concept}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[12px] font-semibold text-[var(--safa-content-primary)]">
                    {projectProgress}%
                  </span>
                  <p className="text-[10px] text-[var(--safa-content-muted)]">
                    {activeProject.completedLooksCount || 0}/{activeProject.looksTargetCount || 6} Looks
                  </p>
                </div>
              </div>
            </Section>
          )}
        </div>

        {/* Right Column: Sensorial Media, Memory & Quick Actions (5 cols on desktop) */}
        <div className="lg:col-span-5 space-y-6">
          {/* A. Daily Featured Sensorial Inspiration */}
          {featuredInspiration && (
            <Section
              title="Sensorial Resonance"
              persianTitle="طنین الهام حسی"
              action={
                <button
                  onClick={() => navigateToDomain('media')}
                  className="text-[12px] text-[var(--safa-content-secondary)] hover:text-[var(--safa-content-primary)] flex items-center gap-1 cursor-pointer"
                >
                  <span>All Media</span>
                  <ExternalLink size={12} />
                </button>
              }
              border
            >
              <div
                onClick={() => setPeekItem({ type: 'inspiration', id: featuredInspiration.id })}
                className="group rounded-lg overflow-hidden border border-[var(--safa-border-subtle)] bg-[var(--safa-bg-surface-subtle)]/40 hover:border-[var(--safa-border-default)] transition-all cursor-pointer"
              >
                <div className="h-32 sm:h-36 w-full overflow-hidden relative">
                  <img
                    src={featuredInspiration.imageUrl}
                    alt={featuredInspiration.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="default" size="xs">
                      {featuredInspiration.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-3 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-[13.5px] text-[var(--safa-content-primary)] truncate">
                      {featuredInspiration.title}
                    </span>
                    {featuredInspiration.persianTitle && (
                      <span className="font-persian text-[12px] text-[var(--safa-content-tertiary)]" dir="rtl">
                        {featuredInspiration.persianTitle}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-[var(--safa-content-secondary)] line-clamp-2">
                    {featuredInspiration.notes}
                  </p>
                </div>
              </div>
            </Section>
          )}

          {/* B. Resurfaced Memory Resonance */}
          {resurfacedMemory && (
            <Section
              title="Memory Archive"
              persianTitle="خاطره متبلور"
              action={
                <button
                  onClick={() => navigateToDomain('more')}
                  className="text-[12px] text-[var(--safa-accent-secondary)] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Archive</span>
                  <ArrowRight size={12} />
                </button>
              }
              border
            >
              <div
                onClick={() => setPeekItem({ type: 'memory', id: resurfacedMemory.id })}
                className="p-3 rounded-lg bg-[var(--safa-bg-surface-subtle)]/50 hover:bg-[var(--safa-bg-surface-subtle)] border border-[var(--safa-border-subtle)] cursor-pointer transition-colors space-y-2"
              >
                <div className="flex items-center justify-between text-[11px] text-[var(--safa-content-tertiary)]">
                  <span>{resurfacedMemory.location}</span>
                  <span>{resurfacedMemory.date}</span>
                </div>

                {resurfacedMemory.quote && (
                  <p className="font-editorial italic text-[14px] text-[var(--safa-content-primary)] leading-snug">
                    "{resurfacedMemory.quote}"
                  </p>
                )}

                {resurfacedMemory.persianQuote && (
                  <p className="font-persian text-[12px] text-[var(--safa-content-secondary)] text-right" dir="rtl">
                    «{resurfacedMemory.persianQuote}»
                  </p>
                )}
              </div>
            </Section>
          )}
        </div>
      </div>
    </motion.div>
  );
};
