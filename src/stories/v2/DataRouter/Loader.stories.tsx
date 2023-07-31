import React from 'react';
import { Link, Outlet, useLoaderData, useLocation, useRouteError } from 'react-router-dom';
import { reactRouterParameters } from '../../../features/decorator/utils/routesHelpers/reactRouterParameters';
import { withRouter } from '../../../features/decorator/withRouter';

export default {
  title: 'v2/Loader',
  decorators: [withRouter],
};

function sleep(n = 500) {
  return new Promise((r) => setTimeout(r, n));
}

function loader(response: unknown) {
  return async () => sleep(100).then(() => ({ foo: response }));
}

function DataLoader() {
  const data = useLoaderData() as { foo: string };
  return <h1>{data.foo}</h1>;
}

export const RouteLoader = {
  render: () => <DataLoader />,
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { loader: loader('Data loaded') },
    }),
  },
};

function DataLoaderWithOutlet() {
  const data = useLoaderData() as { foo: string };
  return (
    <div>
      <h1>{data.foo}</h1>
      <Outlet />
    </div>
  );
}

function DataLoaderOutlet() {
  const data = useLoaderData() as { foo: string };
  return (
    <div>
      <h2>{data.foo}</h2>
    </div>
  );
}

export const RouteAndOutletLoader = {
  render: () => <DataLoaderWithOutlet />,
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        loader: loader('Data loaded'),
        children: [
          {
            element: <DataLoaderOutlet />,
            loader: loader('Outlet data loaded'),
          },
        ],
      },
    }),
  },
};

function AddSearchParam() {
  const location = useLocation();

  return (
    <div>
      {location.search}
      <div>
        <Link to={{ search: '?foo=bar' }}>Add Search Param</Link>
      </div>
    </div>
  );
}

export const RouteShouldNotRevalidate = {
  render: () => <AddSearchParam />,
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        loader: loader('Should not appear again after search param is added'),
        shouldRevalidate: () => false,
      },
    }),
  },
};

function DataErrorBoundary() {
  const error = useRouteError() as Error;
  return <h1>Fancy error component : {error.message}</h1>;
}

async function failingLoader() {
  throw new Error('Meh.');
}

export const ErrorBoundary = {
  render: () => <DataLoader />,
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        loader: failingLoader,
        errorElement: <DataErrorBoundary />,
      },
    }),
  },
};
