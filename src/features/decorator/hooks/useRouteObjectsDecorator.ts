import { useCallback } from 'react';
import { RouteObject } from 'react-router';
import { useActionDecorator } from './useActionDecorator';
import { useLoaderDecorator } from './useLoaderDecorator';

export function useRouteObjectsDecorator(): (routeObjects: RouteObject[]) => RouteObject[] {
  const decorateAction = useActionDecorator();
  const decorateLoader = useLoaderDecorator();

  const decorateRouteObjects = useCallback(
    (routeDefinitions: RouteObject[]) => {
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
