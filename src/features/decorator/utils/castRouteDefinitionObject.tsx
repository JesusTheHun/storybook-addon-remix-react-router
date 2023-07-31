import React from 'react';
import { RouteDefinitionObject } from '../types';
import { isValidReactNode } from './isValidReactNode';

export function castRouteDefinitionObject<T extends RouteDefinitionObject>(definition: React.ReactElement | T) {
  if (isValidReactNode(definition)) {
    return { element: definition } as T & { lazy?: undefined };
  }

  if (definition.lazy) {
    return definition as T;
  }

  return definition as T & { lazy?: undefined };
}
