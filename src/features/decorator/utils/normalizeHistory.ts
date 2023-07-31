import { generatePath, InitialEntry } from '@remix-run/router';
import { RouteObject } from 'react-router';
import { ReactRouterAddonStoryParameters } from '../components/ReactRouterDecorator';
import { RouterRoute } from '../types';

export type NormalizedHistoryParameters = Pick<ReactRouterAddonStoryParameters, 'navigationHistory' | 'location'> & {
  routes: RouterRoute[];
};

export function normalizeHistory({ navigationHistory, location, routes }: NormalizedHistoryParameters) {
  if (navigationHistory !== undefined) {
    const initialEntries: InitialEntry[] = [];
    let initialIndex;
    const compactNavigationHistory = Object.values(navigationHistory);

    for (let i = 0; i < compactNavigationHistory.length; i++) {
      const { path: userPath, pathParams, searchParams, hash, state, isInitialLocation } = compactNavigationHistory[i];
      if (isInitialLocation) initialIndex = i;

      const inferredPath = inferLocationPathFromRoutes(routes);
      const computedPath = typeof userPath === 'function' ? userPath(inferredPath, pathParams ?? {}) : userPath;
      const path = computedPath ?? inferredPath;

      initialEntries.push({
        pathname: generatePath(path ?? '/', pathParams),
        search: new URLSearchParams(searchParams).toString(),
        hash,
        state,
      });
    }

    initialIndex ??= initialEntries.length - 1;

    return {
      initialEntries,
      initialIndex,
    };
  }

  const { path: userPath, pathParams, searchParams, hash, state } = location ?? {};

  const inferredPath = inferLocationPathFromRoutes(routes);
  const computedPath = typeof userPath === 'function' ? userPath(inferredPath, pathParams ?? {}) : userPath;
  const path = computedPath ?? inferredPath;

  const initialIndex = 0;
  const initialEntries: InitialEntry[] = [
    {
      pathname: generatePath(path, pathParams),
      search: new URLSearchParams(searchParams).toString(),
      hash,
      state,
    },
  ];

  return {
    initialEntries,
    initialIndex,
  };
}

export function inferLocationPathFromRoutes(routes: RouteObject[] = [], basePath = '/'): string {
  if (routes.length !== 1) return basePath;

  const obviousRoute = routes[0];
  const pathToObviousRoute = appendPathSegment(basePath, obviousRoute.path);

  if (obviousRoute.children === undefined || obviousRoute.children.length === 0) return pathToObviousRoute;

  return inferLocationPathFromRoutes(obviousRoute.children, pathToObviousRoute);
}

export function appendPathSegment(basePath: string, pathSegment = '') {
  const blankValues = ['', '/'];
  const basePathParts = basePath.split('/').filter((s) => !blankValues.includes(s));
  const pathSegmentParts = pathSegment.split('/').filter((s) => !blankValues.includes(s));

  const parts = [...basePathParts, ...pathSegmentParts];

  return '/' + parts.join('/');
}
