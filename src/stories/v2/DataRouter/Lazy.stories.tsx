import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { reactRouterParameters } from '../../../features/decorator/utils/routesHelpers/reactRouterParameters';
import { withRouter } from '../../../features/decorator/withRouter';

export default {
  title: 'v2/Lazy',
  decorators: [withRouter],
};

export const LazyRouting = {
  render: () => {
    const data = useLoaderData() as { count: number };
    return <div>Data from lazy loader : {data.count}</div>;
  },
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        lazy: async () => {
          const { getCount } = await import('./lazy');
          return { loader: getCount };
        },
      },
    }),
  },
};
