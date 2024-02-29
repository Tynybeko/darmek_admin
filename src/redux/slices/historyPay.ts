import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {  IInitialState, IOrder, IResData } from "../../types";
import API from "../../axios";


export const FetchAllHistory = createAsyncThunk(`/order/FetchAllHistory`, async (payload: { [key: string]: any }) => {
    let query = new URLSearchParams(payload)
    for (let [key, item] of query.entries()) !item ? query.delete(key) : null;
    const { data } = await API.get(`/order/?${query}`)
    return data
})





const initialState: IInitialState<IResData<IOrder[]>> = {
    data: null,
    loading: false,
    error: ''
}


const HistorySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        cleaeError(state) {
            state.error = ''
        }
    },
    extraReducers(builder) {
        builder
            .addCase(FetchAllHistory.pending, (state) => {
                state.loading = true
            })
            .addCase(FetchAllHistory.rejected, (state) => {
                state.loading = false
                state.error = 'Не удалось получить данные'
            })
            .addCase(FetchAllHistory.fulfilled, (state, { payload }) => {
                state.loading = false
                state.data = payload
                state.error = ''
            })
    },
})

export default HistorySlice.reducer
export const HistoryActions = HistorySlice.actions