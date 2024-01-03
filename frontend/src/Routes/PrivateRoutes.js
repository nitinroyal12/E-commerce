import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../component/Home";
import Loginregister from "../loginregister/Loginregister";
import Cart from "../component/Cart";
import Wishlist from "../component/Wishlist"
import Setting from "../component/Setting"
import Form from "../Form/form";
import Information from "../component/Information"
import Loginseller from "../loginregister/Loginseller";
import Product from "../component/Product";
import Addproduct from "../component/Addproduct";
import Productlist from "../component/Productlist";
import Forgetpass from "../loginregister/Forgetpassword";
import Channgepass from "../loginregister/Changepassword";
import Searchinglist from "../component/Searchinglist";
import Changepass from "../component/Changepass";

function PrivateRoutes() {
    return (
        <Routes>
            
            <Route path="*" element={<Home />}>
                <Route path="login" element={<Loginregister />} />
                <Route path="forget" element={<Forgetpass/>}/>
                <Route path="changepassword" element={<Channgepass/>}/>
                <Route path="wishlist" element={<Wishlist />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/setting" element={<Setting />}>
                <Route index element={<Information />} />
                <Route path="loginseller" element={<Loginseller />} />
                <Route path="add" element={<Addproduct />} />
                <Route path="list" element={<Productlist />} />
                <Route path="change-password" element={<Changepass />} />
            </Route>
            <Route path="/form" element={<Form />} />
            <Route path="/view" element={<Product />} />
            <Route path="/search" element={<Searchinglist />} />
           
        </Routes>
    )
}

export default PrivateRoutes;