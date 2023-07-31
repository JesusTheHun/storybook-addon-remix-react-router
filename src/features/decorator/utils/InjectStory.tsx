import React from 'react';
import { RouterRoute } from '../types';

export function injectStory(routes: RouterRoute[], StoryComponent: React.ReactElement): RouterRoute[] {
  const storyRouteIndex = routes.findIndex((route) => route.useStoryElement);
  if (storyRouteIndex !== -1) {
    const localRoutes = Array.from(routes);
    localRoutes.splice(storyRouteIndex, 1, {
      ...routes[storyRouteIndex],
      element: StoryComponent,
    });
    return localRoutes;
  }

  return routes.map((route) => {
    if (!route.children) return route;

    return {
      ...route,
      children: injectStory(route.children, StoryComponent),
    };
  });
}
