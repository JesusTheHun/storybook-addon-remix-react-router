import { StoryObj } from '@storybook/react-vite';
import React, { useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router';
import {
  reactRouterNestedAncestors,
  reactRouterNestedOutlets,
  reactRouterOutlet,
  reactRouterOutlets,
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-remix-react-router';

export default {
  title: 'v2/AdvancedRouting',
  decorators: [withRouter],
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
  render: ({ title }) => (
    <section>
      <h1>{title}</h1>
      <Outlet />
    </section>
  ),
  args: {
    title: 'Story',
  },
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
} satisfies StoryObj<{ title: string }>;

export const RoutingNestedAncestors = {
  render: ({ title }) => {
    const [count, setCount] = useState(0);

    return (
      <section>
        <h1>{title}</h1>
        <button onClick={() => setCount((count) => count + 1)}>Increase</button>
        <div role={'status'}>{count}</div>
      </section>
    );
  },
  args: {
    title: 'Story',
  },
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
} satisfies StoryObj<{ title: string }>;

export const RouteWithChildren = {
  render: () => (
    <main>
      <h1>List of items</h1>
      <ul>
        <li>
          <NavLink to={'42'}>Book 42</NavLink>
        </li>
      </ul>

      <Outlet />
    </main>
  ),
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/book',
      },
      routing: {
        path: '/book',
        useStoryElement: true,
        children: [
          {
            path: ':bookId',
            Component: () => {
              const routeParams = useParams();
              return (
                <section>
                  <h2>Book #{routeParams.bookId}</h2>
                  <p>Book details</p>
                </section>
              );
            },
          },
        ],
      },
    }),
  },
};

export const StoryOutlet = {
  render: () => (
    <main>
      <h1>List of items</h1>
      <ul>
        <li>
          <NavLink to={'42'}>Book 42</NavLink>
        </li>
      </ul>

      <Outlet />
    </main>
  ),
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/books',
      },
      routing: reactRouterOutlet(
        {
          path: '/books',
        },
        {
          path: ':bookId',
          Component: () => {
            const routeParams = useParams();
            return (
              <section>
                <h2>Book #{routeParams.bookId}</h2>
                <p>Book details</p>
              </section>
            );
          },
        }
      ),
    }),
  },
};
