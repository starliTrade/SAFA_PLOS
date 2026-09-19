import React from 'react';

export interface BadgeProps {
  variant?: 'default' | 'primary' | 'secondary' | 'gold' | 'turquoise' | 'subtle' | 'outline';
  size?: 'xs' | 'sm' | 'md';
  children: React.ReactNode;
  persianText?: string;
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'sm',
  children,
  persianText,
  className = '',
  dot = false,
}) => {
  const sizeClasses = {
    xs: 'text-[10px] px-1.5 py-0.5 gap-1',
    sm: 'text-[11px] px-2 py-0.5 gap-1.5 font-medium',
    md: 'text-[12px] px-2.5 py-1 gap-1.5 font-medium',
  };

  const variantClasses = {
    default: 'bg-[var(--safa-bg-surface-subtle)] text-[var(--safa-content-secondary)] border border-[var(--safa-border-subtle)]',
    primary: 'bg-[var(--safa-accent-primary-subtle)] text-[var(--safa-accent-primary)] border border-[var(--safa-accent-primary)]/20',
    secondary: 'bg-[var(--safa-accent-secondary-subtle)] text-[var(--safa-accent-secondary)] border border-[var(--safa-accent-secondary)]/20',
    gold: 'bg-[var(--safa-accent-gold-subtle)] text-[var(--safa-accent-gold-content)] border border-[var(--safa-accent-gold)]/20',
    turquoise: 'bg-[var(--safa-accent-turquoise-subtle)] text-[var(--safa-accent-turquoise)] border border-[var(--safa-accent-turquoise)]/20',
    subtle: 'bg-transparent text-[var(--safa-content-muted)] border border-[var(--safa-border-subtle)]',
    outline: 'bg-transparent text-[var(--safa-content-secondary)] border border-[var(--safa-border-default)]',
  };

  const dotColors = {
    default: 'bg-[var(--safa-content-muted)]',
    primary: 'bg-[var(--safa-accent-primary)]',
    secondary: 'bg-[var(--safa-accent-secondary)]',
    gold: 'bg-[var(--safa-accent-gold)]',
    turquoise: 'bg-[var(--safa-accent-turquoise)]',
    subtle: 'bg-[var(--safa-content-muted)]',
    outline: 'bg-[var(--safa-content-secondary)]',
  };

  return (
    <span
      className={`inline-flex items-center rounded-md shrink-0 select-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      <span className="truncate">{children}</span>
      {persianText && (
        <span className="font-persian text-[0.9em] opacity-80" dir="rtl">
          {persianText}
        </span>
      )}
    </span>
  );
};
