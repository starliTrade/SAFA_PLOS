import React from 'react';
import { motion } from 'motion/react';
import { Search, Sun, Scissors, Moon, Compass, Sparkles } from 'lucide-react';
import { UserProfile } from '../../types';
import { springs, tapPhysics } from '../../theme/interactions';
import { ExperienceMode } from '../../navigation/navigationTypes';
import { ThemeToggle } from '../theme/ThemeToggle';

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
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 dark:bg-[#13110F]/90 backdrop-blur-xl border-b border-[#EAE4DC] dark:border-[rgba(250,245,238,0.08)] px-4 sm:px-6 py-2.5 transition-colors text-left">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            onClick={() => onSelectExperience('morning')}
            className="flex items-baseline gap-2 cursor-pointer group select-none"
          >
            <span className="font-editorial text-[22px] font-semibold text-[#1E1B18] dark:text-[#FAF5EE] tracking-tight group-hover:text-[#C97D60] dark:group-hover:text-[#D9886C] transition-colors">
              SAFA
            </span>
            <span
              className="font-persian text-[16px] text-[#7D756C] dark:text-[#9E968D] group-hover:text-[#C97D60] dark:group-hover:text-[#D9886C] transition-colors"
              dir="rtl"
            >
              صفا
            </span>
          </div>

          <div className="hidden lg:block h-4 w-px bg-[#EAE4DC] dark:bg-[rgba(250,245,238,0.12)]" />

          {/* Date & Persian Subtitle */}
          <div className="hidden lg:flex flex-col">
            <span className="text-[11px] font-medium text-[#635E59] dark:text-[#D0C7BC]">
              {dateFormatted}
            </span>
            <span className="text-[10px] text-[#9E968D] dark:text-[#7D756C] font-persian" dir="rtl">
              صبح بخیر، {user.persianName}
            </span>
          </div>
        </div>

        {/* Center: Tactile Experience Switcher */}
        <div className="flex items-center bg-[#F3EFEA] dark:bg-[#191614] p-1 rounded-full border border-[#EAE4DC]/80 dark:border-[rgba(250,245,238,0.1)] shadow-2xs">
          {experienceItems.map((item) => {
            const isActive = activeExperience === item.id;
            return (
              <motion.button
                key={item.id}
                whileTap={tapPhysics.subtle}
                onClick={() => onSelectExperience(item.id)}
                className={`relative px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer select-none ${
                  isActive
                    ? 'text-[#1E1B18] dark:text-[#FAF5EE]'
                    : 'text-[#7D756C] dark:text-[#9E968D] hover:text-[#1E1B18] dark:hover:text-[#FAF5EE]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="experience-active-pill"
                    className="absolute inset-0 bg-white dark:bg-[#2C2723] rounded-full shadow-[0_1px_3px_rgba(30,27,24,0.08)] dark:shadow-[0_1px_4px_rgba(0,0,0,0.5)] border border-[#EAE4DC] dark:border-[rgba(250,245,238,0.14)]"
                    transition={springs.tactile}
                  />
                )}
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10 hidden sm:inline">{item.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Right: Theme Toggle, Quick Search & Profile */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Quick Search Spotlight Button */}
          {onOpenSearch && (
            <motion.button
              whileTap={tapPhysics.iconButton}
              onClick={onOpenSearch}
              aria-label="Search SAFA (Cmd+K)"
              title="Search (Cmd+K)"
              className="p-2 rounded-full hover:bg-[#F3EFEA] dark:hover:bg-[#2C2723] active:bg-[#EAE4DC] text-[#635E59] dark:text-[#D0C7BC] hover:text-[#1E1B18] dark:hover:text-[#FAF5EE] transition-colors cursor-pointer border border-transparent hover:border-[#EAE4DC] dark:hover:border-[rgba(250,245,238,0.1)]"
            >
              <Search size={16} />
            </motion.button>
          )}

          {/* User Profile Mini Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#EAE4DC] dark:border-[rgba(250,245,238,0.12)]">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#EAE4DC] dark:border-[rgba(250,245,238,0.15)] shadow-2xs">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#5C6F59] dark:bg-[#72896E] border border-white dark:border-[#191614]" />
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-[12px] font-semibold text-[#1E1B18] dark:text-[#FAF5EE] leading-tight">
                {user.name}
              </span>
              <span className="text-[10px] text-[#9E968D] dark:text-[#7D756C]">Tehran Atelier</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export type { ExperienceMode };
