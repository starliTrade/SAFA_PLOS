import React, { createContext, useContext, useState } from 'react';
import {
  UserProfile,
  DailyIntention,
  MoodEntry,
  Memory,
  LifeMilestone,
  RitualMoment,
} from '../types';
import {
  FashionProject,
  ProjectStatus,
  Design,
  DesignStatus,
} from '../types/atelier';
import {
  InspirationItem,
  FabricSwatch,
} from '../types/inspiration';
import {
  seedUserProfile,
  seedDailyIntentions,
  seedResurfacedMemory,
  seedLifeMilestones,
  seedRitualMoments,
} from '../data/seedData';
import {
  seedFashionProjects,
  seedDesigns,
} from '../data/atelierSeed';
import {
  seedInspirationItems,
  seedFabricSwatches,
} from '../data/inspirationSeed';

interface StateContextType {
  userProfile: UserProfile;
  dailyIntentions: DailyIntention[];
  toggleIntention: (id: string) => void;
  addIntention: (text: string, category?: 'atelier' | 'ritual' | 'university' | 'wellness') => void;
  resurfacedMemory: Memory;
  lifeMilestones: LifeMilestone[];
  rituals: RitualMoment[];
  toggleRitual: (id: string) => void;

  // Atelier & Projects
  fashionProjects: FashionProject[];
  createFashionProject: (project: Omit<FashionProject, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateFashionProjectStatus: (projectId: string, status: ProjectStatus) => void;

  // Designs / Looks
  designs: Design[];
  createDesign: (design: Omit<Design, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateDesignStatus: (designId: string, status: DesignStatus) => void;

  // Inspiration Universe
  inspirationItems: InspirationItem[];
  addInspirationItem: (item: Omit<InspirationItem, 'id' | 'dateAdded'>) => void;
  pinInspirationToProject: (inspirationId: string, projectId: string) => void;
  unpinInspirationFromProject: (inspirationId: string, projectId: string) => void;

  // Fabrics & Textiles
  fabricSwatches: FabricSwatch[];
  unlinkMaterialFromProject: (materialId: string, projectId: string) => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile] = useState<UserProfile>(seedUserProfile);
  const [dailyIntentions, setDailyIntentions] = useState<DailyIntention[]>(seedDailyIntentions);
  const [resurfacedMemory] = useState<Memory>(seedResurfacedMemory);
  const [lifeMilestones] = useState<LifeMilestone[]>(seedLifeMilestones);
  const [rituals, setRituals] = useState<RitualMoment[]>(seedRitualMoments);

  const [fashionProjects, setFashionProjects] = useState<FashionProject[]>(seedFashionProjects);
  const [designs, setDesigns] = useState<Design[]>(seedDesigns);
  const [inspirationItems, setInspirationItems] = useState<InspirationItem[]>(seedInspirationItems);
  const [fabricSwatches, setFabricSwatches] = useState<FabricSwatch[]>(seedFabricSwatches);

  // Intentions
  const toggleIntention = (id: string) => {
    setDailyIntentions((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const addIntention = (
    text: string,
    category: 'atelier' | 'ritual' | 'university' | 'wellness' = 'atelier'
  ) => {
    const newItem: DailyIntention = {
      id: `intent_${Date.now()}`,
      text,
      completed: false,
      category,
      priority: 'normal',
    };
    setDailyIntentions((prev) => [newItem, ...prev]);
  };

  // Rituals
  const toggleRitual = (id: string) => {
    setRituals((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, completed: !r.completed } : r
      )
    );
  };

  // Projects
  const createFashionProject = (
    project: Omit<FashionProject, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    const today = new Date().toISOString().split('T')[0];
    const newProject: FashionProject = {
      ...project,
      id: `proj_${Date.now()}`,
      createdAt: today,
      updatedAt: today,
    };
    setFashionProjects((prev) => [newProject, ...prev]);
  };

  const updateFashionProjectStatus = (projectId: string, status: ProjectStatus) => {
    const today = new Date().toISOString().split('T')[0];
    setFashionProjects((prev) =>
      prev.map((p) =>
        p.id === projectId ? { ...p, status, updatedAt: today } : p
      )
    );
  };

  // Designs / Lookbook Line Sheets
  const createDesign = (
    design: Omit<Design, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    const today = new Date().toISOString().split('T')[0];
    const newDesign: Design = {
      ...design,
      id: `des_${Date.now()}`,
      createdAt: today,
      updatedAt: today,
    };
    setDesigns((prev) => [...prev, newDesign]);

    // Update project completed count or target if applicable
    setFashionProjects((prev) =>
      prev.map((p) =>
        p.id === design.projectId
          ? {
              ...p,
              designIds: [...p.designIds, newDesign.id],
              completedLooksCount:
                design.status === 'FINAL'
                  ? (p.completedLooksCount || 0) + 1
                  : p.completedLooksCount,
              updatedAt: today,
            }
          : p
      )
    );
  };

  const updateDesignStatus = (designId: string, status: DesignStatus) => {
    const today = new Date().toISOString().split('T')[0];
    setDesigns((prev) =>
      prev.map((d) => (d.id === designId ? { ...d, status, updatedAt: today } : d))
    );
  };

  // Inspiration Universe Pinning & Adding
  const addInspirationItem = (
    item: Omit<InspirationItem, 'id' | 'dateAdded'>
  ) => {
    const today = new Date().toISOString().split('T')[0];
    const newItem: InspirationItem = {
      ...item,
      id: `insp_${Date.now()}`,
      dateAdded: today,
    };
    setInspirationItems((prev) => [newItem, ...prev]);
  };

  const pinInspirationToProject = (inspirationId: string, projectId: string) => {
    const today = new Date().toISOString().split('T')[0];
    // 1. Update inspiration item
    setInspirationItems((prev) =>
      prev.map((item) => {
        if (item.id === inspirationId) {
          const currentLinks = item.linkedProjectIds || [];
          const updatedLinks = currentLinks.includes(projectId)
            ? currentLinks
            : [...currentLinks, projectId];
          return {
            ...item,
            isPinnedToAtelier: true,
            linkedProjectIds: updatedLinks,
          };
        }
        return item;
      })
    );

    // 2. Update fashion project
    setFashionProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const currentInspirations = p.inspirationIds || [];
          if (!currentInspirations.includes(inspirationId)) {
            return {
              ...p,
              inspirationIds: [...currentInspirations, inspirationId],
              updatedAt: today,
            };
          }
        }
        return p;
      })
    );
  };

  const unpinInspirationFromProject = (inspirationId: string, projectId: string) => {
    const today = new Date().toISOString().split('T')[0];
    // 1. Update inspiration item
    setInspirationItems((prev) =>
      prev.map((item) => {
        if (item.id === inspirationId) {
          const currentLinks = (item.linkedProjectIds || []).filter(
            (id) => id !== projectId
          );
          return {
            ...item,
            isPinnedToAtelier: currentLinks.length > 0,
            linkedProjectIds: currentLinks,
          };
        }
        return item;
      })
    );

    // 2. Update fashion project
    setFashionProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            inspirationIds: (p.inspirationIds || []).filter((id) => id !== inspirationId),
            updatedAt: today,
          };
        }
        return p;
      })
    );
  };

  // Materials & Textiles
  const unlinkMaterialFromProject = (materialId: string, projectId: string) => {
    const today = new Date().toISOString().split('T')[0];
    setFashionProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            materialIds: (p.materialIds || []).filter((id) => id !== materialId),
            updatedAt: today,
          };
        }
        return p;
      })
    );
  };

  return (
    <StateContext.Provider
      value={{
        userProfile,
        dailyIntentions,
        toggleIntention,
        addIntention,
        resurfacedMemory,
        lifeMilestones,
        rituals,
        toggleRitual,
        fashionProjects,
        createFashionProject,
        updateFashionProjectStatus,
        designs,
        createDesign,
        updateDesignStatus,
        inspirationItems,
        addInspirationItem,
        pinInspirationToProject,
        unpinInspirationFromProject,
        fabricSwatches,
        unlinkMaterialFromProject,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
};
