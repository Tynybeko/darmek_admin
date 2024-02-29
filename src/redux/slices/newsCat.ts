import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IInitialState, INewsCategory, IResData } from "../../types";
import API from "../../axios";



export const FetchAllNewsCat = createAsyncThunk('/news-categories/FetchAllNewsCat', async (payload: any) => {
    let query = new URLSearchParams(payload)
    for (let [key, item] of query.entries()) !item ? query.delete(key) : null;
    const { data } = await API.get(`/news-categories/?${query}`)
    return data
})




const initialState: IInitialState<IResData<INewsCategory[]>> = {
    data: null,
    loading: false,
    error: ""
}


const NewsCategorySlice = createSlice({
    name: 'news_cat',
    initialState,
    reducers: {
        setUpdate(state, { payload }) {
            if (state.data) {
                let newData = state.data.results.map(item => item.id == payload.id ? { ...item, ...payload } : item)
                state.data = { ...state.data, results: newData }
            }
        },
        setDelete(state, { payload }) {
            if (state.data) {
                let newData = state.data.results.filter(el => el.id != payload.id)
                state.data = { ...state.data, results: newData }
            }

        },
        setData(state, { payload }) {
            if (state.data) {
                let newData = [payload, ...state.data.results]
                state.data = { ...state.data, results: newData }
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(FetchAllNewsCat.pending, (state) => {
                state.loading = true
            })
            .addCase(FetchAllNewsCat.rejected, (state) => {
                state.loading = false
                state.error = 'Ошибка при получении данных!'
            })
            .addCase(FetchAllNewsCat.fulfilled, (state, { payload }) => {
                state.loading = false
                state.data = payload
                state.error = ''
            })

    },
})



export default NewsCategorySlice.reducer
export const NewsCatActions = NewsCategorySlice.actions