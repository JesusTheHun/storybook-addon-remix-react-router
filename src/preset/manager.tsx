import React from "react";

import {addons, types} from "@storybook/addons";

import {ADDON_ID, EVENTS, PANEL_ID, PARAM_KEY} from "../constants";
import {Panel} from "../Panel";
import {useEffect, useState} from "react";
import { STORY_CHANGED } from "@storybook/core-events";

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    paramKey: PARAM_KEY,
    title: () => {
      const [badgeCount, setBadgeCount] = useState(0);
      const incrementBadgeCount = () => setBadgeCount((previous) => previous + 1);
      const clearBadgeCount = () => setBadgeCount(0);

      useEffect(() => {
        api.on(EVENTS.NAVIGATION, incrementBadgeCount);
        api.on(EVENTS.ROUTE_MATCHES, incrementBadgeCount);
        api.on(STORY_CHANGED, clearBadgeCount);
        api.on(EVENTS.CLEAR, clearBadgeCount);

        return () => {
          api.off(EVENTS.NAVIGATION, incrementBadgeCount);
          api.off(EVENTS.ROUTE_MATCHES, incrementBadgeCount);
          api.off(STORY_CHANGED, clearBadgeCount);
          api.off(EVENTS.CLEAR, clearBadgeCount);
        };
      });

      const suffix = badgeCount === 0 ? '' : ` (${badgeCount})`;
      return `React Router${suffix}`;
    },
    match: ({ viewMode }) => viewMode === "story",
    render: ({ active, key }) => <Panel active={active} key={key} api={api} />,
  });
});
