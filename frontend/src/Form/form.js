import { useFormik } from "formik";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { infoform } from "../yup/Schema"
import { useNavigate } from "react-router-dom";

function Form() {
    const navigate = useNavigate()
    const dataemail = localStorage.getItem("email");


    const initialValues = {
        data_h: dataemail,
        email: "",
        f_name: "",
        l_name: "",
        dob: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        postal_code: ""
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: infoform,
        onSubmit: (values) => {
            
        }
    })

    const handlesubmit = () => {
        axios.post("http://localhost:4000/info/create", values).then((res) => {
                toast.success(res.data.message);
                navigate("/setting")
            }).catch((err) => {
                toast.error(err.response.data.message)
                console.log(err);
            });
    }




    return (
        <section className=" py-1 bg-blueGray-50">
            <h6 className="text-blueGray-700 text-4xl font-bold text-center">
                Delivery Form
            </h6>
            <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 shadow-indigo-950 text-lg">
                    <div className="rounded-t bg-white mb-0 px-6 py-6">
                        <div className="text-center flex justify-between">
                            <h6 className="text-blueGray-700 text-xl font-bold">
                                Personal Information
                            </h6>

                        </div>
                    </div>
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form onSubmit={handleSubmit}>
                            <h6 className="text-blueGray-400  mt-3 mb-6 font-bold uppercase">
                                User Information
                            </h6>
                            <div className="flex flex-wrap">

                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Email address
                                        </label>
                                        <input type="email" className="shadow-indigo-950 text-lg px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded  shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="email" value={values.email} onBlur={handleBlur} onChange={handleChange} />
                                        {
                                            errors.email && touched.email ? <p className="text-red-700 ps-3" >{errors.email}</p> : null
                                        }
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            First Name
                                        </label>
                                        <input type="text" className="shadow-indigo-950 text-lg px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded  shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="f_name" value={values.f_name} onBlur={handleBlur} onChange={handleChange} />
                                        {
                                            errors.f_name && touched.f_name ? <p className="text-red-700 ps-3" >{errors.f_name}</p> : null
                                        }
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Last Name
                                        </label>
                                        <input type="text" className="shadow-indigo-950 text-lg px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded  shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="l_name" value={values.l_name} onBlur={handleBlur} onChange={handleChange} />
                                        {
                                            errors.l_name && touched.l_name ? <p className="text-red-700 ps-3" >{errors.l_name}</p> : null
                                        }
                                    </div>
                                </div>
                                <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            DOB
                                        </label>
                                        <input type="date" className="shadow-indigo-950 text-lg px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded  shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="dob" value={values.dob} onBlur={handleBlur} onChange={handleChange} />

                                        {
                                            errors.dob && touched.dob ? <p className="text-red-700 ps-3" >{errors.dob}</p> : null
                                        }
                                    </div>
                                </div>

                            </div>

                            <hr className="mt-6 border-b-1 border-blueGray-300" />

                            <h6 className="text-blueGray-400  mt-3 mb-6 font-bold uppercase">
                                Contact Information
                            </h6>
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Phone No.
                                        </label>
                                        <input type="number" className="shadow-indigo-950 text-lg px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded  shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="phone" value={values.phone} onBlur={handleBlur} onChange={handleChange} />
                                        {
                                            errors.phone && touched.phone ? <p className="text-red-700 ps-3" >{errors.phone}</p> : null
                                        }
                                    </div>
                                </div>
                                <div className="w-full lg:w-12/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Address
                                        </label>
                                        <input type="text" className="shadow-indigo-950 text-lg px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded  shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="address" value={values.address} onBlur={handleBlur} onChange={handleChange} />
                                        {
                                            errors.address && touched.address ? <p className="text-red-700 ps-3" >{errors.address}</p> : null
                                        }
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            City
                                        </label>
                                        <input type="text" className="shadow-indigo-950 text-lg px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded  shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="city" value={values.city} onBlur={handleBlur} onChange={handleChange} />
                                        {
                                            errors.city && touched.city ? <p className="text-red-700 ps-3" >{errors.city}</p> : null
                                        }
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            state
                                        </label>
                                        <input type="text" className="shadow-indigo-950 text-lg px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded  shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="state" value={values.state} onBlur={handleBlur} onChange={handleChange} />
                                        {
                                            errors.state && touched.state ? <p className="text-red-700 ps-3" >{errors.state}</p> : null
                                        }
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <div className="relative w-full mb-3">
                                        <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlFor="grid-password">
                                            Postal Code
                                        </label>
                                        <input type="text" className="shadow-indigo-950 text-lg px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded  shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" name="postal_code" value={values.postal_code} onBlur={handleBlur} onChange={handleChange} />
                                        {
                                            errors.postal_code && touched.postal_code ? <p className="text-red-700 ps-3" >{errors.postal_code}</p> : null
                                        }
                                    </div>
                                </div>
                            </div>



                            <button type="submit" class="bg-slate-500 hover:bg-slate-700 text-white text-base rounded-lg py-2.5 px-5 transition-colors w-full text-[19px]" onClick={handlesubmit} >Submit</button>
                        </form>

                    </div>
                </div>

            </div>
        </section>
    )
}
export default Form;