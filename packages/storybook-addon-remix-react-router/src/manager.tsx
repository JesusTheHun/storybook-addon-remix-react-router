import { addons, types } from 'storybook/manager-api';
import React from 'react';

import { ADDON_ID, PANEL_ID, PARAM_KEY } from './constants';
import { Panel } from './features/panel/components/Panel';
import { PanelTitle } from './features/panel/components/PanelTitle';

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    paramKey: PARAM_KEY,
    title: <PanelTitle />,
    match: ({ viewMode }) => viewMode === 'story',
    render: ({ active }) => <Panel active={active || false} api={api} key={ADDON_ID} />,
  });
});
