import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { SafaButton } from './SafaButton';
import { transitions } from '../../theme/motion';

export interface SafaEmptyStateProps {
  title: string;
  persianTitle?: string;
  description: string;
  persianDescription?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const SafaEmptyState: React.FC<SafaEmptyStateProps> = ({
  title,
  persianTitle,
  description,
  persianDescription,
  icon,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transitions.easeAtmospheric}
      className={`p-10 sm:p-14 text-center rounded-[22px] border border-dashed border-[#DFD8CE] dark:border-[rgba(250,245,238,0.15)] bg-white/70 dark:bg-[#191614]/70 backdrop-blur-xs flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-[#FAF8F5] dark:bg-[#23201C] border border-[#EAE4DC] dark:border-[rgba(250,245,238,0.1)] flex items-center justify-center text-[#C97D60] dark:text-[#D9886C] shadow-2xs mb-1">
        {icon || <Sparkles size={20} />}
      </div>

      <div className="space-y-1 max-w-md">
        <h3 className="text-[17px] font-semibold text-[#1E1B18] dark:text-[#FAF5EE] tracking-tight">
          {title}
        </h3>
        {persianTitle && (
          <span className="text-[13px] text-[#7D756C] dark:text-[#9E968D] font-persian block" dir="rtl">
            {persianTitle}
          </span>
        )}
        <p className="text-[13px] text-[#635E59] dark:text-[#D0C7BC] leading-relaxed pt-1">
          {description}
        </p>
        {persianDescription && (
          <p className="text-[12px] text-[#9E968D] dark:text-[#7D756C] font-persian" dir="rtl">
            {persianDescription}
          </p>
        )}
      </div>

      {actionLabel && onAction && (
        <SafaButton
          variant="atelier"
          size="sm"
          onClick={onAction}
          className="mt-3"
        >
          {actionLabel}
        </SafaButton>
      )}
    </motion.div>
  );
};
