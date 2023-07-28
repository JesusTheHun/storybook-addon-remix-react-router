import { useRef } from 'react';
import { useLocation, useNavigationType, useParams, useSearchParams } from 'react-router-dom';
import { EVENTS } from '../../../constants';
import type { NavigationEvent, NavigationEventName, RouteMatchesData } from '../../panel/types';
import { searchParamsToRecord } from '../../panel/utils';
import { useCurrentUrl } from './useCurrentUrl';
import { useDeepRouteMatches } from './useDeepRouteMatches';

export const useNavigationEventBuilder = () => {
  const eventCount = useRef(0);
  const location = useLocation();
  const params = useParams();
  const [search] = useSearchParams();
  const navigationType = useNavigationType();
  const matches = useDeepRouteMatches();

  const searchParams = searchParamsToRecord(search);
  const currentUrl = useCurrentUrl();

  const matchesData: RouteMatchesData = matches.map((routeMatch) => [routeMatch.route.path, routeMatch.params]);

  const locationData = {
    url: currentUrl,
    path: location.pathname,
    routeParams: params,
    searchParams,
    hash: location.hash,
    routeState: location.state,
    routeMatches: matchesData,
  };

  return (eventName: NavigationEventName): NavigationEvent => {
    const key = `${EVENTS.STORY_LOADED}_${eventCount.current++}`;

    switch (eventName) {
      case EVENTS.STORY_LOADED: {
        return { key, type: eventName, data: locationData };
      }

      case EVENTS.NAVIGATION: {
        return { key, type: eventName, data: { ...locationData, navigationType } };
      }

      case EVENTS.ROUTE_MATCHES: {
        return { key, type: eventName, data: { matches: matchesData } };
      }
    }
  };
};
