import React from 'react';
import { DeepRouteMatchesContext } from '../contexts/DeepRouteMatchesContext';

export const useDeepRouteMatches = () => {
  return React.useContext(DeepRouteMatchesContext);
};
