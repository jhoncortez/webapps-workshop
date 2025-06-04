import { compile, match } from "path-to-regexp";
export const getPathFromRoute = (route: string, params: Record<string, string>): { route: string; path: string } => {
    const dynamicRoute = route.startsWith("/") ? route : `/${route}`;
    const toPath = compile(dynamicRoute, { encode: encodeURIComponent });
    const path = toPath(params);
    return { route: dynamicRoute, path };
}

export const getParamsFromRoute = (currentRoute: string, mixedRoutes: { path: string; component: React.ComponentType }[]) => {

    const matchedRoute = mixedRoutes.find((route) => match(route.path, { decode: decodeURIComponent })(currentRoute)); // find the route that matches the current route
    const matchedResult = matchedRoute ? match(matchedRoute.path, { decode: decodeURIComponent })(currentRoute) : null; // match the current route against the route path
    // console.log('matchedResult', matchedResult)
    const params = matchedResult ? matchedResult.params as Record<string, string> : {};

    // console.log('params', params)
    return {
        matchedRoute,
        params,
    }
    
}
