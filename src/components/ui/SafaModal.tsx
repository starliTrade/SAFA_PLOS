import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { springs, tapPhysics } from '../../theme/interactions';

export interface SafaModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  persianTitle?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  type?: 'dialog' | 'sheet';
}

export const SafaModal: React.FC<SafaModalProps> = ({
  isOpen,
  onClose,
  title,
  persianTitle,
  subtitle,
  children,
  footer,
  maxWidth = 'lg',
  type = 'dialog',
}) => {
  // Lock body scroll and listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
    '2xl': 'max-w-3xl',
    full: 'max-w-5xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden">
          {/* Backdrop with silky blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1E1B18]/45 backdrop-blur-[6px] cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={
              type === 'sheet'
                ? { y: '100%', opacity: 0.95 }
                : { scale: 0.96, opacity: 0, y: 12, filter: 'blur(2px)' }
            }
            animate={{ y: 0, scale: 1, opacity: 1, filter: 'blur(0px)' }}
            exit={
              type === 'sheet'
                ? { y: '100%', opacity: 0 }
                : { scale: 0.96, opacity: 0, y: 12, filter: 'blur(2px)' }
            }
            transition={springs.snappy}
            className={`relative w-full ${maxWidthClasses[maxWidth]} bg-[#FAF8F5] border border-[#EAE4DC] shadow-[0_24px_64px_rgba(30,27,24,0.22)] rounded-t-[26px] sm:rounded-[24px] max-h-[90vh] flex flex-col z-10 overflow-hidden text-left`}
          >
            {/* Header */}
            {(title || persianTitle) && (
              <div className="p-5 sm:p-6 border-b border-[#EAE4DC] bg-white flex items-start justify-between gap-4 shrink-0">
                <div className="space-y-0.5">
                  <div className="flex items-baseline gap-2.5">
                    {title && (
                      <h3 className="text-[18px] font-semibold text-[#1E1B18] tracking-tight">
                        {title}
                      </h3>
                    )}
                    {persianTitle && (
                      <span className="text-[14px] text-[#7D756C] font-persian" dir="rtl">
                        {persianTitle}
                      </span>
                    )}
                  </div>
                  {subtitle && (
                    <p className="text-[12px] text-[#9E968D] leading-normal">{subtitle}</p>
                  )}
                </div>

                <motion.button
                  whileTap={tapPhysics.iconButton}
                  onClick={onClose}
                  aria-label="Close dialog"
                  className="w-8 h-8 rounded-full bg-[#F5F1EB] hover:bg-[#EAE4DC] active:bg-[#DFD8CE] text-[#635E59] hover:text-[#1E1B18] flex items-center justify-center transition-colors cursor-pointer shrink-0 -mr-1"
                >
                  <X size={16} />
                </motion.button>
              </div>
            )}

            {/* Body */}
            <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-1 bg-[#FAF8F5]">
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="p-4 sm:p-5 border-t border-[#EAE4DC] bg-white shrink-0 flex items-center justify-end gap-2.5">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
