/* eslint-disable @typescript-eslint/no-explicit-any */

import { hasOwnProperty } from '../../../utils/misc';
import { ReactRouterAddonStoryParameters } from '../components/ReactRouterDecorator';
import { LocationParameters, RouterRoute } from '../types';
import { castRouterRoute } from './castRouterRoute';

export function castParametersV2(parameters: Record<string, unknown> = {}): ReactRouterAddonStoryParameters {
  const exclusiveV2properties = ['location', 'navigationHistory', 'routing'];
  const isV2 = Object.keys(parameters ?? {}).some((prop) => exclusiveV2properties.includes(prop));

  if (isV2) return parameters;

  const v2params = {
    routing: {} as RouterRoute,
    location: {} as LocationParameters,
    hydrationData: undefined,
  } satisfies ReactRouterAddonStoryParameters;

  // <!> The order is important <!>
  if (hasOwnProperty(parameters, 'routePath')) {
    v2params.location.path = parameters.routePath as any;
    v2params.routing.path = parameters.routePath as any;
  }
  if (hasOwnProperty(parameters, 'routeParams')) v2params.location.pathParams = parameters.routeParams as any;
  if (hasOwnProperty(parameters, 'routeState')) v2params.location.state = parameters.routeState as any;
  if (hasOwnProperty(parameters, 'routeHandle')) v2params.routing.handle = parameters.routeHandle as any;
  if (hasOwnProperty(parameters, 'searchParams')) v2params.location.searchParams = parameters.searchParams as any;
  if (hasOwnProperty(parameters, 'browserPath')) v2params.location.path = parameters.browserPath as any;
  if (hasOwnProperty(parameters, 'loader')) v2params.routing.loader = parameters.loader as any;
  if (hasOwnProperty(parameters, 'action')) v2params.routing.action = parameters.action as any;
  if (hasOwnProperty(parameters, 'errorElement')) v2params.routing.errorElement = parameters.errorElement as any;
  if (hasOwnProperty(parameters, 'hydrationData')) v2params.hydrationData = parameters.hydrationData as any;
  if (hasOwnProperty(parameters, 'shouldRevalidate'))
    v2params.routing.shouldRevalidate = parameters.shouldRevalidate as any;
  if (hasOwnProperty(parameters, 'routeId')) v2params.routing.id = parameters.routeId as any;

  if (hasOwnProperty(parameters, 'outlet')) {
    const outlet = castRouterRoute(parameters.outlet as any);
    outlet.path ??= '';
    v2params.routing.children = [outlet];
  }

  v2params.routing.useStoryElement = true;

  return v2params;
}
