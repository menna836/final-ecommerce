import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./slices/CounterSlices";

 export const store =configureStore({
    reducer:{
       counter: counterReducer

    }
})

type rootState = ReturnType<typeof store.getState>