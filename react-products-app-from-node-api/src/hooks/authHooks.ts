import { useMemo } from "react"
// import { createSelector } from "@reduxjs/toolkit"
import { useAppDispatch, useAppSelector } from "../rtk/hooks.ts"
import { loginRequest, registerRequest, logoutRequest, authFail } from "../rtk/features/auth/authSlice.ts"

export const useInitAuth = () => {


    // const selectUser = createSelector(
    //     (state) => state.auth.user,
    //     (user) => user
    // )


    const dispatch = useAppDispatch()
    const { user, loading, error} = useAppSelector((state) => state.auth)

    const dispatchLogout = useMemo(() => () => {
        dispatch(logoutRequest())
    }, [])

    const IsAuth = useMemo(() => () => {
        // const user = useAppSelector((state) => state.auth.user)
        return !!user
    }, [user])

    const dispatchLogin = useMemo(() => ({ email, password }: {email: string, password: string}) => {
        dispatch(loginRequest({ email, password }))
    }, [])

    const dispatchRegister = useMemo(() => ({ email, password, name }: {email: string, password: string, name: string}) => {
        dispatch(registerRequest({ email, password, name }))
    }, [])

    const dispatchFail= useMemo(() => ({ error }: {error: string}) => {
        dispatch(authFail(error))
    }, [])

    return { dispatchLogout, IsAuth, dispatchLogin, dispatchRegister, error, loading, user, dispatchFail } 
}

