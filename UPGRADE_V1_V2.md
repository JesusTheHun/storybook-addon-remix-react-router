# Upgrade from v1 to v2

The `v2` makes a clear distinction between routing declaration and the router location.

Here is a simplified view of the two APIs :

```tsx
// v1
type ReactRouterAddonStoryParameters = {
  routeId: string;
  routePath: string;
  routeParams: {};
  routeState: any;
  routeHandle: any;
  searchParams: {};
  outlet: React.ReactNode | OutletProps;
  browserPath: string;
  loader: LoaderFunction;
  action: ActionFunction;
  errorElement: React.ReactNode;
  hydrationData: HydrationState;
  shouldRevalidate: ShouldRevalidateFunction;
};

// v2
type ReactRouterAddonStoryParameters = {
  hydrationData: HydrationState;
  location: {
    path: string | Function;
    pathParams: {};
    searchParams: {};
    hash: string;
    state: any;
  };
  routing: string | RouteObject | RouteObject[]; // <= You can now use react-router native configuration
};
```

Before

```tsx
export const UserProfile = {
  render: <UserProfile />,
  parameters: {
    reactRouter: {
      routePath: '/users/:userId',
      routeParams: { userId: '42' },
    },
  },
};
```

New version, explicit

```tsx
export const UserProfile = {
  render: <UserProfile />,
  parameters: {
    // Note the helper function 👇 that provide auto-completion and type safety
    reactRouter: reactRouterParameters({
      location: {
        path: '/users/:userId',
        pathParams: { userId: 42 },
      },
      routing: [
        {
          path: '/users/:userId',
        },
      ],
    }),
  },
};
```

To limit the verbosity, you can do two things :

1. `routing` : if you only want to set the path of the story you can use a `string`. Also, if you have a single route, you can pass an object instead of an array of object.
2. `location` : you can omit `location.path` if the path you want is the path defined in your `routing`.

New version, using shorthands

```tsx
export const UserProfile = {
  render: <UserProfile />,
  parameters: {
    // Note the helper function 👇 that provide auto-completion and type safety
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { userId: 42 },
      },
      routing: '/users/:userId',
    }),
  },
};
```
