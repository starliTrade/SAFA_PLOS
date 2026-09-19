/**
 * SAFA (صفا) — Motion Presets & Physics Transitions
 * Apple/Linear-inspired tactile springs
 */

export const transitions = {
  springTactile: {
    type: 'spring' as const,
    stiffness: 420,
    damping: 32,
    mass: 0.8,
  },
  springBouncy: {
    type: 'spring' as const,
    stiffness: 350,
    damping: 24,
  },
  springGentle: {
    type: 'spring' as const,
    stiffness: 260,
    damping: 28,
  },
  easeAtmospheric: {
    duration: 0.28,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
  fadeFast: {
    duration: 0.15,
    ease: 'easeInOut' as const,
  }
};
