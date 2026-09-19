/**
 * SAFA (صفا) — Core Design Tokens
 * 70% Calm Productivity / 30% Emotional Luxury
 */

export const colors = {
  canvas: {
    bg: '#FAF8F5',          // Warm Alabaster Canvas
    surface: '#FFFFFF',     // Crisp Silk Surface
    subtle: '#F5F1EB',      // Warm Paper Wash
    muted: '#EAE4DC',       // Muted Oat Divider
  },
  ink: {
    primary: '#1E1B18',     // Deep Persian Espresso
    secondary: '#635E59',   // Warm Charcoal
    muted: '#9E968D',       // Soft Clay Grey
    subtle: '#C4BEB5',      // Pale Scribe
  },
  accent: {
    terracotta: '#C97D60',  // Isfahan Ochre / Terracotta
    terracottaLight: '#F7EDE8',
    gold: '#D4AF37',        // Antique Persian Gold
    goldLight: '#FBF6E9',
    laurel: '#5C6F59',      // Persian Laurel Green
    laurelLight: '#EEF3EE',
    saffron: '#E07A5F',     // Saffron Core Crimson
    saffronLight: '#FAEEEB',
    turquoise: '#2A4B56',   // Ceramic Turquoise
    turquoiseLight: '#E8EFF1',
    amber: '#C48B47',       // Amber Leaf
    amberLight: '#F8F1E7',
  },
  status: {
    idea: { bg: '#F5F1EB', text: '#635E59', border: '#EAE4DC' },
    planning: { bg: '#E8EFF1', text: '#2A4B56', border: '#C5D7DC' },
    active: { bg: '#F7EDE8', text: '#C97D60', border: '#F0D5C9' },
    paused: { bg: '#FBF6E9', text: '#9B7B1D', border: '#F2E4B8' },
    completed: { bg: '#EEF3EE', text: '#40533D', border: '#CDE0CC' },
    archived: { bg: '#F0ECE6', text: '#8A847C', border: '#DED8CE' },
    draft: { bg: '#F7F4EE', text: '#8A7650', border: '#E5DCBE' },
    developing: { bg: '#F7EDE8', text: '#B85E3E', border: '#F0CBBF' },
    final: { bg: '#EEF3EE', text: '#345231', border: '#BBD1BA' },
  }
};

export const radii = {
  xs: '6px',
  sm: '10px',
  md: '14px',
  lg: '18px',
  xl: '24px',
  full: '9999px',
};

export const shadows = {
  subtle: '0 1px 2px rgba(30, 27, 24, 0.04)',
  card: '0 1px 3px rgba(30, 27, 24, 0.03), 0 4px 14px rgba(30, 27, 24, 0.04)',
  elevated: '0 8px 24px rgba(30, 27, 24, 0.07)',
  glass: '0 8px 32px rgba(30, 27, 24, 0.08)',
};
