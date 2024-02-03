import type { IUser } from "../../types"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"

export const FetchLogin = createAsyncThunk('FetchLogin/account/login', async (payload) => {
    const res = await axios.post('/account/login', payload)
    return res
})


interface IInitialState {
    data: null | IUser,
    loading: boolean,
    error: string
}

const initialState: IInitialState = {
    data: null,
    loading: false,
    error: ''
}



const auth_slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError(state) {
            state.error = ''
        }

    },
    extraReducers(builder) {
        builder
            .addCase(FetchLogin.pending, (state) => {
                state.loading = true
            })
            .addCase(FetchLogin.rejected, (state) => {
                state.loading = false
                state.error = 'Неправильный логин или пароль!'
                state.data = null
            })
            .addCase(FetchLogin.fulfilled, (state, { payload }) => {
                state.loading = false
                state.data = payload.data
                state.error = ''
            })
    },
})

export const { clearError } = auth_slice.actions
export default auth_slice.reducer
