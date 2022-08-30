import React, {useEffect, useLayoutEffect, useState} from "react";
import {Location, RouteMatch, useLocation} from "react-router-dom";
import {addons} from '@storybook/addons';

import {EVENTS} from "../constants";
import {useRouterEvent} from "../hooks/useRouterEvent";
import {FCC} from "../fixes";
import {useDeepRouteMatches} from "../hooks/useDeepRouteMatches";

export const RouterLogger: FCC = ({ children }) => {
  const channel = addons.getChannel();
  const location = useLocation();
  const [loadedAt, setLoadedAt] = useState<Location>();
  const [loadedEventEmitted, setLoadedEventEmitted] = useState(false);
  const [lastEmittedRouteMatches, setLastEmittedRouteMatches] = useState<RouteMatch[]>([]);

  const createEventData = useRouterEvent();
  const matches = useDeepRouteMatches();

  useLayoutEffect(() => {
    setLoadedAt(location);
  });

  useEffect(() => {
    setLastEmittedRouteMatches(matches);

    const id = setTimeout(() => {
      if (!loadedEventEmitted) {
        setLoadedEventEmitted(true);
        channel.emit(EVENTS.STORY_LOADED, createEventData(EVENTS.STORY_LOADED))
      }
    }, 0);

    return () => clearTimeout(id);
  }, [loadedEventEmitted, matches]);

  useEffect(() => {
    if (loadedAt !== undefined && loadedAt.key !== location.key) {
      channel.emit(EVENTS.NAVIGATION, createEventData(EVENTS.NAVIGATION));
    }
  }, [location]);

  useEffect(() => {
    if (loadedEventEmitted && (matches.length > lastEmittedRouteMatches.length)) {
      setLastEmittedRouteMatches(matches);
      channel.emit(EVENTS.ROUTE_MATCHES, createEventData(EVENTS.ROUTE_MATCHES));
    }
  }, [matches])

  return <>{children}</>;
}
