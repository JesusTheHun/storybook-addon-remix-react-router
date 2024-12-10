import { hasOwnProperty, invariant } from '../../../../utils/misc';
import { NonIndexRouteDefinitionObject, RouteDefinitionObject, RouterRoute } from '../../types';
import { optionalStoryArg } from '../optionalStoryArg';

/**
 * Render the story with multiple possible outlets.
 * Use this function when your story component can navigate and you want a different outlet depending on the path.
 * @see withOutlet
 * @see withNestedOutlets
 */
export function reactRouterOutlets(outlets: RouteDefinitionObject[]): [RouterRoute];
export function reactRouterOutlets(
  story: string | Omit<NonIndexRouteDefinitionObject, 'element'>,
  outlets: RouteDefinitionObject[]
): [RouterRoute];
export function reactRouterOutlets(
  ...args:
    | [RouteDefinitionObject[]]
    | [string | Omit<NonIndexRouteDefinitionObject, 'element'>, RouteDefinitionObject[]]
): [RouterRoute] {
  const [story, outlets] = optionalStoryArg(args);

  invariant(
    !hasOwnProperty(story, 'element'),
    'The story definition cannot contain the `element` property because the story element will be used'
  );

  return [
    {
      ...story,
      useStoryElement: true,
      children: outlets,
    },
  ];
}
