import {configureStore} from "@reduxjs/toolkit"
import cartreducer from "./Cartslice"
import Wishlistslice from "./Wishlistslice"
import Cartlocalstorage from "../middleware/CartLocalstorage"
import Wishlistlocalstorage from "../middleware/WishlistLocalstorage"
export const store = configureStore({
    reducer:{
        cart:cartreducer,
        wish:Wishlistslice
        
    },
    middleware :(getDefaultMiddleware)=>
    [...getDefaultMiddleware(), Cartlocalstorage,Wishlistlocalstorage]
  

   
})