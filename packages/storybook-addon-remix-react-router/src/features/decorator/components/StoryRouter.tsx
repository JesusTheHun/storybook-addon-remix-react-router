import React, { useMemo } from 'react';
import { createMemoryRouter, RouterProvider, RouteObject } from 'react-router';
import { useRouteObjectsDecorator } from '../hooks/useRouteObjectsDecorator';
import { useStory } from '../hooks/useStory';

import { injectStory } from '../utils/injectStory';
import { normalizeHistory } from '../utils/normalizeHistory';
import { normalizeRouting } from '../utils/normalizeRouting';
import { RouterLogger } from './RouterLogger';

export function StoryRouter() {
  const { addonParameters = {} } = useStory();
  const { hydrationData, routing, navigationHistory, location, future, fallback } = addonParameters;

  const decorateRouteObjects = useRouteObjectsDecorator();

  const memoryRouter = useMemo(() => {
    const normalizedRoutes = normalizeRouting(routing);
    const decoratedRoutes = decorateRouteObjects(normalizedRoutes);
    const injectedRoutes = injectStory(decoratedRoutes, <RouterLogger />);

    const { initialEntries, initialIndex } = normalizeHistory({ navigationHistory, location, routes: injectedRoutes });

    const resolvedOptions: Parameters<typeof createMemoryRouter>[1] = {
      initialEntries,
      initialIndex,
      hydrationData,
    };

    if (future) {
      resolvedOptions.future = future;
    }

    return createMemoryRouter(injectedRoutes as RouteObject[], resolvedOptions);
  }, [decorateRouteObjects, hydrationData, location, navigationHistory, routing, future]);

  const expandProps: Record<string, unknown> = {};
  const fallbackElement = fallback ?? <Fallback />;

  if (future) {
    expandProps.future = future;
  }

  if (future?.v7_partialHydration === true) {
    expandProps.HydrateFallback = fallbackElement;
  }

  if (future?.v7_partialHydration === false) {
    expandProps.fallbackElement = fallbackElement;
  }

  return <RouterProvider router={memoryRouter} {...expandProps} />;
}

function Fallback() {
  return <p>Performing initial data load</p>;
}
