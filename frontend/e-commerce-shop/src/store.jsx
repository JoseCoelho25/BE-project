import {configureStore} from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'


//where all the contexts are being stored
export const store = configureStore({
    reducer:{
        auth: authReducer,
    }
})