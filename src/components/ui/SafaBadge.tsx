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
    default:
      'bg-[#1E1B18] dark:bg-[#FAF5EE] text-[#FAF8F5] dark:text-[#13110F] border-[#1E1B18] dark:border-[#FAF5EE]',
    terracotta:
      'bg-[#F7EDE8] dark:bg-[rgba(217,136,108,0.18)] text-[#C97D60] dark:text-[#E59B81] border-[#F0D5C9] dark:border-[rgba(217,136,108,0.32)]',
    gold:
      'bg-[#FBF6E9] dark:bg-[rgba(223,192,101,0.16)] text-[#9B7B1D] dark:text-[#DFC065] border-[#F2E4B8] dark:border-[rgba(223,192,101,0.28)]',
    laurel:
      'bg-[#EEF3EE] dark:bg-[rgba(114,137,110,0.18)] text-[#40533D] dark:text-[#9FC09A] border-[#CDE0CC] dark:border-[rgba(114,137,110,0.3)]',
    saffron:
      'bg-[#FAEEEB] dark:bg-[rgba(224,122,95,0.18)] text-[#D05638] dark:text-[#ECA090] border-[#F5CBC2] dark:border-[rgba(224,122,95,0.3)]',
    turquoise:
      'bg-[#E8EFF1] dark:bg-[rgba(78,119,132,0.18)] text-[#2A4B56] dark:text-[#89AFC0] border-[#C5D7DC] dark:border-[rgba(78,119,132,0.3)]',
    amber:
      'bg-[#F8F1E7] dark:bg-[rgba(196,139,71,0.18)] text-[#A66E2E] dark:text-[#D1A661] border-[#EDDCBE] dark:border-[rgba(196,139,71,0.3)]',
    subtle:
      'bg-[#F5F1EB] dark:bg-[rgba(250,245,238,0.08)] text-[#635E59] dark:text-[#D0C7BC] border-[#EAE4DC] dark:border-[rgba(250,245,238,0.12)]',
    outline:
      'bg-transparent text-[#635E59] dark:text-[#D0C7BC] border-[#DFD8CE] dark:border-[rgba(250,245,238,0.14)]',
    // Statuses
    idea: 'bg-[#F5F1EB] dark:bg-[rgba(250,245,238,0.08)] text-[#635E59] dark:text-[#D0C7BC] border-[#EAE4DC] dark:border-[rgba(250,245,238,0.12)]',
    planning: 'bg-[#E8EFF1] dark:bg-[rgba(78,119,132,0.18)] text-[#2A4B56] dark:text-[#89AFC0] border-[#C5D7DC] dark:border-[rgba(78,119,132,0.3)]',
    active: 'bg-[#F7EDE8] dark:bg-[rgba(217,136,108,0.18)] text-[#C97D60] dark:text-[#E59B81] border-[#F0D5C9] dark:border-[rgba(217,136,108,0.32)]',
    paused: 'bg-[#FBF6E9] dark:bg-[rgba(223,192,101,0.16)] text-[#9B7B1D] dark:text-[#DFC065] border-[#F2E4B8] dark:border-[rgba(223,192,101,0.28)]',
    completed: 'bg-[#EEF3EE] dark:bg-[rgba(114,137,110,0.18)] text-[#40533D] dark:text-[#9FC09A] border-[#CDE0CC] dark:border-[rgba(114,137,110,0.3)]',
    draft: 'bg-[#F7F4EE] dark:bg-[rgba(223,192,101,0.12)] text-[#8A7650] dark:text-[#C7B17C] border-[#E5DCBE] dark:border-[rgba(223,192,101,0.24)]',
    developing: 'bg-[#F7EDE8] dark:bg-[rgba(217,136,108,0.18)] text-[#B85E3E] dark:text-[#ECA090] border-[#F0CBBF] dark:border-[rgba(217,136,108,0.3)]',
    final: 'bg-[#EEF3EE] dark:bg-[rgba(114,137,110,0.22)] text-[#345231] dark:text-[#B8DBB3] border-[#BBD1BA] dark:border-[rgba(114,137,110,0.35)]',
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
