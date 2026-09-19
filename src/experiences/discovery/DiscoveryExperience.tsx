import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Palette, Layers, Compass } from 'lucide-react';
import { InspirationUniverse } from '../../components/inspiration/InspirationUniverse';
import { experienceVariants } from '../../theme/interactions';

export interface DiscoveryExperienceProps {
  onNavigateToAtelierProject?: () => void;
}

export const DiscoveryExperience: React.FC<DiscoveryExperienceProps> = ({
  onNavigateToAtelierProject,
}) => {
  return (
    <motion.div
      variants={experienceVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      <InspirationUniverse onNavigateToAtelierProject={onNavigateToAtelierProject} />
    </motion.div>
  );
};
