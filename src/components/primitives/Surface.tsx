import React from 'react';

export type SurfaceLevel = 'canvas' | 'surface' | 'raised' | 'floating' | 'overlay' | 'inset' | 'subtle';

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: SurfaceLevel;
  interactive?: boolean;
  border?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  children?: React.ReactNode;
}

export const Surface: React.FC<SurfaceProps> = ({
  level = 'surface',
  interactive = false,
  border = true,
  rounded = 'lg',
  className = '',
  children,
  ...props
}) => {
  const levelClasses: Record<SurfaceLevel, string> = {
    canvas: 'bg-[var(--safa-bg-canvas)]',
    surface: 'bg-[var(--safa-bg-surface)]',
    raised: 'bg-[var(--safa-bg-surface-raised)] shadow-[var(--safa-shadow-subtle)]',
    floating: 'bg-[var(--safa-bg-surface)] shadow-[var(--safa-shadow-floating)]',
    overlay: 'bg-[var(--safa-bg-overlay)] backdrop-blur-md',
    inset: 'bg-[var(--safa-bg-surface-inset)]',
    subtle: 'bg-[var(--safa-bg-surface-subtle)]',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-md',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
    full: 'rounded-full',
  };

  const borderClass = border
    ? 'border border-[var(--safa-border-subtle)]'
    : 'border-0';

  const interactiveClass = interactive
    ? 'cursor-pointer transition-all duration-150 hover:border-[var(--safa-border-default)] hover:bg-[var(--safa-bg-surface-raised)] active:scale-[0.99]'
    : '';

  return (
    <div
      className={`${levelClasses[level]} ${roundedClasses[rounded]} ${borderClass} ${interactiveClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
