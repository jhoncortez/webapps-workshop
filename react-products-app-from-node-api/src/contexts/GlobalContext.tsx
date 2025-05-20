import { createContext, useContext } from "react";
import { useLoadingError } from "../hooks/mainHooks";

const GlobalContext = createContext<ReturnType<typeof useLoadingError> | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const loadingError = useLoadingError();
    return <GlobalContext.Provider value={loadingError}>{children}</GlobalContext.Provider>
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};