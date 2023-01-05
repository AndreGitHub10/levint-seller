import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
    name: 'loading',
    initialState: {
        isLoading: false
    },
    reducers: {
        onLoad: (state) => {
            state.isLoading = true
        },
        onDone: (state) => {
            state.isLoading = false
        }
    }
})

export const { onLoad, onDone } = loadingSlice.actions

export default loadingSlice.reducer