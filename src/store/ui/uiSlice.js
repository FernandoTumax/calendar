import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false
    },
    reducers: {
        onOpenDateModal: (state) => {
            state.isDateModalOpen = true;
        },
        onCloseDateModal: (state) => {
            state.isDateModalOpen = false;
        }
    }
});


// Action creators are generated for each case reducer function
const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;


export {
    onOpenDateModal,
    onCloseDateModal,
    uiSlice,
}