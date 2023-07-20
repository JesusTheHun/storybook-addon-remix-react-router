import { ActionFunction, HydrationState, LoaderFunction } from '@remix-run/router';
import { expectTypeOf } from 'expect-type';
import React from 'react';
import { describe, test } from 'vitest';
import { OutletProps, ReactRouterParameters } from './public';
import { ImmutableRouteKey, RouteObject } from './router';
import { RequireOne } from './utils';

describe('Types - Public', () => {
  describe('ReactRouterParameters', () => {
    test('there is no params property when the path does not requires any', () => {
      expectTypeOf<ReactRouterParameters<'/users'>>().toMatchTypeOf<{
        path?: '/users';
        children?: React.ReactNode;
        caseSensitive?: boolean;
        id?: string;
        loader?: LoaderFunction;
        action?: ActionFunction;
        element?: React.ReactNode;
        Component?: React.ComponentType | null;
        errorElement?: React.ReactNode | null;
        ErrorBoundary?: React.ComponentType | null;
        handle?: unknown;
        shouldRevalidate?: RouteObject['shouldRevalidate'];
        lazy?: Promise<RequireOne<Omit<RouteObject, ImmutableRouteKey>>>;
        locationSearchParams?: ConstructorParameters<typeof URLSearchParams>[number];
        locationHash?: string;
        locationState?: unknown;
        hydrationData?: HydrationState;
        outlet?: React.ReactNode | OutletProps<string>;
        descendantRoutes?: {};
      }>();
    });

    test('there is a params property when the path requires it', () => {
      expectTypeOf<ReactRouterParameters<'/users/:userId'>>().toMatchTypeOf<{
        path: '/users/:userId';
        params: { userId: string };
        children?: React.ReactNode;
        caseSensitive?: boolean;
        id?: string;
        loader?: LoaderFunction;
        action?: ActionFunction;
        element?: React.ReactNode;
        Component?: React.ComponentType | null;
        errorElement?: React.ReactNode | null;
        ErrorBoundary?: React.ComponentType | null;
        handle?: unknown;
        shouldRevalidate?: RouteObject['shouldRevalidate'];
        lazy?: Promise<RequireOne<Omit<RouteObject, ImmutableRouteKey>>>;
        locationSearchParams?: ConstructorParameters<typeof URLSearchParams>[number];
        locationHash?: string;
        locationState?: unknown;
        hydrationData?: HydrationState;
        outlet?: React.ReactNode | OutletProps<string>;
        descendantRoutes?: {};
      }>();
    });

    test('descendant route params', () => {
      type A = ReactRouterParameters<'/users/:userId', string, '/settings/:settingsTab'>['descendantRoutes'];

      expectTypeOf<ReactRouterParameters<'/users/:userId'>>().toMatchTypeOf<{
        path: '/users/:userId';
        // params: { userId: string };
        children?: React.ReactNode;
        caseSensitive?: boolean;
        id?: string;
        loader?: LoaderFunction;
        action?: ActionFunction;
        element?: React.ReactNode;
        Component?: React.ComponentType | null;
        errorElement?: React.ReactNode | null;
        ErrorBoundary?: React.ComponentType | null;
        handle?: unknown;
        shouldRevalidate?: RouteObject['shouldRevalidate'];
        lazy?: Promise<RequireOne<Omit<RouteObject, ImmutableRouteKey>>>;
        locationSearchParams?: ConstructorParameters<typeof URLSearchParams>[number];
        locationHash?: string;
        locationState?: unknown;
        hydrationData?: HydrationState;
        outlet?: React.ReactNode | OutletProps<string>;
        // descendantRoutes?: {
        //   path: '/settings/:settingsTab';
        //   params: {
        //     // settingsTab: string;
        //   };
        // };
      }>();
    });
  });
});
