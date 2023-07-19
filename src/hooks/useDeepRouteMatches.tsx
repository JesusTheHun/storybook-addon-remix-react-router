import React from 'react';
import { DeepRouteMatchesContext } from '../contexts/DeepRouteMatches';

export const useDeepRouteMatches = () => {
  return React.useContext(DeepRouteMatchesContext);
};
