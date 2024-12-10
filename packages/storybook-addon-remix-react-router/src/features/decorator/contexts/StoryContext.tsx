import React from 'react';
import { ReactRouterAddonStoryParameters } from '../components/ReactRouterDecorator';

export const StoryContext = React.createContext<
  | {
      renderStory: (context: unknown) => React.ReactElement;
      storyContext: { args: Record<string, unknown> };
      addonParameters: ReactRouterAddonStoryParameters;
    }
  | undefined
>(undefined);
