import { withRouter } from './features/decorator/withRouter';
import { reactRouterParameters } from './features/decorator/utils/routesHelpers/reactRouterParameters';
import { reactRouterOutlet } from './features/decorator/utils/routesHelpers/reactRouterOutlet';
import { reactRouterOutlets } from './features/decorator/utils/routesHelpers/reactRouterOutlets';
import { reactRouterNestedOutlets } from './features/decorator/utils/routesHelpers/reactRouterNestedOutlets';
import { reactRouterNestedAncestors } from './features/decorator/utils/routesHelpers/reactRouterNestedAncestors';
import { castRouteDefinitionObject } from './features/decorator/utils/castRouteDefinitionObject';

import type { ReactRouterAddonStoryParameters } from './features/decorator/components/ReactRouterDecorator';
import type {
  RouteDefinition,
  NonIndexRouteDefinition,
  NonIndexRouteDefinitionObject,
  RouteDefinitionObject,
  RouterRoute,
  RoutingHelper,
} from './features/decorator/types';

export {
  withRouter,
  reactRouterParameters,
  reactRouterOutlet,
  reactRouterOutlets,
  reactRouterNestedOutlets,
  reactRouterNestedAncestors,
  castRouteDefinitionObject,
};

export type {
  RouterRoute,
  ReactRouterAddonStoryParameters,
  RouteDefinition,
  NonIndexRouteDefinition,
  NonIndexRouteDefinitionObject,
  RouteDefinitionObject,
  RoutingHelper,
};
