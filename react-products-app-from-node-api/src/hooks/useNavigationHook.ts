import { useEffect } from "react"
import { useNavigationContext } from "../contexts/NavigationContext"
import type { Routes } from "../vite-env.d"
import { getPathFromRoute } from "../utils/navigation"

export const useNavigationHook = () => {

    const { routeState } = useNavigationContext()

    /**
     * Navigates to a new route.
     * 
     * @param route The route to navigate to. This can be either a string or an object with a `path` property.
     * @param params Optional parameters to pass to the route.
     * is used by the Link component.
     */
    const navigate = (route: Routes | string, params?: Record<string, string>) => {
        const targetRoute = getPathFromRoute(route, params || {});
        // const targetRoute = getPathFromRoute(route);
        routeState.updateCurrentRoute(targetRoute.path)
        window.history.pushState({}, "", targetRoute.path);
    };

    /**
     * Handles popstate events.
     * 
     * This function is called whenever the user navigates using the browser's back or forward buttons.
     * It updates the current route state with the new location's pathname.
     */
    const handlePopState = () => {
        routeState.updateCurrentRoute(window.location.pathname); // Update the current route
    };

    // Listen for popstate events
    useEffect(() => {
        // routeState.updateCurrentRoute()
        // console.log(routeState.currentRoute)
        window.addEventListener("popstate", handlePopState); // Listen for popstate events
        return () => {
            window.removeEventListener("popstate", handlePopState); // Clean up
        };
    }, []);

    return {
        navigate, routeState: routeState
    }
}