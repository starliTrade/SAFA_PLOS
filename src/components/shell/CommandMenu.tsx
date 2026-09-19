import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Command,
  Search,
  Plus,
  Compass,
  Scissors,
  Layers,
  Sparkles,
  Bookmark,
  Sun,
  Moon,
  CheckSquare,
  ArrowRight,
  SunMedium,
  Feather,
  Palette,
  X,
} from 'lucide-react';
import { useNavigation } from '../../navigation/NavigationContext';
import { useTheme } from '../theme/ThemeProvider';
import { springs, eases } from '../../theme/interactions';

interface ActionItem {
  id: string;
  label: string;
  persianLabel?: string;
  category: 'Create' | 'Navigation' | 'Experience' | 'System';
  icon: React.ReactNode;
  keywords: string[];
  shortcut?: string;
  action: () => void;
}

export const CommandMenu: React.FC = () => {
  const {
    isCommandOpen,
    closeCommand,
    navigateToDomain,
    navigateToExperience,
    openQuickCapture,
    openSearch,
  } = useNavigation();
  const { theme, toggleTheme } = useTheme();

  const [query, setQuery] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keydown listener for Cmd+J
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        if (isCommandOpen) {
          closeCommand();
        } else {
          // Open command
          const event = new CustomEvent('safa-open-command');
          window.dispatchEvent(event);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandOpen, closeCommand]);

  useEffect(() => {
    if (isCommandOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isCommandOpen]);

  const actions: ActionItem[] = useMemo(
    () => [
      // 1. Create Actions
      {
        id: 'create-capture',
        label: 'Quick Capture / Note',
        persianLabel: 'ثبت سریع یادداشت',
        category: 'Create',
        icon: <Plus size={15} className="text-[var(--safa-accent-primary)]" />,
        keywords: ['capture', 'note', 'idea', 'thought', 'quick', 'add'],
        shortcut: 'C',
        action: () => {
          closeCommand();
          openQuickCapture();
        },
      },
      {
        id: 'create-intention',
        label: 'Add Daily Intention',
        persianLabel: 'افزودن نیت روزانه',
        category: 'Create',
        icon: <CheckSquare size={15} className="text-[var(--safa-accent-primary)]" />,
        keywords: ['intention', 'task', 'goal', 'today', 'todo'],
        action: () => {
          closeCommand();
          navigateToDomain('life');
        },
      },
      {
        id: 'create-project',
        label: 'New Fashion Capsule Project',
        persianLabel: 'ایجاد کپسول جدید',
        category: 'Create',
        icon: <Scissors size={15} className="text-[var(--safa-accent-primary)]" />,
        keywords: ['project', 'capsule', 'fashion', 'collection', 'atelier', 'create'],
        action: () => {
          closeCommand();
          navigateToDomain('create');
        },
      },
      {
        id: 'create-inspiration',
        label: 'Add Sensorial Inspiration',
        persianLabel: 'ثبت الهام حسی',
        category: 'Create',
        icon: <Sparkles size={15} className="text-[var(--safa-accent-secondary)]" />,
        keywords: ['inspiration', 'photo', 'fabric', 'textile', 'swatch', 'color'],
        action: () => {
          closeCommand();
          navigateToDomain('media');
        },
      },

      // 2. Navigation Actions
      {
        id: 'nav-home',
        label: 'Go to Home Sanctuary',
        persianLabel: 'خانه و حضور روزانه',
        category: 'Navigation',
        icon: <SunMedium size={15} className="text-[var(--safa-accent-primary)]" />,
        keywords: ['home', 'sanctuary', 'overview', 'dashboard', 'today'],
        shortcut: 'G H',
        action: () => {
          closeCommand();
          navigateToDomain('home');
        },
      },
      {
        id: 'nav-life',
        label: 'Go to Life & Horizons',
        persianLabel: 'زندگی و افق‌ها',
        category: 'Navigation',
        icon: <Compass size={15} className="text-[var(--safa-accent-turquoise)]" />,
        keywords: ['life', 'horizon', 'milestones', 'wellness', 'rituals'],
        shortcut: 'G L',
        action: () => {
          closeCommand();
          navigateToDomain('life');
        },
      },
      {
        id: 'nav-create',
        label: 'Go to Atelier Workspace',
        persianLabel: 'کارگاه طراحی و دوخت',
        category: 'Navigation',
        icon: <Scissors size={15} className="text-[var(--safa-accent-primary)]" />,
        keywords: ['atelier', 'create', 'designs', 'silhouettes', 'draping', 'lookbook'],
        shortcut: 'G C',
        action: () => {
          closeCommand();
          navigateToDomain('create');
        },
      },
      {
        id: 'nav-media',
        label: 'Go to Media Universe',
        persianLabel: 'جهان الهامات و منسوجات',
        category: 'Navigation',
        icon: <Layers size={15} className="text-[var(--safa-accent-gold)]" />,
        keywords: ['media', 'inspiration', 'textiles', 'fabrics', 'palettes', 'bazaar'],
        shortcut: 'G M',
        action: () => {
          closeCommand();
          navigateToDomain('media');
        },
      },
      {
        id: 'nav-more',
        label: 'Go to Memories & Reflections',
        persianLabel: 'آرشیو خاطرات و تامل',
        category: 'Navigation',
        icon: <Bookmark size={15} className="text-[var(--safa-accent-secondary)]" />,
        keywords: ['more', 'memories', 'reflections', 'profile', 'archive'],
        shortcut: 'G R',
        action: () => {
          closeCommand();
          navigateToDomain('more');
        },
      },

      // 3. Experience Sessions
      {
        id: 'exp-morning',
        label: 'Begin Morning Centering Ritual',
        persianLabel: 'آغاز آیین صبحگاهی',
        category: 'Experience',
        icon: <SunMedium size={15} className="text-[var(--safa-accent-gold)]" />,
        keywords: ['morning', 'centering', 'meditation', 'presence', 'ritual'],
        action: () => {
          closeCommand();
          navigateToExperience('morning');
        },
      },
      {
        id: 'exp-creative',
        label: 'Enter Atelier Creative Flow',
        persianLabel: 'ورود به جریان خلاق کارگاه',
        category: 'Experience',
        icon: <Feather size={15} className="text-[var(--safa-accent-primary)]" />,
        keywords: ['creative', 'session', 'focus', 'designing', 'draping'],
        action: () => {
          closeCommand();
          navigateToExperience('creative');
        },
      },
      {
        id: 'exp-reflection',
        label: 'Begin Evening Reflection',
        persianLabel: 'آغاز بازتاب شامگاهی',
        category: 'Experience',
        icon: <Bookmark size={15} className="text-[var(--safa-accent-secondary)]" />,
        keywords: ['evening', 'reflection', 'stillness', 'gratitude', 'memory'],
        action: () => {
          closeCommand();
          navigateToExperience('reflection');
        },
      },

      // 4. System & Tools
      {
        id: 'search-content',
        label: 'Search Studio Content...',
        persianLabel: 'جستجوی تمام محتوا',
        category: 'System',
        icon: <Search size={15} className="text-[var(--safa-content-tertiary)]" />,
        keywords: ['search', 'find', 'content', 'lookup'],
        shortcut: '⌘K',
        action: () => {
          closeCommand();
          openSearch();
        },
      },
      {
        id: 'sys-theme',
        label: `Switch Theme to ${theme === 'dark' ? 'Warm Paper Light' : 'Obsidian Dark'}`,
        persianLabel: theme === 'dark' ? 'حالت روشن' : 'حالت تاریک',
        category: 'System',
        icon: theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />,
        keywords: ['theme', 'dark', 'light', 'appearance', 'mode', 'color'],
        action: () => {
          toggleTheme();
          closeCommand();
        },
      },
    ],
    [
      theme,
      toggleTheme,
      closeCommand,
      openQuickCapture,
      openSearch,
      navigateToDomain,
      navigateToExperience,
    ]
  );

  const filteredActions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        a.persianLabel?.includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.keywords.some((k) => k.includes(q))
    );
  }, [actions, query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filteredActions.length > 0 ? (prev + 1) % filteredActions.length : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filteredActions.length > 0
          ? (prev - 1 + filteredActions.length) % filteredActions.length
          : 0
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        filteredActions[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      closeCommand();
    }
  };

  return (
    <AnimatePresence>
      {isCommandOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 pb-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={eases.fast}
            onClick={closeCommand}
            className="fixed inset-0 bg-black/50 dark:bg-black/80 backdrop-blur-xs"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={springs.snappy}
            onKeyDown={handleKeyDown}
            className="relative w-full max-w-lg bg-[var(--safa-bg-surface)] rounded-2xl border border-[var(--safa-border-subtle)] shadow-[var(--safa-shadow-floating)] overflow-hidden flex flex-col max-h-[75vh]"
          >
            {/* Header Input */}
            <div className="flex items-center px-4 py-3 border-b border-[var(--safa-border-subtle)] bg-[var(--safa-bg-surface-subtle)]/40 gap-3">
              <Command size={17} className="text-[var(--safa-accent-primary)] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="What can I do? (Type to filter commands...)"
                className="w-full bg-transparent text-[13.5px] text-[var(--safa-content-primary)] placeholder-[var(--safa-content-muted)] outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-[var(--safa-content-muted)] hover:text-[var(--safa-content-primary)]"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5 max-h-[380px] custom-scrollbar">
              {filteredActions.length === 0 ? (
                <div className="p-6 text-center text-[12.5px] text-[var(--safa-content-secondary)]">
                  No commands found matching "{query}"
                </div>
              ) : (
                filteredActions.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => item.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`px-3 py-2 rounded-lg flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[var(--safa-accent-primary-subtle)] text-[var(--safa-content-primary)]'
                          : 'hover:bg-[var(--safa-bg-surface-raised)] text-[var(--safa-content-secondary)]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-6 h-6 rounded-md bg-[var(--safa-bg-surface-subtle)] border border-[var(--safa-border-subtle)] flex items-center justify-center shrink-0">
                          {item.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-medium text-[var(--safa-content-primary)] truncate">
                              {item.label}
                            </span>
                            {item.persianLabel && (
                              <span
                                className="font-persian text-[11px] text-[var(--safa-content-tertiary)] opacity-80"
                                dir="rtl"
                              >
                                {item.persianLabel}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-[var(--safa-bg-surface-subtle)] text-[var(--safa-content-muted)]">
                          {item.category}
                        </span>
                        {item.shortcut && (
                          <kbd className="text-[10px] font-mono text-[var(--safa-content-muted)] bg-[var(--safa-bg-surface-subtle)] px-1.5 py-0.5 rounded-sm">
                            {item.shortcut}
                          </kbd>
                        )}
                        <ArrowRight size={12} className="text-[var(--safa-accent-primary)] opacity-70" />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-[var(--safa-border-subtle)] bg-[var(--safa-bg-surface-subtle)]/30 flex items-center justify-between text-[11px] text-[var(--safa-content-muted)]">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Run</span>
                <span>ESC Close</span>
              </div>
              <span className="font-editorial text-[12px] text-[var(--safa-content-tertiary)]">
                SAFA Command
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
