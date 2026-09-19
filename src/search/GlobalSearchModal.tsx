import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Scissors,
  Sparkles,
  Bookmark,
  Target,
  Clock,
  Compass,
  ArrowRight,
  Command,
  X,
} from 'lucide-react';
import { useStateContext } from '../context/StateContext';
import { useNavigation } from '../navigation/NavigationContext';
import { performGlobalSearch } from './searchService';
import { SearchResultItem, SearchObjectType } from './searchTypes';
import { springs, tapPhysics, eases } from '../theme/interactions';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, navigateToDomain, navigateToExperience } = useNavigation();
  const { fashionProjects, inspirationItems, designs, resurfacedMemory, lifeMilestones, rituals } =
    useStateContext();

  const [query, setQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isSearchOpen) {
          closeSearch();
        } else {
          // Open search
          const event = new CustomEvent('safa-open-search');
          window.dispatchEvent(event);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  // Focus input on modal open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isSearchOpen]);

  const rawResults = useMemo(() => {
    return performGlobalSearch(query, {
      fashionProjects,
      inspirationItems,
      designs,
      resurfacedMemory,
      lifeMilestones,
      rituals,
    });
  }, [query, fashionProjects, inspirationItems, designs, resurfacedMemory, lifeMilestones, rituals]);

  const filteredResults = useMemo(() => {
    if (selectedFilter === 'all') return rawResults;
    return rawResults.filter((r) => {
      if (selectedFilter === 'projects') return r.type === 'project';
      if (selectedFilter === 'inspiration') return r.type === 'inspiration';
      if (selectedFilter === 'designs') return r.type === 'design';
      if (selectedFilter === 'memory') return r.type === 'memory';
      if (selectedFilter === 'goals') return r.type === 'goal' || r.type === 'ritual';
      return true;
    });
  }, [rawResults, selectedFilter]);

  // Keyboard navigation within results
  const handleKeyDownInModal = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (filteredResults.length > 0 ? (prev + 1) % filteredResults.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filteredResults.length > 0 ? (prev - 1 + filteredResults.length) % filteredResults.length : 0
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelectItem(filteredResults[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      closeSearch();
    }
  };

  const handleSelectItem = (item: SearchResultItem) => {
    if (item.domain === 'horizon') {
      navigateToDomain('horizon');
    } else {
      navigateToExperience(item.experience, {
        projectId: item.projectId,
        designId: item.designId,
      });
    }
    closeSearch();
  };

  const getIconForType = (type: SearchObjectType) => {
    switch (type) {
      case 'project':
        return <Scissors size={14} className="text-[#C97D60]" />;
      case 'inspiration':
        return <Sparkles size={14} className="text-[#5C6F59]" />;
      case 'design':
        return <Scissors size={14} className="text-[#D4AF37]" />;
      case 'memory':
        return <Bookmark size={14} className="text-[#7D756C]" />;
      case 'goal':
        return <Target size={14} className="text-[#2A4B56]" />;
      case 'ritual':
        return <Clock size={14} className="text-[#C97D60]" />;
    }
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={eases.fast}
            onClick={closeSearch}
            className="fixed inset-0 bg-[#1E1B18]/45 dark:bg-black/75 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={springs.snappy}
            onKeyDown={handleKeyDownInModal}
            className="relative w-full max-w-xl bg-white dark:bg-[#191614] rounded-[22px] border border-[#EAE4DC] dark:border-[rgba(250,245,238,0.12)] shadow-2xl overflow-hidden flex flex-col max-h-[80vh] text-left"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 py-3.5 border-b border-[#EAE4DC] dark:border-[rgba(250,245,238,0.08)] bg-[#FAF8F5] dark:bg-[#13110F] gap-3">
              <Search size={18} className="text-[#7D756C] dark:text-[#9E968D] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search collections, Grand Bazaar textiles, sketches, memories..."
                className="w-full bg-transparent text-[14px] text-[#1E1B18] dark:text-[#FAF5EE] placeholder-[#9E968D] dark:placeholder-[#7D756C] outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-[#9E968D] hover:text-[#1E1B18] dark:hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono text-[#9E968D] bg-white dark:bg-[#2C2723] px-2 py-0.5 rounded-md border border-[#EAE4DC] dark:border-[rgba(250,245,238,0.1)]">
                <Command size={11} />
                <span>K</span>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="px-4 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none border-b border-[#EAE4DC]/60 dark:border-[rgba(250,245,238,0.06)] bg-white/50 dark:bg-[#191614]/50">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'projects', label: 'Atelier Capsules' },
                { id: 'inspiration', label: 'Inspirations' },
                { id: 'designs', label: 'Silhouettes' },
                { id: 'memory', label: 'Memories' },
                { id: 'goals', label: 'Goals & Rituals' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setSelectedFilter(f.id);
                    setSelectedIndex(0);
                  }}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer select-none shrink-0 ${
                    selectedFilter === f.id
                      ? 'bg-[#1E1B18] dark:bg-[#FAF5EE] text-white dark:text-[#13110F]'
                      : 'text-[#635E59] dark:text-[#B5ACA1] hover:bg-[#F5F1EB] dark:hover:bg-[#2C2723]'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Search Results List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1 max-h-[380px] custom-scrollbar">
              {query.trim() === '' ? (
                <div className="p-8 text-center space-y-2">
                  <Compass size={28} className="mx-auto text-[#9E968D] stroke-1" />
                  <p className="text-[13px] text-[#635E59] dark:text-[#B5ACA1]">
                    Search across collections, mood boards, sketches, and philosophical reflections.
                  </p>
                  <p className="text-[11px] text-[#9E968D] font-persian" dir="rtl">
                    جستجو در تمام کارگاه، الهامات و خاطرات صفا
                  </p>
                </div>
              ) : filteredResults.length === 0 ? (
                <div className="p-8 text-center space-y-1">
                  <p className="text-[13px] text-[#635E59] dark:text-[#B5ACA1]">
                    No items found matching "<span className="font-semibold">{query}</span>"
                  </p>
                  <p className="text-[11px] text-[#9E968D]">Try searching for "Isfahan", "Silk", "Gabardine", or "Drape".</p>
                </div>
              ) : (
                filteredResults.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <motion.div
                      key={item.id}
                      whileTap={tapPhysics.subtle}
                      onClick={() => handleSelectItem(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`p-2.5 sm:p-3 rounded-[14px] flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-[#F7EDE8] dark:bg-[#33231D] border border-[#F0D5C9] dark:border-[rgba(217,136,108,0.3)]'
                          : 'hover:bg-[#FAF8F5] dark:hover:bg-[#23201C] border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-[10px] bg-white dark:bg-[#2C2723] border border-[#EAE4DC] dark:border-[rgba(250,245,238,0.08)] flex items-center justify-center shrink-0">
                          {getIconForType(item.type)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-semibold text-[#1E1B18] dark:text-[#FAF5EE] truncate">
                              {item.title}
                            </span>
                            {item.persianTitle && (
                              <span className="text-[11px] text-[#7D756C] dark:text-[#9E968D] font-persian" dir="rtl">
                                {item.persianTitle}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#7D756C] dark:text-[#9E968D] truncate">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 text-[#C97D60] dark:text-[#D9886C] text-[11px] font-medium">
                        <span className="hidden sm:inline">Open</span>
                        <ArrowRight size={13} />
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Footer Tip */}
            <div className="px-4 py-2.5 bg-[#FAF8F5] dark:bg-[#13110F] border-t border-[#EAE4DC] dark:border-[rgba(250,245,238,0.08)] flex items-center justify-between text-[11px] text-[#9E968D]">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span className="font-editorial text-[13px] text-[#635E59] dark:text-[#B5ACA1]">SAFA • صفا</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
