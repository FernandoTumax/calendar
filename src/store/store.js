import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { uiSlice } from "./ui/uiSlice"
import { calendarSlice } from "./calendar/calendarSlice"
import { authSlice } from "./auth/authSlice"


const store =  configureStore({
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
    }),
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer
    }
})

export {
    store
}