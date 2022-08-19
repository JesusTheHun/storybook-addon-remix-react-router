import React from 'react';

import { withRouter } from '..'
import {Page} from './Page';
import {Button} from './Button';
import {Routes, Route} from 'react-router-dom';

export default {
    title: 'Example/Outlet',
    component: Page,
    decorators: [withRouter],
};

const CompositionTemplate = ({outlet, ...args}) => (
    <Routes>
        <Route path={"/"} element={<Page {...args} />}>
            <Route index element={outlet} />
        </Route>
    </Routes>
);

export const Composition = CompositionTemplate.bind({});
Composition.args = {
    outlet: <Button primary={true} label={"Composition"} />,
}

const AddonTemplate = (args) => <Page {...args} />;
export const AddonImplementation = AddonTemplate.bind({});
AddonImplementation.parameters = {
    reactRouter: {
        outlet: <Button primary={true} label={"AddonImplementation"} />,
    }
}
