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

    // React Router v8 always uses partial hydration and renders the route-level
    // `HydrateFallback` during the initial data load — the `future` and
    // `fallbackElement` props on `RouterProvider` were removed. Attach the
    // configured fallback to the root route(s) so it keeps working on v7 and v8.
    const fallbackElement = fallback ?? <Fallback />;
    const routesWithFallback = injectedRoutes.map((route) => ({ hydrateFallbackElement: fallbackElement, ...route }));

    const { initialEntries, initialIndex } = normalizeHistory({ navigationHistory, location, routes: injectedRoutes });

    const resolvedOptions: Parameters<typeof createMemoryRouter>[1] = {
      initialEntries,
      initialIndex,
      hydrationData,
    };

    if (future) {
      resolvedOptions.future = future;
    }

    return createMemoryRouter(routesWithFallback as RouteObject[], resolvedOptions);
  }, [decorateRouteObjects, hydrationData, location, navigationHistory, routing, future, fallback]);

  return <RouterProvider router={memoryRouter} />;
}

function Fallback() {
  return <p>Performing initial data load</p>;
}
