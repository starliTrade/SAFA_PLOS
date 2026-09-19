import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { tapPhysics } from '../../theme/interactions';

export interface IconButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  icon: React.ReactNode;
  label: string; // Accessible aria-label
  variant?: 'ghost' | 'subtle' | 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
  className?: string;
  badge?: number | string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  variant = 'ghost',
  size = 'md',
  active = false,
  className = '',
  badge,
  ...props
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 min-w-[32px]',
    md: 'w-10 h-10 min-w-[40px] sm:w-9 sm:h-9 sm:min-w-[36px]',
    lg: 'w-11 h-11 min-w-[44px]',
  };

  const variantClasses = {
    ghost: active
      ? 'bg-[var(--safa-bg-surface-subtle)] text-[var(--safa-accent-primary)]'
      : 'text-[var(--safa-content-secondary)] hover:text-[var(--safa-content-primary)] hover:bg-[var(--safa-bg-surface-subtle)]',
    subtle: active
      ? 'bg-[var(--safa-accent-primary-subtle)] text-[var(--safa-accent-primary)] border border-[var(--safa-accent-primary)]/20'
      : 'bg-[var(--safa-bg-surface-subtle)] text-[var(--safa-content-secondary)] hover:text-[var(--safa-content-primary)] border border-[var(--safa-border-subtle)]',
    primary:
      'bg-[var(--safa-accent-primary)] text-white hover:bg-[var(--safa-accent-primary-hover)] shadow-xs',
    secondary:
      'bg-[var(--safa-accent-secondary)] text-white hover:bg-[var(--safa-accent-secondary-hover)]',
    outline: active
      ? 'border-[var(--safa-accent-primary)] text-[var(--safa-accent-primary)] bg-[var(--safa-accent-primary-subtle)]'
      : 'border border-[var(--safa-border-default)] text-[var(--safa-content-secondary)] hover:border-[var(--safa-border-strong)] hover:text-[var(--safa-content-primary)]',
  };

  return (
    <motion.button
      whileTap={tapPhysics.iconButton}
      aria-label={label}
      title={label}
      className={`relative inline-flex items-center justify-center rounded-lg transition-colors cursor-pointer select-none focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--safa-border-focus)] shrink-0 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon}
      {badge !== undefined && (
        <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-[var(--safa-accent-primary)] text-white text-[10px] font-bold flex items-center justify-center leading-none">
          {badge}
        </span>
      )}
    </motion.button>
  );
};
