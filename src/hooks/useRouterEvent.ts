import {EventData, NavigationEventsValues, RouteMatchesData, RouterEvent} from "../typings";
import {EVENTS} from "../constants";
import {useLocation, useNavigationType, useParams, useSearchParams} from "react-router-dom";
import {useCurrentUrl} from "./useCurrentUrl";
import {useDeepRouteMatches} from "./useDeepRouteMatches";

export const useRouterEvent = () => {
  const location = useLocation();
  const params = useParams();
  const [search] = useSearchParams();
  const navigationType = useNavigationType();
  const matches = useDeepRouteMatches();

  const searchParams: Record<string, string> = {};

  search.forEach((value, key) => {
    searchParams[key] = value;
  })

  const currentUrl = useCurrentUrl();

  const matchesData: RouteMatchesData = matches.map(routeMatch => ([
    routeMatch.route.path,
    routeMatch.params,
  ]));

  return (eventName: NavigationEventsValues): RouterEvent<any> => {
    switch (eventName) {
      case EVENTS.STORY_LOADED: {
        const eventData: EventData[typeof eventName] = {
          url: currentUrl,
          path: location.pathname,
          routeParams: params,
          searchParams,
          routeMatches: matchesData,
          hash: location.hash,
          routeState: location.state,
        };

        return {
          key: location.key,
          type: EVENTS.STORY_LOADED,
          data: eventData
        };
      }

      case EVENTS.NAVIGATION: {
        const eventData: EventData[typeof eventName] = {
          url: currentUrl,
          path: location.pathname,
          routeParams: params,
          searchParams,
          hash: location.hash,
          routeState: location.state,
          routeMatches: matchesData,
          navigationType,
        };

        return {
          key: location.key,
          type: EVENTS.NAVIGATION,
          data: eventData
        };
      }

      case EVENTS.ROUTE_MATCHES: {
        return {
          key: `matches-${location.key}-${matchesData.length}`,
          type: EVENTS.ROUTE_MATCHES,
          data: { matches: matchesData }
        };
      }
    }
  }
}
