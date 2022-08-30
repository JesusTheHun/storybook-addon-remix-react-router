import React from "react";
import {makeDecorator} from "@storybook/addons";
import {StoryRouter} from "./components/StoryRouter";
import {PARAM_KEY} from "./constants";

export const withRouter = makeDecorator({
  name: "withRouter",
  parameterName: PARAM_KEY,
  wrapper: (story: (...args: any[]) => React.ReactNode, context, {parameters = {}} ) => {
    const {
      routePath = '*',
      routeParams,
      routeState,
      searchParams,
      outlet,
      browserPath
    } = parameters;

    if (typeof routePath !== 'string') throw new Error("React Router decorator : `path` must be a string");
    if (routeParams !== undefined && typeof routeParams !== 'object') throw new Error("React Router decorator : `params` must be an object with strings as values");
    if (searchParams !== undefined && typeof searchParams !== 'object') throw new Error("React Router decorator : `search` must be an object with strings as values");

    return (
      <StoryRouter
        browserPath={browserPath}
        routePath={routePath}
        routeParams={routeParams}
        searchParams={searchParams}
        routeState={routeState}
        outlet={outlet}
      >
        {story(context)}
      </StoryRouter>
    )
  }
})
