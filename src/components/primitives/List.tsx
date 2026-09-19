import React from 'react';

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  divided?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const List: React.FC<ListProps> = ({
  divided = true,
  className = '',
  children,
  ...props
}) => {
  return (
    <div
      role="list"
      className={`w-full flex flex-col ${
        divided ? 'divide-y divide-[var(--safa-border-subtle)]' : 'space-y-1'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
