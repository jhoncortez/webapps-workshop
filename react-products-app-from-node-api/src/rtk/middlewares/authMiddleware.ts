// import { login, logout, register } from '../../services/authApi';
// import { authSuccess, authFail, loginRequest, registerRequest } from '../features/auth/authSlice';
// import type { Middleware } from 'redux';
// import type { RootState } from '../store';
// import type { AuthenticatedUser } from '../../vite-env.d.ts';

// interface AuthAction {
//     type: any;
//     payload: {
//         email: string;
//         password: string;
//     };
// }

// const authMiddleware: Middleware<{}, RootState> = (store) => (next) => async (action: unknown) => {
//     if (
//         typeof action === 'object' &&
//         action !== null &&
//         'type' in action &&
//         (
//             action.type === loginRequest.type ||
//             action.type === registerRequest.type
//         ) &&
//         'payload' in action &&
//         typeof (action as any).payload === 'object' &&
//         (action as any).payload !== null &&
//         'email' in (action as any).payload &&
//         'password' in (action as any).payload
//     ) {
//         const { type, payload } = action as AuthAction;
//         switch (type) {
//             case loginRequest.type: {
//                 const { email, password } = payload;
//                 try {
//                     const user: AuthenticatedUser = await login(email, password);
//                     store.dispatch(authSuccess(user));
//                 } catch (error: any) {
//                     store.dispatch(authFail(error.message));
//                 }
//                 break;
//             }
//             case registerRequest.type: {
//                 const { email, password } = payload;
//                 try {
//                     const user: AuthenticatedUser = await register(email, password);
//                     store.dispatch(authSuccess(user));
//                 } catch (error: any) {
//                     store.dispatch(authFail(error.message));
//                 }
//                 break;
//             }
//         }
//     } else {
//         return next(action);
//     }
// };

// export default authMiddleware;

import { login, register, logout } from '../services/authApi';
import { authSuccess, authFail } from '../features/auth/authSlice';
import type { Middleware } from 'redux';
import type { RootState } from '../../redux/store';
// import type { AuthenticatedUser } from '../../vite-env.d.ts';

// interface AuthAction {
//     type: any;
//     payload: {
//         email: string;
//         password: string;
//     };
// }

export const authMiddleware: Middleware<{}, RootState> = (store) => (next) => async (action: unknown) => {
    if (typeof action === 'object' && action !== null && 'type' in action) {
        // Check for payload before using it
        if (action.type === 'auth/loginRequest') {
            if ('payload' in action) {
                next(action); // <-- This updates loading/error in the reducer to true/null 
                
                // console.log('loading-....:', store.getState().auth.loading)

                try {
                    const user = await login((action as any).payload);
                    store.dispatch(authSuccess({user: {_id: user._id, email: user.email}}));
                } catch (error: any) {
                    store.dispatch(authFail(error.message));
                }
                return
            }
            
        }

        else if (action.type === 'auth/registerRequest') {
            if ('payload' in action) {
                next(action); // <-- This updates loading/error in the reducer to true/null 
                try {
                    const user = await register((action as any).payload);
                    store.dispatch(authSuccess({user: {_id: user._id, email: user.email}}));
                } catch (error: any) {
                    store.dispatch(authFail(error.message));
                }
                return
            }
        }

        else if (action.type === 'auth/logoutRequest') {
        if ('payload' in action) {
            try {
                const loggedOut = await logout();
                if (!loggedOut) {
                    // store.dispatch(authSuccess({user: null}));
                    store.dispatch(authFail('Logout failed'));
                }
            } catch (error: any) {
                store.dispatch(authFail(error.message));
            } finally {
                next(action); // Ensure the logout action is still dispatched
            }
        }
        }

        // else if ( action.type === 'auth/profile') {
        //     if ('payload' in action) {
        //         try {
        //             const user = await action.payload;
        //             // console.log('user from profile', user)
        //             store.dispatch(profle(user));
        //         } catch (error: any) {
        //             store.dispatch(profle(null));
        //         }
        //         return
        //     }
        // }

        
        return next(action); // 
    }
}