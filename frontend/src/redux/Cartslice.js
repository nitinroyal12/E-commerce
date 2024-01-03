import { createSlice } from "@reduxjs/toolkit";

const cartdata = () =>{
    let newcartdata = localStorage.getItem("cart")
    if(newcartdata){
        return JSON.parse(newcartdata)
    }
}

const Cartslice = createSlice({
    name:"cart",
    initialState:cartdata() || [],
    reducers:{
        additem:(state,action)=>{
            console.log(action.payload);
            state.push(action.payload)
        },
        removeitem:(state,action)=>{
            return state.filter((item)=>item._id !== action.payload._id)
        }
    }
})


export const {additem,removeitem} = Cartslice.actions

export default Cartslice.reducer