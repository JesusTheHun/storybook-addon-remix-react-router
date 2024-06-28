import React from 'react';
import { RouterRoute } from '../types';

export function injectStory(routes: RouterRoute[], StoryElement: React.ReactElement): RouterRoute[] {
  // Single route, no children
  if (routes.length === 1 && (routes[0].children === undefined || routes[0].children.length === 0)) {
    return [{ ...routes[0], element: StoryElement }];
  }

  const storyRouteIndex = routes.findIndex((route) => route.useStoryElement);

  if (storyRouteIndex !== -1) {
    return routes.map((route) => {
      if (!route.useStoryElement) return route;

      return {
        ...route,
        element: StoryElement,
      };
    });
  }

  return routes.map((route) => {
    if (!route.children) return route;

    return {
      ...route,
      children: injectStory(route.children, StoryElement),
    };
  });
}
