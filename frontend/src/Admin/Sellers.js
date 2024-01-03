import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Action.css"

function Sellers() {

    const [data, setdata] = useState([])

    
        const filterseller = data.filter((item) => item.type === "seller")
        const filter1 =  filterseller.filter((item)=>item.authorization === false)
        
    

    const [senddata,setsenddata] = useState(true)


    const handletoggle = (mail) => {
        axios.post("http://localhost:4000/user/check",{senddata,mail}).then((res)=>{
            console.log(res);
            getdata()
        }).catch((err)=>{
            console.log(err);
        })
    }



    const getdata = () => {
        axios.get('http://localhost:4000/user/finduser').then((res) => {
            setdata(res.data.result)
        }).catch((err) => {
            console.log(err.message);
        })
    }

    useEffect(() => {
        getdata()
    }, [])
    return (
        <div className="flex flex-col">
            <h2 className="text-center text-4xl font-extrabold font-mono">block Seller's</h2>
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">

                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div >
                        <table className="min-w-full text-center text-md font-light">
                            <thead
                                className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                                <tr>
                                    <th scope="col" className=" px-6 py-4">Sr. No.</th>
                                    <th scope="col" className=" px-6 py-4"> Name</th>
                                    <th scope="col" className=" px-6 py-4">mail</th>
                                    <th scope="col" className=" px-6 py-4">contect</th>
                                    <th scope="col" className=" px-6 py-4">date</th>
                                    <th scope="col" className=" px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filter1.map((item) => {
                                    let date = new Date(item.createdAt)
                                    date = date.toLocaleDateString()
                                    return (
                                        <tr className="border-b dark:border-neutral-500">
                                            <td className="whitespace-nowrap  px-6 py-4 font-medium">1</td>
                                            <td className="whitespace-nowrap  px-6 py-4">{item.name}</td>
                                            <td className="whitespace-nowrap  px-6 py-4">{item.email}</td>
                                            <td className="whitespace-nowrap  px-6 py-4">{item.phone}</td>
                                            <td className="whitespace-nowrap  px-6 py-4">{date}</td>
                                            <td className="whitespace-nowrap  px-6 py-4">

                                                <input type="checkbox" className="checkbox" defaultChecked  onClick={()=>{setsenddata(!senddata);handletoggle(item.email)}} />
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Sellers;