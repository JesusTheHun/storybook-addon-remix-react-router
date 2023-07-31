import React, { useState } from 'react';
import { Link, Outlet, useLocation, useMatches, useParams, useSearchParams } from 'react-router-dom';
import { reactRouterNestedOutlets } from '../../features/decorator/utils/routesHelpers/reactRouterNestedOutlets';
import { reactRouterOutlet } from '../../features/decorator/utils/routesHelpers/reactRouterOutlet';
import { reactRouterOutlets } from '../../features/decorator/utils/routesHelpers/reactRouterOutlets';
import { reactRouterParameters } from '../../features/decorator/utils/routesHelpers/reactRouterParameters';
import { withRouter } from '../../features/decorator/withRouter';

export default {
  title: 'v2/Basics',
  decorators: [withRouter],
};

export const RenderChildren = {
  render: () => <h1>Hi</h1>,
};

export const RenderChildrenWithStoryArgs = {
  render: ({ id }: { id: string }) => <h1>{id}</h1>,
  args: {
    id: '42',
  },
};

export const KeepComponentState = {
  render: ({ id }: { id: string }) => {
    const [count, setCount] = useState(0);

    return (
      <div>
        <h1>{id}</h1>
        <button onClick={() => setCount((count) => count + 1)}>Increase</button>
        <div>{count}</div>
      </div>
    );
  },
  args: {
    id: '42',
  },
};

function ShowPath() {
  const location = useLocation();
  return <p>{location.pathname}</p>;
}

export const SpecificPath = {
  render: () => <ShowPath />,
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/foo',
      },
      routing: { path: '/foo' },
    }),
  },
};

function ShowRouteParams() {
  const routeParams = useParams();
  return <p>{JSON.stringify(routeParams)}</p>;
}

export const RouteParams = {
  render: () => <ShowRouteParams />,
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/book/:id',
        pathParams: {
          id: '42',
        },
      },
      routing: {
        path: '/book/:id',
      },
    }),
  },
};

function ShowSearchParams() {
  const [searchParams] = useSearchParams();
  return <p>{JSON.stringify(Object.fromEntries(searchParams.entries()))}</p>;
}

export const SearchParams = {
  render: () => <ShowSearchParams />,
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        searchParams: { page: '42' },
      },
    }),
  },
};

function ShowHandles() {
  const matches = useMatches();
  return <p>{JSON.stringify(matches.map((m) => m.handle))}</p>;
}

export const MatchesHandles = {
  render: () => <ShowHandles />,
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { handle: 'Hi' },
    }),
  },
};

function ShowHandlesOutlet() {
  const matches = useMatches();
  return (
    <section>
      <h1>Story route handle</h1>
      <p>{JSON.stringify(matches.map((m) => m.handle))}</p>

      <h2>Outlet</h2>
      <Outlet />
    </section>
  );
}

export const MatchesHandlesInsideOutlet = {
  render: () => <ShowHandlesOutlet />,
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlet(
        { handle: 'hi' },
        {
          handle: 'Yall',
          element: <ShowHandles />,
        }
      ),
    }),
  },
};

export const OutletJSX = {
  render: () => <Outlet />,
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlet(<h1>I'm an outlet defined by a JSX element</h1>),
    }),
  },
};

export const OutletConfigObject = {
  render: () => <Outlet />,
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlet({
        element: <h1>I'm an outlet defined with a config object</h1>,
      }),
    }),
  },
};

export const Outlets = {
  render: () => {
    const location = useLocation();
    return (
      <section>
        <h1>Story</h1>
        <h2>Current URL : {location.pathname}</h2>
        <Link to={'/'}>Index</Link>
        <Link to={'one'}>One</Link>
        <Link to={'two'}>Two</Link>
        <Outlet />
      </section>
    );
  },
  parameters: {
    reactRouter: reactRouterParameters({
      routing: reactRouterOutlets([
        {
          index: true,
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

export const NestedOutlets = {
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
          <p>Outlet 1</p>
          <Outlet />
        </>,
        <>
          <p>Outlet 2</p>
          <Outlet />
        </>,
        <>
          <p>Outlet 3</p>
          <Outlet />
        </>,
      ]),
    }),
  },
};

function ShowRouteId() {
  const matches = useMatches();
  return <p>{JSON.stringify(matches.map((m) => m.id))}</p>;
}

export const RouteId = {
  render: () => <ShowRouteId />,
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        id: 'SomeRouteId',
      },
    }),
  },
};
