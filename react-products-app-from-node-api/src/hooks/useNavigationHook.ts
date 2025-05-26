// import { useEffect } from "react"
import { useNavigationContext } from "../contexts/NavigationContext"

export const useNavigationHook = () => {

    // const { routeState } = useNavigationContext()

    // useEffect(() => {
    //     routeState.updateCurrentRoute()
    // })
    return useNavigationContext()
}