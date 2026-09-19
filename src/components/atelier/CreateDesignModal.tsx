import React, { useState } from 'react';
import { Scissors, Sparkles, Plus } from 'lucide-react';
import { Design, DesignStatus } from '../../types/atelier';
import { FabricSwatch, InspirationItem } from '../../types/inspiration';
import { SafaModal } from '../ui/SafaModal';
import { SafaButton } from '../ui/SafaButton';
import { SafaInput, SafaTextarea } from '../ui/SafaInput';

export interface CreateDesignModalProps {
  projectId: string;
  nextLookNumber: number;
  isOpen: boolean;
  onClose: () => void;
  onCreateDesign: (design: Omit<Design, 'id' | 'createdAt' | 'updatedAt'>) => void;
  availableInspirations: InspirationItem[];
  availableFabrics: FabricSwatch[];
}

export const CreateDesignModal: React.FC<CreateDesignModalProps> = ({
  projectId,
  nextLookNumber,
  isOpen,
  onClose,
  onCreateDesign,
  availableInspirations,
  availableFabrics,
}) => {
  const [title, setTitle] = useState(`Look 0${nextLookNumber} • Silhouette Piece`);
  const [persianTitle, setPersianTitle] = useState('');
  const [silhouetteType, setSilhouetteType] = useState<Design['silhouetteType']>('Overcoat');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedInspirationIds, setSelectedInspirationIds] = useState<string[]>([]);
  const [selectedFabricIds, setSelectedFabricIds] = useState<string[]>([]);
  const [status, setStatus] = useState<DesignStatus>('IDEA');

  const silhouetteOptions: Array<Design['silhouetteType']> = [
    'Overcoat',
    'Structured Cape',
    'Draped Blouse',
    'Tunic & Sashes',
    'Pleated Skirt',
    'Evening Tuxedo',
  ];

  const handleToggleInspiration = (id: string) => {
    setSelectedInspirationIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleToggleFabric = (id: string) => {
    setSelectedFabricIds((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreateDesign({
      title: title.trim(),
      persianTitle: persianTitle.trim() || undefined,
      description: description.trim() || 'New silhouette design line sheet.',
      status,
      lookNumber: nextLookNumber,
      silhouetteType,
      images: [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      ],
      sketches: [],
      notes: notes.trim() || 'Drafted in atelier.',
      drapingPatternNotes: `Drafted for Look 0${nextLookNumber} on standard French form.`,
      inspirationIds: selectedInspirationIds,
      materialIds: selectedFabricIds,
      projectId,
      version: 'v1.0 (Concept Draft)',
    });

    setTitle(`Look 0${nextLookNumber + 1} • Silhouette Piece`);
    setPersianTitle('');
    setDescription('');
    setNotes('');
    setSelectedInspirationIds([]);
    setSelectedFabricIds([]);
    onClose();
  };

  return (
    <SafaModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Create Look 0${nextLookNumber}`}
      persianTitle={`طراحی لوک ۰${nextLookNumber}`}
      subtitle="Draft a new garment silhouette and connect inspiring sources"
      type="sheet"
      maxWidth="lg"
      footer={
        <div className="w-full flex items-center justify-between">
          <SafaButton variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </SafaButton>
          <SafaButton
            variant="atelier"
            size="sm"
            onClick={handleSubmit}
            disabled={!title.trim()}
          >
            Save Design Look
          </SafaButton>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <SafaInput
          label="Design Look Title"
          persianLabel="عنوان لوک"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="space-y-1.5">
          <label className="text-[12px] font-medium text-[#635E59]">
            Silhouette Category
          </label>
          <div className="flex flex-wrap gap-1.5">
            {silhouetteOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setSilhouetteType(opt)}
                className={`text-[12px] px-3 py-1.5 rounded-[10px] font-medium transition-all cursor-pointer ${
                  silhouetteType === opt
                    ? 'bg-[#1E1B18] text-[#FAF8F5] shadow-xs'
                    : 'bg-[#FAF8F5] text-[#635E59] hover:bg-[#F3EFEA] border border-[#EAE4DC]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <SafaTextarea
          label="Design Description"
          persianLabel="توضیحات فرم و برش"
          placeholder="Describe the silhouette, proportions, cut, and layering..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />

        {/* Link Available Inspirations */}
        {availableInspirations.length > 0 && (
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-[#635E59] flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#C97D60]" />
              Connect Inspiring Visual Reference
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto custom-scrollbar p-1">
              {availableInspirations.map((insp) => {
                const isSelected = selectedInspirationIds.includes(insp.id);
                return (
                  <div
                    key={insp.id}
                    onClick={() => handleToggleInspiration(insp.id)}
                    className={`p-2 rounded-[10px] border flex items-center gap-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#F7EDE8] border-[#C97D60] ring-1 ring-[#C97D60]'
                        : 'bg-white border-[#EAE4DC] hover:border-[#DFD8CE]'
                    }`}
                  >
                    <img
                      src={insp.imageUrl}
                      alt={insp.title}
                      className="w-8 h-8 rounded-[6px] object-cover shrink-0"
                    />
                    <span className="text-[11px] font-medium text-[#1E1B18] truncate">
                      {insp.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Link Available Fabrics */}
        {availableFabrics.length > 0 && (
          <div className="space-y-1.5">
            <label className="text-[12px] font-medium text-[#635E59] flex items-center gap-1.5">
              <Scissors size={13} className="text-[#5C6F59]" />
              Assign Fabric Swatch
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto custom-scrollbar p-1">
              {availableFabrics.map((fab) => {
                const isSelected = selectedFabricIds.includes(fab.id);
                return (
                  <div
                    key={fab.id}
                    onClick={() => handleToggleFabric(fab.id)}
                    className={`p-2 rounded-[10px] border flex items-center gap-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#EEF3EE] border-[#5C6F59] ring-1 ring-[#5C6F59]'
                        : 'bg-white border-[#EAE4DC] hover:border-[#DFD8CE]'
                    }`}
                  >
                    <div
                      className="w-6 h-6 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: fab.hexColor }}
                    />
                    <span className="text-[11px] font-medium text-[#1E1B18] truncate">
                      {fab.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </form>
    </SafaModal>
  );
};
