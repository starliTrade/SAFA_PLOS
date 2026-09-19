import React from 'react';
import { motion } from 'motion/react';
import { useStateContext } from '../../context/StateContext';
import { AtelierHome } from '../../components/atelier/AtelierHome';
import { experienceVariants } from '../../theme/interactions';

export interface CreativeExperienceProps {
  onNavigateToInspiration: () => void;
}

export const CreativeExperience: React.FC<CreativeExperienceProps> = ({
  onNavigateToInspiration,
}) => {
  const { fashionProjects } = useStateContext();

  return (
    <motion.div
      variants={experienceVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      <AtelierHome
        initialProjectId={fashionProjects[0]?.id || null}
        onNavigateToInspirations={onNavigateToInspiration}
      />
    </motion.div>
  );
};
