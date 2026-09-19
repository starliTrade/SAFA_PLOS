import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, PinOff, Plus, ExternalLink, ChevronRight, Eye } from 'lucide-react';
import { InspirationItem } from '../../types/inspiration';
import { ColorPaletteBar } from '../inspiration/ColorPaletteBar';
import { SafaButton } from '../ui/SafaButton';
import { SafaBadge } from '../ui/SafaBadge';
import { transitions } from '../../theme/motion';

export interface ProjectInspirationRailProps {
  inspirations: InspirationItem[];
  projectId: string;
  onUnpin?: (inspirationId: string, projectId: string) => void;
  onSelectInspiration?: (item: InspirationItem) => void;
  onAddInspirationTrigger?: () => void;
  className?: string;
}

export const ProjectInspirationRail: React.FC<ProjectInspirationRailProps> = ({
  inspirations,
  projectId,
  onUnpin,
  onSelectInspiration,
  onAddInspirationTrigger,
  className = '',
}) => {
  return (
    <div className={`space-y-3 text-left ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-[8px] bg-[#F7EDE8] border border-[#F0D5C9] flex items-center justify-center text-[#C97D60]">
            <Sparkles size={13} />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1E1B18] tracking-tight">
              Linked Creative Inspirations
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#9E968D]">
            ({inspirations.length})
          </span>
        </div>

        {onAddInspirationTrigger && (
          <SafaButton
            variant="ghost"
            size="xs"
            icon={<Plus size={12} />}
            onClick={onAddInspirationTrigger}
          >
            Add Inspiration
          </SafaButton>
        )}
      </div>

      {/* Empty State */}
      {inspirations.length === 0 ? (
        <div className="p-8 text-center rounded-[16px] border border-dashed border-[#DFD8CE] bg-[#FAF8F5] space-y-2">
          <p className="text-[13px] text-[#635E59]">
            Bring something beautiful into this collection.
          </p>
          <span className="text-[12px] text-[#9E968D] font-persian block" dir="rtl">
            تصاویر و ایده‌های الهام‌بخش را به این پروژه متصل کنید.
          </span>
          {onAddInspirationTrigger && (
            <SafaButton
              variant="atelier"
              size="xs"
              className="mt-2"
              onClick={onAddInspirationTrigger}
            >
              Browse Inspiration Universe
            </SafaButton>
          )}
        </div>
      ) : (
        /* Horizontal Rail */
        <div className="flex items-stretch gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
          {inspirations.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -2 }}
              transition={transitions.springTactile}
              className="group relative w-60 sm:w-64 rounded-[16px] bg-white border border-[#EAE4DC] hover:border-[#DFD8CE] shadow-2xs overflow-hidden flex flex-col justify-between shrink-0 snap-start"
            >
              {/* Image & Palettes */}
              <div
                onClick={() => onSelectInspiration && onSelectInspiration(item)}
                className="relative h-32 w-full overflow-hidden bg-[#F3EFEA] cursor-pointer"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-2 left-2">
                  <SafaBadge variant="default" size="sm">
                    {item.category.replace('_', ' ')}
                  </SafaBadge>
                </div>

                <div className="absolute bottom-2 inset-x-2 flex items-center justify-between bg-white/90 backdrop-blur-md px-2 py-1 rounded-full border border-white/60">
                  <ColorPaletteBar palette={item.colorPalette} size="xs" />
                  <span className="text-[9px] font-mono text-[#635E59]">
                    {item.colorPalette.length} Colors
                  </span>
                </div>
              </div>

              {/* Text & Actions */}
              <div className="p-3 space-y-2 flex-1 flex flex-col justify-between text-left">
                <div>
                  <h4
                    onClick={() => onSelectInspiration && onSelectInspiration(item)}
                    className="text-[13px] font-semibold text-[#1E1B18] line-clamp-1 hover:text-[#C97D60] cursor-pointer transition-colors"
                  >
                    {item.title}
                  </h4>
                  <span className="text-[11px] text-[#9E968D] block truncate">
                    {item.source}
                  </span>
                </div>

                {/* Footer Controls: Direct Unpin / Open */}
                <div className="pt-2 border-t border-[#EAE4DC]/60 flex items-center justify-between text-[11px]">
                  <button
                    onClick={() => onSelectInspiration && onSelectInspiration(item)}
                    className="text-[#635E59] hover:text-[#1E1B18] flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <Eye size={11} /> View
                  </button>

                  {onUnpin && (
                    <button
                      onClick={() => onUnpin(item.id, projectId)}
                      aria-label="Unpin from this collection"
                      className="text-[#9E968D] hover:text-[#C97D60] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <PinOff size={11} /> Unpin
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
