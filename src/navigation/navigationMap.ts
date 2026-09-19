import { NavigationDomain, ExperienceMode, DomainMeta } from './navigationTypes';

export const DOMAIN_REGISTRY: Record<NavigationDomain, DomainMeta> = {
  sanctuary: {
    id: 'sanctuary',
    label: 'Sanctuary',
    persianLabel: 'صفا',
    description: 'Morning Centering, intentions & studio presence',
    defaultExperience: 'morning',
  },
  atelier: {
    id: 'atelier',
    label: 'Atelier',
    persianLabel: 'کارگاه',
    description: 'Fashion capsules, draping specs & garment silhouettes',
    defaultExperience: 'creative',
  },
  discovery: {
    id: 'discovery',
    label: 'Discovery',
    persianLabel: 'الهام',
    description: 'Sensorial inspiration universe, Grand Bazaar textiles & palette matrices',
    defaultExperience: 'discovery',
  },
  memory: {
    id: 'memory',
    label: 'Memory',
    persianLabel: 'خاطره',
    description: 'Resurfaced sensorial archives & evening stillness',
    defaultExperience: 'reflection',
  },
  horizon: {
    id: 'horizon',
    label: 'Horizon',
    persianLabel: 'افق',
    description: 'Quarterly milestones, thesis goals & creative horizon',
  },
};

export const EXPERIENCE_TO_DOMAIN_MAP: Record<ExperienceMode, NavigationDomain> = {
  morning: 'sanctuary',
  creative: 'atelier',
  discovery: 'discovery',
  reflection: 'memory',
};

export const DOMAIN_TO_EXPERIENCE_MAP: Record<NavigationDomain, ExperienceMode> = {
  sanctuary: 'morning',
  atelier: 'creative',
  discovery: 'discovery',
  memory: 'reflection',
  horizon: 'morning', // fallback if experience mode requested from horizon
};
