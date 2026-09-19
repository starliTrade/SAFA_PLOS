import React from 'react';

export interface PageHeaderProps {
  eyebrow?: string;
  persianEyebrow?: string;
  title: string;
  persianTitle?: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  persianEyebrow,
  title,
  persianTitle,
  description,
  actions,
  breadcrumbs,
  className = '',
}) => {
  return (
    <div
      className={`w-full pb-3.5 sm:pb-4 border-b border-[var(--safa-border-subtle)] flex flex-col sm:flex-row sm:items-end justify-between gap-3 ${className}`}
    >
      <div className="space-y-1 min-w-0">
        {breadcrumbs ? (
          <div>{breadcrumbs}</div>
        ) : eyebrow ? (
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--safa-content-tertiary)]">
            <span>{eyebrow}</span>
            {persianEyebrow && (
              <span className="font-persian lowercase font-normal opacity-75" dir="rtl">
                {persianEyebrow}
              </span>
            )}
          </div>
        ) : null}

        <div className="flex items-baseline gap-2.5 flex-wrap">
          <h1 className="text-[20px] sm:text-[24px] font-semibold text-[var(--safa-content-primary)] tracking-tight">
            {title}
          </h1>
          {persianTitle && (
            <span
              className="font-persian text-[15px] sm:text-[17px] text-[var(--safa-content-tertiary)]"
              dir="rtl"
            >
              {persianTitle}
            </span>
          )}
        </div>

        {description && (
          <p className="text-[13px] text-[var(--safa-content-secondary)] max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
          {actions}
        </div>
      )}
    </div>
  );
};
