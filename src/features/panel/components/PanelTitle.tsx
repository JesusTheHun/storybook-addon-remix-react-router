import { STORY_CHANGED } from '@storybook/core-events';
import { ManagerContext } from '@storybook/manager-api';
import React, { useContext, useEffect, useState } from 'react';
import { EVENTS } from '../../../constants';
import { useAddonVersions } from '../hooks/useAddonVersions';

export function PanelTitle() {
  const { api } = useContext(ManagerContext);
  const { addonUpdateAvailable } = useAddonVersions();

  const [badgeCount, setBadgeCount] = useState(0);
  const incrementBadgeCount = () => setBadgeCount((previous) => previous + 1);
  const clearBadgeCount = () => setBadgeCount(0);

  useEffect(() => {
    api.on(STORY_CHANGED, clearBadgeCount);
    api.on(EVENTS.ROUTE_MATCHES, incrementBadgeCount);
    api.on(EVENTS.NAVIGATION, incrementBadgeCount);
    api.on(EVENTS.ACTION_INVOKED, incrementBadgeCount);
    api.on(EVENTS.ACTION_SETTLED, incrementBadgeCount);
    api.on(EVENTS.LOADER_INVOKED, incrementBadgeCount);
    api.on(EVENTS.LOADER_SETTLED, incrementBadgeCount);
    api.on(EVENTS.CLEAR, clearBadgeCount);

    return () => {
      api.off(STORY_CHANGED, clearBadgeCount);
      api.off(EVENTS.ROUTE_MATCHES, incrementBadgeCount);
      api.off(EVENTS.NAVIGATION, incrementBadgeCount);
      api.off(EVENTS.ACTION_INVOKED, incrementBadgeCount);
      api.off(EVENTS.ACTION_SETTLED, incrementBadgeCount);
      api.off(EVENTS.LOADER_INVOKED, incrementBadgeCount);
      api.off(EVENTS.LOADER_SETTLED, incrementBadgeCount);
      api.off(EVENTS.CLEAR, clearBadgeCount);
    };
  }, [api]);

  const suffixes: string[] = [];

  if (addonUpdateAvailable) suffixes.push('⚡️');
  if (badgeCount) suffixes.push(`(${badgeCount})`);

  return <>React Router {suffixes.join(' ')}</>;
}
