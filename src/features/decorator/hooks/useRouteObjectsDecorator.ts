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
        const { action, loader, children } = routeDefinition;
        const augmentedRouteDefinition = { ...routeDefinition };

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
