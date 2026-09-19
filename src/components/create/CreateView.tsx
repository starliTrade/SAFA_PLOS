import React from 'react';
import { useNavigation } from '../../navigation/NavigationContext';
import { AtelierHome } from '../atelier/AtelierHome';

export const CreateView: React.FC = () => {
  const { selectedProjectId, navigateToDomain } = useNavigation();

  return (
    <div className="w-full">
      <AtelierHome
        initialProjectId={selectedProjectId}
        onNavigateToInspirations={() => navigateToDomain('media')}
      />
    </div>
  );
};
