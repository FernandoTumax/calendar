import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"
import calendarApi from "../api/calendarApi"
import { convertEventsToDateEvents } from "../helpers"
import Swal from "sweetalert2"

const useCalendarStore = () => {

    const dispatch = useDispatch()

    const { events, activeEvent } = useSelector(state => state.calendar)
    const { user } = useSelector(state => state.auth)
    
    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async( calendarEvent ) => {

        try {
            if (calendarEvent.id) {
                // Actualizando
    
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch( onUpdateEvent({ ...calendarEvent, user }) )
            } else {
                // Creando
                const { data } = await calendarApi.post('/events', calendarEvent)
                dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id, user }))
            }
        } catch (e) {
            console.log(e)
            Swal.fire('Error al guardar', e.response.data?.msg, 'error')
        }
    }

    const startDeletingEvent = async () => {
        // TODO: Llegar al backend

        try {
            await calendarApi.delete(`/events/${activeEvent.id}`)
            dispatch(onDeleteEvent())
        } catch (e) {
            console.log(e)
            Swal.fire('Error al eliminar el evento', e.response.data?.msg, 'error')
        }
    }

    const startLoadingEvents = async() => {
        try {
            const { data } = await calendarApi.get('/events')
            const events = convertEventsToDateEvents(data.events)
            dispatch(onLoadEvents({ events }))
        } catch (e) {
            console.log('Error cargando eventos')
            console.log(e)
        }
    }

    return {
        //* Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        //* Methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents,
    }
}

export {
    useCalendarStore
}