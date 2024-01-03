import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Changepass() {
    const navigate = useNavigate()
    const [show, setshow] = useState(true)
    const email = localStorage.getItem("email")
    const [password ,setpassword] = useState({
        email:email,
        old:null,
        new:null,
        confirm:null
    })
    


    const handleclick = () => {
        if(password.old === null){
            toast.error("please Enter old password")
        }
        else if(password.new === null){
            toast.error("please Enter new  password")
        }
        else if(password.confirm === null){
            toast.error("please Enter confirm password")
        }
        else if (password.new.length < 6  ) {
            toast.error("password Must Required more then 5 letter")
        }
        else if (password.confirm != password.new){
            toast.error("New And Confirm Password is not Matched")
        }
        else{
            axios.post("http://localhost:4000/user/changepass",password).then((res)=>{
                toast.success(res.data.message)
                navigate("/")
            }).catch((err)=>{
                toast.error(err.response.data.message);
            })
        }
       
    }
    
    return (

        <div className="bg-gray-300">
            <div className="min-h-screen flex items-center justify-center">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">

                    <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">Change Account Password</h1>
                    <form>
                        <div className="mb-6">
                            <label for="first" className="block mb-2 text-sm text-gray-600">Old Password</label>
                            <input type={show ? "password" : "text"} id="first" name="old" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required onChange={(e)=>setpassword((prev)=>({...prev,old:e.target.value}))} />
                        </div>
                        <div className="mb-6">
                            <label for="middle" className="block mb-2 text-sm text-gray-600">New Password</label>
                            <input type={show ? "password" : "text"} id="middle" name="new" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required onChange={(e)=>setpassword((prev)=>({...prev,new:e.target.value}))} />
                        </div>
                        <div className="mb-6">
                            <label for="last" className="block mb-2 text-sm text-gray-600">Confirm New Password</label>
                            <input type={show ? "password" : "text"} id="last" name="confirm" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500" required onChange={(e)=>setpassword((prev)=>({...prev,confirm:e.target.value}))}/>
                        </div>
                        <div className="mb-6 flex">
                            
                            <input type="checkbox" id="show" className="me-2"  onChange={()=>setshow(!show)}/>
                            <label for="show" >show all Password</label>
                        </div>
                        <button type="button" className="w-1/3 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-4" onClick={handleclick}>Change Password</button>
                    </form>
                    <div className="text-center">
                        <p className="text-sm">Volver a <a href="#" className="text-cyan-600">Iniciar sesión</a></p>
                    </div>
                    <p className="text-xs text-gray-600 text-center mt-8">&copy; 2023 WCS LAT</p>
                </div>
            </div>
        </div>


    )
}

export default Changepass