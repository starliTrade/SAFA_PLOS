/**
 * SAFA (صفا) — Core Design Tokens
 * 70% Calm Productivity / 30% Emotional Luxury
 * Systematic 8pt spacing, mathematical radii, refined typography & chromatic hierarchy.
 */

// ==========================================
// 1. PRIMITIVE COLOR PALETTES
// ==========================================
export const palette = {
  // Warm Alabaster to Deep Obsidian Spectrum
  neutrals: {
    50: '#FAF8F5',   // Warm Alabaster Canvas (Light)
    100: '#F5F1EB',  // Warm Silk Wash
    150: '#EFEAE1',  // Pale Oat Tint
    200: '#EAE4DC',  // Soft Warm Neutral Border
    300: '#DFD8CE',  // Muted Structure Border
    400: '#C4BEB5',  // Pale Scribe
    500: '#9E968D',  // Soft Clay Grey / Muted Content
    600: '#7D756C',  // Warm Persian Charcoal
    700: '#635E59',  // Deep Warm Neutral Secondary
    800: '#3D3833',  // Dark Warm Neutral
    850: '#2C2723',  // Deep Warm Surface (Dark)
    900: '#1E1B18',  // Deep Espresso Near-Black (Light Primary Text)
    925: '#191614',  // Elevated Obsidian (Dark Surface)
    950: '#13110F',  // Obsidian Canvas (Dark Canvas)
    1000: '#0C0A09', // Pure Ground
  },

  // SAFA Terracotta (Isfahan Ochre / Ceramic Clay) — Primary Brand Accent
  terracotta: {
    50: '#FAF2EE',
    100: '#F7EDE8',
    200: '#F0D5C9',
    300: '#E5B7A4',
    400: '#D7957D',
    500: '#C97D60',  // Core Terracotta
    600: '#B56C50',
    700: '#9E583E',
    800: '#82452F',
    900: '#613221',
  },

  // Persian Laurel (Muted Botanical Sage) — Secondary Positive Accent
  laurel: {
    50: '#F4F7F4',
    100: '#EEF3EE',
    200: '#CDE0CC',
    300: '#A9C6A7',
    400: '#7FA07D',
    500: '#5C6F59',  // Core Laurel
    600: '#4A5B47',
    700: '#3D4C3A',
    800: '#303D2E',
    900: '#222D20',
  },

  // Antique Persian Gold — Heritage Accent
  gold: {
    50: '#FDFBF5',
    100: '#FBF6E9',
    200: '#F2E4B8',
    300: '#E5CD83',
    400: '#DFBE5B',
    500: '#D4AF37',  // Core Antique Gold
    600: '#B89326',
    700: '#96741A',
    800: '#755811',
    900: '#533C08',
  },

  // Ceramic Turquoise — Cultural Accent
  turquoise: {
    50: '#F0F5F7',
    100: '#E8EFF1',
    200: '#C5D7DC',
    300: '#97B7C0',
    400: '#5B8794',
    500: '#2A4B56',  // Core Deep Turquoise
    600: '#223E47',
    700: '#1B3138',
    800: '#13242A',
    900: '#0C171C',
  },

  // Saffron Core Crimson — Emotional Energy
  saffron: {
    50: '#FCF3F0',
    100: '#FAEEEB',
    200: '#F5CBC2',
    300: '#ECA090',
    400: '#E37861',
    500: '#E07A5F',  // Core Saffron
    600: '#C86147',
    700: '#A74B34',
    800: '#843724',
    900: '#622415',
  },

  // Amber Warmth
  amber: {
    50: '#FBF8F2',
    100: '#F8F1E7',
    200: '#EDDCBE',
    300: '#DEC290',
    400: '#D1A661',
    500: '#C48B47',  // Core Amber
    600: '#A77033',
    700: '#875622',
    800: '#663E14',
    900: '#472808',
  },
};

// ==========================================
// 2. TYPOGRAPHY SCALES & SEMANTICS
// ==========================================
export const typography = {
  fonts: {
    editorial: "'Cormorant Garamond', Georgia, serif",
    sans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    persian: "'Vazirmatn', -apple-system, system-ui, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
  sizes: {
    display: { size: '2.5rem', lineHeight: '1.15', letterSpacing: '-0.025em' },     // 40px
    hero: { size: '2rem', lineHeight: '1.2', letterSpacing: '-0.02em' },             // 32px
    title: { size: '1.5rem', lineHeight: '1.25', letterSpacing: '-0.015em' },        // 24px
    sectionTitle: { size: '1.1875rem', lineHeight: '1.3', letterSpacing: '-0.01em' },// 19px
    subtitle: { size: '1.0625rem', lineHeight: '1.35', letterSpacing: '-0.005em' },   // 17px
    bodyLarge: { size: '1rem', lineHeight: '1.6', letterSpacing: '0' },              // 16px
    body: { size: '0.9375rem', lineHeight: '1.55', letterSpacing: '0' },             // 15px
    bodySmall: { size: '0.8125rem', lineHeight: '1.5', letterSpacing: '0' },          // 13px
    label: { size: '0.75rem', lineHeight: '1.4', letterSpacing: '0.02em' },          // 12px
    caption: { size: '0.6875rem', lineHeight: '1.35', letterSpacing: '0.03em' },      // 11px
    metadata: { size: '0.625rem', lineHeight: '1.3', letterSpacing: '0.04em' },       // 10px
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

// ==========================================
// 3. 8-POINT SPACING SCALE
// ==========================================
export const spacing = {
  0: '0px',
  1: '0.125rem', // 2px
  2: '0.25rem',  // 4px
  3: '0.375rem', // 6px
  4: '0.5rem',   // 8px
  6: '0.75rem',  // 12px
  8: '1rem',     // 16px
  10: '1.25rem', // 20px
  12: '1.5rem',  // 24px
  16: '2rem',    // 32px
  20: '2.5rem',  // 40px
  24: '3rem',    // 48px
  32: '4rem',    // 64px
  40: '5rem',    // 80px
};

// ==========================================
// 4. MATHEMATICAL RADII
// ==========================================
export const radii = {
  none: '0px',
  control: '8px',
  small: '10px',
  medium: '14px',
  large: '18px',
  panel: '20px',
  sheet: '26px',
  pill: '9999px',
  circle: '9999px',
};

// ==========================================
// 5. SHADOW ELEVATIONS
// ==========================================
export const shadows = {
  none: 'none',
  subtle: '0 1px 2px rgba(30, 27, 24, 0.03)',
  surface: '0 1px 3px rgba(30, 27, 24, 0.03), 0 4px 12px rgba(30, 27, 24, 0.03)',
  raised: '0 8px 24px rgba(30, 27, 24, 0.06), 0 2px 6px rgba(30, 27, 24, 0.02)',
  floating: '0 16px 40px rgba(30, 27, 24, 0.12), 0 4px 12px rgba(30, 27, 24, 0.04)',
  overlay: '0 24px 64px rgba(30, 27, 24, 0.22)',
  innerGlow: 'inset 0 1px 1px rgba(255, 255, 255, 0.15)',
};

// ==========================================
// 6. Z-INDEX HIERARCHY
// ==========================================
export const zIndex = {
  base: 0,
  raised: 10,
  sticky: 30,
  header: 40,
  dock: 50,
  overlay: 60,
  modal: 70,
  spotlight: 80,
  toast: 90,
};
