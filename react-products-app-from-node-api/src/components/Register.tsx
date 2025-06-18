import React from 'react'
import { useInitAuth } from '../hooks/authHooks'
// import { useAuthContext } from '../contexts/AuthContext'

import '../assets/css/auth.css'
// import { loginRequest } from '../redux/slices/authSlice'
// import { useDispatch } from 'react-redux'
const Login = () => {

    // const { dispatchLogout, IsAuth, dispatchLogin , user, error, loading} = useInitAuth()
    // const { dispatchLogout, IsAuth, dispatchLogin , user, error, loading} = useAuthContext()
    const { IsAuth, user, error, loading, dispatchRegister} = useInitAuth()


    // console.log('user: ', user)
    // console.log('IsAuth: ',IsAuth())
    // console.log('error: ', error)
    // console.log('loading: ', loading)


    const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        // console.log('formData', formData)
        const email = formData.get('email') as string | null
        const password = formData.get('password') as string | null
        const name = formData.get('name') as string | null

        if (!email || !password || !name ) {
            console.error('Email or Password or Name is not provided')
            return
        }

        try {
            // // console.log('credentials', { email, password })
            dispatchRegister({ email, password, name})
        } catch (error) {
            console.error('Login failed', error)
        }
    }
    return (
        <>
        {IsAuth()? (
            <div className="login-container">
                <p>Registered</p>
                <p>{user?.name}</p>
            </div>
            
            ): (
                <div className="login-container" style={ loading ? { background : '#f5f5f5'}: {backgroundColor: '#fff'} } >
                    <h1>Register Here</h1>
                    <form onSubmit={handleRegister} className={"login-form"}>
                        <input name="email" disabled={loading} type="email" placeholder="Email" className='login-input' />
                        <input name="password" disabled={loading}  type="password" placeholder="Password" className='login-input' />
                        <input name="name" disabled={loading}  type="text" placeholder="Name" className='login-input' />
                        <button type="submit" className={loading ? 'login-button login-button-disabled' : 'login-button'} disabled={loading}>
                            {!loading && error && (<span>Re-Try...</span>)}
                            {loading && (<span>Registering...</span>)}
                            {!loading && !error && (<span>Register</span>)}
                            </button>
                    </form>
                    
                    {error && <p className='login-error'>{error}</p>}
                </div>

            ) }
        
        </>
        
    )
}

export default Login