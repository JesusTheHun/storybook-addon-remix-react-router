# Storybook Addon React Router v6
Use React Router v6 in your stories.

[![Storybook](https://raw.githubusercontent.com/storybookjs/brand/master/badge/badge-storybook.svg?sanitize=true)](https://storybook.js.org)
![npm](https://img.shields.io/npm/v/storybook-addon-react-router-v6?color=blue)
[![Release](https://github.com/JesusTheHun/storybook-addon-react-router-v6/actions/workflows/release.yml/badge.svg)](https://github.com/JesusTheHun/storybook-addon-react-router-v6/actions/workflows/release.yml)
![GitHub](https://img.shields.io/github/license/JesusTheHun/storybook-addon-react-router-v6)
## Getting Started
Install the package
 ```
 yarn add -D storybook-addon-react-router-v6
 ```
Add it to your storybook configuration:
```js
// .storybook/main.js
module.exports = {
    addons: ["storybook-addon-react-router-v6"],
};
```

## As a component decorator

```tsx
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'User Profile',
  component: UserProfile,
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routePath: '/users/:userId',
      routeParams: { userId: '42' },
    }
  }
};

export const Example = () => <UserProfile />;
```


## Usage at the story level

```tsx
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'User Profile',
  component: UserProfile,
  decorators: [withRouter],
};

export const Example = () => <UserProfile />;
Example.story = {
  parameters: {
    reactRouter: {
      routePath: '/users/:userId',
      routeParams: { userId: '42' },
      searchParams: { tab: 'activityLog' }
    }
  }
};
```
## Define a global default

```ts
// preview.js

export const decorators = [withRouter];

export const parameters = {
  reactRouter: {
    // ...
  }
}
```
