import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Compass,
  CheckCircle2,
  Circle,
  Plus,
  Target,
  Clock,
  Sparkles,
  Calendar,
  Layers,
} from 'lucide-react';
import { useStateContext } from '../../context/StateContext';
import { useNavigation } from '../../navigation/NavigationContext';
import {
  PageHeader,
  Section,
  List,
  ListItem,
  Badge,
  SegmentedControl,
  StatusIndicator,
} from '../primitives';
import { transitions } from '../../theme/motion';

export const LifeView: React.FC = () => {
  const {
    dailyIntentions,
    toggleIntention,
    addIntention,
    lifeMilestones,
    rituals,
    toggleRitual,
  } = useStateContext();

  const { openQuickCapture } = useNavigation();

  const [activeTab, setActiveTab] = useState<'all' | 'intentions' | 'milestones' | 'rituals'>('all');
  const [newIntentionText, setNewIntentionText] = useState('');
  const [newCategory, setNewCategory] = useState<'atelier' | 'ritual' | 'university' | 'wellness'>('atelier');

  const handleAddIntention = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIntentionText.trim()) {
      addIntention(newIntentionText.trim(), newCategory);
      setNewIntentionText('');
    }
  };

  const completedIntentions = dailyIntentions.filter((i) => i.completed).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={transitions.easeAtmospheric}
      className="space-y-6 text-left"
    >
      {/* 1. Page Header */}
      <PageHeader
        eyebrow="Life • Horizons & Practices"
        persianEyebrow="زندگی و افق‌ها"
        title="Life Horizons & Intentions"
        persianTitle="افق‌های زندگی و آیین‌ها"
        description="Structured tracking for academic milestones, studio rituals, and mindful daily intentions."
        actions={
          <div className="flex items-center gap-2">
            <SegmentedControl
              items={[
                { id: 'all', label: 'All' },
                { id: 'intentions', label: 'Intentions', count: dailyIntentions.length },
                { id: 'milestones', label: 'Milestones', count: lifeMilestones.length },
                { id: 'rituals', label: 'Rituals', count: rituals.length },
              ]}
              activeId={activeTab}
              onChange={setActiveTab}
            />
            <button
              onClick={openQuickCapture}
              className="px-3 py-1.5 rounded-lg bg-[var(--safa-accent-primary)] hover:bg-[var(--safa-accent-primary-hover)] text-white text-[12px] font-medium flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Plus size={14} strokeWidth={2.5} />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        }
      />

      {/* 2. Content Tabs / Sections */}
      <div className="space-y-6">
        {/* A. Intentions Section */}
        {(activeTab === 'all' || activeTab === 'intentions') && (
          <Section
            title="Daily Intentions"
            persianTitle="نیت‌های روزانه"
            description={`${completedIntentions} of ${dailyIntentions.length} completed`}
            border
          >
            {/* Inline Creation */}
            <form onSubmit={handleAddIntention} className="mb-3 space-y-2">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--safa-bg-surface-subtle)] border border-[var(--safa-border-subtle)] focus-within:border-[var(--safa-border-focus)] transition-colors">
                <Plus size={14} className="text-[var(--safa-content-muted)] shrink-0" />
                <input
                  type="text"
                  value={newIntentionText}
                  onChange={(e) => setNewIntentionText(e.target.value)}
                  placeholder="Create new intention..."
                  className="w-full bg-transparent text-[13px] text-[var(--safa-content-primary)] placeholder-[var(--safa-content-muted)] outline-none"
                />
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="bg-transparent text-[11px] text-[var(--safa-content-secondary)] outline-none border-l border-[var(--safa-border-subtle)] pl-2 cursor-pointer"
                >
                  <option value="atelier">Atelier</option>
                  <option value="university">University</option>
                  <option value="wellness">Wellness</option>
                  <option value="ritual">Ritual</option>
                </select>
              </div>
            </form>

            <List divided>
              {dailyIntentions.map((item) => (
                <ListItem
                  key={item.id}
                  onClick={() => toggleIntention(item.id)}
                  leading={
                    item.completed ? (
                      <CheckCircle2 size={16} className="text-[var(--safa-accent-secondary)]" />
                    ) : (
                      <Circle size={16} className="text-[var(--safa-content-muted)]" />
                    )
                  }
                  title={
                    <span className={item.completed ? 'line-through text-[var(--safa-content-muted)]' : ''}>
                      {item.text}
                    </span>
                  }
                  persianTitle={item.persianText}
                  trailing={
                    <Badge variant={item.category === 'atelier' ? 'primary' : 'default'} size="xs">
                      {item.category}
                    </Badge>
                  }
                  density="compact"
                />
              ))}
            </List>
          </Section>
        )}

        {/* B. Milestones / Horizons Section */}
        {(activeTab === 'all' || activeTab === 'milestones') && (
          <Section
            title="Strategic Horizons & Milestones"
            persianTitle="افق‌های استراتژیک و اهداف"
            description="Long-term trajectory toward graduation collection and showroom launch"
            border
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {lifeMilestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="p-3.5 rounded-xl bg-[var(--safa-bg-surface-subtle)]/50 border border-[var(--safa-border-subtle)] hover:border-[var(--safa-border-default)] transition-colors space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant={milestone.category === 'creative' ? 'primary' : 'default'} size="xs">
                      {milestone.category}
                    </Badge>
                    <span className="text-[11px] text-[var(--safa-content-tertiary)] flex items-center gap-1">
                      <Calendar size={11} />
                      {milestone.targetDate}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[13.5px] text-[var(--safa-content-primary)]">
                      {milestone.title}
                    </h3>
                    {milestone.persianTitle && (
                      <span className="font-persian text-[11px] text-[var(--safa-content-tertiary)] block mt-0.5" dir="rtl">
                        {milestone.persianTitle}
                      </span>
                    )}
                  </div>

                  {milestone.notes && (
                    <p className="text-[11.5px] text-[var(--safa-content-secondary)] line-clamp-2">
                      {milestone.notes}
                    </p>
                  )}

                  {/* Progress Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[10.5px] text-[var(--safa-content-muted)]">
                      <span>Progress</span>
                      <span className="font-medium text-[var(--safa-content-primary)]">{milestone.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[var(--safa-bg-surface-inset)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--safa-accent-primary)] transition-all duration-300"
                        style={{ width: `${milestone.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* C. Sanctuary Rituals */}
        {(activeTab === 'all' || activeTab === 'rituals') && (
          <Section
            title="Sanctuary Rituals"
            persianTitle="آیین‌های آرامش و تمرکز"
            description="Daily cadence for studio grounding and creative renewal"
            border
          >
            <List divided>
              {rituals.map((ritual) => (
                <ListItem
                  key={ritual.id}
                  onClick={() => toggleRitual(ritual.id)}
                  leading={
                    ritual.completed ? (
                      <CheckCircle2 size={16} className="text-[var(--safa-accent-secondary)]" />
                    ) : (
                      <Circle size={16} className="text-[var(--safa-content-muted)]" />
                    )
                  }
                  title={ritual.title}
                  persianTitle={ritual.persianTitle}
                  subtitle={ritual.description}
                  trailing={
                    <Badge variant="gold" size="xs">
                      {ritual.timeOfDay}
                    </Badge>
                  }
                  density="default"
                />
              ))}
            </List>
          </Section>
        )}
      </div>
    </motion.div>
  );
};
