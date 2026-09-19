import React from 'react';
import { AnimatePresence } from 'motion/react';
import { StateProvider } from './context/StateContext';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { NavigationProvider, useNavigation } from './navigation/NavigationContext';
import { SafaShell } from './components/shell';
import { HomeView } from './components/home/HomeView';
import { LifeView } from './components/life/LifeView';
import { CreateView } from './components/create/CreateView';
import { MediaView } from './components/media/MediaView';
import { DiscoverView } from './components/discover/DiscoverView';
import { MoreView } from './components/more/MoreView';
import {
  MorningExperience,
  CreativeExperience,
  ReflectionExperience,
  DiscoveryExperience,
} from './experiences';

const AppContent: React.FC = () => {
  const {
    activeDomain,
    activeExperience,
    navigateToExperience,
    exitExperience,
  } = useNavigation();

  // Normalize legacy domains
  let domain = activeDomain;
  if (domain === 'sanctuary') domain = 'home';
  else if (domain === 'horizon') domain = 'life';
  else if (domain === 'atelier') domain = 'create';
  else if (domain === 'discovery') domain = 'media';
  else if (domain === 'memory') domain = 'more';

  return (
    <SafaShell>
      <AnimatePresence mode="wait">
        {/* Contextual Immersion Experience Modes (if active) */}
        {activeExperience === 'morning' ? (
          <MorningExperience
            key="exp-morning"
            onEnterCreative={() => navigateToExperience('creative')}
            onEnterDiscovery={() => navigateToExperience('discovery')}
          />
        ) : activeExperience === 'creative' ? (
          <CreativeExperience
            key="exp-creative"
            onNavigateToInspiration={() => navigateToExperience('discovery')}
          />
        ) : activeExperience === 'discovery' ? (
          <DiscoveryExperience
            key="exp-discovery"
            onNavigateToAtelierProject={() => navigateToExperience('creative')}
          />
        ) : activeExperience === 'reflection' ? (
          <ReflectionExperience key="exp-reflection" />
        ) : (
          /* Core Operating System Domain Views */
          domain === 'home' ? (
            <HomeView key="view-home" />
          ) : domain === 'life' ? (
            <LifeView key="view-life" />
          ) : domain === 'create' ? (
            <CreateView key="view-create" />
          ) : domain === 'media' ? (
            <MediaView key="view-media" />
          ) : domain === 'discover' ? (
            <DiscoverView key="view-discover" />
          ) : (
            <MoreView key="view-more" />
          )
        )}
      </AnimatePresence>
    </SafaShell>
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
