import React, { useState } from 'react';
import { Scissors, Sparkles, Layers, Tag, Check, Calendar, ArrowRight } from 'lucide-react';
import { Design, DesignStatus } from '../../types/atelier';
import { FabricSwatch, InspirationItem } from '../../types/inspiration';
import { SafaModal } from '../ui/SafaModal';
import { SafaButton } from '../ui/SafaButton';
import { SafaBadge } from '../ui/SafaBadge';

export interface DesignDetailModalProps {
  design: Design | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus?: (designId: string, status: DesignStatus) => void;
  allInspirations?: InspirationItem[];
  allFabrics?: FabricSwatch[];
}

export const DesignDetailModal: React.FC<DesignDetailModalProps> = ({
  design,
  isOpen,
  onClose,
  onUpdateStatus,
  allInspirations = [],
  allFabrics = [],
}) => {
  if (!design) return null;

  const [currentStatus, setCurrentStatus] = useState<DesignStatus>(design.status);
  const [activeTab, setActiveTab] = useState<'details' | 'draping' | 'connections'>('details');

  const handleStatusChange = (newStatus: DesignStatus) => {
    setCurrentStatus(newStatus);
    if (onUpdateStatus) {
      onUpdateStatus(design.id, newStatus);
    }
  };

  const linkedInspirations = allInspirations.filter((i) =>
    design.inspirationIds.includes(i.id)
  );
  const linkedFabrics = allFabrics.filter((f) =>
    design.materialIds.includes(f.id)
  );

  const statuses: DesignStatus[] = ['IDEA', 'DRAFT', 'DEVELOPING', 'FINAL'];

  return (
    <SafaModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Look 0${design.lookNumber} • ${design.title.replace(/^Look 0\d\s*•\s*/, '')}`}
      persianTitle={design.persianTitle}
      subtitle={`${design.silhouetteType} • ${design.version}`}
      type="sheet"
      maxWidth="xl"
      footer={
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <span className="text-[11px] font-semibold text-[#9E968D] uppercase mr-1">Status:</span>
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => handleStatusChange(st)}
                className={`text-[11px] px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
                  currentStatus === st
                    ? 'bg-[#1E1B18] text-[#FAF8F5] shadow-2xs'
                    : 'bg-[#FAF8F5] text-[#635E59] hover:bg-[#F3EFEA] border border-[#EAE4DC]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <SafaButton variant="ghost" size="sm" onClick={onClose}>
            Close
          </SafaButton>
        </div>
      }
    >
      <div className="space-y-6 text-left">
        {/* Visual Header Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {design.images.map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-[4/3] rounded-[14px] overflow-hidden border border-[#EAE4DC] shadow-xs"
            >
              <img
                src={img}
                alt={`${design.title} visual ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2">
                <SafaBadge variant="default" size="sm">
                  {idx === 0 ? 'Primary Look' : 'Detail'}
                </SafaBadge>
              </div>
            </div>
          ))}
        </div>

        {/* View Switcher: Details vs Draping & Pattern vs Connected Assets */}
        <div className="flex items-center gap-2 border-b border-[#EAE4DC] pb-2 text-[13px]">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-2 px-1 font-medium transition-colors cursor-pointer relative ${
              activeTab === 'details'
                ? 'text-[#C97D60] font-semibold'
                : 'text-[#635E59] hover:text-[#1E1B18]'
            }`}
          >
            Silhouette & Notes
            {activeTab === 'details' && (
              <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#C97D60] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('draping')}
            className={`pb-2 px-1 font-medium transition-colors cursor-pointer relative ${
              activeTab === 'draping'
                ? 'text-[#C97D60] font-semibold'
                : 'text-[#635E59] hover:text-[#1E1B18]'
            }`}
          >
            Pattern & Toile Drape
            {activeTab === 'draping' && (
              <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#C97D60] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('connections')}
            className={`pb-2 px-1 font-medium transition-colors cursor-pointer relative ${
              activeTab === 'connections'
                ? 'text-[#C97D60] font-semibold'
                : 'text-[#635E59] hover:text-[#1E1B18]'
            }`}
          >
            Connected Inspirations & Textiles ({linkedInspirations.length + linkedFabrics.length})
            {activeTab === 'connections' && (
              <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#C97D60] rounded-full" />
            )}
          </button>
        </div>

        {/* TAB 1: DETAILS */}
        {activeTab === 'details' && (
          <div className="space-y-4">
            <div className="p-4 rounded-[14px] bg-white border border-[#EAE4DC] space-y-2">
              <h4 className="text-[13px] font-semibold uppercase tracking-wider text-[#9E968D]">
                Look Concept & Description
              </h4>
              <p className="text-[14px] text-[#1E1B18] leading-relaxed">
                {design.description}
              </p>
            </div>

            <div className="p-4 rounded-[14px] bg-[#FAF8F5] border border-[#EAE4DC] space-y-2">
              <h4 className="text-[13px] font-semibold uppercase tracking-wider text-[#9E968D]">
                Studio Tailoring Notes
              </h4>
              <p className="text-[13px] text-[#635E59] leading-relaxed">
                {design.notes}
              </p>
              {design.persianNotes && (
                <p className="text-[12px] text-[#7D756C] font-persian leading-loose pt-1" dir="rtl">
                  {design.persianNotes}
                </p>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: DRAPING & TOILE SPECS */}
        {activeTab === 'draping' && (
          <div className="space-y-4">
            <div className="p-4 rounded-[14px] bg-white border border-[#EAE4DC] space-y-3">
              <h4 className="text-[14px] font-semibold text-[#1E1B18] flex items-center gap-2">
                <Scissors size={15} className="text-[#C97D60]" />
                Toile Draping & Pattern Engineering
              </h4>

              <p className="text-[13px] text-[#635E59] leading-relaxed">
                {design.drapingPatternNotes || 'Pattern drafted on standard size 38 French mannequin.'}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-[12px]">
                <div className="p-2.5 rounded-[10px] bg-[#FAF8F5] border border-[#EAE4DC]">
                  <span className="text-[10px] uppercase font-semibold text-[#9E968D] block">Silhouette Class</span>
                  <span className="font-medium text-[#1E1B18]">{design.silhouetteType}</span>
                </div>
                <div className="p-2.5 rounded-[10px] bg-[#FAF8F5] border border-[#EAE4DC]">
                  <span className="text-[10px] uppercase font-semibold text-[#9E968D] block">Iteration Version</span>
                  <span className="font-mono text-[#C97D60]">{design.version}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CONNECTED ASSETS */}
        {activeTab === 'connections' && (
          <div className="space-y-4">
            {/* Linked Inspirations */}
            <div className="space-y-2">
              <h4 className="text-[13px] font-semibold text-[#1E1B18] flex items-center gap-1.5">
                <Sparkles size={14} className="text-[#C97D60]" />
                Inspiring Source Works
              </h4>
              <div className="space-y-2">
                {linkedInspirations.length === 0 ? (
                  <p className="text-[12px] text-[#9E968D] italic">No inspirations linked yet.</p>
                ) : (
                  linkedInspirations.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-[12px] bg-white border border-[#EAE4DC] flex items-center gap-3"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-12 h-12 rounded-[8px] object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-semibold text-[#C97D60] uppercase tracking-wider block">
                          {item.category.replace('_', ' ')}
                        </span>
                        <h5 className="text-[13px] font-medium text-[#1E1B18] truncate">
                          {item.title}
                        </h5>
                        <span className="text-[11px] text-[#9E968D] block truncate">
                          {item.source}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Linked Fabrics */}
            <div className="space-y-2">
              <h4 className="text-[13px] font-semibold text-[#1E1B18] flex items-center gap-1.5">
                <Scissors size={14} className="text-[#5C6F59]" />
                Assigned Textile Swatches
              </h4>
              <div className="space-y-2">
                {linkedFabrics.length === 0 ? (
                  <p className="text-[12px] text-[#9E968D] italic">No fabric swatches linked yet.</p>
                ) : (
                  linkedFabrics.map((fab) => (
                    <div
                      key={fab.id}
                      className="p-3 rounded-[12px] bg-white border border-[#EAE4DC] flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className="w-8 h-8 rounded-[8px] border border-black/10 shrink-0"
                          style={{ backgroundColor: fab.hexColor }}
                        />
                        <div className="truncate">
                          <h5 className="text-[13px] font-medium text-[#1E1B18] truncate">
                            {fab.name}
                          </h5>
                          <span className="text-[11px] text-[#9E968D] block truncate">
                            {fab.material} • {fab.weight}
                          </span>
                        </div>
                      </div>

                      <span className="text-[11px] font-medium text-[#5C6F59] shrink-0 bg-[#EEF3EE] px-2 py-0.5 rounded-full border border-[#CDE0CC]">
                        {fab.drape}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </SafaModal>
  );
};
