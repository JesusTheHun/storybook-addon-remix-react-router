## V1 Documentation - Legacy

Only supports for Storybook 7

## Getting Started

Install the package

```
yarn add -D storybook-addon-remix-react-router
```

Add it to your storybook configuration:

```js
// .storybook/main.ts
module.exports = {
  addons: ['storybook-addon-remix-react-router'],
};
```

## How to use it as a component decorator

To add the router to all the stories of a component, simply add it to the `decorators` array.

Note that the `parameters.reactRouter` property is optional, by default the router will render the component at `/`.

```tsx
import { withRouter } from 'storybook-addon-remix-react-router';

export default {
  title: 'User Profile',
  component: UserProfile,
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routePath: '/users/:userId',
      routeParams: { userId: '42' },
    },
  },
};

export const Example = () => <UserProfile />;
```

## Usage at the story level

If you want to change the router config just for one story you can do the following :

```tsx
import { withRouter } from 'storybook-addon-remix-react-router';

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
      routeHandle: 'Profile',
      searchParams: { tab: 'activityLog' },
      routeState: { fromPage: 'homePage' },
    },
  },
};
```

## Define a global default

If you want you can wrap all your stories inside a router by adding the decorator in your `preview.js` file.

```ts
// preview.js

export const decorators = [withRouter];

// you can also define global defaults parameters
export const parameters = {
  reactRouter: {
    // ...
  },
};
```

## Data Router

If you use the data routers of `react-router 6.4+`, such as `<BrowserRouter />`, you can use the following properties :

```js
export const Example = () => <Articles />;
Example.story = {
  parameters: {
    reactRouter: {
      routePath: '/articles',
      loader: fetchArticlesFunction,
      action: articlesActionFunction,
      errorElement: <FancyErrorComponent />,
    },
  },
};
```

## Outlet

If your component renders an outlet, you can set the `outlet` property :

```js
export const Example = () => <Articles />;
Example.story = {
  parameters: {
    reactRouter: {
      routePath: '/articles',
      outlet: {
        element: <Article />,
        handle: 'Article',
        path: ':articleId',
        loader: yourLoaderFunction,
        action: yourActionFunction,
        errorElement: <FancyErrorComponent />,
      },
      // Or simply
      outlet: <MostRecentArticles />,
    },
  },
};
```

## Descendant Routes

`<Route>` can be nested to handle layouts & outlets.
But components can also render a `<Routes>` component with its set of `<Route>`, leading to a deep nesting called `Descendant Routes`.
In this case, in order for the whole component tree to render in your story with matching params, you will need to set the `browserPath` property :

```js
export default {
  title: 'Descendant Routes',
  component: SettingsPage, // this component renders a <Routes> with several <Route> with path like `billing` or `privacy`
  decorators: [withRouter],
};

Default.story = {
  parameters: {
    reactRouter: {
      browserPath: '/billing',
    },
  },
};

// If you want to render at a specific path, like `/settings`, React Router requires that you add a trailing wildcard
SpecificPath.story = {
  parameters: {
    reactRouter: {
      routePath: '/settings/*',
      browserPath: '/settings/billing',
    },
  },
};
```

## Dedicated panel

Navigation events, loader and actions are logged, for you to better understand the lifecycle of your components.

![Addon Panel](https://user-images.githubusercontent.com/94478/224843029-b37ff60d-10f8-4198-bbc3-f26e2775437f.png)

## Available Parameters

Every parameter is optional. In most cases they follow the same type used by Route Router itself, sometimes they offer a sugar syntax.

| Parameter        | Type                                                                | Description                                                   |
| ---------------- | ------------------------------------------------------------------- | ------------------------------------------------------------- |
| routePath        | `string`                                                            | i.e: `/users/:userId`                                         |
| routeParams      | `Record<string, string>`                                            | i.e: `{ userId: "777" }`                                      |
| routeState       | `any`                                                               | Available through `useLocation()`                             |
| routeHandle      | `any`                                                               | Available through `useMatches()`                              |
| searchParams     | `string[][] \| Record<string, string> \| string \| URLSearchParams` | Location query string `useSearchParams()`                     |
| outlet           | `React.ReactNode \| OutletProps`                                    | Outlet rendered by the route. See type `OutletProps` below.   |
| browserPath      | `string`                                                            | Useful when you have [descendant routes](#descendant-routes). |
| loader           | `LoaderFunction`                                                    |                                                               |
| action           | `ActionFunction`                                                    |                                                               |
| errorElement     | `React.ReactNode \| null`                                           |                                                               |
| hydrationData    | `HydrationState`                                                    |                                                               |
| shouldRevalidate | `ShouldRevalidateFunction`                                          |                                                               |
| routeId          | `string`                                                            | Available through `useMatches()`                              |

```ts
type OutletProps = {
  element: React.ReactNode;
  path?: string;
  handle?: unknown;
  loader?: LoaderFunction;
  action?: ActionFunction;
  errorElement?: React.ReactNode | null;
};
```

## Compatibility

✅ Storybook 7.0

✅ React 16  
✅ React 17  
✅ React 18

If you face an issue with any version, open an issue.

## Contribution

Contributions are welcome.

Before writing any code, file an issue to showcase the bug or the use case for the feature you want to see in this addon.
