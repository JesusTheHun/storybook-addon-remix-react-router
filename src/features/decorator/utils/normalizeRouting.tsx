import { castArray } from '../../../utils/misc';
import { ReactRouterAddonStoryParameters } from '../components/ReactRouterDecorator';
import { RouterRoute } from '../types';

export function normalizeRouting(routing: ReactRouterAddonStoryParameters['routing']): [RouterRoute, ...RouterRoute[]] {
  if (routing === undefined) {
    return [{ path: '/' }];
  }

  if (typeof routing === 'string') {
    return [{ path: routing }];
  }

  routing = castArray(routing);

  if (routing.length === 1) {
    routing[0].path ??= '/';
  }

  return routing;
}
