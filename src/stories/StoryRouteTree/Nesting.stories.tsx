import React from "react";
import {Link, Route, Routes, useParams} from "react-router-dom";
import {StoryRouteTree} from "../../components/StoryRouteTree";

export default {
  component: StoryRouteTree,
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
  args: {
    children: <NestedRoutes />,
    routePath: '/listing/*',
    browserPath: '/listing',
  }
}

export const MatchingRoute = {
  args: {
    children: <NestedRoutes />,
    routePath: '/listing/*',
    browserPath: '/listing/13',
  }
}

export const MatchingNestedRoute = {
  args: {
    children: <NestedRoutes />,
    routePath: '/listing/*',
    browserPath: '/listing/13/37',
  }
}