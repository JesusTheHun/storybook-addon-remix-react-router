import { RouteObject } from 'react-router';
import { NonIndexRouteDefinition, NonIndexRouteDefinitionObject, RouteDefinition } from '../../types';
import { castRouteDefinitionObject } from '../castRouteDefinitionObject';

/**
 * Render the story with a single outlet
 * @see withOutlets
 * @see withNestedOutlets
 */
export function reactRouterOutlet(outlet: RouteDefinition): RouteObject[];
export function reactRouterOutlet(story: NonIndexRouteDefinition, outlet: RouteDefinition): RouteObject[];
export function reactRouterOutlet(...args: RouteDefinition[]): RouteObject[] {
  const story = args.length === 1 ? {} : args[1];
  const outlet = args.length === 1 ? args[0] : args[1];

  const storyDefinitionObject = castRouteDefinitionObject(story) as NonIndexRouteDefinitionObject;
  const outletDefinitionObject = castRouteDefinitionObject(outlet);

  return [
    {
      ...storyDefinitionObject,
      children: [outletDefinitionObject],
    },
  ];
}
