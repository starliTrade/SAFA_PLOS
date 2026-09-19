import React from 'react';
import { useNavigation } from '../../navigation/NavigationContext';
import { useStateContext } from '../../context/StateContext';
import { DesktopSidebar } from './DesktopSidebar';
import { MobileHeader } from './MobileHeader';
import { MobileTabBar } from './MobileTabBar';
import { CommandMenu } from './CommandMenu';
import { PreviewSheet } from './PreviewSheet';
import { GlobalSearchModal } from '../../search/GlobalSearchModal';
import { QuickCaptureModal } from '../capture/QuickCaptureModal';

export interface SafaShellProps {
  children: React.ReactNode;
}

export const SafaShell: React.FC<SafaShellProps> = ({ children }) => {
  const { userProfile } = useStateContext();
  const {
    activeDomain,
    navigateToDomain,
    isQuickCaptureOpen,
    openQuickCapture,
    closeQuickCapture,
  } = useNavigation();

  return (
    <div className="min-h-screen bg-[var(--safa-bg-canvas)] text-[var(--safa-content-primary)] font-sans antialiased flex flex-col md:flex-row transition-colors duration-150">
      {/* 1. Desktop Persistent Left Sidebar */}
      <DesktopSidebar
        user={userProfile}
        activeDomain={activeDomain}
        onSelectDomain={navigateToDomain}
        onOpenQuickCapture={openQuickCapture}
      />

      {/* 2. Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        {/* Mobile Header */}
        <MobileHeader user={userProfile} />

        {/* Dynamic Page Workspace */}
        <main className="flex-1 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* 3. Mobile Bottom Tab Bar */}
      <MobileTabBar
        activeDomain={activeDomain}
        onSelectDomain={navigateToDomain}
        onOpenQuickCapture={openQuickCapture}
      />

      {/* 4. Global Overlays & Modals */}
      <GlobalSearchModal />
      <CommandMenu />
      <PreviewSheet />
      <QuickCaptureModal
        isOpen={isQuickCaptureOpen}
        onClose={closeQuickCapture}
      />
    </div>
  );
};
