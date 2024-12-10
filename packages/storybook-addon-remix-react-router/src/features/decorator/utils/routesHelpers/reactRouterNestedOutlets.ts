import { RouteObject } from 'react-router';
import { hasOwnProperty, invariant } from '../../../../utils/misc';
import { NonIndexRouteDefinition, NonIndexRouteDefinitionObject, RouteDefinition, RouterRoute } from '../../types';
import { castRouterRoute } from '../castRouterRoute';
import { optionalStoryArg, StoryRouteDefinition } from '../optionalStoryArg';

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
  story: StoryRouteDefinition,
  outlets: [...RouteDefinition[], NonIndexRouteDefinition]
): [RouterRoute];
export function reactRouterNestedOutlets(
  ...args: [RouteDefinition[]] | [StoryRouteDefinition, RouteDefinition[]]
): [RouterRoute] {
  const [story, outlets] = optionalStoryArg(args);

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
