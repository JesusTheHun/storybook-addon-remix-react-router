import React from 'react';

import { Page } from './Page';
import * as HeaderStories from './Header.stories';
import { withRouter } from '../dist/esm'

export default {
  title: 'Example/Page',
  component: Page,
  decorators: [withRouter]
};

const Template = (args) => <Page {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
};
LoggedIn.parameters = {
  reactRouter: {
    routePath: '/',
    routeState: { lastLoginUsername: "xxxx"}
  }
}

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};
