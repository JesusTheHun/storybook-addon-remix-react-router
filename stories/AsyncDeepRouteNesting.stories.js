import React, {useEffect, useState} from 'react';
import {withRouter} from '../src';
import {Link, Route, Routes, useParams} from 'react-router-dom';

function ListingDetailPage() {
    const params = useParams();
    const [showRoutes, setShowRoutes] = useState(false);

    useEffect(() => {
        const id = setTimeout(() => setShowRoutes(true), 1000);
        return () => clearTimeout(id);
    });

    if (!showRoutes) {
        return (
            <div>
                <p>Parent Layout id: {params.id}</p>
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <div>
            <p>Parent Layout id: {params.id}</p>
            <Routes>
                <Route index element={<Link to="/1/1">Goto Sub Detail Page</Link>} />
                <Route path={':subId'} element={<SubListingDetailPage />} />
            </Routes>
        </div>
    );
}

function SubListingDetailPage() {
    const params = useParams();
    return <p>Hello {params.subId}</p>;
}

export default {
    title: 'Example/AsyncDeepRouteNesting',
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
        browserPath: "/1/1",
        routeParams: {
            no: 42
        }
    }
}

export const Index = Template.bind({});
Index.parameters = {
    reactRouter: {
        browserPath: "/1",
        routeParams: {
            no: 42
        }
    }
}
