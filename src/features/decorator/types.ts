import { HydrationState, FutureConfig } from '@remix-run/router';
import { FutureConfig as FutureConfigRouter } from 'react-router';
import React from 'react';
import { LazyRouteFunction, RouteObject } from 'react-router';
import { Overwrite, PromiseType } from 'utility-types';
import { Merge } from '../../utils/type-utils';

export type RouterParameters = {
  hydrationData?: HydrationState;
  routing?: string | RouterRoute | [RouterRoute, ...RouterRoute[]];
  future?: Partial<FutureConfig & FutureConfigRouter>;
  fallback?: React.JSX.Element;
};

export type LocationParameters<PathParams extends Record<string, string | number> = Record<string, string | number>> = {
  path?: string | ((inferredPath: string, pathParams: PathParams) => string | undefined);
  pathParams?: PathParams;
  searchParams?: ConstructorParameters<typeof URLSearchParams>[0];
  hash?: string;
  state?: unknown;
};

export type NavigationHistoryEntry = LocationParameters & {
  isInitialLocation?: boolean;
};

export type RouterRoute = Overwrite<RouteObject, { children?: RouterRoute[] }> & StoryRouteIdentifier;

export type RouteDefinition = React.ReactElement | RouteDefinitionObject;
export type NonIndexRouteDefinition = React.ReactElement | NonIndexRouteDefinitionObject;

export type RouteDefinitionObject = Merge<Omit<RouteObject, 'children'> & StoryRouteIdentifier>;
export type NonIndexRouteDefinitionObject = RouteDefinitionObject & { index?: false };

export type StoryRouteIdentifier = { useStoryElement?: boolean };

type Params<Path extends string> = Record<string, never> extends RouteParamsFromPath<Path>
  ? { path?: Path }
  : { path: Path; params: RouteParamsFromPath<Path> };

type PushRouteParam<
  Segment extends string | undefined,
  RouteParams extends Record<string, unknown> | unknown
> = Segment extends `:${infer ParamName}` ? { [key in ParamName | keyof RouteParams]: string } : RouteParams;

export type RouteParamsFromPath<Path extends string | undefined> =
  Path extends `${infer CurrentSegment}/${infer RemainingPath}`
    ? PushRouteParam<CurrentSegment, RouteParamsFromPath<RemainingPath>>
    : PushRouteParam<Path, unknown>;

type LazyReturnType<T extends RouteDefinitionObject> = T extends {
  lazy?: infer Lazy extends LazyRouteFunction<RouteObject>;
}
  ? PromiseType<ReturnType<Lazy>>
  : never;

export type RoutingHelper = (...args: never[]) => [RouterRoute, ...RouterRoute[]];
