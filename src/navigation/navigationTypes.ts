import React from 'react';

export type NavigationDomain = 'sanctuary' | 'atelier' | 'discovery' | 'memory' | 'horizon';

export type ExperienceMode = 'morning' | 'creative' | 'discovery' | 'reflection';

export interface DomainMeta {
  id: NavigationDomain;
  label: string;
  persianLabel: string;
  description: string;
  defaultExperience?: ExperienceMode;
}

export interface NavigationState {
  activeDomain: NavigationDomain;
  activeExperience: ExperienceMode;
  selectedProjectId: string | null;
  selectedDesignId: string | null;
  selectedInspirationId: string | null;
  isQuickCaptureOpen: boolean;
  isSearchOpen: boolean;
}

export interface NavigationActions {
  navigateToDomain: (domain: NavigationDomain, params?: { projectId?: string; designId?: string }) => void;
  navigateToExperience: (experience: ExperienceMode, params?: { projectId?: string; designId?: string }) => void;
  selectProject: (projectId: string | null) => void;
  selectDesign: (designId: string | null) => void;
  selectInspiration: (inspirationId: string | null) => void;
  openQuickCapture: () => void;
  closeQuickCapture: () => void;
  openSearch: () => void;
  closeSearch: () => void;
}
