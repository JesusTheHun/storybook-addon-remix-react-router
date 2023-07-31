import { HydrationState } from '@remix-run/router';
import { StoryObj } from '@storybook/react';
import React from 'react';
import { LazyRouteFunction, RouteObject } from 'react-router';
import { PromiseType } from 'utility-types';
import { Merge } from '../../utils/type-utils';
import { ReactRouterAddonStoryParameters } from './components/ReactRouterDecorator';

export type RouterParameters = {
  hydrationData?: HydrationState;
  routing?: RouterRoute | [RouterRoute, ...RouterRoute[]];
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

export type RouterRoute = RouteObject & StoryRouteIdentifier;

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

export type WithReactRouter<T extends StoryObj = StoryObj> = T & {
  parameters: StoryObjParameters<T> & {
    reactRouter?: ReactRouterAddonStoryParameters;
  };
};

export type StoryObjParameters<T extends StoryObj> = T['parameters'] extends { parameters: infer StoryParameters }
  ? StoryParameters
  : Record<string, unknown>;
