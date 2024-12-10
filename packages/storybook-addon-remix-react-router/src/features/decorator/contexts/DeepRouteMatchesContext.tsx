import React from 'react';

import type { RouteMatch } from 'react-router';

export const DeepRouteMatchesContext: React.Context<RouteMatch[]> = React.createContext<RouteMatch[]>([]);
