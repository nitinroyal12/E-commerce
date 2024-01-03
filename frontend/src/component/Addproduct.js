import React, { useEffect, useState } from "react";
import "./Addproduct.css"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Addproduct() {
  const navigate = useNavigate()
  const email = localStorage.getItem("email")
  const [Values, setValues] = useState({
    headid:email,
    product_name: null,
    product_company: null,
    product_price: null,
    product_discount: null,
    Product_actualprice: null,
    product_description: null,
    product_img: null
  })

  function calculateActual() {
    if (Values.product_price !== null && Values.product_discount !== null) {
      const calculate = Values.product_price * Values.product_discount / 100 + Values.product_price;
      return calculate.toFixed();
    }
    return null;
  }

  const handerproduct = () => {
    if (Values.product_name === null) {
      toast.error("Please Enter Product Name")
    } else if (Values.product_company === null) {
      toast.error("Please Enter Product Company")
    } else if (Values.product_price === null) {
      toast.error("Please Enter Product Price")
    }
    else if (Values.product_discount === null) {
      toast.error("Please Enter Product Discount")
    } else if (Values.product_discount < 0 || Values.product_discount > 100) {
      toast.error(" 0 to 100 Only")
    }
    else if (Values.product_description === null) {
      toast.error("Please Enter Product Description")
    }
     else if (Values.product_img === null) {
        toast.error("Please Select Images")
    }
    else if (Values.product_name != null || Values.product_company != null || Values.product_price != null || Values.product_discount != null || Values.product_description != null) {
      const formdata = new FormData()
      formdata.append("headid", Values.headid);
      formdata.append("product_name", Values.product_name);
      formdata.append("product_company", Values.product_company);
      formdata.append("product_price", Values.product_price);
      formdata.append("product_discount", Values.product_discount);
      formdata.append(
        "Product_actualprice",
        calculateActual() || ""  );
      formdata.append("product_description", Values.product_description);
      formdata.append("product_img", Values.product_img);

      axios.post("http://localhost:4000/product/createproduct", formdata).then((res) => {
        toast.success(res.data.message);
        navigate("/home")
      }).catch((err) => {
        toast.error(err.message);
      })
    }

  }

  useEffect(() => {
    const newvalue = { ...Values, Product_actualprice: calculateActual() };
    setValues(newvalue)
  }, [Values.product_price, Values.product_discount])


  return (
    <>
      
      <div class="flex flex-col  bg-gradient-to-b from-[#063970] to-blue-200 sm:py-10">
        <div class="grid place-items-center mx-2 my-20 sm:my-auto" x-data="{ showPass: true }">
          <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12
                px-6 py-10 sm:px-10 sm:py-6
                bg-white rounded-lg shadow-md lg:shadow-lg">
            <div class="text-center mb-4">
              <h6 class="font-semibold text-[#063970] text-xl">Add Product</h6>
            </div>
            <form class="space-y-5" >


              <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-sm font-medium">Product Name</label>
                <input type="text" id="name" className="block w-full p-2.5   border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setValues((prev) => ({ ...prev, product_name: e.target.value }))} />

              </div>
              <div className="mb-6">
                <label htmlFor="company" className="block mb-2 text-sm font-medium  ">Product Company</label>
                <input type="text" id="company" className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="product_company" onChange={(e) => setValues((prev) => ({ ...prev, product_company: e.target.value }))} />

              </div>
              <div className="mb-6">
                <label htmlFor="price" className="block mb-2 text-sm font-medium  ">Price</label>
                <input type="text" id="price" className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="product_price" onChange={(e) => setValues((prev) => ({ ...prev, product_price: parseInt(e.target.value) }))} />

              </div>
              <div className="mb-6">
                <label htmlFor="discount" className="block mb-2 text-sm font-medium  ">Discount</label>
                <input type="text" id="discount" className="block w-full p-2.5  border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="product_discount" onChange={(e) => setValues((prev) => ({ ...prev, product_discount: parseInt(e.target.value) }))} />

              </div>
              <div className="mb-6">
                <label htmlFor="description" className="block mb-2 text-sm font-medium  ">Description</label>
                <textarea type="text" id="description" className="block w-full p-2.5  border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" name="product_description" onChange={(e) => setValues((prev) => ({ ...prev, product_description: e.target.value }))}></textarea>

              </div>
              <div>
                <label htmlFor="img" className="block mb-2 text-sm font-medium  ">Image</label>
                <input type="file" id="img" className="block w-full p-2.5  border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" multiple onChange={(e) => setValues((prev) => ({ ...prev, product_img:e.target.files[0] }))}
                    
                  />

              </div>
              <button type="button" class="p-2 md:p-4  uppercase w-full relative  border-spacing-3 font-bold bg-gray-500 overflow-hidden hover:text-white rounded-xl z-10  submitt" onClick={handerproduct} >Submit</button>


            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Addproduct;