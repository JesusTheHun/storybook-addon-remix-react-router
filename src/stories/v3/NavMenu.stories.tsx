import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { reactRouterParameters } from '../../features/decorator/utils/routesHelpers/reactRouterParameters';
import { withRouter } from '../../features/decorator/withRouter';
import './NavMenu.css';

const NavMenu = () => (
  <nav>
    <NavLink to={'/'}>Home</NavLink>
    <NavLink to={'/parent'}>Parent without exact matching</NavLink>
    <NavLink to={'/parent/child1'} className={'sub-menu'}>
      Child 1
    </NavLink>
    <NavLink to={'/parent/child2'} className={'sub-menu'}>
      Child 2
    </NavLink>
    <NavLink to={'/exact-parent'} end>
      Parent with exact matching
    </NavLink>
    <NavLink to={'/exact-parent/child'} className={'sub-menu'}>
      Child
    </NavLink>
  </nav>
);

const meta: Meta<typeof NavMenu> = {
  component: NavMenu,
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { pathname } = useLocation();

    return (
      <>
        <NavMenu />
        <p>Current path is: {pathname}</p>
      </>
    );
  },
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        useStoryElement: true,
        path: '*', // Regardless of the current path, render the story
      },
    }),
  },
  decorators: [withRouter],
};
export default meta;

type Story = StoryObj<typeof NavMenu>;

export const Default: Story = {};

export const Child: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/parent/child2',
      },
    }),
  },
};

export const ExactChild: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/exact-parent/child',
      },
    }),
  },
};
