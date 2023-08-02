import { hasOwnProperty, invariant } from '../../../../utils/misc';
import { NonIndexRouteDefinitionObject, RouteDefinition, RouterRoute } from '../../types';
import { castRouterRoute } from '../castRouterRoute';

/**
 * Render the story with a single outlet
 * @see withOutlets
 * @see withNestedOutlets
 */
export function reactRouterOutlet(outlet: RouteDefinition): [RouterRoute];
export function reactRouterOutlet(
  story: Omit<NonIndexRouteDefinitionObject, 'element'>,
  outlet: RouteDefinition
): [RouterRoute];
export function reactRouterOutlet(...args: RouteDefinition[]): [RouterRoute] {
  const story = (args.length === 1 ? {} : args[0]) as NonIndexRouteDefinitionObject;
  const outlet = args.length === 1 ? args[0] : args[1];

  invariant(
    !hasOwnProperty(story, 'element'),
    'The story definition cannot contain the `element` property because the story element will be used'
  );

  const outletDefinitionObject = castRouterRoute(outlet);
  outletDefinitionObject.index = true;

  return [
    {
      ...story,
      useStoryElement: true,
      children: [outletDefinitionObject],
    },
  ];
}
