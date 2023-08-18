import React from 'react';
import { DeepRouteMatchesContext } from '../contexts/DeepRouteMatchesContext';
import { StoryContext } from '../contexts/StoryContext';
import { useRouteContextMatches } from '../hooks/useRouteContextMatches';
import { LocationParameters, NavigationHistoryEntry, RouterParameters } from '../types';
import { StoryRouter } from './StoryRouter';

export type ReactRouterDecoratorProps = {
  renderStory: (context: unknown) => React.ReactElement;
  storyContext: { args: Record<string, unknown> };
  addonParameters: ReactRouterAddonStoryParameters;
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
  addonParameters,
}) => {
  const deepRouteMatches = useRouteContextMatches();

  return (
    <StoryContext.Provider value={{ renderStory, storyContext, addonParameters }}>
      <DeepRouteMatchesContext.Provider value={deepRouteMatches}>
        <StoryRouter />
      </DeepRouteMatchesContext.Provider>
    </StoryContext.Provider>
  );
};
