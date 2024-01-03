import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Loginseller() {
    const navigate = useNavigate()
    const [value, setvalue] = useState({
        phone: null,
        password:null
    })

    const handleverify = () => {
        if (value.phone === null) {
            toast.error("Please Enter Register Phone No.")
        }else if(value.password === null){
            toast.error("Please Enter Password")
        } else {
            axios.post("http://localhost:4000/user/seller", value).then((res) => {
                toast.success(res.data.message)
                localStorage.clear()
                navigate("/home")
            }).catch((err) => {
                toast.error(err.response.data.message);
            })
        }

    }
    return (

        <div className="flex items-center justify-center h-screen bg-red-100">
            <div className="bg-white rounded-2xl border shadow-x1 p-10 max-w-lg">
                <div className="flex flex-col items-center space-y-4">
                    <h1 className="font-bold text-2xl text-gray-700 w-4/6 text-center">
                        SABKI DUKAAN
                    </h1>
                    <p className="text-sm text-gray-500 text-center w-5/6">
                        Hello, please enter your Register Phone No.
                    </p>
                    <input
                        type="number"
                        placeholder="Phone No."
                        className="border-2 rounded-lg w-full h-12 px-4"
                        onChange={(e) => setvalue((prev)=>({...prev, phone: e.target.value }))}
                    />

                    <input
                        type="password"
                        placeholder="password"
                        className="border-2 rounded-lg w-full h-12 px-4"
                        onChange={(e) => setvalue((prev) => ({...prev, password: e.target.value }))}
                    />
                    <button
                        className="bg-red-400 text-white rounded-md hover:bg-red-500 font-semibold px-4 py-3 w-full" onClick={handleverify}
                    >
                        Verify
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Loginseller;