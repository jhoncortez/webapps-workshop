import { useCallback, useState } from "react"
// Custom hook to handle loading and error states
export const useLoadingError = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const refreshLoading = useCallback((loading: boolean): void => {
        setLoading(loading)
    }
    , [])

    const refreshError = useCallback((error: string | null): void => {
        setError(error)
    }, [])

    return {
        loading,
        error,
        refreshLoading,
        refreshError
    }


}