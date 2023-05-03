/// <reference types="react" />
declare const _default: {
    component: import("../../fixes").FCC<import("../../components/StoryRouteTree").StoryRouterProps>;
};
export default _default;
export declare const RenderChildren: {
    args: {
        children: JSX.Element;
    };
};
export declare const SpecificPath: {
    args: {
        routePath: string;
        children: JSX.Element;
    };
};
export declare const RouteParams: {
    args: {
        routePath: string;
        routeParams: {
            id: string;
        };
        children: JSX.Element;
    };
};
export declare const SearchParams: {
    args: {
        searchParams: {
            page: string;
        };
        children: JSX.Element;
    };
};
export declare const OutletJSX: {
    args: {
        outlet: JSX.Element;
        children: JSX.Element;
    };
};
export declare const OutletConfigObject: {
    args: {
        outlet: {
            element: JSX.Element;
        };
        children: JSX.Element;
    };
};
