import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { InspirationColorSwatch } from '../../types/inspiration';

export interface ColorDotProps {
  swatch: InspirationColorSwatch;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showHexTooltip?: boolean;
}

export const ColorDot: React.FC<ColorDotProps> = ({
  swatch,
  size = 'md',
  showHexTooltip = true,
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const sizeClasses = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(swatch.hex);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1800);
  };

  return (
    <div className="relative group/dot inline-flex items-center">
      <button
        onClick={handleCopy}
        aria-label={`Copy color ${swatch.name} (${swatch.hex})`}
        className={`${sizeClasses[size]} rounded-full border border-black/15 shadow-2xs cursor-pointer transition-transform hover:scale-115 active:scale-95 flex items-center justify-center relative overflow-hidden`}
        style={{ backgroundColor: swatch.hex }}
      >
        {isCopied && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
            <Check size={size === 'xs' || size === 'sm' ? 10 : 12} strokeWidth={3} />
          </div>
        )}
      </button>

      {/* Optical Tooltip */}
      {showHexTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/dot:flex flex-col items-center pointer-events-none z-30">
          <div className="bg-[#1E1B18] text-[#FAF8F5] text-[11px] px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap flex flex-col items-center gap-0.5 border border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="font-medium">{swatch.name}</span>
              <span className="text-[10px] font-mono text-[#D4AF37]">{swatch.hex}</span>
            </div>
            {swatch.persianName && (
              <span className="text-[10px] text-[#9E968D] font-persian">
                {swatch.persianName}
              </span>
            )}
            <span className="text-[9px] text-[#C97D60] uppercase tracking-wider font-mono">
              {isCopied ? 'Copied!' : 'Click to copy'}
            </span>
          </div>
          {/* Arrow */}
          <div className="w-1.5 h-1.5 bg-[#1E1B18] rotate-45 -mt-1" />
        </div>
      )}
    </div>
  );
};
