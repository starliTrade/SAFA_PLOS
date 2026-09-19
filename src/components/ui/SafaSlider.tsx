import React from 'react';

export interface SafaSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  persianLabel?: string;
  valueLabel?: string;
  className?: string;
}

export const SafaSlider: React.FC<SafaSliderProps> = ({
  min = 1,
  max = 5,
  step = 1,
  value,
  onChange,
  label,
  persianLabel,
  valueLabel,
  className = '',
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={`w-full space-y-2 text-left ${className}`}>
      {(label || valueLabel) && (
        <div className="flex items-center justify-between text-[12px] font-medium text-[#635E59] dark:text-[#D0C7BC]">
          <div className="flex items-center gap-2">
            <span>{label}</span>
            {persianLabel && (
              <span className="font-persian text-[#7D756C] dark:text-[#9E968D] text-[11px]">{persianLabel}</span>
            )}
          </div>
          {valueLabel && (
            <span className="text-[#C97D60] dark:text-[#D9886C] font-semibold">{valueLabel}</span>
          )}
        </div>
      )}

      <div className="relative flex items-center h-6">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-[#EAE4DC] dark:bg-[#2C2723] rounded-full appearance-none cursor-pointer accent-[#C97D60] dark:accent-[#D9886C] focus:outline-hidden"
          style={{
            background: `linear-gradient(to right, #C97D60 0%, #C97D60 ${percentage}%, var(--safa-border-subtle) ${percentage}%, var(--safa-border-subtle) 100%)`,
          }}
        />
      </div>
    </div>
  );
};
