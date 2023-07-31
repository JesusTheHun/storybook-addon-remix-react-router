import { castArray } from '../../../utils/misc';
import { ReactRouterAddonStoryParameters } from '../components/ReactRouterDecorator';
import { RouterRoute } from '../types';

export function normalizeRoutes(routing: ReactRouterAddonStoryParameters['routing']): [RouterRoute, ...RouterRoute[]] {
  if (routing === undefined) {
    return [{ path: '/', useStoryElement: true }];
  }

  routing = castArray(routing);

  if (routing.length === 1) {
    routing[0].path ??= '/';
    routing[0].useStoryElement = true;
  }

  return routing;
}
