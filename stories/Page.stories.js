import React from 'react';

import { Page } from './Page';
import * as HeaderStories from './Header.stories';
import {withRouter} from '../src';

export default {
  title: 'Example/Page',
  component: Page,
  decorators: [withRouter],
};

const Template = (args) => <Page {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};

export const NestedRouteStaticSubpath = Template.bind({});
NestedRouteStaticSubpath.parameters = {
  reactRouter: {
    routePath: '/staticsubpath',
  }
};

export const NestedRouteDynamicSubpath = Template.bind({});
NestedRouteDynamicSubpath.parameters = {
  reactRouter: {
    routePath: '/abcdef',
    searchParams: {
      foo: "bar",
    },
    hash: 'foo',
  }
};

export const WeirdRouteParamValue = Template.bind({});
WeirdRouteParamValue.parameters = {
  reactRouter: {
    routePath: '/:someParam',
    routeParams: {
      someParam: ':someValue',
    }
  }
};
