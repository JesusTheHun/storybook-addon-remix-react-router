# Storybook Addon React Router v6
Use React Router v6 in your stories.

## Install
 ```
 yarn add -D storybook-addon-react-router-v6
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
