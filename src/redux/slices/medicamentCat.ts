import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ICatMedicament, IInitialState, IResData } from "../../types";
import API from "../../axios";



export const FetchAllMedicCat = createAsyncThunk('/drugs-categories/FetchAllMedicCat', async () => {
    const { data } = await API.get(`/drugs-categories/?page_size=9`)
    return data
})



const initialState: IInitialState<IResData<ICatMedicament[]>> = {
    loading: false,
    data: null,
    error: ''
}


const CatMedicSlice = createSlice({
    name: 'medicalCat',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(FetchAllMedicCat.pending, (state) => {
                state.loading = true
                state.error = ''
            })
            .addCase(FetchAllMedicCat.rejected, (state) => {
                state.loading = false
                state.error = 'Не удалось получить данные!'
            })
            .addCase(FetchAllMedicCat.fulfilled, (state, { payload }) => {
                state.loading = false
                state.error = ''
                state.data = payload
            })
    },
})


export default CatMedicSlice.reducer
