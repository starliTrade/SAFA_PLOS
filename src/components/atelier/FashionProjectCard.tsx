import React from 'react';
import { motion } from 'motion/react';
import { Scissors, Sparkles, Layers, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FashionProject } from '../../types/atelier';
import { ColorPaletteBar } from '../inspiration/ColorPaletteBar';
import { SafaBadge } from '../ui/SafaBadge';
import { transitions } from '../../theme/motion';

export interface FashionProjectCardProps {
  project: FashionProject;
  onSelect: (project: FashionProject) => void;
  className?: string;
  id?: string;
}

export const FashionProjectCard: React.FC<FashionProjectCardProps> = ({
  project,
  onSelect,
  className = '',
  id,
}) => {
  const getStatusBadgeVariant = (status: FashionProject['status']) => {
    switch (status) {
      case 'ACTIVE':
        return 'active';
      case 'PLANNING':
        return 'planning';
      case 'COMPLETED':
        return 'completed';
      case 'PAUSED':
        return 'paused';
      case 'ARCHIVED':
        return 'subtle';
      case 'IDEA':
        return 'idea';
      default:
        return 'default';
    }
  };

  const progressPercent = project.looksTargetCount
    ? Math.round(((project.completedLooksCount || 0) / project.looksTargetCount) * 100)
    : 0;

  return (
    <motion.div
      id={id}
      layout
      whileHover={{ y: -3 }}
      transition={transitions.springTactile}
      onClick={() => onSelect(project)}
      className={`group bg-white rounded-[20px] border border-[#EAE4DC] hover:border-[#DFD8CE] shadow-[0_1px_3px_rgba(30,27,24,0.03),0_4px_14px_rgba(30,27,24,0.04)] hover:shadow-[0_8px_24px_rgba(30,27,24,0.07)] overflow-hidden p-5 sm:p-6 flex flex-col justify-between gap-5 transition-all duration-200 cursor-pointer text-left ${className}`}
    >
      {/* Top Row: Category / Season / Status */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold tracking-wider text-[#C97D60] uppercase">
              {project.season}
            </span>
          </div>

          <SafaBadge variant={getStatusBadgeVariant(project.status) as any} size="sm">
            {project.status}
          </SafaBadge>
        </div>

        <div>
          <h3 className="text-[20px] font-semibold text-[#1E1B18] tracking-tight group-hover:text-[#C97D60] transition-colors leading-snug">
            {project.title}
          </h3>

          {project.persianTitle && (
            <span className="text-[13px] text-[#7D756C] font-persian block mt-0.5" dir="rtl">
              {project.persianTitle}
            </span>
          )}
        </div>

        <p className="text-[13px] text-[#635E59] leading-relaxed line-clamp-2">
          {project.concept || project.description}
        </p>
      </div>

      {/* Visual Color Palette & Creative Assets Strip */}
      <div className="space-y-3 pt-2 border-t border-[#EAE4DC]/60">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9E968D]">
            Harmonized Palette
          </span>
          <ColorPaletteBar palette={project.palette} size="sm" />
        </div>

        {/* Progress & Look Count */}
        <div className="space-y-1.5 bg-[#FAF8F5] p-3 rounded-[12px] border border-[#EAE4DC]">
          <div className="flex items-center justify-between text-[12px]">
            <span className="font-medium text-[#1E1B18] flex items-center gap-1.5">
              <Scissors size={13} className="text-[#C97D60]" />
              Collection Silhouette Progress
            </span>
            <span className="font-mono text-[#635E59]">
              {project.completedLooksCount || 0} / {project.looksTargetCount || 6} Looks ({progressPercent}%)
            </span>
          </div>

          <div className="w-full h-1.5 bg-[#EAE4DC] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C97D60] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Footer Meta & Open Action */}
        <div className="flex items-center justify-between pt-1 text-[11px] text-[#9E968D]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Sparkles size={12} className="text-[#C97D60]" />
              {project.inspirationIds.length} Inspirations
            </span>
            <span className="flex items-center gap-1">
              <Scissors size={12} className="text-[#5C6F59]" />
              {project.materialIds.length} Fabrics
            </span>
          </div>

          <span className="font-medium text-[#C97D60] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
            Open Studio <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </motion.div>
  );
};
