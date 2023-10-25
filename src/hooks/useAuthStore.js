import { useDispatch, useSelector } from "react-redux"
import { calendarApi } from "../api"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice"
import { onLogoutCalendar } from "../store/calendar/calendarSlice"

const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const startLogin = async({ email, password }) => {
        dispatch( onChecking() )
        console.log({ email, password })

        try {
            const { data } = await calendarApi.post('/auth', { email, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch( onLogin({ name: data.name, uid: data.uid }) )
        } catch (e) {
            dispatch( onLogout('Credenciales incorrectas') )
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10)
        }

    }

    // startRegister

    const startRegister = async({ name, email, password }) => {
        dispatch( onChecking() )
        console.log({ name, email, password })
        try {
            const { data } = await calendarApi.post('/auth/new', { name, email, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }))
        } catch (e) {
            dispatch( onLogout(e.response.data?.msg || '--' ) )
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10)
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token')
        if ( !token ) return dispatch( onLogout() )

        try {
            const { data } = await calendarApi.get('auth/renew')
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({ name: data.name, uid: data.uid }))
        } catch (e) {
            localStorage.clear()
            dispatch( onLogout() )
        }
    }

    const startLogout = () => {
        localStorage.clear()
        dispatch(onLogoutCalendar())
        dispatch(onLogout())
    }

    return {
        //* Propiedades
        status,
        user,
        errorMessage,
        //* Metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,
    }
}

export {
    useAuthStore
}