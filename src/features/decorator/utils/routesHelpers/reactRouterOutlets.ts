import { RouteObject } from 'react-router';
import { hasOwnProperty, invariant } from '../../../../utils/misc';
import { NonIndexRouteDefinition, NonIndexRouteDefinitionObject, RouteDefinitionObject } from '../../types';

/**
 * Render the story with multiple possible outlets.
 * Use this function when your story component can navigate and you want a different outlet depending on the path.
 * @see withOutlet
 * @see withNestedOutlets
 */
export function reactRouterOutlets(outlets: RouteDefinitionObject[]): [RouteObject];
export function reactRouterOutlets(
  story: Omit<NonIndexRouteDefinitionObject, 'element'>,
  outlets: RouteDefinitionObject[]
): [RouteObject];
export function reactRouterOutlets(
  ...args: [RouteDefinitionObject[]] | [NonIndexRouteDefinition, RouteDefinitionObject[]]
): [RouteObject] {
  const story = (args.length === 1 ? {} : args[0]) as NonIndexRouteDefinitionObject;
  const outlets = args.length === 1 ? args[0] : args[1];

  invariant(
    !hasOwnProperty(story, 'element'),
    'The story definition cannot contain the `element property` because the story element will be used'
  );

  return [
    {
      ...story,
      children: outlets,
    },
  ];
}
