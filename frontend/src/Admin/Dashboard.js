import { faChartColumn, faPeopleCarryBox, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Dashboard() {
    const [data,setdata] = useState([])

    const filteruser = data.filter((item)=>item.type === "user")
    
    const filterseller = data.filter((item)=>item.type === "seller")

    useEffect(()=>{
        axios.get('http://localhost:4000/user/finduser').then((res)=>{
            setdata(res.data.result)
        }).catch((err)=>{
            console.log(err.message);
        })
        
    },[])
    return (
        <>
            <h2 className="text-center py-5 font-serif font-bold text-4xl">Dashboard</h2>
            <div className="flex flex-wrap py-10">
                
                <div className=" mt-4 w-1/3  px-5">
                    <div className="relative  min-w-0 break-words bg-white rounded mb-4 xl:mb-0 shadow-lg hover:shadow-slate-800  duration-300">
                        <div className=" p-4">
                            <div className="">
                                <div className="relative w-auto  flex-initial text-center">
                                    <div className="text-white text-2xl p-3 text-center inline-flex items-center justify-center w-16 h-16 shadow-lg rounded-full  bg-red-500">
                                        <FontAwesomeIcon icon={faChartColumn} />
                                    </div>
                                </div>
                                <div className="relative w-full py-8 max-w-full flex-grow flex-1 text-center">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-3xl">Traffic</h5>
                                    <span className="font-semibold text-2xl text-blueGray-700 ">{filterseller.length+filteruser.length}</span>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                <div className=" mt-4 w-1/3  px-5">
                    <div className="relative  min-w-0 break-words bg-white rounded mb-4 xl:mb-0 shadow-lg hover:shadow-slate-800  duration-300">
                        <div className=" p-4">
                            <div className="">
                                <div className="relative w-auto  flex-initial text-center">
                                    <div className="text-white text-2xl p-3 text-center inline-flex items-center justify-center w-16 h-16 shadow-lg rounded-full  bg-pink-500">
                                        <FontAwesomeIcon icon={faPeopleCarryBox} />
                                    </div>
                                </div>
                                <div className="relative w-full py-8 max-w-full flex-grow flex-1 text-center">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-3xl">Seller's</h5>
                                    <span className="font-semibold text-2xl text-blueGray-700 ">{filterseller.length}</span>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                <div className=" mt-4 w-1/3  px-5">
                    <div className="relative  min-w-0 break-words bg-white rounded mb-4 xl:mb-0 shadow-lg hover:shadow-slate-800  duration-300">
                        <div className=" p-4">
                            <div className="">
                                <div className="relative w-auto  flex-initial text-center">
                                    <div className="text-white text-2xl p-3 text-center inline-flex items-center justify-center w-16 h-16 shadow-lg rounded-full  bg-pink-500">
                                        <FontAwesomeIcon icon={faUsers} />
                                    </div>
                                </div>
                                <div className="relative w-full py-8 max-w-full flex-grow flex-1 text-center">
                                    <h5 className="text-blueGray-400 uppercase font-bold text-3xl">User's</h5>
                                    <span className="font-semibold text-2xl text-blueGray-700 ">{filteruser.length}</span>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>


            </div>

        </>
    )
}

export default Dashboard;