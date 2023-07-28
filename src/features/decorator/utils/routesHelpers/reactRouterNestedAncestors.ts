import { RouteObject } from 'react-router';
import { castArray } from '../../../../utils/misc';
import { NonIndexRouteDefinition, NonIndexRouteDefinitionObject, RouteDefinition } from '../../types';
import { castRouteDefinitionObject } from '../castRouteDefinitionObject';

/**
 * Render the story as the outlet of an ancestor.
 * You can specify multiple ancestors to create a deep nesting.
 * Outlets are nested in a visual/JSX order : the first element of the array will be the root, the last will be
 * the direct parent of the story
 */
export function reactRouterNestedAncestors(
  ancestors: NonIndexRouteDefinition | NonIndexRouteDefinition[]
): RouteObject[];
export function reactRouterNestedAncestors(
  story: RouteDefinition,
  ancestors: NonIndexRouteDefinition | NonIndexRouteDefinition[]
): RouteObject[];
export function reactRouterNestedAncestors(
  ...args:
    | [NonIndexRouteDefinition | NonIndexRouteDefinition[]]
    | [RouteDefinition, NonIndexRouteDefinition | NonIndexRouteDefinition[]]
): RouteObject[] {
  const story = args.length === 1 ? {} : args[0];
  const ancestors = castArray(args.length === 1 ? args[0] : args[1]);

  const storyDefinitionObject = castRouteDefinitionObject(story);

  const ancestorsRoot: RouteObject = {};
  let lastAncestor = ancestorsRoot;

  ancestors.forEach((ancestor) => {
    const ancestorDefinitionObjet = castRouteDefinitionObject(ancestor) as NonIndexRouteDefinitionObject;
    lastAncestor.children = [ancestorDefinitionObjet];
    lastAncestor = ancestorDefinitionObjet;
  }, ancestorsRoot);

  lastAncestor.children = [storyDefinitionObject];

  return [ancestorsRoot];
}
