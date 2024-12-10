import React from 'react';
import { Link, Route, Routes, useParams } from 'react-router';

import { reactRouterParameters, withRouter } from 'storybook-addon-remix-react-router';

export default {
  title: 'v2/DescendantRoutes',
  decorators: [withRouter],
};

function LibraryComponent() {
  return (
    <div>
      <Link to={''} relative={'route'}>
        Get back to the Library
      </Link>
      <p>Below is the Library {`<Routes />`}</p>
      <Routes>
        <Route index element={<LibraryIndexComponent />} />
        <Route path=":collectionId/*" element={<CollectionComponent />} />
      </Routes>
    </div>
  );
}

function CollectionComponent() {
  const params = useParams();
  return (
    <div>
      <h2>Collection: {params.collectionId}</h2>
      <p>Below is the Collection {`<Routes />`}</p>
      <Routes>
        <Route index element={<CollectionIndexComponent />} />
        <Route path="partnerBookId" element={<BookDetailsComponent />} />
        <Route path=":bookId" element={<BookDetailsComponent />} />
      </Routes>
    </div>
  );
}

function LibraryIndexComponent() {
  return (
    <div>
      <h2>Library Index</h2>
      <ul>
        <li>
          <Link to="13">Explore collection 13</Link>
        </li>
        <li>
          <Link to="14">Explore collection 14</Link>
        </li>
      </ul>
    </div>
  );
}

function CollectionIndexComponent() {
  return (
    <div>
      <ul>
        <li>
          <Link to="partnerBookId">See our partner's book</Link>
        </li>
        <li>
          <Link to="777">Pick a book at random</Link>
        </li>
      </ul>
    </div>
  );
}

function BookDetailsComponent() {
  const params = useParams();
  const isPartnerBook = params.bookId === undefined;
  return (
    <div>
      {isPartnerBook && <h3>Our partner book</h3>}
      {!isPartnerBook && <h3>Book id: {params.bookId}</h3>}
      <p>What a wonderful book !</p>
    </div>
  );
}

export const DescendantRoutesOneIndex = {
  render: () => <LibraryComponent />,
  parameters: {
    reactRouter: reactRouterParameters({
      location: { path: '/library' },
      routing: { path: '/library/*' },
    }),
  },
};

export const DescendantRoutesOneRouteMatch = {
  render: () => <LibraryComponent />,
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/library/*' },
      location: { path: '/library/13' },
    }),
  },
};

export const DescendantRoutesTwoRouteMatch = {
  render: () => <LibraryComponent />,
  parameters: {
    reactRouter: reactRouterParameters({
      routing: { path: '/library/*' },
      location: { path: '/library/13/777' },
    }),
  },
};
