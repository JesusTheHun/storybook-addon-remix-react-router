import { ActionFunction, HydrationState, LoaderFunction } from '@remix-run/router';
import React from 'react';
import { RouteObject } from './router';
import { RouteParamsFromPath } from './utils';

export type ReactRouterParameters<
  Path extends string = string,
  OutletPath extends string = string,
  DescendantPath extends string = string
> = RouterParameters<OutletPath, DescendantPath> &
  LocationParameters &
  Params<Path> & {
    path: Path;
  } & Omit<RouteObject, 'index' | 'path'>;

type LocationParameters = {
  locationSearchParams?: ConstructorParameters<typeof URLSearchParams>[number];
  locationHash?: string;
  locationState?: unknown;
};

// type RouterParameters = {
type RouterParameters<OutletPath extends string = string, DescendantPath extends string = string> = {
  hydrationData?: HydrationState;
  outlet?: React.ReactNode | OutletProps<OutletPath>;
  descendantRoutes?: Params<DescendantPath>;
};

type Params<Path extends string> = Record<string, never> extends RouteParamsFromPath<Path>
  ? { path?: Path }
  : { path: Path; params: RouteParamsFromPath<Path> };

export type OutletProps<OutletPath extends string> = {
  element: React.ReactNode;
  path?: OutletPath;
  handle?: unknown;
  loader?: LoaderFunction;
  action?: ActionFunction;
  errorElement?: React.ReactNode;
} & Params<OutletPath>;
