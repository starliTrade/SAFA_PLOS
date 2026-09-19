import React, { useState } from 'react';
import { Sparkles, Scissors, CheckCircle2 } from 'lucide-react';
import { SafaModal } from '../ui/SafaModal';
import { SafaButton } from '../ui/SafaButton';
import { SafaInput, SafaTextarea } from '../ui/SafaInput';
import { useStateContext } from '../../context/StateContext';

export interface QuickCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickCaptureModal: React.FC<QuickCaptureModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addIntention, createDesign, addInspirationItem, fashionProjects } = useStateContext();

  const [captureType, setCaptureType] = useState<'intention' | 'design_idea' | 'inspiration'>('intention');
  const [text, setText] = useState('');
  const [persianText, setPersianText] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const activeProject = fashionProjects[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (captureType === 'intention') {
      addIntention(text.trim(), 'atelier');
    } else if (captureType === 'design_idea' && activeProject) {
      createDesign({
        title: text.trim(),
        persianTitle: persianText.trim() || undefined,
        description: 'Captured via quick studio thought.',
        status: 'IDEA',
        lookNumber: 7,
        silhouetteType: 'Draped Blouse',
        images: [
          imageUrl.trim() ||
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
        ],
        sketches: [],
        notes: text.trim(),
        drapingPatternNotes: 'Initial quick capture idea.',
        inspirationIds: [],
        materialIds: [],
        projectId: activeProject.id,
        version: 'v0.1',
      });
    } else if (captureType === 'inspiration') {
      addInspirationItem({
        title: text.trim(),
        persianTitle: persianText.trim() || text.trim(),
        imageUrl:
          imageUrl.trim() ||
          'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
        aspectRatio: 'portrait',
        source: 'Personal Studio Capture',
        mood: 'Spontaneous Inspo',
        category: 'architecture',
        colorPalette: [
          { hex: '#C97D60', name: 'Terracotta', persianName: 'اخرایی', role: 'dominant' },
          { hex: '#1E1B18', name: 'Charcoal', persianName: 'زغالی', role: 'neutral' },
          { hex: '#FAF8F5', name: 'Raw Silk', persianName: 'ابریشم خام', role: 'subtle' },
        ],
        tags: ['StudioCapture', 'Concept'],
        notes: text.trim(),
        isPinnedToAtelier: true,
        linkedProjectIds: activeProject ? [activeProject.id] : [],
      });
    }

    setText('');
    setPersianText('');
    setImageUrl('');
    onClose();
  };

  return (
    <SafaModal
      isOpen={isOpen}
      onClose={onClose}
      title="Quick Studio Capture"
      persianTitle="ثبت سریع ایده"
      subtitle="Capture thoughts, silhouette sketches, or intentions in seconds"
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
            disabled={!text.trim()}
          >
            Preserve in SAFA
          </SafaButton>
        </div>
      }
    >
      <div className="space-y-4 text-left">
        {/* Type selector */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F3EFEA] dark:bg-[#191614] rounded-full border border-[#EAE4DC] dark:border-[rgba(250,245,238,0.1)]">
          <button
            type="button"
            onClick={() => setCaptureType('intention')}
            className={`flex-1 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              captureType === 'intention'
                ? 'bg-white dark:bg-[#2C2723] text-[#1E1B18] dark:text-[#FAF5EE] shadow-xs'
                : 'text-[#635E59] dark:text-[#9E968D]'
            }`}
          >
            <CheckCircle2 size={13} />
            <span>Intention</span>
          </button>

          <button
            type="button"
            onClick={() => setCaptureType('design_idea')}
            className={`flex-1 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              captureType === 'design_idea'
                ? 'bg-white dark:bg-[#2C2723] text-[#1E1B18] dark:text-[#FAF5EE] shadow-xs'
                : 'text-[#635E59] dark:text-[#9E968D]'
            }`}
          >
            <Scissors size={13} />
            <span>Look Idea</span>
          </button>

          <button
            type="button"
            onClick={() => setCaptureType('inspiration')}
            className={`flex-1 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              captureType === 'inspiration'
                ? 'bg-white dark:bg-[#2C2723] text-[#1E1B18] dark:text-[#FAF5EE] shadow-xs'
                : 'text-[#635E59] dark:text-[#9E968D]'
            }`}
          >
            <Sparkles size={13} />
            <span>Inspiration</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <SafaTextarea
            label={
              captureType === 'intention'
                ? 'What is your focus?'
                : captureType === 'design_idea'
                ? 'Describe the Silhouette or Cut'
                : 'Inspiration Thought or Reference'
            }
            persianLabel="متن ایده یا یادداشت"
            placeholder="Type your thought..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            autoFocus
            required
          />

          <SafaInput
            label="Persian Translation / Title (Optional)"
            persianLabel="عنوان یا ترجمه فارسی"
            placeholder="مثال: اصلاح درز سرشانه"
            value={persianText}
            onChange={(e) => setPersianText(e.target.value)}
            dir="rtl"
          />

          {captureType !== 'intention' && (
            <SafaInput
              label="Image URL (Optional)"
              persianLabel="لینک تصویر"
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          )}
        </form>
      </div>
    </SafaModal>
  );
};
