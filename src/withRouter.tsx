import React from 'react';
import { makeDecorator } from '@storybook/preview-api';
import { StoryRouteTree } from './components/StoryRouteTree';
import { PARAM_KEY } from './constants';
import { ReactRouterParameters } from './types/public';

export const withRouter = makeDecorator({
  name: 'withRouter',
  parameterName: PARAM_KEY,
  wrapper: (
    story: (...args: any[]) => unknown,
    context,
    { parameters = {} }: { parameters: ReactRouterParameters }
  ) => {
    return <StoryRouteTree {...parameters}>{story(context) as React.ReactNode}</StoryRouteTree>;
  },
});
