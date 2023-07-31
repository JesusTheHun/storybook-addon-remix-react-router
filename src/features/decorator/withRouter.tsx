import { makeDecorator } from '@storybook/preview-api';
import React from 'react';
import { PARAM_KEY } from '../../constants';
import { ReactRouterDecorator, ReactRouterDecoratorProps } from './components/ReactRouterDecorator';
import { castParametersV2 } from './utils/castParametersV2';

export const withRouter = makeDecorator({
  name: 'withRouter',
  parameterName: PARAM_KEY,
  wrapper: (getStory, context, { parameters }) => {
    const v2parameters = castParametersV2(parameters);

    return (
      <ReactRouterDecorator
        renderStory={getStory as unknown as ReactRouterDecoratorProps['renderStory']}
        storyContext={context as ReactRouterDecoratorProps['storyContext']}
        parameters={v2parameters}
      />
    );
  },
});
