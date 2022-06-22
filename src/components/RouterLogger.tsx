import React, {useEffect, useLayoutEffect, useState} from "react";
import {Location, useLocation} from "react-router-dom";
import { addons } from '@storybook/addons';

import {EVENTS} from "../constants";
import {useCreateEventData} from "../hooks/useEventData";
import {FCC} from "../fixes";

export const RouterLogger: FCC = ({ children }) => {
  const location = useLocation();
  const [loadedAt, setLoadedAt] = useState<Location>();

  const createEventData = useCreateEventData();

  const channel = addons.getChannel();

  useLayoutEffect(() => {
    setLoadedAt(location);
    if (loadedAt === undefined) {
      channel.emit(EVENTS.STORY_LOADED, createEventData(EVENTS.STORY_LOADED));
    }
  });

  useEffect(() => {
    if (loadedAt !== undefined && loadedAt.key !== location.key) {
      channel.emit(EVENTS.NAVIGATION, createEventData(EVENTS.NAVIGATION));
    }
  }, [location]);

  return <>{children}</>;
}
