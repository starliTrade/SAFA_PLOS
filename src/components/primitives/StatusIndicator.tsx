import React from 'react';

export interface StatusIndicatorProps {
  status: 'active' | 'in_progress' | 'completed' | 'archived' | 'draft' | 'idle';
  size?: 'sm' | 'md';
  pulse?: boolean;
  className?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'sm',
  pulse = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
  };

  const statusColors = {
    active: 'bg-[var(--safa-accent-primary)]',
    in_progress: 'bg-[var(--safa-accent-gold)]',
    completed: 'bg-[var(--safa-accent-secondary)]',
    archived: 'bg-[var(--safa-content-muted)]',
    draft: 'bg-[var(--safa-content-tertiary)]',
    idle: 'bg-[var(--safa-border-strong)]',
  };

  return (
    <span className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      {pulse && (
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping ${statusColors[status]}`}
        />
      )}
      <span className={`relative inline-flex rounded-full ${sizeClasses[size]} ${statusColors[status]}`} />
    </span>
  );
};
