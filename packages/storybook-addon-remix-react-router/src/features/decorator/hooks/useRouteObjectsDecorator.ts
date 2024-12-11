import { useCallback } from 'react';
import { RouterRoute } from '../types';
import { useActionDecorator } from './useActionDecorator';
import { useLoaderDecorator } from './useLoaderDecorator';

type RouteObjectDecorator = <T extends RouterRoute[]>(routeDefinitions: T) => T;

export function useRouteObjectsDecorator(): RouteObjectDecorator {
  const decorateAction = useActionDecorator();
  const decorateLoader = useLoaderDecorator();

  const decorateRouteObjects = useCallback(
    <T extends RouterRoute[]>(routeDefinitions: T): T => {
      return routeDefinitions.map((routeDefinition) => {
        // eslint-disable-next-line prefer-const
        let { action, loader, children, lazy } = routeDefinition;
        const augmentedRouteDefinition = { ...routeDefinition };

        if (lazy) {
          augmentedRouteDefinition.lazy = async function () {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const lazyResult = await lazy!();
            const augmentedLazyResult = { ...lazyResult };
            if (typeof lazyResult.action === 'function') augmentedLazyResult.action = decorateAction(lazyResult.action);
            if (typeof lazyResult.loader === 'function') augmentedLazyResult.loader = decorateLoader(lazyResult.loader);

            return augmentedLazyResult;
          };
        }

        if (typeof action === 'function') {
          augmentedRouteDefinition.action = decorateAction(action);
        }

        if (typeof loader === 'function') {
          augmentedRouteDefinition.loader = decorateLoader(loader);
        }

        if (children) {
          augmentedRouteDefinition.children = decorateRouteObjects(children);
        }

        return augmentedRouteDefinition;
      }) as T;
    },
    [decorateAction, decorateLoader]
  );

  return decorateRouteObjects;
}
