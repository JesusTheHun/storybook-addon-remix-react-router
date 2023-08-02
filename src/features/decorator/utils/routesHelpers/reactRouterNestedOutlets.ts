import { RouteObject } from 'react-router';
import { hasOwnProperty, invariant } from '../../../../utils/misc';
import { NonIndexRouteDefinition, NonIndexRouteDefinitionObject, RouteDefinition, RouterRoute } from '../../types';
import { castRouterRoute } from '../castRouterRoute';

/**
 * Render the story with multiple outlets nested one into the previous.
 * Use this function when your story component renders an outlet that itself can have outlet and so forth.
 * Outlets are nested in a visual/JSX order : the first element of the array will be the root, the last will be
 * the direct parent of the story
 * @see withOutlet
 * @see withOutlets
 */
export function reactRouterNestedOutlets(outlets: [...RouteDefinition[], NonIndexRouteDefinition]): [RouterRoute];
export function reactRouterNestedOutlets(
  story: Omit<NonIndexRouteDefinitionObject, 'element'>,
  outlets: [...RouteDefinition[], NonIndexRouteDefinition]
): [RouterRoute];
export function reactRouterNestedOutlets(
  ...args: [RouteDefinition[]] | [Omit<NonIndexRouteDefinitionObject, 'element'>, RouteDefinition[]]
): [RouterRoute] {
  const story = (args.length === 1 ? {} : args[0]) as NonIndexRouteDefinitionObject;
  const outlets = args.length === 1 ? args[0] : args[1];

  invariant(
    !hasOwnProperty(story, 'element'),
    'The story definition cannot contain the `element` property because the story element will be used'
  );

  const outletsRoot: RouteObject = {};
  let lastOutlet = outletsRoot;

  outlets.forEach((outlet) => {
    const outletDefinitionObjet = castRouterRoute(outlet) as NonIndexRouteDefinitionObject;
    outletDefinitionObjet.path ??= '';
    lastOutlet.children = [outletDefinitionObjet];
    lastOutlet = outletDefinitionObjet;
  }, outletsRoot);

  return [
    {
      ...story,
      useStoryElement: true,
      children: [outletsRoot],
    },
  ];
}
