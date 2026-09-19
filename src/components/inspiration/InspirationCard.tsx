import React from 'react';
import { motion } from 'motion/react';
import { Pin, Scissors, ExternalLink } from 'lucide-react';
import { InspirationItem } from '../../types/inspiration';
import { ColorPaletteBar } from './ColorPaletteBar';
import { SafaBadge } from '../ui/SafaBadge';
import { transitions } from '../../theme/motion';

export interface InspirationCardProps {
  item: InspirationItem;
  onTogglePin?: (item: InspirationItem) => void;
  onOpenDetail?: (item: InspirationItem) => void;
  className?: string;
  id?: string;
}

export const InspirationCard: React.FC<InspirationCardProps> = ({
  item,
  onTogglePin,
  onOpenDetail,
  className = '',
  id,
}) => {
  const isPinned = item.isPinnedToAtelier;

  const handlePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onTogglePin) {
      onTogglePin(item);
    }
  };

  const getAspectRatioClass = () => {
    switch (item.aspectRatio) {
      case 'tall':
        return 'aspect-[3/4.5]';
      case 'portrait':
        return 'aspect-[3/4]';
      case 'square':
        return 'aspect-square';
      case 'landscape':
        return 'aspect-[4/3]';
      default:
        return 'aspect-[3/4]';
    }
  };

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case 'architecture':
        return 'terracotta';
      case 'textile':
        return 'gold';
      case 'silhouette':
        return 'laurel';
      case 'cultural_archive':
        return 'amber';
      default:
        return 'default';
    }
  };

  return (
    <motion.div
      id={id}
      layout
      whileHover={{ y: -3 }}
      transition={transitions.springTactile}
      onClick={() => onOpenDetail && onOpenDetail(item)}
      className={`group bg-white rounded-[18px] border border-[#EAE4DC] hover:border-[#DFD8CE] shadow-[0_1px_3px_rgba(30,27,24,0.03),0_4px_14px_rgba(30,27,24,0.04)] hover:shadow-[0_8px_24px_rgba(30,27,24,0.07)] overflow-hidden transition-all duration-200 cursor-pointer flex flex-col mb-4 ${className}`}
    >
      {/* Visual Header Image */}
      <div className={`relative w-full ${getAspectRatioClass()} overflow-hidden bg-[#F3EFEA]`}>
        <img
          src={item.imageUrl}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
        />

        {/* Subtle Top Gradient Overlay */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 via-black/10 to-transparent pointer-events-none" />

        {/* Top Badges: Category & Pin Button */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          <SafaBadge variant={getCategoryBadgeVariant(item.category) as any} size="sm">
            <span className="capitalize">{item.category.replace('_', ' ')}</span>
          </SafaBadge>

          <button
            onClick={handlePin}
            aria-label={isPinned ? 'Pinned to Atelier Collection' : 'Pin to Atelier Collection'}
            className={`px-2.5 py-1 rounded-full flex items-center gap-1.5 text-[11px] font-medium backdrop-blur-md transition-all cursor-pointer shadow-xs ${
              isPinned
                ? 'bg-[#C97D60] text-white border border-[#C97D60]'
                : 'bg-white/85 hover:bg-white text-[#1E1B18] border border-white/50'
            }`}
          >
            <Pin size={12} className={isPinned ? 'fill-current' : ''} />
            <span>{isPinned ? 'Pinned' : 'Pin'}</span>
          </button>
        </div>

        {/* Bottom Floating Color Palette Extractor on Image */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/60 shadow-xs">
          <ColorPaletteBar palette={item.colorPalette} size="sm" />
          <span className="text-[10px] font-mono text-[#635E59] tracking-wider uppercase">
            {item.colorPalette.length} Palettes
          </span>
        </div>
      </div>

      {/* Card Content & Editorial Metadata */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3 text-left">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-[#9E968D]">
            <span className="truncate max-w-[200px]">{item.source}</span>
            {isPinned && (
              <span className="text-[#C97D60] font-medium flex items-center gap-1 shrink-0">
                <Scissors size={11} /> Atelier Active
              </span>
            )}
          </div>

          <h3 className="text-[16px] font-semibold text-[#1E1B18] leading-snug tracking-tight">
            {item.title}
          </h3>

          {item.persianTitle && (
            <span className="text-[13px] text-[#7D756C] font-persian block -mt-0.5 leading-normal" dir="rtl">
              {item.persianTitle}
            </span>
          )}

          <p className="text-[13px] text-[#635E59] leading-relaxed line-clamp-2 pt-0.5">
            {item.notes}
          </p>
        </div>

        {/* Fabric Relationship Pill & Details */}
        {item.fabricRelation && (
          <div className="p-2.5 rounded-[12px] bg-[#FAF8F5] border border-[#EAE4DC] space-y-1 text-[11px] text-[#635E59]">
            <div className="flex items-center justify-between font-medium text-[#1E1B18]">
              <span className="flex items-center gap-1.5 text-[#C97D60]">
                <Scissors size={12} />
                <span>{item.fabricRelation.fabricName}</span>
              </span>
              <span className="font-mono text-[10px] text-[#9E968D]">
                {item.fabricRelation.weight}
              </span>
            </div>

            <div className="flex items-center justify-between text-[#7D756C]">
              <span>Drape: <strong>{item.fabricRelation.drape}</strong></span>
              {item.fabricRelation.suggestedLook && (
                <span className="text-[#5C6F59] font-medium">{item.fabricRelation.suggestedLook}</span>
              )}
            </div>
          </div>
        )}

        {/* Footer Tags & Inspect Link */}
        <div className="flex items-center justify-between pt-2 border-t border-[#EAE4DC]/60 text-[11px]">
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[#9E968D] bg-[#F6F3EE] px-2 py-0.5 rounded-full border border-[#EAE4DC]"
              >
                #{tag}
              </span>
            ))}
          </div>

          <span className="text-[11px] font-medium text-[#C97D60] group-hover:underline flex items-center gap-1">
            Inspect <ExternalLink size={11} />
          </span>
        </div>
      </div>
    </motion.div>
  );
};
