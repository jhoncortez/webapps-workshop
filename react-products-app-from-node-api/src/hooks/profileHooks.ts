// import { useMemo } from "react"
import type { ProfileDataBody } from "../vite-env.d.ts"
import { useAppDispatch, useAppSelector } from "../redux/hooks.ts"


export const useInitProfile = () => {
    const dispatch = useAppDispatch()
    const { loading, error, profile} = useAppSelector((state) => state.profile)

    const dispatchGetProfile = () => {
        dispatch({type: 'profile/getProfile'})
    }

    const dispatchUpdateProfile = (profileDataBody: ProfileDataBody) => {
        dispatch({type: 'profile/updateProfile', payload: profileDataBody})
    }
    const dispatchUpdateProfilePreferences = () => {
        // TODO dispatch({type: 'profile/updatePreferences', payload: {}})
    }
    const dispatchUpdateProfileAvatar = () => {
        // TODO dispatch({type: 'profile/updateAvatar', payload: {}})
    }

    return { dispatchGetProfile, dispatchUpdateProfile, dispatchUpdateProfilePreferences, dispatchUpdateProfileAvatar, loading, error, profile} 
}

