import {EventData, NavigationEventsValues} from "../typings";
import {EVENTS} from "../constants";
import {UNSAFE_RouteContext, useLocation, useNavigationType, useParams, useSearchParams} from "react-router-dom";
import {useContext} from "react";

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
          url: `${location.pathname}${location.search}${location.hash}`,
          path: location.pathname,
          routeParams: params,
          searchParams,
          hash: location.hash,
          routeState: location.state,
          matchedRoutes : routesContext.matches,
          key: location.key,
        };

        return eventData;
      }

      case EVENTS.NAVIGATION: {
        const eventData: EventData[typeof eventName] = {
          url: `${location.pathname}${location.search}${location.hash}`,
          path: location.pathname,
          routeParams: params,
          searchParams,
          hash: location.hash,
          routeState: location.state,
          matchedRoutes : routesContext.matches,
          key: location.key,
          navigationType,
        };

        return eventData;
      }
    }
  }
}
