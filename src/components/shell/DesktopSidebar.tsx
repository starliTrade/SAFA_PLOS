import React from 'react';
import {
  Home,
  Compass,
  Scissors,
  Layers,
  Sparkles,
  Bookmark,
  Target,
  Plus,
  Search,
  Command,
  Sun,
  Moon,
  Sliders,
} from 'lucide-react';
import { NavigationDomain } from '../../navigation/navigationTypes';
import { useNavigation } from '../../navigation/NavigationContext';
import { useTheme } from '../theme/ThemeProvider';
import { UserProfile } from '../../types';

export interface DesktopSidebarProps {
  user: UserProfile;
  activeDomain: NavigationDomain;
  onSelectDomain: (domain: NavigationDomain) => void;
  onOpenQuickCapture: () => void;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  user,
  activeDomain,
  onSelectDomain,
  onOpenQuickCapture,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { openSearch, openCommand } = useNavigation();

  // Normalize
  let currentKey = activeDomain;
  if (activeDomain === 'sanctuary') currentKey = 'home';
  else if (activeDomain === 'horizon') currentKey = 'life';
  else if (activeDomain === 'atelier') currentKey = 'create';
  else if (activeDomain === 'discovery') currentKey = 'media';
  else if (activeDomain === 'memory') currentKey = 'more';

  const navItems = [
    { id: 'home' as NavigationDomain, label: 'Home', persian: 'صفا', icon: Home },
    { id: 'life' as NavigationDomain, label: 'Life', persian: 'زندگی', icon: Compass },
    { id: 'create' as NavigationDomain, label: 'Create', persian: 'کارگاه', icon: Scissors },
    { id: 'media' as NavigationDomain, label: 'Media', persian: 'الهامات', icon: Layers },
    { id: 'discover' as NavigationDomain, label: 'Discover', persian: 'کاوش', icon: Sparkles },
    { id: 'more' as NavigationDomain, label: 'More', persian: 'خاطرات', icon: Bookmark },
  ];

  return (
    <aside
      aria-label="Desktop Navigation Sidebar"
      className="hidden md:flex flex-col w-56 lg:w-60 h-screen sticky top-0 bg-[var(--safa-bg-surface)] border-r border-[var(--safa-border-subtle)] select-none shrink-0 z-30"
    >
      {/* 1. Header: Brand & Identity */}
      <div className="p-4 pb-3 border-b border-[var(--safa-border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[var(--safa-accent-primary-subtle)] border border-[var(--safa-accent-primary)]/20 flex items-center justify-center font-editorial font-bold text-[16px] text-[var(--safa-accent-primary)]">
            S
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-editorial text-[18px] tracking-tight font-semibold text-[var(--safa-content-primary)]">
                SAFA
              </span>
              <span className="font-persian text-[13px] text-[var(--safa-accent-primary)]" dir="rtl">
                صفا
              </span>
            </div>
            <p className="text-[10.5px] text-[var(--safa-content-muted)] tracking-tight -mt-0.5">
              Personal Studio OS
            </p>
          </div>
        </div>
      </div>

      {/* 2. Global Quick Actions (Search & Command & Fast Capture) */}
      <div className="p-3 space-y-2 border-b border-[var(--safa-border-subtle)]">
        <button
          onClick={onOpenQuickCapture}
          className="w-full h-8 px-3 rounded-md bg-[var(--safa-accent-primary)] text-white text-[12px] font-medium flex items-center justify-between shadow-xs hover:bg-[var(--safa-accent-primary-hover)] transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Plus size={14} strokeWidth={2.5} />
            <span>Capture</span>
          </span>
          <span className="text-[10px] opacity-75 font-persian" dir="rtl">
            ثبت سریع
          </span>
        </button>

        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={openSearch}
            className="h-7 px-2 rounded-md bg-[var(--safa-bg-surface-subtle)] hover:bg-[var(--safa-bg-surface-raised)] border border-[var(--safa-border-subtle)] text-[11px] text-[var(--safa-content-secondary)] flex items-center justify-between transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1">
              <Search size={11} />
              <span>Search</span>
            </span>
            <kbd className="text-[9px] font-mono text-[var(--safa-content-muted)]">⌘K</kbd>
          </button>

          <button
            onClick={openCommand}
            className="h-7 px-2 rounded-md bg-[var(--safa-bg-surface-subtle)] hover:bg-[var(--safa-bg-surface-raised)] border border-[var(--safa-border-subtle)] text-[11px] text-[var(--safa-content-secondary)] flex items-center justify-between transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1">
              <Command size={11} />
              <span>Command</span>
            </span>
            <kbd className="text-[9px] font-mono text-[var(--safa-content-muted)]">⌘J</kbd>
          </button>
        </div>
      </div>

      {/* 3. Primary Navigation Links */}
      <div className="flex-1 overflow-y-auto p-2 space-y-0.5 custom-scrollbar">
        <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--safa-content-muted)]">
          Navigation
        </div>

        {navItems.map((item) => {
          const isActive = currentKey === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onSelectDomain(item.id)}
              className={`w-full h-8.5 px-2.5 rounded-md text-[13px] flex items-center justify-between transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[var(--safa-accent-primary-subtle)] text-[var(--safa-accent-primary)] font-semibold'
                  : 'text-[var(--safa-content-secondary)] hover:text-[var(--safa-content-primary)] hover:bg-[var(--safa-bg-surface-raised)]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
                <span>{item.label}</span>
              </div>
              <span className="font-persian text-[11px] opacity-70" dir="rtl">
                {item.persian}
              </span>
            </button>
          );
        })}
      </div>

      {/* 4. Bottom Footer: User Profile & Preferences */}
      <div className="p-3 border-t border-[var(--safa-border-subtle)] bg-[var(--safa-bg-surface-subtle)]/40 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={user.avatarUrl}
            alt={user.name}
            referrerPolicy="no-referrer"
            className="w-7 h-7 rounded-full object-cover border border-[var(--safa-border-default)] shrink-0"
          />
          <div className="min-w-0">
            <p className="text-[12px] font-medium text-[var(--safa-content-primary)] truncate">
              {user.name}
            </p>
            <p className="text-[10px] text-[var(--safa-content-tertiary)] truncate">
              {user.city}
            </p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="p-1.5 rounded-md hover:bg-[var(--safa-bg-surface-subtle)] text-[var(--safa-content-secondary)] hover:text-[var(--safa-content-primary)] transition-colors cursor-pointer shrink-0"
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>
    </aside>
  );
};
