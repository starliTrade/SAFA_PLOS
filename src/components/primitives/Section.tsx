import React from 'react';

export interface SectionProps {
  title?: React.ReactNode;
  persianTitle?: string;
  description?: string;
  action?: React.ReactNode;
  border?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({
  title,
  persianTitle,
  description,
  action,
  border = false,
  className = '',
  children,
}) => {
  const hasHeader = Boolean(title || persianTitle || action);

  return (
    <section
      className={`w-full ${
        border
          ? 'rounded-xl border border-[var(--safa-border-subtle)] bg-[var(--safa-bg-surface)] p-3.5 sm:p-5'
          : 'space-y-3'
      } ${className}`}
    >
      {hasHeader && (
        <div className="flex items-center justify-between gap-3 pb-1">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              {title && (
                <h2 className="text-[14px] sm:text-[15px] font-semibold text-[var(--safa-content-primary)] tracking-tight">
                  {title}
                </h2>
              )}
              {persianTitle && (
                <span
                  className="font-persian text-[12px] text-[var(--safa-content-tertiary)] opacity-80"
                  dir="rtl"
                >
                  {persianTitle}
                </span>
              )}
            </div>
            {description && (
              <p className="text-[12px] text-[var(--safa-content-secondary)] mt-0.5">
                {description}
              </p>
            )}
          </div>
          {action && <div className="shrink-0 flex items-center">{action}</div>}
        </div>
      )}
      <div>{children}</div>
    </section>
  );
};
