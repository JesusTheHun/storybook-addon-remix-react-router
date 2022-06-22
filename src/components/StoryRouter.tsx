import React from "react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {RouterLogger} from "./RouterLogger";
import {FCC} from "../fixes";

export type StoryRouterProps = { browserPath: string; matchingPath?: string };

export const StoryRouter: FCC<StoryRouterProps> = ({ children, browserPath, matchingPath }) => {
  const localMatchingPath = matchingPath ? matchingPath : browserPath;

  return (
    <MemoryRouter initialEntries={[browserPath]}>
      <Routes>
        <Route path={localMatchingPath} element={(
          <RouterLogger>
            {children}
          </RouterLogger>
        )} />
      </Routes>
    </MemoryRouter>
  )
}
