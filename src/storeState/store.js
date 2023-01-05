import { configureStore } from '@reduxjs/toolkit'
import loadingSlice from '../stateSlice/loadingSlice'
import loginSlice from '../stateSlice/loginSlice'
import sellerSlice from '../stateSlice/sellerSlice'

export default configureStore({
    reducer: {
        login: loginSlice,
        seller: sellerSlice,
        loading: loadingSlice,
    }
})