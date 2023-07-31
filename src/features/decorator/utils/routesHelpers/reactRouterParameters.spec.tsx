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
      routing: reactRouterOutlet(<MyComponent />),
      location: { hash: 'title1' },
    });
  });

  test('it should return the given parameter', () => {
    const parameters = { routing: { path: '/users' } };
    expect(reactRouterParameters(parameters) === parameters).toBeTruthy();
  });

  test.skip('a typescript error should show up if the api v1 is used', () => {
    reactRouterParameters({
      // @ts-expect-error test
      routePath: 'apiV1',
    });
  });
});
