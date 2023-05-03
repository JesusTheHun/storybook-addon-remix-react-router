import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {Location, RouteMatch, useLocation} from "react-router-dom";
import {addons} from '@storybook/preview-api';

import {EVENTS} from "../constants";
import {useNavigationEventBuilder} from "../hooks/useNavigationEventBuilder";
import {FCC} from "../fixes";
import {useDeepRouteMatches} from "../hooks/useDeepRouteMatches";
import {defer} from "../utils";

export const RouterLogger: FCC = ({ children }) => {
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
  });

  useEffect(() => {
    if (loadedEventEmitted) storyLoadedEmitted.current.resolve();
  }, [loadedEventEmitted]);

  useEffect(() => {
    setLastEmittedRouteMatches(matches);

    const id = setTimeout(() => {
      if (!loadedEventEmitted) {
        setLoadedEventEmitted(true);
        channel.emit(EVENTS.STORY_LOADED, buildEventData(EVENTS.STORY_LOADED))
      }
    }, 0);

    return () => clearTimeout(id);
  }, [loadedEventEmitted, matches]);

  useEffect(() => {
    if (loadedAt !== undefined && loadedAt.key !== location.key) {
      storyLoadedEmitted.current.promise.then(() => {
        channel.emit(EVENTS.NAVIGATION, buildEventData(EVENTS.NAVIGATION));
      })
    }
  }, [location]);

  useEffect(() => {
    if (loadedEventEmitted && (matches.length > lastEmittedRouteMatches.length)) {
      setLastEmittedRouteMatches(matches);
      channel.emit(EVENTS.ROUTE_MATCHES, buildEventData(EVENTS.ROUTE_MATCHES));
    }
  }, [matches])

  return <>{children}</>;
}
