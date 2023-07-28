import { RouteObject } from 'react-router';
import { NonIndexRouteDefinition, NonIndexRouteDefinitionObject, RouteDefinitionObject } from '../../types';
import { castRouteDefinitionObject } from '../castRouteDefinitionObject';

/**
 * Render the story with multiple possible outlets.
 * Use this function when your story component can navigate and you want a different outlet depending on the path.
 * @see withOutlet
 * @see withNestedOutlets
 */
export function reactRouterOutlets(outlets: RouteDefinitionObject[]): RouteObject[];
export function reactRouterOutlets(story: NonIndexRouteDefinition, outlets: RouteDefinitionObject[]): RouteObject[];
export function reactRouterOutlets(
  ...args: [RouteDefinitionObject[]] | [NonIndexRouteDefinition, RouteDefinitionObject[]]
): RouteObject[] {
  const story = args.length === 1 ? {} : args[1];
  const outlets = args.length === 1 ? args[0] : args[1];

  const storyDefinitionObject = castRouteDefinitionObject(story) as NonIndexRouteDefinitionObject;

  return [
    {
      ...storyDefinitionObject,
      children: outlets,
    },
  ];
}
