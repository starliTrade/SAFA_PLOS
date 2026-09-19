/**
 * SAFA (صفا) — Atelier Domain Models & Creative Loop Types
 */

import { InspirationColorSwatch } from './inspiration';

export type ProjectStatus =
  | 'IDEA'
  | 'PLANNING'
  | 'ACTIVE'
  | 'PAUSED'
  | 'COMPLETED'
  | 'ARCHIVED';

export type DesignStatus =
  | 'IDEA'
  | 'DRAFT'
  | 'DEVELOPING'
  | 'FINAL';

export interface FashionProject {
  id: string;
  title: string;
  persianTitle?: string;
  description: string;
  status: ProjectStatus;
  concept: string;
  persianConcept?: string;
  season: string; // e.g., "Fall/Winter 2026-27"
  palette: InspirationColorSwatch[];
  inspirationIds: string[];
  moodboardIds: string[];
  designIds: string[];
  materialIds: string[];
  notes: string;
  persianNotes?: string;
  looksTargetCount?: number;
  completedLooksCount?: number;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Design {
  id: string;
  title: string;
  persianTitle?: string;
  description: string;
  status: DesignStatus;
  lookNumber: number; // e.g. 1 for Look 01
  silhouetteType: 'Overcoat' | 'Tunic & Sashes' | 'Structured Cape' | 'Pleated Skirt' | 'Draped Blouse' | 'Evening Tuxedo';
  images: string[];
  sketches: string[];
  notes: string;
  persianNotes?: string;
  inspirationIds: string[];
  materialIds: string[];
  projectId: string;
  version: string; // e.g., "v1.3", "v2.0"
  drapingPatternNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Moodboard {
  id: string;
  projectId: string;
  title: string;
  persianTitle?: string;
  description?: string;
  visualInspirationIds: string[];
  colorPalette: InspirationColorSwatch[];
  pinnedNotes: Array<{
    id: string;
    text: string;
    persianText?: string;
    position?: { x: number; y: number };
  }>;
  updatedAt: string;
}

export interface CreativeNote {
  id: string;
  projectId: string;
  title: string;
  content: string;
  persianContent?: string;
  date: string;
  category: 'textile_sourcing' | 'pattern_geometry' | 'fitting' | 'thesis_concept';
}
