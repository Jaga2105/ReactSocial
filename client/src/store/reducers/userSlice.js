import { createSlice } from "@reduxjs/toolkit";
// import { getLoggedInUser } from "../../hook/getLoggedInUser";
// import {getLoggedInUser} from "../../helpers/getLoggedInUser"

const INTIAL_STATE ={
    // user: getLoggedInUser() || null,
    isFetching: false
}
const userSlice = createSlice({
    name:"user",
    initialState: INTIAL_STATE,
    reducers:{
        // handleLogin:(state,action)=>{
        //     state.user = action.payload
        // },
        handleFetch:(state,action)=>{
            state.isFetching = action.payload
        },
    }
})

export const { handleFetch } = userSlice.actions;
export default userSlice.reducer;