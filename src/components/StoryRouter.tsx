import React, {useState} from "react";
import {generatePath, MemoryRouter, Route, RouteMatch, Routes} from "react-router-dom";
import {RouterLogger} from "./RouterLogger";
import {FCC} from "../fixes";
import {DeepRouteMatchesContext} from "../contexts/DeepRouteMatches";
import {UNSAFE_RouteContext} from "react-router";
import {InitialEntry} from "history";
import {addons, Args} from "@storybook/addons";
import {STORY_ARGS_UPDATED} from "@storybook/core-events";
import {ARGTYPE_ROUTEPARAMS_PREFIX, ARGTYPE_ROUTESTATE, ARGTYPE_SEARCHPARAMS_PREFIX} from "../constants";
import {StoryId} from "@storybook/csf";

type URLSearchParamsInit = ConstructorParameters<typeof URLSearchParams>[0];

export type StoryRouterProps = {
  storyId: StoryId;
  browserPath?: string;
  routePath?: string;
  routeParams?: Record<string, string>;
  searchParams?: URLSearchParamsInit;
  routeState?: unknown;
  outlet?: React.ReactNode;
};

type StoryArgsUpdatedEvent = { storyId: StoryId; args: Args };

export const StoryRouter: FCC<StoryRouterProps> = ({
  children,
  storyId,
  browserPath: userBrowserPath,
  routePath,
  routeParams: userRouteParams,
  searchParams: userSearchParams,
  routeState: userRouteState,
  outlet
}) => {
  const [controlRouteParams, setControlRouteParams] = useState<StoryRouterProps['routeParams']>({});
  const [controlSearchParams, setControlSearchParams] = useState<StoryRouterProps['searchParams']>({});
  const [controlRouteState, setControlRouteState] = useState<StoryRouterProps['routeState']>();

  const channel = addons.getChannel();

  channel.on(STORY_ARGS_UPDATED, ({ storyId: updatedStoryId, args }: StoryArgsUpdatedEvent) => {
    if (updatedStoryId !== storyId) return;

    Object.entries(args).forEach(([argName, argValue]) => {

      // Route Params
      if (argName.substring(0, ARGTYPE_ROUTEPARAMS_PREFIX.length) == ARGTYPE_ROUTEPARAMS_PREFIX) {
        const paramName = argName.substring(ARGTYPE_ROUTEPARAMS_PREFIX.length + 1);
        setControlRouteParams(prev => ({ ...prev, [paramName]: argValue }));
      }

      // Search Params
      if (argName.substring(0, ARGTYPE_SEARCHPARAMS_PREFIX.length) == ARGTYPE_SEARCHPARAMS_PREFIX) {
        const paramName = argName.substring(ARGTYPE_SEARCHPARAMS_PREFIX.length + 1);
        setControlSearchParams(prev => {
          const nextSearchParams = new URLSearchParams(prev);
          nextSearchParams.set(paramName, argValue)
          return nextSearchParams;
        });
      }

      if (argName === ARGTYPE_ROUTESTATE) {
        setControlRouteState(argValue);
      }
    });
  });

  const userSearchParamsObj = new URLSearchParams(userSearchParams || {});
  const controlSearchParamsObj = new URLSearchParams(controlSearchParams);

  const routeParams = { ...(userRouteParams ?? {}), ...controlRouteParams };
  const searchParams = { ...userSearchParamsObj, ...controlSearchParamsObj } as URLSearchParams;
  const routeState = controlRouteState ?? userRouteState;

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

  console.log(generatedPath);

  const initialEntry: InitialEntry = { search, state: routeState };
  if (userBrowserPath !== undefined) initialEntry['pathname'] = userBrowserPath;
  if (userBrowserPath === undefined && generatedPath !== '') initialEntry['pathname'] = generatedPath;

  return (
    <DeepRouteMatchesContext.Provider value={deepRouteMatches}>
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path={routePath} element={
            <RouterLogger>
              { children }
            </RouterLogger>
          }>
            { outlet && <Route index element={outlet} /> }
          </Route>
        </Routes>
      </MemoryRouter>
    </DeepRouteMatchesContext.Provider>
  )
}
