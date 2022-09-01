import React from 'react';
import {withRouter} from '../src';
import {Routes, Route, Link, useParams} from 'react-router-dom';

function ListingDetailPage() {
    const params = useParams();

    return (
        <div>
            <p>Parent Layout id: {params.id}</p>
            <Routes>
                <Route index element={<Link to="/1/1">Goto Sub Detail Page</Link>} />
                <Route path=":subId" element={<SubListingDetailPage />} />
            </Routes>
        </div>
    );
}

function SubListingDetailPage() {
    const params = useParams();
    return <p>Hello {params.subId}</p>;
}

export default {
    title: 'Example/DeepRouteNesting',
    component: ListingDetailPage,
    decorators: [withRouter],
};

const Template = () => (
    <Routes>
        <Route index element={<Link to="/1">Goto Id</Link>} />
        <Route path=":id/*" element={<ListingDetailPage />} />
    </Routes>
);

export const Default = Template.bind({});
Default.parameters = {
    reactRouter: {
        routePath: '/listing/*',
        browserPath: "/listing/1/1",
        routeParams: {
            no: 42
        }
    }
}
