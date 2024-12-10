import React from 'react';
import type { RouteMatch } from 'react-router';
import { DeepRouteMatchesContext } from '../contexts/DeepRouteMatchesContext';

export const useDeepRouteMatches = (): RouteMatch[] => {
  return React.useContext(DeepRouteMatchesContext);
};
