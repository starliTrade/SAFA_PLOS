import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Scissors,
  CheckCircle2,
  Circle,
  Plus,
  ArrowRight,
  Sun,
  Moon,
  Bookmark,
  Calendar,
  Volume2,
  Tag,
} from 'lucide-react';
import { useStateContext } from '../../context/StateContext';
import { SafaButton } from '../ui/SafaButton';
import { SafaBadge } from '../ui/SafaBadge';
import { SafaSlider } from '../ui/SafaSlider';
import { ColorPaletteBar } from '../inspiration/ColorPaletteBar';
import { transitions } from '../../theme/motion';

export interface LivingSanctuaryProps {
  onNavigateToAtelier: () => void;
  onNavigateToInspiration: () => void;
  onNavigateToMemory: () => void;
  onNavigateToHorizon: () => void;
}

export const LivingSanctuary: React.FC<LivingSanctuaryProps> = ({
  onNavigateToAtelier,
  onNavigateToInspiration,
  onNavigateToMemory,
  onNavigateToHorizon,
}) => {
  const {
    userProfile,
    dailyIntentions,
    toggleIntention,
    addIntention,
    fashionProjects,
    inspirationItems,
    resurfacedMemory,
    lifeMilestones,
    rituals,
    toggleRitual,
  } = useStateContext();

  const [newIntentionText, setNewIntentionText] = useState('');
  const [isAddingIntention, setIsAddingIntention] = useState(false);
  const [moodLevel, setMoodLevel] = useState<number>(userProfile.currentMoodFrequency || 4);

  const activeProject = fashionProjects[0];
  const activeInspirations = inspirationItems.slice(0, 3);

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
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={transitions.easeAtmospheric}
      className="space-y-6 pb-28 max-w-4xl mx-auto text-left"
    >
      {/* 1. EMOTIONAL SANCTUARY GREETING */}
      <div className="space-y-1.5 border-b border-[#EAE4DC] pb-5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C97D60] bg-[#F7EDE8] px-2.5 py-0.5 rounded-full border border-[#F0D5C9]">
            Sanctuary Presence
          </span>
          <span className="text-[13px] text-[#9E968D] font-persian">خلوت و حضور</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-editorial font-normal text-[#1E1B18] tracking-tight">
          Sobh bekheir, {userProfile.name}.
        </h1>

        <p className="text-[14px] text-[#635E59] leading-relaxed max-w-xl">
          Today is a day for architectural drape calibration and quiet creative focus.
        </p>
        <span className="text-[13px] text-[#7D756C] font-persian block mt-0.5" dir="rtl">
          «امروز روز پالایش خطوط، تنفس در کارگاه و تمرکز بر جزئیات است.»
        </span>
      </div>

      {/* 2. LIVING SANCTUARY MAIN BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* LEFT 2 COLUMNS: Intentions & Active Atelier Loop */}
        <div className="md:col-span-2 space-y-5">
          {/* DAILY INTENTIONS CARD */}
          <div className="p-5 sm:p-6 rounded-[20px] bg-white border border-[#EAE4DC] shadow-[0_1px_3px_rgba(30,27,24,0.03),0_4px_14px_rgba(30,27,24,0.04)] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-[8px] bg-[#FAF8F5] border border-[#EAE4DC] flex items-center justify-center text-[#C97D60]">
                  <Sparkles size={14} />
                </div>
                <h3 className="text-[16px] font-semibold text-[#1E1B18]">
                  Daily Intentions & Studio Focus
                </h3>
              </div>

              <SafaButton
                variant="ghost"
                size="xs"
                icon={<Plus size={13} />}
                onClick={() => setIsAddingIntention((v) => !v)}
              >
                Add Intention
              </SafaButton>
            </div>

            {/* Inline Intention Form */}
            {isAddingIntention && (
              <form onSubmit={handleAddIntention} className="p-3 bg-[#FAF8F5] rounded-[12px] border border-[#EAE4DC] flex items-center gap-2">
                <input
                  type="text"
                  placeholder="e.g. Fit sample muslin toile for Look 02..."
                  value={newIntentionText}
                  onChange={(e) => setNewIntentionText(e.target.value)}
                  className="flex-1 bg-transparent text-[13px] text-[#1E1B18] placeholder-[#9E968D] outline-none"
                  autoFocus
                />
                <SafaButton variant="atelier" size="xs" type="submit">
                  Save
                </SafaButton>
                <SafaButton variant="ghost" size="xs" onClick={() => setIsAddingIntention(false)}>
                  Cancel
                </SafaButton>
              </form>
            )}

            {/* Intentions List */}
            <div className="space-y-2.5">
              {dailyIntentions.map((intent) => (
                <div
                  key={intent.id}
                  onClick={() => toggleIntention(intent.id)}
                  className={`p-3.5 rounded-[14px] border transition-all cursor-pointer flex items-start gap-3 ${
                    intent.completed
                      ? 'bg-[#FAF8F5]/60 border-[#EAE4DC] opacity-75'
                      : 'bg-[#FAF8F5] border-[#EAE4DC] hover:border-[#DFD8CE]'
                  }`}
                >
                  <button
                    aria-label={intent.completed ? 'Mark uncompleted' : 'Mark completed'}
                    className={`mt-0.5 shrink-0 transition-colors ${
                      intent.completed ? 'text-[#5C6F59]' : 'text-[#9E968D] hover:text-[#C97D60]'
                    }`}
                  >
                    {intent.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                  </button>

                  <div className="space-y-0.5 flex-1 min-w-0">
                    <p
                      className={`text-[13px] font-medium leading-snug ${
                        intent.completed
                          ? 'line-through text-[#9E968D]'
                          : 'text-[#1E1B18]'
                      }`}
                    >
                      {intent.text}
                    </p>
                    {intent.persianText && (
                      <span
                        className={`text-[11px] font-persian block ${
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
                </div>
              ))}
            </div>
          </div>

          {/* ACTIVE ATELIER SPOTLIGHT CARD */}
          {activeProject && (
            <div className="p-5 sm:p-6 rounded-[20px] bg-gradient-to-br from-[#FAF6F0] via-white to-[#FAF6F0] border border-[#EAE4DC] shadow-[0_1px_3px_rgba(30,27,24,0.03),0_4px_14px_rgba(30,27,24,0.04)] space-y-4">
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
                  onClick={onNavigateToAtelier}
                >
                  Enter Atelier
                </SafaButton>
              </div>

              {/* Harmonized Mineral Palette Strip */}
              <div className="flex items-center justify-between p-3 rounded-[12px] bg-white/80 border border-[#EAE4DC]">
                <span className="text-[11px] font-medium text-[#635E59]">
                  Architectural Mineral Palette
                </span>
                <ColorPaletteBar palette={activeProject.palette} size="sm" />
              </div>

              {/* Connected Visual Snippets */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[12px] text-[#635E59]">
                  <span>Connected Visual Inspo</span>
                  <button
                    onClick={onNavigateToInspiration}
                    className="text-[#C97D60] hover:underline font-medium cursor-pointer"
                  >
                    View All {activeProject.inspirationIds.length} →
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {activeInspirations.map((item) => (
                    <div
                      key={item.id}
                      onClick={onNavigateToInspiration}
                      className="relative aspect-[4/3] rounded-[10px] overflow-hidden border border-[#EAE4DC] cursor-pointer group"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
                      <span className="absolute bottom-1 left-1.5 text-[9px] text-white font-medium truncate max-w-[90%]">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT 1 COLUMN: Mood Check-in, Resurfaced Memory & Daily Rituals */}
        <div className="space-y-5">
          {/* DAILY MOOD CHECK-IN */}
          <div className="p-5 rounded-[20px] bg-white border border-[#EAE4DC] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9E968D]">
                Creative Frequency
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

            <p className="text-[12px] text-[#5C6F59] font-medium text-center pt-1">
              {getMoodLabel(moodLevel)}
            </p>
          </div>

          {/* RESURFACED MEMORY CARD */}
          {resurfacedMemory && (
            <div
              onClick={onNavigateToMemory}
              className="group p-5 rounded-[20px] bg-white border border-[#EAE4DC] hover:border-[#DFD8CE] shadow-2xs space-y-3 cursor-pointer transition-all"
            >
              <div className="flex items-center justify-between text-[#9E968D] text-[11px]">
                <span className="flex items-center gap-1.5 uppercase font-semibold text-[#C97D60]">
                  <Bookmark size={12} /> Resurfaced Memory
                </span>
                <span>{resurfacedMemory.date}</span>
              </div>

              <div className="relative aspect-[16/10] rounded-[12px] overflow-hidden border border-[#EAE4DC]">
                <img
                  src={resurfacedMemory.imageUrl}
                  alt={resurfacedMemory.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-1">
                <h4 className="text-[14px] font-semibold text-[#1E1B18] group-hover:text-[#C97D60] transition-colors leading-snug">
                  {resurfacedMemory.title}
                </h4>
                {resurfacedMemory.persianTitle && (
                  <span className="text-[12px] text-[#7D756C] font-persian block" dir="rtl">
                    {resurfacedMemory.persianTitle}
                  </span>
                )}
                <p className="text-[12px] text-[#635E59] italic pt-1 leading-relaxed">
                  {resurfacedMemory.quote}
                </p>
              </div>
            </div>
          )}

          {/* DAILY RITUAL MOMENTS */}
          <div className="p-5 rounded-[20px] bg-white border border-[#EAE4DC] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9E968D]">
                Daily Centering Rituals
              </span>
              <span className="text-[11px] text-[#5C6F59] font-medium">
                {rituals.filter((r) => r.completed).length}/{rituals.length} Done
              </span>
            </div>

            <div className="space-y-2">
              {rituals.map((ritual) => (
                <div
                  key={ritual.id}
                  onClick={() => toggleRitual(ritual.id)}
                  className={`p-3 rounded-[12px] border flex items-center justify-between transition-all cursor-pointer ${
                    ritual.completed
                      ? 'bg-[#EEF3EE]/60 border-[#CDE0CC]'
                      : 'bg-[#FAF8F5] border-[#EAE4DC]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {ritual.timeOfDay === 'morning' ? (
                      <Sun size={15} className="text-[#D4AF37]" />
                    ) : (
                      <Moon size={15} className="text-[#C97D60]" />
                    )}
                    <div>
                      <h5
                        className={`text-[12px] font-medium ${
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

                  <button
                    aria-label="Toggle ritual completion"
                    className={ritual.completed ? 'text-[#5C6F59]' : 'text-[#9E968D]'}
                  >
                    {ritual.completed ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* HORIZON MILESTONES MINI CARD */}
          <div
            onClick={onNavigateToHorizon}
            className="p-5 rounded-[20px] bg-[#FAF8F5] border border-[#EAE4DC] hover:border-[#DFD8CE] shadow-2xs space-y-2.5 cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold uppercase text-[#C97D60]">Horizon Milestone</span>
              <span className="text-[#9E968D]">{lifeMilestones[0]?.targetDate}</span>
            </div>

            <h4 className="text-[13px] font-semibold text-[#1E1B18]">
              {lifeMilestones[0]?.title}
            </h4>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#635E59]">Thesis Defense Preparation</span>
                <span className="font-mono text-[#C97D60] font-semibold">{lifeMilestones[0]?.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#EAE4DC] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C97D60] rounded-full"
                  style={{ width: `${lifeMilestones[0]?.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
