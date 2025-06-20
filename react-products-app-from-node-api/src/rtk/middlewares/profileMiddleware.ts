import type { Middleware } from "@reduxjs/toolkit"
import { profileSuccess, profileFail } from "../features/auth/profileSlice"
import { getProfile, updateProfile } from "../services/profileApi"
import { authSuccess, logoutAction } from "../features/auth/authSlice"
import type { RootState } from '../../redux/store';


export const profileMiddleware: Middleware<RootState> = (store) => (next) => async (action: any) => {
    if (action.type === 'profile/getProfile') {
        try {
            store.dispatch({type: 'profile/initRequest'})
            const profile = await getProfile()
            // // console.log(profile)
            store.dispatch(profileSuccess(profile))
            store.dispatch(authSuccess({user: {_id: profile._id, email: profile.email}}))
        } catch (error: any) {
            store.dispatch(profileFail(error.message))
            if (error.message === 'Unauthorized') {
                store.dispatch(logoutAction())
            }
        }
    }

    if (action.type === 'profile/updateProfile') {
        try {
            // next(action)
            store.dispatch({type: 'profile/initRequest'})
            // const {email} = store.getState().auth.user

            const profile = await updateProfile(action.payload) 

            store.dispatch(profileSuccess(profile))
            store.dispatch(authSuccess({user: {_id: profile._id, email: profile.email}}))

        } catch (error: any) {
            console.log(error)
            store.dispatch(profileFail(error.message))
        }
    }

    return next(action)
}