import React from 'react';
import { useNavigation } from '../../navigation/NavigationContext';
import { InspirationUniverse } from '../inspiration/InspirationUniverse';

export const MediaView: React.FC = () => {
  const { navigateToDomain } = useNavigation();

  return (
    <div className="w-full">
      <InspirationUniverse
        onNavigateToAtelierProject={(projectId) =>
          navigateToDomain('create', { projectId })
        }
      />
    </div>
  );
};
