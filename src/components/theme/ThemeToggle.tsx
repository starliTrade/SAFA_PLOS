import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme, ThemeMode } from './ThemeProvider';
import { tapPhysics, springs } from '../../theme/interactions';

export interface ThemeToggleProps {
  variant?: 'minimal' | 'segmented';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'minimal',
  className = '',
}) => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  if (variant === 'segmented') {
    const options: Array<{ mode: ThemeMode; label: string; icon: React.ReactNode }> = [
      { mode: 'light', label: 'Light', icon: <Sun size={13} /> },
      { mode: 'system', label: 'Auto', icon: <Monitor size={13} /> },
      { mode: 'dark', label: 'Dark', icon: <Moon size={13} /> },
    ];

    return (
      <div
        className={`inline-flex items-center p-0.5 rounded-full bg-[#F5F1EB] dark:bg-[#2C2723] border border-[#EAE4DC] dark:border-[rgba(250,245,238,0.12)] ${className}`}
        role="group"
        aria-label="Theme selection"
      >
        {options.map((opt) => {
          const isActive = theme === opt.mode;
          return (
            <motion.button
              key={opt.mode}
              whileTap={tapPhysics.subtle}
              onClick={() => setTheme(opt.mode)}
              aria-label={`Set theme to ${opt.label}`}
              aria-pressed={isActive}
              className={`relative px-2.5 py-1 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer select-none ${
                isActive
                  ? 'text-[#1E1B18] dark:text-[#FAF5EE]'
                  : 'text-[#7D756C] dark:text-[#9E968D] hover:text-[#1E1B18] dark:hover:text-[#FAF5EE]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="theme-toggle-active-pill"
                  className="absolute inset-0 bg-white dark:bg-[#191614] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.06)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.4)] border border-[#EAE4DC] dark:border-[rgba(250,245,238,0.15)]"
                  transition={springs.tactile}
                />
              )}
              <span className="relative z-10">{opt.icon}</span>
              <span className="relative z-10 hidden sm:inline">{opt.label}</span>
            </motion.button>
          );
        })}
      </div>
    );
  }

  // Minimal single-button toggle
  return (
    <motion.button
      whileTap={tapPhysics.iconButton}
      onClick={toggleTheme}
      aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
      title={`Current theme: ${theme} (${resolvedTheme})`}
      className={`relative w-8 h-8 rounded-full bg-[#F5F1EB] dark:bg-[#2C2723] hover:bg-[#EAE4DC] dark:hover:bg-[#3D3833] text-[#635E59] dark:text-[#D0C7BC] hover:text-[#1E1B18] dark:hover:text-[#FAF5EE] flex items-center justify-center transition-colors cursor-pointer border border-[#EAE4DC] dark:border-[rgba(250,245,238,0.12)] shrink-0 ${className}`}
    >
      <motion.div
        key={resolvedTheme}
        initial={{ rotate: -30, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        exit={{ rotate: 30, opacity: 0, scale: 0.8 }}
        transition={springs.tactile}
      >
        {resolvedTheme === 'light' ? <Sun size={15} /> : <Moon size={15} />}
      </motion.div>
    </motion.button>
  );
};
