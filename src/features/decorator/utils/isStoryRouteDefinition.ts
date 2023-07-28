import React from 'react';
import { RouteDefinition } from '../types';

export function isStoryRouteDefinition(definition: RouteDefinition) {
  if (React.isValidElement(definition)) return false;
  return definition.useStoryElement === true;
}
