import React, {useEffect, useState} from "react";
import {AddonPanel} from "@storybook/components";
import {PanelContent, PanelContentProps} from "./components/PanelContent";
import {API, useChannel, useStorybookState} from '@storybook/api';
import {EVENTS} from "./constants";
import {STORY_CHANGED} from "@storybook/core-events";

interface PanelProps {
  active: boolean;
  api: API;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const [navigationEvents, setNavigationEvents] = useState<PanelContentProps['navigationEvents']>([]);

  useChannel({
    [EVENTS.NAVIGATION]: (eventData) => {
      setNavigationEvents(prev => [...prev, [EVENTS.NAVIGATION, eventData]]);
    },
    [EVENTS.STORY_LOADED]: (eventData) => {
      setNavigationEvents(prev => [...prev, [EVENTS.STORY_LOADED, eventData]]);
    },
    [STORY_CHANGED]: () => {
      setNavigationEvents([]);
    }
  });

  const clear = () => {
    props.api.emit(EVENTS.CLEAR);
    setNavigationEvents([]);
  }

  return (
    <AddonPanel {...props}>
      <PanelContent navigationEvents={navigationEvents} onClear={clear} />
    </AddonPanel>
  );
};
