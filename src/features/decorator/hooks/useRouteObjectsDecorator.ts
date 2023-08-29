import { useCallback } from 'react';
import { RouterRoute } from '../types';
import { useActionDecorator } from './useActionDecorator';
import { useLoaderDecorator } from './useLoaderDecorator';

export function useRouteObjectsDecorator() {
  const decorateAction = useActionDecorator();
  const decorateLoader = useLoaderDecorator();

  const decorateRouteObjects = useCallback(
    <T extends RouterRoute[]>(routeDefinitions: T) => {
      return routeDefinitions.map((routeDefinition) => {
        // eslint-disable-next-line prefer-const
        let { action, loader, children, lazy } = routeDefinition;
        const augmentedRouteDefinition = { ...routeDefinition };

        if (lazy) {
          augmentedRouteDefinition.lazy = async function () {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const lazyResult = await lazy!();
            const augmentedLazyResult = { ...lazyResult };
            if (lazyResult.action) augmentedLazyResult.action = decorateAction(lazyResult.action);
            if (lazyResult.loader) augmentedLazyResult.loader = decorateLoader(lazyResult.loader);

            return augmentedLazyResult;
          };
        }

        if (action) {
          augmentedRouteDefinition.action = decorateAction(action);
        }

        if (loader) {
          augmentedRouteDefinition.loader = decorateLoader(loader);
        }

        if (children) {
          augmentedRouteDefinition.children = decorateRouteObjects(children);
        }

        return augmentedRouteDefinition;
      });
    },
    [decorateAction, decorateLoader]
  );

  return decorateRouteObjects;
}
