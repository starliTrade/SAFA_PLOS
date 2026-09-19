import React from 'react';
import { motion } from 'motion/react';
import { tapPhysics } from '../../theme/interactions';

export interface ListItemProps {
  id?: string;
  leading?: React.ReactNode;
  title: React.ReactNode;
  persianTitle?: string;
  subtitle?: React.ReactNode;
  trailing?: React.ReactNode;
  actions?: React.ReactNode; // Contextual actions shown on hover or mobile actions
  onClick?: () => void;
  selected?: boolean;
  active?: boolean;
  disabled?: boolean;
  density?: 'compact' | 'default' | 'comfortable';
  className?: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  id,
  leading,
  title,
  persianTitle,
  subtitle,
  trailing,
  actions,
  onClick,
  selected = false,
  active = false,
  disabled = false,
  density = 'default',
  className = '',
}) => {
  const densityClasses = {
    compact: 'py-2 px-2.5 sm:px-3 text-[13px] gap-2.5',
    default: 'py-2.5 sm:py-3 px-3 sm:px-3.5 text-[13.5px] gap-3',
    comfortable: 'py-3.5 px-3.5 sm:px-4 text-[14px] gap-3.5',
  };

  const isInteractive = Boolean(onClick) && !disabled;

  return (
    <motion.div
      id={id}
      role={isInteractive ? 'button' : 'listitem'}
      tabIndex={isInteractive ? 0 : undefined}
      whileTap={isInteractive ? tapPhysics.subtle : undefined}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(e) => {
        if (isInteractive && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`group relative flex items-center justify-between transition-colors outline-hidden ${
        densityClasses[density]
      } ${
        isInteractive ? 'cursor-pointer select-none' : ''
      } ${
        selected
          ? 'bg-[var(--safa-accent-primary-subtle)]/70 text-[var(--safa-content-primary)]'
          : active
          ? 'bg-[var(--safa-bg-surface-raised)] text-[var(--safa-content-primary)]'
          : isInteractive
          ? 'hover:bg-[var(--safa-bg-surface-raised)] active:bg-[var(--safa-bg-surface-subtle)]'
          : ''
      } ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`}
    >
      {/* Leading Icon / Thumbnail / Checkbox */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {leading && <div className="shrink-0 flex items-center">{leading}</div>}

        {/* Content Block */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-[var(--safa-content-primary)] truncate">
              {title}
            </span>
            {persianTitle && (
              <span
                className="font-persian text-[0.88em] text-[var(--safa-content-tertiary)] shrink-0"
                dir="rtl"
              >
                {persianTitle}
              </span>
            )}
          </div>
          {subtitle && (
            <div className="text-[12px] text-[var(--safa-content-secondary)] truncate mt-0.5">
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {/* Trailing Metadata & Contextual Actions */}
      <div className="flex items-center gap-2 shrink-0 ml-2">
        {trailing && <div className="text-[12px] text-[var(--safa-content-tertiary)]">{trailing}</div>}
        {actions && (
          <div className="opacity-80 sm:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity flex items-center gap-1">
            {actions}
          </div>
        )}
      </div>
    </motion.div>
  );
};
