import { createSlice } from "@reduxjs/toolkit";

const wishdata = ()=>{
const getwishdata = localStorage.getItem("wishlist")
if(getwishdata){
    return JSON.parse(getwishdata)
}
}

const wishlistslice = createSlice({
    name:"wishlist",
    initialState:wishdata() || [],
    reducers:{
        additemtowishlist:(state,action)=>{
            state.push(action.payload)
        },
        Removetowishlist:(state,action)=>{
            return state.filter((item)=>item._id !== action.payload._id)
        }
    }
})


export const {additemtowishlist,Removetowishlist} = wishlistslice.actions

export default wishlistslice.reducer