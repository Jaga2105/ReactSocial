import { createSlice } from "@reduxjs/toolkit";
// import { getLoggedInUser } from "../../hook/getLoggedInUser";
import {getLoggedInUser} from "../../helpers/getLoggedInUser"

const INTIAL_STATE ={
    // user: getLoggedInUser() || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    isFetching: false
}
const authSlice = createSlice({
    name:"auth",
    initialState: INTIAL_STATE,
    reducers:{
        handleLogin:(state,action)=>{
            state.user = action.payload
        },
        handleFetch:(state,action)=>{
            state.isFetching = action.payload
        },
        logoutuser:(state,action)=>{
            state.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('userExpiry');
        },
    }
})

export const { handleLogin, handleFetch, logoutuser } = authSlice.actions;
export default authSlice.reducer;