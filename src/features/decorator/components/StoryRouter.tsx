import React, { useMemo } from 'react';
import { createMemoryRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { useRouteObjectsDecorator } from '../hooks/useRouteObjectsDecorator';
import { useStory } from '../hooks/useStory';

import { injectStory } from '../utils/injectStory';
import { normalizeHistory } from '../utils/normalizeHistory';
import { normalizeRouting } from '../utils/normalizeRouting';
import { RouterLogger } from './RouterLogger';

export function StoryRouter() {
  const { addonParameters = {} } = useStory();
  const { hydrationData, routing, navigationHistory, location, future } = addonParameters;

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

    return createMemoryRouter(injectedRoutes as RouteObject[], {
      initialEntries,
      initialIndex,
      future,
      hydrationData,
    });
  }, [decorateRouteObjects, hydrationData, location, navigationHistory, routing, future]);

  return <RouterProvider router={memoryRouter} fallbackElement={<Fallback />} />;
}

function Fallback() {
  return <p>Performing initial data load</p>;
}
