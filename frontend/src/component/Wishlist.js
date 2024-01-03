import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {Removetowishlist} from "../redux/Wishlistslice"

function Wishlist() {
    const {wish} = useSelector(state => state);
    const dispatch = useDispatch()
    
    const navigate = useNavigate()
    const [wishlist,setwishlist]=useState(false);

    const removeitem = (item) => {
        dispatch(Removetowishlist(item))
    }
    
    return (
        <div className={`relative z-10 ${wishlist ? "hidden" : ''}`} aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">

                        <div className="pointer-events-auto w-screen max-w-md">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Wishlist</h2>
                                        <div className="ml-3 flex h-7 items-center">
                                            <button type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                                                <span className="absolute -inset-0.5" onClick={() => {setwishlist(true);navigate("/home")}}></span>
                                                <span className="sr-only">Close panel</span>
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" >
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {wish.map((item)=>{
                                                    return(
                                                        <li className="flex py-6">
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        <img src={`http://localhost:4000/${item.product_img}`} alt="product Image." className="pt-5 object-center" onClick={()=>navigate("/view",{state:{data:item}})}/>
                                                    </div>

                                                    <div className="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                <h3>
                                                                    <Link href="#">{item.product_name}</Link>
                                                                </h3>
                                                                <p className="ml-4">{`₹${item.product_price}`}</p>
                                                            </div>
                                                            <p className="mt-1 text-sm text-gray-500">{item.product_company}</p>
                                                        </div>
                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                            <p className="text-gray-500">Qty 1</p>

                                                            <div className="flex">
                                                                <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={()=>removeitem(item)} >Remove</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>  
                                                    )
                                                })}      
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">


                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                        <p>

                                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={()=>navigate("/home")}>
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    )
}

export default Wishlist