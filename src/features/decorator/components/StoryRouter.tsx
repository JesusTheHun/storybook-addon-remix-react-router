import React, { useCallback, useMemo } from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { useRouteObjectsDecorator } from '../hooks/useRouteObjectsDecorator';

import { injectStory } from '../utils/InjectStory';
import { normalizeHistory } from '../utils/normalizeHistory';
import { normalizeRoutes } from '../utils/normalizeRoutes';
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
    const normalizedRoutes = normalizeRoutes(routing);
    const decoratedRoutes = decorateRouteObjects(normalizedRoutes);
    const injectedRoutes = injectStory(
      decoratedRoutes,
      <RouterLogger>
        <StoryComponent storyContext={storyContext} key={'story'} />
      </RouterLogger>
    );

    const { initialEntries, initialIndex } = normalizeHistory({ navigationHistory, location, routes: injectedRoutes });

    return createMemoryRouter(injectedRoutes, {
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
