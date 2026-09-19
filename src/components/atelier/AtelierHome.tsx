import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scissors,
  Plus,
  Sparkles,
  Compass,
  Layers,
  Palette,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { FashionProject, ProjectStatus, Design, DesignStatus } from '../../types/atelier';
import { InspirationItem, FabricSwatch } from '../../types/inspiration';
import { FashionProjectCard } from './FashionProjectCard';
import { FashionProjectDetail } from './FashionProjectDetail';
import { CreateProjectModal } from './CreateProjectModal';
import { SafaButton } from '../ui/SafaButton';
import { SafaBadge } from '../ui/SafaBadge';
import { SafaEmptyState } from '../ui/SafaEmptyState';
import { transitions } from '../../theme/motion';
import { useStateContext } from '../../context/StateContext';

export interface AtelierHomeProps {
  initialProjectId?: string | null;
  onNavigateToInspirations?: () => void;
}

export const AtelierHome: React.FC<AtelierHomeProps> = ({
  initialProjectId,
  onNavigateToInspirations,
}) => {
  const {
    fashionProjects,
    designs,
    inspirationItems,
    fabricSwatches,
    createFashionProject,
    updateFashionProjectStatus,
    unpinInspirationFromProject,
    unlinkMaterialFromProject,
    createDesign,
    updateDesignStatus,
  } = useStateContext();

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    initialProjectId || null
  );
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const selectedProject = fashionProjects.find((p) => p.id === selectedProjectId);

  // If a project is selected, render the dedicated deep workspace view
  if (selectedProject) {
    return (
      <FashionProjectDetail
        project={selectedProject}
        designs={designs}
        allInspirations={inspirationItems}
        allFabrics={fabricSwatches}
        onBack={() => setSelectedProjectId(null)}
        onUpdateProjectStatus={updateFashionProjectStatus}
        onUnpinInspiration={unpinInspirationFromProject}
        onUnlinkMaterial={unlinkMaterialFromProject}
        onCreateDesign={createDesign}
        onUpdateDesignStatus={updateDesignStatus}
        onNavigateToInspirations={onNavigateToInspirations}
      />
    );
  }

  // Filtered projects
  const filteredProjects = fashionProjects.filter((p) => {
    if (filterStatus === 'ALL') return true;
    return p.status === filterStatus;
  });

  const totalLooksCount = designs.length;
  const pinnedInspoCount = inspirationItems.filter((i) => i.isPinnedToAtelier).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={transitions.easeAtmospheric}
      className="space-y-6 pb-28 max-w-4xl mx-auto text-left"
    >
      {/* Atelier Overview Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-[#EAE4DC] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C97D60] bg-[#F7EDE8] px-2.5 py-0.5 rounded-full border border-[#F0D5C9]">
              Fashion Atelier Workspace
            </span>
            <span className="text-[13px] text-[#9E968D] font-persian">کارگاه طراحی لباس و کالکشن</span>
          </div>
          <h1 className="text-3xl font-editorial font-normal text-[#1E1B18]">
            Creative Collections & Garment Line Sheets
          </h1>
          <p className="text-[14px] text-[#635E59] mt-1 leading-relaxed">
            Where visual inspirations translate into architectural silhouettes, draping toiles, and bespoke capsule collections.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          {onNavigateToInspirations && (
            <SafaButton
              variant="subtle"
              size="sm"
              icon={<Compass size={14} />}
              onClick={onNavigateToInspirations}
            >
              Inspiration Engine
            </SafaButton>
          )}

          <SafaButton
            variant="atelier"
            size="sm"
            icon={<Plus size={14} />}
            onClick={() => setIsCreateProjectOpen(true)}
          >
            New Collection
          </SafaButton>
        </div>
      </div>

      {/* Atelier Live Studio Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-[16px] bg-white border border-[#EAE4DC] space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-[#9E968D]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Collections</span>
            <Layers size={14} className="text-[#C97D60]" />
          </div>
          <p className="text-2xl font-mono font-semibold text-[#1E1B18]">
            {fashionProjects.length}
          </p>
          <span className="text-[11px] text-[#635E59] block">1 Active Capsule</span>
        </div>

        <div className="p-4 rounded-[16px] bg-white border border-[#EAE4DC] space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-[#9E968D]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Drafted Looks</span>
            <Scissors size={14} className="text-[#5C6F59]" />
          </div>
          <p className="text-2xl font-mono font-semibold text-[#1E1B18]">
            {totalLooksCount}
          </p>
          <span className="text-[11px] text-[#5C6F59] block">Lookbook line sheets</span>
        </div>

        <div className="p-4 rounded-[16px] bg-white border border-[#EAE4DC] space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-[#9E968D]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Pinned Inspo</span>
            <Sparkles size={14} className="text-[#C97D60]" />
          </div>
          <p className="text-2xl font-mono font-semibold text-[#1E1B18]">
            {pinnedInspoCount}
          </p>
          <span className="text-[11px] text-[#635E59] block">Active visual links</span>
        </div>

        <div className="p-4 rounded-[16px] bg-white border border-[#EAE4DC] space-y-1 shadow-2xs">
          <div className="flex items-center justify-between text-[#9E968D]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Grand Bazaar Fabrics</span>
            <Palette size={14} className="text-[#D4AF37]" />
          </div>
          <p className="text-2xl font-mono font-semibold text-[#1E1B18]">
            {fabricSwatches.length}
          </p>
          <span className="text-[11px] text-[#635E59] block">Textile swatches</span>
        </div>
      </div>

      {/* Filter status tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {['ALL', 'ACTIVE', 'PLANNING', 'COMPLETED'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer ${
              filterStatus === status
                ? 'bg-[#1E1B18] text-[#FAF8F5]'
                : 'bg-[#FAF8F5] text-[#635E59] hover:bg-[#F3EFEA] border border-[#EAE4DC]'
            }`}
          >
            {status === 'ALL' ? 'All Collections' : status}
          </button>
        ))}
      </div>

      {/* Projects List Grid */}
      {filteredProjects.length === 0 ? (
        <SafaEmptyState
          title="Your first collection starts here."
          persianTitle="نخستین کالکشن شما از اینجا آغاز می‌شود."
          description="Every couture piece and ready-to-wear silhouette begins with a single moodboard, a swatch of silk, and an architectural sketch."
          persianDescription="هر قطعه دست‌دوز با یک برگ الهام و تکه‌ای حریر آغاز می‌گردد."
          actionLabel="Create New Collection"
          onAction={() => setIsCreateProjectOpen(true)}
          icon={<Scissors size={22} />}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filteredProjects.map((project) => (
            <FashionProjectCard
              key={project.id}
              project={project}
              onSelect={(p) => setSelectedProjectId(p.id)}
            />
          ))}
        </div>
      )}

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isCreateProjectOpen}
        onClose={() => setIsCreateProjectOpen(false)}
        onCreateProject={createFashionProject}
      />
    </motion.div>
  );
};
