import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faUser } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { faL, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function Information() {
    const navigate = useNavigate()
    const email = localStorage.getItem("email")
    const [data, setdata] = useState([])
    const [toggle, settoggle] = useState(true);
    const [value, setvalue] = useState({
        email: null,
        f_name: null,
        l_name: null,
        dob: null,
        phone: null,
        address: null,
        city: null,
        state: null,
        postal_code: null
    })
    const [getvalue, setgetvalue] = useState([])

    const filterdata = data.filter((item) => item.data_h === email)

    const createddate = localStorage.getItem("createddate");

    const handledelete = (id) => {
        axios.delete("http://localhost:4000/info/find/" + id).then((res) => {
            toast.success(res.data.message);
            getdata()
        }).catch((err) => {
            console.log(err);
        })
    }
    const handlesave = () => {
        const id = getvalue._id
        axios.patch("http://localhost:4000/info/find/" + id, {
            email: value.email ? value.email : getvalue.email,
            f_name: value.f_name ? value.f_name : getvalue.f_name,
            l_name: value.l_name ? value.l_name : getvalue.l_name,
            dob: value.dob ? value.dob : getvalue.dob,
            phone: value.phone ? value.phone : getvalue.phone,
            address: value.address ? value.address : getvalue.address,
            city: value.city ? value.city : getvalue.city,
            state: value.state ? value.state : getvalue.state,
            postal_code: value.postal_code ? value.postal_code : getvalue.postal_code
        }).then((res) => {
            toast.success(res.data.message);
            settoggle(true)
            getdata()
        }).catch((err) => {
            console.log(err);
        })
    }
    const getdata = () => {
        axios.get("http://localhost:4000/info/find").then((res) => {
            setdata(res.data.result);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getdata()
    }, [])
    return (
        <>
            <div className="container  mx-auto my-5 p-5 ">

                <div className="md:flex no-wrap flex-col md:-mx-2 ">

                    <div className="max-w-full mx-3 sm:mx-10">

                        <div className="bg-white p-3 border-t-4 border-green-400">
                            <div className="image overflow-hidden">
                                <img className="h-auto w-full mx-auto"
                                    src="https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"
                                    alt="" />
                            </div>
                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{email}</h1>


                            <ul
                                className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="flex items-center py-3">
                                    <span>Status</span>
                                    <span className="ml-auto"><span
                                        className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Member since</span>
                                    <span className="ml-auto">{createddate}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="my-4"></div>


                    </div>
                    {filterdata.map((item) => {

                        return (

                            <div className="max-w-full py-10  mx-3 sm:mx-12 min-h-64 border-2 border-t-black ">

                                <div className="bg-white p-3 shadow-sm rounded-sm block">
                                    <div className=" items-center space-x-2 font-semibold text-gray-900 leading-8">

                                        <span className="tracking-wide"> <FontAwesomeIcon icon={faUser} className="pe-3" />About</span>
                                        <div className="float-right">
                                            <FontAwesomeIcon icon={faPenToSquare} className="text-xl pe-5 cursor-pointer " onClick={() => { setgetvalue(item); settoggle(false) }} />
                                            <FontAwesomeIcon icon={faTrash} className="text-xl cursor-pointer " onClick={() => handledelete(item._id)} />
                                        </div>
                                    </div>


                                    <div className="text-gray-700">
                                        <div className="grid md:grid-cols-2 text-sm">
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">First Name</div>
                                                <div className="px-4 py-2">{item.f_name}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Last Name</div>
                                                <div className="px-4 py-2">{item.l_name}</div>
                                            </div>

                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Contact No.</div>
                                                <div className="px-4 py-2">{item.phone}</div>
                                            </div>

                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Delivery Address</div>
                                                <div className="px-4 py-2">{`${item.address}, ${item.city}, ${item.state}`}</div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Email.</div>
                                                <div className="px-4 py-2 flex flex-wrap">
                                                    <Link className="text-blue-800" href="mailto:jane@example.com">{item.email}</Link>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2">
                                                <div className="px-4 py-2 font-semibold">Birthday</div>
                                                <div className="px-4 py-2">{item.dob}</div>
                                            </div>
                                        </div>
                                    </div>





                                </div>

                            </div>
                        )
                    })
                    }

                </div>

                <div className=" flex items-center ">
                    <button className="bg-gradient-to-b w-max mx-auto bg-black text-blue-800 font-semibold from-slate-50 to-blue-100 px-10 py-3 rounded-2xl shadow-blue-800 shadow-md border-b-4 hover  border-blue-200 hover:shadow-sm transition-all duration-500" onClick={() => navigate("/form")}>Add More</button>


                </div>
            </div>


            {/* modal */}




            <div className={`relative  z-10 ${toggle ? "hidden" : " block"}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">


                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <h3 className="text-center text-2xl font-sans font-bold">Edit Delivery Detail</h3>


                                <div>
                                    <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">email</label>
                                    <div className="mt-2">
                                        <input id="Name" name="Name" type="email" required className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={getvalue.email} onChange={(e) => setvalue((prev) => ({ ...prev, email: e.target.value }))} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                                    <div className="mt-2">
                                        <input id="Name" name="Name" type="text" required className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={getvalue.f_name} onChange={(e) => setvalue((prev) => ({ ...prev, f_name: e.target.value }))} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">Last Name </label>
                                    <div className="mt-2">
                                        <input id="Name" name="Name" type="text" required className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={getvalue.l_name} onChange={(e) => setvalue((prev) => ({ ...prev, l_name: e.target.value }))} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">DOB</label>
                                    <div className="mt-2">
                                        <input id="Name" name="Name" type="date" required className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={getvalue.dob} onChange={(e) => setvalue((prev) => ({ ...prev, dob: e.target.value }))} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">Phone NO.</label>
                                    <div className="mt-2">
                                        <input id="Name" name="Name" type="number" required className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={getvalue.phone} onChange={(e) => setvalue((prev) => ({ ...prev, phone: e.target.value }))} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">Delivery Address</label>
                                    <div className="mt-2">
                                        <input id="Name" name="Name" type="text" required className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={getvalue.address} onChange={(e) => setvalue((prev) => ({ ...prev, address: e.target.value }))} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">City</label>
                                    <div className="mt-2">
                                        <input id="Name" name="Name" type="text" required className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={getvalue.city} onChange={(e) => setvalue((prev) => ({ ...prev, city: e.target.value }))} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">State</label>
                                    <div className="mt-2">
                                        <input id="Name" name="Name" type="text" required className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={getvalue.state} onChange={(e) => setvalue((prev) => ({ ...prev, state: e.target.value }))} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">Postal Code</label>
                                    <div className="mt-2">
                                        <input id="Name" name="Name" type="number" required className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={getvalue.postal_code} onChange={(e) => setvalue((prev) => ({ ...prev, postal_code: e.target.value }))} />
                                    </div>
                                </div>
                            </div>


                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button type="button" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto" onClick={handlesave} >save</button>
                                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => settoggle(true)}>Cancel</button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Information;