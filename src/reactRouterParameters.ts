import { ReactRouterParameters } from './types/public';

export function reactRouterParameters<RoutePath extends string>(
  parameters: ReactRouterParameters<RoutePath>
): ReactRouterParameters<RoutePath> {
  return parameters;
}
