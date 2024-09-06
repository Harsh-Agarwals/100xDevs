import React from 'react'
import '../App.css'

export default function InputComponent({icon: Icon, ...props}) {
  return (
    <div className='relative'>
        <div className=' absolute top-[18px] left-2 flex items-center pointer'>
            <Icon className=" text-emerald-500 w-5" />
        </div>
        <input {...props} className=' my-3 px-3 ps-9 py-[6px] border-green-500 bg-emerald-900 rounded-md outline-none tracking-wide font-mono w-80 focus:border-green-500 focus:ring-green-600 focus:ring-2' required />
    </div>
  )
}
