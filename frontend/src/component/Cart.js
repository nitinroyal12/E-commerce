import React, { useEffect } from "react";
import "./Cart.css"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeitem } from "../redux/Cartslice";

function Cart() {
    const { cart } = useSelector(state => state);
    const dispatch = useDispatch()
    
    const navigate = useNavigate()
    
    const total = cart.reduce((a,b)=>a + b.product_price,0)
   
    return (
        <>

            <div className="w-full h-full  bg-opacity-90  overflow-y-auto overflow-x-hidden" id="chec-div">
                <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
                    <div className="flex items-center lg:flex-row flex-col justify-center" id="cart">
                        <div className="lg:w-1/2 md:w-8/12 w-full lg:px-8 lg:py-14 md:px-6 px-4 overflow-y-scroll md:py-8 py-4 bg-white   overflow-x-hidden lg:h-screen h-auto" id="scroll">
                            {
                                cart.map((item) => {
                                    return (
                                        <div className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-black">
                                            <div className="md:w-4/12 2xl:w-1/4 w-full">
                                                <img src={`http://localhost:4000/${item.product_img}`} alt="Black Leather Bag" className=" object-center md:block hidden" onClick={()=>navigate("/view",{state:{data:item}})} />
                                                <img src={`http://localhost:4000/${item.product_img}`} alt="Black Leather Bag" className="md:hidden w-full h-full object-center object-cover"  onClick={()=>navigate("/view",{state:{data:item}})}/>
                                            </div>
                                            <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                                                <p className="text-xs leading-3 text-gray-800 dark:text-black md:pt-0 pt-4">RF293</p>
                                                <div className="flex items-center justify-between w-full pt-1">
                                                    <p className="text-base font-black leading-none text-gray-800 dark:text-black">{item.product_name}</p>
                                                    <select aria-label="Select quantity" className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none">
                                                        <option>01</option>
                                                        <option>02</option>
                                                        <option>03</option>
                                                    </select>
                                                </div>
                                                <p className="text-xs leading-3 text-gray-600 dark:text-black pt-2">{item.product_company}</p>
                                                <p className="text-xs leading-3 text-gray-600 dark:text-black py-4">Color: Black</p>
                                                <p className="w-96 text-xs leading-3 text-gray-600 dark:text-black">Composition: 100% calf leather</p>
                                                <div className="flex items-center justify-between pt-5">
                                                    <div className="flex itemms-center">
                                                        <p className="text-xs leading-3 underline text-gray-800 dark:text-black cursor-pointer">Add to favorites</p>
                                                        <p className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer"onClick={()=>dispatch(removeitem(item))}>Remove</p>
                                                    </div>
                                                    <p className="text-base font-black leading-none text-gray-800 dark:text-black">{`₹${item.product_price}`}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="lg:w-96 md:w-8/12 w-full bg-gray-100 
                         h-full">
                            <div className="flex flex-col lg:h-screen h-auto lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6 justify-between overflow-y-auto">
                                <div>
                                    <p className="lg:text-4xl text-3xl font-black leading-9 text-gray-800 dark:text-black">Summary</p>
                                    <div className="flex items-center justify-between pt-16">
                                        <p className="text-base leading-none text-gray-800 dark:text-black">Subtotal</p>
                                        <p className="text-base leading-none text-gray-800 dark:text-black">{`₹${total}`}</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-5">
                                        <p className="text-base leading-none text-gray-800 dark:text-black">Shipping</p>
                                        <p className="text-base leading-none text-gray-800 dark:text-black">{`₹0`}</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-5">
                                        <p className="text-base leading-none text-gray-800 dark:text-black">Tax</p>
                                        <p className="text-base leading-none text-gray-800 dark:text-black">{`₹0`}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                                        <p className="text-2xl leading-normal text-gray-800 dark:text-black">Total</p>
                                        <p className="text-2xl font-bold leading-normal text-right text-gray-800 dark:text-black">{`₹${total}`}</p>
                                    </div>
                                    <button className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700">Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>



    )
}

export default Cart;