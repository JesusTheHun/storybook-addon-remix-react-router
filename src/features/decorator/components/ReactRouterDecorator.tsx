import { ReactRenderer } from '@storybook/react';
import { Addon_StoryContext } from '@storybook/types';
import React, { useMemo } from 'react';
import { castArray } from '../../../utils/misc';
import { useRouteContextMatches } from '../hooks/useRouteContextMatches';
import { ReactRouterAddonParameters } from '../types';
import { DeepRouteMatchesContext } from './DeepRouteMatches';
import { StoryRouter } from './StoryRouter';

export type ReactRouterDecoratorProps = {
  getStory: (context: Addon_StoryContext<ReactRenderer>) => ReactRenderer['storyResult'];
  storyContext: Addon_StoryContext<ReactRenderer> & {
    parameters: ReactRouterAddonParameters;
  };
};

export const ReactRouterDecorator: React.FC<ReactRouterDecoratorProps> = ({ getStory, storyContext }) => {
  const deepRouteMatches = useRouteContextMatches();

  const routes = useMemo(() => {
    const addonRoutes = storyContext.parameters.routes;
    if (!addonRoutes) {
      return [{ path: '/', useStoryElement: true }];
    }

    return castArray(addonRoutes);
  }, [storyContext.parameters.routes]);

  return (
    <DeepRouteMatchesContext.Provider value={deepRouteMatches}>
      <StoryRouter renderStory={getStory} storyContext={storyContext} routes={routes} />
    </DeepRouteMatchesContext.Provider>
  );
};
