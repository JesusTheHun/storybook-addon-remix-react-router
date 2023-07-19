import { EVENTS } from '../constants';
import { ActionFunctionArgs, LoaderFunctionArgs, NavigationType, RouteMatch, useParams } from 'react-router-dom';
import { getHumanReadableBody } from '../utils/utils';
import { PromiseType } from 'utility-types';

export type AddonEvents = typeof EVENTS;
export type RouterEvents = Omit<AddonEvents, 'CLEAR'>;

export type NavigationEventKey = 'NAVIGATION' | 'STORY_LOADED' | 'ROUTE_MATCHES';
export type DataEventKey = 'ACTION_INVOKED' | 'ACTION_SETTLED' | 'LOADER_INVOKED' | 'LOADER_SETTLED';

export type NavigationEventName = RouterEvents[NavigationEventKey];
export type DataEventName = RouterEvents[DataEventKey];

export type NavigationEvents = Pick<RouterEvents, NavigationEventKey>;
export type DataEvents = Pick<RouterEvents, DataEventKey>;

export type RouterEventData = NavigationEventData & DataEventData;

export type RouterEvent = {
  [Key in keyof RouterEvents]: {
    key: string;
    type: RouterEvents[Key];
    data: RouterEventData[RouterEvents[Key]];
  };
}[keyof RouterEvents];

export type NavigationEvent = Extract<RouterEvent, { type: NavigationEventName }>;
export type DataEvent = Extract<RouterEvent, { type: DataEventName }>;

export type RouteMatchesData = Array<[RouteMatch['route']['path'], RouteMatch['params']]>;

export type EventDataStoryLoaded = {
  url: string;
  path: string;
  hash: string;
  routeParams: ReturnType<typeof useParams>;
  routeState: unknown;
  searchParams: Record<string, string | string[]>;
  routeMatches: RouteMatchesData;
};

export type EventDataNavigation = {
  url: string;
  navigationType: NavigationType;
  path: string;
  hash: string;
  routeParams: ReturnType<typeof useParams>;
  searchParams: Record<string, string | string[]>;
  routeState: unknown;
  routeMatches: RouteMatchesData;
};

export type EventDataRouteMatches = {
  matches: RouteMatchesData;
};

export type DataEventArgs = {
  [EVENTS.ACTION_INVOKED]: ActionFunctionArgs;
  [EVENTS.ACTION_SETTLED]: unknown;
  [EVENTS.LOADER_INVOKED]: LoaderFunctionArgs;
  [EVENTS.LOADER_SETTLED]: unknown;
};

export type RequestSummary = {
  url: ActionFunctionArgs['request']['url'];
  method: ActionFunctionArgs['request']['method'];
  body: PromiseType<ReturnType<typeof getHumanReadableBody>>;
};

export type DataEventData = {
  [EVENTS.ACTION_INVOKED]: Pick<ActionFunctionArgs, 'params' | 'context'> & {
    request: RequestSummary;
  };
  [EVENTS.ACTION_SETTLED]: DataEventArgs[DataEvents['ACTION_SETTLED']];
  [EVENTS.LOADER_INVOKED]: Pick<LoaderFunctionArgs, 'params' | 'context'> & {
    request: RequestSummary;
  };
  [EVENTS.LOADER_SETTLED]: DataEventArgs[DataEvents['LOADER_SETTLED']];
};

export type NavigationEventData = {
  [EVENTS.NAVIGATION]: EventDataNavigation;
  [EVENTS.STORY_LOADED]: EventDataStoryLoaded;
  [EVENTS.ROUTE_MATCHES]: EventDataRouteMatches;
};
