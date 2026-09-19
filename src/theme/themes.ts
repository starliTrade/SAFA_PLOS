/**
 * SAFA (صفا) — Concrete Theme Definitions
 * Precision Light & Dark Themes + CSS Custom Variable Bindings.
 */

import { SemanticTheme } from './semantic';
import { palette } from './tokens';

export const lightTheme: SemanticTheme = {
  background: {
    canvas: '#FAF8F5',
    surface: '#FFFFFF',
    surfaceRaised: '#FCFAF7',
    surfaceSubtle: '#F5F1EB',
    surfaceInset: '#EFEAE1',
    surfaceHighlight: '#FAF2EE',
    overlay: 'rgba(30, 27, 24, 0.45)',
    dock: 'rgba(30, 27, 24, 0.94)',
  },
  content: {
    primary: '#1E1B18',
    secondary: '#635E59',
    tertiary: '#7D756C',
    muted: '#9E968D',
    subtle: '#C4BEB5',
    inverse: '#FAF8F5',
    accent: '#C97D60',
  },
  border: {
    subtle: '#EAE4DC',
    default: '#DFD8CE',
    strong: '#C4BEB5',
    focus: '#C97D60',
    selected: '#C97D60',
    transparent: 'transparent',
  },
  accent: {
    primary: '#C97D60',
    primarySubtle: '#F7EDE8',
    primaryHover: '#B56C50',
    primaryActive: '#9E583E',
    primaryContent: '#FFFFFF',

    secondary: '#5C6F59',
    secondarySubtle: '#EEF3EE',
    secondaryHover: '#4A5B47',
    secondaryActive: '#3D4C3A',
    secondaryContent: '#FFFFFF',

    gold: '#D4AF37',
    goldSubtle: '#FBF6E9',
    goldContent: '#9B7B1D',

    turquoise: '#2A4B56',
    turquoiseSubtle: '#E8EFF1',
    turquoiseContent: '#FFFFFF',
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
    danger: { bg: '#FDF2F2', text: '#9B2C2C', border: '#F8D7DA' },
  },
  shadow: {
    subtle: '0 1px 2px rgba(30, 27, 24, 0.03)',
    surface: '0 1px 3px rgba(30, 27, 24, 0.03), 0 4px 12px rgba(30, 27, 24, 0.03)',
    raised: '0 8px 24px rgba(30, 27, 24, 0.06), 0 2px 6px rgba(30, 27, 24, 0.02)',
    floating: '0 16px 40px rgba(30, 27, 24, 0.12), 0 4px 12px rgba(30, 27, 24, 0.04)',
    overlay: '0 24px 64px rgba(30, 27, 24, 0.22)',
  },
};

export const darkTheme: SemanticTheme = {
  background: {
    canvas: '#13110F',
    surface: '#191614',
    surfaceRaised: '#23201C',
    surfaceSubtle: '#2C2723',
    surfaceInset: '#0E0C0B',
    surfaceHighlight: '#33231D',
    overlay: 'rgba(0, 0, 0, 0.72)',
    dock: 'rgba(25, 22, 20, 0.92)',
  },
  content: {
    primary: '#FAF5EE',
    secondary: '#D0C7BC',
    tertiary: '#9E968D',
    muted: '#7D756C',
    subtle: '#524B44',
    inverse: '#13110F',
    accent: '#D9886C',
  },
  border: {
    subtle: 'rgba(250, 245, 238, 0.08)',
    default: 'rgba(250, 245, 238, 0.14)',
    strong: 'rgba(250, 245, 238, 0.24)',
    focus: '#D9886C',
    selected: '#D9886C',
    transparent: 'transparent',
  },
  accent: {
    primary: '#D9886C',
    primarySubtle: 'rgba(217, 136, 108, 0.16)',
    primaryHover: '#E59B81',
    primaryActive: '#C4775C',
    primaryContent: '#FFFFFF',

    secondary: '#72896E',
    secondarySubtle: 'rgba(114, 137, 110, 0.16)',
    secondaryHover: '#869F82',
    secondaryActive: '#60755C',
    secondaryContent: '#FFFFFF',

    gold: '#DFC065',
    goldSubtle: 'rgba(223, 192, 101, 0.14)',
    goldContent: '#DFC065',

    turquoise: '#4E7784',
    turquoiseSubtle: 'rgba(78, 119, 132, 0.2)',
    turquoiseContent: '#E8EFF1',
  },
  status: {
    idea: { bg: 'rgba(245, 241, 235, 0.08)', text: '#D0C7BC', border: 'rgba(250, 245, 238, 0.12)' },
    planning: { bg: 'rgba(78, 119, 132, 0.18)', text: '#89AFC0', border: 'rgba(78, 119, 132, 0.3)' },
    active: { bg: 'rgba(217, 136, 108, 0.18)', text: '#E59B81', border: 'rgba(217, 136, 108, 0.32)' },
    paused: { bg: 'rgba(223, 192, 101, 0.14)', text: '#DFC065', border: 'rgba(223, 192, 101, 0.28)' },
    completed: { bg: 'rgba(114, 137, 110, 0.18)', text: '#9FC09A', border: 'rgba(114, 137, 110, 0.3)' },
    archived: { bg: 'rgba(250, 245, 238, 0.06)', text: '#9E968D', border: 'rgba(250, 245, 238, 0.1)' },
    draft: { bg: 'rgba(223, 192, 101, 0.1)', text: '#C7B17C', border: 'rgba(223, 192, 101, 0.22)' },
    developing: { bg: 'rgba(217, 136, 108, 0.15)', text: '#ECA090', border: 'rgba(217, 136, 108, 0.26)' },
    final: { bg: 'rgba(114, 137, 110, 0.22)', text: '#B8DBB3', border: 'rgba(114, 137, 110, 0.36)' },
    danger: { bg: 'rgba(155, 44, 44, 0.2)', text: '#F8A5A5', border: 'rgba(155, 44, 44, 0.35)' },
  },
  shadow: {
    subtle: '0 1px 2px rgba(0, 0, 0, 0.3)',
    surface: '0 1px 3px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.4)',
    raised: '0 8px 24px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.3)',
    floating: '0 16px 40px rgba(0, 0, 0, 0.6), 0 4px 12px rgba(0, 0, 0, 0.4)',
    overlay: '0 24px 64px rgba(0, 0, 0, 0.8)',
  },
};
