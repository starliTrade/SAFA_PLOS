import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { tapPhysics, cardPhysics, springs } from '../../theme/interactions';

export interface SafaCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'elevated' | 'subtle' | 'outline' | 'flat' | 'surface';
  isInteractive?: boolean;
  className?: string;
  id?: string;
}

export const SafaCard: React.FC<SafaCardProps> = ({
  children,
  variant = 'elevated',
  isInteractive = false,
  className = '',
  id,
  ...props
}) => {
  const variantClasses = {
    elevated:
      'bg-white dark:bg-[#191614] border border-[#EAE4DC] dark:border-[rgba(250,245,238,0.1)] shadow-[0_1px_3px_rgba(30,27,24,0.03),0_4px_16px_rgba(30,27,24,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)]',
    surface:
      'bg-[#FAF8F5] dark:bg-[#191614] border border-[#EAE4DC] dark:border-[rgba(250,245,238,0.08)] shadow-[0_1px_2px_rgba(30,27,24,0.02)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.25)]',
    subtle: 'bg-[#FAF8F5] dark:bg-[#191614] border border-[#EAE4DC] dark:border-[rgba(250,245,238,0.08)]',
    outline: 'bg-transparent border border-[#DFD8CE] dark:border-[rgba(250,245,238,0.14)]',
    flat: 'bg-[#F5F1EB] dark:bg-[#23201C] border border-transparent',
  };

  return (
    <motion.div
      id={id}
      whileHover={isInteractive ? cardPhysics.hoverElevated : undefined}
      whileTap={isInteractive ? tapPhysics.cardPress : undefined}
      transition={springs.snappy}
      className={`rounded-[20px] p-5 sm:p-6 transition-colors duration-200 text-left ${variantClasses[variant]} ${
        isInteractive
          ? 'cursor-pointer hover:border-[#D5CDC2] dark:hover:border-[rgba(250,245,238,0.22)] hover:shadow-[0_8px_28px_rgba(30,27,24,0.07)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] active:border-[#C97D60]/30 select-none'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
