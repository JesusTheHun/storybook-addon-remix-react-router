import React, { useCallback, useMemo } from 'react';
import { RouteObject } from 'react-router';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { useRouteObjectsDecorator } from '../hooks/useRouteObjectsDecorator';

import { injectStory } from '../utils/InjectStory';
import { useNormalizedHistory } from '../hooks/useNormalizedHistory';
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
  const { hydrationData, routing } = storyParameters;

  const { initialEntries, initialIndex } = useNormalizedHistory(storyParameters);
  const decorateRouteObjects = useRouteObjectsDecorator();

  const StoryComponent = useCallback(
    ({ storyContext }: Pick<StoryRouterProps, 'storyContext'>) => renderStory(storyContext),
    [renderStory]
  );

  const memoryRouter = useMemo(() => {
    const normalizedRoutes = normalizeRoutes(routing);
    const decoratedRoutes = decorateRouteObjects(normalizedRoutes);
    const injectedRoutes = injectStory(decoratedRoutes, <StoryComponent storyContext={storyContext} key={'story'} />);

    return createMemoryRouter([{ element: <RouterLogger />, children: injectedRoutes }], {
      initialEntries,
      initialIndex,
      hydrationData,
    });
  }, [StoryComponent, decorateRouteObjects, hydrationData, initialEntries, initialIndex, routing, storyContext]);

  return <RouterProvider router={memoryRouter} fallbackElement={<Fallback />} />;
}

function Fallback() {
  return <p>Performing initial data load</p>;
}
