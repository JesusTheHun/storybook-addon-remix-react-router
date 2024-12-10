import React from 'react';
import { useLoaderData } from 'react-router';

import { reactRouterParameters, withRouter } from 'storybook-addon-remix-react-router';

export default {
  title: 'v2/DataRouter/Lazy',
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
