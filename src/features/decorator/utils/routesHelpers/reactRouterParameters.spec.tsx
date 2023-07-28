import React from 'react';
import { describe, expect, test } from 'vitest';
import { reactRouterOutlet } from './reactRouterOutlet';
import { reactRouterParameters } from './reactRouterParameters';

describe('reactRouterParameters', () => {
  function MyComponent() {
    return null;
  }

  test.skip('should look nice', () => {
    reactRouterParameters({
      routes: reactRouterOutlet(<MyComponent />),
      locationHash: 'title1',
    });
  });

  test('it should return the given parameter', () => {
    const parameters = { path: '/users' };
    expect(reactRouterParameters(parameters) === parameters).toBeTruthy();
  });

  test.skip('a typescript error should show up if the params property is missing', () => {
    // @ts-expect-error test
    reactRouterParameters({
      path: '/users/:userId',
    });
  });

  test.skip('a typescript error should show up if a routeParams is missing', () => {
    reactRouterParameters({
      path: '/users/:userId/tabs/:tabId',
      // @ts-expect-error test
      params: {
        userId: '42',
      },
    });
  });
});
