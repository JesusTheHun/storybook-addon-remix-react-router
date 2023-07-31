import { generatePath, InitialEntry } from '@remix-run/router';
import { useMemo } from 'react';
import { hasOwnProperty } from '../../../utils/misc';
import { ReactRouterAddonStoryParameters } from '../components/ReactRouterDecorator';

export function useNormalizedHistory({ navigationHistory, location }: ReactRouterAddonStoryParameters): {
  initialEntries: InitialEntry[];
  initialIndex: number;
} {
  return useMemo(() => {
    if (navigationHistory !== undefined) {
      const initialEntries: InitialEntry[] = [];
      let initialIndex;
      const compactNavigationHistory = Object.values(navigationHistory);

      for (let i = 0; i < compactNavigationHistory.length; i++) {
        const { path, pathParams, searchParams, hash, state, isInitialLocation } = compactNavigationHistory[i];
        if (isInitialLocation) initialIndex = i;

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

    const { path, pathParams, searchParams, hash, state } = location ?? {};

    const initialIndex = 0;
    const initialEntries: InitialEntry[] = [
      {
        pathname: generatePath(path ?? '/', pathParams),
        search: new URLSearchParams(searchParams).toString(),
        hash,
        state,
      },
    ];

    return {
      initialEntries,
      initialIndex,
    };
  }, [navigationHistory, location]);
}
