import { createSlice } from "@reduxjs/toolkit"

interface AuthenticatedUser {
    _id: string
    email: string
    error?: string
}

const initialState = {
    user: null as AuthenticatedUser | null,
    // token: null,
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state, action) => {
            state.loading = true
            state.error = null
            // console.log('from reducer loading', state.loading)
            // console.log('from reducer error', state.error)
        },
        registerRequest: (state, action) => {
            state.loading = true
            state.error = null    
        },
        authSuccess: (state, action: { payload: { user: AuthenticatedUser }  }) => {
            console.log('from reducer loading', state.loading)
            state.loading = false
            state.error = null
            state.user = action.payload.user
            // state.token = action.payload.token
        },
        authFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logoutRequest: (state) => {
            state.user = null
            // state.token = null  
        },
        // profle: (state, action) => {
        //     state.user = action.payload;
        //     state.loading = false
        //     state.error = null
        // }
        // updateUser: (state, action) => {
        //     // console.log('updatedAuthuser', action.payload)
        //     state.user = action.payload;
        //     state.loading = false
        //     state.error = null
        // }

    }
})

export const { loginRequest, registerRequest, authSuccess, authFail, logoutRequest } = authSlice.actions
export default authSlice.reducer