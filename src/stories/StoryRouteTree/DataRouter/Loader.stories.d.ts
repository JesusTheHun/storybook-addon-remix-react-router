/// <reference types="react" />
declare const _default: {
    component: import("../../../fixes").FCC<import("../../../components/StoryRouteTree").StoryRouterProps>;
};
export default _default;
export declare const RouteLoader: {
    args: {
        loader: () => Promise<{
            foo: unknown;
        }>;
        children: JSX.Element;
    };
};
export declare const RouteAndOutletLoader: {
    args: {
        loader: () => Promise<{
            foo: unknown;
        }>;
        children: JSX.Element;
        outlet: {
            element: JSX.Element;
            loader: () => Promise<{
                foo: unknown;
            }>;
        };
    };
};
declare function failingLoader(): Promise<void>;
export declare const ErrorBoundary: {
    args: {
        loader: typeof failingLoader;
        errorElement: JSX.Element;
        children: JSX.Element;
    };
};
