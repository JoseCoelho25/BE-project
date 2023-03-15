import {configureStore} from '@reduxjs/toolkit'

import authReducer from './slices/authSlice'
import shopReducer from './slices/shopSlice'


//where all the contexts are being stored
export const store = configureStore({
    reducer:{
        auth: authReducer,
        shop: shopReducer,
    }
})