import { ReactRenderer } from '@storybook/react';
import { Addon_StoryContext } from '@storybook/types';
import React from 'react';
import { useRouteContextMatches } from '../hooks/useRouteContextMatches';
import { LocationParameters, NavigationHistoryEntry, RouterParameters } from '../types';
import { DeepRouteMatchesContext } from './DeepRouteMatches';
import { StoryRouter } from './StoryRouter';

export type ReactRouterDecoratorProps = {
  renderStory: (context: Addon_StoryContext<ReactRenderer>) => ReactRenderer['storyResult'];
  storyContext: Addon_StoryContext<ReactRenderer>;
  parameters: ReactRouterAddonStoryParameters;
};

export type ReactRouterAddonStoryParameters =
  | (RouterParameters & {
      location?: LocationParameters;
      navigationHistory?: never;
    })
  | (RouterParameters & {
      location?: never;
      navigationHistory: [NavigationHistoryEntry, ...NavigationHistoryEntry[]];
    });

export const ReactRouterDecorator: React.FC<ReactRouterDecoratorProps> = ({
  renderStory,
  storyContext,
  parameters,
}) => {
  const deepRouteMatches = useRouteContextMatches();

  return (
    <DeepRouteMatchesContext.Provider value={deepRouteMatches}>
      <StoryRouter renderStory={renderStory} storyContext={storyContext} storyParameters={parameters} />
    </DeepRouteMatchesContext.Provider>
  );
};
