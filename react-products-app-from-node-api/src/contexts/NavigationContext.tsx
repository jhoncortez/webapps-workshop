import { createContext, useContext, useState } from "react";
import type { NavigationContextType } from "../vite-env.d.ts";

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentRoute, setCurrentRoute] = useState<string>(window.location.pathname)


    const updateCurrentRoute = (location_pathname?: string) => setCurrentRoute(location_pathname || window.location.pathname);


    return (
        <NavigationContext.Provider value={{ routeState: { currentRoute, updateCurrentRoute } }}>
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

