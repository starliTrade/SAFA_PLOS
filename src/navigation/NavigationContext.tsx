import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import {
  NavigationDomain,
  ExperienceMode,
  NavigationState,
  NavigationActions,
} from './navigationTypes';
import { DOMAIN_TO_EXPERIENCE_MAP, EXPERIENCE_TO_DOMAIN_MAP } from './navigationMap';

export interface NavigationContextValue extends NavigationState, NavigationActions {}

const NavigationContext = createContext<NavigationContextValue | null>(null);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeDomain, setActiveDomain] = useState<NavigationDomain>('sanctuary');
  const [activeExperience, setActiveExperience] = useState<ExperienceMode>('morning');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedDesignId, setSelectedDesignId] = useState<string | null>(null);
  const [selectedInspirationId, setSelectedInspirationId] = useState<string | null>(null);
  const [isQuickCaptureOpen, setIsQuickCaptureOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const navigateToDomain = useCallback(
    (domain: NavigationDomain, params?: { projectId?: string; designId?: string }) => {
      setActiveDomain(domain);
      if (domain !== 'horizon') {
        setActiveExperience(DOMAIN_TO_EXPERIENCE_MAP[domain]);
      }
      if (params?.projectId !== undefined) setSelectedProjectId(params.projectId);
      if (params?.designId !== undefined) setSelectedDesignId(params.designId);
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

  const value: NavigationContextValue = useMemo(
    () => ({
      activeDomain,
      activeExperience,
      selectedProjectId,
      selectedDesignId,
      selectedInspirationId,
      isQuickCaptureOpen,
      isSearchOpen,
      navigateToDomain,
      navigateToExperience,
      selectProject,
      selectDesign,
      selectInspiration,
      openQuickCapture,
      closeQuickCapture,
      openSearch,
      closeSearch,
    }),
    [
      activeDomain,
      activeExperience,
      selectedProjectId,
      selectedDesignId,
      selectedInspirationId,
      isQuickCaptureOpen,
      isSearchOpen,
      navigateToDomain,
      navigateToExperience,
      selectProject,
      selectDesign,
      selectInspiration,
      openQuickCapture,
      closeQuickCapture,
      openSearch,
      closeSearch,
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
