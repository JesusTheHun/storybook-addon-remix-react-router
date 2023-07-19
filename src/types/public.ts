import { HydrationState, LoaderFunction, ShouldRevalidateFunction } from '@remix-run/router';
import React from 'react';
import { ActionFunction } from 'react-router-dom';
import { RouteParamsFromPath } from './utils';

export type ReactRouterParameters<RoutePath extends string = string> = {
  routeId?: string;
  routeState?: unknown;
  routeHandle?: unknown;
  searchParams?: ConstructorParameters<typeof URLSearchParams>;
  outlet?: React.ReactNode | OutletProps;
  browserPath?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  errorElement?: React.ReactNode;
  hydrationData?: HydrationState;
  shouldRevalidate?: ShouldRevalidateFunction;
  routePath?: RoutePath;
} & RouteParams<RoutePath>;

export type RouteParams<RoutePath extends string> = Record<string, never> extends RouteParamsFromPath<RoutePath>
  ? { routePath?: RoutePath }
  : { routePath: RoutePath; routeParams: RouteParamsFromPath<RoutePath> };

export type OutletProps = {
  element: React.ReactNode;
  path?: string;
  handle?: unknown;
  loader?: LoaderFunction;
  action?: ActionFunction;
  errorElement?: React.ReactNode;
};
