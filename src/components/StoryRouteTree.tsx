import React, {useState} from "react";
import {ActionFunction, Route, RouteMatch} from "react-router-dom";
import {RouterLogger} from "./RouterLogger";
import {FCC} from "../fixes";
import {DeepRouteMatchesContext} from "../contexts/DeepRouteMatches";
import {UNSAFE_RouteContext} from "react-router";
import {StoryRouter} from "./StoryRouter";
import {HydrationState, LoaderFunction} from "@remix-run/router";
import {element} from "prop-types";

type OutletProps = {
  element: React.ReactNode;
  path?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  errorElement?: React.ReactNode | null;
}

export type StoryRouterProps = {
  browserPath?: string;
  routePath?: string;
  routeParams?: Record<string, string>;
  searchParams?: ConstructorParameters<typeof URLSearchParams>[0];
  routeState?: unknown;
  outlet?: React.ReactNode | OutletProps;
  hydrationData?: HydrationState;
  loader?: LoaderFunction;
  action?: ActionFunction;
  errorElement?: React.ReactNode | null;
};

type Ctx = {
  _currentValue?: { matches: RouteMatch[] }
};

export const StoryRouteTree: FCC<StoryRouterProps> = ({
  children,
  browserPath: userBrowserPath,
  routePath,
  routeParams,
  searchParams,
  routeState,
  outlet,
  hydrationData,
  action,
  loader,
  errorElement,

}) => {
  const [deepRouteMatches, setDeepRouteMatches] = useState<RouteMatch[]>([]);

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

  const outletConfig: OutletProps = isOutletProps(outlet) ? outlet : {
    element: outlet,
  };

  const outletExpandProps = {
    element: outletConfig.element,
    errorElement: outletConfig.errorElement,
    action: outletConfig.action,
    loader: outletConfig.loader,
  }

  return (
    <DeepRouteMatchesContext.Provider value={deepRouteMatches}>
      <StoryRouter routePath={routePath} routeParams={routeParams} routeState={routeState} searchParams={searchParams}
                   browserPath={userBrowserPath} hydrationData={hydrationData}>
        <Route
          path={routePath}
          action={action}
          loader={loader}
          errorElement={errorElement}
          element={
            <RouterLogger>
              {children}
            </RouterLogger>
          }
        >
          {outletConfig.element !== undefined && outletConfig.path === undefined && <Route index {...outletExpandProps} />}
          {outletConfig.element !== undefined && <Route path={outletConfig.path} {...outletExpandProps} />}
        </Route>
      </StoryRouter>
    </DeepRouteMatchesContext.Provider>
  )
}

function isOutletProps(test: unknown): test is OutletProps {
  return test !== null && typeof test === 'object' && Object.prototype.hasOwnProperty.call(test, 'element');
}