import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { tapPhysics, springs } from '../../theme/interactions';

export type SafaButtonVariant =
  | 'primary'
  | 'secondary'
  | 'subtle'
  | 'atelier'
  | 'terracotta'
  | 'ghost'
  | 'outline'
  | 'danger';

export type SafaButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon';

export interface SafaButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: SafaButtonVariant;
  size?: SafaButtonSize;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  id?: string;
}

export const SafaButton: React.FC<SafaButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  children,
  isLoading = false,
  className = '',
  disabled,
  id,
  ...props
}) => {
  const baseClasses =
    'relative inline-flex items-center justify-center font-medium transition-colors cursor-pointer select-none rounded-[13px] disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none whitespace-nowrap focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C97D60]/40';

  const variantClasses = {
    primary:
      'bg-[#1E1B18] text-[#FAF8F5] hover:bg-[#2C2723] active:bg-[#151311] shadow-xs border border-[#1E1B18]',
    secondary:
      'bg-[#FAF8F5] text-[#1E1B18] hover:bg-[#F3EFEA] active:bg-[#EAE4DC] border border-[#EAE4DC] shadow-2xs',
    subtle:
      'bg-[#F5F1EB] text-[#1E1B18] hover:bg-[#EAE4DC] active:bg-[#DFD8CE] border border-transparent',
    atelier:
      'bg-[#C97D60] text-white hover:bg-[#B56C50] active:bg-[#A35D43] shadow-xs border border-[#C97D60]',
    terracotta:
      'bg-[#F7EDE8] text-[#C97D60] hover:bg-[#F0D5C9] active:bg-[#E8C2B3] border border-[#F0D5C9]',
    ghost:
      'bg-transparent text-[#635E59] hover:text-[#1E1B18] hover:bg-[#F3EFEA] active:bg-[#EAE4DC] border border-transparent',
    outline:
      'bg-transparent text-[#1E1B18] hover:bg-[#FAF8F5] active:bg-[#F3EFEA] border border-[#DFD8CE]',
    danger:
      'bg-[#FDF2F2] text-[#9B2C2C] hover:bg-[#FDE8E8] active:bg-[#FCD4D4] border border-[#F8D7DA]',
  };

  const sizeClasses = {
    xs: 'text-[11px] px-2.5 py-1 gap-1.5 rounded-[8px] min-h-[28px]',
    sm: 'text-[12px] px-3.5 py-1.5 gap-1.5 rounded-[10px] min-h-[34px]',
    md: 'text-[13px] px-4 py-2 gap-2 rounded-[12px] min-h-[40px]',
    lg: 'text-[14px] px-5 py-2.5 gap-2.5 rounded-[14px] min-h-[44px]',
    icon: 'p-2 rounded-[11px] w-9 h-9 min-h-[36px] min-w-[36px]',
  };

  const tapEffect = size === 'xs' ? tapPhysics.subtle : tapPhysics.standard;

  return (
    <motion.button
      id={id}
      whileTap={disabled || isLoading ? undefined : tapEffect}
      transition={springs.tactile}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {icon && <span className="shrink-0">{icon}</span>}
          {children && <span>{children}</span>}
          {iconRight && <span className="shrink-0">{iconRight}</span>}
        </>
      )}
    </motion.button>
  );
};
