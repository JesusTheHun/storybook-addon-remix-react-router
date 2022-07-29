import {EVENTS} from "./constants";
import {RouteMatch, NavigationType} from "react-router-dom";

declare module "global";

export type AddonEvents = typeof EVENTS;
export type AddonEventsKeys = keyof AddonEvents;
export type NavigationEventsKeys = Exclude<AddonEventsKeys, 'CLEAR'>;
export type NavigationEventsValues = AddonEvents[NavigationEventsKeys];

export type BaseEventData = {
  key: string;
}

export type EventDataStoryLoaded = BaseEventData & {
  url: string;
  path: string;
  hash: string;
  routeParams: Record<string, string>;
  routeState: unknown;
  searchParams: Record<string, string>;
  matchedRoutes: RouteMatch[];
}

export type EventDataNavigation = BaseEventData & {
  url: string;
  navigationType: NavigationType;
  path: string;
  hash: string;
  routeParams: Record<string, string>;
  searchParams: Record<string, string>;
  routeState: unknown;
  matchedRoutes: RouteMatch[];
}

export type EventData = {
  [EVENTS.NAVIGATION]: EventDataNavigation;
  [EVENTS.STORY_LOADED]: EventDataStoryLoaded;
};

export type WithRouterParameters = Partial<{
  routePath: string;
  routeParams: Record<string, string>;
  searchParams: Record<string, string>;
}>
