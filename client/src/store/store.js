import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./reducers/menuSlice";
import searchReducer from "./reducers/searchSlice";
import authReducer from "./reducers/authSlice";

const store = configureStore({
    reducer:{
        menu:menuReducer,
        search:searchReducer,
        auth:authReducer,
    }
})
export default store;