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
      const [actionsCount, setActionsCount] = useState(0);
      const onEvent = () => setActionsCount((previous) => previous + 1);
      const onChange = () => setActionsCount(0);

      useEffect(() => {
        api.on(EVENTS.NAVIGATION, onEvent);
        api.on(STORY_CHANGED, onChange);
        api.on(EVENTS.CLEAR, onChange);

        return () => {
          api.off(EVENTS.NAVIGATION, onEvent);
          api.off(STORY_CHANGED, onChange);
          api.off(EVENTS.CLEAR, onChange);
        };
      });

      const suffix = actionsCount === 0 ? '' : ` (${actionsCount})`;
      return `React Router${suffix}`;
    },
    match: ({ viewMode }) => viewMode === "story",
    render: ({ active, key }) => <Panel active={active} key={key} api={api} />,
  });
});
