import React from 'react';
import {describe, expect, it, vi} from 'vitest'
import {render, screen, waitFor} from '@testing-library/react';
import {StoryRouteTree} from "./StoryRouteTree";
import userEvent from "@testing-library/user-event";
import {composeStories} from '@storybook/testing-react';

import * as BasicStories from '../../stories/StoryRouteTree/Basics.stories';
import * as NestingStories from '../../stories/StoryRouteTree/Nesting.stories';
import * as LoaderStories from '../../stories/StoryRouteTree/DataRouter/Loader.stories';
import * as ActionStories from '../../stories/StoryRouteTree/DataRouter/Action.stories';
import * as ComplexStories from '../../stories/StoryRouteTree/DataRouter/Complex.stories';
import {FileFormData} from "../../stories/StoryRouteTree/DataRouter/Action.stories";

describe('StoryRouteTree', () => {
  describe('Basics', () => {

    const {
      RenderChildren,
      OutletJSX,
      OutletConfigObject,
      SpecificPath,
      RouteParams,
      SearchParams,
    } = composeStories(BasicStories);

    it('should render child component', () => {
      render(<RenderChildren />);
      expect(screen.getByRole('heading', { name: "Hi" })).toBeInTheDocument();
    });

    it('should render component at the specified path', async () => {
      render(<SpecificPath />);
      expect(screen.getByText("/foo")).toBeInTheDocument();
    });

    it('should render component with the specified route params', async () => {
      render(<RouteParams />);
      expect(screen.getByText('{"id":"42"}')).toBeInTheDocument();
    });

    it('should render component with the specified search params', async () => {
      render(<SearchParams />);
      expect(screen.getByText('{"page":"42"}')).toBeInTheDocument();
    });

    it('should render outlet component', () => {
      render(<OutletJSX />);
      expect(screen.getByRole('heading', { name: "I'm an outlet" })).toBeInTheDocument();
    });

    it('should render outlet component defined with config object', () => {
      render(<OutletConfigObject />);
      expect(screen.getByRole('heading', { name: "I'm an outlet defined with a config object" })).toBeInTheDocument();
    });
  });

  describe("Nesting", () => {

    const {
      IndexAtRoot,
      MatchingRoute,
      MatchingNestedRoute,
    } = composeStories(NestingStories);

    it("should render the index route when on root path", async () => {
      render(<IndexAtRoot />);

      expect(screen.queryByRole('link', { name: "Navigate to listing" })).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: "Navigate to details" })).not.toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: "Listing id: 13", level: 1 })).not.toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: "Details id: 37", level: 2 })).not.toBeInTheDocument();
    });

    it("should navigate appropriately when clicking a link", async () => {
      render(<IndexAtRoot />);

      expect(screen.queryByRole('link', { name: "Navigate to listing" })).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: "Navigate to details" })).not.toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: "Listing id: 13", level: 1 })).not.toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: "Details id: 37", level: 2 })).not.toBeInTheDocument();

      const user = userEvent.setup();
      await user.click(screen.getByRole('link', { name: "Navigate to listing" }));

      expect(screen.queryByRole('link', { name: "Navigate to listing" })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: "Navigate to details" })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: "Listing id: 13", level: 1 })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: "Details id: 37", level: 2 })).not.toBeInTheDocument();
    });

    it("should render the matching route with bound params when on sub-path", () => {
      render(<MatchingRoute />);

      expect(screen.queryByRole('link', { name: "Navigate to listing" })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: "Navigate to details" })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: "Listing id: 13", level: 1 })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: "Details id: 37", level: 2 })).not.toBeInTheDocument();
    });

    it("should render the matching route with bound params when on sub-sub-path", () => {
      render(<MatchingNestedRoute />);

      expect(screen.queryByRole('link', { name: "Navigate to listing" })).not.toBeInTheDocument();
      expect(screen.queryByRole('link', { name: "Navigate to details" })).not.toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: "Listing id: 13", level: 1 })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: "Details id: 37", level: 2 })).toBeInTheDocument();
    });
  });

  describe('Loader', () => {

    const {
      RouteLoader,
      RouteAndOutletLoader,
      ErrorBoundary,
    } = composeStories(LoaderStories);

    it('should render component with route loader', async () => {
      render(<RouteLoader />);
      await waitFor(() => expect(screen.getByRole('heading', { name: "Data loaded" })).toBeInTheDocument(), { timeout: 1000 });
    });

    it('should render component with route loader and outlet loader', async () => {
      render(<RouteAndOutletLoader />);
      await waitFor(() => expect(screen.getByRole('heading', { level: 1, name: "Data loaded" })).toBeInTheDocument(), { timeout: 1000 });
      await waitFor(() => expect(screen.getByRole('heading', { level: 2, name: "Outlet data loaded" })).toBeInTheDocument(), { timeout: 1000 });
    });

    it("should render the error boundary if the route loader fails", async () => {
      render(<ErrorBoundary />);
      await waitFor(() => expect(screen.queryByRole('heading', { name: "Fancy error component : Meh.", level: 1 })).toBeInTheDocument());
    });
  });

  describe('Action', () => {

    const {
      TextFormData,
      FileFormData
    } = composeStories(ActionStories);

    it('should handle route action with text form', async () => {
      const action = vi.fn();

      render(<TextFormData action={action} />);

      const user = userEvent.setup();
      await user.click(screen.getByRole('button'));

      expect(action).toHaveBeenCalledOnce();

      expect(action.mock!.lastCall![0].request).toBeInstanceOf(Request);

      const formData = await (action.mock!.lastCall![0].request as Request).formData();
      const pojoFormData = Object.fromEntries(formData.entries());

      expect(pojoFormData).toEqual({ foo: "bar" });
    });

    it('should handle route action with file form', async () => {
      const action = vi.fn();

      const file = new File(['hello'], 'hello.txt', {type: 'plain/text'})

      render(<FileFormData action={action} />);

      const input = screen.getByLabelText(/file/i) as HTMLInputElement;

      const user = userEvent.setup();
      await user.upload(input, file);
      await user.click(screen.getByRole('button'));

      expect(input.files).toHaveLength(1);
      expect(input.files!.item(0)).toStrictEqual(file)

      expect(action).toHaveBeenCalledOnce();
      expect(action.mock!.lastCall![0].request).toBeInstanceOf(Request);

      const request = action.mock!.lastCall![0].request as Request;
      const formData = await request.formData();
      const pojoFormData = Object.fromEntries(formData.entries());

      expect(pojoFormData).toHaveProperty('myFile');
    });
  });

  describe("Complex", () => {

    const {
      TodoListScenario
    } = composeStories(ComplexStories);

    it('should render route with actions properly', async () => {
      render(<TodoListScenario />);

      await waitFor(
        () => expect(screen.queryByRole('heading', { level: 1, name: "Todos" })).toBeInTheDocument(),
        { timeout: 1000 }
      );
    });
  });
});