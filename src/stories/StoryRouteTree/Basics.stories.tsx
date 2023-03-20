import React from "react";
import {Outlet, useLocation, useMatches, useParams, useSearchParams} from "react-router-dom";
import {withRouter} from "../../withRouter";
import {FCC} from "src/fixes";

const DummyComponent: FCC = ({ children }) => <>{children}</>;

export default {
  decorators: [withRouter],
};

export const RenderChildren = {
  render: () => <h1>Hi</h1>,
}

function ShowPath() {
  const location = useLocation();
  return <p>{location.pathname}</p>;
}

export const SpecificPath = {
  render: () => <ShowPath />,
  parameters: {
    reactRouter: {
      routePath: '/foo',
    }
  }
}

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
    }
  }
}

function ShowSearchParams() {
  const [searchParams] = useSearchParams();
  return <p>{JSON.stringify(Object.fromEntries(searchParams.entries()))}</p>;
}

export const SearchParams = {
  render: () => <ShowSearchParams />,
  parameters: {
    reactRouter: {
      searchParams: { page: '42' },
    }
  }
}

function ShowHandles() {
  const matches = useMatches();
  return <p>{JSON.stringify(matches.map(m => m.handle))}</p>;
}

export const MatchesHandles = {
  render: () => <ShowHandles />,
  parameters: {
    reactRouter: {
      routeHandle: "Hi",
    }
  }
}

export const MatchesHandlesInsideOutlet = {
  render: () => <ShowHandles />,
  parameters: {
    reactRouter: {
      routeHandle: "Hi",
      outlet: {
        handle: "Yall",
        element: <ShowHandles />,
      }
    }
  }
}

export const OutletJSX = {
  render: () => <Outlet />,
  parameters: {
    reactRouter: {
      outlet: <h1>I'm an outlet</h1>,
    }
  }
}

export const OutletConfigObject = {
  render: () => <Outlet />,
  parameters: {
    reactRouter: {
      outlet: {
        element: <h1>I'm an outlet defined with a config object</h1>,
      },
    }
  }
}
