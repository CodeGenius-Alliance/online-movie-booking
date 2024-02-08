import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "../Reducer/UserReducer";
import { AdminReducer } from "../Reducer/AdminReducer";

export const Mytore= configureStore({
    reducer:{
        user:UserReducer,
        admin:AdminReducer
    }
})