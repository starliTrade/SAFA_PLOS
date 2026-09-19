/**
 * SAFA (صفا) — Tactile Physics & Semantic Interactions
 * Linear-inspired interaction discipline + Apple haptic calibration.
 */

import { Variants } from 'motion/react';
import { springs, eases } from './motion';

export { springs, eases };

// ==========================================
// 1. TACTILE TAP & PRESS COMPRESSIONS
// ==========================================
export const tapPhysics = {
  // Micro-scale for subtle tags, icons, small chips
  subtle: {
    scale: 0.97,
    transition: springs.tactile,
  },
  // Standard compression for primary/secondary buttons
  standard: {
    scale: 0.96,
    transition: springs.tactile,
  },
  // Deep card compression for interactive surfaces
  cardPress: {
    scale: 0.985,
    y: 1,
    transition: springs.snappy,
  },
  // Dock pill item compression
  dockItem: {
    scale: 0.92,
    transition: springs.tactile,
  },
  // Circular icon action button
  iconButton: {
    scale: 0.88,
    transition: springs.tactile,
  },
  // Destructive press
  destructive: {
    scale: 0.95,
    transition: springs.tactile,
  },
};

// ==========================================
// 2. CARD HOVER & ELEVATION PHYSICS
// ==========================================
export const cardPhysics = {
  hoverElevated: {
    y: -2,
    transition: springs.snappy,
  },
  hoverSubtle: {
    y: -1,
    transition: springs.tactile,
  },
};

// ==========================================
// 3. SEMANTIC MOTION CATEGORIES
// ==========================================
export const motionSemantics = {
  // Micro: immediate localized state changes
  micro: {
    tap: tapPhysics.subtle,
    transition: springs.tactile,
  },
  // Tactile: buttons, controls, toggles
  tactile: {
    tap: tapPhysics.standard,
    transition: springs.tactile,
  },
  // Navigation: spatial transition across domains
  navigation: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -6 },
    transition: springs.experience,
  },
  // Reveal: stagger and fade-in entry for lists
  reveal: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: springs.gentle,
  },
  // Overlay: dialog and bottom sheet kinetics
  overlay: {
    backdrop: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: eases.atmospheric,
    },
    dialog: {
      initial: { scale: 0.96, opacity: 0, y: 12 },
      animate: { scale: 1, opacity: 1, y: 0 },
      exit: { scale: 0.96, opacity: 0, y: 8 },
      transition: springs.snappy,
    },
    sheet: {
      initial: { y: '100%', opacity: 0.9 },
      animate: { y: 0, opacity: 1 },
      exit: { y: '100%', opacity: 0 },
      transition: springs.snappy,
    },
  },
  // Completion: subtle celebration feedback
  completion: {
    checkmark: {
      scale: [0.85, 1.2, 1.0],
      rotate: [0, -6, 0],
      transition: eases.celebration,
    },
    pulseGlow: {
      scale: [1, 1.02, 1],
      opacity: [0.9, 1, 0.95],
      transition: eases.atmospheric,
    },
  },
  // Destructive: minimal, unmistakable negative feedback
  destructive: {
    shake: {
      x: [0, -4, 4, -2, 2, 0],
      transition: eases.atmospheric,
    },
  },
};

// ==========================================
// 4. ANIMATION VARIANTS (PAGE / STAGGER)
// ==========================================
export const experienceVariants: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: springs.experience,
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.16,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

export const containerStaggerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
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
// 5. BACKWARD-COMPATIBLE COMPLETION EXPORT
// ==========================================
export const completionFeedback = {
  checkmark: motionSemantics.completion.checkmark,
  pulseGlow: motionSemantics.completion.pulseGlow,
  ripple: {
    scale: [0.95, 1.06, 1],
    transition: eases.atmospheric,
  },
};
