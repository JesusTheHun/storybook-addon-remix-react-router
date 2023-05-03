import React, {PropsWithChildren, useLayoutEffect, useRef, useState} from 'react';
import {InitialEntry} from "@remix-run/router";
import {createMemoryRouter, createRoutesFromElements, generatePath, RouterProvider} from "react-router-dom";
import {StoryRouterProps} from "./StoryRouteTree";
import {addons} from "@storybook/manager-api";
import {STORY_ARGS_UPDATED} from "@storybook/core-events";

export const StoryRouter = ({
  children,
  routePath,
  routeParams,
  searchParams,
  routeState,
  browserPath: userBrowserPath,
  hydrationData,
}: PropsWithChildren<StoryRouterProps>) => {
  const channel = addons.getChannel();
  const [router, setRouter] = useState<ReturnType<typeof createMemoryRouter>>();
  const [storyMutations, setStoryMutations] = useState(0);
  const routeStateRef = useRef<InitialEntry>();

  channel.on(STORY_ARGS_UPDATED, () => {
    setStoryMutations(prev => prev + 1);
  });

  useLayoutEffect(() => {
    const generatedPath = generatePath(routePath || '', routeParams);
    const queryString = new URLSearchParams(searchParams).toString();
    const search = queryString.length > 0 ? `?${queryString}` : '';

    const initialEntry: InitialEntry = { search, state: routeState };
    if (userBrowserPath !== undefined) initialEntry['pathname'] = userBrowserPath;
    if (userBrowserPath === undefined && generatedPath !== '') initialEntry['pathname'] = generatedPath;

    if (routeStateRef.current !== undefined) {
      Object.assign(initialEntry, routeStateRef.current);
    }

    const routes = createRoutesFromElements(children);

    const memoryRouter = createMemoryRouter(routes, {
      initialEntries: [initialEntry],
      hydrationData,
    });

    memoryRouter.subscribe(nextState => {
      routeStateRef.current = nextState.location;
    });

    setRouter(memoryRouter);
  }, [storyMutations]);

  if (router === undefined) return null;

  return <RouterProvider router={router} fallbackElement={<Fallback />} />;
}

export function Fallback() {
  return <p>Performing initial data load</p>;
}