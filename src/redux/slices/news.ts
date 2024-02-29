import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IInitialState, INews, IResData } from "../../types";
import API from "../../axios";



export const FetchAllNews = createAsyncThunk('/news/FetchAllNews', async (payload: any) => {
    let query = new URLSearchParams(payload)
    for (let [key, item] of query.entries()) !item ? query.delete(key) : null;
    const { data } = await API.get(`/news/?${query}`)
    return data

})







const initialState: IInitialState<IResData<INews[]>> = {
    data: null,
    loading: false,
    error: ''
}


const NewsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        clearError(state) {
            state.error = ''
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
        },
        setData(state, { payload }) {
            if (state.data) {
                let newData = [payload, ...state.data.results]
                state.data = {...state.data, results: newData}
            }
        }

    },
    extraReducers(builder) {
        builder
            .addCase(FetchAllNews.pending, (state) => {
                state.loading = true
            })
            .addCase(FetchAllNews.rejected, (state) => {
                state.loading = false
                state.error = 'Не удалось получить данные!'
            })
            .addCase(FetchAllNews.fulfilled, (state, { payload }) => {
                state.loading = false
                state.data = payload
                state.error = ''
            })
    },
})

export default NewsSlice.reducer
export const NewsActions = NewsSlice.actions