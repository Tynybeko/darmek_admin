import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IInitialState, IProduct, IResData } from "../../types";
import API from "../../axios";



export const FetchAllMedicaments = createAsyncThunk('/admin/medications/FetchAllMedicaments', async (payload: any) => {
    const query = new URLSearchParams(payload.query)
    for (let [key, item] of query.entries()) {
        console.log(!!item);
        
        if (!item) query.delete(key)
    }
    const { data } = await API.get(`/admin/medications/?${query}`)
    return data
})



const initialState: IInitialState<IResData<IProduct[]>> = {
    loading: false,
    error: '',
    data: null
}




const MedicamentsSlice = createSlice({
    name: 'medicaments',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(FetchAllMedicaments.pending, (state) => {
                state.loading = true
            })
            .addCase(FetchAllMedicaments.rejected, (state) => {
                state.loading = false,
                    state.error = 'Произошла ошибка при получении данных!'
            })
            .addCase(FetchAllMedicaments.fulfilled, (state, { payload }) => {
                state.loading = false
                state.data = payload
            })
    },
})



export default MedicamentsSlice.reducer