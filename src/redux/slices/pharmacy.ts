import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IInitialState, IPharmacy, IResData } from "../../types";
import API from "../../axios";


export const FetchAllPharmacy = createAsyncThunk('/pharmacy/FetchAllPharmacy', async (payload: { [key: string]: any }) => {
    let query = new URLSearchParams(payload)
    for (let [key, item] of query.entries()) {
        if (!item) query.delete(key)
    }
    const { data } = await API.get(`/pharmacy/?${query}`)
    return data
})



const initialState: IInitialState<IResData<IPharmacy[]>> = {
    loading: false,
    error: '',
    data: null
}



const PharmacySlice = createSlice({
    name: 'pharmacy',
    initialState,
    reducers: {
        clearError(state) {
            state.error = ''
        },
        deleteData(state, { payload }) {
            if (state.data) {
                const updatedResults = state.data.results.filter(el => el.id !== payload.id);
                state.data = { ...state.data, results: updatedResults };
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(FetchAllPharmacy.pending, (state) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(FetchAllPharmacy.rejected, (state) => {
            state.loading = false
            state.error = 'Не удалось получить данные!'
        })
        builder.addCase(FetchAllPharmacy.fulfilled, (state, { payload }) => {
            state.loading = false
            state.data = payload
            state.error = ''
        })
    },
})

export default PharmacySlice.reducer

export const PharmacyActions = PharmacySlice.actions