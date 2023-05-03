import React from "react";
import {makeDecorator} from "@storybook/preview-api";
import {StoryRouteTree} from "./components/StoryRouteTree";
import {PARAM_KEY} from "./constants";

export const withRouter = makeDecorator({
  name: "withRouter",
  parameterName: PARAM_KEY,
  wrapper: (story: (...args: any[]) => unknown, context, {parameters = {}} ) => {
    const {
      routePath = '*',
      routeParams,
      routeState,
      routeHandle,
      searchParams,
      outlet,
      browserPath,
      loader,
      action,
      errorElement,
      hydrationData,
      shouldRevalidate,
    } = parameters;

    if (typeof routePath !== 'string') throw new Error("React Router decorator : `path` must be a string");
    if (routeParams !== undefined && typeof routeParams !== 'object') throw new Error("React Router decorator : `params` must be an object with strings as values");
    if (searchParams !== undefined && typeof searchParams !== 'object') throw new Error("React Router decorator : `search` must be an object with strings as values");

    return (
      <StoryRouteTree
        browserPath={browserPath}
        routePath={routePath}
        routeParams={routeParams}
        searchParams={searchParams}
        routeState={routeState}
        routeHandle={routeHandle}
        outlet={outlet}
        loader={loader}
        action={action}
        errorElement={errorElement}
        hydrationData={hydrationData}
        shouldRevalidate={shouldRevalidate}
      >
        {story(context) as React.ReactNode}
      </StoryRouteTree>
    )
  }
})
