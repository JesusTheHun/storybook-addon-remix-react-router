import { composeStories } from '@storybook/react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { invariant } from '../../utils/misc';
import { LocationPathFromFunctionStringResult } from './Basics.stories';

import * as BasicStories from './Basics.stories';
import * as ActionStories from './DataRouter/Action.stories';
import * as ComplexStories from './DataRouter/Complex.stories';
import * as LoaderStories from './DataRouter/Loader.stories';
import * as NestingStories from './Nesting.stories';

describe('StoryRouteTree', () => {
  describe('Basics', () => {
    const {
      ZeroConfig,
      PreserveComponentState,
      LocationPath,
      LocationPathFromFunctionStringResult,
      LocationPathFromFunctionUndefinedResult,
      LocationPathParams,
      LocationPathBestGuess,
      LocationSearchParams,
      RoutingRouteId,
      RoutingHandles,
      RoutingOutletJSX,
      RoutingOutletConfigObject,
      RoutingOutlets,
      RoutingNestedOutlets,
    } = composeStories(BasicStories);

    it('should render the story with zero config', () => {
      render(<ZeroConfig />);
      expect(screen.getByRole('heading', { name: 'Hi' })).toBeInTheDocument();
    });

    it('should preserve the state of the component when its updated locally or when the story args are changed', async () => {
      const { rerender } = render(<PreserveComponentState />);

      const user = userEvent.setup();
      await user.click(screen.getByRole('button'));

      expect(screen.getByRole('heading', { name: '42' })).toBeInTheDocument();
      expect(screen.getByRole('status')).toHaveTextContent('1');

      PreserveComponentState.args.id = '43';

      rerender(<PreserveComponentState />);

      expect(screen.getByRole('heading', { name: '43' })).toBeInTheDocument();
      expect(screen.getByRole('status')).toHaveTextContent('1');
    });

    it('should render component at the specified path', async () => {
      render(<LocationPath />);
      expect(screen.getByText('/books')).toBeInTheDocument();
    });

    it('should render component at the path return by the function', async () => {
      render(<LocationPathFromFunctionStringResult />);
      expect(screen.getByText('/books/777')).toBeInTheDocument();
    });

    it('should render component at the inferred path if the function returns undefined', async () => {
      render(<LocationPathFromFunctionUndefinedResult />);
      expect(screen.getByText('/books')).toBeInTheDocument();
    });

    it('should render component with the specified route params', async () => {
      render(<LocationPathParams />);
      expect(screen.getByText('{"bookId":"42"}')).toBeInTheDocument();
    });

    it('should guess the location path and render the component tree', () => {
      render(<LocationPathBestGuess />);
      expect(screen.getByRole('heading', { level: 2, name: "I'm the outlet" })).toBeInTheDocument();
    });

    it('should render component with the specified search params', async () => {
      render(<LocationSearchParams />);
      expect(screen.getByText('{"page":"42"}')).toBeInTheDocument();
    });

    it('should render route with the assigned id', () => {
      render(<RoutingRouteId />);
      expect(screen.getByText('["SomeRouteId"]')).toBeInTheDocument();
    });

    it('should render component with the specified route handle', async () => {
      render(<RoutingHandles />);
      expect(screen.getByText('["Handle part 1 out of 2","Handle part 2 out of 2"]')).toBeInTheDocument();
    });

    it('should render outlet component defined by a JSX element', () => {
      render(<RoutingOutletJSX />);
      expect(screen.getByRole('heading', { name: "I'm an outlet defined by a JSX element" })).toBeInTheDocument();
    });

    it('should render outlet component defined with config object', () => {
      render(<RoutingOutletConfigObject />);
      expect(screen.getByRole('heading', { name: "I'm an outlet defined with a config object" })).toBeInTheDocument();
    });

    it('should render the component tree and the matching outlet if many are set', async () => {
      render(<RoutingOutlets />);

      expect(screen.getByText('Outlet Index')).toBeInTheDocument();

      const user = userEvent.setup();
      await user.click(screen.getByRole('link', { name: 'One' }));

      expect(screen.getByText('Outlet One')).toBeInTheDocument();
    });

    it('should render all the nested outlets when there is only one per level ', () => {
      render(<RoutingNestedOutlets />);
      expect(screen.getByText('Outlet level 1')).toBeInTheDocument();
      expect(screen.getByText('Outlet level 2')).toBeInTheDocument();
      expect(screen.getByText('Outlet level 3')).toBeInTheDocument();
    });
  });

  describe('Nesting', () => {
    const { IndexAtRoot, MatchingRoute, MatchingNestedRoute } = composeStories(NestingStories);

    it('should render the index route when on root path', async () => {
      render(<IndexAtRoot />);

      expect(screen.queryByRole('link', { name: 'Navigate to listing' })).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Navigate to details' })).not.toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'Listing id: 13', level: 1 })).not.toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'Details id: 37', level: 2 })).not.toBeInTheDocument();
    });

    it('should navigate appropriately when clicking a link', async () => {
      render(<IndexAtRoot />);

      expect(screen.queryByRole('link', { name: 'Navigate to listing' })).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Navigate to details' })).not.toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'Listing id: 13', level: 1 })).not.toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'Details id: 37', level: 2 })).not.toBeInTheDocument();

      const user = userEvent.setup();
      await user.click(screen.getByRole('link', { name: 'Navigate to listing' }));

      expect(screen.queryByRole('link', { name: 'Navigate to listing' })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Navigate to details' })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'Listing id: 13', level: 1 })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'Details id: 37', level: 2 })).not.toBeInTheDocument();
    });

    it('should render the matching route with bound params when on sub-path', () => {
      render(<MatchingRoute />);

      expect(screen.queryByRole('link', { name: 'Navigate to listing' })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Navigate to details' })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'Listing id: 13', level: 1 })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'Details id: 37', level: 2 })).not.toBeInTheDocument();
    });

    it('should render the matching route with bound params when on sub-sub-path', () => {
      render(<MatchingNestedRoute />);

      expect(screen.queryByRole('link', { name: 'Navigate to listing' })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Navigate to details' })).not.toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'Listing id: 13', level: 1 })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'Details id: 37', level: 2 })).toBeInTheDocument();
    });
  });

  describe('Loader', () => {
    const { RouteLoader, RouteAndOutletLoader, ErrorBoundary } = composeStories(LoaderStories);

    it('should render component with route loader', async () => {
      render(<RouteLoader />);
      await waitFor(() => expect(screen.getByRole('heading', { name: 'Data loaded' })).toBeInTheDocument(), {
        timeout: 1000,
      });
    });

    it('should render component with route loader and outlet loader', async () => {
      render(<RouteAndOutletLoader />);
      await waitFor(() => expect(screen.getByRole('heading', { level: 1, name: 'Data loaded' })).toBeInTheDocument(), {
        timeout: 1000,
      });
      await waitFor(
        () => expect(screen.getByRole('heading', { level: 2, name: 'Outlet data loaded' })).toBeInTheDocument(),
        { timeout: 1000 }
      );
    });

    it('should render the error boundary if the route loader fails', async () => {
      render(<ErrorBoundary />);
      await waitFor(() =>
        expect(screen.queryByRole('heading', { name: 'Fancy error component : Meh.', level: 1 })).toBeInTheDocument()
      );
    });

    it('should not revalidate the route data', async () => {
      const { RouteShouldNotRevalidate } = composeStories(LoaderStories);
      invariant(RouteShouldNotRevalidate.parameters);

      const loader = vi.fn(() => 'Yo');

      RouteShouldNotRevalidate.parameters.reactRouter.routing.loader = loader;

      render(<RouteShouldNotRevalidate />);

      await waitFor(() => expect(loader).toHaveBeenCalledOnce());

      const user = userEvent.setup();
      await user.click(screen.getByRole('link'));

      screen.getByText('?foo=bar');

      expect(loader).toHaveBeenCalledOnce();
    });
  });

  describe('Action', () => {
    const { TextFormData, FileFormData } = composeStories(ActionStories);

    it('should handle route action with text form', async () => {
      const action = vi.fn();

      invariant(TextFormData.parameters);
      TextFormData.parameters.reactRouter.routing.action = action;

      render(<TextFormData />);

      const user = userEvent.setup();
      await user.click(screen.getByRole('button'));

      expect(action).toHaveBeenCalledOnce();

      expect(action.mock.lastCall?.[0].request).toBeInstanceOf(Request);

      const formData = await (action.mock.lastCall?.[0].request as Request).formData();
      const pojoFormData = Object.fromEntries(formData.entries());

      expect(pojoFormData).toEqual({ foo: 'bar' });
    });

    it('should handle route action with file form', async () => {
      const action = vi.fn();

      invariant(FileFormData.parameters);
      FileFormData.parameters.reactRouter.routing.action = action;

      const file = new File(['hello'], 'hello.txt', { type: 'plain/text' });

      render(<FileFormData />);

      const input = screen.getByLabelText(/file/i) as HTMLInputElement;

      const user = userEvent.setup();
      await user.upload(input, file);
      await user.click(screen.getByRole('button'));

      expect(input.files).toHaveLength(1);
      expect(input.files?.item(0)).toStrictEqual(file);

      expect(action).toHaveBeenCalledOnce();
      expect(action.mock.lastCall?.[0].request).toBeInstanceOf(Request);

      const request = action.mock.lastCall?.[0].request as Request;
      const formData = await request.formData();
      const pojoFormData = Object.fromEntries(formData.entries());

      expect(pojoFormData).toHaveProperty('myFile');
    });
  });

  describe('Complex', () => {
    const { TodoListScenario } = composeStories(ComplexStories);

    it('should render route with actions properly', async () => {
      render(<TodoListScenario />);

      await waitFor(() => expect(screen.queryByRole('heading', { level: 1, name: 'Todos' })).toBeInTheDocument(), {
        timeout: 1000,
      });
    });
  });
});
