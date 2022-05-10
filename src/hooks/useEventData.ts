import {EventData, NavigationEventsValues} from "../typings";
import {EVENTS} from "../constants";
import {UNSAFE_RouteContext, useLocation, useNavigationType, useParams, useSearchParams} from "react-router-dom";
import {useContext} from "react";
import {generateAppUrl} from "../utils";

export const useCreateEventData = () => {
  const location = useLocation();
  const params = useParams();
  const [search] = useSearchParams();
  const routesContext = useContext(UNSAFE_RouteContext);
  const navigationType = useNavigationType();

  const searchParams: Record<string, string> = {};

  search.forEach((value, key) => {
    searchParams[key] = value;
  })

  return (eventName: NavigationEventsValues) => {
    switch (eventName) {
      case EVENTS.STORY_LOADED: {
        const eventData: EventData[typeof eventName] = {
          path: location.pathname,
          routeParams: params,
          searchParams,
          hash: location.hash,
          url: generateAppUrl(location.pathname, params, searchParams, location.hash),
          matchedRoutes : routesContext.matches,
          key: location.key,
        };

        return eventData;
      }

      case EVENTS.NAVIGATION: {
        const eventData: EventData[typeof eventName] = {
          url: generateAppUrl(location.pathname, params, searchParams, location.hash),
          navigationType,
          key: location.key,
          path: location.pathname,
          routeParams: params,
          searchParams,
          hash: location.hash,
          matchedRoutes : routesContext.matches,
        };

        return eventData;
      }
    }
  }
}
