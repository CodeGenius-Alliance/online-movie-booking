import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "../Reducer/UserReducer";

export const Userstore= configureStore({
    reducer:{
        user:UserReducer
    }
})