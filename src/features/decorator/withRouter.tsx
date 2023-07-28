import { makeDecorator } from '@storybook/preview-api';
import React from 'react';
import { PARAM_KEY } from '../../constants';
import { ReactRouterDecorator, ReactRouterDecoratorProps } from './components/ReactRouterDecorator';

export const withRouter = makeDecorator({
  name: 'withRouter',
  parameterName: PARAM_KEY,
  wrapper: (getStory, context) => {
    return (
      <ReactRouterDecorator
        getStory={getStory as unknown as ReactRouterDecoratorProps['getStory']}
        storyContext={context as ReactRouterDecoratorProps['storyContext']}
      />
    );
  },
});
