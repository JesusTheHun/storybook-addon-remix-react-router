import React from 'react';

import { withRouter } from '../dist/esm'
import {PushState} from './PushState';

export default {
    title: 'Example/PushState',
    component: PushState,
    decorators: [withRouter],
    parameters: {
        reactRouter: {
            routeState: { fromEmail: true },
        }
    }
};

const Template = (args) => <PushState {...args} />;

export const Default = Template.bind({});
