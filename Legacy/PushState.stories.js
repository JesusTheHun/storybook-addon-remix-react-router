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

const Template = (args) => <div>
    <h1>Decorator test for a component that updates the `location.state`</h1>
    <div>
        It should render :
        <pre>
            Sort : date <br/>
            State : "defaultSort"
        </pre>

        The `React Router` panel should show only two events :
        <ol>
            <li>Story rendered at {"`{ routeState: { fromEmail: true } }`"}</li>
            <li>Navigate to {"`{ routeState: \"defaultSort\" }`"}</li>
        </ol>
    </div>

    <h1 style={{ margin: '50px 0'}}>Actuel render below</h1>
    <div>
        <PushState {...args} />
    </div>
</div>;

export const Default = Template.bind({});
