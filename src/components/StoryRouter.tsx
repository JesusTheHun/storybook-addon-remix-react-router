import React from "react";
import {generatePath, MemoryRouter, Route, Routes} from "react-router-dom";
import {RouterLogger} from "./RouterLogger";
import {FCC} from "../fixes";

export type StoryRouterProps = {
  routePath?: string;
  routeParams?: Record<string, string>;
  searchParams?: ConstructorParameters<typeof URLSearchParams>[0];
  routeState?: unknown;
};

export const StoryRouter: FCC<StoryRouterProps> = ({ children, routePath, routeParams, searchParams, routeState }) => {
  const browserPath = generatePath(routePath, routeParams);
  const queryString = new URLSearchParams(searchParams).toString();
  const search = queryString.length > 0 ? `?${queryString}` : '';

  return (
    <MemoryRouter initialEntries={[{ pathname: browserPath, search, state: routeState }]}>
      <Routes>
        <Route path={routePath} element={
          <RouterLogger>
            {children}
          </RouterLogger>
        } />
      </Routes>
    </MemoryRouter>
  )
}
