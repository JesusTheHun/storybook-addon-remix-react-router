import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { reactRouterParameters } from '../../features/decorator/utils/routesHelpers/reactRouterParameters';
import { withRouter } from '../../features/decorator/withRouter';

const ComponentWithLinkFn = () => (
  <main>
    This <Link to={'../some-page'}>link</Link> takes you away from the component
  </main>
);

const meta: Meta<typeof ComponentWithLinkFn> = {
  title: 'v3/ComponentWithLink',
  component: ComponentWithLinkFn,
  parameters: {
    reactRouter: reactRouterParameters({
      location: { path: '/component' },
      routing: [
        {
          // The component links to some peer outside it's subtree
          path: 'component',
          useStoryElement: true,
        },
        {
          path: 'some-page',
          element: (
            <div>
              <p>This is not the component being storied</p>
              <ul>
                <li>
                  <Link to={'../component'}>go back</Link>
                </li>
              </ul>
            </div>
          ),
        },
      ],
    }),
  },
  decorators: [withRouter],
};
export default meta;

type Story = StoryObj<typeof ComponentWithLinkFn>;

export const ComponentWithLink: Story = {};
