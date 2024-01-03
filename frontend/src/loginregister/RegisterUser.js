import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { useFormik } from "formik";
import { register } from "../yup/Schema";
import axios from "axios";
import { toast } from "react-toastify";

function RegisterUser({settoggle,setshow}) {
    const navigate = useNavigate()
    const [change,setchange] = useState(true)
    const initialValues = {
        name: "",
        email: "",
        phone: "",
        password: "",
        type: "user",
        authorization:true
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: register,
        onSubmit: (values) => {
            axios.post("http://localhost:4000/user/newuser", values).then((res) => {
                toast.success(res.data.message)
                settoggle(true)
            }).catch((err) => {
                toast.error(err.response.data.message)
                    })
            }
        
    })

   
    return (

        <div class="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8 relative">
            <FontAwesomeIcon icon={faCircleXmark} className="absolute top-3 right-3 text-2xl cursor-pointer text-white" onClick={() => { setshow(false); navigate("/") }} />
            <div class="text-white">
                <div class="mb-8 flex flex-col items-center">

                    <h1 class="mb-2 text-2xl"><FontAwesomeIcon icon={faBagShopping} /> SABKI DUKAAN</h1>
                    <span class="text-gray-300">Welcome To SABKI DUKAAN</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div class="mb-4 text-lg">
                        <input class="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="text" name="name" placeholder="Name" onBlur={handleBlur} onChange={handleChange} value={values.name} />
                        {errors.name && touched.name ? <p className="text-sm ps-2 text-red-300">{errors.name}</p> : null}
                    </div>
                    <div class="mb-4 text-lg">
                        <input class="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="email" name="email" placeholder="Email" onBlur={handleBlur} onChange={handleChange} value={values.email} />
                        {errors.email && touched.email ? <p className="text-sm ps-2 text-red-300">{errors.email}</p> : null}
                    </div>
                    <div class="mb-4 text-lg">
                        <input class="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="number" name="phone" placeholder="Phone No." onBlur={handleBlur} onChange={handleChange} value={values.phone} />
                        {errors.phone && touched.phone ? <p className="text-sm ps-2 text-red-300">{errors.phone}</p> : null}
                    </div>


                    <div class="mb-4 relative text-lg">
                        <input class="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type={change ? "Password" : "text"} name="password" placeholder="Password" onBlur={handleBlur} onChange={handleChange} value={values.password} />

                        {change ? <FontAwesomeIcon className="absolute right-7 top-3" icon={faEye} onClick={()=>setchange(false)} />
                            :
                            <FontAwesomeIcon className="absolute right-7 top-3" icon={faEyeSlash} onClick={()=>setchange(true)} />}
                        {errors.password && touched.password ? <p className="text-sm ps-2 text-red-300">{errors.password}</p> : null}
                    </div>
                    <div class="mt-8 flex justify-center text-lg text-black">
                        <button type="submit" class="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600" >Register</button>
                    </div>
                    <p className="cursor-pointer" onClick={() => settoggle(true)}> Do You have An Account Login accout</p>
                </form>
            </div>
        </div>

    )
}


export default RegisterUser