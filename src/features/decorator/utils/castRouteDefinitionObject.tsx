import { RouteDefinition, RouteDefinitionObject } from '../types';
import { isValidReactNode } from './isValidReactNode';

export function castRouteDefinitionObject(definition: RouteDefinition): RouteDefinitionObject {
  if (isValidReactNode(definition)) {
    return { element: definition };
  }

  return definition;
}
