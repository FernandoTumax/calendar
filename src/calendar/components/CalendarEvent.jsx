import { CheckingAuth } from "../../ui/components/CheckingAuth"

const CalendarEvent = ({ event }) => {

    const { title, user } = event

    if (!user) {
        return (
        <>
        </>)
    }

    return (
        <>
            <strong>{ title }</strong>
            <span> - { user.name }</span>
        </>
    )
}

export {
    CalendarEvent
}
