import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeMenu: "Home"
}

const menuSlice = createSlice({
    name:"menu",
    initialState:initialState,
    reducers:{
        handleActiveMenu:(state, action)=>{
            state.activeMenu=action.payload
        }
    }
})
export const {handleActiveMenu} = menuSlice.actions;
export default menuSlice.reducer;