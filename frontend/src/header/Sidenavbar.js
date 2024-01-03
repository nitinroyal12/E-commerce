import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faCircleInfo, faRightFromBracket, faSquarePlus, faRightToBracket, faClipboardList, faUserSlash, faLock } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";


function Sidenavbar() {
    const navigate = useNavigate()
    const [toggle, settoggle] = useState(true)
    const [modal, setmodal] = useState(true)
    const [account,setaccount] = useState(true)
    const [password,setpassword] = useState({
        password:null
    }) 
    const findseller = localStorage.getItem("type")

    const chack12 = () => {
        if (findseller == "seller") {
            return true
        } else {
            return false
        }
    }


    const handlesingout = () => {
        localStorage.clear()
        navigate("/")
        toast.success("Logout successful")
    }
    const id = localStorage.getItem("id")
    

    const handledelete = () => {
        axios.post("http://localhost:4000/user/deleteuser/"+id , password).then((res)=>{
            toast.success(res.data.message)
            localStorage.clear()
            navigate("/")
        }).catch((err)=>{
            toast.error(err.response.data.message)
        })
    }


    return (
        <>
            <aside className={`w-60 ${toggle ? "-translate-x-48" : ""} absolute   transition transform ease-in-out duration-1000  flex h-screen shadow-md shadow-slate-500 bg-white `}>


                <div className={`-right-0 transition transform ease-in-out duration-500 flex border-4 border-gray-500   dark:hover:bg-blue-500 hover:bg-purple-500 absolute top-2 p-3 rounded-full  ${toggle ? "rotate-0" : "rotate-90"}`} onClick={() => settoggle(!toggle)}>
                    <FontAwesomeIcon icon={faEllipsisVertical} className="text-2xl" />
                </div>




                <div className="mini mt-20 flex flex-col space-y-2 w-full h-[calc(100vh)]">


                    <div class={`w-60  block md:hidden bg-white border border-gray-200 rounded-lg mb-4 `}>
                        <div class="flex justify-end px-4 pt-1">
                            <button id="dropdownButton" data-dropdown-toggle="dropdown" class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button" >

                            </button>


                        </div>
                        <div class="flex flex-col items-center pb-10">
                            <img src="https://randomuser.me/api/portraits/men/20.jpg" alt="" class="rounded-full w-16 h-16 object-cover" />
                            <h5 class="mb-1 text-xl font-medium text-gray-900">email</h5>
                            <span class="text-sm text-gray-500 dark:text-gray-400">user name</span>

                        </div>
                    </div>







                    <div className="hover:ml-4 justify-end pr-5 hover:shadow-md hover:shadow-slate-800 hover:text-purple-500 dark:hover:text-blue-500 w-full  p-3 rounded-full transform ease-in-out duration-300 flex" onClick={() => { navigate("/setting"); settoggle(true) }}><p className="pe-5 text-lg font-semibold cursor-pointer" >Information</p>
                        <FontAwesomeIcon icon={faCircleInfo} className="text-2xl" />
                    </div>
                    <div className="hover:ml-4 justify-end pr-5 hover:shadow-md hover:shadow-slate-800 hover:text-purple-500 dark:hover:text-blue-500 w-full  p-3 rounded-full transform ease-in-out duration-300 flex" onClick={() => { navigate("change-password"); settoggle(true) }}><p className="pe-5 text-lg font-semibold cursor-pointer" >Change Password</p>
                        <FontAwesomeIcon icon={faLock} className="text-2xl" />
                    </div>
                    {chack12() ? <><div className="hover:ml-4 justify-end pr-5 hover:shadow-md hover:shadow-slate-800 hover:text-purple-500 dark:hover:text-blue-500 w-full  p-3 rounded-full transform ease-in-out duration-300 flex" onClick={() => { navigate("add"); settoggle(true) }}><p className="pe-5 text-lg font-semibold cursor-pointer" >Add product</p>
                        <FontAwesomeIcon icon={faSquarePlus} className="text-2xl" />
                    </div>
                        <div className="hover:ml-4 justify-end pr-5 hover:shadow-md hover:shadow-slate-800 hover:text-purple-500 dark:hover:text-blue-500 w-full  p-3 rounded-full transform ease-in-out duration-300 flex" onClick={() => { navigate("list"); settoggle(true) }}><p className="pe-5 text-lg font-semibold cursor-pointer" >Product List</p>
                            <FontAwesomeIcon icon={faClipboardList} className="text-2xl" />
                        </div>
                    </> :
                        <div className="hover:ml-4 justify-end pr-5  hover:text-purple-500 hover:shadow-md hover:shadow-slate-800 dark:hover:text-blue-500 w-full  p-3 rounded-full transform ease-in-out duration-300 flex" onClick={() => { navigate("loginseller"); settoggle(true) }} ><p className="pe-5 text-lg font-semibold cursor-pointer">Login Seller</p>
                            <FontAwesomeIcon icon={faRightToBracket} className="text-2xl" />
                        </div>}
                    <div className="hover:ml-4 justify-end pr-5  hover:text-purple-500 hover:shadow-md hover:shadow-slate-800 dark:hover:text-blue-500 w-full  p-3 rounded-full transform ease-in-out duration-300 flex" onClick={()=>setaccount(false)} ><p className="pe-5 text-lg font-semibold cursor-pointer" >Delete account</p>
                        <FontAwesomeIcon icon={faUserSlash} className="text-2xl" />
                    </div>
                    <div className="hover:ml-4 justify-end pr-5  hover:text-purple-500 hover:shadow-md hover:shadow-slate-800 dark:hover:text-blue-500 w-full  p-3 rounded-full transform ease-in-out duration-300 flex" onClick={() => { setmodal(!modal); settoggle(true) }}><p className="pe-5 text-lg font-semibold cursor-pointer" >Logout</p>
                        <FontAwesomeIcon icon={faRightFromBracket} className="text-2xl" />
                    </div>




                </div>



            </aside>



            {/* logoutmodal */}



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

            {/* account delete modal */}




            <div class={`min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 ${ account ? "hidden" : "flex"} justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover`} style={{backgroundImage: "url(https://images.unsplash.com/photo-1623600989906-6aae5aa131d4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1582&q=80);"}} id="modal-id">
                <div class="absolute bg-black opacity-80 inset-0 z-0"></div>
                <div class="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">

                    <div class="">

                        <div class="text-center p-5 flex-auto justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 flex items-center text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                            <h2 class="text-xl font-bold py-4 ">Are you sure?</h2>
                            <p class="text-sm text-gray-500 px-8">If You Do This. Then You Will Lose All Your Data</p>
                            <input class="border-2 w-full border-black sm:w-1/2 my-3 px-2" type="password" placeholder="Enter Password" onChange={(e)=>setpassword({password:e.target.value})}/>
                        </div>

                        <div class="p-3  mt-2 text-center space-x-4 md:block">
                            <button class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100" onClick={()=>setaccount(true)}>
                                Cancel
                            </button>
                            <button class="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600" onClick={handledelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Sidenavbar;