/**
 * SAFA (صفا) — Motion Presets & Semantic Physics
 * Linear-precision spring kinetics, Apple tactile resistance, and emotional calm.
 */

import { Transition } from 'motion/react';

export const springs = {
  // Ultra-crisp tactile response for buttons, toggles, badges (Linear/iOS feel)
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
  // Smooth spatial experience / tab transition
  experience: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
    mass: 0.9,
  },
};

export const eases = {
  // Smooth atmospheric easing for backdrop overlays and reveals
  atmospheric: {
    duration: 0.28,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
  // Linear-grade quick ease for tooltips and hover highlights
  fast: {
    duration: 0.15,
    ease: [0.2, 0, 0, 1] as [number, number, number, number],
  },
  // Cubic overshoot for multi-keyframe celebration animations
  celebration: {
    duration: 0.36,
    ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  },
};

export const transitions = {
  springTactile: springs.tactile,
  springSnappy: springs.snappy,
  springGentle: springs.gentle,
  springBouncy: springs.bouncy,
  springExperience: springs.experience,
  easeAtmospheric: eases.atmospheric,
  fadeFast: eases.fast,
};
