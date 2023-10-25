import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', // 'authenticated', 'not-authenticated',
        user: {},
        errorMessage: undefined
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking'
            state.user  = {}
            state.errorMessage = undefined
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated'
            state.user = payload
            state.errorMessage = undefined
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated'
            state.user  = {}
            state.errorMessage = payload
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined
        }
    }
});


// Action creators are generated for each case reducer function
const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;


export {
    onChecking,
    onLogin,
    onLogout,
    clearErrorMessage,
    authSlice
}