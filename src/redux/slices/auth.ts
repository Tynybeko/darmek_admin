import type { IAuthRes, IUser, NullLable } from "../../types"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"


export type ILogin = {
    login: string,
    password: string
}

export const FetchLogin = createAsyncThunk('FetchLogin/accounts/login', async (payload: ILogin) => {
    const { data } = await axios.post('/accounts/login/', payload, { headers: { 'Content-Type': 'application/json' } })
    return data
})



export const FetchMyUser = createAsyncThunk("FetchLogin/accounts/profile", async () => {
    const { data } = await axios.get('/accounts/profile')
    return data
})

interface IInitialState {
    data: null | IAuthRes,
    loading: boolean,
    error: string,
    user: NullLable<IUser>
}

const initialState: IInitialState = {
    data: null,
    loading: false,
    error: '',
    user: null
}



const auth_slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError(state) {
            state.error = ''
        },
        logout(state) {
            state.data = null;
            state.user = null
            localStorage.removeItem('token')
            window.location.replace('/auth')
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
                localStorage.removeItem('token')
                state.data = null
            })
            .addCase(FetchLogin.fulfilled, (state, { payload }) => {
                state.loading = false
                state.data = payload
                localStorage.setItem('token', payload.token)
                state.error = ''
            })
            .addCase(FetchMyUser.pending, (state) => {
                state.loading = true
            })
            .addCase(FetchMyUser.rejected, (state) => {
                state.loading = false
                state.user = null

            })
            .addCase(FetchMyUser.fulfilled, (state, { payload }) => {
                state.loading = false
                if (payload && payload.role == 'client') {
                    localStorage.removeItem('token')
                    window.location.replace('/auth')
                }
                state.user = payload
                state.error = ''
            })
    },
})

export const { clearError, logout } = auth_slice.actions
export default auth_slice.reducer
