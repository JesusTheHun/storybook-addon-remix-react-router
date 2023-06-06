import React from "react";
import { beforeEach, describe, it, vi } from "vitest";
import { composeStories } from "@storybook/react";
import { render, screen, waitFor } from '@testing-library/react';
import { EVENTS } from "../constants";
import { addons } from '@storybook/preview-api';

import * as NestingStories from "../stories/StoryRouteTree/Nesting.stories";
import * as ActionStories from "../stories/StoryRouteTree/DataRouter/Action.stories";
import * as LoaderStories from "../stories/StoryRouteTree/DataRouter/Loader.stories";
import Channel from "@storybook/channels";
import { SpyInstance } from "@vitest/spy";
import userEvent from "@testing-library/user-event";

type LocalTestContext = {
  emitSpy: SpyInstance;
}

describe('RouterLogger', () => {

  beforeEach<LocalTestContext>((context) => {
    const transport = {
      setHandler: vi.fn(),
      send: vi.fn(),
    };

    const channelMock = new Channel({ transport });
    context.emitSpy = vi.spyOn(channelMock, 'emit');

    addons.setChannel(channelMock);
  });

  it<LocalTestContext>('should log when the story loads', async (context) => {
    const { MatchingNestedRoute } = composeStories(NestingStories);

    render(<MatchingNestedRoute />);

    await waitFor(() => {
      expect(context.emitSpy).toHaveBeenCalledWith(EVENTS.STORY_LOADED, {
        type: EVENTS.STORY_LOADED,
        key: `${EVENTS.STORY_LOADED}_0`,
        data: {
          url: '/listing/13/37',
          path: '/listing/13/37',
          routeParams: { '*': '13/37' },
          searchParams: {},
          routeMatches: [
            ['/listing/*', { '*': '13/37' }],
            [':id/*', { '*': '37', 'id': '13' }],
            [':subId', { '*': '37', 'id': '13', 'subId': '37' }],
          ],
          hash: "",
          routeState: null,
        },
      });
    });
  });

  it<LocalTestContext>('should log navigation when a link is clicked', async (context) => {
    const { IndexAtRoot } = composeStories(NestingStories);

    render(<IndexAtRoot />);

    const user = userEvent.setup();
    await user.click(screen.getByRole('link', { name: "Navigate to listing" }));

    await waitFor(() => {
      expect(context.emitSpy).toHaveBeenCalledWith(EVENTS.NAVIGATION, {
        type: EVENTS.NAVIGATION,
        key: expect.stringContaining(EVENTS.NAVIGATION),
        data: {
          navigationType: 'PUSH',
          url: '/listing/13',
          path: '/listing/13',
          routeParams: { '*': '13' },
          searchParams: {},
          routeMatches: [
            ['/listing/*', { '*': '' }],
            [undefined, { '*': '' }],
          ],
          hash: "",
          routeState: null,
        },
      });
    });
  });

  it<LocalTestContext>('should log new route match when nested Routes is mounted', async (context) => {
    const { IndexAtRoot } = composeStories(NestingStories);

    render(<IndexAtRoot />);

    const user = userEvent.setup();
    await user.click(screen.getByRole('link', { name: "Navigate to listing" }));

    await waitFor(() => {
      expect(context.emitSpy).toHaveBeenCalledWith(EVENTS.ROUTE_MATCHES, {
        type: EVENTS.ROUTE_MATCHES,
        key: expect.stringContaining(EVENTS.ROUTE_MATCHES),
        data: {
          matches: [
            ['/listing/*', { '*': '13' }],
            [':id/*', { '*': '', id: '13' }],
            [undefined, { '*': '', id: '13' }],
          ],
        },
      });
    });
  });

  it<LocalTestContext>('should log data router action when triggered', async (context) => {
    const { TextFormData } = composeStories(ActionStories);
    render(<TextFormData />);

    const user = userEvent.setup();
    await user.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(context.emitSpy).toHaveBeenCalledWith(EVENTS.ACTION_INVOKED, {
        type: EVENTS.ACTION_INVOKED,
        data: {
          context: undefined,
          params: { '*': '' },
          request: expect.anything(),
        },
      });
    });
  });

  it<LocalTestContext>('should log file info when route action is triggered', async (context) => {
    const { FileFormData } = composeStories(ActionStories);

    render(<FileFormData />);

    const file = new File(['hello'], 'hello.txt', {type: 'plain/text'})
    const input = screen.getByLabelText(/file/i) as HTMLInputElement;

    const user = userEvent.setup();
    await user.upload(input, file);
    await user.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(context.emitSpy).toHaveBeenCalledWith(EVENTS.ACTION_INVOKED, {
        type: EVENTS.ACTION_INVOKED,
        data: {
          context: undefined,
          params: { '*': '' },
          request: {
            url: "http://localhost/",
            method: "POST",
            body: {
              myFile: '[object File]',
            }
          },
        },
      });
    });
  });

  it<LocalTestContext>('should log when data router action settled', async (context) => {
    const { TextFormData } = composeStories(ActionStories);
    render(<TextFormData />);

    const user = userEvent.setup();
    await user.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(context.emitSpy).toHaveBeenCalledWith(EVENTS.ACTION_SETTLED, {
        type: EVENTS.ACTION_SETTLED,
        data: { result: 42 },
      });
    });
  });


  it<LocalTestContext>('should log data router loader when triggered', async (context) => {
    const { RouteAndOutletLoader } = composeStories(LoaderStories);
    render(<RouteAndOutletLoader />);

    await waitFor(() => {
      expect(context.emitSpy).toHaveBeenCalledWith(EVENTS.LOADER_INVOKED, {
        type: EVENTS.LOADER_INVOKED,
        data: {
          context: undefined,
          params: { '*': '' },
          request: expect.anything(),
        },
      });
    });
  });

  it<LocalTestContext>('should log when data router loader settled', async (context) => {
    const { RouteAndOutletLoader } = composeStories(LoaderStories);
    render(<RouteAndOutletLoader />);

    await waitFor(() => {
      expect(context.emitSpy).toHaveBeenCalledWith(EVENTS.LOADER_SETTLED, {
        type: EVENTS.LOADER_SETTLED,
        data: { foo: "Data loaded" },
      });
    });

    await waitFor(() => {
      expect(context.emitSpy).toHaveBeenCalledWith(EVENTS.LOADER_SETTLED, {
        type: EVENTS.LOADER_SETTLED,
        data: { foo: "Outlet data loaded" },
      });
    });
  });
});