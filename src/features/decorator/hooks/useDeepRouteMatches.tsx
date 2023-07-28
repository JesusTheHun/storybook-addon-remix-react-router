import React from 'react';
import { DeepRouteMatchesContext } from '../components/DeepRouteMatches';

export const useDeepRouteMatches = () => {
  return React.useContext(DeepRouteMatchesContext);
};
