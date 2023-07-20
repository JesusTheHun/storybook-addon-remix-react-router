import { LoaderFunction } from '@remix-run/router';
import { ActionFunctionArgs } from '@remix-run/router/utils';
import Channel from '@storybook/channels';
import { addons } from '@storybook/preview-api';
import * as handlebars from 'handlebars';
import React from 'react';
import { ActionFunction, LoaderFunctionArgs, Route } from 'react-router-dom';
import { EVENTS } from '../constants';
import { DeepRouteMatchesContext } from '../contexts/DeepRouteMatches';
import { FCC } from '../fixes';
import { useDataEventBuilder } from '../hooks/useDataEventBuilder';
import { useRouteContextMatches } from '../hooks/useRouteContextMatches';
import { OutletProps, ReactRouterParameters } from '../types/public';
import { RouterLogger } from './RouterLogger';
import { StoryRouter } from './StoryRouter';

export const StoryRouteTree: FCC<ReactRouterParameters & { params?: Record<string, string> }> = ({
  children,
  ...parameters
}) => {
  const channel = addons.getChannel();
  const deepRouteMatches = useRouteContextMatches();

  const { outlet } = parameters;

  const outletConfig: OutletProps<string> = isOutletProps(outlet)
    ? outlet
    : {
        element: outlet,
      };

  const outletExpandProps = {
    element: outletConfig.element,
    handle: outletConfig.handle,
    errorElement: outletConfig.errorElement,
    action: outletConfig.action !== undefined ? actionWrapper(channel, outletConfig.action) : undefined,
    loader: outletConfig.loader !== undefined ? loaderWrapper(channel, outletConfig.loader) : undefined,
  };

  return (
    <DeepRouteMatchesContext.Provider value={deepRouteMatches}>
      <StoryRouter
        path={parameters.path}
        params={parameters.params}
        locationState={parameters.locationState}
        locationSearchParams={parameters.locationSearchParams}
        locationHash={parameters.locationHash}
        hydrationData={parameters.hydrationData}
        descendantRoutes={parameters.descendantRoutes}
      >
        <Route
          id={parameters.id}
          path={parameters.path}
          handle={parameters.handle}
          action={parameters.action !== undefined ? actionWrapper(channel, parameters.action) : undefined}
          loader={parameters.loader !== undefined ? loaderWrapper(channel, parameters.loader) : undefined}
          shouldRevalidate={parameters.shouldRevalidate}
          errorElement={parameters.errorElement}
          element={<RouterLogger>{children}</RouterLogger>}
        >
          {outletConfig.element !== undefined && outletConfig.path === undefined && (
            <Route index {...outletExpandProps} />
          )}
          {outletConfig.element !== undefined && <Route path={outletConfig.path} {...outletExpandProps} />}
        </Route>
      </StoryRouter>
    </DeepRouteMatchesContext.Provider>
  );
};

function isOutletProps(test: unknown): test is OutletProps<string> {
  return test !== null && typeof test === 'object' && Object.prototype.hasOwnProperty.call(test, 'element');
}

function actionWrapper(channel: Channel, action: ActionFunction): ActionFunction {
  const createEventData = useDataEventBuilder();

  return async function (actionArgs: ActionFunctionArgs) {
    if (action === undefined) return;

    channel.emit(EVENTS.ACTION_INVOKED, await createEventData(EVENTS.ACTION_INVOKED, actionArgs));
    const actionResult = await action(actionArgs);
    channel.emit(EVENTS.ACTION_SETTLED, await createEventData(EVENTS.ACTION_SETTLED, actionResult));

    return actionResult;
  };
}

function loaderWrapper(channel: Channel, loader: LoaderFunction): ActionFunction {
  const createEventData = useDataEventBuilder();

  return async function (loaderArgs: LoaderFunctionArgs) {
    if (loader === undefined) return;

    channel.emit(EVENTS.LOADER_INVOKED, await createEventData(EVENTS.LOADER_INVOKED, loaderArgs));
    const loaderResult = await loader(loaderArgs);
    channel.emit(EVENTS.LOADER_SETTLED, await createEventData(EVENTS.LOADER_SETTLED, loaderResult));

    return loaderResult;
  };
}
