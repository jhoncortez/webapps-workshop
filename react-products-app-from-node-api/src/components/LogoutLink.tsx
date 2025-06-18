import { useAuthContext } from '../contexts/AuthContext'
const LogoutLink = () => {

    const { dispatchLogout } = useAuthContext()
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        dispatchLogout()
    }
    return (
        <div>
            <a href="/logout" onClick={handleClick} >Logout</a>
        </div>
    )
}

export default LogoutLink