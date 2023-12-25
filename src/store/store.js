import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./reducers/menuSlice";
import searchReducer from "./reducers/searchSlice";

const store = configureStore({
    reducer:{
        menu:menuReducer,
        search:searchReducer
    }
})
export default store;