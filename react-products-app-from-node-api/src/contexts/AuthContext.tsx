import { createContext, use, useContext, useEffect } from "react";
import { useInitAuth } from "../hooks/authHooks";
import { useInitProfile } from "../hooks/profileHooks";
// import { useAppDispatch } from "../redux/hooks";
// import {getCurrentUser} from "../services/authApi"

interface AuthContextValue {
  dispatchLogout: () => void;
  IsAuth: () => boolean;
  dispatchLogin: ({ email, password }: { email: string; password: string }) => void;
  dispatchRegister: ({name, email, password, role }: { name: string; email: string; password: string; role: string }) => void;
  user: any;
  error: any;
  loading: any;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {

    // const dispatch = useAppDispatch()
    // const { } = useAppSelector((state) => state.auth)

    const { dispatchLogout, IsAuth, dispatchLogin , user, error, loading, dispatchRegister} = useInitAuth()
    const { dispatchGetProfile, profile } = useInitProfile()
    // dispatchLogout()
    useEffect(() => {
        
          if (IsAuth() && !profile && !loading) {

            console.log('its going to fetch')
  
              try {
                  // dispatch({type: 'auth/profile', payload: getCurrentUser()})
                  // dispatchGetProfile()
                  dispatchGetProfile()
              } catch (error) {
                  console.error('Error fetching profile', error)
              }
  
          }
          
    }, [IsAuth, profile, loading]);

    // useEffect(() => {
    //     // if profile is updated and the email has changed then logout
    //     console.log('profile', profile)
    //     console.log('user', user)
    //     if (user && profile && user.email !== profile.email) {
    //         console.log('email has changed')
    //         dispatchLogout()
    //     }
    // }, [profile, user])

    return (
        <AuthContext.Provider value={{ dispatchLogout, IsAuth, dispatchLogin, dispatchRegister, user, error, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within a AuthProvider");
    }
    return context;
}