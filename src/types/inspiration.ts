/**
 * SAFA (صفا) — Inspiration Universe Domain Types
 */

export type InspirationCategory =
  | 'all'
  | 'architecture'
  | 'textile'
  | 'silhouette'
  | 'runway'
  | 'cultural_archive';

export interface InspirationColorSwatch {
  hex: string;
  name: string;
  persianName: string;
  role?: 'dominant' | 'accent' | 'neutral' | 'subtle';
}

export type FabricDrapeType =
  | 'Fluid & Flowing'
  | 'Structured & Sculptural'
  | 'Structured & Crisp'
  | 'Crisp & Tailored'
  | 'Weightless Gauze'
  | 'Heavy & Sculptural'
  | 'Delicate & Sheer';

export interface FabricRelation {
  fabricName: string;
  persianFabricName?: string;
  weight: string; // e.g. "240 g/m²"
  drape: FabricDrapeType;
  weave: string; // e.g. "Jacquard Silk", "Merino Twill", "Raw Linen"
  suggestedLook?: string; // e.g. "Look 03 Overcoat", "Look 05 Draped Cape"
}

export interface InspirationItem {
  id: string;
  title: string;
  persianTitle: string;
  source: string;
  imageUrl: string;
  aspectRatio: 'portrait' | 'landscape' | 'square' | 'tall';
  category: InspirationCategory;
  mood: string;
  persianMood?: string;
  colorPalette: InspirationColorSwatch[];
  fabricRelation?: FabricRelation;
  notes: string;
  persianNotes?: string;
  linkedProjectIds?: string[];
  isPinnedToAtelier: boolean;
  dateAdded: string;
  tags: string[];
}

export interface FabricSwatch {
  id: string;
  name: string;
  persianName: string;
  material: string; // e.g. "100% Raw Mulberry Silk"
  weave: string; // e.g. "Chiffon Plain Weave"
  weight: string; // e.g. "85 g/m²"
  drape: FabricDrapeType;
  texture: string; // e.g. "Matte, slightly grainy, high breathability"
  usage: string; // e.g. "Look 02 Inner Blouse & Flowing Sashes"
  supplier: string; // e.g. "Tehran Grand Bazaar • Haj Reza Silk Master"
  hexColor: string;
  accentColorName: string;
  swatchImageUrl: string;
  inStockMeters?: number;
  linkedLookNumber?: number;
  linkedProjectIds?: string[];
}
