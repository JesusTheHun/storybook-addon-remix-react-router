import { hasOwnProperty, invariant } from '../../../../utils/misc';
import { RouteDefinition, RouterRoute } from '../../types';
import { castRouterRoute } from '../castRouterRoute';
import { optionalStoryArg, StoryRouteDefinition } from '../optionalStoryArg';

/**
 * Render the story with a single outlet
 * @see withOutlets
 * @see withNestedOutlets
 */
export function reactRouterOutlet(outlet: RouteDefinition): [RouterRoute];
export function reactRouterOutlet(story: StoryRouteDefinition, outlet: RouteDefinition): [RouterRoute];
export function reactRouterOutlet(...args: [RouteDefinition] | [StoryRouteDefinition, RouteDefinition]): [RouterRoute] {
  const [story, outlet] = optionalStoryArg(args);

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
