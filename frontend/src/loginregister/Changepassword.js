import { faBagShopping, faCircleXmark, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Channgepass() {
    const navigate = useNavigate()
    const [change,setchange] =useState(true)

    const mail = localStorage.getItem("email")
    const [pass,setpass] = useState({
        email:mail,
        password:null
    })
    
    const [show, setshow] = useState(true)

    const handlecreate  = ()=>{
        if(pass.password === null){
            toast.error("Enter New Password")
        }else if(pass.password.length < 6){
            toast.error("Enter 6 and More character ")
        }else{
            axios.post('http://localhost:4000/user/change',pass).then((res)=>{
                toast.success(res.data.message);
                localStorage.clear()
                navigate("/login")
            }).catch((err)=>{
                console.log(err);
            })
        }
       
    }
    return (
        <div class={`${show ? "flex" : "hidden"} h-screen w-full items-center justify-center fixed top-0 left-0 z-50 bg-gray-500 bg-opacity-75 bg-cover bg-no-repeat`} >
            <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8 relative">
                <FontAwesomeIcon icon={faCircleXmark} className="absolute top-3 right-3 text-2xl cursor-pointer text-white" onClick={() => { setshow(false); navigate("/") }} />
                <div className="text-white">
                    <div className="mb-8 flex flex-col items-center">

                        <h1 className="mb-2 text-2xl"><FontAwesomeIcon icon={faBagShopping} /> SABKI DUKAAN</h1>
                        <span className="text-gray-300">Welcome To SABKI DUKAAN</span>
                    </div>
                    <form >
                        

                        <div className="mb-4 relative text-lg">
                            <input className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type={change ? "Password" : "text"} name="userpass" placeholder="Enter New Password"
                              onChange={(e)=>setpass((prev)=>({...prev,password:e.target.value}))} />
                            {change ? <FontAwesomeIcon className="absolute right-5 top-3" icon={faEye} onClick={() => setchange(false)} />
                                :
                                <FontAwesomeIcon className="absolute right-5 top-3" icon={faEyeSlash} onClick={() => setchange(true)} />}

                           
                        </div>
                        <div className="mt-8 flex justify-center text-lg text-black">
                            <button type="button" className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600" onClick={handlecreate}>Create</button>
                        </div>
                       <Link to="/login">Go back to login page </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Channgepass;