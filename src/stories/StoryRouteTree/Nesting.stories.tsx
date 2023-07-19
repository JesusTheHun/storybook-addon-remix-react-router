import React from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { withRouter } from '../../withRouter';

export default {
  title: 'Nesting',
  decorators: [withRouter],
};

function NestedRoutes() {
  return (
    <Routes>
      <Route index element={<Link to="13">Navigate to listing</Link>} />
      <Route path=":id/*" element={<Listing />} />
    </Routes>
  );
}

function Listing() {
  const params = useParams();

  return (
    <div>
      <h1>Listing id: {params.id}</h1>
      <Routes>
        <Route index element={<Link to="FixedId">Navigate to details</Link>} />
        <Route path=":subId" element={<SubListingDetailPage />} />
      </Routes>
    </div>
  );
}

function SubListingDetailPage() {
  const params = useParams();
  return <h2>Details id: {params.subId}</h2>;
}

export const IndexAtRoot = {
  render: () => <NestedRoutes />,
  parameters: {
    reactRouter: {
      routePath: '/listing/*',
      browserPath: '/listing',
    },
  },
};

function NestedRoutesWithProp({ foo = 1 }: { foo?: number }) {
  return (
    <Routes>
      <Route
        index
        element={
          <div>
            <h1>Story arg : {foo}</h1>
            <Link to={`${foo}`}>Navigate to listing</Link>
          </div>
        }
      />
      <Route
        path=":id/*"
        element={
          <div>
            <h2>Story arg : {foo}</h2>
            <Listing />
          </div>
        }
      />
    </Routes>
  );
}

export const IndexAtRootWithStoryArgs = {
  render: ({ foo }: { foo: number }) => <NestedRoutesWithProp foo={foo} />,
  parameters: {
    reactRouter: {
      routePath: '/listing/*',
      browserPath: '/listing',
    },
  },
  args: {
    foo: 42,
  },
};

export const MatchingRoute = {
  render: () => <NestedRoutes />,
  parameters: {
    reactRouter: {
      routePath: '/listing/*',
      browserPath: '/listing/13',
    },
  },
};

export const MatchingNestedRoute = {
  render: () => <NestedRoutes />,
  parameters: {
    reactRouter: {
      routePath: '/listing/*',
      browserPath: '/listing/13/37',
    },
  },
};
