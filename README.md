# Storybook Addon Remix React Router

[![Storybook](https://raw.githubusercontent.com/storybookjs/brand/master/badge/badge-storybook.svg?sanitize=true)](https://storybook.js.org)
[![npm](https://img.shields.io/npm/v/storybook-addon-remix-react-router?color=blue)](https://www.npmjs.com/package/storybook-addon-remix-react-router)
[![Release](https://github.com/JesusTheHun/storybook-addon-remix-react-router/actions/workflows/release.yml/badge.svg)](https://github.com/JesusTheHun/storybook-addon-remix-react-router/actions/workflows/release.yml)
![npm](https://img.shields.io/npm/dm/storybook-addon-remix-react-router)

> Use Remix React Router in your stories.

✨Notice ✨  
The package has been renamed `storybook-addon-remix-react-router`.  
The repository has also been renamed, so you are on the right page.  
The migration is mandatory to support Storybook 8.

## Recent changes

✅ Support for React Router v7 with `storybook-addon-remix-react-router@4`.  
✅ Support for Storybook 8 with `storybook-addon-remix-react-router@3`.  
✅ You can now use `useStoryElement` to inject the story at multiple points.

## Getting Started

Install the package

```
npm i -D storybook-addon-remix-react-router
```

Add it to your storybook configuration:

```js
// .storybook/main.ts

export default {
  addons: ['storybook-addon-remix-react-router'],
} satisfies StorybookConfig;
```

## Decorate all stories of a component

To add the router to all the stories of a component, simply add it to the `decorators` array.

Note that `parameters.reactRouter` is optional, by default the router will render the component at `/`.

```tsx
import { withRouter, reactRouterParameters } from 'storybook-addon-remix-react-router';

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
import { withRouter, reactRouterParameters } from 'storybook-addon-remix-react-router';

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
To make your life easier, `storybook-addon-remix-react-router` comes with some routing helpers :

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
import { RoutingHelper } from 'storybook-addon-remix-react-router';

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

This package aims to support `Storybook > 7` and `React > 16`.  
Here is a compatibility table :

| Addon | React                   | Storybook | React Router     |
| ----- | ----------------------- | --------- | ---------------- |
| 4.x   | &gt;= 16.8.0            | 8.x       | 7.x              |
| 3.x   | &gt;= 16.8.0            | 8.x       | 6.x <sup>1</sup> |
| 2.x   | &gt;= v16.8.0 < v19.0.0 | 7.x       | 6.x              |
| 1.x   | &gt;= v16.8.0 < v19.0.0 | 7.x       | 6.x              |

<sup>1</sup> You can actually use react-router v7 if you import from `react-router-dom` and not `react-router`.

If you have an issue with any version, open an issue.

## Contribution

Contributions are welcome.

Before writing any code, file an issue to showcase the bug or the use case for the feature you want to see in this addon.

## License

This package is released under the Apache 2.0 license.
