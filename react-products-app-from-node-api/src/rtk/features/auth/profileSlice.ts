import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    profile: null,
    // token: null,
    loading: false,
    error: null
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        initRequest: (state, action) => {
            state.loading = true
            state.error = null
            // console.log('from reducer loading', state.loading)
            // console.log('from reducer error', state.error)
        },
        profileSuccess: (state, action) => {
            state.loading = false
            state.error = null
            state.profile = action.payload
            // state.token = action.payload.token
        },
        profileFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    }
})

export const { initRequest, profileSuccess, profileFail,} = profileSlice.actions
export default profileSlice.reducer