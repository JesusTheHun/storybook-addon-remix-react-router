import { describe, expect, test } from 'vitest';
import { reactRouterParameters } from './reactRouterParameters';

describe('reactRouterParameters', () => {
  test('it should return the given parameter', () => {
    const parameters = { routePath: '/users' };
    expect(reactRouterParameters(parameters)).toEqual(parameters);
  });

  test.skip('a typescript error should show up if the routeParams property is missing', () => {
    expect(
      // @ts-expect-error test
      reactRouterParameters({
        routePath: '/users/:userId',
      })
    ).toEqual({
      routePath: '/users/:userId',
    });
  });

  test.skip('a typescript error should show up if a routeParams is missing', () => {
    expect(
      reactRouterParameters({
        routePath: '/users/:userId/tabs/:tabId',
        // @ts-expect-error test
        routeParams: {
          userId: '42',
        },
      })
    ).toEqual({
      routePath: '/users/:userId/tabs/:tabId',
      routeParams: {
        userId: '42',
      },
    });
  });
});
