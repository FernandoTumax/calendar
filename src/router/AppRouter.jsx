import { Navigate, Route, Routes } from "react-router-dom"
import { LoginPage } from "../auth"
import { CalendarPage } from "../calendar"
import { getEnvVariables } from "../helpers"
import { useAuthStore } from "../hooks"
import { useEffect } from "react"
import { CheckingAuth } from "../ui"

const AppRouter = () => {

    const { checkAuthToken, status } = useAuthStore()

    //const authStatus = 'not-authenticated' // authenticated, not-authenticated

    useEffect(() => {
        checkAuthToken()
    }, [])
    
    
    if (status === 'checking') {
        return <CheckingAuth />
    }
    


    return (
        <Routes>
            {
                (status === 'not-authenticated' || status === 'checking')
                ? (
                    <>
                        <Route path="/auth/*" element={<LoginPage />} />
                        <Route path="/*" element={<Navigate to="/auth/login" />} />
                    </>
                )
                : (
                    <>
                        <Route path="/" element={<CalendarPage />} />
                        <Route path="/*" element={<Navigate to="/" />} />
                    </>
                )
            }

            {/* <Route path="/*" element={<Navigate to="/auth/login" />} /> */}
        </Routes>
    )
}

export {
    AppRouter
}
