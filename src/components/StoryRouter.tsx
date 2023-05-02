import React, {PropsWithChildren, useLayoutEffect, useState} from 'react';
import {InitialEntry} from "@remix-run/router";
import {createMemoryRouter, createRoutesFromElements, generatePath, RouterProvider} from "react-router-dom";
import {StoryRouterProps} from "./StoryRouteTree";

export const StoryRouter = ({
  children,
  routePath,
  routeParams,
  searchParams,
  routeState,
  browserPath: userBrowserPath,
  hydrationData,
}: PropsWithChildren<StoryRouterProps>) => {
  const [router, setRouter] = useState<ReturnType<typeof createMemoryRouter>>();

  useLayoutEffect(() => {
    const generatedPath = generatePath(routePath || '', routeParams);
    const queryString = new URLSearchParams(searchParams).toString();
    const search = queryString.length > 0 ? `?${queryString}` : '';

    const initialEntry: InitialEntry = { search, state: routeState };
    if (userBrowserPath !== undefined) initialEntry['pathname'] = userBrowserPath;
    if (userBrowserPath === undefined && generatedPath !== '') initialEntry['pathname'] = generatedPath;

    const routes = createRoutesFromElements(children);

    const memoryRouter = createMemoryRouter(routes, {
      initialEntries: [initialEntry],
      hydrationData,
    });

    setRouter(memoryRouter);
  }, [children]);

  if (router !== undefined && module && module.hot && module.hot.dispose) {
    module.hot.dispose(() => router.dispose());
  }

  if (router === undefined) return null;

  return <RouterProvider router={router} fallbackElement={<Fallback />} />;
}

export function Fallback() {
  return <p>Performing initial data load</p>;
}