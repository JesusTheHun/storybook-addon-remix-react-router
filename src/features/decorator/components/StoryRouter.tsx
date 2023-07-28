import type { InitialEntry } from '@remix-run/router';
import React from 'react';
import { HydrationState } from '@remix-run/router';
import { RouteObject } from 'react-router';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { StoryRouteIdentifier } from '../types';
import { injectStory } from '../utils/InjectStory';
import { ReactRouterDecoratorProps } from './ReactRouterDecorator';

export type RouterRoute = RouteObject & StoryRouteIdentifier;
export type RouterRoutes = ReadonlyArray<RouterRoute>;

export type StoryRouterProps = {
  renderStory: ReactRouterDecoratorProps['getStory'];
  storyContext: ReactRouterDecoratorProps['storyContext'];
  routes: RouterRoutes;
  hydrationData?: HydrationState;
  navigationHistory?: ReadonlyArray<InitialEntry & { initialLocation?: boolean }>;
  locationSearchParams?: ConstructorParameters<typeof URLSearchParams>[0];
  locationHash?: string;
  locationState?: unknown;
};

export function StoryRouter({
  routes,
  navigationHistory,
  locationSearchParams,
  locationState,
  locationHash,
  hydrationData,
  renderStory,
  storyContext,
}: StoryRouterProps) {
  // @TODO generate path from parameters
  const generatedPath = '/';
  const queryString = new URLSearchParams(locationSearchParams).toString();
  const search = queryString.length > 0 ? `?${queryString}` : '';

  const initialEntries: ReadonlyArray<InitialEntry> = navigationHistory ?? [
    { search, state: locationState, hash: locationHash, pathname: generatedPath },
  ];
  const currentLocationIndex = navigationHistory?.findIndex((h) => h.initialLocation);
  const initialIndex = currentLocationIndex === undefined ? 0 : initialEntries.length - 1;

  const StoryComponent = renderStory(storyContext) as React.ReactElement;
  const routerRoutes = injectStory(routes, StoryComponent);

  const memoryRouter = createMemoryRouter(routerRoutes, {
    initialEntries: Array.from(initialEntries),
    initialIndex,
    hydrationData,
  });

  return <RouterProvider router={memoryRouter} fallbackElement={<Fallback />} />;
}

function Fallback() {
  return <p>Performing initial data load</p>;
}
