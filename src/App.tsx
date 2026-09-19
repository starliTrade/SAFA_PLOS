import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { StateProvider, useStateContext } from './context/StateContext';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { NavigationProvider, useNavigation } from './navigation/NavigationContext';
import { TopSanctuaryBar } from './components/navigation/TopSanctuaryBar';
import { FloatingDock } from './components/navigation/FloatingDock';
import {
  MorningExperience,
  CreativeExperience,
  ReflectionExperience,
  DiscoveryExperience,
} from './experiences';
import { HorizonPlanner } from './components/horizon/HorizonPlanner';
import { QuickCaptureModal } from './components/capture/QuickCaptureModal';
import { GlobalSearchModal } from './search/GlobalSearchModal';

const AppContent: React.FC = () => {
  const { userProfile } = useStateContext();
  const {
    activeDomain,
    activeExperience,
    navigateToDomain,
    navigateToExperience,
    openSearch,
  } = useNavigation();

  const [isQuickCaptureOpen, setIsQuickCaptureOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#13110F] text-[#1E1B18] dark:text-[#FAF5EE] font-sans antialiased selection:bg-[#F0D5C9] dark:selection:bg-[#C97D60]/30 selection:text-[#1E1B18] dark:selection:text-[#FAF5EE] flex flex-col transition-colors duration-200">
      {/* Top Sanctuary Bar with Experience Selector and Theme Toggle */}
      <TopSanctuaryBar
        user={userProfile}
        activeExperience={activeExperience}
        onSelectExperience={(mode) => navigateToExperience(mode)}
        onOpenSearch={openSearch}
      />

      {/* Main Experience-Driven Content Area */}
      <main className="flex-1 px-4 sm:px-6 pt-5 sm:pt-7 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {activeDomain === 'horizon' ? (
            <HorizonPlanner key="horizon" />
          ) : activeExperience === 'morning' ? (
            <MorningExperience
              key="morning"
              onEnterCreative={() => navigateToExperience('creative')}
              onEnterDiscovery={() => navigateToExperience('discovery')}
            />
          ) : activeExperience === 'creative' ? (
            <CreativeExperience
              key="creative"
              onNavigateToInspiration={() => navigateToExperience('discovery')}
            />
          ) : activeExperience === 'discovery' ? (
            <DiscoveryExperience
              key="discovery"
              onNavigateToAtelierProject={() => navigateToExperience('creative')}
            />
          ) : (
            <ReflectionExperience key="reflection" />
          )}
        </AnimatePresence>
      </main>

      {/* Floating Dock Navigation */}
      <FloatingDock
        activeDomain={activeDomain}
        onSelectDomain={(domain) => navigateToDomain(domain)}
        onOpenQuickCapture={() => setIsQuickCaptureOpen(true)}
      />

      {/* Quick Capture Bottom Sheet / Dialog */}
      <QuickCaptureModal
        isOpen={isQuickCaptureOpen}
        onClose={() => setIsQuickCaptureOpen(false)}
      />

      {/* Global Studio Spotlight Search Modal (Cmd+K) */}
      <GlobalSearchModal />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <StateProvider>
        <NavigationProvider>
          <AppContent />
        </NavigationProvider>
      </StateProvider>
    </ThemeProvider>
  );
}
