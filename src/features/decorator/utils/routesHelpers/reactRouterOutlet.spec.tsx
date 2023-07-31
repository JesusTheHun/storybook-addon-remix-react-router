import React from 'react';
import { describe, expect, test } from 'vitest';
import { reactRouterOutlet } from './reactRouterOutlet';

describe('reactRouterOutlet', () => {
  function StoryComponent() {
    return null;
  }

  function OutletComponent() {
    return null;
  }

  test('routing when a JSX outlet definition is given ', () => {
    const component = <OutletComponent />;
    const routing = reactRouterOutlet(component);
    expect(routing).toHaveLength(1);
    expect(routing[0]).toEqual({
      children: [
        {
          element: component,
          index: true,
        },
      ],
    });
  });

  test('routing when an outlet definition object is given ', () => {
    const component = <OutletComponent />;
    const routing = reactRouterOutlet({ path: '/:tabId', element: component });
    expect(routing).toHaveLength(1);
    expect(routing[0]).toEqual({
      children: [
        {
          path: '/:tabId',
          element: component,
          index: true,
        },
      ],
    });
  });

  test('routing when a story definition object is given', () => {
    const outletComponent = <OutletComponent />;
    const routing = reactRouterOutlet({ path: '/tabs' }, { path: '/:tabId', element: outletComponent });
    expect(routing).toHaveLength(1);
    expect(routing[0]).toEqual({
      path: '/tabs',
      children: [
        {
          path: '/:tabId',
          element: outletComponent,
          index: true,
        },
      ],
    });
  });

  test.skip('type error when passing a JSX as story definition', () => {
    const outletComponent = <OutletComponent />;

    // @ts-expect-error the function should not accept a JSX because the story component will be used
    const routing = reactRouterOutlet(<StoryComponent />, { path: '/:tabId', element: outletComponent });
    expect(routing).toHaveLength(1);
  });
});
