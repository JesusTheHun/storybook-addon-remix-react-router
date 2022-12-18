import {EVENTS} from "./constants";
import {NavigationType, RouteMatch} from "react-router-dom";

declare module "global";

export type AddonEvents = typeof EVENTS;
export type AddonEventsKeys = keyof AddonEvents;
export type NavigationEventsKeys = Exclude<AddonEventsKeys, 'CLEAR' | 'PUSH' | 'REPLACE'>;
export type NavigationEventsValues = AddonEvents[NavigationEventsKeys];

export type RouteMatchesData = Array<[RouteMatch['route']['path'], RouteMatch['params']]>;

export type RouterEvent<T extends NavigationEventsKeys = NavigationEventsKeys> = {
  key: string;
  type: AddonEvents[T];
  data: EventData[AddonEvents[T]];
}

export type EventDataStoryLoaded = {
  url: string;
  path: string;
  hash: string;
  routeParams: Record<string, string>;
  routeState: unknown;
  searchParams: Record<string, string>;
  routeMatches: RouteMatchesData;
}

export type EventDataNavigation = {
  url: string;
  navigationType: NavigationType;
  path: string;
  hash: string;
  routeParams: Record<string, string>;
  searchParams: Record<string, string>;
  routeState: unknown;
  routeMatches: RouteMatchesData;
}

export type EventDataRouteMatches = {
  matches: RouteMatchesData;
}

export type EventData = {
  [EVENTS.NAVIGATION]: EventDataNavigation;
  [EVENTS.STORY_LOADED]: EventDataStoryLoaded;
  [EVENTS.ROUTE_MATCHES]: EventDataRouteMatches;
};

export type WithRouterParameters = Partial<{
  routePath: string;
  routeParams: Record<string, string>;
  searchParams: Record<string, string>;
}>
