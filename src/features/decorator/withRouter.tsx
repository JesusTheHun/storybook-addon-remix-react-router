import { makeDecorator } from '@storybook/preview-api';
import React from 'react';
import { PARAM_KEY } from '../../constants';
import { ReactRouterDecorator, ReactRouterDecoratorProps } from './components/ReactRouterDecorator';

export const withRouter = makeDecorator({
  name: 'withRouter',
  parameterName: PARAM_KEY,
  wrapper: (getStory, context, { parameters }) => {
    return (
      <ReactRouterDecorator
        renderStory={getStory as unknown as ReactRouterDecoratorProps['renderStory']}
        storyContext={context as ReactRouterDecoratorProps['storyContext']}
        parameters={parameters}
      />
    );
  },
});
