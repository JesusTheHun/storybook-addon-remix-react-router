import { generatePath } from '@remix-run/router';
import React, { useState } from 'react';
import { Link, Outlet, useLocation, useMatches, useParams, useSearchParams } from 'react-router';
import { reactRouterOutlet, reactRouterParameters, withRouter } from 'storybook-addon-remix-react-router';

export default {
  title: 'v2/Basics',
  decorators: [withRouter],
};

export const ZeroConfig = {
  render: () => <h1>Hi</h1>,
};

export const PreserveComponentState = {
  render: ({ id }: { id: string }) => {
    const [count, setCount] = useState(0);

    return (
      <div>
        <h1>{id}</h1>
        <button onClick={() => setCount((count) => count + 1)}>Increase</button>
        <div role={'status'}>{count}</div>
      </div>
    );
  },
  args: {
    id: '42',
  },
};

export const LocationPath = {
  render: () => {
    const location = useLocation();
    return <p>{location.pathname}</p>;
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/books',
      },
      routing: { path: '/books' },
    }),
  },
};

export const DefaultLocation = {
  render: () => {
    const location = useLocation();
    return <p>{location.pathname}</p>;
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { bookId: '42' },
      },
      routing: { path: '/books/:bookId' },
    }),
  },
};

export const LocationPathFromFunctionStringResult = {
  render: () => {
    const location = useLocation();
    return <p>{location.pathname}</p>;
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: (inferredPath, pathParams) => {
          return generatePath(inferredPath, pathParams);
        },
        pathParams: { bookId: 777 },
      },
      routing: { path: '/books/:bookId' },
    }),
  },
};

export const LocationPathFromFunctionUndefinedResult = {
  render: () => {
    const location = useLocation();
    return <p>{location.pathname}</p>;
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: () => undefined,
      },
      routing: { path: '/books' },
    }),
  },
};

export const LocationPathBestGuess = {
  render: () => (
    <div>
      <h1>Story</h1>
      The outlet should be shown below.
      <Outlet />
    </div>
  ),
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlet(
        {
          path: 'books',
        },
        {
          path: 'summary',
          element: <h2>I'm the outlet</h2>,
        }
      ),
    }),
  },
};

export const LocationPathParams = {
  render: () => {
    const routeParams = useParams();
    return <p>{JSON.stringify(routeParams)}</p>;
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/book/:bookId',
        pathParams: {
          bookId: '42',
        },
      },
      routing: {
        path: '/book/:bookId',
      },
    }),
  },
};

export const LocationSearchParams = {
  render: () => {
    const [searchParams] = useSearchParams();
    return <p>{JSON.stringify(Object.fromEntries(searchParams.entries()))}</p>;
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        searchParams: { page: '42' },
      },
    }),
  },
};

export const LocationHash = {
  render: () => {
    const location = useLocation();
    return <p>{location.hash}</p>;
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        hash: 'section-title',
      },
    }),
  },
};

export const LocationState = {
  render: () => {
    const location = useLocation();
    return <p>{location.state}</p>;
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        state: 'location state',
      },
    }),
  },
};

export const RouteId = {
  render: () => {
    const matches = useMatches();
    return <p>{JSON.stringify(matches.map((m) => m.id))}</p>;
  },
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        id: 'SomeRouteId',
      },
    }),
  },
};

export const RoutingString = {
  render: () => {
    const location = useLocation();
    return <p>{location.pathname}</p>;
  },
  parameters: {
    reactRouter: reactRouterParameters({
      routing: '/books',
    }),
  },
};

export const RoutingHandles = {
  render: () => {
    const matches = useMatches();
    return <p>{JSON.stringify(matches.map((m) => m.handle))}</p>;
  },
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlet(
        { handle: 'Handle part 1 out of 2' },
        {
          handle: 'Handle part 2 out of 2',
          element: <p>I'm the outlet.</p>,
        }
      ),
    }),
  },
};

export const RoutingOutletJSX = {
  render: () => <Outlet />,
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlet(<h1>I'm an outlet defined by a JSX element</h1>),
    }),
  },
};

export const RoutingOutletConfigObject = {
  render: () => <Outlet />,
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlet({
        element: <h1>I'm an outlet defined with a config object</h1>,
      }),
    }),
  },
};

export const MultipleStoryInjection = {
  render: () => {
    const location = useLocation();
    return (
      <div>
        <p>{location.pathname}</p>
        <Link to={'/login'}>Login</Link> | <Link to={'/signup'}>Sign Up</Link>
      </div>
    );
  },
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/login',
      },
      routing: [
        { path: '/login', useStoryElement: true },
        { path: '/signup', useStoryElement: true },
      ],
    }),
  },
};
