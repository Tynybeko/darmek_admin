import { NullLable } from './../../types/index';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IInitialState, IUser, IResData } from "../../types";
import axios from '../../axios'

export const FetchAllUser = createAsyncThunk('FetchAllUser/users', async (payload: { [key: string]: any }, { rejectWithValue }) => {
    for (let [key, item] of Object.entries(payload)) {
        if (!item) {
            delete payload[key]
        } else if (key === 'phone') {
            payload[key] = [item.slice(0, 4), item.slice(4, 7), item.slice(7, 10)].join(' ')
        }
    }
    const query = new URLSearchParams(payload).toString()
    try {
        const response = await axios.get(`/users?${query}`)
        return response.data
    } catch (e: any) {
        if (e.response && e.response.status === 403) {
            return rejectWithValue(e.response.data.detail);
        }
        else {
            return rejectWithValue('Не удается получить данные!');
        }
    }
})

interface IMyInitial extends IInitialState<IResData<IUser[]>> {
    single?: NullLable<IUser>
}


const initialState: IMyInitial = {
    loading: false,
    error: '',
    data: null,
    single: null
}



const UserSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setSingleUser(state, { payload }) {
            state.single = payload
        },
        clearError(state) {
            state.error = ''
        }

    },
    extraReducers(builder) {
        builder
            .addCase(FetchAllUser.pending, (state) => {
                state.loading = true
            })
            .addCase(FetchAllUser.rejected, (state, { payload }) => {
                state.loading = false
                state.error = payload as string ?? 'Не удалось получить данные!'
            })
            .addCase(FetchAllUser.fulfilled, (state, { payload }) => {
                state.loading = false
                state.error = ''
                state.data = payload
            })
    },
})



export default UserSlice.reducer
export const userAction = UserSlice.actions

