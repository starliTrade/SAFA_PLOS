import React, { useState } from 'react';
import { Pin, Scissors, Copy, Check, Sparkles } from 'lucide-react';
import { InspirationItem } from '../../types/inspiration';
import { SafaModal } from '../ui/SafaModal';
import { SafaButton } from '../ui/SafaButton';
import { SafaBadge } from '../ui/SafaBadge';
import { ColorDot } from './ColorDot';

export interface InspirationDetailModalProps {
  item: InspirationItem | null;
  isOpen: boolean;
  onClose: () => void;
  onTogglePin?: (item: InspirationItem) => void;
  onOpenPinModal?: (item: InspirationItem) => void;
}

export const InspirationDetailModal: React.FC<InspirationDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onTogglePin,
  onOpenPinModal,
}) => {
  if (!item) return null;

  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const isPinned = item.isPinnedToAtelier;

  const handlePin = () => {
    if (onOpenPinModal) {
      onOpenPinModal(item);
    } else if (onTogglePin) {
      onTogglePin(item);
    }
  };

  const handleCopyPaletteHexes = () => {
    const hexList = item.colorPalette.map((c) => `${c.name}: ${c.hex}`).join(', ');
    navigator.clipboard.writeText(hexList);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <SafaModal
      isOpen={isOpen}
      onClose={onClose}
      title={item.title}
      persianTitle={item.persianTitle}
      subtitle={item.source}
      type="sheet"
      maxWidth="lg"
      footer={
        <div className="w-full flex items-center justify-between">
          <SafaButton
            variant={isPinned ? 'atelier' : 'subtle'}
            size="sm"
            icon={<Pin size={14} className={isPinned ? 'fill-current' : ''} />}
            onClick={handlePin}
          >
            {isPinned ? 'Pinned to Atelier Collection' : 'Pin to Collection'}
          </SafaButton>

          <SafaButton variant="ghost" size="sm" onClick={onClose}>
            Close
          </SafaButton>
        </div>
      }
    >
      <div className="space-y-6 text-left">
        {/* Full Image Display */}
        <div className="relative w-full max-h-96 rounded-[16px] overflow-hidden border border-[#EAE4DC] shadow-xs">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <SafaBadge variant="default" size="sm">
              {item.category.toUpperCase()}
            </SafaBadge>
            <SafaBadge variant="terracotta" size="sm">
              {item.mood}
            </SafaBadge>
          </div>
        </div>

        {/* Extracted Color Palette Studio Breakdown */}
        <div className="p-4 rounded-[14px] bg-[#FAF8F5] border border-[#EAE4DC] space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-[14px] font-semibold text-[#1E1B18] flex items-center gap-2">
                <Sparkles size={15} className="text-[#C97D60]" />
                Extracted Atelier Color Harmony
              </h4>
              <span className="text-[11px] text-[#9E968D]">
                Derived from mineral tones and lighting dynamics
              </span>
            </div>

            <button
              onClick={handleCopyPaletteHexes}
              className="text-[12px] font-medium text-[#C97D60] hover:text-[#B0664B] flex items-center gap-1 cursor-pointer"
            >
              {copiedAll ? <Check size={13} /> : <Copy size={13} />}
              <span>{copiedAll ? 'Palette Copied' : 'Copy All Hexes'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {item.colorPalette.map((color) => (
              <div
                key={color.hex}
                className="p-2.5 rounded-[10px] bg-white border border-[#EAE4DC] flex items-center gap-2.5 shadow-2xs"
              >
                <ColorDot swatch={color} size="md" showHexTooltip={false} />
                <div className="flex flex-col truncate">
                  <span className="text-[12px] font-medium text-[#1E1B18] truncate">
                    {color.name}
                  </span>
                  <span className="text-[11px] font-persian text-[#7D756C] truncate">
                    {color.persianName}
                  </span>
                  <span className="text-[10px] font-mono text-[#9E968D]">
                    {color.hex}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Textile Relationship & Pattern Construction Notes */}
        {item.fabricRelation && (
          <div className="p-4 rounded-[14px] bg-white border border-[#EAE4DC] space-y-2">
            <h4 className="text-[14px] font-semibold text-[#1E1B18] flex items-center gap-2">
              <Scissors size={15} className="text-[#C97D60]" />
              Fabric & Draping Specification
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[13px] pt-1">
              <div className="p-2.5 bg-[#FAF8F5] rounded-[10px] border border-[#EAE4DC]">
                <span className="text-[10px] uppercase font-semibold text-[#9E968D] block">Fabric Name</span>
                <span className="font-medium text-[#1E1B18]">{item.fabricRelation.fabricName}</span>
              </div>
              <div className="p-2.5 bg-[#FAF8F5] rounded-[10px] border border-[#EAE4DC]">
                <span className="text-[10px] uppercase font-semibold text-[#9E968D] block">Weave & Weight</span>
                <span className="font-mono text-[#1E1B18]">{item.fabricRelation.weight} • {item.fabricRelation.weave}</span>
              </div>
              <div className="p-2.5 bg-[#FAF8F5] rounded-[10px] border border-[#EAE4DC]">
                <span className="text-[10px] uppercase font-semibold text-[#9E968D] block">Drape Quality</span>
                <span className="font-medium text-[#5C6F59]">{item.fabricRelation.drape}</span>
              </div>
            </div>
          </div>
        )}

        {/* Long Notes */}
        <div className="space-y-2">
          <h4 className="text-[14px] font-semibold text-[#1E1B18]">
            Creative Synthesis & Silhouette Drape Notes
          </h4>
          <p className="text-[14px] text-[#635E59] leading-relaxed">
            {item.notes}
          </p>
          {item.persianNotes && (
            <p className="text-[13px] text-[#7D756C] font-persian leading-loose p-3 bg-[#FAF8F5] rounded-[10px] border border-[#EAE4DC]" dir="rtl">
              {item.persianNotes}
            </p>
          )}
        </div>
      </div>
    </SafaModal>
  );
};
