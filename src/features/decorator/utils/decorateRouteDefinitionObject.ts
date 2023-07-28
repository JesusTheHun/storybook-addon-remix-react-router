import { RouteDefinitionObject } from '../types';
import { decorateActionFunction } from './decorateActionFunction';
import { decorateLoaderFunction } from './decorateLoaderFunction';

export function decorateRouteObjectDefinition(routeDefinition: RouteDefinitionObject): RouteDefinitionObject {
  const { action, loader } = routeDefinition;
  const augmentedRouteDefinition = { ...routeDefinition };

  if (action) {
    augmentedRouteDefinition.action = decorateActionFunction(action);
  }

  if (loader) {
    augmentedRouteDefinition.loader = decorateLoaderFunction(loader);
  }

  return augmentedRouteDefinition;
}
