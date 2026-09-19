import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Search, Sun, Scissors, Moon, Compass } from 'lucide-react';
import { UserProfile } from '../../types';
import { springs, tapPhysics } from '../../theme/interactions';

export type ExperienceMode = 'morning' | 'creative' | 'reflection' | 'discovery';

export interface TopSanctuaryBarProps {
  user: UserProfile;
  activeExperience: ExperienceMode;
  onSelectExperience: (mode: ExperienceMode) => void;
  onOpenSearch?: () => void;
  onNavigateDomain?: (domain: string) => void;
}

export const TopSanctuaryBar: React.FC<TopSanctuaryBarProps> = ({
  user,
  activeExperience,
  onSelectExperience,
  onOpenSearch,
  onNavigateDomain,
}) => {
  const today = new Date();
  const dateFormatted = today.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const experienceItems: Array<{
    id: ExperienceMode;
    label: string;
    icon: React.ReactNode;
  }> = [
    { id: 'morning', label: 'Morning', icon: <Sun size={12} /> },
    { id: 'creative', label: 'Atelier', icon: <Scissors size={12} /> },
    { id: 'discovery', label: 'Discovery', icon: <Compass size={12} /> },
    { id: 'reflection', label: 'Evening', icon: <Moon size={12} /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-[#EAE4DC] px-4 sm:px-6 py-2.5 transition-all text-left">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            onClick={() => onSelectExperience('morning')}
            className="flex items-baseline gap-2 cursor-pointer group select-none"
          >
            <span className="font-editorial text-[22px] font-semibold text-[#1E1B18] tracking-tight group-hover:text-[#C97D60] transition-colors">
              SAFA
            </span>
            <span
              className="font-persian text-[16px] text-[#7D756C] group-hover:text-[#C97D60] transition-colors"
              dir="rtl"
            >
              صفا
            </span>
          </div>

          <div className="hidden lg:block h-4 w-px bg-[#EAE4DC]" />

          {/* Date & Persian Subtitle */}
          <div className="hidden lg:flex flex-col">
            <span className="text-[11px] font-medium text-[#635E59]">
              {dateFormatted}
            </span>
            <span className="text-[10px] text-[#9E968D] font-persian" dir="rtl">
              صبح بخیر، {user.persianName}
            </span>
          </div>
        </div>

        {/* Center: Tactile Experience Switcher */}
        <div className="flex items-center bg-[#F3EFEA] p-1 rounded-full border border-[#EAE4DC]/80 shadow-2xs">
          {experienceItems.map((item) => {
            const isActive = activeExperience === item.id;
            return (
              <motion.button
                key={item.id}
                whileTap={tapPhysics.subtle}
                onClick={() => onSelectExperience(item.id)}
                className={`relative px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer select-none ${
                  isActive
                    ? 'text-[#1E1B18]'
                    : 'text-[#7D756C] hover:text-[#1E1B18]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="experience-active-pill"
                    className="absolute inset-0 bg-white rounded-full shadow-[0_1px_3px_rgba(30,27,24,0.08)] border border-[#EAE4DC]"
                    transition={springs.tactile}
                  />
                )}
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10 hidden sm:inline">{item.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Right: Quick Search & Avatar */}
        <div className="flex items-center gap-2 shrink-0">
          {onOpenSearch && (
            <motion.button
              whileTap={tapPhysics.iconButton}
              onClick={onOpenSearch}
              aria-label="Search SAFA"
              className="p-2 rounded-full hover:bg-[#F3EFEA] active:bg-[#EAE4DC] text-[#635E59] hover:text-[#1E1B18] transition-colors cursor-pointer border border-transparent hover:border-[#EAE4DC]"
            >
              <Search size={16} />
            </motion.button>
          )}

          {/* User Profile Mini Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#EAE4DC]">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#EAE4DC] shadow-2xs">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#5C6F59] border border-white" />
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-[12px] font-semibold text-[#1E1B18] leading-tight">
                {user.name}
              </span>
              <span className="text-[10px] text-[#9E968D]">Tehran</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
