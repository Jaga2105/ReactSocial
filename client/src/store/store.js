import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./reducers/menuSlice";
import searchReducer from "./reducers/searchSlice";
import authReducer from "./reducers/authSlice";
import userReducer from "./reducers/userSlice";

const store = configureStore({
    reducer:{
        menu:menuReducer,
        search:searchReducer,
        auth:authReducer,
        user: userReducer
    }
})
export default store;