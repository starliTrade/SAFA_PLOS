import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { StateProvider, useStateContext } from './context/StateContext';
import { TopSanctuaryBar, ExperienceMode } from './components/navigation/TopSanctuaryBar';
import { FloatingDock, NavigationDomain } from './components/navigation/FloatingDock';
import {
  MorningExperience,
  CreativeExperience,
  ReflectionExperience,
  DiscoveryExperience,
} from './experiences';
import { HorizonPlanner } from './components/horizon/HorizonPlanner';
import { QuickCaptureModal } from './components/capture/QuickCaptureModal';
import { SafaModal } from './components/ui/SafaModal';
import { SafaInput } from './components/ui/SafaInput';
import { Search, Scissors, Sparkles, Bookmark, Target } from 'lucide-react';
import { experienceVariants, tapPhysics } from './theme/interactions';

const MainApp: React.FC = () => {
  const { userProfile, fashionProjects, inspirationItems, designs } = useStateContext();
  const [activeExperience, setActiveExperience] = useState<ExperienceMode>('morning');
  const [activeDomain, setActiveDomain] = useState<NavigationDomain>('sanctuary');
  const [isQuickCaptureOpen, setIsQuickCaptureOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Synchronize Experience Mode with Floating Dock selection
  const handleSelectDomain = (domain: NavigationDomain) => {
    setActiveDomain(domain);
    if (domain === 'sanctuary') {
      setActiveExperience('morning');
    } else if (domain === 'atelier') {
      setActiveExperience('creative');
    } else if (domain === 'memory') {
      setActiveExperience('reflection');
    } else if (domain === 'inspiration') {
      setActiveExperience('discovery');
    }
  };

  const handleSelectExperience = (mode: ExperienceMode) => {
    setActiveExperience(mode);
    if (mode === 'morning') {
      setActiveDomain('sanctuary');
    } else if (mode === 'creative') {
      setActiveDomain('atelier');
    } else if (mode === 'reflection') {
      setActiveDomain('memory');
    } else if (mode === 'discovery') {
      setActiveDomain('atelier');
    }
  };

  // Global search filtering
  const searchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();

    const matches: Array<{
      id: string;
      title: string;
      subtitle: string;
      type: 'project' | 'inspiration' | 'design';
      mode: ExperienceMode;
    }> = [];

    fashionProjects.forEach((p) => {
      if (p.title.toLowerCase().includes(query) || p.concept.toLowerCase().includes(query)) {
        matches.push({
          id: p.id,
          title: p.title,
          subtitle: `Collection Capsule • ${p.season}`,
          type: 'project',
          mode: 'creative',
        });
      }
    });

    inspirationItems.forEach((i) => {
      if (i.title.toLowerCase().includes(query) || i.notes.toLowerCase().includes(query)) {
        matches.push({
          id: i.id,
          title: i.title,
          subtitle: `Inspiration • ${i.category}`,
          type: 'inspiration',
          mode: 'discovery',
        });
      }
    });

    designs.forEach((d) => {
      if (d.title.toLowerCase().includes(query) || d.description.toLowerCase().includes(query)) {
        matches.push({
          id: d.id,
          title: d.title,
          subtitle: `Design Look • ${d.silhouetteType}`,
          type: 'design',
          mode: 'creative',
        });
      }
    });

    return matches;
  }, [searchQuery, fashionProjects, inspirationItems, designs]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E1B18] font-sans antialiased selection:bg-[#F0D5C9] selection:text-[#1E1B18] flex flex-col">
      {/* Top Sanctuary Bar with Experience Selector */}
      <TopSanctuaryBar
        user={userProfile}
        activeExperience={activeExperience}
        onSelectExperience={handleSelectExperience}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Experience-Driven Content Area */}
      <main className="flex-1 px-4 sm:px-6 pt-5 sm:pt-7">
        <AnimatePresence mode="wait">
          {activeDomain === 'horizon' ? (
            <HorizonPlanner key="horizon" />
          ) : activeExperience === 'morning' ? (
            <MorningExperience
              key="morning"
              onEnterCreative={() => handleSelectExperience('creative')}
              onEnterDiscovery={() => handleSelectExperience('discovery')}
            />
          ) : activeExperience === 'creative' ? (
            <CreativeExperience
              key="creative"
              onNavigateToInspiration={() => handleSelectExperience('discovery')}
            />
          ) : activeExperience === 'discovery' ? (
            <DiscoveryExperience
              key="discovery"
              onNavigateToAtelierProject={() => handleSelectExperience('creative')}
            />
          ) : (
            <ReflectionExperience key="reflection" />
          )}
        </AnimatePresence>
      </main>

      {/* Floating Dock Navigation */}
      <FloatingDock
        activeDomain={activeDomain}
        onSelectDomain={handleSelectDomain}
        onOpenQuickCapture={() => setIsQuickCaptureOpen(true)}
      />

      {/* Quick Capture Bottom Sheet / Dialog */}
      <QuickCaptureModal
        isOpen={isQuickCaptureOpen}
        onClose={() => setIsQuickCaptureOpen(false)}
      />

      {/* Global Studio Spotlight Search Modal */}
      <SafaModal
        isOpen={isSearchOpen}
        onClose={() => {
          setIsSearchOpen(false);
          setSearchQuery('');
        }}
        title="Search SAFA"
        persianTitle="جستجو در صفا"
        subtitle="Search across collections, inspiration boards, sketches, and fabrics"
        maxWidth="md"
        type="dialog"
      >
        <div className="space-y-4 text-left">
          <SafaInput
            icon={<Search size={16} />}
            placeholder="Search silhouettes, Isfahan domes, wool gabardine..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />

          <div className="space-y-2 max-h-72 overflow-y-auto custom-scrollbar">
            {searchQuery.trim() && searchResults.length === 0 ? (
              <p className="text-[13px] text-[#9E968D] p-4 text-center">
                No matching creative items found for "{searchQuery}".
              </p>
            ) : (
              searchResults.map((item) => (
                <motion.div
                  key={item.id}
                  whileTap={tapPhysics.subtle}
                  onClick={() => {
                    handleSelectExperience(item.mode);
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-3 rounded-[14px] bg-white hover:bg-[#FAF8F5] border border-[#EAE4DC] hover:border-[#DFD8CE] flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    {item.type === 'project' && (
                      <div className="w-7 h-7 rounded-[8px] bg-[#F7EDE8] text-[#C97D60] flex items-center justify-center">
                        <Scissors size={14} />
                      </div>
                    )}
                    {item.type === 'inspiration' && (
                      <div className="w-7 h-7 rounded-[8px] bg-[#EEF3EE] text-[#5C6F59] flex items-center justify-center">
                        <Sparkles size={14} />
                      </div>
                    )}
                    {item.type === 'design' && (
                      <div className="w-7 h-7 rounded-[8px] bg-[#F9F5EB] text-[#D4AF37] flex items-center justify-center">
                        <Scissors size={14} />
                      </div>
                    )}
                    <div>
                      <h4 className="text-[13px] font-semibold text-[#1E1B18]">
                        {item.title}
                      </h4>
                      <span className="text-[11px] text-[#9E968D]">{item.subtitle}</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#C97D60] font-medium">Open →</span>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </SafaModal>
    </div>
  );
};

export default function App() {
  return (
    <StateProvider>
      <MainApp />
    </StateProvider>
  );
}
