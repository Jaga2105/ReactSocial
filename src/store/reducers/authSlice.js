import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLoggedIn: false
    },
    reducers:{
        handleLogin:(state,action)=>{
            state.isLoggedIn = action.payload
        }
    }
})

export const { handleLogin } = authSlice.actions;
export default authSlice.reducer;