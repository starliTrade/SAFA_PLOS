import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Scissors,
  Sparkles,
  Palette,
  Plus,
  Compass,
  Layers,
  BookOpen,
  Pin,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { FashionProject, ProjectStatus, Design, DesignStatus } from '../../types/atelier';
import { InspirationItem, FabricSwatch } from '../../types/inspiration';
import { ProjectInspirationRail } from './ProjectInspirationRail';
import { MaterialRail } from './MaterialRail';
import { DesignCard } from './DesignCard';
import { DesignDetailModal } from './DesignDetailModal';
import { Moodboard } from './Moodboard';
import { CreateDesignModal } from './CreateDesignModal';
import { InspirationDetailModal } from '../inspiration/InspirationDetailModal';
import { ColorPaletteBar } from '../inspiration/ColorPaletteBar';
import { SafaButton } from '../ui/SafaButton';
import { SafaBadge } from '../ui/SafaBadge';
import { transitions } from '../../theme/motion';

export interface FashionProjectDetailProps {
  project: FashionProject;
  designs: Design[];
  allInspirations: InspirationItem[];
  allFabrics: FabricSwatch[];
  onBack: () => void;
  onUpdateProjectStatus: (projectId: string, status: ProjectStatus) => void;
  onUnpinInspiration: (inspirationId: string, projectId: string) => void;
  onUnlinkMaterial: (materialId: string, projectId: string) => void;
  onCreateDesign: (design: Omit<Design, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateDesignStatus: (designId: string, status: DesignStatus) => void;
  onNavigateToInspirations?: () => void;
}

export const FashionProjectDetail: React.FC<FashionProjectDetailProps> = ({
  project,
  designs,
  allInspirations,
  allFabrics,
  onBack,
  onUpdateProjectStatus,
  onUnpinInspiration,
  onUnlinkMaterial,
  onCreateDesign,
  onUpdateDesignStatus,
  onNavigateToInspirations,
}) => {
  // Tabs inside workspace: 'workspace' (all-in-one overview) | 'looks' (line sheets) | 'moodboard' (visual canvas) | 'materials' (fabrics)
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'workspace' | 'looks' | 'moodboard' | 'materials'>('workspace');

  // Modals state
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [isDesignModalOpen, setIsDesignModalOpen] = useState<boolean>(false);
  const [isCreateDesignOpen, setIsCreateDesignOpen] = useState<boolean>(false);
  const [selectedInspiration, setSelectedInspiration] = useState<InspirationItem | null>(null);
  const [isInspirationModalOpen, setIsInspirationModalOpen] = useState<boolean>(false);

  const projectInspirations = allInspirations.filter((i) =>
    project.inspirationIds.includes(i.id)
  );

  const projectFabrics = allFabrics.filter((f) =>
    project.materialIds.includes(f.id)
  );

  const projectDesigns = designs.filter((d) => d.projectId === project.id);

  const handleOpenDesign = (design: Design) => {
    setSelectedDesign(design);
    setIsDesignModalOpen(true);
  };

  const handleOpenInspiration = (item: InspirationItem) => {
    setSelectedInspiration(item);
    setIsInspirationModalOpen(true);
  };

  const progressPercent = project.looksTargetCount
    ? Math.round(((project.completedLooksCount || 0) / project.looksTargetCount) * 100)
    : 0;

  const statuses: ProjectStatus[] = ['IDEA', 'PLANNING', 'ACTIVE', 'PAUSED', 'COMPLETED', 'ARCHIVED'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={transitions.easeAtmospheric}
      className="space-y-6 pb-28 max-w-4xl mx-auto text-left"
    >
      {/* Top Breadcrumb & Status Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EAE4DC] pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-[#F3EFEA] text-[#635E59] hover:text-[#1E1B18] transition-colors cursor-pointer flex items-center gap-1.5 text-[13px] font-medium"
          >
            <ArrowLeft size={16} />
            <span>Atelier Overview</span>
          </button>
          <span className="text-[#DFD8CE]">/</span>
          <span className="text-[13px] font-semibold text-[#1E1B18] truncate max-w-[200px]">
            {project.title}
          </span>
        </div>

        {/* Project Status Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-[11px] font-semibold text-[#9E968D] uppercase mr-1">Status:</span>
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => onUpdateProjectStatus(project.id, st)}
              className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
                project.status === st
                  ? 'bg-[#1E1B18] text-[#FAF8F5] shadow-xs'
                  : 'bg-[#FAF8F5] text-[#635E59] hover:bg-[#F3EFEA] border border-[#EAE4DC]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Project Master Hero Card */}
      <div className="rounded-[22px] bg-white border border-[#EAE4DC] p-6 sm:p-7 shadow-[0_1px_3px_rgba(30,27,24,0.03),0_4px_14px_rgba(30,27,24,0.04)] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C97D60] bg-[#F7EDE8] px-2.5 py-0.5 rounded-full border border-[#F0D5C9]">
                {project.season}
              </span>
              <span className="text-[11px] font-mono text-[#9E968D]">
                Thesis Collection
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-editorial font-normal text-[#1E1B18] tracking-tight">
              {project.title}
            </h1>

            {project.persianTitle && (
              <span className="text-[16px] text-[#7D756C] font-persian block -mt-1" dir="rtl">
                {project.persianTitle}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <SafaButton
              variant="atelier"
              size="sm"
              icon={<Plus size={14} />}
              onClick={() => setIsCreateDesignOpen(true)}
            >
              Draft New Look
            </SafaButton>
          </div>
        </div>

        {/* Philosophy Concept Banner */}
        <div className="p-4 rounded-[14px] bg-[#FAF8F5] border border-[#EAE4DC] space-y-2">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9E968D]">
            Creative Direction & Architectural Narrative
          </span>
          <p className="text-[14px] text-[#1E1B18] leading-relaxed">
            "{project.concept || project.description}"
          </p>
          {project.persianConcept && (
            <p className="text-[13px] text-[#7D756C] font-persian leading-loose" dir="rtl">
              «{project.persianConcept}»
            </p>
          )}
        </div>

        {/* Palette & Look Progress Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#EAE4DC]/60">
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#9E968D]">
              Harmonized Mineral Palette
            </span>
            <ColorPaletteBar palette={project.palette} size="md" showLabels />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-semibold text-[#1E1B18]">
                Collection Looks ({projectDesigns.length} of {project.looksTargetCount || 6})
              </span>
              <span className="font-mono text-[#C97D60] font-semibold">
                {progressPercent}% Complete
              </span>
            </div>
            <div className="w-full h-2 bg-[#EAE4DC] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C97D60] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Internal Navigation Tabs: Overview vs Line Sheets vs Moodboard vs Fabrics */}
      <div className="flex items-center gap-1.5 p-1 bg-[#F3EFEA] rounded-full border border-[#EAE4DC] w-fit">
        <button
          onClick={() => setActiveWorkspaceTab('workspace')}
          className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
            activeWorkspaceTab === 'workspace'
              ? 'bg-white text-[#1E1B18] shadow-xs'
              : 'text-[#635E59] hover:text-[#1E1B18]'
          }`}
        >
          <Layers size={13} />
          <span>Studio Workspace</span>
        </button>

        <button
          onClick={() => setActiveWorkspaceTab('looks')}
          className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
            activeWorkspaceTab === 'looks'
              ? 'bg-white text-[#1E1B18] shadow-xs'
              : 'text-[#635E59] hover:text-[#1E1B18]'
          }`}
        >
          <Scissors size={13} />
          <span>Line Sheets ({projectDesigns.length})</span>
        </button>

        <button
          onClick={() => setActiveWorkspaceTab('moodboard')}
          className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
            activeWorkspaceTab === 'moodboard'
              ? 'bg-white text-[#1E1B18] shadow-xs'
              : 'text-[#635E59] hover:text-[#1E1B18]'
          }`}
        >
          <Compass size={13} />
          <span>Moodboard</span>
        </button>

        <button
          onClick={() => setActiveWorkspaceTab('materials')}
          className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
            activeWorkspaceTab === 'materials'
              ? 'bg-white text-[#1E1B18] shadow-xs'
              : 'text-[#635E59] hover:text-[#1E1B18]'
          }`}
        >
          <Palette size={13} />
          <span>Fabrics ({projectFabrics.length})</span>
        </button>
      </div>

      {/* VIEW 1: STUDIO WORKSPACE (Unified Creative Loop) */}
      {activeWorkspaceTab === 'workspace' && (
        <div className="space-y-7">
          {/* SECTION A: LINKED INSPIRATION RAIL */}
          <ProjectInspirationRail
            inspirations={projectInspirations}
            projectId={project.id}
            onUnpin={onUnpinInspiration}
            onSelectInspiration={handleOpenInspiration}
            onAddInspirationTrigger={onNavigateToInspirations}
          />

          {/* SECTION B: DESIGNS & SILHOUETTE LINE SHEETS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-[8px] bg-[#F7EDE8] border border-[#F0D5C9] flex items-center justify-center text-[#C97D60]">
                  <Scissors size={13} />
                </div>
                <h3 className="text-[15px] font-semibold text-[#1E1B18] tracking-tight">
                  Silhouette Line Sheets & Lookbook
                </h3>
                <span className="text-[11px] font-mono text-[#9E968D]">
                  ({projectDesigns.length} Looks)
                </span>
              </div>

              <SafaButton
                variant="ghost"
                size="xs"
                icon={<Plus size={12} />}
                onClick={() => setIsCreateDesignOpen(true)}
              >
                Draft Look
              </SafaButton>
            </div>

            {projectDesigns.length === 0 ? (
              <div className="p-8 text-center rounded-[16px] border border-dashed border-[#DFD8CE] bg-[#FAF8F5] space-y-2">
                <p className="text-[13px] text-[#635E59]">
                  Every collection begins with a first idea.
                </p>
                <span className="text-[12px] text-[#9E968D] font-persian block" dir="rtl">
                  نخستین سیلوئت یا لوک این کپسول را ترسیم کنید.
                </span>
                <SafaButton
                  variant="atelier"
                  size="xs"
                  className="mt-2"
                  onClick={() => setIsCreateDesignOpen(true)}
                >
                  Draft First Look
                </SafaButton>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {projectDesigns.map((design) => (
                  <DesignCard
                    key={design.id}
                    design={design}
                    onSelect={handleOpenDesign}
                  />
                ))}
              </div>
            )}
          </div>

          {/* SECTION C: LINKED MATERIALS & TEXTILES */}
          <MaterialRail
            fabrics={projectFabrics}
            projectId={project.id}
            onUnlink={onUnlinkMaterial}
            onAddMaterialTrigger={onNavigateToInspirations}
          />
        </div>
      )}

      {/* VIEW 2: LOOKS ONLY */}
      {activeWorkspaceTab === 'looks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#635E59]">
              Complete Lookbook Directory for <strong>{project.title}</strong>
            </span>
            <SafaButton
              variant="atelier"
              size="sm"
              icon={<Plus size={14} />}
              onClick={() => setIsCreateDesignOpen(true)}
            >
              Add New Look
            </SafaButton>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {projectDesigns.map((design) => (
              <DesignCard
                key={design.id}
                design={design}
                onSelect={handleOpenDesign}
              />
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: MOODBOARD */}
      {activeWorkspaceTab === 'moodboard' && (
        <Moodboard
          moodboard={{
            id: `mb_${project.id}`,
            projectId: project.id,
            title: `${project.title} • Visual Direction`,
            persianTitle: project.persianTitle ? `برد هدایت ${project.persianTitle}` : undefined,
            description: project.concept,
            visualInspirationIds: project.inspirationIds,
            colorPalette: project.palette,
            pinnedNotes: [
              {
                id: 'pn_1',
                text: 'Balance structured architectural gabardine with sheer silk layering.',
                persianText: 'تعادل بین گاباردین معمارانه و لایه‌های حریر ابریشم خزر.',
              },
              {
                id: 'pn_2',
                text: 'Natural herbal immersion saffron dyes for all accent sashes.',
                persianText: 'رنگرزی گیاهی با زعفران قائنات برای شال‌های تکمیلی.',
              },
            ],
            updatedAt: project.updatedAt,
          }}
          inspirations={projectInspirations}
          onOpenInspiration={handleOpenInspiration}
        />
      )}

      {/* VIEW 4: FABRIC LIBRARY FOR THIS PROJECT */}
      {activeWorkspaceTab === 'materials' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#635E59]">
              Assigned textile swatches and Grand Bazaar yardages
            </span>
            {onNavigateToInspirations && (
              <SafaButton
                variant="subtle"
                size="sm"
                icon={<Plus size={13} />}
                onClick={onNavigateToInspirations}
              >
                Browse All Fabrics
              </SafaButton>
            )}
          </div>

          <MaterialRail
            fabrics={projectFabrics}
            projectId={project.id}
            onUnlink={onUnlinkMaterial}
            onAddMaterialTrigger={onNavigateToInspirations}
          />
        </div>
      )}

      {/* Design Detail Modal */}
      <DesignDetailModal
        design={selectedDesign}
        isOpen={isDesignModalOpen}
        onClose={() => setIsDesignModalOpen(false)}
        onUpdateStatus={onUpdateDesignStatus}
        allInspirations={allInspirations}
        allFabrics={allFabrics}
      />

      {/* Inspiration Detail Modal */}
      <InspirationDetailModal
        item={selectedInspiration}
        isOpen={isInspirationModalOpen}
        onClose={() => setIsInspirationModalOpen(false)}
      />

      {/* Create New Look Modal */}
      <CreateDesignModal
        projectId={project.id}
        nextLookNumber={projectDesigns.length + 1}
        isOpen={isCreateDesignOpen}
        onClose={() => setIsCreateDesignOpen(false)}
        onCreateDesign={onCreateDesign}
        availableInspirations={projectInspirations}
        availableFabrics={projectFabrics}
      />
    </motion.div>
  );
};
