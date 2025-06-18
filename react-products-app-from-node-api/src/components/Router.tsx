import React from "react";
import { useNavigationHook } from "../hooks/useNavigationHook";
import { getParamsFromRoute } from "../utils/navigation";
// import { match } from "path-to-regexp";


const Router =  ({ routes, children, DefaultPage }: { routes?: { path: string; component: React.ComponentType }[]; DefaultPage?: React.ComponentType ; children: React.ReactNode }) => {

    const { routeState: { currentRoute } } = useNavigationHook();

    // validate routes
    // if (!routes || routes.length === 0) {
    //     return <h1>No routes defined</h1>;
    // }
    // if (!children) {
    //     return <h1>No children provided</h1>;
    // }
    // if (!Array.isArray(routes)) {
    //     return <h1>Routes should be an array</h1>;
    // }
    // if (routes.length === 0) {
    //     return <h1>No routes defined</h1>;
    // }
    // if (routes.some(route => !route.path || !route.component)) {
    //     return <h1>All routes must have a path and a component</h1>;
    // }
    // if (routes.some(route => typeof route.path !== "string" || typeof route.component !== "function")) {
    //     return <h1>All routes must have a path of type string and a component of type function</h1>;
    // }
    // if (routes.some(route => route.path === "")) {    
    //     return <h1>Empty routes (/) are not supported</h1>;
    // }
    // if (routes.some(route => route.path === "/index")) {
    //     return <h1>Index route (/index) is not supported</h1>;
    // }

    // validate children
    if(!children ) {
        return <h1>No children provided</h1>;
    }
    if (!children || !React.Children.count(children)) {
        return <h1>No children provided</h1>;
    }
    const childRoutes = React.Children.map(children, (child) => {
        
        if (React.isValidElement(child)) {
            const props = child?.props;
            const type = child?.type;
            // // console.log(props);
            // const routeChild = child as React.ReactElement<{ path: string; Component: React.ComponentType }>;
            if (typeof type !== "function" || type.name !== "Route") {
                return null; // skip if the child is not a Route component
            }

            const childProps = props as { path: string; Component: React.ComponentType };
            if (!childProps.path || !childProps.Component) {
                return null; // skip if path or Component is not defined
            }

            const path = childProps.path;
            const Component = childProps.Component;

            if (typeof path === "string" && typeof Component === "function") {
                return { path, component: Component };
            }
        }
        return null;
    })

    // // console.log("Child Routes: ", childRoutes);

    const mixedRoutes = [...(routes || []), ...(childRoutes || [])]; // merge the routes from children with the routes passed as props

    // process the routes to get the current route and the params
    const { matchedRoute, params } =  getParamsFromRoute(currentRoute, mixedRoutes)


    if (matchedRoute) {
        const Component = matchedRoute.component; // get the component from the matched route
        return <Component {...params} />;
    }

    return DefaultPage? <DefaultPage /> : <h1>404 Not Found</h1>; // if no route matches, return the DefaultPage or a 404 message
};

export default Router;