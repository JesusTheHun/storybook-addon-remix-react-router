import { RouteObject } from 'react-router';
import { hasOwnProperty, invariant } from '../../../../utils/misc';
import { NonIndexRouteDefinitionObject, RouteDefinition } from '../../types';
import { castRouteDefinitionObject } from '../castRouteDefinitionObject';

/**
 * Render the story with a single outlet
 * @see withOutlets
 * @see withNestedOutlets
 */
export function reactRouterOutlet(outlet: RouteDefinition): [RouteObject];
export function reactRouterOutlet(
  story: Omit<NonIndexRouteDefinitionObject, 'element'>,
  outlet: RouteDefinition
): [RouteObject];
export function reactRouterOutlet(...args: RouteDefinition[]): [RouteObject] {
  const story = (args.length === 1 ? {} : args[0]) as NonIndexRouteDefinitionObject;
  const outlet = args.length === 1 ? args[0] : args[1];

  invariant(
    !hasOwnProperty(story, 'element'),
    'The story definition cannot contain the `element property` because the story element will be used'
  );

  const outletDefinitionObject = castRouteDefinitionObject(outlet);
  outletDefinitionObject.index = true;

  return [
    {
      ...story,
      children: [outletDefinitionObject],
    },
  ];
}
