import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Scissors,
  Plus,
  Bookmark,
  Target,
} from 'lucide-react';
import { springs, tapPhysics } from '../../theme/interactions';
import { NavigationDomain } from '../../navigation/navigationTypes';

export interface FloatingDockProps {
  activeDomain: NavigationDomain;
  onSelectDomain: (domain: NavigationDomain) => void;
  onOpenQuickCapture: () => void;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  activeDomain,
  onSelectDomain,
  onOpenQuickCapture,
}) => {
  const dockItems: Array<{
    id: NavigationDomain;
    label: string;
    persianLabel: string;
    icon: React.ReactNode;
  }> = [
    {
      id: 'sanctuary',
      label: 'Sanctuary',
      persianLabel: 'صفا',
      icon: <Sparkles size={17} strokeWidth={2.2} />,
    },
    {
      id: 'atelier',
      label: 'Atelier',
      persianLabel: 'کارگاه',
      icon: <Scissors size={17} strokeWidth={2.2} />,
    },
    {
      id: 'memory',
      label: 'Memory',
      persianLabel: 'خاطره',
      icon: <Bookmark size={17} strokeWidth={2.2} />,
    },
    {
      id: 'horizon',
      label: 'Horizon',
      persianLabel: 'افق',
      icon: <Target size={17} strokeWidth={2.2} />,
    },
  ];

  return (
    <div className="fixed bottom-5 sm:bottom-6 inset-x-0 z-40 flex justify-center pointer-events-none px-4">
      <motion.nav
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={springs.snappy}
        className="pointer-events-auto bg-[#1E1B18]/94 dark:bg-[#191614]/94 text-[#FAF8F5] dark:text-[#FAF5EE] backdrop-blur-2xl border border-white/14 dark:border-[rgba(250,245,238,0.14)] shadow-[0_16px_40px_rgba(0,0,0,0.26),0_2px_6px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.7)] rounded-full px-2.5 py-1.5 sm:px-3 sm:py-2 flex items-center gap-1 sm:gap-1.5 max-w-fit"
      >
        {/* Sanctuary Tab */}
        <motion.button
          whileTap={tapPhysics.dockItem}
          onClick={() => onSelectDomain('sanctuary')}
          aria-label="Sanctuary"
          className={`relative px-3 sm:px-4 py-2 rounded-full flex flex-col sm:flex-row items-center gap-1 sm:gap-2 transition-colors cursor-pointer select-none min-h-[44px] justify-center ${
            activeDomain === 'sanctuary'
              ? 'text-white'
              : 'text-[#9E968D] dark:text-[#7D756C] hover:text-[#FAF8F5] dark:hover:text-[#FAF5EE]'
          }`}
        >
          {activeDomain === 'sanctuary' && (
            <motion.div
              layoutId="dock-active-indicator"
              className="absolute inset-0 bg-white/16 dark:bg-white/12 rounded-full border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
              transition={springs.tactile}
            />
          )}
          <span className="relative z-10">{dockItems[0].icon}</span>
          <span className="relative z-10 text-[11px] font-medium tracking-tight hidden sm:inline">
            {dockItems[0].label}
          </span>
        </motion.button>

        {/* Atelier Tab (with Discovery sub-indicator) */}
        <motion.button
          whileTap={tapPhysics.dockItem}
          onClick={() => onSelectDomain('atelier')}
          aria-label="Atelier"
          className={`relative px-3 sm:px-4 py-2 rounded-full flex flex-col sm:flex-row items-center gap-1 sm:gap-2 transition-colors cursor-pointer select-none min-h-[44px] justify-center ${
            activeDomain === 'atelier' || activeDomain === 'discovery'
              ? 'text-white'
              : 'text-[#9E968D] dark:text-[#7D756C] hover:text-[#FAF8F5] dark:hover:text-[#FAF5EE]'
          }`}
        >
          {(activeDomain === 'atelier' || activeDomain === 'discovery') && (
            <motion.div
              layoutId="dock-active-indicator"
              className="absolute inset-0 bg-[#C97D60] dark:bg-[#D9886C] rounded-full border border-white/20 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25)]"
              transition={springs.tactile}
            />
          )}
          <span className="relative z-10">{dockItems[1].icon}</span>
          <span className="relative z-10 text-[11px] font-medium tracking-tight hidden sm:inline">
            {dockItems[1].label}
          </span>
        </motion.button>

        {/* CENTER TACTILE QUICK CAPTURE BUTTON (+) */}
        <motion.button
          whileTap={{ scale: 0.88, rotate: 45 }}
          whileHover={{ scale: 1.05 }}
          transition={springs.bouncy}
          onClick={onOpenQuickCapture}
          aria-label="Quick Capture Thought, Look, or Fabric"
          className="mx-1 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FAF8F5] dark:bg-[#FAF5EE] text-[#1E1B18] dark:text-[#13110F] hover:bg-white active:bg-[#EAE4DC] shadow-[0_2px_8px_rgba(0,0,0,0.18)] flex items-center justify-center cursor-pointer select-none border border-white/40 min-h-[40px] min-w-[40px]"
        >
          <Plus size={19} strokeWidth={2.6} />
        </motion.button>

        {/* Memory Tab */}
        <motion.button
          whileTap={tapPhysics.dockItem}
          onClick={() => onSelectDomain('memory')}
          aria-label="Memory Archive"
          className={`relative px-3 sm:px-4 py-2 rounded-full flex flex-col sm:flex-row items-center gap-1 sm:gap-2 transition-colors cursor-pointer select-none min-h-[44px] justify-center ${
            activeDomain === 'memory'
              ? 'text-white'
              : 'text-[#9E968D] dark:text-[#7D756C] hover:text-[#FAF8F5] dark:hover:text-[#FAF5EE]'
          }`}
        >
          {activeDomain === 'memory' && (
            <motion.div
              layoutId="dock-active-indicator"
              className="absolute inset-0 bg-white/16 dark:bg-white/12 rounded-full border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
              transition={springs.tactile}
            />
          )}
          <span className="relative z-10">{dockItems[2].icon}</span>
          <span className="relative z-10 text-[11px] font-medium tracking-tight hidden sm:inline">
            {dockItems[2].label}
          </span>
        </motion.button>

        {/* Horizon Tab */}
        <motion.button
          whileTap={tapPhysics.dockItem}
          onClick={() => onSelectDomain('horizon')}
          aria-label="Horizon Goals & Milestones"
          className={`relative px-3 sm:px-4 py-2 rounded-full flex flex-col sm:flex-row items-center gap-1 sm:gap-2 transition-colors cursor-pointer select-none min-h-[44px] justify-center ${
            activeDomain === 'horizon'
              ? 'text-white'
              : 'text-[#9E968D] dark:text-[#7D756C] hover:text-[#FAF8F5] dark:hover:text-[#FAF5EE]'
          }`}
        >
          {activeDomain === 'horizon' && (
            <motion.div
              layoutId="dock-active-indicator"
              className="absolute inset-0 bg-white/16 dark:bg-white/12 rounded-full border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
              transition={springs.tactile}
            />
          )}
          <span className="relative z-10">{dockItems[3].icon}</span>
          <span className="relative z-10 text-[11px] font-medium tracking-tight hidden sm:inline">
            {dockItems[3].label}
          </span>
        </motion.button>
      </motion.nav>
    </div>
  );
};
export type { NavigationDomain };
