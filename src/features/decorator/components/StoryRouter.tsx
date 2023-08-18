import React, { useCallback, useMemo } from 'react';
import { RouteObject } from 'react-router';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { useRouteObjectsDecorator } from '../hooks/useRouteObjectsDecorator';
import { useStory } from '../hooks/useStory';

import { injectStory } from '../utils/InjectStory';
import { normalizeHistory } from '../utils/normalizeHistory';
import { normalizeRouting } from '../utils/normalizeRouting';
import { RouterLogger } from './RouterLogger';

export function StoryRouter() {
  const { addonParameters = {} } = useStory();
  const { hydrationData, routing, navigationHistory, location } = addonParameters;

  const decorateRouteObjects = useRouteObjectsDecorator();

  const memoryRouter = useMemo(() => {
    const normalizedRoutes = normalizeRouting(routing);
    const decoratedRoutes = decorateRouteObjects(normalizedRoutes);
    const injectedRoutes = injectStory(decoratedRoutes, <RouterLogger />);

    const { initialEntries, initialIndex } = normalizeHistory({ navigationHistory, location, routes: injectedRoutes });

    return createMemoryRouter(injectedRoutes as RouteObject[], {
      initialEntries,
      initialIndex,
      hydrationData,
    });
  }, [decorateRouteObjects, hydrationData, location, navigationHistory, routing]);

  return <RouterProvider router={memoryRouter} fallbackElement={<Fallback />} />;
}

function Fallback() {
  return <p>Performing initial data load</p>;
}
