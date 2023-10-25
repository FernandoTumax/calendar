import { useAuthStore } from "../../hooks/useAuthStore"

const NavBar = () => {

    const { startLogout, user } = useAuthStore()

    console.log(user)

    return (
        <div className="navbar navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                <i className="fas fa-calendar-alt"></i>
                &nbsp;
                { user.name }
            </span>

            <button className="btn btn-outline-light" onClick={ startLogout } >
                <i className="fas fa-sign-out-alt"></i>
                &nbsp;
                <span>Salir</span>
            </button>
        </div>
    )
}

export {
    NavBar
}