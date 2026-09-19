import { NavigationDomain, ExperienceMode, DomainMeta } from './navigationTypes';

export const DOMAIN_REGISTRY: Record<string, DomainMeta> = {
  home: {
    id: 'home',
    label: 'Home',
    persianLabel: 'صفا',
    description: 'Personal space, daily presence & creative pulse',
  },
  life: {
    id: 'life',
    label: 'Life',
    persianLabel: 'زندگی',
    description: 'Intentions, sanctuary rituals & long-term horizons',
  },
  create: {
    id: 'create',
    label: 'Create',
    persianLabel: 'کارگاه',
    description: 'Fashion capsules, garment silhouettes & technical draping',
    defaultExperience: 'creative',
  },
  media: {
    id: 'media',
    label: 'Media',
    persianLabel: 'الهامات',
    description: 'Sensorial universe, textile library & color palettes',
    defaultExperience: 'discovery',
  },
  discover: {
    id: 'discover',
    label: 'Discover',
    persianLabel: 'کاوش',
    description: 'Cultural research, architectural textures & historical studies',
    defaultExperience: 'discovery',
  },
  more: {
    id: 'more',
    label: 'More',
    persianLabel: 'بیشتر',
    description: 'Memories archive, personal reflection & system settings',
    defaultExperience: 'reflection',
  },

  // Aliases for backward compatibility
  sanctuary: {
    id: 'home',
    label: 'Home',
    persianLabel: 'صفا',
    description: 'Personal space, daily presence & creative pulse',
  },
  atelier: {
    id: 'create',
    label: 'Create',
    persianLabel: 'کارگاه',
    description: 'Fashion capsules, garment silhouettes & technical draping',
    defaultExperience: 'creative',
  },
  discovery: {
    id: 'discover',
    label: 'Discover',
    persianLabel: 'کاوش',
    description: 'Cultural research, architectural textures & historical studies',
    defaultExperience: 'discovery',
  },
  memory: {
    id: 'more',
    label: 'More',
    persianLabel: 'بیشتر',
    description: 'Memories archive, personal reflection & system settings',
    defaultExperience: 'reflection',
  },
  horizon: {
    id: 'life',
    label: 'Life',
    persianLabel: 'زندگی',
    description: 'Intentions, sanctuary rituals & long-term horizons',
  },
};

export const EXPERIENCE_TO_DOMAIN_MAP: Record<ExperienceMode, NavigationDomain> = {
  morning: 'home',
  creative: 'create',
  discovery: 'discover',
  reflection: 'more',
};

export const DOMAIN_TO_EXPERIENCE_MAP: Partial<Record<NavigationDomain, ExperienceMode>> = {
  create: 'creative',
  discover: 'discovery',
  more: 'reflection',
};
