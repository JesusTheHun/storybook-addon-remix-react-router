import React, {useState} from "react";
import {AddonPanel} from "@storybook/components";
import {PanelContent, PanelContentProps} from "./components/PanelContent";
import {API, ArgTypes, useChannel} from '@storybook/api';
import {
  ARGTYPE_FILLER,
  ARGTYPE_ROUTEPARAMS_PREFIX,
  ARGTYPE_ROUTESTATE,
  ARGTYPE_SEARCHPARAMS_PREFIX,
  EVENTS
} from "./constants";
import {STORY_CHANGED} from "@storybook/core-events";
import {RouterEvent} from "./typings";

interface PanelProps {
  active: boolean;
  api: API;
}

export const Panel: React.FC<PanelProps> = ({ active, api }) => {
  const [navigationEvents, setNavigationEvents] = useState<PanelContentProps['navigationEvents']>([]);

  useChannel({
    [EVENTS.ROUTE_MATCHES]: (event) => {
      setNavigationEvents(prev => [...prev, event]);
    },
    [EVENTS.NAVIGATION]: (event) => {
      setNavigationEvents(prev => [...prev, event]);
    },
    [EVENTS.STORY_LOADED]: (event: RouterEvent) => {
      setNavigationEvents(prev => [...prev, event]);
      injectRouterControls(api);
    },
    [STORY_CHANGED]: () => {
      setNavigationEvents([]);
    },
  });

  const clear = () => {
    api.emit(EVENTS.CLEAR);
    setNavigationEvents([]);
  }

  return (
    <AddonPanel active={active}>
      <PanelContent navigationEvents={navigationEvents} onClear={clear} />
    </AddonPanel>
  );
};

const injectRouterControls = (api: API) => {
  const storyData = api.getCurrentStoryData();

  if (storyData !== undefined && storyData.type === 'story') {
    const { parameters, argTypes } = storyData;

    if (parameters.reactRouter === undefined) return;

    const { reactRouter } = parameters;
    const { routeParams, searchParams } = reactRouter;

    const routeParamsControlEntries = Object.entries(routeParams ?? {}).map(([routeParamName, routeParamValue]) => ([
      `${ARGTYPE_ROUTEPARAMS_PREFIX}.${routeParamName}`,
      {
        name: routeParamName,
        defaultValue: routeParamValue,
        control: { type: 'text' },
      }
    ]));

    const searchParamsControlEntries = Object.entries(searchParams ?? {}).map(([searchParamName, searchParamValue]) => ([
      `${ARGTYPE_SEARCHPARAMS_PREFIX}.${searchParamName}`,
      {
        name: searchParamName,
        defaultValue: searchParamValue,
        control: { type: 'text' },
      }
    ]));

    const reactRouterArgTypes: ArgTypes = {};

    if (routeParamsControlEntries.length > 0) {
      reactRouterArgTypes[ARGTYPE_ROUTEPARAMS_PREFIX] = { name: 'React Router RouteParams :' };
      Object.assign(reactRouterArgTypes, Object.fromEntries(routeParamsControlEntries));
    }

    if (searchParamsControlEntries.length > 0) {
      reactRouterArgTypes[ARGTYPE_SEARCHPARAMS_PREFIX] = { name: 'React Router SearchParams :' };
      Object.assign(reactRouterArgTypes, Object.fromEntries(searchParamsControlEntries));
    }

    if (reactRouter.hasOwnProperty('routeState')) {
      reactRouterArgTypes[ARGTYPE_ROUTESTATE] = { name: 'React Router RouteState', type: 'object' };
    }

    if (Object.keys(reactRouterArgTypes).length > 0 && Object.keys(argTypes).length > 0) {
      reactRouterArgTypes[ARGTYPE_FILLER] = { name: '' };
    }

    api.updateStory(storyData.id, {
      argTypes: { ...reactRouterArgTypes, ...argTypes }
    });
  }
}
