import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IDiscount, IInitialState, IResData } from "../../types";
import API from "../../axios";

export const FetchAllDiscount = createAsyncThunk('/pharmacy/discounts/FetchAllDicount', async (payload: { [key: string]: any }) => {
    let query = new URLSearchParams(payload)
    for (let [key, item] of query.entries()) !item ? query.delete(key) : null
    const { data } = await API.get(`/pharmacy/discounts/?${query}`)
    return data
})


const initialState: IInitialState<IResData<IDiscount[]>> = {
    data: null,
    loading: false,
    error: ''
}


const DiscountSlice = createSlice({
    name: 'discount',
    initialState,
    reducers: {
        clearError(state) {
            state.error = ''
        },
        setData(state, { payload }: { payload: IDiscount }) {
            if (state.data) {
                let newData = [payload, ...state.data.results]
                state.data = { ...state.data, results: newData }
            }
        },
        setUpdate(state, { payload }) {
            if (state.data) {
                let newData = state.data.results.map(el => el.id == payload.id ? { ...el, ...payload } : el)
                state.data = { ...state.data, results: newData }
            }
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
            .addCase(FetchAllDiscount.pending, (state) => {
                state.loading = true
            })
            .addCase(FetchAllDiscount.rejected, (state) => {
                state.loading = false
                state.error = 'Не удалось получить данные!'
            })
            .addCase(FetchAllDiscount.fulfilled, (state, { payload }) => {
                state.loading = false
                state.error = ''
                state.data = payload
            })
    },
})

export default DiscountSlice.reducer
export const DiscountActions = DiscountSlice.actions