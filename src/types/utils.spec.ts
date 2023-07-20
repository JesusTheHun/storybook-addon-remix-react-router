import { describe, test } from 'vitest';
import { expectTypeOf } from 'expect-type';
import { RouteParamsFromPath } from './utils';

describe('Types - Utils', () => {
  describe('RouteParamsFromPath', () => {
    test('returns an empty object when no param is expected', () => {
      expectTypeOf<RouteParamsFromPath<'/users'>>().toEqualTypeOf<unknown>();
      expectTypeOf<RouteParamsFromPath<'users'>>().toEqualTypeOf<unknown>();
    });

    test('returns an object with the expected route params', () => {
      expectTypeOf<RouteParamsFromPath<'/users/:userId'>>().toEqualTypeOf<{ userId: string }>();
      expectTypeOf<RouteParamsFromPath<'/:dashboard'>>().toEqualTypeOf<{ dashboard: string }>();
      expectTypeOf<RouteParamsFromPath<'/users/:userId/:tabId'>>().toEqualTypeOf<{
        userId: string;
        tabId: string;
      }>();
      expectTypeOf<RouteParamsFromPath<'/users/:userId/tabs'>>().toEqualTypeOf<{ userId: string }>();
      expectTypeOf<RouteParamsFromPath<'/users/:userId/tabs/:tabId'>>().toEqualTypeOf<{
        userId: string;
        tabId: string;
      }>();

      expectTypeOf<RouteParamsFromPath<'users/:userId'>>().toEqualTypeOf<{ userId: string }>();
      expectTypeOf<RouteParamsFromPath<':userId'>>().toEqualTypeOf<{ userId: string }>();
    });
  });
});
