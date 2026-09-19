import React from 'react';
import { ColorDot } from './ColorDot';
import { InspirationColorSwatch } from '../../types/inspiration';

export interface ColorPaletteBarProps {
  palette: InspirationColorSwatch[];
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  showLabels?: boolean;
}

export const ColorPaletteBar: React.FC<ColorPaletteBarProps> = ({
  palette,
  size = 'md',
  className = '',
  showLabels = false,
}) => {
  return (
    <div className={`flex items-center gap-1.5 flex-wrap ${className}`}>
      {palette.map((swatch) => (
        <div key={swatch.hex} className="flex items-center gap-1.5">
          <ColorDot swatch={swatch} size={size} />
          {showLabels && (
            <span className="text-[11px] font-mono text-[#635E59]">
              {swatch.name}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
