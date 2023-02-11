import React, {PropsWithChildren} from 'react';
import {HydrationState, InitialEntry,} from "@remix-run/router";
import {createMemoryRouter, createRoutesFromElements, generatePath, RouterProvider,} from "react-router-dom";
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
  const generatedPath = generatePath(routePath, routeParams);
  const queryString = new URLSearchParams(searchParams).toString();
  const search = queryString.length > 0 ? `?${queryString}` : '';

  const initialEntry: InitialEntry = { search, state: routeState };
  if (userBrowserPath !== undefined) initialEntry['pathname'] = userBrowserPath;
  if (userBrowserPath === undefined && generatedPath !== '') initialEntry['pathname'] = generatedPath;

  const routes = createRoutesFromElements(children);

  const router = createMemoryRouter(routes, {
    initialEntries: [initialEntry],
    hydrationData,
  });

  return <RouterProvider router={router} />;
}