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
      'bg-white border border-[#EAE4DC] shadow-[0_1px_3px_rgba(30,27,24,0.03),0_4px_16px_rgba(30,27,24,0.04)]',
    surface:
      'bg-[#FAF8F5] border border-[#EAE4DC] shadow-[0_1px_2px_rgba(30,27,24,0.02)]',
    subtle: 'bg-[#FAF8F5] border border-[#EAE4DC]',
    outline: 'bg-transparent border border-[#DFD8CE]',
    flat: 'bg-[#F5F1EB] border border-transparent',
  };

  return (
    <motion.div
      id={id}
      whileHover={isInteractive ? cardPhysics.hoverElevated : undefined}
      whileTap={isInteractive ? tapPhysics.cardPress : undefined}
      transition={springs.snappy}
      className={`rounded-[20px] p-5 sm:p-6 transition-colors duration-200 ${variantClasses[variant]} ${
        isInteractive
          ? 'cursor-pointer hover:border-[#D5CDC2] hover:shadow-[0_8px_28px_rgba(30,27,24,0.07)] active:border-[#C97D60]/30 select-none'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
