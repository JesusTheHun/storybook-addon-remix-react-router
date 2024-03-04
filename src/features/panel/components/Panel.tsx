import { AddonPanel } from '@storybook/components';
import { STORY_CHANGED } from '@storybook/core-events';
import { API, useChannel } from '@storybook/manager-api';
import React, { useState } from 'react';
import { EVENTS } from '../../../constants';
import { useAddonVersions } from '../hooks/useAddonVersions';
import { RouterEvent } from '../types';
import { InformationBanner } from './InformationBanner';
import { PanelContent } from './PanelContent';

interface PanelProps {
  active: boolean;
  api: API;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const [navigationEvents, setNavigationEvents] = useState<RouterEvent[]>([]);
  const { latestAddonVersion, addonUpdateAvailable } = useAddonVersions();

  const pushEvent = (event: RouterEvent) => {
    setNavigationEvents((prev) => [...prev, event]);
  };

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
      <InformationBanner>
        {addonUpdateAvailable && (
          <>
            Version {latestAddonVersion} is now available !{' '}
            <a
              href={`https://github.com/JesusTheHun/storybook-addon-react-router-v6/releases/tag/v${latestAddonVersion}`}
            >
              Changelog
            </a>
            . <br />
          </>
        )}
        The addon will be renamed <span style={{ fontStyle: 'italic' }}>storybook-addon-remix-react-router</span> for
        its next major release, supporting Storybook 8.{' '}
        <a href={'https://github.com/JesusTheHun/storybook-addon-remix-react-router/issues/63'}>See the announcement</a>
        .
      </InformationBanner>
      <PanelContent routerEvents={navigationEvents} onClear={clear} />
    </AddonPanel>
  );
};
