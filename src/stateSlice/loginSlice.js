import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLogin: null,
        dataUser: []
    },
    reducers: {
        login: (state, actions) => {
            state.isLogin = true
            state.dataUser = actions.payload
        },
        logout: (state) => {
            state.isLogin = false
            state.dataUser = []
        }
    }
})

export const { login, logout } = loginSlice.actions

export default loginSlice.reducer