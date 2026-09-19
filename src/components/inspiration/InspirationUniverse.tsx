import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Scissors,
  Compass,
  Pin,
  Sparkles,
  ArrowRight,
  Plus,
} from 'lucide-react';
import { InspirationItem, FabricSwatch, InspirationCategory } from '../../types/inspiration';
import { InspirationCard } from './InspirationCard';
import { FabricSwatchCard } from './FabricSwatchCard';
import { InspirationDetailModal } from './InspirationDetailModal';
import { PinToProjectModal } from '../atelier/PinToProjectModal';
import { SafaButton } from '../ui/SafaButton';
import { SafaBadge } from '../ui/SafaBadge';
import { transitions } from '../../theme/motion';
import { useStateContext } from '../../context/StateContext';

export interface InspirationUniverseProps {
  onNavigateToAtelierProject?: (projectId: string) => void;
}

export const InspirationUniverse: React.FC<InspirationUniverseProps> = ({
  onNavigateToAtelierProject,
}) => {
  const {
    inspirationItems,
    fabricSwatches,
    fashionProjects,
    pinInspirationToProject,
    unpinInspirationFromProject,
  } = useStateContext();

  const [activeTab, setActiveTab] = useState<'visuals' | 'swatches'>('visuals');
  const [selectedCategory, setSelectedCategory] = useState<InspirationCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyPinned, setOnlyPinned] = useState<boolean>(false);

  // Modals
  const [selectedItem, setSelectedItem] = useState<InspirationItem | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [pinModalItem, setPinModalItem] = useState<InspirationItem | null>(null);
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);

  const handleOpenDetail = (item: InspirationItem) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const handleTriggerPin = (item: InspirationItem) => {
    setPinModalItem(item);
    setIsPinModalOpen(true);
  };

  const handleConfirmPin = (inspirationId: string, projectId: string) => {
    pinInspirationToProject(inspirationId, projectId);
  };

  const handleConfirmUnpin = (inspirationId: string, projectId: string) => {
    unpinInspirationFromProject(inspirationId, projectId);
  };

  // Filtered visuals
  const filteredItems = useMemo(() => {
    return inspirationItems.filter((item) => {
      const matchCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch =
        !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchPinned = !onlyPinned || item.isPinnedToAtelier;
      return matchCategory && matchSearch && matchPinned;
    });
  }, [inspirationItems, selectedCategory, searchQuery, onlyPinned]);

  const categories: Array<{ id: InspirationCategory; label: string; persianLabel: string }> = [
    { id: 'all', label: 'All Moods', persianLabel: 'همه الهام‌ها' },
    { id: 'architecture', label: 'Architecture', persianLabel: 'معماری' },
    { id: 'textile', label: 'Textiles & Dye', persianLabel: 'پارچه و رنگرزی' },
    { id: 'silhouette', label: 'Silhouettes & Cut', persianLabel: 'فرم و برش' },
    { id: 'cultural_archive', label: 'Cultural Heritage', persianLabel: 'میراث فرهنگی' },
  ];

  const pinnedCount = inspirationItems.filter((i) => i.isPinnedToAtelier).length;
  const activeProject = fashionProjects[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={transitions.easeAtmospheric}
      className="space-y-6 pb-28 max-w-4xl mx-auto text-left"
    >
      {/* Active Creative Loop Banner */}
      {activeProject && (
        <div className="p-3.5 sm:p-4 rounded-[16px] bg-gradient-to-r from-[#FAF6F0] via-white to-[#FAF6F0] border border-[#EAE4DC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] bg-[#F7EDE8] border border-[#F0D5C9] flex items-center justify-center text-[#C97D60] shrink-0">
              <Scissors size={17} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold tracking-wider text-[#C97D60] uppercase">
                  Active Atelier Workspace
                </span>
                <SafaBadge variant="active" size="sm">
                  {activeProject.status}
                </SafaBadge>
              </div>
              <h3 className="text-[14px] font-semibold text-[#1E1B18]">
                {activeProject.title} ({activeProject.season})
              </h3>
            </div>
          </div>

          {onNavigateToAtelierProject && (
            <SafaButton
              variant="outline"
              size="sm"
              iconRight={<ArrowRight size={13} />}
              onClick={() => onNavigateToAtelierProject(activeProject.id)}
            >
              Open Studio Workspace
            </SafaButton>
          )}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-[#EAE4DC] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C97D60] bg-[#F7EDE8] px-2.5 py-0.5 rounded-full border border-[#F0D5C9]">
              Creative Discovery Engine
            </span>
            <span className="text-[13px] text-[#9E968D] font-persian">جهان خلاقیت و الهام</span>
          </div>
          <h1 className="text-3xl font-editorial font-normal text-[#1E1B18]">
            Inspiration Universe & Textile Archive
          </h1>
          <p className="text-[14px] text-[#635E59] mt-1 leading-relaxed">
            Pinterest-style tactile masonry, extracted mineral hexes, and Grand Bazaar textile archive.
          </p>
        </div>

        {/* View Switcher Tabs: Visual Moodboards vs Fabric Swatches */}
        <div className="flex items-center gap-1.5 p-1 bg-[#F3EFEA] rounded-full border border-[#EAE4DC] shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('visuals')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'visuals'
                ? 'bg-white text-[#1E1B18] shadow-xs'
                : 'text-[#635E59] hover:text-[#1E1B18]'
            }`}
          >
            <Compass size={13} />
            <span>Visual Moodboard</span>
            <span className="text-[10px] font-mono text-[#9E968D]">({inspirationItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('swatches')}
            className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'swatches'
                ? 'bg-white text-[#1E1B18] shadow-xs'
                : 'text-[#635E59] hover:text-[#1E1B18]'
            }`}
          >
            <Scissors size={13} />
            <span>Fabric Library</span>
            <span className="text-[10px] font-mono text-[#9E968D]">({fabricSwatches.length})</span>
          </button>
        </div>
      </div>

      {/* FILTER & SEARCH CONTROLS (For Visuals) */}
      {activeTab === 'visuals' && (
        <div className="space-y-3">
          {/* Category Filter Pills & Pinned Toggle */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#1E1B18] text-[#FAF8F5]'
                      : 'bg-[#FAF8F5] text-[#635E59] hover:bg-[#F3EFEA] border border-[#EAE4DC]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Pinned to Atelier Toggle */}
            <button
              onClick={() => setOnlyPinned((p) => !p)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 self-start sm:self-auto ${
                onlyPinned
                  ? 'bg-[#C97D60] text-white'
                  : 'bg-[#FAF8F5] text-[#635E59] hover:bg-[#F3EFEA] border border-[#EAE4DC]'
              }`}
            >
              <Pin size={12} className={onlyPinned ? 'fill-current' : ''} />
              <span>Pinned to Atelier ({pinnedCount})</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: VISUAL MOODBOARD MASONRY */}
      {activeTab === 'visuals' && (
        <div>
          {filteredItems.length === 0 ? (
            <div className="p-12 text-center rounded-[20px] border border-dashed border-[#DFD8CE] bg-[#FAF8F5]">
              <Compass size={28} className="mx-auto text-[#9E968D] mb-2" />
              <h3 className="text-[16px] font-semibold text-[#1E1B18]">No Inspirations Match Filters</h3>
              <p className="text-[13px] text-[#635E59] mt-1">
                Try selecting "All Moods" or clearing the pinned filter.
              </p>
              <SafaButton
                variant="subtle"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setSelectedCategory('all');
                  setOnlyPinned(false);
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </SafaButton>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 gap-4 [column-fill:_balance]">
              {filteredItems.map((item) => (
                <div key={item.id} className="break-inside-avoid">
                  <InspirationCard
                    item={item}
                    onTogglePin={handleTriggerPin}
                    onOpenDetail={handleOpenDetail}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: FABRIC SWATCH LIBRARY */}
      {activeTab === 'swatches' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-[#635E59]">
              Showing <strong>{fabricSwatches.length}</strong> authenticated Iranian textiles and Grand Bazaar swatches
            </span>
            <SafaBadge variant="terracotta" size="sm">
              Collection Linked
            </SafaBadge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fabricSwatches.map((swatch) => (
              <FabricSwatchCard key={swatch.id} swatch={swatch} />
            ))}
          </div>
        </div>
      )}

      {/* Full Detail Modal */}
      <InspirationDetailModal
        item={selectedItem}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onOpenPinModal={handleTriggerPin}
      />

      {/* Contextual Pin to Atelier Modal */}
      <PinToProjectModal
        item={pinModalItem}
        projects={fashionProjects}
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onConfirmPin={handleConfirmPin}
        onConfirmUnpin={handleConfirmUnpin}
      />
    </motion.div>
  );
};
