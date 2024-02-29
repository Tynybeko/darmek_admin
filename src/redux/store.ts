import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "."

const store = configureStore({
    reducer: rootReducer,
})

export type IRootState = ReturnType<typeof store.getState>
export default store