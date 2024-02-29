import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IInitialState, IRates, IResData } from "../../types";
import API from "../../axios";



export const FetchAllRates = createAsyncThunk('/rates/FetchAllRates', async (payload: any) => {
    let query = new URLSearchParams(payload)
    for (let [key, item] of query.entries()) !item ? query.delete(key) : null;
    const { data } = await API.get(`/rates/?${query}`)
    return data
})




const initialState: IInitialState<IResData<IRates[]>> = {
    data: null,
    loading: false,
    error: ''
}




const RatesSlice = createSlice({
    name: 'rates',
    initialState,
    reducers: {
        clearError(state) {
            state.error = ''
        },
        setDelete(state, { payload }) {
            if (state.data) {
                let newData = state.data.results.filter(el => el.id != payload.id)
                state.data = { ...state.data, results: newData }
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(FetchAllRates.pending, (state) => {
                state.loading = true
            })
            .addCase(FetchAllRates.rejected, (state) => {
                state.loading = false
                state.error = 'Не удалось получить данные'
            })
            .addCase(FetchAllRates.fulfilled, (state, { payload }) => {
                state.loading = false
                state.data = payload
                state.error = ''
            })
    },
})

export default RatesSlice.reducer
export const RatesActions = RatesSlice.actions