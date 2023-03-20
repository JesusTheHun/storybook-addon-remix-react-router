import React from "react";
import {Link, Route, Routes, useParams} from "react-router-dom";
import {withRouter} from "../../withRouter";
import {FCC} from "../../fixes";

export default {
  decorators: [withRouter],
};

function NestedRoutes() {
  return <Routes>
    <Route index element={<Link to="13">Navigate to listing</Link>} />
    <Route path=":id/*" element={<Listing />} />
  </Routes>
}

function Listing() {
  const params = useParams();

  return (
    <div>
      <h1>Listing id: {params.id}</h1>
      <Routes>
        <Route index element={<Link to="37">Navigate to details</Link>} />
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
    }
  }
}

export const MatchingRoute = {
  render: () => <NestedRoutes />,
  parameters: {
    reactRouter: {
      routePath: '/listing/*',
      browserPath: '/listing/13',
    }
  }
}

export const MatchingNestedRoute = {
  render: () => <NestedRoutes />,
  parameters: {
    reactRouter: {
      routePath: '/listing/*',
      browserPath: '/listing/13/37',
    }
  }
}