import React from "react";
import Sidenavbar from "../header/Sidenavbar";
import { Outlet } from "react-router-dom";

function Setting() {
    return (
        <>
            <Sidenavbar />
            <div className="container pt-10  ps-8 ">
                <Outlet />
            </div>



        </>


    )
}

export default Setting;