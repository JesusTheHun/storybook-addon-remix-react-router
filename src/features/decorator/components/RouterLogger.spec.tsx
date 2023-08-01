import React from 'react';
import { beforeEach, describe, it, vi } from 'vitest';
import { composeStories } from '@storybook/react';
import { render, screen, waitFor } from '@testing-library/react';
import { EVENTS } from '../../../constants';
import { addons } from '@storybook/preview-api';

import * as NestingStories from '../../../stories/v2/DescendantRoutes.stories';
import * as ActionStories from '../../../stories/v2/DataRouter/Action.stories';
import * as LoaderStories from '../../../stories/v2/DataRouter/Loader.stories';
import Channel from '@storybook/channels';
import { SpyInstance } from '@vitest/spy';
import userEvent from '@testing-library/user-event';

type LocalTestContext = {
  emitSpy: SpyInstance;
};

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
    const { DescendantRoutesTwoRouteMatch } = composeStories(NestingStories);

    render(<DescendantRoutesTwoRouteMatch />);

    await waitFor(() => {
      expect(context.emitSpy).toHaveBeenCalledWith(EVENTS.STORY_LOADED, {
        type: EVENTS.STORY_LOADED,
        key: `${EVENTS.STORY_LOADED}_0`,
        data: {
          url: '/library/13/777',
          path: '/library/13/777',
          routeParams: { '*': '13/777' },
          searchParams: {},
          routeMatches: [
            { path: '/library/*', params: { '*': '13/777' } },
            { path: ':collectionId/*', params: { '*': '777', 'collectionId': '13' } },
            { path: ':bookId', params: { '*': '777', 'collectionId': '13', 'bookId': '777' } },
          ],
          hash: '',
          routeState: null,
        },
      });
    });
  });

  it<LocalTestContext>('should log navigation when a link is clicked', async (context) => {
    const { DescendantRoutesOneIndex } = composeStories(NestingStories);

    render(<DescendantRoutesOneIndex />);

    const user = userEvent.setup();
    await user.click(screen.getByRole('link', { name: 'Explore collection 13' }));

    await waitFor(() => {
      expect(context.emitSpy).toHaveBeenCalledWith(EVENTS.NAVIGATION, {
        type: EVENTS.NAVIGATION,
        key: expect.stringContaining(EVENTS.NAVIGATION),
        data: {
          navigationType: 'PUSH',
          url: '/library/13',
          path: '/library/13',
          routeParams: { '*': '13' },
          searchParams: {},
          routeMatches: [
            { path: '/library/*', params: { '*': '' } },
            { path: undefined, params: { '*': '' } },
          ],
          hash: '',
          routeState: null,
        },
      });
    });
  });

  it<LocalTestContext>('should log new route match when nested Routes is mounted', async (context) => {
    const { DescendantRoutesOneIndex } = composeStories(NestingStories);

    render(<DescendantRoutesOneIndex />);

    const user = userEvent.setup();
    await user.click(screen.getByRole('link', { name: 'Explore collection 13' }));

    await waitFor(() => {
      expect(context.emitSpy).toHaveBeenCalledWith(EVENTS.ROUTE_MATCHES, {
        type: EVENTS.ROUTE_MATCHES,
        key: expect.stringContaining(EVENTS.ROUTE_MATCHES),
        data: {
          matches: [
            { path: '/library/*', params: { '*': '13' } },
            { path: ':collectionId/*', params: { '*': '', 'collectionId': '13' } },
            { path: undefined, params: { '*': '', 'collectionId': '13' } },
          ],
        },
      });
    });
  });

  it<LocalTestContext>('should log data router action when triggered', async (context) => {
    const { TextFormData } = composeStories(ActionStories);
    render(<TextFormData />);

    context.emitSpy.mockClear();

    const user = userEvent.setup();
    await user.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(context.emitSpy).toHaveBeenCalledWith(
        EVENTS.ACTION_INVOKED,
        expect.objectContaining({
          type: EVENTS.ACTION_INVOKED,
          key: expect.stringContaining(EVENTS.ACTION_INVOKED),
          data: expect.objectContaining({
            request: {
              url: 'http://localhost/',
              method: 'POST',
              body: {
                foo: 'bar',
              },
            },
          }),
        })
      );
    });
  });

  it<LocalTestContext>('should log file info when route action is triggered', async (context) => {
    const { FileFormData } = composeStories(ActionStories);

    render(<FileFormData />);

    const file = new File(['hello'], 'hello.txt', { type: 'plain/text' });
    const input = screen.getByLabelText(/file/i) as HTMLInputElement;

    const user = userEvent.setup();
    await user.upload(input, file);
    await user.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(context.emitSpy).toHaveBeenCalledWith(EVENTS.ACTION_INVOKED, {
        type: EVENTS.ACTION_INVOKED,
        key: expect.stringContaining(EVENTS.ACTION_INVOKED),
        data: expect.objectContaining({
          request: {
            url: 'http://localhost/',
            method: 'POST',
            body: {
              myFile: expect.objectContaining({}),
            },
          },
        }),
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
        key: expect.stringContaining(EVENTS.ACTION_SETTLED),
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
        key: expect.stringContaining(EVENTS.LOADER_INVOKED),
        data: expect.objectContaining({
          request: expect.anything(),
        }),
      });
    });
  });

  it<LocalTestContext>('should log when data router loader settled', async (context) => {
    const { RouteAndOutletLoader } = composeStories(LoaderStories);
    render(<RouteAndOutletLoader />);

    await waitFor(() => {
      expect(context.emitSpy).toHaveBeenCalledWith(EVENTS.LOADER_SETTLED, {
        type: EVENTS.LOADER_SETTLED,
        key: expect.stringContaining(EVENTS.LOADER_SETTLED),
        data: { foo: 'Data loaded' },
      });
    });

    await waitFor(() => {
      expect(context.emitSpy).toHaveBeenCalledWith(EVENTS.LOADER_SETTLED, {
        type: EVENTS.LOADER_SETTLED,
        key: expect.stringContaining(EVENTS.LOADER_SETTLED),
        data: { foo: 'Outlet data loaded' },
      });
    });
  });
});
