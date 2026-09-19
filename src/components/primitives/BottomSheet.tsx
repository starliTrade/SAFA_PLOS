import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { springs, eases } from '../../theme/interactions';
import { IconButton } from './IconButton';

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  persianTitle?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  maxHeight?: string;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  persianTitle,
  subtitle,
  children,
  footer,
  className = '',
  maxHeight = 'max-h-[88vh]',
}) => {
  // ESC listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={eases.fast}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 dark:bg-black/75 backdrop-blur-xs"
          />

          {/* Sheet Container */}
          <motion.div
            initial={{ y: '100%', opacity: 0.9 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={springs.snappy}
            className={`relative w-full sm:max-w-lg bg-[var(--safa-bg-surface)] rounded-t-[20px] sm:rounded-2xl border-t sm:border border-[var(--safa-border-subtle)] shadow-[var(--safa-shadow-floating)] flex flex-col overflow-hidden ${maxHeight} ${className}`}
          >
            {/* Mobile Drag Indicator */}
            <div className="sm:hidden pt-2.5 pb-1 flex justify-center">
              <div className="w-10 h-1 rounded-full bg-[var(--safa-border-strong)] opacity-60" />
            </div>

            {/* Header */}
            {(title || persianTitle) && (
              <div className="px-4 sm:px-5 py-3 border-b border-[var(--safa-border-subtle)] flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[15px] sm:text-[16px] font-semibold text-[var(--safa-content-primary)] truncate">
                      {title}
                    </h3>
                    {persianTitle && (
                      <span className="font-persian text-[13px] text-[var(--safa-content-tertiary)]" dir="rtl">
                        {persianTitle}
                      </span>
                    )}
                  </div>
                  {subtitle && (
                    <p className="text-[12px] text-[var(--safa-content-secondary)] truncate mt-0.5">
                      {subtitle}
                    </p>
                  )}
                </div>

                <IconButton
                  icon={<X size={16} />}
                  label="Close sheet"
                  size="sm"
                  onClick={onClose}
                />
              </div>
            )}

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 custom-scrollbar">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="p-3 sm:p-4 border-t border-[var(--safa-border-subtle)] bg-[var(--safa-bg-surface-subtle)]/50 pb-safe">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
