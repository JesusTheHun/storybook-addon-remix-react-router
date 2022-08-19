# Storybook Addon React Router v6
[![Storybook](https://raw.githubusercontent.com/storybookjs/brand/master/badge/badge-storybook.svg?sanitize=true)](https://storybook.js.org)
[![npm](https://img.shields.io/npm/v/storybook-addon-react-router-v6?color=blue)](https://www.npmjs.com/package/storybook-addon-react-router-v6)
[![Release](https://github.com/JesusTheHun/storybook-addon-react-router-v6/actions/workflows/release.yml/badge.svg)](https://github.com/JesusTheHun/storybook-addon-react-router-v6/actions/workflows/release.yml)
![npm](https://img.shields.io/npm/dm/storybook-addon-react-router-v6)

> Use React Router v6 in your stories.


## Recent changes

✅ `withRouter` decorator parameters now accept `{ outlet: React.ReactNode }`  
✅ `withRouter` decorator parameters now accept `{ routeState: Location.state }`  
✅ Support for React 18 ([learn more](#compatibility))

## Getting Started
Install the package
 ```
 yarn add -D storybook-addon-react-router-v6
 ```
Add it to your storybook configuration:
```js
// .storybook/main.js
module.exports = {
    addons: ["storybook-addon-react-router-v6"],
};
```

## How to use it as a component decorator
To add the router to all the stories of a component, simply add it to the `decorators` array. 

Note that the `parameters.reactRouter` property is optional, by default the router will render the component at `/`.
```tsx
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'User Profile',
  component: UserProfile,
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routePath: '/users/:userId',
      routeParams: { userId: '42' },
    }
  }
};

export const Example = () => <UserProfile />;
```


## Usage at the story level
If you want to change the router config just for one story you can do the following :
```tsx
import { withRouter } from 'storybook-addon-react-router-v6';

export default {
  title: 'User Profile',
  component: UserProfile,
  decorators: [withRouter],
};

export const Example = () => <UserProfile />;
Example.story = {
  parameters: {
    reactRouter: {
      routePath: '/users/:userId',
      routeParams: { userId: '42' },
      searchParams: { tab: 'activityLog' },
      routeState: { fromPage: 'homePage' },
    }
  }
};
```
## Define a global default
If you want you can wrap all your stories inside a router by adding the decorator in your `preview.js` file.
```ts
// preview.js

export const decorators = [withRouter];

// you can also define global defaults parameters
export const parameters = {
  reactRouter: {
    // ...
  }
}
```

## Outlet

If your component renders an outlet, you can use composition to render your outlet _manually_, or you can set the `outlet` property :

<details>
    <summary>Composition (manually)</summary>

    ```js
    const CompositionTemplate = ({outlet, ...args}) => (
        <Routes>
            <Route path={"/"} element={<Menu {...args} />}>
                <Route index element={outlet} />
            </Route>
        </Routes>
    );
    
    export const Composition = CompositionTemplate.bind({});
    Composition.args = {
        outlet: <OrdersSubMenu />
    }
    ```

</details>

Usage of the `outlet` property :

```js
export const MenuWithOrdersContext = () => <Menu />;
MenuWithOrdersContext.story = {
    parameters: {
        reactRouter: {
            routePath: '/account',
            outlet: <OrdersSubMenu />,
        }
    }
};
```

## Compatibility

This package aims to support `Storybook > 6.4` and `React > 16`. 
Storybook versions prior `6.4` are very likely to work, I just didn't test them.

If you have an issue with any version, open an issue.

✅ Storybook 6.4  
✅ Storybook 6.5 

✅ React 16  
✅ React 17  
✅ React 18  


## Contribution

Contributions are welcome.

Before writing any code, file an issue to showcase the bug or the use case for the feature you want to see in this addon.
