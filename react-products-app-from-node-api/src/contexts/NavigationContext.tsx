import { createContext, useContext, useState, useEffect } from "react";
import type { NavigationContextType, Routes } from "../vite-env.d.ts";
import { compile } from "path-to-regexp";

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentRoute, setCurrentRoute] = useState<string>(window.location.pathname);

    const navigate = (route: Routes | string, params?: Record<string, string>) => {
        const targetRoute = getPathFromRoute(route, params || {});
        // const targetRoute = getPathFromRoute(route);
        setCurrentRoute(targetRoute.path);
        window.history.pushState({}, "", targetRoute.path);
    };

    const updateCurrentRoute = () => setCurrentRoute(window.location.pathname);

    useEffect(() => {
        const handlePopState = () => {
            setCurrentRoute(window.location.pathname);
        };

        window.addEventListener("popstate", handlePopState);
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    return (
        <NavigationContext.Provider value={{ routeState: { currentRoute, updateCurrentRoute }, navigate }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigationContext = () => {
    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error("useNavigationContext must be used within a NavigationProvider");
    }
    return context;
};

const getPathFromRoute = (route: string, params: Record<string, string>): { route: string; path: string } => {
    const dynamicRoute = route.startsWith("/") ? route : `/${route}`;
    const toPath = compile(dynamicRoute, { encode: encodeURIComponent });
    const path = toPath(params);
    return { route: dynamicRoute, path };
};
