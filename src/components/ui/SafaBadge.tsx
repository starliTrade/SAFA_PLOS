import React from 'react';

export type SafaBadgeVariant =
  | 'default'
  | 'terracotta'
  | 'gold'
  | 'laurel'
  | 'saffron'
  | 'turquoise'
  | 'amber'
  | 'subtle'
  | 'outline'
  | 'idea'
  | 'planning'
  | 'active'
  | 'paused'
  | 'completed'
  | 'draft'
  | 'developing'
  | 'final';

export type SafaBadgeSize = 'sm' | 'md';

export interface SafaBadgeProps {
  children: React.ReactNode;
  variant?: SafaBadgeVariant;
  size?: SafaBadgeSize;
  icon?: React.ReactNode;
  className?: string;
}

export const SafaBadge: React.FC<SafaBadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  className = '',
}) => {
  const variantClasses: Record<SafaBadgeVariant, string> = {
    default: 'bg-[#1E1B18] text-[#FAF8F5] border-[#1E1B18]',
    terracotta: 'bg-[#F7EDE8] text-[#C97D60] border-[#F0D5C9]',
    gold: 'bg-[#FBF6E9] text-[#9B7B1D] border-[#F2E4B8]',
    laurel: 'bg-[#EEF3EE] text-[#40533D] border-[#CDE0CC]',
    saffron: 'bg-[#FAEEEB] text-[#D05638] border-[#F5CBC2]',
    turquoise: 'bg-[#E8EFF1] text-[#2A4B56] border-[#C5D7DC]',
    amber: 'bg-[#F8F1E7] text-[#A66E2E] border-[#EDDCBE]',
    subtle: 'bg-[#F5F1EB] text-[#635E59] border-[#EAE4DC]',
    outline: 'bg-transparent text-[#635E59] border-[#DFD8CE]',
    // Statuses
    idea: 'bg-[#F5F1EB] text-[#635E59] border-[#EAE4DC]',
    planning: 'bg-[#E8EFF1] text-[#2A4B56] border-[#C5D7DC]',
    active: 'bg-[#F7EDE8] text-[#C97D60] border-[#F0D5C9]',
    paused: 'bg-[#FBF6E9] text-[#9B7B1D] border-[#F2E4B8]',
    completed: 'bg-[#EEF3EE] text-[#40533D] border-[#CDE0CC]',
    draft: 'bg-[#F7F4EE] text-[#8A7650] border-[#E5DCBE]',
    developing: 'bg-[#F7EDE8] text-[#B85E3E] border-[#F0CBBF]',
    final: 'bg-[#EEF3EE] text-[#345231] border-[#BBD1BA]',
  };

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1 rounded-full font-medium',
    md: 'text-[11px] px-2.5 py-0.5 gap-1.5 rounded-full font-medium',
  };

  return (
    <span
      className={`inline-flex items-center border whitespace-nowrap ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
