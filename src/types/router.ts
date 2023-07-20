import React from 'react';
import { ActionFunction, LoaderFunction } from '@remix-run/router';
import { NonIndexRouteObject } from 'react-router';
import { RequireOne } from './utils';

export type RouteObject = {
  path?: string;
  index?: boolean;
  children?: React.ReactNode;
  caseSensitive?: boolean;
  id?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  element?: React.ReactNode | null;
  Component?: React.ComponentType | null;
  errorElement?: React.ReactNode | null;
  ErrorBoundary?: React.ComponentType | null;
  handle?: unknown;
  shouldRevalidate?: NonIndexRouteObject['shouldRevalidate'];
  lazy?: Promise<RequireOne<Omit<RouteObject, ImmutableRouteKey>>>;
};

export type ImmutableRouteKey = 'lazy' | 'caseSensitive' | 'path' | 'id' | 'index' | 'children';
