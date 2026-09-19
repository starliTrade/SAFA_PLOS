import React from 'react';
import {
  Scissors,
  Sparkles,
  Bookmark,
  Target,
  ExternalLink,
  Pin,
  Tag,
  MapPin,
  Calendar,
  Layers,
} from 'lucide-react';
import { useNavigation } from '../../navigation/NavigationContext';
import { useStateContext } from '../../context/StateContext';
import { BottomSheet } from '../primitives/BottomSheet';
import { Badge } from '../primitives/Badge';

export const PreviewSheet: React.FC = () => {
  const {
    peekItem,
    setPeekItem,
    navigateToDomain,
    navigateToExperience,
    selectProject,
    selectDesign,
  } = useNavigation();
  const {
    inspirationItems,
    designs,
    fashionProjects,
    resurfacedMemory,
  } = useStateContext();

  if (!peekItem) return null;

  const handleClose = () => setPeekItem(null);

  // Resolve item based on type
  if (peekItem.type === 'inspiration') {
    const item = inspirationItems.find((i) => i.id === peekItem.id);
    if (!item) return null;

    return (
      <BottomSheet
        isOpen={Boolean(peekItem)}
        onClose={handleClose}
        title={item.title}
        persianTitle={item.persianTitle}
        subtitle={`Inspiration • ${item.category} (${item.source || 'Sensorial'})`}
        footer={
          <div className="flex items-center justify-between gap-3">
            <span className="text-[12px] text-[var(--safa-content-muted)]">
              {item.linkedProjectIds?.length || 0} pinned capsule(s)
            </span>
            <button
              onClick={() => {
                handleClose();
                navigateToDomain('media');
              }}
              className="px-3 py-1.5 rounded-lg bg-[var(--safa-accent-primary)] text-white text-[12px] font-medium flex items-center gap-1.5 hover:bg-[var(--safa-accent-primary-hover)] transition-colors cursor-pointer"
            >
              <span>Open in Media Universe</span>
              <ExternalLink size={13} />
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          {item.imageUrl && (
            <div className="w-full h-48 rounded-xl overflow-hidden border border-[var(--safa-border-subtle)] bg-[var(--safa-bg-surface-subtle)]">
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {item.notes && (
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--safa-content-muted)]">
                Sensorial Notes
              </span>
              <p className="text-[13px] text-[var(--safa-content-secondary)] leading-relaxed">
                {item.notes}
              </p>
            </div>
          )}

          {item.persianNotes && (
            <div className="p-3 rounded-lg bg-[var(--safa-bg-surface-subtle)] border border-[var(--safa-border-subtle)] text-right" dir="rtl">
              <p className="font-persian text-[13px] text-[var(--safa-content-primary)] leading-relaxed">
                {item.persianNotes}
              </p>
            </div>
          )}

          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.tags.map((tag) => (
                <Badge key={tag} size="xs" variant="default">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </BottomSheet>
    );
  }

  if (peekItem.type === 'design') {
    const design = designs.find((d) => d.id === peekItem.id);
    if (!design) return null;

    const previewImg = design.sketches?.[0] || design.images?.[0];

    return (
      <BottomSheet
        isOpen={Boolean(peekItem)}
        onClose={handleClose}
        title={design.title}
        persianTitle={design.persianTitle}
        subtitle={`Look • ${design.silhouetteType} (${design.status})`}
        footer={
          <div className="flex items-center justify-between gap-3">
            <span className="text-[12px] text-[var(--safa-content-muted)] capitalize">
              Status: {design.status}
            </span>
            <button
              onClick={() => {
                handleClose();
                navigateToDomain('create', {
                  projectId: design.projectId,
                  designId: design.id,
                });
              }}
              className="px-3 py-1.5 rounded-lg bg-[var(--safa-accent-primary)] text-white text-[12px] font-medium flex items-center gap-1.5 hover:bg-[var(--safa-accent-primary-hover)] transition-colors cursor-pointer"
            >
              <span>Open in Atelier</span>
              <Scissors size={13} />
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          {previewImg && (
            <div className="w-full h-48 rounded-xl overflow-hidden border border-[var(--safa-border-subtle)] bg-[var(--safa-bg-surface-subtle)]">
              <img
                src={previewImg}
                alt={design.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--safa-content-muted)]">
              Description & Silhouette
            </span>
            <p className="text-[13px] text-[var(--safa-content-secondary)] mt-1 leading-relaxed">
              {design.description}
            </p>
          </div>

          {design.persianNotes && (
            <div className="p-3 rounded-lg bg-[var(--safa-bg-surface-subtle)] text-right" dir="rtl">
              <p className="font-persian text-[13px] text-[var(--safa-content-primary)]">
                {design.persianNotes}
              </p>
            </div>
          )}

          {design.drapingPatternNotes && (
            <div className="space-y-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--safa-content-muted)]">
                Draping Pattern Notes
              </span>
              <p className="text-[12.5px] text-[var(--safa-content-secondary)]">
                {design.drapingPatternNotes}
              </p>
            </div>
          )}
        </div>
      </BottomSheet>
    );
  }

  if (peekItem.type === 'project') {
    const project = fashionProjects.find((p) => p.id === peekItem.id);
    if (!project) return null;

    return (
      <BottomSheet
        isOpen={Boolean(peekItem)}
        onClose={handleClose}
        title={project.title}
        persianTitle={project.persianTitle}
        subtitle={`Capsule • ${project.season} (${project.status})`}
        footer={
          <div className="flex items-center justify-between gap-3">
            <span className="text-[12px] text-[var(--safa-content-muted)]">
              {project.completedLooksCount || 0}/{project.looksTargetCount || 6} Looks
            </span>
            <button
              onClick={() => {
                handleClose();
                navigateToDomain('create', { projectId: project.id });
              }}
              className="px-3 py-1.5 rounded-lg bg-[var(--safa-accent-primary)] text-white text-[12px] font-medium flex items-center gap-1.5 hover:bg-[var(--safa-accent-primary-hover)] transition-colors cursor-pointer"
            >
              <span>Open Project Detail</span>
              <ExternalLink size={13} />
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          {project.coverImage && (
            <div className="w-full h-44 rounded-xl overflow-hidden border border-[var(--safa-border-subtle)]">
              <img
                src={project.coverImage}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--safa-content-muted)]">
              Concept Statement
            </span>
            <p className="text-[13px] text-[var(--safa-content-secondary)] mt-1">
              {project.concept}
            </p>
          </div>
          {project.persianConcept && (
            <div className="p-3 rounded-lg bg-[var(--safa-bg-surface-subtle)] text-right" dir="rtl">
              <p className="font-persian text-[13px] text-[var(--safa-content-primary)]">
                {project.persianConcept}
              </p>
            </div>
          )}
        </div>
      </BottomSheet>
    );
  }

  if (peekItem.type === 'memory') {
    const memory = resurfacedMemory;
    if (!memory) return null;

    return (
      <BottomSheet
        isOpen={Boolean(peekItem)}
        onClose={handleClose}
        title={memory.title}
        persianTitle={memory.persianTitle}
        subtitle={`Memory Archive • ${memory.location}`}
        footer={
          <div className="flex items-center justify-between gap-3">
            <span className="text-[12px] text-[var(--safa-content-muted)]">
              {memory.date}
            </span>
            <button
              onClick={() => {
                handleClose();
                navigateToDomain('more');
              }}
              className="px-3 py-1.5 rounded-lg bg-[var(--safa-accent-secondary)] text-white text-[12px] font-medium flex items-center gap-1.5 hover:bg-[var(--safa-accent-secondary-hover)] transition-colors cursor-pointer"
            >
              <span>Open in Memories</span>
              <Bookmark size={13} />
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          {memory.imageUrl && (
            <div className="w-full h-48 rounded-xl overflow-hidden border border-[var(--safa-border-subtle)]">
              <img
                src={memory.imageUrl}
                alt={memory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {memory.quote && (
            <blockquote className="font-editorial text-[17px] text-[var(--safa-content-primary)] italic border-l-2 border-[var(--safa-accent-primary)] pl-3">
              "{memory.quote}"
            </blockquote>
          )}

          {memory.persianQuote && (
            <blockquote
              className="font-persian text-[14px] text-[var(--safa-content-secondary)] border-r-2 border-[var(--safa-accent-secondary)] pr-3 text-right"
              dir="rtl"
            >
              «{memory.persianQuote}»
            </blockquote>
          )}
        </div>
      </BottomSheet>
    );
  }

  return null;
};
