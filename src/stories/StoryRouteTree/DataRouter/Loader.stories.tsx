import React from "react";
import {Link, Outlet, useLoaderData, useLocation, useRouteError, useSearchParams} from "react-router-dom";
import {withRouter} from "../../../withRouter";

export default {
  title: "Loader",
  decorators: [withRouter],
};

function sleep(n: number = 500) {
  return new Promise((r) => setTimeout(r, n));
}

function loader(response: unknown) {
  return async () => sleep(100).then(() => ({ foo: response }));
}

function DataLoader() {
  let data = useLoaderData() as { foo: string };
  return <h1>{data.foo}</h1>;
}

export const RouteLoader = {
  render: () => <DataLoader />,
  parameters: {
    reactRouter: {
      loader: loader("Data loaded"),
    }
  }
}


function DataLoaderWithOutlet() {
  let data = useLoaderData() as { foo: string };
  return (
    <div>
      <h1>{data.foo}</h1>
      <Outlet />
    </div>
  );
}

function DataLoaderOutlet() {
  let data = useLoaderData() as { foo: string };
  return (
    <div>
      <h2>{data.foo}</h2>
    </div>
  );
}

export const RouteAndOutletLoader = {
  render: () => <DataLoaderWithOutlet />,
  parameters: {
    reactRouter: {
      loader: loader("Data loaded"),
      outlet: {
        element: <DataLoaderOutlet />,
        loader: loader("Outlet data loaded"),
      },
    }
  }
}

function AddSearchParam() {
  const location = useLocation();

  return (
    <div>
      { location.search }
      <div>
        <Link to={{ search: '?foo=bar' }} >Add Search Param</Link>
      </div>
    </div>
  )
}

export const RouteShouldNotRevalidate = {
  render: () => <AddSearchParam />,
  parameters: {
    reactRouter: {
      loader: loader("Should not appear again after search param is added"),
      shouldRevalidate: () => false,
    }
  }
}

function DataErrorBoundary() {
  const error = useRouteError() as Error;
  return <h1>Fancy error component : {error.message}</h1>;
}

async function failingLoader() {
  throw new Error("Meh.");
}

export const ErrorBoundary = {
  render: () => <DataLoader />,
  parameters: {
    reactRouter: {
      loader: failingLoader,
      errorElement: <DataErrorBoundary />,
    }
  }
}