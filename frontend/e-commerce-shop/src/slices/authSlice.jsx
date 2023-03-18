import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";
import Cookies from 'js-cookie';


const user = Cookies.get('token') || null;
console.log(user)



const initialState = {
    user: user ? user : null,
    error: false,
    success: false,
    loading: false,
}

//Register an user and sign in
export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        const data = await authService.register(user)
        console.log(data.error)
        //check for errors
        if(data.error) {
            return thunkAPI.rejectWithValue(data.error)
        }

        return data;
    }
)

//logout an user
export const logout = createAsyncThunk('auth/logout', async() => {
    await authService.logout();
})

//Sign in an user
export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        const data = await authService.login(user)

        //check for errors
        if(data.error) {
            return thunkAPI.rejectWithValue(data.error)
        }

        return data;
    }
)


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
        })
        .addCase(logout.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = null;
        })
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.user = null;
        })
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;