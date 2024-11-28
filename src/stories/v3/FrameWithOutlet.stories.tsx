import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { reactRouterParameters } from '../../features/decorator/utils/routesHelpers/reactRouterParameters';
import { withRouter } from '../../features/decorator/withRouter';

const FrameWithOutlet = () => {
  const { pathname } = useLocation();

  return (
    <main>
      <p>This is some context out of the page.</p>
      <p>The current path is: {pathname}</p>
      <Outlet />
    </main>
  );
};

const FrameContent = ({ label, backUrl }: { label: string; backUrl: string }) => (
  <div>
    <p>{label}</p>
    <ul>
      <li>
        <Link to={backUrl}>go back</Link>
      </li>
    </ul>
  </div>
);

const meta: Meta<typeof FrameWithOutlet> = {
  component: FrameWithOutlet,
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        // Render the story as the root element, with a couple of example children
        path: '/',
        useStoryElement: true,
        children: [
          {
            index: true,
            element: (
              <div>
                <p>This is the index content</p>
                <ul>
                  <li>
                    <Link to={'first'}>First Child</Link>
                  </li>
                  <li>
                    <Link to={'second'}>Second Child</Link>
                  </li>
                </ul>
              </div>
            ),
          },
          {
            path: 'first',
            element: <FrameContent label={'This is some child content'} backUrl={'..'} />,
          },
          {
            path: 'second',
            element: <FrameContent label={'This is a different page of child content'} backUrl={'..'} />,
          },
        ],
      },
    }),
  },
  decorators: [withRouter],
};
export default meta;

type Story = StoryObj<typeof FrameWithOutlet>;

export const Default: Story = {};

export const StartsOnChild: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        path: '/first',
      },
    }),
  },
};
