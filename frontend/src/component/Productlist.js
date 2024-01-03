import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Productlist() {
    const navigate = useNavigate()

    const [toggle,settoggle] = useState(true)
    const [value,setvalue] = useState({
        product_name:null,
        product_company:null,
        product_price:null,
        product_discount:null,
        product_description:null
        
    })
    const [change,setchange] = useState([])
    const [data, setdata] = useState([])
    const email = localStorage.getItem("email")
    const filterdata = data.filter((item) => item.headid === email);

    const handledelete = (id) => {
        axios.delete("http://localhost:4000/product/createproduct/" + id).then((res) => {
            toast.success(res.data.message)
            getdata()
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleview = (item) => {
        navigate("/view", { state: { data: item } })
    }

    const handlesave = () => {
        const id = change._id;
        axios.patch("http://localhost:4000/product/createproduct/"+id ,{
            product_name: value.product_name ? value.product_name : change.product_name,
            product_company: value.product_company ? value.product_company : change.product_company,
            product_price: value.product_price ? value.product_price : change.product_price,
            product_discount: value.product_discount ? value.product_discount : change.product_discount,
            product_description: value.product_description ? value.product_description : change.product_description,
        }).then((res) => {
            toast.success(res.data.message);
            settoggle(true)
            getdata()
        }).catch((err) => {
            console.log(err.message);
        })
    }
    const getdata = () => {
        axios.get("http://localhost:4000/product/createproduct").then((res) => {
            setdata(res.data.result);
        }).catch((err) => {
            console.log(err.message);
        })
    }

    useEffect(() => {
        getdata()
    }, [])
    return (
 <>
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div >
                        <table className="min-w-full text-center text-md font-light">
                            <thead
                                className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                                <tr>
                                    <th scope="col" className=" px-6 py-4">Sr. No.</th>
                                    <th scope="col" className=" px-6 py-4">Product Name</th>
                                    <th scope="col" className=" px-6 py-4">Product Company</th>
                                    <th scope="col" className=" px-6 py-4">date</th>
                                    <th scope="col" className=" px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterdata.map((item) => {
                                    let date = new Date(item.createdAt)
                                    date = date.toLocaleDateString()
                                    return (
                                        <tr className="border-b dark:border-neutral-500">
                                            <td className="whitespace-nowrap  px-6 py-4 font-medium">1</td>
                                            <td className="whitespace-nowrap  px-6 py-4">{item.product_name}</td>
                                            <td className="whitespace-nowrap  px-6 py-4">{item.product_company}</td>
                                            <td className="whitespace-nowrap  px-6 py-4">{date}</td>
                                            <td className="whitespace-nowrap  px-6 py-4"><FontAwesomeIcon icon={faEye} onClick={() => handleview(item)} /><FontAwesomeIcon icon={faPenToSquare} className="px-5" onClick={() => {settoggle(false);setchange(item)}} /><FontAwesomeIcon icon={faTrash} onClick={() => handledelete(item._id)} /></td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>



        {/* modal */}



        <div className={`relative  z-10 ${toggle ? "hidden" : " block"}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">


                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <h3 className="text-center text-2xl font-sans font-bold">Edit Product</h3>

                                
                                <div>
                                    <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">Product Name</label>
                                    <div className="mt-2">
                                        <input id="Name" name="Name" type="text"  required className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={change.product_name} onChange={(e)=>setvalue((prev)=>({...prev,product_name:e.target.value}))}/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">Product Company</label>
                                    <div className="mt-2">
                                        <input id="Name" name="Name" type="text"  required className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={change.product_company} onChange={(e)=>setvalue((prev)=>({...prev,product_company:e.target.value}))} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">Price </label>
                                    <div className="mt-2">
                                        <input id="Name" name="Name" type="number"  required className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={change.product_price}  onChange={(e)=>setvalue((prev)=>({...prev,product_price:e.target.value}))} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">Discount</label>
                                    <div className="mt-2">
                                        <input id="Name" name="Name" type="number"  required className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={change.product_discount} onChange={(e)=>setvalue((prev)=>({...prev,product_discount:e.target.value}))}/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                    <div className="mt-2">
                                        <input id="Name" name="Name" type="text"  required className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" defaultValue={change.product_description}  onChange={(e)=>setvalue((prev)=>({...prev,product_description:e.target.value}))}/>
                                    </div>
                                </div>
                            </div>
                           

                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button type="button" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"onClick={handlesave} >save</button>
                                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={()=>settoggle(true)}>Cancel</button>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Productlist;