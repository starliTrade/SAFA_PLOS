import React from 'react';
import { motion } from 'motion/react';
import { springs } from '../../theme/interactions';

export interface SegmentItem<T extends string = string> {
  id: T;
  label: string;
  persianLabel?: string;
  icon?: React.ReactNode;
  count?: number;
}

export interface SegmentedControlProps<T extends string = string> {
  items: SegmentItem<T>[];
  activeId: T;
  onChange: (id: T) => void;
  size?: 'sm' | 'md';
  className?: string;
}

export function SegmentedControl<T extends string = string>({
  items,
  activeId,
  onChange,
  size = 'sm',
  className = '',
}: SegmentedControlProps<T>) {
  const sizeClasses = {
    sm: 'p-0.5 text-[12px] min-h-[32px]',
    md: 'p-1 text-[13px] min-h-[38px]',
  };

  const itemSizeClasses = {
    sm: 'px-2.5 py-1 gap-1.5',
    md: 'px-3 py-1.5 gap-2',
  };

  return (
    <div
      role="tablist"
      className={`inline-flex items-center rounded-lg bg-[var(--safa-bg-surface-subtle)] border border-[var(--safa-border-subtle)] max-w-full overflow-x-auto scrollbar-none ${sizeClasses[size]} ${className}`}
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(item.id)}
            className={`relative inline-flex items-center justify-center rounded-md font-medium whitespace-nowrap transition-colors cursor-pointer select-none focus-visible:outline-hidden shrink-0 ${itemSizeClasses[size]} ${
              isActive
                ? 'text-[var(--safa-content-primary)] font-semibold'
                : 'text-[var(--safa-content-secondary)] hover:text-[var(--safa-content-primary)]'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="segmented-pill-active"
                className="absolute inset-0 bg-[var(--safa-bg-surface)] rounded-md border border-[var(--safa-border-subtle)] shadow-xs"
                transition={springs.snappy}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {item.icon}
              <span>{item.label}</span>
              {item.persianLabel && (
                <span className="font-persian text-[0.88em] opacity-75 hidden sm:inline" dir="rtl">
                  {item.persianLabel}
                </span>
              )}
              {item.count !== undefined && (
                <span
                  className={`text-[10px] px-1 rounded-sm ${
                    isActive
                      ? 'bg-[var(--safa-bg-surface-subtle)] text-[var(--safa-content-primary)] font-bold'
                      : 'bg-transparent text-[var(--safa-content-muted)]'
                  }`}
                >
                  {item.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
