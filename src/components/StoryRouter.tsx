import React from "react";
import {MemoryRouter, Route, Routes, useLocation} from "react-router-dom";
import {RouterLogger} from "./RouterLogger";
import {FCC} from "../fixes";

/** inject routeState to location object */
const WithRouteState: FCC<{ routeState?: unknown }> = (props) => {
  const { children, routeState } = props;
  const location = useLocation()
  location.state = routeState ?? null;
  return <>{children}</>
}

export type StoryRouterProps = { browserPath: string; matchingPath?: string; routeState?: unknown };

export const StoryRouter: FCC<StoryRouterProps> = ({ children, browserPath, matchingPath, routeState }) => {
  const localMatchingPath = matchingPath ? matchingPath : browserPath;

  return (
    <MemoryRouter initialEntries={[browserPath]}>
      <Routes>
        <Route path={localMatchingPath} element={(
          <WithRouteState routeState={routeState}>
            <RouterLogger>
              {children}
            </RouterLogger>
          </WithRouteState>
        )} />
      </Routes>
    </MemoryRouter>
  )
}
