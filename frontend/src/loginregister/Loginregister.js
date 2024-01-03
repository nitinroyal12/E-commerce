import React, { useState } from "react";
import LoginUser from "./LoginUser";
import RegisterUser from "./RegisterUser";

function Loginregister  (){
    const [toggle,settoggle]= useState(true);
    
    const [show, setshow] = useState(true)
    return(
        <div class={`${show ? "flex" : "hidden"} h-screen w-full items-center justify-center fixed top-0 left-0 z-50 bg-gray-500 bg-opacity-75 bg-cover bg-no-repeat`} >
            {toggle ? <LoginUser settoggle={settoggle} setshow={setshow}/> : <RegisterUser settoggle={settoggle} setshow={setshow} />}
        </div>
    )
}

export default Loginregister;