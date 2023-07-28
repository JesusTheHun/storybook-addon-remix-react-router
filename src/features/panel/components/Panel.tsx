import React, { useRef, useState } from 'react';
import { AddonPanel } from '@storybook/components';
import { PanelContent, PanelContentProps } from './PanelContent';
import { API, useChannel } from '@storybook/manager-api';
import { EVENTS } from '../../../constants';
import { STORY_CHANGED } from '@storybook/core-events';

interface PanelProps {
  active: boolean;
  api: API;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const eventCount = useRef(0);
  const [navigationEvents, setNavigationEvents] = useState<PanelContentProps['routerEvents']>([]);

  const pushEvent = (event: any) => setNavigationEvents((prev) => [...prev, { ...event, key: eventCount.current++ }]);

  useChannel({
    [EVENTS.ROUTE_MATCHES]: pushEvent,
    [EVENTS.NAVIGATION]: pushEvent,
    [EVENTS.STORY_LOADED]: pushEvent,
    [EVENTS.ACTION_INVOKED]: pushEvent,
    [EVENTS.ACTION_SETTLED]: pushEvent,
    [EVENTS.LOADER_INVOKED]: pushEvent,
    [EVENTS.LOADER_SETTLED]: pushEvent,
    [STORY_CHANGED]: () => setNavigationEvents([]),
  });

  const clear = () => {
    props.api.emit(EVENTS.CLEAR);
    setNavigationEvents([]);
  };

  return (
    <AddonPanel {...props}>
      <PanelContent routerEvents={navigationEvents} onClear={clear} />
    </AddonPanel>
  );
};
