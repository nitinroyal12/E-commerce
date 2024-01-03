import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping, faBagShopping, faList, faEllipsis, faCircleXmark, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./header.css"
import { toast } from "react-toastify";

function Header() {
    const location = useLocation()
    const { cart, wish } = useSelector((state) => state)
    const navigate = useNavigate()
    const finduser = localStorage.getItem("usertoken")
    const email = localStorage.getItem("email")
    const [menu, setmenu] = useState(true)
    const [profile, setprofile] = useState(true)
    const [modal, setmodal] = useState(true)
    const [search,setsearch] = useState(true)
    const [searchdata,setsearchdata] = useState("")


    const handlesetting = () => {
        if (!finduser) {
            navigate("/login")
        } else {
            navigate("/setting")
        }
    }
    const handleuser = () => {
        if (!finduser) {
            navigate("/login")
        } else {
            setprofile(!profile)
        }
    }

    const handlesingout = () => {
        localStorage.clear()
        toast.success("Logout Successfull")
        setmodal(true)
        navigate("/")
        setprofile(true)

    }

    return (
        <>
            <nav id="header" className="w-full z-30  py-1 sticky top-0 bg-white">
                <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-6 py-3 ">

                    <label htmlFor="menu-toggle" className="cursor-pointer md:hidden block" onClick={() => {setmenu(!menu)}}>
                        <FontAwesomeIcon icon={faList} className="pe-2" />
                    </label>

                    <div className={`${menu ? "hidden" : "block"} shadow-2xl shadow-slate-400 md:shadow-none md:flex md:items-center md:w-auto w-full order-3 md:order-1`} id="menu">
                        <nav>
                            <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                                <li><Link to="/" className="inline-block relative no-underline  py-2 px-4 changehover" >Shop</Link></li>
                                <li onClick={handlesetting}><Link className={`inline-block no-underline  relative py-2 px-4 changehover`} >Setting</Link></li>
                                <li  onClick={()=>setsearch(!search)}><Link className={`${location.pathname === "/search" ? "hidden" : ""} inline-block no-underline  relative py-2 px-4`} ><FontAwesomeIcon icon={faMagnifyingGlass} /></Link></li>
                                <li ><Link to="/cart" className=" md:hidden inline-block no-underline  py-2  relative px-4 changehover" >Cart</Link></li>
                                <li ><Link to="/wishlist" className="md:hidden inline-block no-underline  py-2 px-4 relative changehover" >Wishlist</Link></li>
                                <li ><Link to="/wishlist" className="md:hidden inline-block no-underline  py-2 px-4 relative changehover" >Search</Link></li>


                            </ul>
                        </nav>
                    </div>

                    <div className="order-1 md:order-2">
                        <a className="flex items-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl " >
                            <FontAwesomeIcon icon={faBagShopping} className="pe-2" />
                            SABKI DUKAAN
                        </a>
                    </div>

                    <div className="order-2 md:order-3  items-center hidden md:flex" id="nav-content">
                        <div className=" inline-block no-underline hover:text-black relative" onClick={() => navigate("/wishlist")}>


                            <div className="t-0 absolute left-3" >
                                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">{wish ? wish.length : 0}</p>
                            </div>
                            <FontAwesomeIcon icon={faHeart} className="file: mt-2 h-6 w-6" />

                        </div>



                        <div className=" inline-block no-underline hover:text-black relative  px-7" onClick={() => navigate("/cart")} >


                            <div className="t-0 absolute right-5">
                                <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">{cart ? cart.length : 0}</p>
                            </div>
                            <FontAwesomeIcon icon={faCartShopping} className="file: mt-2 h-6 w-6" />

                        </div>

                        <button className="inline-block no-underline hover:text-black" >
                            <FontAwesomeIcon icon={faUser} onClick={handleuser} className="text-xl" />
                        </button>

                    </div>
                </div>
            </nav>




            {/* profile */}


            <div className={`w-60 ${profile ? "hidden" : "block"} bg-white border border-gray-200 rounded-lg shadow absolute right-10 z-10`}>
                <div className="flex justify-end px-4 pt-1">
                    <button id="dropdownButton" data-dropdown-toggle="dropdown" className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button" onClick={() => setprofile(true)}>
                        <FontAwesomeIcon icon={faCircleXmark} className="text-2xl" />
                    </button>


                </div>
                <div className="flex flex-col items-center pb-10">
                    <img src="https://randomuser.me/api/portraits/men/20.jpg" alt="" className="rounded-full w-16 h-16 object-cover" />
                    <h5 className="mb-1 text-xl font-medium text-gray-900">{email}</h5>

                    <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto mt-5" onClick={() => setmodal(false)} >Logout</button>

                </div>
            </div>


            {/* logout  */}


            <div className={`relative z-10 ${modal ? "hidden" : "block"}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Singout account</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">Are you sure you want to Singout your account?</p>


                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">

                                <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={handlesingout} >Signout</button>

                                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => setmodal(true)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* search bar */}
            <div className={`container px-2 sm:px-10  absolute z-20${location.pathname === "/search"  ? "" : search ? "hidden" : ""} `}>
                <div className="bg-white rounded-full border-none p-3 mb-4 shadow-md">
                    <div className="flex items-center">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                        <input type="text" placeholder="Search" className="ml-3 focus:outline-none w-full" onChange={(e)=>setsearchdata(e.target.value)} />
                        <button type="button" className=" text-center flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 py-2 px-10  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500" onClick={()=>navigate("/search",{state:{data:searchdata}})} >Search </button>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Header;