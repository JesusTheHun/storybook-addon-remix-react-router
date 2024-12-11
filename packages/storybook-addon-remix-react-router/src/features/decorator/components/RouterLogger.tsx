import { addons } from '@storybook/preview-api';
import React, { useRef } from 'react';
import { useLocation, RouteMatch } from 'react-router';

import { EVENTS } from '../../../constants';
import { useDeepRouteMatches } from '../hooks/useDeepRouteMatches';
import { useNavigationEventBuilder } from '../hooks/useNavigationEventBuilder';
import { useStory } from '../hooks/useStory';

export function RouterLogger() {
  const { renderStory, storyContext } = useStory();
  const channel = addons.getChannel();
  const location = useLocation();
  const matches = useDeepRouteMatches();

  const buildEventData = useNavigationEventBuilder();

  const storyLoadedEmittedLocationKeyRef = useRef<string>();
  const lastNavigationEventLocationKeyRef = useRef<string>();
  const lastRouteMatchesRef = useRef<RouteMatch[]>();

  const storyLoaded = storyLoadedEmittedLocationKeyRef.current !== undefined;
  const shouldEmitNavigationEvents = storyLoaded && location.key !== storyLoadedEmittedLocationKeyRef.current;

  if (shouldEmitNavigationEvents && lastNavigationEventLocationKeyRef.current !== location.key) {
    channel.emit(EVENTS.NAVIGATION, buildEventData(EVENTS.NAVIGATION));
    lastNavigationEventLocationKeyRef.current = location.key;
  }

  if (shouldEmitNavigationEvents && matches.length > 0 && matches !== lastRouteMatchesRef.current) {
    channel.emit(EVENTS.ROUTE_MATCHES, buildEventData(EVENTS.ROUTE_MATCHES));
  }

  if (!storyLoaded && matches.length > 0) {
    channel.emit(EVENTS.STORY_LOADED, buildEventData(EVENTS.STORY_LOADED));
    storyLoadedEmittedLocationKeyRef.current = location.key;
    lastRouteMatchesRef.current = matches;
  }

  lastRouteMatchesRef.current = matches;

  return <>{renderStory(storyContext)}</>;
}

RouterLogger.displayName = 'RouterLogger';
