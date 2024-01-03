import React, { useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useLocation } from 'react-router-dom';

const Product = () => {
  const location = useLocation()
  const [data, setdata] = useState([location.state.data])

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


  const [images, setImages] = useState({
    img1: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
  })

  const [activeImg, setActiveImage] = useState(images.img1)

  const [amount, setAmount] = useState(1);


  return (
    <div className='flex flex-col pt-10 justify-between md:pt-20 lg:flex-row md:gap-16 lg:items-center'>
      <div className='flex flex-col gap-6 lg:w-2/4'>
        {
          data.map((item) => {
            return (
              <Carousel responsive={responsive}   className="">
                <div><img src={`http://localhost:4000/${item.product_img}`} alt=""  /></div>

              </Carousel>
            )
          })
        }

      </div>
      {/* ABOUT */}
      {
        data.map((item) => {
          return (
            <div className='flex flex-col px-3 gap-4 lg:w-2/4'>
              <div>
                <span className=' text-violet-600 font-semibold'>{item.product_company}</span>
                <h1 className='text-3xl font-bold'>{item.product_name}</h1>
              </div>
              <p className='text-gray-700'>
                {item.product_description}
              </p>
              <h6 className='text-2xl font-semibold'>{`₹${item.product_price}`}</h6>
              <h6 className='  font-semibold'><span className='text-red-600 line-through text-xl'>{`₹${item.Product_actualprice}`}</span>  <span className='ps-5 text-green-700'>{`${item.product_discount}% off`}</span></h6>
              <div className='flex flex-row items-center gap-12 flex-wrap'>
                <div className='flex flex-row items-center'>
                  <button className='bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev - 1)}>-</button>
                  <span className='py-4 px-6 rounded-lg'>{amount}</span>
                  <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                </div>


              </div>
              <div className='flex ps-3 flex-wrap gap-5'>
                <button className='bg-violet-800 text-white block  font-semibold py-3 px-16 rounded-xl h-full'>Add to Cart</button>
                <button className='bg-yellow-600 text-white block font-semibold py-3 px-16 rounded-xl h-full'>Buy Now</button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default Product