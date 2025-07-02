// import { useMemo } from "react"
import type { ProfileDataBody } from "../vite-env.d.ts"
import { useAppDispatch, useAppSelector } from "../rtk/hooks.ts"
// import { useEffect } from "react"


export const useInitProfile = () => {
    const dispatch = useAppDispatch()
    const { loading, error, profile} = useAppSelector((state) => state.profile as any)

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

    // useEffect(() => {
    //     console.log('profile: ', profile)
    //     if(!profile) {
    //         dispatchGetProfile()
    //     }
    // }, [profile])

    return { dispatchGetProfile, dispatchUpdateProfile, dispatchUpdateProfilePreferences, dispatchUpdateProfileAvatar, loading, error, profile} 
}

