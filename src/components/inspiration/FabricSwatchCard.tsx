import React from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { FabricSwatch } from '../../types/inspiration';
import { SafaBadge } from '../ui/SafaBadge';
import { transitions } from '../../theme/motion';

export interface FabricSwatchCardProps {
  swatch: FabricSwatch;
  onSelect?: (swatch: FabricSwatch) => void;
  className?: string;
  id?: string;
}

export const FabricSwatchCard: React.FC<FabricSwatchCardProps> = ({
  swatch,
  onSelect,
  className = '',
  id,
}) => {
  return (
    <motion.div
      id={id}
      layout
      whileHover={{ y: -3 }}
      transition={transitions.springTactile}
      onClick={() => onSelect && onSelect(swatch)}
      className={`bg-white rounded-[18px] border border-[#EAE4DC] hover:border-[#DFD8CE] shadow-[0_1px_3px_rgba(30,27,24,0.03),0_4px_14px_rgba(30,27,24,0.04)] overflow-hidden p-5 flex flex-col justify-between gap-4 transition-all duration-200 cursor-pointer ${className}`}
    >
      {/* Top Row: Color Pip + Titles */}
      <div className="flex items-start gap-3.5">
        {/* Textile Swatch Visual Thumbnail */}
        <div className="relative w-16 h-16 rounded-[12px] overflow-hidden border border-[#EAE4DC] shrink-0 shadow-2xs group">
          <img
            src={swatch.swatchImageUrl}
            alt={swatch.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div
            className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border border-white shadow-xs"
            style={{ backgroundColor: swatch.hexColor }}
          />
        </div>

        <div className="space-y-1 flex-1 text-left">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider text-[#C97D60] uppercase">
              {swatch.weave}
            </span>
            {swatch.linkedLookNumber && (
              <SafaBadge variant="terracotta" size="sm">
                Look 0{swatch.linkedLookNumber}
              </SafaBadge>
            )}
          </div>

          <h4 className="text-[16px] font-semibold text-[#1E1B18] tracking-tight">
            {swatch.name}
          </h4>

          <span className="text-[12px] text-[#7D756C] font-persian block" dir="rtl">
            {swatch.persianName}
          </span>
        </div>
      </div>

      {/* Textile Technical Specs Grid */}
      <div className="grid grid-cols-2 gap-2 text-[12px] p-3 rounded-[12px] bg-[#FAF8F5] border border-[#EAE4DC]">
        <div>
          <span className="text-[10px] uppercase font-semibold text-[#9E968D] block">
            Material
          </span>
          <span className="font-medium text-[#1E1B18] truncate block">
            {swatch.material}
          </span>
        </div>

        <div>
          <span className="text-[10px] uppercase font-semibold text-[#9E968D] block">
            Weight
          </span>
          <span className="font-mono font-medium text-[#1E1B18]">
            {swatch.weight}
          </span>
        </div>

        <div>
          <span className="text-[10px] uppercase font-semibold text-[#9E968D] block">
            Drape Feel
          </span>
          <span className="font-medium text-[#5C6F59]">
            {swatch.drape}
          </span>
        </div>

        <div>
          <span className="text-[10px] uppercase font-semibold text-[#9E968D] block">
            Stock
          </span>
          <span className="font-mono text-[#1E1B18]">
            {swatch.inStockMeters ? `${swatch.inStockMeters}m available` : 'Sample only'}
          </span>
        </div>
      </div>

      {/* Texture & Usage Description */}
      <div className="space-y-1 text-left text-[12px]">
        <p className="text-[#635E59] italic">
          "{swatch.texture}"
        </p>
        <div className="flex items-center gap-1.5 text-[11px] text-[#9E968D] pt-1">
          <MapPin size={12} className="text-[#C97D60] shrink-0" />
          <span className="truncate">{swatch.supplier}</span>
        </div>
      </div>
    </motion.div>
  );
};
