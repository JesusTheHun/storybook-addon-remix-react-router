import React, { useState } from 'react';
import { Outlet, useLocation, useMatches, useParams, useSearchParams } from 'react-router-dom';
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
    reactRouter: {
      routePath: '/foo',
    },
  },
};

function ShowRouteParams() {
  const routeParams = useParams();
  return <p>{JSON.stringify(routeParams)}</p>;
}

export const RouteParams = {
  render: () => <ShowRouteParams />,
  parameters: {
    reactRouter: {
      routePath: '/book/:id',
      routeParams: { id: '42' },
    },
  },
};

function ShowSearchParams() {
  const [searchParams] = useSearchParams();
  return <p>{JSON.stringify(Object.fromEntries(searchParams.entries()))}</p>;
}

export const SearchParams = {
  render: () => <ShowSearchParams />,
  parameters: {
    reactRouter: {
      searchParams: { page: '42' },
    },
  },
};

function ShowHandles() {
  const matches = useMatches();
  return <p>{JSON.stringify(matches.map((m) => m.handle))}</p>;
}

export const MatchesHandles = {
  render: () => <ShowHandles />,
  parameters: {
    reactRouter: {
      routeHandle: 'Hi',
    },
  },
};

export const MatchesHandlesInsideOutlet = {
  render: () => <ShowHandles />,
  parameters: {
    reactRouter: {
      routeHandle: 'Hi',
      outlet: {
        handle: 'Yall',
        element: <ShowHandles />,
      },
    },
  },
};

export const OutletJSX = {
  render: () => <Outlet />,
  parameters: {
    reactRouter: {
      outlet: <h1>I'm an outlet</h1>,
    },
  },
};

export const OutletConfigObject = {
  render: () => <Outlet />,
  parameters: {
    reactRouter: {
      outlet: {
        element: <h1>I'm an outlet defined with a config object</h1>,
      },
    },
  },
};

function ShowRouteId() {
  const matches = useMatches();
  return <p>{JSON.stringify(matches.map((m) => m.id))}</p>;
}

export const RouteId = {
  render: () => <ShowRouteId />,
  parameters: {
    reactRouter: {
      routeId: 'SomeRouteId',
    },
  },
};
