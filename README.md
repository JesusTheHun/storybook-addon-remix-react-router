# Storybook Addon React Router v6

[![Storybook](https://raw.githubusercontent.com/storybookjs/brand/master/badge/badge-storybook.svg?sanitize=true)](https://storybook.js.org)
[![npm](https://img.shields.io/npm/v/storybook-addon-react-router-v6?color=blue)](https://www.npmjs.com/package/storybook-addon-react-router-v6)
[![Release](https://github.com/JesusTheHun/storybook-addon-react-router-v6/actions/workflows/release.yml/badge.svg)](https://github.com/JesusTheHun/storybook-addon-react-router-v6/actions/workflows/release.yml)
![npm](https://img.shields.io/npm/dm/storybook-addon-react-router-v6)

> Use React Router v6 in your stories.

This is the documentation for version `2.x`. If you are still using version `1.x`, visit [v1 documentation](DOCUMENTATION_V1.md).

## Recent changes

✅The `routing` parameter now accept a string, that will be used both as the route path and the location pathname.

## Getting Started

Install the package

```
yarn add -D storybook-addon-react-router-v6
```

Add it to your storybook configuration:

```js
// .storybook/main.ts

export default {
  addons: ['storybook-addon-react-router-v6'],
} satisfies StorybookConfig;
```

## Decorate all stories of a component

To add the router to all the stories of a component, simply add it to the `decorators` array.

Note that `parameters.reactRouter` is optional, by default the router will render the component at `/`.

```tsx
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'User Profile',
  render: () => <UserProfile />,
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { userId: '42' },
      },
      routing: { path: '/users/:userId' },
    }),
  },
};
```

## Decorate a specific story

To change the config for a single story, you can do the following :

```tsx
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'User Profile',
  render: () => <UserProfile />,
  decorators: [withRouter],
};

export const FromHomePage = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { userId: '42' },
        searchParams: { tab: 'activityLog' },
        state: { fromPage: 'homePage' },
      },
      routing: {
        path: '/users/:userId',
        handle: 'Profile',
      },
    }),
  },
};
```

## Decorate all stories, globally

To wrap all your project's stories inside a router by adding the decorator in your `preview.js` file.

```ts
// .storybook/preview.js

export default {
  decorators: [withRouter],
  parameters: {
    reactRouter: reactRouterParameters({ ... }),
  }
} satisfies Preview;
```

## Location

To specify anything related to the browser location, use the `location` property.

```tsx
type LocationParameters = {
  path?: string | ((inferredPath: string, pathParams: Record<string, string>) => string | undefined);
  pathParams?: PathParams;
  searchParams?: ConstructorParameters<typeof URLSearchParams>[0];
  hash?: string;
  state?: unknown;
};
```

### Inferred path

If `location.path` is not provided, the browser pathname will be generated using the joined `path`s from the `routing` property and the `pathParams`.

### Path as a function

You can provide a function to `path`.  
It will receive the joined `path`s from the routing property and the `pathParams` as parameters.  
If the function returns a `string`, is will be used _as is_. It's up to you to call `generatePath` from `react-router` if you need to.  
If the function returns `undefined`, it will fallback to the default behavior, just like if you didn't provide any value for `location.path`.

## Routing

You can set `routing` to anything accepted by `createBrowserRouter`.  
To make your life easier, `storybook-addon-react-router-v6` comes with some routing helpers :

```tsx
export const MyStory = {
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlet(<MyOutlet />),
    }),
  },
};
```

### Routing Helpers

The following helpers are available out of the box :

```ts
reactRouterOutlet(); // Render a single outlet
reactRouterOutlets(); // Render multiple outlets
reactRouterNestedOutlets(); // Render multiple outlets nested one into another
reactRouterNestedAncestors(); // Render the story as an outlet of nested outlets
```

You can also create your own helper and use the exported type `RoutingHelper` to assist you :

```ts
import { RoutingHelper } from 'storybook-addon-react-router-v6';

const myCustomHelper: RoutingHelper = () => {
  // Routing creation logic
};
```

`RouterRoute` is basically the native `RouteObject` from `react-router`; augmented with `{ useStoryElement?: boolean }`.
If you want to accept a JSX and turn it into a `RouterRoute`, you can use the exported function `castRouterRoute`.

### Use the story as the route element

Just set `{ useStoryElement: true }` in the routing config object.

## Dedicated panel

Navigation events, loader and actions are logged, for you to better understand the lifecycle of your components.

![Addon Panel](https://user-images.githubusercontent.com/94478/224843029-b37ff60d-10f8-4198-bbc3-f26e2775437f.png)

## Compatibility

Version `6.4+` of `react-router` is required.
This package aims to support `Storybook > 7` and `React > 16`.

✅ Storybook 7.0

✅ React 16  
✅ React 17  
✅ React 18

If you have an issue with any version, open an issue.

## Contribution

Contributions are welcome.

Before writing any code, file an issue to showcase the bug or the use case for the feature you want to see in this addon.
