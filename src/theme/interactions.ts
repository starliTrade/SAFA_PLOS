/**
 * SAFA (صفا) — Tactile Physics & Soul Layer Interactions
 * Inspired by Linear precision, Apple tactile physics, and calm emotional luxury
 */

import { TargetAndTransition, Transition, Variants } from 'motion/react';

// ==========================================
// 1. SPRING PHYSICS PRESETS
// ==========================================
export const springs = {
  // Ultra-crisp tactile response for buttons, toggles, badges
  tactile: {
    type: 'spring' as const,
    stiffness: 450,
    damping: 32,
    mass: 0.75,
  },
  // Snappy response for cards, sheets, drawer expands
  snappy: {
    type: 'spring' as const,
    stiffness: 380,
    damping: 28,
    mass: 0.85,
  },
  // Gentle, calm luxury response for sanctuary transitions and modals
  gentle: {
    type: 'spring' as const,
    stiffness: 240,
    damping: 26,
    mass: 1.0,
  },
  // Playful micro-bounce for checkmarks and completion moments
  bouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 18,
    mass: 0.6,
  },
  // Experience / page change transition
  experience: {
    type: 'spring' as const,
    stiffness: 280,
    damping: 30,
    mass: 0.9,
  },
};

// ==========================================
// 2. TAP PHYSICS & CARD COMPRESSIONS
// ==========================================
export const tapPhysics: {
  subtle: TargetAndTransition;
  standard: TargetAndTransition;
  cardPress: TargetAndTransition;
  dockItem: TargetAndTransition;
  iconButton: TargetAndTransition;
} = {
  // Micro-scale for small buttons / tags
  subtle: {
    scale: 0.98,
    transition: springs.tactile,
  },
  // Standard tactile press for primary CTA buttons
  standard: {
    scale: 0.965,
    y: 0.5,
    transition: springs.tactile,
  },
  // Tactile compression for interactive cards & moodboard tiles
  cardPress: {
    scale: 0.985,
    y: 1,
    transition: springs.snappy,
  },
  // Elastic spring press for dock items
  dockItem: {
    scale: 0.92,
    transition: springs.bouncy,
  },
  // Circular icon buttons
  iconButton: {
    scale: 0.90,
    transition: springs.tactile,
  },
};

// ==========================================
// 3. CARD HOVER & INTERACTION PROFILES
// ==========================================
export const cardPhysics = {
  hoverElevated: {
    y: -3,
    transition: springs.snappy,
  },
  hoverSubtle: {
    y: -1.5,
    transition: springs.tactile,
  },
  hoverImageZoom: {
    scale: 1.035,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

// ==========================================
// 4. EXPERIENCE & PAGE TRANSITIONS
// ==========================================
export const experienceVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1],
      when: 'beforeChildren',
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: 'blur(2px)',
    transition: {
      duration: 0.2,
      ease: [0.32, 0, 0.67, 0],
    },
  },
};

export const staggerContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

export const childFadeUpVariants: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: springs.gentle,
  },
};

// ==========================================
// 5. COMPLETION & CELEBRATION FEEDBACK
// ==========================================
export const completionFeedback: {
  checkmark: TargetAndTransition;
  pulseGlow: TargetAndTransition;
  ripple: TargetAndTransition;
} = {
  checkmark: {
    scale: [0.85, 1.2, 1.0],
    rotate: [0, -6, 0],
    transition: {
      duration: 0.36,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
  pulseGlow: {
    scale: [1, 1.02, 1],
    opacity: [0.9, 1, 0.95],
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  ripple: {
    scale: [0.95, 1.06, 1],
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};
