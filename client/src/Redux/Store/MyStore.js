import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "../Reducer/UserReducer";
import { AdminReducer } from "../Reducer/AdminReducer";
import { CommonReducer } from "../Reducer";

export const MyStore= configureStore({
    reducer:{
        user:UserReducer,
        admin:AdminReducer,
        common:CommonReducer
    }
})