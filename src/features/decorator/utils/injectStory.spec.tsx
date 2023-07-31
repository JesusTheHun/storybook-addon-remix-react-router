import React from 'react';
import { describe, it } from 'vitest';
import { injectStory } from './InjectStory';
import { isValidReactNode } from './isValidReactNode';

describe('injectStory', () => {
  it('should return an empty array if routes is an empty array', () => {
    const result = injectStory([], <h1>StoryComponent</h1>);
    expect(result).toEqual([]);
  });

  it('should return the same routes array if no route has useStoryElement property', () => {
    const routes = [
      { path: '/', element: <div /> },
      { path: '/about', element: <div /> },
    ];
    const result = injectStory(routes, <h1>StoryComponent</h1>);
    expect(result).toEqual(routes);
    expect(result).not.toBe(routes);
  });

  it('should return the same route array if no route has children property', () => {
    const routes = [
      { path: '/', element: <div /> },
      { path: '/about', element: <div /> },
    ];
    const result = injectStory(routes, <h1>StoryComponent</h1>);
    expect(result).toEqual(routes);
  });

  it('should inject the story in the story route object', () => {
    const routes = [
      { path: '/', element: <div /> },
      { path: '/about', useStoryElement: true },
    ];
    const result = injectStory(routes, <h1>StoryComponent</h1>);
    expect(result).toEqual([
      { path: '/', element: <div /> },
      expect.objectContaining({ path: '/about', useStoryElement: true }),
    ]);

    expect(isValidReactNode(result[1].element)).toBeTruthy();
    expect(result[1]).not.toBe(routes[1]);
  });

  it('should inject the story when the story route is deep', () => {
    const routes = [
      {
        path: '/',
        element: <div />,
        children: [
          { path: '/child1', element: <div /> },
          { path: '/child2', useStoryElement: true },
        ],
      },
    ];
    const result = injectStory(routes, <h1>StoryComponent</h1>);
    expect(result).toEqual([
      {
        path: '/',
        element: <div />,
        children: [
          { path: '/child1', element: <div /> },
          expect.objectContaining({ path: '/child2', useStoryElement: true }),
        ],
      },
    ]);

    expect(isValidReactNode(result[0].children?.[1].element)).toBeTruthy();
  });
});
