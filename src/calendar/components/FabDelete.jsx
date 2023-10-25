import { useCalendarStore } from "../../hooks/useCalendarStore"

const FabDelete = () => {

    const { startDeletingEvent, hasEventSelected } = useCalendarStore()

    console.log(hasEventSelected)

    const handleDelete = () => {
        startDeletingEvent()
    }

    return (
        <button className="btn btn-danger fab-danger" onClick={ handleDelete }>
            <i className="fas fa-trash-alt"></i>
        </button>
    )
}


export {
    FabDelete
}