import { NavigationDomain, ExperienceMode } from '../navigation/navigationTypes';

export type SearchObjectType = 'project' | 'inspiration' | 'design' | 'memory' | 'goal' | 'ritual';

export interface SearchResultItem {
  id: string;
  type: SearchObjectType;
  title: string;
  subtitle: string;
  persianTitle?: string;
  description?: string;
  tags?: string[];
  category?: string;
  domain: NavigationDomain;
  experience: ExperienceMode;
  projectId?: string;
  designId?: string;
  score: number;
}
