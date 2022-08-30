import React from 'react';

import { Header } from './Header';
import {withRouter} from '../src';

export default {
  title: 'Example/Header',
  component: Header,
  decorators: [withRouter]
};

const Template = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
