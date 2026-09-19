import React from 'react';

export interface SafaInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  persianLabel?: string;
  error?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const SafaInput: React.FC<SafaInputProps> = ({
  label,
  persianLabel,
  error,
  icon,
  iconRight,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full space-y-1.5 text-left">
      {(label || persianLabel) && (
        <div className="flex items-center justify-between text-[12px] font-medium text-[#635E59]">
          {label && <span>{label}</span>}
          {persianLabel && <span className="font-persian text-[#7D756C]">{persianLabel}</span>}
        </div>
      )}

      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3.5 text-[#9E968D] pointer-events-none">
            {icon}
          </div>
        )}

        <input
          className={`w-full bg-[#FAF8F5] focus:bg-white text-[#1E1B18] placeholder-[#9E968D] text-[13px] rounded-[12px] border border-[#EAE4DC] focus:border-[#C97D60] focus:ring-2 focus:ring-[#C97D60]/15 outline-none transition-all ${
            icon ? 'pl-10' : 'pl-3.5'
          } ${iconRight ? 'pr-10' : 'pr-3.5'} py-2.5 ${className}`}
          {...props}
        />

        {iconRight && (
          <div className="absolute right-3.5 text-[#9E968D]">
            {iconRight}
          </div>
        )}
      </div>

      {error && <p className="text-[11px] text-[#C97D60] font-medium">{error}</p>}
    </div>
  );
};

export interface SafaTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  persianLabel?: string;
  error?: string;
}

export const SafaTextarea: React.FC<SafaTextareaProps> = ({
  label,
  persianLabel,
  error,
  className = '',
  rows = 3,
  ...props
}) => {
  return (
    <div className="w-full space-y-1.5 text-left">
      {(label || persianLabel) && (
        <div className="flex items-center justify-between text-[12px] font-medium text-[#635E59]">
          {label && <span>{label}</span>}
          {persianLabel && <span className="font-persian text-[#7D756C]">{persianLabel}</span>}
        </div>
      )}

      <textarea
        rows={rows}
        className={`w-full bg-[#FAF8F5] focus:bg-white text-[#1E1B18] placeholder-[#9E968D] text-[13px] rounded-[12px] border border-[#EAE4DC] focus:border-[#C97D60] focus:ring-2 focus:ring-[#C97D60]/15 outline-none transition-all p-3.5 resize-none leading-relaxed ${className}`}
        {...props}
      />

      {error && <p className="text-[11px] text-[#C97D60] font-medium">{error}</p>}
    </div>
  );
};
