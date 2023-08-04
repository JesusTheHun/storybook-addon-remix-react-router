import React, { useCallback, useMemo } from 'react';
import { RouteObject } from 'react-router';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { useRouteObjectsDecorator } from '../hooks/useRouteObjectsDecorator';

import { injectStory } from '../utils/InjectStory';
import { normalizeHistory } from '../utils/normalizeHistory';
import { normalizeRouting } from '../utils/normalizeRouting';
import { ReactRouterAddonStoryParameters, ReactRouterDecoratorProps } from './ReactRouterDecorator';
import { RouterLogger } from './RouterLogger';

export type StoryRouterProps = {
  renderStory: ReactRouterDecoratorProps['renderStory'];
  storyContext: ReactRouterDecoratorProps['storyContext'];
  storyParameters: ReactRouterAddonStoryParameters;
};

export function StoryRouter(props: StoryRouterProps) {
  const { renderStory, storyContext, storyParameters = {} } = props;
  const { hydrationData, routing, navigationHistory, location } = storyParameters;

  const decorateRouteObjects = useRouteObjectsDecorator();

  const StoryComponent = useCallback(
    ({ storyContext }: Pick<StoryRouterProps, 'storyContext'>) => renderStory(storyContext),
    [renderStory]
  );

  const memoryRouter = useMemo(() => {
    const normalizedRoutes = normalizeRouting(routing);
    const decoratedRoutes = decorateRouteObjects(normalizedRoutes);
    const injectedRoutes = injectStory(
      decoratedRoutes,
      <RouterLogger>
        <StoryComponent storyContext={storyContext} />
      </RouterLogger>
    );

    const { initialEntries, initialIndex } = normalizeHistory({ navigationHistory, location, routes: injectedRoutes });

    return createMemoryRouter(injectedRoutes as RouteObject[], {
      initialEntries,
      initialIndex,
      hydrationData,
    });
  }, [StoryComponent, decorateRouteObjects, hydrationData, location, navigationHistory, routing, storyContext]);

  return <RouterProvider router={memoryRouter} fallbackElement={<Fallback />} />;
}

function Fallback() {
  return <p>Performing initial data load</p>;
}
