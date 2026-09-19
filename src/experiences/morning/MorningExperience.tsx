import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  CheckCircle2,
  Circle,
  Plus,
  ArrowRight,
  Sun,
  Coffee,
  Layers,
} from 'lucide-react';
import { useStateContext } from '../../context/StateContext';
import { SafaButton } from '../../components/ui/SafaButton';
import { SafaCard } from '../../components/ui/SafaCard';
import { SafaBadge } from '../../components/ui/SafaBadge';
import { SafaSlider } from '../../components/ui/SafaSlider';
import { ColorPaletteBar } from '../../components/inspiration/ColorPaletteBar';
import {
  springs,
  tapPhysics,
  completionFeedback,
  experienceVariants,
} from '../../theme/interactions';

export interface MorningExperienceProps {
  onEnterCreative: () => void;
  onEnterDiscovery: () => void;
}

export const MorningExperience: React.FC<MorningExperienceProps> = ({
  onEnterCreative,
  onEnterDiscovery,
}) => {
  const {
    userProfile,
    dailyIntentions,
    toggleIntention,
    addIntention,
    fashionProjects,
    rituals,
    toggleRitual,
  } = useStateContext();

  const [isAddingIntention, setIsAddingIntention] = useState(false);
  const [newIntentionText, setNewIntentionText] = useState('');
  const [moodLevel, setMoodLevel] = useState<number>(userProfile.currentMoodFrequency || 4);

  const activeProject = fashionProjects[0];
  const morningRituals = rituals.filter((r) => r.timeOfDay === 'morning');

  const handleAddIntention = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIntentionText.trim()) return;
    addIntention(newIntentionText.trim(), 'atelier');
    setNewIntentionText('');
    setIsAddingIntention(false);
  };

  const getMoodLabel = (lvl: number) => {
    switch (lvl) {
      case 5:
        return 'Transcendent & Flowing (به اوج الهام)';
      case 4:
        return 'Grounded & Creative (آرام و آفریننده)';
      case 3:
        return 'Centered & Observing (متمرکز و ناظر)';
      case 2:
        return 'Reflective & Gentle (نیازمند سکوت)';
      default:
        return 'Quiet Rest (استراحت ذهن)';
    }
  };

  return (
    <motion.div
      variants={experienceVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-6 pb-28 max-w-4xl mx-auto text-left"
    >
      {/* 1. EDITORIAL MORNING CENTERING HERO */}
      <div className="space-y-2 border-b border-[#EAE4DC] pb-5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C97D60] bg-[#F7EDE8] px-2.5 py-0.5 rounded-full border border-[#F0D5C9] inline-flex items-center gap-1.5">
            <Sun size={12} className="text-[#C97D60]" />
            Morning Centering • حضور صبحگاهی
          </span>
          <span className="text-[12px] text-[#9E968D] font-mono">
            08:30 AM
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-editorial font-normal text-[#1E1B18] tracking-tight">
          Sobh bekheir, {userProfile.name}.
        </h1>

        <p className="text-[14px] text-[#635E59] leading-relaxed max-w-xl">
          Begin with still mind, warm tea, and deliberate drape calibration for your senior collection.
        </p>

        <span className="text-[13px] text-[#7D756C] font-persian block" dir="rtl">
          «صبح فرصتی است برای تمرکز بر فرم، آرامش ذهن و لمس تار و پود کارگاه.»
        </span>
      </div>

      {/* 2. LIVING SANCTUARY MAIN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* LEFT 2 COLUMNS: Daily Intentions & Studio Focus */}
        <div className="md:col-span-2 space-y-5">
          {/* INTENTIONS CARD */}
          <SafaCard variant="elevated" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[10px] bg-[#FAF8F5] border border-[#EAE4DC] flex items-center justify-center text-[#C97D60] shadow-2xs">
                  <Sparkles size={15} />
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-[#1E1B18] leading-tight">
                    Studio Intentions
                  </h3>
                  <span className="text-[11px] text-[#9E968D]">
                    {dailyIntentions.filter((i) => i.completed).length}/{dailyIntentions.length} completed
                  </span>
                </div>
              </div>

              <SafaButton
                variant="ghost"
                size="xs"
                icon={<Plus size={13} />}
                onClick={() => setIsAddingIntention((v) => !v)}
              >
                New Intention
              </SafaButton>
            </div>

            {/* Inline Intention Form */}
            <AnimatePresence>
              {isAddingIntention && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={springs.snappy}
                  onSubmit={handleAddIntention}
                  className="p-3 bg-[#FAF8F5] rounded-[14px] border border-[#EAE4DC] flex items-center gap-2 overflow-hidden"
                >
                  <input
                    type="text"
                    placeholder="e.g. Drape prototype toile for Look 03..."
                    value={newIntentionText}
                    onChange={(e) => setNewIntentionText(e.target.value)}
                    className="flex-1 bg-transparent text-[13px] text-[#1E1B18] placeholder-[#9E968D] outline-none"
                    autoFocus
                  />
                  <SafaButton variant="atelier" size="xs" type="submit">
                    Save
                  </SafaButton>
                  <SafaButton
                    variant="ghost"
                    size="xs"
                    onClick={() => setIsAddingIntention(false)}
                  >
                    Cancel
                  </SafaButton>
                </motion.form>
              )}
            </AnimatePresence>

            {/* List with Linear-Grade Micro-Interactions */}
            <div className="space-y-2.5">
              {dailyIntentions.map((intent) => (
                <motion.div
                  key={intent.id}
                  whileTap={tapPhysics.subtle}
                  onClick={() => toggleIntention(intent.id)}
                  className={`p-3.5 rounded-[14px] border transition-colors cursor-pointer flex items-start gap-3 select-none ${
                    intent.completed
                      ? 'bg-[#FAF8F5]/60 border-[#EAE4DC] opacity-75'
                      : 'bg-[#FAF8F5] border-[#EAE4DC] hover:border-[#D5CDC2]'
                  }`}
                >
                  <motion.button
                    animate={intent.completed ? completionFeedback.checkmark : { scale: 1 }}
                    className={`mt-0.5 shrink-0 transition-colors cursor-pointer ${
                      intent.completed
                        ? 'text-[#5C6F59]'
                        : 'text-[#9E968D] hover:text-[#C97D60]'
                    }`}
                  >
                    {intent.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                  </motion.button>

                  <div className="space-y-0.5 flex-1 min-w-0">
                    <p
                      className={`text-[13px] font-medium leading-snug transition-all ${
                        intent.completed
                          ? 'line-through text-[#9E968D]'
                          : 'text-[#1E1B18]'
                      }`}
                    >
                      {intent.text}
                    </p>
                    {intent.persianText && (
                      <span
                        className={`text-[11px] font-persian block transition-all ${
                          intent.completed ? 'text-[#B5ACA1]' : 'text-[#7D756C]'
                        }`}
                        dir="rtl"
                      >
                        {intent.persianText}
                      </span>
                    )}
                  </div>

                  <SafaBadge
                    variant={intent.category === 'atelier' ? 'terracotta' : 'default'}
                    size="sm"
                  >
                    {intent.category}
                  </SafaBadge>
                </motion.div>
              ))}
            </div>
          </SafaCard>

          {/* ACTIVE ATELIER CAPSULE SPOTLIGHT */}
          {activeProject && (
            <SafaCard
              variant="elevated"
              className="bg-gradient-to-br from-[#FAF6F0] via-white to-[#FAF6F0] space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C97D60]">
                      Active Thesis Capsule
                    </span>
                    <SafaBadge variant="active" size="sm">
                      {activeProject.status}
                    </SafaBadge>
                  </div>
                  <h3 className="text-[19px] font-semibold text-[#1E1B18] tracking-tight">
                    {activeProject.title}
                  </h3>
                  <span className="text-[13px] text-[#7D756C] font-persian block" dir="rtl">
                    {activeProject.persianTitle}
                  </span>
                </div>

                <SafaButton
                  variant="atelier"
                  size="sm"
                  iconRight={<ArrowRight size={13} />}
                  onClick={onEnterCreative}
                >
                  Enter Atelier
                </SafaButton>
              </div>

              {/* Harmonized Mineral Palette Bar */}
              <div className="flex items-center justify-between p-3 rounded-[13px] bg-white/85 border border-[#EAE4DC]">
                <span className="text-[11px] font-medium text-[#635E59]">
                  Architectural Mineral Palette
                </span>
                <ColorPaletteBar palette={activeProject.palette} size="sm" />
              </div>
            </SafaCard>
          )}
        </div>

        {/* RIGHT 1 COLUMN: Mood frequency & Morning Rituals */}
        <div className="space-y-5">
          {/* CREATIVE FREQUENCY CHECK-IN */}
          <SafaCard variant="elevated" className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9E968D]">
                Creative Energy
              </span>
              <span className="text-[11px] font-mono font-semibold text-[#C97D60]">
                Level {moodLevel}/5
              </span>
            </div>

            <SafaSlider
              value={moodLevel}
              min={1}
              max={5}
              onChange={setMoodLevel}
            />

            <p className="text-[12px] text-[#5C6F59] font-medium text-center pt-0.5">
              {getMoodLabel(moodLevel)}
            </p>
          </SafaCard>

          {/* MORNING RITUALS */}
          <SafaCard variant="elevated" className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9E968D] flex items-center gap-1.5">
                <Coffee size={13} className="text-[#C97D60]" />
                Morning Centering
              </span>
            </div>

            <div className="space-y-2">
              {morningRituals.map((ritual) => (
                <motion.div
                  key={ritual.id}
                  whileTap={tapPhysics.subtle}
                  onClick={() => toggleRitual(ritual.id)}
                  className={`p-3 rounded-[13px] border flex items-center justify-between transition-colors cursor-pointer select-none ${
                    ritual.completed
                      ? 'bg-[#EEF3EE]/60 border-[#CDE0CC]'
                      : 'bg-[#FAF8F5] border-[#EAE4DC] hover:border-[#D5CDC2]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sun size={15} className="text-[#D4AF37] shrink-0" />
                    <div>
                      <h5
                        className={`text-[12px] font-medium leading-snug ${
                          ritual.completed ? 'line-through text-[#635E59]' : 'text-[#1E1B18]'
                        }`}
                      >
                        {ritual.title}
                      </h5>
                      <span className="text-[10px] text-[#7D756C] font-persian block" dir="rtl">
                        {ritual.persianTitle}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    animate={ritual.completed ? completionFeedback.checkmark : { scale: 1 }}
                    className={ritual.completed ? 'text-[#5C6F59]' : 'text-[#9E968D]'}
                  >
                    {ritual.completed ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </SafaCard>
        </div>
      </div>
    </motion.div>
  );
};
