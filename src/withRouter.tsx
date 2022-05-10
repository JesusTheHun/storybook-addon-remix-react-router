import React from "react";
import {makeDecorator} from "@storybook/addons";
import {StoryRouter} from "./components/StoryRouter";
import {generateAppUrl} from "./utils";
import {PARAM_KEY} from "./constants";

export const withRouter = makeDecorator({
  name: "withRouter",
  parameterName: PARAM_KEY,
  wrapper: (story, context, {parameters} ) => {

    if (parameters === undefined) {
      return (
        <StoryRouter browserPath={'/'} matchingPath={'/'}>
          {story(context)}
        </StoryRouter>
      )
    }

    const {routePath, routeParams, searchParams} = parameters;

    if (typeof routePath !== 'string') throw new Error("React Router decorator : `path` must be a string");
    if (routeParams !== undefined && typeof routeParams !== 'object') throw new Error("React Router decorator : `params` must be an object with strings as values");
    if (searchParams !== undefined && typeof searchParams !== 'object') throw new Error("React Router decorator : `search` must be an object with strings as values");

    const matchingPath = routePath;
    const browserPath = generateAppUrl(routePath, routeParams, searchParams);

    return (
      <StoryRouter browserPath={browserPath} matchingPath={matchingPath}>
        {story(context)}
      </StoryRouter>
    )
  }
})
