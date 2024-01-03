import { faBagShopping, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./forget.css"
import axios from "axios";
import { toast } from "react-toastify";

function Forgetpass() {
    const navigate = useNavigate()
   
    const [show, setshow] = useState(true)
    const [showotp,setshowotp] = useState(true)
    const numberOfInputs = 4;
    const [otp, setOtp] = useState(['', '', '', ''])
    const [email, setemail] = useState({
        email: null,
    })

    const [otpvalue,setotpvalue] = useState({
        otp:null
    })
    const inputRefs = useRef([]);
    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]*$/.test(value) || value === '') {
          const updatedOtp = [...otp];
          updatedOtp[index] = value;
          setOtp(updatedOtp);
    
          if (value === '' && index > 0) {
            inputRefs.current[index - 1].focus();
          }
          if (index < numberOfInputs - 1 && value !== '') {
            inputRefs.current[index + 1].focus();
          }
        }
      };

    const handleBackspace = (e, index) => {
        if (index > 0 && e.key === 'Backspace' && otp[index] === '') {
            inputRefs.current[index - 1].focus();
        }
    };

    const renderOtpInputs = () => {
        const inputs = [];
        for (let i = 0; i < numberOfInputs; i++) {
            inputs.push(
                <input
                    key={i}
                    type="text"
                    value={otp[i]}
                    onChange={(e) => handleOtpChange(e, i)}
                    onKeyDown={(e) => handleBackspace(e, i)}
                    maxLength={1}
                    ref={(el) => (inputRefs.current[i] = el)}
                />
            );
        }
        return inputs;
    };

    const handleemail = () => {
        axios.post('http://localhost:4000/user/forget',email).then((res)=>{
            toast.success(res.data.message);
            setshowotp(res.data.result)
            localStorage.setItem("email",res.data.email)
        }).catch((err)=>{
            toast.error(err.response.data.message);
        })
    }

    const handleotp = () => {
        axios.post('http://localhost:4000/user/verify',otpvalue).then((res)=>{
            toast.success(res.data.message);
            navigate("/changepassword")
        }).catch((err)=>{
            toast.error(err.response.data.message);
        })
    }

    useEffect(()=>{
        setotpvalue({otp:otp.join('')})
    },[otp])

    
    return (
        <div class={`${show ? "flex" : "hidden"} h-screen w-full items-center justify-center fixed top-0 left-0 z-50 bg-gray-500 bg-opacity-75 bg-cover bg-no-repeat`} >
            <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8 relative">
                <FontAwesomeIcon icon={faCircleXmark} className="absolute top-3 right-3 text-2xl cursor-pointer text-white" onClick={() => { setshow(false); navigate("/") }} />
                <div className="text-white">
                    <div className="mb-8 flex flex-col items-center">

                        <h1 className="mb-2 text-2xl"><FontAwesomeIcon icon={faBagShopping} /> SABKI DUKAAN</h1>
                        <span className="text-gray-300">Welcome To SABKI DUKAAN</span>
                    </div>
                    <form >
                       {showotp ?  <div className="mb-4 text-lg">
                            <input className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md" type="text" name="username" placeholder="Enter E-mail" onChange={(e) => setemail({ email: e.target.value })}
                           
                            />
                        
                           
                        </div>
                        :
                        <div className="mb-4 text-lg">
                            <div className="otp-container">
                                <h1>Enter OTP</h1>
                                <div className="otp-inputs">{renderOtpInputs()}</div>
                            </div>
                            
                        </div>}


                        {
                            showotp ? <div className="mt-8 flex justify-center text-lg text-black">
                            <button type="button" className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600" onClick={handleemail} >verify</button>
                        </div>
                        :
                        <div className="mt-8 flex justify-center text-lg text-black">
                            <button type="button" className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"onClick={handleotp} >verify</button>
                        </div>
                        }
                        <Link to="/login">Go back to login page </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Forgetpass;