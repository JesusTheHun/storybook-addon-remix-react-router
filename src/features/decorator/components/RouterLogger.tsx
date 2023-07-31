import { addons } from '@storybook/preview-api';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Location, Outlet, RouteMatch, useLocation } from 'react-router-dom';

import { EVENTS } from '../../../constants';
import { defer } from '../../../utils/misc';
import { useDeepRouteMatches } from '../hooks/useDeepRouteMatches';
import { useNavigationEventBuilder } from '../hooks/useNavigationEventBuilder';

export const RouterLogger: React.FC = () => {
  const channel = addons.getChannel();
  const location = useLocation();
  const [loadedAt, setLoadedAt] = useState<Location>();
  const [loadedEventEmitted, setLoadedEventEmitted] = useState(false);
  const [lastEmittedRouteMatches, setLastEmittedRouteMatches] = useState<RouteMatch[]>([]);

  const buildEventData = useNavigationEventBuilder();
  const matches = useDeepRouteMatches();

  const storyLoadedEmitted = useRef(defer());

  useLayoutEffect(() => {
    setLoadedAt(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loadedEventEmitted) storyLoadedEmitted.current.resolve();
  }, [loadedEventEmitted]);

  useEffect(() => {
    setLastEmittedRouteMatches(matches);

    const id = setTimeout(() => {
      if (!loadedEventEmitted) {
        setLoadedEventEmitted(true);
        channel.emit(EVENTS.STORY_LOADED, buildEventData(EVENTS.STORY_LOADED));
      }
    }, 0);

    return () => clearTimeout(id);
  }, [buildEventData, channel, loadedEventEmitted, matches]);

  useEffect(() => {
    if (loadedAt !== undefined && loadedAt.key !== location.key) {
      storyLoadedEmitted.current.promise.then(() => {
        channel.emit(EVENTS.NAVIGATION, buildEventData(EVENTS.NAVIGATION));
      });
    }
  }, [buildEventData, channel, loadedAt, location]);

  useEffect(() => {
    if (loadedEventEmitted && matches.length > lastEmittedRouteMatches.length) {
      setLastEmittedRouteMatches(matches);
      channel.emit(EVENTS.ROUTE_MATCHES, buildEventData(EVENTS.ROUTE_MATCHES));
    }
  }, [buildEventData, channel, lastEmittedRouteMatches, loadedEventEmitted, matches]);

  return <Outlet />;
};
