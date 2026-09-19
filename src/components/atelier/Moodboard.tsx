import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Palette, Plus, Pin, StickyNote } from 'lucide-react';
import { Moodboard as MoodboardType } from '../../types/atelier';
import { InspirationItem } from '../../types/inspiration';
import { ColorPaletteBar } from '../inspiration/ColorPaletteBar';
import { SafaButton } from '../ui/SafaButton';
import { transitions } from '../../theme/motion';

export interface MoodboardProps {
  moodboard: MoodboardType;
  inspirations: InspirationItem[];
  onOpenInspiration?: (item: InspirationItem) => void;
  className?: string;
}

export const Moodboard: React.FC<MoodboardProps> = ({
  moodboard,
  inspirations,
  onOpenInspiration,
  className = '',
}) => {
  const [pinnedNotes, setPinnedNotes] = useState(moodboard.pinnedNotes || []);
  const [newNoteText, setNewNoteText] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    const newNote = {
      id: `pnote_${Date.now()}`,
      text: newNoteText.trim(),
    };
    setPinnedNotes([...pinnedNotes, newNote]);
    setNewNoteText('');
    setIsAddingNote(false);
  };

  return (
    <div className={`space-y-4 text-left ${className}`}>
      {/* Moodboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C97D60] bg-[#F7EDE8] px-2 py-0.5 rounded-full border border-[#F0D5C9]">
              Visual Direction Board
            </span>
            {moodboard.persianTitle && (
              <span className="text-[12px] text-[#9E968D] font-persian">
                {moodboard.persianTitle}
              </span>
            )}
          </div>
          <h3 className="text-[17px] font-semibold text-[#1E1B18] mt-0.5">
            {moodboard.title}
          </h3>
          {moodboard.description && (
            <p className="text-[12px] text-[#635E59] mt-0.5 max-w-xl">
              {moodboard.description}
            </p>
          )}
        </div>

        <SafaButton
          variant="subtle"
          size="xs"
          icon={<StickyNote size={12} />}
          onClick={() => setIsAddingNote((v) => !v)}
        >
          Add Sticky Note
        </SafaButton>
      </div>

      {/* Adding Note inline input */}
      {isAddingNote && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-[#FAF6EE] rounded-[14px] border border-[#EADBCC] flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Write a studio design direction note..."
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
            className="flex-1 bg-transparent text-[13px] text-[#1E1B18] placeholder-[#9E968D] outline-none"
            autoFocus
          />
          <SafaButton variant="atelier" size="xs" onClick={handleAddNote}>
            Pin Note
          </SafaButton>
          <SafaButton variant="ghost" size="xs" onClick={() => setIsAddingNote(false)}>
            Cancel
          </SafaButton>
        </motion.div>
      )}

      {/* Moodboard Canvas Composition */}
      <div className="p-4 sm:p-5 rounded-[20px] bg-gradient-to-b from-[#FAF8F5] to-[#F5F1EB] border border-[#EAE4DC] shadow-inner space-y-4">
        {/* Extracted Palette Strip */}
        <div className="flex items-center justify-between p-3 rounded-[12px] bg-white/90 backdrop-blur-md border border-[#EAE4DC]">
          <div className="flex items-center gap-2">
            <Palette size={14} className="text-[#C97D60]" />
            <span className="text-[12px] font-semibold text-[#1E1B18]">
              Collection Harmonized Mineral Palette
            </span>
          </div>
          <ColorPaletteBar palette={moodboard.colorPalette} size="sm" showLabels />
        </div>

        {/* Visual Composition Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {inspirations.map((item, idx) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.02 }}
              transition={transitions.springTactile}
              onClick={() => onOpenInspiration && onOpenInspiration(item)}
              className="group relative rounded-[14px] overflow-hidden border border-[#EAE4DC] bg-white shadow-2xs cursor-pointer aspect-[3/4]"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute top-2 left-2">
                <span className="text-[9px] font-semibold uppercase tracking-wider text-white bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
                  {item.category.replace('_', ' ')}
                </span>
              </div>

              <div className="absolute bottom-2 inset-x-2 text-white text-left">
                <h5 className="text-[12px] font-semibold leading-tight line-clamp-1">
                  {item.title}
                </h5>
                <span className="text-[10px] text-white/80 truncate block">
                  {item.mood}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pinned Sticky Notes Layer */}
        {pinnedNotes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            {pinnedNotes.map((note) => (
              <div
                key={note.id}
                className="p-3 rounded-[12px] bg-[#FFFBF0] border border-[#F2E4B8] shadow-2xs text-[12px] text-[#635E59] space-y-1 relative"
              >
                <div className="flex items-center gap-1 text-[#9B7B1D] font-semibold text-[10px] uppercase">
                  <Pin size={10} className="fill-current" /> Studio Note
                </div>
                <p className="italic text-[#1E1B18] font-medium leading-relaxed">
                  "{note.text}"
                </p>
                {note.persianText && (
                  <p className="font-persian text-[11px] text-[#7D756C]" dir="rtl">
                    «{note.persianText}»
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
