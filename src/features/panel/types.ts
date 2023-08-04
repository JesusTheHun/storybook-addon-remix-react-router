import { ActionFunctionArgs, LoaderFunctionArgs, NavigationType, RouteMatch, useParams } from 'react-router-dom';
import { PromiseType } from 'utility-types';
import { EVENTS } from '../../constants';
import { getHumanReadableBody } from '../decorator/utils/getHumanReadableBody';

export type AddonEvents = typeof EVENTS;

///////////////////
// Router Events //
///////////////////
export type RouterEvents = Omit<AddonEvents, 'CLEAR' | 'NEW_VERSION'>;

export type RouterNavigationEventKey = 'NAVIGATION' | 'STORY_LOADED' | 'ROUTE_MATCHES';
export type RouterDataEventKey = 'ACTION_INVOKED' | 'ACTION_SETTLED' | 'LOADER_INVOKED' | 'LOADER_SETTLED';

export type RouterNavigationEventName = RouterEvents[RouterNavigationEventKey];
export type RouterDataEventName = RouterEvents[RouterDataEventKey];

export type RouterNavigationEvents = Pick<RouterEvents, RouterNavigationEventKey>;
export type RouterDataEvents = Pick<RouterEvents, RouterDataEventKey>;

export type RouterEventData = RouterLocationEventData & RouterDataEventData;

export type RouterEvent = {
  [Key in keyof RouterEvents]: {
    key: string;
    type: RouterEvents[Key];
    data: RouterEventData[RouterEvents[Key]];
  };
}[keyof RouterEvents];

export type RouterNavigationEvent = Extract<RouterEvent, { type: RouterNavigationEventName }>;
export type RouterDataEvent = Extract<RouterEvent, { type: RouterDataEventName }>;

export type RouteMatchesData = Array<{ path: RouteMatch['route']['path']; params?: RouteMatch['params'] }>;

export type RouterStoryLoadedEventData = {
  url: string;
  path: string;
  hash: string;
  routeParams: ReturnType<typeof useParams>;
  routeState: unknown;
  searchParams: Record<string, string | string[]>;
  routeMatches: RouteMatchesData;
};

export type RouterNavigationEventData = {
  url: string;
  navigationType: NavigationType;
  path: string;
  hash: string;
  routeParams: ReturnType<typeof useParams>;
  searchParams: Record<string, string | string[]>;
  routeState: unknown;
  routeMatches: RouteMatchesData;
};

export type RouterRouteMatchesEventData = {
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

export type RouterDataEventData = {
  [EVENTS.ACTION_INVOKED]: Pick<ActionFunctionArgs, 'params' | 'context'> & {
    request: RequestSummary;
  };
  [EVENTS.ACTION_SETTLED]: DataEventArgs[RouterDataEvents['ACTION_SETTLED']];
  [EVENTS.LOADER_INVOKED]: Pick<LoaderFunctionArgs, 'params' | 'context'> & {
    request: RequestSummary;
  };
  [EVENTS.LOADER_SETTLED]: DataEventArgs[RouterDataEvents['LOADER_SETTLED']];
};

export type RouterLocationEventData = {
  [EVENTS.NAVIGATION]: RouterNavigationEventData;
  [EVENTS.STORY_LOADED]: RouterStoryLoadedEventData;
  [EVENTS.ROUTE_MATCHES]: RouterRouteMatchesEventData;
};
