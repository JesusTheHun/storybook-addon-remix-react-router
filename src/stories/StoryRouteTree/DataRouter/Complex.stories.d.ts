/**
 * Credits : https://github.com/remix-run/react-router
 * reactrouter.com
 */
/// <reference types="react" />
import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
declare const _default: {
    component: import("../../../fixes").FCC<import("../../../components/StoryRouteTree").StoryRouterProps>;
};
export default _default;
interface Todos {
    [key: string]: string;
}
declare function todoListAction({ request }: ActionFunctionArgs): Promise<Response | {
    ok: boolean;
}>;
declare function todoListLoader(): Promise<Todos>;
declare function todoLoader({ params }: LoaderFunctionArgs): Promise<string>;
export declare const TodoListScenario: {
    args: {
        routePath: string;
        loader: typeof todoListLoader;
        action: typeof todoListAction;
        outlet: {
            path: string;
            element: JSX.Element;
            loader: typeof todoLoader;
        };
        children: JSX.Element;
    };
};
