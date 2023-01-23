import React, {useState} from "react";
import {
  createMemoryRouter,
  generatePath,
  Route,
  RouteMatch,
  RouterProvider
} from "react-router-dom";
import {RouterLogger} from "./RouterLogger";
import {FCC} from "../fixes";
import {DeepRouteMatchesContext} from "../contexts/DeepRouteMatches";
import {UNSAFE_RouteContext} from "react-router";
import { InitialEntry } from "@remix-run/router/history";

export type StoryRouterProps = {
  browserPath?: string;
  routePath?: string;
  routeParams?: Record<string, string>;
  searchParams?: ConstructorParameters<typeof URLSearchParams>[0];
  routeState?: unknown;
  outlet?: React.ReactNode;
};

export const StoryRouter: FCC<StoryRouterProps> = ({ children, browserPath: userBrowserPath, routePath, routeParams, searchParams, routeState, outlet }) => {
  const generatedPath = generatePath(routePath, routeParams);
  const queryString = new URLSearchParams(searchParams).toString();
  const search = queryString.length > 0 ? `?${queryString}` : '';
  const [deepRouteMatches, setDeepRouteMatches] = useState<RouteMatch[]>([]);

  type Ctx = {
    _currentValue?: { matches: RouteMatch[] }
  };

  // @ts-ignore
  UNSAFE_RouteContext.Provider._context = new Proxy(UNSAFE_RouteContext.Provider._context ?? {}, {
    set(target: Ctx, p: keyof Ctx, v: Ctx[keyof Ctx]) {
      if (p === '_currentValue') {
        setDeepRouteMatches(currentMatches => {
          if (v.matches.length > currentMatches.length) {
            return v.matches;
          }
          return currentMatches;
        });
      }

      return Reflect.set(target, p, v);
    },
  });

  const initialEntry: InitialEntry = { search, state: routeState };
  if (userBrowserPath !== undefined) initialEntry['pathname'] = userBrowserPath;
  if (userBrowserPath === undefined && generatedPath !== '') initialEntry['pathname'] = generatedPath;
  const routes = [{
    path: routePath,
    element: (
      <RouterLogger>
        { children }
      </RouterLogger>
    ),
  }];
  if (outlet) {
    routes.push({
      path: '',
      element: <>{outlet}</>
    });
  }
  const dataRouter = createMemoryRouter(routes, {
    initialEntries: [initialEntry]
  });

  return (
    <DeepRouteMatchesContext.Provider value={deepRouteMatches}>
      <RouterProvider router={dataRouter} />
    </DeepRouteMatchesContext.Provider>
  )
}
