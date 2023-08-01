import { generatePath } from '@remix-run/router';
import React, { useState } from 'react';
import { Link, Outlet, useLocation, useMatches, useParams, useSearchParams } from 'react-router-dom';
import { reactRouterNestedAncestors } from '../../features/decorator/utils/routesHelpers/reactRouterNestedAncestors';
import { reactRouterNestedOutlets } from '../../features/decorator/utils/routesHelpers/reactRouterNestedOutlets';
import { reactRouterOutlet } from '../../features/decorator/utils/routesHelpers/reactRouterOutlet';
import { reactRouterOutlets } from '../../features/decorator/utils/routesHelpers/reactRouterOutlets';
import { reactRouterParameters } from '../../features/decorator/utils/routesHelpers/reactRouterParameters';
import { withRouter } from '../../features/decorator/withRouter';

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

export const RoutingOutlets = {
  render: () => {
    const location = useLocation();
    return (
      <section>
        <h1>Story</h1>
        <h2>Current URL : {location.pathname}</h2>

        <p>Go to :</p>
        <ul>
          <li>
            <Link to={'/'}>Index</Link>
          </li>
          <li>
            <Link to={'one'}>One</Link>
          </li>
          <li>
            <Link to={'two'}>Two</Link>
          </li>
        </ul>
        <Outlet />
      </section>
    );
  },
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlets([
        {
          path: '',
          element: <p>Outlet Index</p>,
        },
        {
          path: 'one',
          element: <p>Outlet One</p>,
        },
        {
          path: 'two',
          element: <p>Outlet Two</p>,
        },
      ]),
    }),
  },
};

export const RoutingNestedOutlets = {
  render: () => (
    <section>
      <h1>Story</h1>
      <Outlet />
    </section>
  ),
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterNestedOutlets([
        <>
          <p>Outlet level 1</p>
          <Outlet />
        </>,
        <>
          <p>Outlet level 2</p>
          <Outlet />
        </>,
        <>
          <p>Outlet level 3</p>
          <Outlet />
        </>,
      ]),
    }),
  },
};

export const RoutingNestedAncestors = {
  render: () => (
    <section>
      <h1>Story</h1>
    </section>
  ),
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterNestedAncestors([
        <>
          <p>Ancestor level 1</p>
          <Outlet />
        </>,
        <>
          <p>Ancestor level 2</p>
          <Outlet />
        </>,
        <>
          <p>Ancestor level 3</p>
          <Outlet />
        </>,
      ]),
    }),
  },
};

export const RoutingRouteId = {
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
