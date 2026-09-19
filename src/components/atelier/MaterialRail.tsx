import React from 'react';
import { motion } from 'motion/react';
import { Scissors, Plus, MapPin, Layers, Check } from 'lucide-react';
import { FabricSwatch } from '../../types/inspiration';
import { SafaButton } from '../ui/SafaButton';
import { SafaBadge } from '../ui/SafaBadge';
import { transitions } from '../../theme/motion';

export interface MaterialRailProps {
  fabrics: FabricSwatch[];
  projectId: string;
  onUnlink?: (fabricId: string, projectId: string) => void;
  onSelectFabric?: (fabric: FabricSwatch) => void;
  onAddMaterialTrigger?: () => void;
  className?: string;
}

export const MaterialRail: React.FC<MaterialRailProps> = ({
  fabrics,
  projectId,
  onUnlink,
  onSelectFabric,
  onAddMaterialTrigger,
  className = '',
}) => {
  return (
    <div className={`space-y-3 text-left ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-[8px] bg-[#EEF3EE] border border-[#CDE0CC] flex items-center justify-center text-[#5C6F59]">
            <Scissors size={13} />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-[#1E1B18] tracking-tight">
              Materials & Textile Swatches
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#9E968D]">
            ({fabrics.length})
          </span>
        </div>

        {onAddMaterialTrigger && (
          <SafaButton
            variant="ghost"
            size="xs"
            icon={<Plus size={12} />}
            onClick={onAddMaterialTrigger}
          >
            Add Swatch
          </SafaButton>
        )}
      </div>

      {/* Empty State */}
      {fabrics.length === 0 ? (
        <div className="p-8 text-center rounded-[16px] border border-dashed border-[#DFD8CE] bg-[#FAF8F5] space-y-2">
          <p className="text-[13px] text-[#635E59]">
            No textiles linked to this collection yet.
          </p>
          <span className="text-[12px] text-[#9E968D] font-persian block" dir="rtl">
            پارچه‌ها و نمونه‌های بازار را به این پروژه متصل کنید.
          </span>
          {onAddMaterialTrigger && (
            <SafaButton
              variant="atelier"
              size="xs"
              className="mt-2"
              onClick={onAddMaterialTrigger}
            >
              Browse Grand Bazaar Library
            </SafaButton>
          )}
        </div>
      ) : (
        /* Grid / Rail of Fabrics */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {fabrics.map((fabric) => (
            <motion.div
              key={fabric.id}
              whileHover={{ y: -2 }}
              transition={transitions.springTactile}
              onClick={() => onSelectFabric && onSelectFabric(fabric)}
              className="p-3.5 rounded-[14px] bg-white border border-[#EAE4DC] hover:border-[#DFD8CE] shadow-2xs flex items-start justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-start gap-3 min-w-0">
                {/* Visual Thumbnail */}
                <div className="relative w-12 h-12 rounded-[10px] overflow-hidden border border-[#EAE4DC] shrink-0">
                  <img
                    src={fabric.swatchImageUrl}
                    alt={fabric.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full border border-white"
                    style={{ backgroundColor: fabric.hexColor }}
                  />
                </div>

                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold text-[#C97D60] uppercase tracking-wider truncate">
                      {fabric.weave}
                    </span>
                    {fabric.linkedLookNumber && (
                      <span className="text-[9px] font-mono bg-[#F7EDE8] text-[#C97D60] px-1.5 py-0.2 rounded">
                        Look 0{fabric.linkedLookNumber}
                      </span>
                    )}
                  </div>

                  <h4 className="text-[13px] font-semibold text-[#1E1B18] truncate">
                    {fabric.name}
                  </h4>

                  <div className="flex items-center gap-2 text-[11px] text-[#9E968D]">
                    <span>{fabric.weight}</span>
                    <span>•</span>
                    <span className="text-[#5C6F59] font-medium">{fabric.drape}</span>
                  </div>
                </div>
              </div>

              {/* Supplier info */}
              <div className="text-right shrink-0">
                <span className="text-[10px] font-mono text-[#9E968D] block">
                  {fabric.inStockMeters ? `${fabric.inStockMeters}m stock` : 'Sample'}
                </span>
                {onUnlink && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUnlink(fabric.id, projectId);
                    }}
                    className="text-[11px] text-[#9E968D] hover:text-[#C97D60] transition-colors mt-2 cursor-pointer"
                  >
                    Unlink
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
