import { faBoxOpen, faClipboardList, faHome, faPaperclip, faRightFromBracket, faUserLarge, faUserLargeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate()
  const [modal,setmodal] = useState(true)
  const handlesingout = ()=>{
    localStorage.clear()
    setmodal(true)
    navigate("/home")
    window.location.reload()
  }
  return (
    <>
      <div className="flex min-h-screen flex-row bg-gray-100 text-gray-800">
        <aside className="sidebar w-48 -translate-x-full transform bg-white p-4 transition-transform duration-150 ease-in md:translate-x-0 md:shadow-md">
          <div className="my-4 w-full border-b-4 border-indigo-100 text-center">
            <span className="font-mono text-xl font-bold tracking-widest"> <span className="text-indigo-600">Admin</span> </span>
          </div>
          <div className="my-4 ">
            <div className="hover:shadow-md hover:shadow-slate-800 hover:text-purple-500 dark:hover:text-blue-500 py-2 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 cursor-pointer text-sm" href="#">
              <FontAwesomeIcon icon={faHome} />
              <Link to="/" className="font-QuicksandMedium text-lg font-bold">Dashboard</Link>
            </div>
            <div className="hover:shadow-md hover:shadow-slate-800 hover:text-purple-500 dark:hover:text-blue-500 py-2 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 cursor-pointer text-sm" href="#">
              <FontAwesomeIcon icon={faClipboardList} />
              <Link to="sellerlist" className="font-QuicksandMedium text-lg font-bold">Seller List</Link>
            </div>
            <div className="hover:shadow-md hover:shadow-slate-800 hover:text-purple-500 dark:hover:text-blue-500 py-2 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 cursor-pointer text-sm" href="#">
              <FontAwesomeIcon icon={faUserLarge} />
              <Link to="action" className="font-QuicksandMedium text-lg font-bold">Unblock Seller</Link>
            </div>
            <div className="hover:shadow-md hover:shadow-slate-800 hover:text-purple-500 dark:hover:text-blue-500 py-2 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 cursor-pointer text-sm" href="#">
              <FontAwesomeIcon icon={faUserLargeSlash} />
              <Link to="block" className="font-QuicksandMedium text-lg font-bold">block Seller</Link>
            </div>
            <div className="hover:shadow-md hover:shadow-slate-800 hover:text-purple-500 dark:hover:text-blue-500 py-2 w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 cursor-pointer text-sm" href="#">
              <FontAwesomeIcon icon={faRightFromBracket} />
              <Link  className="font-QuicksandMedium text-lg font-bold" onClick={()=>setmodal(false)}>Logout</Link>
            </div>
          </div>
        </aside>
        <main className="main -ml-48 flex flex-grow flex-col p-4 transition-all duration-150 ease-in md:ml-0">
          <Outlet />
        </main>
      </div>



      {/* logout modal */}


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
    </>
  )
}

export default Admin;