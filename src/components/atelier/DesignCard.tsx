import React from 'react';
import { motion } from 'motion/react';
import { Scissors, Sparkles, Layers, Tag, Eye, CheckCircle2 } from 'lucide-react';
import { Design } from '../../types/atelier';
import { SafaBadge } from '../ui/SafaBadge';
import { transitions } from '../../theme/motion';

export interface DesignCardProps {
  design: Design;
  onSelect?: (design: Design) => void;
  className?: string;
  id?: string;
}

export const DesignCard: React.FC<DesignCardProps> = ({
  design,
  onSelect,
  className = '',
  id,
}) => {
  const getStatusBadgeVariant = (status: Design['status']) => {
    switch (status) {
      case 'FINAL':
        return 'final';
      case 'DEVELOPING':
        return 'developing';
      case 'DRAFT':
        return 'draft';
      case 'IDEA':
        return 'idea';
      default:
        return 'default';
    }
  };

  const primaryImage = design.images[0] || design.sketches[0] || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80';

  return (
    <motion.div
      id={id}
      layout
      whileHover={{ y: -3 }}
      transition={transitions.springTactile}
      onClick={() => onSelect && onSelect(design)}
      className={`group bg-white rounded-[18px] border border-[#EAE4DC] hover:border-[#DFD8CE] shadow-[0_1px_3px_rgba(30,27,24,0.03),0_4px_14px_rgba(30,27,24,0.04)] hover:shadow-[0_8px_24px_rgba(30,27,24,0.07)] overflow-hidden transition-all duration-200 cursor-pointer flex flex-col justify-between ${className}`}
    >
      {/* Visual Image & Silhouette Preview */}
      <div className="relative w-full aspect-[4/3] bg-[#F5F1EB] overflow-hidden">
        <img
          src={primaryImage}
          alt={design.title}
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-600 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between">
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20">
            LOOK 0{design.lookNumber}
          </span>

          <SafaBadge variant={getStatusBadgeVariant(design.status) as any} size="sm">
            {design.status}
          </SafaBadge>
        </div>

        {/* Bottom Version & Silhouette Tag */}
        <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-white text-[11px]">
          <span className="font-medium bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
            {design.silhouetteType}
          </span>
          <span className="font-mono text-[10px] opacity-90">{design.version}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-4.5 flex flex-col flex-1 justify-between gap-3 text-left">
        <div className="space-y-1">
          <h4 className="text-[15px] font-semibold text-[#1E1B18] tracking-tight group-hover:text-[#C97D60] transition-colors leading-snug">
            {design.title}
          </h4>

          {design.persianTitle && (
            <span className="text-[12px] text-[#7D756C] font-persian block -mt-0.5" dir="rtl">
              {design.persianTitle}
            </span>
          )}

          <p className="text-[12px] text-[#635E59] leading-relaxed line-clamp-2 pt-0.5">
            {design.description}
          </p>
        </div>

        {/* Technical Specs & Linked Counts */}
        <div className="pt-2 border-t border-[#EAE4DC]/60 flex items-center justify-between text-[11px] text-[#9E968D]">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1">
              <Sparkles size={11} className="text-[#C97D60]" />
              {design.inspirationIds.length} Inspo
            </span>
            <span className="flex items-center gap-1">
              <Scissors size={11} className="text-[#5C6F59]" />
              {design.materialIds.length} Fabrics
            </span>
          </div>

          <span className="text-[11px] font-medium text-[#C97D60] group-hover:underline flex items-center gap-1">
            <Eye size={11} /> Inspect
          </span>
        </div>
      </div>
    </motion.div>
  );
};
