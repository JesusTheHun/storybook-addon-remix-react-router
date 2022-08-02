import {EventData, NavigationEventsValues} from "../typings";
import {EVENTS} from "../constants";
import {useLocation, useNavigationType, useParams, useSearchParams} from "react-router-dom";
import {useCurrentUrl} from "./useCurrentUrl";

export const useCreateEventData = () => {
  const location = useLocation();
  const params = useParams();
  const [search] = useSearchParams();
  const navigationType = useNavigationType();

  const searchParams: Record<string, string> = {};

  search.forEach((value, key) => {
    searchParams[key] = value;
  })

  const currentUrl = useCurrentUrl();

  return (eventName: NavigationEventsValues) => {
    switch (eventName) {
      case EVENTS.STORY_LOADED: {
        const eventData: EventData[typeof eventName] = {
          url: currentUrl,
          path: location.pathname,
          routeParams: params,
          searchParams,
          hash: location.hash,
          routeState: location.state,
          key: location.key,
        };

        return eventData;
      }

      case EVENTS.NAVIGATION: {
        const eventData: EventData[typeof eventName] = {
          url: currentUrl,
          path: location.pathname,
          routeParams: params,
          searchParams,
          hash: location.hash,
          routeState: location.state,
          key: location.key,
          navigationType,
        };

        return eventData;
      }
    }
  }
}
