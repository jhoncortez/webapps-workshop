import { useState } from "react"
// Custom hook to handle loading and error states
export const useLoadingError = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const refreshLoading = (loading: boolean): void => {
        setLoading(loading)
    }

    const refreshError = (error: string | null): void => {
        setError(error)
    }

    return {
        loading,
        error,
        refreshLoading,
        refreshError
    }

}