import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Sellerlist = () => {
    const navigate = useNavigate()
    const [data, setdata] = useState([])

    const [data1, setdata1] = useState([])

    const [getmail,setmail] = useState("")

    const filterseller = data.filter((item) => item.type === "seller")

    const filterdata = data1.filter((item)=>item.headid === getmail)
    console.log(filterdata);

    

    const TableRows = ({ data }) => {
        const [open, setOpen] = useState(false);
        let date = new Date(data.createdAt);
        date = date.toLocaleDateString()
        return (
            <>
                <tr className="cursor-pointer">
                    <td
                        className={`py-9 px-2 text-base  font-normal flex items-center justify-center h-full border-t`} onClick={() => setmail(data.email)}
                    >
                        <svg
                            className={`text-black w-6 h-6 z-40  ${open ? "rotate-180" : "rotate-0"
                                }`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            onClick={() => setOpen(!open)}
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </td>
                    <td
                        className={`py-2 px-3 font-normal text-base border-t whitespace-nowrap`}
                    >
                        {data?.name}
                    </td>
                    <td
                        className={`py-2 px-3 font-normal text-base border-t whitespace-nowrap`}
                    >
                        {data?.email}
                    </td>
                    <td
                        className={`py-2 px-3 text-base  font-normal border-t whitespace-nowrap`}
                    >
                        {data?.phone}
                    </td>
                    <td
                        className={`py-2 px-3 text-base  font-normal border-t whitespace-nowrap`}
                    >
                        {date}
                    </td>

                </tr>
                <tr>
                    <td colSpan={6} className="pl-10">
                        <h1 className={`text-xl ${open ? "block" : "hidden"}`}>Data</h1>
                    </td>
                </tr>
                <tr
                    className={`w-full overflow-hidden transition-[max-height] delay-1000 duration-1000 ease-in-out  ${open ? "max-h-20" : "max-h-0"
                        }`}
                >
                    <td colSpan={10}>
                        <table
                            className={`px-10 w-fit  ${open ? "block" : "hidden"} mx-auto`}
                        >
                            <thead className="bg-[#222E3A]/[6%] rounded-lg text-base text-white font-semibold w-full">
                            <th className="py-3 px-4 text-[#212B36] text-base sm:text-sm font-normal whitespace-nowrap rounded-l-lg">
                                    Sr. No.
                                </th>
                                <th className="py-3 px-4 text-[#212B36] text-base sm:text-sm font-normal whitespace-nowrap rounded-l-lg">
                                    Product Name
                                </th>
                                <th className="py-3 px-4 text-[#212B36] text-base sm:text-sm font-normal whitespace-nowrap">
                                    Product Company
                                </th>
                                <th className="py-3 px-4 text-[#212B36] text-base sm:text-sm font-normal whitespace-nowrap">
                                    Product Price
                                </th>
                                <th className="py-3 px-4 text-[#212B36] text-base sm:text-sm font-normal whitespace-nowrap rounded-r-lg">
                                    View Product
                                </th>
                            </thead>
                            <tbody>
                                {filterdata?.map((cdata, key) => (
                                    <tr key={key}>
                                         <td className="py-3 px-4">{key+1}</td>
                                        <td className="py-3 px-4">{cdata?.product_name}</td>
                                        <td className="py-3 px-4">{cdata?.product_company}</td>
                                        <td className="py-3 px-4 text-center">{`₹${cdata?.product_price}`}</td>
                                        <td className="py-3 px-4 text-center" >
                                           <FontAwesomeIcon icon={faEye}/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </td>
                </tr>
            </>
        );
    };
    useEffect(() => {
        axios.get('http://localhost:4000/user/finduser').then((res) => {
            setdata(res.data.result)
        }).catch((err) => {
            console.log(err.message);
        })


        axios.get("http://localhost:4000/product/createproduct").then((res) => {
            setdata1(res.data.result);
        }).catch((err) => {
            console.log(err.message);
        })


    }, [])
    return (
        <div className="min-h-screen  bg-white flex flex-col items-center  py-10 ">
            <div className="w-full  px-2">
                <h1 className="text-2xl font-medium text-center pb-0">Seller List With Data</h1>
                <div className="w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">
                    <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border-separate border-spacing-y-0 borer ">
                        <thead className="bg-[#222E3A]/[6%] rounded-lg text-base text-white font-semibold w-full">
                            <tr className="">
                                <th className=""></th>
                                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                                    Name
                                </th>
                                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                                    E-mail
                                </th>
                                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                                    Contect
                                </th>
                                <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                                    Registration Date
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {filterseller?.map((data, index) => (
                                <TableRows key={index} data={data} />
                            ))}
                            <tr>
                                <td colSpan={6} className="border-t"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default Sellerlist;
