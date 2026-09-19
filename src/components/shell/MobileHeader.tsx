import React from 'react';
import { Search, Command, Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';
import { useNavigation } from '../../navigation/NavigationContext';
import { UserProfile } from '../../types';
import { IconButton } from '../primitives';

export interface MobileHeaderProps {
  user: UserProfile;
  title?: string;
  persianTitle?: string;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  user,
  title,
  persianTitle,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { openSearch, openCommand, activeExperience, exitExperience } = useNavigation();

  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--safa-bg-canvas)]/90 backdrop-blur-md border-b border-[var(--safa-border-subtle)] md:hidden">
      <div className="flex items-center justify-between h-13 px-4 pt-safe">
        {/* Left: Brand or Active Experience Context */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-editorial text-[19px] tracking-tight font-medium text-[var(--safa-content-primary)]">
              SAFA
            </span>
            <span className="font-persian text-[13px] text-[var(--safa-accent-primary)] font-normal" dir="rtl">
              صفا
            </span>
          </div>

          {activeExperience && (
            <div className="flex items-center gap-1.5 pl-2 border-l border-[var(--safa-border-subtle)]">
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[var(--safa-accent-primary-subtle)] text-[var(--safa-accent-primary)] flex items-center gap-1">
                <Sparkles size={10} />
                <span className="capitalize">{activeExperience}</span>
              </span>
              <button
                onClick={exitExperience}
                className="text-[11px] text-[var(--safa-content-muted)] hover:text-[var(--safa-content-primary)] cursor-pointer"
              >
                Exit
              </button>
            </div>
          )}
        </div>

        {/* Right Actions: Search, Command, Theme */}
        <div className="flex items-center gap-1 shrink-0">
          <IconButton
            icon={<Search size={16} />}
            label="Search SAFA (Cmd+K)"
            size="sm"
            onClick={openSearch}
          />
          <IconButton
            icon={<Command size={15} />}
            label="Command Menu (Cmd+J)"
            size="sm"
            onClick={openCommand}
          />
          <IconButton
            icon={theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            label={theme === 'dark' ? 'Switch to Light theme' : 'Switch to Dark theme'}
            size="sm"
            onClick={toggleTheme}
          />
          <div
            className="w-7 h-7 rounded-full overflow-hidden border border-[var(--safa-border-default)] shrink-0 ml-1"
            title={user.name}
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
