import { RouteDefinition, RouterRoute } from '../types';
import { isValidReactNode } from './isValidReactNode';

export function castRouterRoute(definition: RouteDefinition): RouterRoute {
  if (isValidReactNode(definition)) {
    return { element: definition };
  }

  return definition;
}
