import React, { useEffect, useRef, useState } from 'react'
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';

export default function VerificationPage() {
    const [code, setCode] = useState(["", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    let isLoading = false;

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e);
        
        const verificationCode = code.join("");
        try {
            
        } catch (error) {
            
        }
    }
    const handleChange = (index, value) => {
        const newCode = [...code];
        if(value.length > 1) {
            const pastedCode = value.slice(0, 5).split("");
            for(let i=0;i<5;i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);
            const lastFilledIndex = newCode.findLastIndex(digit => digit !== "");
            const focusIndex = lastFilledIndex<4? lastFilledIndex+1 : 4;
            inputRefs.current[focusIndex].focus();
        } else {
            newCode[index] = value;
            setCode(newCode);
            if(value && index<4) {
                inputRefs.current[index+1].focus();
            }
        }
    }
    useEffect(() => {
        if(code.every(digit => digit!== '')) {
            handleSubmit(new Event('submit'));
        }
    }, [code])
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && index>0 && !code[index]) {
            inputRefs.current[index-1].focus();
        }
    }
  return (
    <motion.div
        initial={{ y: '20vh', opacity: 0}}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className=' overflow-hidden'
      >
        <div>
            <div className=" bg-green-950 px-8 pt-6 border-[1px] border-green-700 rounded-2xl opacity-80 ">
                <h1 className=' text-transparent font-bold bg-clip-text tracking-wide bg-gradient-to-r from-green-500 to-emerald-600 text-2xl text-center'>Verify Your Email</h1>
                <p className='text-center text-gray-300 mb-6 pt-2'>Enter the 5-digit code sent to your email address.</p>
                <form onSubmit={handleSubmit} className='flex flex-col my-8 font-normal text-white text-base px-6 '>
                    <div className='flex flex-row gap-3'>
                        {code.map((digit, index) => (
                            <input key={index} type="text" value={digit} ref={(el)=> inputRefs.current[index]=el} onKeyDown={(e) => handleKeyDown(index, e)} onChange={(e) => {handleChange(index, e.target.value)}} className=' w-12 h-12 bg-green-800 border-2 border-green-500 rounded-lg text-center font-semibold text-lg focus:outline-none' />
                        ))}
                    </div>
                    <button type="submit" className=' w-72 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium py-2 rounded-md mt-8 cursor-pointer hover:scale-105 focus:scale-100 focus:border-green-900 focus:ring-green-400 focus:ring-2 flex justify-center items-center mx-auto disabled:opacity-50' disabled={isLoading || code.some((digit) => !digit)}>
                        {isLoading ? "Verifying...": "Verify Email"}
                    </button>
                </form>
            </div>
        </div>
    </motion.div>
  )
}
