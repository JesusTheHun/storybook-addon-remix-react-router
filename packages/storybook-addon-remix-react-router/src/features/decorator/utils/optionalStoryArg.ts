import { NonIndexRouteDefinitionObject, RouterRoute } from '../types';
import { castRouterRoute } from './castRouterRoute';

export type StoryRouteDefinition = string | Omit<NonIndexRouteDefinitionObject, 'element'>;

export function optionalStoryArg<RestType>(args: [RestType] | [StoryRouteDefinition, RestType]) {
  let story: RouterRoute = {};
  let rest: unknown = [];

  if (args.length === 1) {
    story = {};
    rest = args[0] as RestType;
  }

  if (args.length === 2) {
    story = typeof args[0] === 'string' ? { path: args[0] } : castRouterRoute(args[0]);
    rest = args[1] as RestType;
  }

  return [story, rest] as [RouterRoute, RestType];
}
