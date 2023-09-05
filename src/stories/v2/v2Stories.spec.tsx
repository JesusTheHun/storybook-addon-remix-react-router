import { composeStories } from '@storybook/react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { invariant } from '../../utils/misc';
import * as AdvancedRoutingStories from './AdvancedRouting.stories';

import * as BasicStories from './Basics.stories';
import * as ActionStories from './DataRouter/Action.stories';
import * as ComplexStories from './DataRouter/Complex.stories';
import * as LazyStories from './DataRouter/Lazy.stories';
import * as LoaderStories from './DataRouter/Loader.stories';
import * as DescendantRoutesStories from './DescendantRoutes.stories';

describe('StoryRouteTree', () => {
  describe('Basics', () => {
    const {
      ZeroConfig,
      PreserveComponentState,
      LocationPath,
      DefaultLocation,
      LocationPathFromFunctionStringResult,
      LocationPathFromFunctionUndefinedResult,
      LocationPathParams,
      LocationPathBestGuess,
      LocationSearchParams,
      LocationHash,
      LocationState,
      RouteId,
      RoutingString,
      RoutingHandles,
      RoutingOutletJSX,
      RoutingOutletConfigObject,
    } = composeStories(BasicStories);

    const { RoutingOutlets, RoutingNestedOutlets, RoutingNestedAncestors } = composeStories(AdvancedRoutingStories);

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

    it('should render component at the path inferred from the routing & the route params', async () => {
      render(<DefaultLocation />);
      expect(screen.getByText('/books/42')).toBeInTheDocument();
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

    it('should render component with the specified hash', async () => {
      render(<LocationHash />);
      expect(screen.getByText('section-title')).toBeInTheDocument();
    });

    it('should render component with the specified state', async () => {
      render(<LocationState />);
      expect(screen.getByText('location state')).toBeInTheDocument();
    });

    it('should render route with the assigned id', () => {
      render(<RouteId />);
      expect(screen.getByText('["SomeRouteId"]')).toBeInTheDocument();
    });

    it('should render component with the specified route handle', async () => {
      render(<RoutingString />);
      expect(screen.getByText('/books')).toBeInTheDocument();
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
      expect(screen.getByText('Story')).toBeInTheDocument();
      expect(screen.getByText('Outlet level 1')).toBeInTheDocument();
      expect(screen.getByText('Outlet level 2')).toBeInTheDocument();
      expect(screen.getByText('Outlet level 3')).toBeInTheDocument();
    });

    it('should render all the nested ancestors when there is only one per level ', () => {
      render(<RoutingNestedAncestors />);
      expect(screen.getByText('Ancestor level 1')).toBeInTheDocument();
      expect(screen.getByText('Ancestor level 2')).toBeInTheDocument();
      expect(screen.getByText('Ancestor level 3')).toBeInTheDocument();
      expect(screen.getByText('Story')).toBeInTheDocument();
    });
  });

  describe('DescendantRoutes', () => {
    const { DescendantRoutesOneIndex, DescendantRoutesOneRouteMatch, DescendantRoutesTwoRouteMatch } =
      composeStories(DescendantRoutesStories);

    it('should render the index route when on root path', async () => {
      render(<DescendantRoutesOneIndex />);

      expect(screen.queryByRole('heading', { name: 'Library Index' })).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Explore collection 13' })).toBeInTheDocument();

      expect(screen.queryByRole('link', { name: 'Pick a book at random' })).not.toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'Collection: 13' })).not.toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'Book id: 777' })).not.toBeInTheDocument();
    });

    it('should navigate appropriately when clicking a link', async () => {
      render(<DescendantRoutesOneIndex />);

      const user = userEvent.setup();
      await user.click(screen.getByRole('link', { name: 'Explore collection 13' }));

      expect(screen.queryByRole('heading', { name: 'Library Index' })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Explore collection 13' })).not.toBeInTheDocument();

      expect(screen.queryByRole('heading', { name: 'Collection: 13' })).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Pick a book at random' })).toBeInTheDocument();
    });

    it('should render the nested matching route when accessed directly by location pathname', () => {
      render(<DescendantRoutesOneRouteMatch />);

      expect(screen.queryByRole('heading', { name: 'Library Index' })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Explore collection 13' })).not.toBeInTheDocument();

      expect(screen.queryByRole('heading', { name: 'Collection: 13' })).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Pick a book at random' })).toBeInTheDocument();
    });

    it('should render the deeply nested matching route when accessed directly by location pathname', () => {
      render(<DescendantRoutesTwoRouteMatch />);

      expect(screen.queryByRole('heading', { name: 'Library Index' })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Explore collection 13' })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: 'Pick a book at random' })).not.toBeInTheDocument();

      expect(screen.queryByRole('heading', { name: 'Collection: 13' })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'Book id: 777' })).toBeInTheDocument();
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

  describe('Lazy', () => {
    const { LazyRouting } = composeStories(LazyStories);

    it('should render route with loader properly', async () => {
      render(<LazyRouting />);

      await waitFor(() => expect(screen.queryByText('Data from lazy loader : 42')).toBeInTheDocument(), {
        timeout: 1000,
      });
    });
  });
});
