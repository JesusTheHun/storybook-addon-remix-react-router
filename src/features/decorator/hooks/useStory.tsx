import React from 'react';
import { StoryContext } from '../contexts/StoryContext';

export const useStory = () => {
  const contextValue = React.useContext(StoryContext);

  if (contextValue === undefined) {
    throw new Error('useStory should be used inside <StoryContext>');
  }

  return contextValue;
};
