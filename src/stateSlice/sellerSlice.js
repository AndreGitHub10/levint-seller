import { createSlice } from "@reduxjs/toolkit";

export const sellerSlice = createSlice({
    name: 'sellerRegister',
    initialState: {
        isRegister: false,
        dataSeller: []
    },
    reducers: {
        sellerReg: (state, actions) => {
            state.isRegister = true
            state.dataSeller = actions.payload
        },
        sellerOff: (state) => {
            state.isRegister = false
            state.dataSeller = []
        }
    }
})

export const { sellerReg, sellerOff } = sellerSlice.actions

export default sellerSlice.reducer