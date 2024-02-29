import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IInitialState, INotification, IResData } from "../../types";
import API from "../../axios";




export const FetchAllNotification = createAsyncThunk('/notification/FetchAllNotification', async (payload: any) => {
    let query = new URLSearchParams(payload)
    for (let [key, item] of query.entries()) !item ? query.delete(key) : null;
    const { data } = await API.get(`/notification/?${payload}`)
    return data
})



const initialState: IInitialState<IResData<INotification[]>> = {
    data: null,
    loading: false,
    error: ''
}

const NotificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        clearError(state) {
            state.error = ''
        },
        setData(state, { payload }) {
            if (state.data) {
                let newData = [payload, ...state.data.results]
                state.data = { ...state.data, results: newData }
            }
        },
        setUpdate(state, { payload }) {
            if (state.data) {
                let newData = state.data.results.map(item => item.id == payload.id ? {...item, ...payload} : item)
                state.data = { ...state.data, results: newData }
            }
        },
        setDelete(state, {payload}) {
            if (state.data) {
                let newData = state.data.results.filter(item => item.id != payload.id)
                state.data = { ...state.data, results: newData }
            }
        }
        
    },
    extraReducers(builder) {
        builder
            .addCase(FetchAllNotification.pending, (state) => {
                state.loading = true
            })
            .addCase(FetchAllNotification.rejected, (state) => {
                state.loading = false
                state.error = 'Не удалось получить данные!'
            })
            .addCase(FetchAllNotification.fulfilled, (state, { payload }) => {
                state.loading = false
                state.data = payload
            })
    },
})


export default NotificationSlice.reducer
export const NotifActions = NotificationSlice.actions