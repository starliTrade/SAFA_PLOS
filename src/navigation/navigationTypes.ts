import React from 'react';

export type NavigationDomain =
  | 'home'
  | 'life'
  | 'create'
  | 'media'
  | 'discover'
  | 'more'
  // Backward-compatible aliases
  | 'sanctuary'
  | 'atelier'
  | 'discovery'
  | 'memory'
  | 'horizon';

export type ExperienceMode = 'morning' | 'creative' | 'discovery' | 'reflection';

export interface PeekItem {
  type: 'project' | 'design' | 'inspiration' | 'memory' | 'milestone';
  id: string;
}

export interface DomainMeta {
  id: NavigationDomain;
  label: string;
  persianLabel: string;
  description: string;
  defaultExperience?: ExperienceMode;
}

export interface NavigationState {
  activeDomain: NavigationDomain;
  activeExperience: ExperienceMode | null; // Can be null if in regular domain view
  selectedProjectId: string | null;
  selectedDesignId: string | null;
  selectedInspirationId: string | null;
  peekItem: PeekItem | null;
  isQuickCaptureOpen: boolean;
  isSearchOpen: boolean;
  isCommandOpen: boolean;
}

export interface NavigationActions {
  navigateToDomain: (
    domain: NavigationDomain,
    params?: { projectId?: string; designId?: string; inspirationId?: string; experience?: ExperienceMode | null }
  ) => void;
  navigateToExperience: (
    experience: ExperienceMode,
    params?: { projectId?: string; designId?: string }
  ) => void;
  exitExperience: () => void;
  selectProject: (projectId: string | null) => void;
  selectDesign: (designId: string | null) => void;
  selectInspiration: (inspirationId: string | null) => void;
  setPeekItem: (item: PeekItem | null) => void;
  openQuickCapture: () => void;
  closeQuickCapture: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openCommand: () => void;
  closeCommand: () => void;
}
