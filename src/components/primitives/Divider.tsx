import React from 'react';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  className = '',
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        className={`w-px h-full bg-[var(--safa-border-subtle)] shrink-0 ${className}`}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  return (
    <div
      className={`h-px w-full bg-[var(--safa-border-subtle)] shrink-0 ${className}`}
      role="separator"
      aria-orientation="horizontal"
    />
  );
};
