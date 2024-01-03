import React, { useEffect, useState } from "react";
import image from "../image/1.jpg"
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Outlet, useNavigate } from "react-router-dom";
import "./Cart.css"
import axios from "axios";
import { useDispatch } from "react-redux";
import { additem } from "../redux/Cartslice";
import { additemtowishlist } from "../redux/Wishlistslice";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [data, setdata] = useState([])
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const handleview = (item) => {
    navigate("/view", { state: { data: item } })
  }

  const addtocart = (item) => {

    dispatch(additem(item))
  }

  const addwishlist = (item) => {

    dispatch(additemtowishlist(item))
  }
  useEffect(() => {
    axios.get("http://localhost:4000/product/createproduct").then((res) => {
      setdata(res.data.result);
    }).catch((err) => {
      console.log(err.message);
    })
  }, [])
  return (
    <>
      
      <Outlet />
      <div className="container mx-auto  h-96 px-5 " style={{ maxWidth: "1600px" }} >
        <Carousel responsive={responsive} autoPlay infinite={true} autoPlaySpeed={2000} className="h-full w-full">
          <div><img src={image} alt="poster" className="h-full w-full " /></div>
          <div><img src="https://cdnb.artstation.com/p/assets/images/images/041/038/055/large/shikhar-yadav-shoes-banner.jpg?1630579962" alt="poster" className="h-full w-full" /></div>
          <div><img src="https://i.ytimg.com/vi/4VItGJYxUuI/maxresdefault.jpg" alt="poster" className="h-full w-full" /></div>
          <div><img src="https://cdnb.artstation.com/p/assets/images/images/041/038/055/large/shikhar-yadav-shoes-banner.jpg?1630579962" alt="poster" className="h-full w-full" /></div>
        </Carousel>

      </div>



      <div className="container flex flex-wrap gap-5 justify-center py-20">
        {
          data.map((item) => {
            return (
              <div className="max-w-md w-80  shadow-2xl shadow-black rounded-xl p-3">
                <div className="flex flex-col ">

                  <div className=" w-full h-60 mb-3 flex item-center" onClick={() => handleview(item)}>
                    <img src={`http://localhost:4000/${item.product_img}`} alt="Just a flower" className="" />
                  </div>
                  <div className="flex-auto justify-evenly">
                    <div className="flex flex-wrap ">
                      <div className="w-full flex-none text-sm flex items-center text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className=" whitespace-nowrap mr-3">4.60</span><span className="mr-2 ">India</span>
                      </div>
                      <div className="flex items-center w-full justify-between min-w-0 ">
                        <h2 className="text-lg mr-auto cursor-pointer text-blue-600 truncate ">{item.product_company}</h2>
                        <div className="flex items-center bg-green-600 text-white text-xs px-2 py-1 ml-3 rounded-lg">
                          INSTOCK</div>
                      </div>
                      <div className="flex items-center w-full justify-between min-w-0 ">
                        <h2 className="text-sm mr-auto cursor-pointer  truncate ">{item.product_name}</h2>

                      </div>
                    </div>
                    <div className="text-xl  font-semibold mt-1 ">{`₹${item.product_price}`}</div>
                    <div className="lg:flex  py-1  text-sm text-gray-600 ">
                      <span className="line-through text-red-600">{`₹${item.Product_actualprice}`}</span> <span className="ps-5 text-green1 font-bold">{`${item.product_discount}% off`}</span>
                    </div>
                    <div className="flex space-x-2 text-sm font-medium justify-start">
                      <button className="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600 " onClick={() => addtocart(item)}>
                        <span>Add Cart</span>
                      </button>
                      <button className="transition ease-in duration-300 bg-gray-700 hover:bg-gray-800 border hover:border-gray-500 border-gray-700 hover:text-white  hover:shadow-lg text-gray-400 rounded-full w-9 h-9 text-center p-2" onClick={() => addwishlist(item)}>
                        <FontAwesomeIcon icon={faHeart} color="white" />

                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default Home;