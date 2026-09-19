import React, { useState } from 'react';
import { Pin, Check, Plus, FolderCheck, Sparkles } from 'lucide-react';
import { InspirationItem } from '../../types/inspiration';
import { FashionProject } from '../../types/atelier';
import { SafaModal } from '../ui/SafaModal';
import { SafaButton } from '../ui/SafaButton';
import { SafaBadge } from '../ui/SafaBadge';

export interface PinToProjectModalProps {
  item: InspirationItem | null;
  projects: FashionProject[];
  isOpen: boolean;
  onClose: () => void;
  onConfirmPin: (inspirationId: string, projectId: string) => void;
  onConfirmUnpin?: (inspirationId: string, projectId: string) => void;
}

export const PinToProjectModal: React.FC<PinToProjectModalProps> = ({
  item,
  projects,
  isOpen,
  onClose,
  onConfirmPin,
  onConfirmUnpin,
}) => {
  if (!item) return null;

  const [selectedProjectId, setSelectedProjectId] = useState<string>(
    projects[0]?.id || ''
  );
  const [justPinned, setJustPinned] = useState<boolean>(false);

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];
  const isAlreadyPinnedToSelected =
    activeProject && (item.linkedProjectIds?.includes(activeProject.id) || (item.isPinnedToAtelier && activeProject.id === 'proj_tehran_capsule'));

  const handleAction = () => {
    if (!activeProject) return;

    if (isAlreadyPinnedToSelected) {
      if (onConfirmUnpin) {
        onConfirmUnpin(item.id, activeProject.id);
      }
      onClose();
    } else {
      onConfirmPin(item.id, activeProject.id);
      setJustPinned(true);
      setTimeout(() => {
        setJustPinned(false);
        onClose();
      }, 900);
    }
  };

  return (
    <SafaModal
      isOpen={isOpen}
      onClose={onClose}
      title="Pin Inspiration to Atelier"
      persianTitle="اتصال الهام به پروژه استودیو"
      subtitle={`Connect "${item.title}" to a design collection`}
      maxWidth="md"
      type="dialog"
      footer={
        <div className="w-full flex items-center justify-between">
          <SafaButton variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </SafaButton>

          <SafaButton
            variant={isAlreadyPinnedToSelected ? 'outline' : 'atelier'}
            size="sm"
            icon={
              justPinned ? (
                <Check size={14} />
              ) : (
                <Pin size={14} className={isAlreadyPinnedToSelected ? 'fill-current' : ''} />
              )
            }
            onClick={handleAction}
          >
            {justPinned
              ? 'Connected!'
              : isAlreadyPinnedToSelected
              ? `Unpin from ${activeProject?.title.split(' ')[0]}`
              : `Pin to ${activeProject?.title || 'Collection'}`}
          </SafaButton>
        </div>
      }
    >
      <div className="space-y-4 text-left">
        {/* Item Preview Strip */}
        <div className="flex items-center gap-3 p-3 rounded-[14px] bg-white border border-[#EAE4DC] shadow-2xs">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-14 h-14 rounded-[10px] object-cover border border-[#EAE4DC] shrink-0"
          />
          <div className="overflow-hidden">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C97D60]">
              {item.category.replace('_', ' ')}
            </span>
            <h4 className="text-[13px] font-semibold text-[#1E1B18] truncate">
              {item.title}
            </h4>
            <span className="text-[11px] text-[#7D756C] font-persian block truncate" dir="rtl">
              {item.persianTitle}
            </span>
          </div>
        </div>

        {/* Project Selection */}
        <div className="space-y-2">
          <label className="text-[12px] font-semibold text-[#635E59] block">
            Target Atelier Project
          </label>

          <div className="space-y-2">
            {projects.map((proj) => {
              const isSelected = proj.id === selectedProjectId;
              const isLinked = item.linkedProjectIds?.includes(proj.id) || (item.isPinnedToAtelier && proj.id === 'proj_tehran_capsule');

              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={`p-3.5 rounded-[14px] border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-white border-[#C97D60] ring-2 ring-[#C97D60]/15 shadow-xs'
                      : 'bg-[#FAF8F5] border-[#EAE4DC] hover:border-[#DFD8CE]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-[#1E1B18]">
                        {proj.title}
                      </span>
                      <SafaBadge variant={proj.status.toLowerCase() as any} size="sm">
                        {proj.status}
                      </SafaBadge>
                    </div>
                    <span className="text-[11px] text-[#9E968D]">
                      {proj.season} • {proj.completedLooksCount || 0}/{proj.looksTargetCount || 6} Looks
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isLinked && (
                      <span className="text-[11px] text-[#5C6F59] font-medium flex items-center gap-1 bg-[#EEF3EE] px-2 py-0.5 rounded-full border border-[#CDE0CC]">
                        <Check size={11} /> Linked
                      </span>
                    )}
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? 'border-[#C97D60] bg-[#C97D60]'
                          : 'border-[#DFD8CE]'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-[11px] text-[#9E968D] leading-relaxed italic">
          Tip: Linking an inspiration connects its extracted mineral color swatches and textile drape logic directly to your lookbook line sheets.
        </p>
      </div>
    </SafaModal>
  );
};
