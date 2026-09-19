import React from 'react';
import { Home, Compass, Plus, Layers, MoreHorizontal } from 'lucide-react';
import { motion } from 'motion/react';
import { NavigationDomain } from '../../navigation/navigationTypes';
import { tapPhysics } from '../../theme/interactions';

export interface MobileTabBarProps {
  activeDomain: NavigationDomain;
  onSelectDomain: (domain: NavigationDomain) => void;
  onOpenQuickCapture: () => void;
}

export const MobileTabBar: React.FC<MobileTabBarProps> = ({
  activeDomain,
  onSelectDomain,
  onOpenQuickCapture,
}) => {
  // Normalize domain
  let currentKey = activeDomain;
  if (activeDomain === 'sanctuary') currentKey = 'home';
  else if (activeDomain === 'horizon') currentKey = 'life';
  else if (activeDomain === 'atelier') currentKey = 'create';
  else if (activeDomain === 'discovery') currentKey = 'media';
  else if (activeDomain === 'memory') currentKey = 'more';

  return (
    <nav
      role="navigation"
      aria-label="Mobile Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--safa-bg-surface)]/95 backdrop-blur-md border-t border-[var(--safa-border-subtle)] md:hidden pb-safe"
    >
      <div className="flex items-center justify-around h-14 px-2 max-w-lg mx-auto">
        {/* 1. Home */}
        <button
          onClick={() => onSelectDomain('home')}
          className={`flex-1 flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer transition-colors relative ${
            currentKey === 'home'
              ? 'text-[var(--safa-accent-primary)] font-semibold'
              : 'text-[var(--safa-content-tertiary)] hover:text-[var(--safa-content-primary)]'
          }`}
        >
          <Home size={20} strokeWidth={currentKey === 'home' ? 2.3 : 1.8} />
          <span className="text-[10px] mt-1 tracking-tight">Home</span>
          {currentKey === 'home' && (
            <motion.div
              layoutId="mobile-nav-active-dot"
              className="absolute bottom-1 w-1 h-1 rounded-full bg-[var(--safa-accent-primary)]"
            />
          )}
        </button>

        {/* 2. Life */}
        <button
          onClick={() => onSelectDomain('life')}
          className={`flex-1 flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer transition-colors relative ${
            currentKey === 'life'
              ? 'text-[var(--safa-accent-primary)] font-semibold'
              : 'text-[var(--safa-content-tertiary)] hover:text-[var(--safa-content-primary)]'
          }`}
        >
          <Compass size={20} strokeWidth={currentKey === 'life' ? 2.3 : 1.8} />
          <span className="text-[10px] mt-1 tracking-tight">Life</span>
          {currentKey === 'life' && (
            <motion.div
              layoutId="mobile-nav-active-dot"
              className="absolute bottom-1 w-1 h-1 rounded-full bg-[var(--safa-accent-primary)]"
            />
          )}
        </button>

        {/* 3. Create (Dominant tactile central action) */}
        <div className="flex-1 flex items-center justify-center">
          <motion.button
            whileTap={tapPhysics.iconButton}
            onClick={onOpenQuickCapture}
            aria-label="Quick capture"
            className="w-11 h-11 rounded-full bg-[var(--safa-accent-primary)] text-white flex items-center justify-center shadow-sm cursor-pointer hover:bg-[var(--safa-accent-primary-hover)] transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--safa-accent-primary)]"
          >
            <Plus size={22} strokeWidth={2.5} />
          </motion.button>
        </div>

        {/* 4. Media / Inspirations */}
        <button
          onClick={() => onSelectDomain('media')}
          className={`flex-1 flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer transition-colors relative ${
            currentKey === 'media' || currentKey === 'discover'
              ? 'text-[var(--safa-accent-primary)] font-semibold'
              : 'text-[var(--safa-content-tertiary)] hover:text-[var(--safa-content-primary)]'
          }`}
        >
          <Layers size={20} strokeWidth={currentKey === 'media' || currentKey === 'discover' ? 2.3 : 1.8} />
          <span className="text-[10px] mt-1 tracking-tight">Media</span>
          {(currentKey === 'media' || currentKey === 'discover') && (
            <motion.div
              layoutId="mobile-nav-active-dot"
              className="absolute bottom-1 w-1 h-1 rounded-full bg-[var(--safa-accent-primary)]"
            />
          )}
        </button>

        {/* 5. More / Memories & Profile */}
        <button
          onClick={() => onSelectDomain('more')}
          className={`flex-1 flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer transition-colors relative ${
            currentKey === 'more'
              ? 'text-[var(--safa-accent-primary)] font-semibold'
              : 'text-[var(--safa-content-tertiary)] hover:text-[var(--safa-content-primary)]'
          }`}
        >
          <MoreHorizontal size={20} strokeWidth={currentKey === 'more' ? 2.3 : 1.8} />
          <span className="text-[10px] mt-1 tracking-tight">More</span>
          {currentKey === 'more' && (
            <motion.div
              layoutId="mobile-nav-active-dot"
              className="absolute bottom-1 w-1 h-1 rounded-full bg-[var(--safa-accent-primary)]"
            />
          )}
        </button>
      </div>
    </nav>
  );
};
