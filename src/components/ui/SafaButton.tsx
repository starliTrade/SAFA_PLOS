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
    'relative inline-flex items-center justify-center font-medium transition-colors cursor-pointer select-none rounded-[13px] disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none whitespace-nowrap focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C97D60]/40 dark:focus-visible:ring-[#D9886C]/50';

  const variantClasses: Record<SafaButtonVariant, string> = {
    primary:
      'bg-[#1E1B18] dark:bg-[#FAF5EE] text-[#FAF8F5] dark:text-[#13110F] hover:bg-[#2C2723] dark:hover:bg-white active:bg-[#151311] dark:active:bg-[#EAE4DC] shadow-xs border border-[#1E1B18] dark:border-[#FAF5EE]',
    secondary:
      'bg-[#FAF8F5] dark:bg-[#191614] text-[#1E1B18] dark:text-[#FAF5EE] hover:bg-[#F3EFEA] dark:hover:bg-[#23201C] active:bg-[#EAE4DC] dark:active:bg-[#2C2723] border border-[#EAE4DC] dark:border-[rgba(250,245,238,0.12)] shadow-2xs',
    subtle:
      'bg-[#F5F1EB] dark:bg-[#2C2723] text-[#1E1B18] dark:text-[#FAF5EE] hover:bg-[#EAE4DC] dark:hover:bg-[#3D3833] active:bg-[#DFD8CE] border border-transparent',
    atelier:
      'bg-[#C97D60] dark:bg-[#D9886C] text-white hover:bg-[#B56C50] dark:hover:bg-[#E59B81] active:bg-[#9E583E] shadow-xs border border-[#C97D60] dark:border-[#D9886C]',
    terracotta:
      'bg-[#F7EDE8] dark:bg-[rgba(217,136,108,0.16)] text-[#C97D60] dark:text-[#E59B81] hover:bg-[#F0D5C9] dark:hover:bg-[rgba(217,136,108,0.25)] border border-[#F0D5C9] dark:border-[rgba(217,136,108,0.3)]',
    ghost:
      'bg-transparent text-[#635E59] dark:text-[#D0C7BC] hover:text-[#1E1B18] dark:hover:text-[#FAF5EE] hover:bg-[#F3EFEA] dark:hover:bg-[#23201C] active:bg-[#EAE4DC] border border-transparent',
    outline:
      'bg-transparent text-[#1E1B18] dark:text-[#FAF5EE] hover:bg-[#FAF8F5] dark:hover:bg-[#23201C] active:bg-[#F3EFEA] border border-[#DFD8CE] dark:border-[rgba(250,245,238,0.16)]',
    danger:
      'bg-[#FDF2F2] dark:bg-[rgba(155,44,44,0.2)] text-[#9B2C2C] dark:text-[#F8A5A5] hover:bg-[#FDE8E8] dark:hover:bg-[rgba(155,44,44,0.3)] border border-[#F8D7DA] dark:border-[rgba(155,44,44,0.35)]',
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
