import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { login } from "../yup/Schema";
import axios from "axios";
import { toast } from "react-toastify";
import App from "../App";

function LoginUser({setshow,settoggle}) {
    const navigate = useNavigate()
    const [change,setchange] = useState(true)

    const initialValues = {
        username: "",
        userpass: ""
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: login,
        onSubmit: (values) => {
            axios.post("http://localhost:4000/user/finduser", values).then((res) => {
                toast.success(res.data.message)
                localStorage.setItem("usertoken", res.data.token)
                localStorage.setItem("type", res.data.result.type);
                localStorage.setItem("email", res.data.result.email)
                localStorage.setItem("id", res.data.result._id)
                let date = new Date(res.data.result.createdAt)
                   date = date.toLocaleDateString()
                localStorage.setItem("createddate", date)
                navigate("/")
                window.location.reload()
                
            }).catch((err) => {
                toast.error(err.response.data.message)
            })
        }
    })

    return (

        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8 relative">
            <FontAwesomeIcon icon={faCircleXmark} className="absolute top-3 right-3 text-2xl cursor-pointer text-white" onClick={() => { setshow(false); navigate("/") }} />
            <div className="text-white">
                <div className="mb-8 flex flex-col items-center">

                    <h1 className="mb-2 text-2xl"><FontAwesomeIcon icon={faBagShopping} /> SABKI DUKAAN</h1>
                    <span className="text-gray-300">Welcome To SABKI DUKAAN</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 text-lg">
                        <input className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="text" name="username" placeholder="Enter E-mail" value={values.username} onChange={handleChange} onBlur={handleBlur} />
                        {errors.username && touched.username ? <p className="text-sm ps-2 text-red-300">{errors.username}</p> : null}
                    </div>

                    <div className="mb-4 relative text-lg">
                        <input className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type={change ? "Password" : "text"} name="userpass" placeholder="Enter Password"
                            value={values.userpass} onChange={handleChange} onBlur={handleBlur} />
                            {change ? <FontAwesomeIcon className="absolute right-5 top-3" icon={faEye} onClick={()=>setchange(false)} />
                            :
                            <FontAwesomeIcon className="absolute right-5 top-3" icon={faEyeSlash} onClick={()=>setchange(true)} />}

                        {errors.userpass && touched.userpass ? <p className="text-sm ps-2 text-red-300">{errors.userpass}</p> : null}
                        <Link to="/forget" className="block ">Forget Password </Link>
                    </div>
                    <div className="mt-8 flex justify-center text-lg text-black">
                        <button type="submit" className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600" >Login</button>
                    </div>
                    <p className="cursor-pointer" onClick={() => settoggle(false)}> Don't have An Account Create accout</p>
                </form>
            </div>
        </div>

    )
}

export default LoginUser;







