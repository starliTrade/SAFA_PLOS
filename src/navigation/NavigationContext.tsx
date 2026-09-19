import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import {
  NavigationDomain,
  ExperienceMode,
  NavigationState,
  NavigationActions,
  PeekItem,
} from './navigationTypes';
import { EXPERIENCE_TO_DOMAIN_MAP } from './navigationMap';

export interface NavigationContextValue extends NavigationState, NavigationActions {}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeDomain, setActiveDomain] = useState<NavigationDomain>('home');
  const [activeExperience, setActiveExperience] = useState<ExperienceMode | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedDesignId, setSelectedDesignId] = useState<string | null>(null);
  const [selectedInspirationId, setSelectedInspirationId] = useState<string | null>(null);
  const [peekItem, setPeekItem] = useState<PeekItem | null>(null);
  const [isQuickCaptureOpen, setIsQuickCaptureOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);

  const navigateToDomain = useCallback(
    (
      domain: NavigationDomain,
      params?: {
        projectId?: string;
        designId?: string;
        inspirationId?: string;
        experience?: ExperienceMode | null;
      }
    ) => {
      // Map any legacy names to canonical domains
      let targetDomain = domain;
      if (domain === 'sanctuary') targetDomain = 'home';
      else if (domain === 'atelier') targetDomain = 'create';
      else if (domain === 'discovery') targetDomain = 'discover';
      else if (domain === 'memory') targetDomain = 'more';
      else if (domain === 'horizon') targetDomain = 'life';

      setActiveDomain(targetDomain);
      if (params?.experience !== undefined) {
        setActiveExperience(params.experience);
      } else {
        setActiveExperience(null);
      }
      if (params?.projectId !== undefined) setSelectedProjectId(params.projectId);
      if (params?.designId !== undefined) setSelectedDesignId(params.designId);
      if (params?.inspirationId !== undefined) setSelectedInspirationId(params.inspirationId);
    },
    []
  );

  const navigateToExperience = useCallback(
    (experience: ExperienceMode, params?: { projectId?: string; designId?: string }) => {
      setActiveExperience(experience);
      setActiveDomain(EXPERIENCE_TO_DOMAIN_MAP[experience]);
      if (params?.projectId !== undefined) setSelectedProjectId(params.projectId);
      if (params?.designId !== undefined) setSelectedDesignId(params.designId);
    },
    []
  );

  const exitExperience = useCallback(() => {
    setActiveExperience(null);
  }, []);

  const selectProject = useCallback((projectId: string | null) => {
    setSelectedProjectId(projectId);
  }, []);

  const selectDesign = useCallback((designId: string | null) => {
    setSelectedDesignId(designId);
  }, []);

  const selectInspiration = useCallback((inspirationId: string | null) => {
    setSelectedInspirationId(inspirationId);
  }, []);

  const openQuickCapture = useCallback(() => setIsQuickCaptureOpen(true), []);
  const closeQuickCapture = useCallback(() => setIsQuickCaptureOpen(false), []);
  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);
  const openCommand = useCallback(() => setIsCommandOpen(true), []);
  const closeCommand = useCallback(() => setIsCommandOpen(false), []);

  const value: NavigationContextValue = useMemo(
    () => ({
      activeDomain,
      activeExperience,
      selectedProjectId,
      selectedDesignId,
      selectedInspirationId,
      peekItem,
      isQuickCaptureOpen,
      isSearchOpen,
      isCommandOpen,
      navigateToDomain,
      navigateToExperience,
      exitExperience,
      selectProject,
      selectDesign,
      selectInspiration,
      setPeekItem,
      openQuickCapture,
      closeQuickCapture,
      openSearch,
      closeSearch,
      openCommand,
      closeCommand,
    }),
    [
      activeDomain,
      activeExperience,
      selectedProjectId,
      selectedDesignId,
      selectedInspirationId,
      peekItem,
      isQuickCaptureOpen,
      isSearchOpen,
      isCommandOpen,
      navigateToDomain,
      navigateToExperience,
      exitExperience,
      selectProject,
      selectDesign,
      selectInspiration,
      setPeekItem,
      openQuickCapture,
      closeQuickCapture,
      openSearch,
      closeSearch,
      openCommand,
      closeCommand,
    ]
  );

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};

export const useNavigation = (): NavigationContextValue => {
  const ctx = useContext(NavigationContext);
  if (!ctx) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return ctx;
};
