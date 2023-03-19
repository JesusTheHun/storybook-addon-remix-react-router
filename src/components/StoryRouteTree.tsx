import React, {useState} from "react";
import {ActionFunction, LoaderFunctionArgs, Route, RouteMatch, RouteObject} from "react-router-dom";
import {RouterLogger} from "./RouterLogger";
import {FCC} from "../fixes";
import {DeepRouteMatchesContext} from "../contexts/DeepRouteMatches";
import {UNSAFE_RouteContext} from "react-router";
import {StoryRouter} from "./StoryRouter";
import {HydrationState, LoaderFunction} from "@remix-run/router";
import {addons} from "@storybook/addons";
import { EVENTS } from "../constants";
import Channel from "@storybook/channels";
import {ActionFunctionArgs} from "@remix-run/router/utils";
import {useNavigationEventBuilder} from "../hooks/useNavigationEventBuilder";
import {useDataEventBuilder} from "../hooks/useDataEventBuilder";

type OutletProps = {
  element: React.ReactNode;
  path?: string;
  handle?: unknown;
  loader?: LoaderFunction;
  action?: ActionFunction;
  errorElement?: React.ReactNode | null;
}

export type StoryRouterProps = {
  browserPath?: string;
  routePath?: string;
  routeParams?: Record<string, string>;
  routeHandle?: unknown;
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
  routePath = '*',
  routeParams,
  routeHandle,
  searchParams,
  routeState,
  outlet,
  hydrationData,
  action,
  loader,
  errorElement,
}) => {
  const channel = addons.getChannel();
  const [deepRouteMatches, setDeepRouteMatches] = useState<RouteMatch[]>([]);

  // @ts-ignore
  UNSAFE_RouteContext.Provider._context = new Proxy(UNSAFE_RouteContext.Provider._context ?? {}, {
    set(target: Ctx, p: keyof Ctx, v: Ctx[keyof Ctx]) {
      if (p === '_currentValue') {
        setDeepRouteMatches(currentMatches => {
          if (v !== undefined && v.matches.length > currentMatches.length) {
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
    handle: outletConfig.handle,
    errorElement: outletConfig.errorElement,
    action: outletConfig.action !== undefined ? actionWrapper(channel, outletConfig.action) : undefined,
    loader: outletConfig.loader !== undefined ? loaderWrapper(channel, outletConfig.loader) : undefined,
  }

  return (
    <DeepRouteMatchesContext.Provider value={deepRouteMatches}>
      <StoryRouter routePath={routePath} routeParams={routeParams} routeState={routeState} searchParams={searchParams}
                   browserPath={userBrowserPath} hydrationData={hydrationData}>
        <Route
          path={routePath}
          handle={routeHandle}
          action={action !== undefined ? actionWrapper(channel, action) : undefined}
          loader={loader !== undefined ? loaderWrapper(channel, loader) : undefined}
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

function actionWrapper(channel: Channel, action: ActionFunction): ActionFunction {
  const createEventData = useDataEventBuilder();

  return async function(actionArgs: ActionFunctionArgs) {
    if (action === undefined) return;

    channel.emit(EVENTS.ACTION_INVOKED, await createEventData(EVENTS.ACTION_INVOKED, actionArgs));
    const actionResult = await action(actionArgs);
    channel.emit(EVENTS.ACTION_SETTLED, await createEventData(EVENTS.ACTION_SETTLED, actionResult));

    return actionResult;
  }
}

function loaderWrapper(channel: Channel, loader: LoaderFunction): ActionFunction {
  const createEventData = useDataEventBuilder();

  return async function(loaderArgs: LoaderFunctionArgs) {
    if (loader === undefined) return;

    channel.emit(EVENTS.LOADER_INVOKED, await createEventData(EVENTS.LOADER_INVOKED, loaderArgs));
    const loaderResult = await loader(loaderArgs);
    channel.emit(EVENTS.LOADER_SETTLED, await createEventData(EVENTS.LOADER_SETTLED, loaderResult));

    return loaderResult;
  }
}