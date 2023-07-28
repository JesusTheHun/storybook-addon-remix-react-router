import { RouteObject } from 'react-router';
import { NonIndexRouteDefinition, NonIndexRouteDefinitionObject, RouteDefinition } from '../../types';
import { castRouteDefinitionObject } from '../castRouteDefinitionObject';

/**
 * Render the story with multiple outlets nested one into the previous.
 * Use this function when your story component renders an outlet that itself can have outlet and so forth.
 * Outlets are nested in a visual/JSX order : the first element of the array will be the root, the last will be
 * the direct parent of the story
 * @see withOutlet
 * @see withOutlets
 */
export function reactRouterNestedOutlets(outlets: [...RouteDefinition[], NonIndexRouteDefinition]): RouteObject[];
export function reactRouterNestedOutlets(
  story: NonIndexRouteDefinition,
  outlets: [...RouteDefinition[], NonIndexRouteDefinition]
): RouteObject[];
export function reactRouterNestedOutlets(
  ...args: [RouteDefinition[]] | [RouteDefinition, RouteDefinition[]]
): RouteObject[] {
  const story = args.length === 1 ? {} : args[1];
  const outlets = args.length === 1 ? args[0] : args[1];

  const storyDefinitionObject = castRouteDefinitionObject(story) as NonIndexRouteDefinitionObject;

  const outletsRoot: RouteObject = {};
  let lastOutlet = outletsRoot;

  outlets.forEach((outlet) => {
    const outletDefinitionObjet = castRouteDefinitionObject(outlet) as NonIndexRouteDefinitionObject;
    lastOutlet.children = [outletDefinitionObjet];
    lastOutlet = outletDefinitionObjet;
  }, outletsRoot);

  return [
    {
      ...storyDefinitionObject,
      children: [outletsRoot],
    },
  ];
}
