import React from 'react'

export default function SignupPage() {
  return (
    <div>
      <div className=" bg-green-950 p-6 border-[1px] border-green-700 rounded-2xl opacity-80 ">
        <h1 className=' text-green-500 font-semibold text-2xl text-center'>Create Account</h1>
        <form action="" className='flex flex-col my-8 font-normal text-white text-base '>
          <input type="text" name="userName" id="userName" placeholder='User Name' className='px-3 py-[6px] border-green-500 bg-emerald-900 rounded-md outline-none' />
          <input type="email" name="userEmail" id="userEmail" placeholder='Email' className=' my-6 px-3 py-[6px] border-green-500 bg-emerald-900 rounded-md outline-none' />
          <input type="password" name="userPwd" id="userPwd" placeholder='Password' className='px-3 py-[6px] border-green-500 bg-emerald-900 rounded-md outline-none w-72' />
        </form>
      </div>
    </div>
  )
}
