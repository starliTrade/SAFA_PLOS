import React, { useState } from 'react';
import { Plus, Sparkles, Scissors, Palette } from 'lucide-react';
import { FashionProject, ProjectStatus } from '../../types/atelier';
import { SafaModal } from '../ui/SafaModal';
import { SafaButton } from '../ui/SafaButton';
import { SafaInput, SafaTextarea } from '../ui/SafaInput';

export interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: Omit<FashionProject, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onCreateProject,
}) => {
  const [title, setTitle] = useState('');
  const [persianTitle, setPersianTitle] = useState('');
  const [season, setSeason] = useState('Fall/Winter 2026-27');
  const [concept, setConcept] = useState('');
  const [persianConcept, setPersianConcept] = useState('');
  const [targetLooks, setTargetLooks] = useState(6);
  const [status, setStatus] = useState<ProjectStatus>('ACTIVE');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreateProject({
      title: title.trim(),
      persianTitle: persianTitle.trim() || undefined,
      description: concept.trim() || 'New fashion design thesis collection.',
      status,
      concept: concept.trim() || 'Architectural silhouette development.',
      persianConcept: persianConcept.trim() || undefined,
      season: season.trim() || 'Fall/Winter 2026-27',
      palette: [
        { hex: '#C97D60', name: 'Terracotta Ochre', persianName: 'اخرایی', role: 'dominant' },
        { hex: '#5C6F59', name: 'Persian Laurel', persianName: 'برگ‌بو', role: 'accent' },
        { hex: '#1E1B18', name: 'Espresso', persianName: 'سیاه شب', role: 'neutral' },
        { hex: '#FAF8F5', name: 'Raw Silk', persianName: 'حریر خام', role: 'subtle' },
      ],
      inspirationIds: [],
      moodboardIds: [],
      designIds: [],
      materialIds: [],
      looksTargetCount: Number(targetLooks) || 6,
      completedLooksCount: 0,
      notes: 'Initial atelier draft initialized.',
    });

    setTitle('');
    setPersianTitle('');
    setConcept('');
    setPersianConcept('');
    onClose();
  };

  return (
    <SafaModal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Atelier Project"
      persianTitle="ایجاد پروژه جدید در استودیو"
      subtitle="Define a new fashion collection, thesis capsule, or creative series"
      type="dialog"
      maxWidth="md"
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
            Create Collection
          </SafaButton>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <SafaInput
          label="Collection Title"
          persianLabel="نام کالکشن"
          placeholder="e.g. Isfahan Vault Capsule"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <SafaInput
          label="Persian Title (Optional)"
          persianLabel="عنوان فارسی"
          placeholder="مثال: کپسول طاق‌های اصفهان"
          value={persianTitle}
          onChange={(e) => setPersianTitle(e.target.value)}
          dir="rtl"
        />

        <div className="grid grid-cols-2 gap-3">
          <SafaInput
            label="Season"
            persianLabel="فصل"
            placeholder="e.g. Fall / Winter 2026-27"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          />

          <SafaInput
            label="Target Looks Count"
            persianLabel="تعداد لوک‌ها"
            type="number"
            min={1}
            max={24}
            value={targetLooks}
            onChange={(e) => setTargetLooks(Number(e.target.value))}
          />
        </div>

        <SafaTextarea
          label="Core Design Concept & Philosophy"
          persianLabel="ایده و کانسپت اصلی"
          placeholder="Describe the architectural motif, drape physics, or textile story..."
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          rows={3}
        />
      </form>
    </SafaModal>
  );
};
