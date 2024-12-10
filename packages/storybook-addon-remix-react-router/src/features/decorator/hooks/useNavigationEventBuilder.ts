import { useRef } from 'react';
import { useLocation, useNavigationType, useParams, useSearchParams } from 'react-router';
import { ValuesType } from 'utility-types';
import { EVENTS } from '../../../constants';
import type { RouterNavigationEvent, RouterNavigationEventName, RouteMatchesData } from '../../panel/types';

import { searchParamsToRecord } from '../utils/searchParamsToRecord';
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

  const matchesData: RouteMatchesData = matches.map((routeMatch) => {
    const match: ValuesType<RouteMatchesData> = {
      path: routeMatch.route.path,
    };

    if (Object.keys(routeMatch.params).length > 0) {
      match.params = routeMatch.params;
    }

    return match;
  });

  const locationData = {
    url: currentUrl,
    path: location.pathname,
    routeParams: params,
    searchParams,
    hash: location.hash,
    routeState: location.state,
    routeMatches: matchesData,
  };

  return (eventName: RouterNavigationEventName): RouterNavigationEvent => {
    eventCount.current++;
    const key = `${eventName}_${eventCount.current}`;

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
