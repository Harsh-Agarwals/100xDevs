import React, { useState } from 'react'
import {motion} from 'framer-motion'
import InputComponent from '../components/InputComponent'
import {KeyRound, Mail, Loader} from 'lucide-react'
import {Link} from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  let isLoading = false;

  const FormLogIn = (e)=> {
    e.preventDefault();
  }
  return (
    <motion.div
        initial={{ y: '20vh', opacity: 0}}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className=' overflow-hidden'
      >
    <div>
      <div className=" bg-green-950 pt-6 border-[1px] border-green-700 rounded-2xl opacity-80 ">
        <h1 className=' text-transparent font-bold bg-clip-text tracking-wide bg-gradient-to-r from-green-500 to-emerald-600 text-2xl text-center'>Welcome Back</h1>
        <form onSubmit={FormLogIn} className='flex flex-col my-8 font-normal text-white text-base px-6 '>
          <InputComponent icon={Mail} type="email" name="userEmail" id="userEmail" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputComponent icon={KeyRound} type="password" name="userPwd" id="userPwd" placeholder="Password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
          <div>
            <h1 className=' text-green-600 font-semibold hover:text-green-400 my-2'><Link to='/forgot-password'>Forgot Password?</Link></h1>
          </div>
          <button type="submit" className=' bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium py-2 rounded-md mt-4 cursor-pointer hover:scale-105 focus:scale-100 focus:border-green-900 focus:ring-green-400 focus:ring-2 flex justify-center'>
          {isLoading ? <Loader className=' animate-spin' />: "Log In"}
          </button>
        </form>
        <div className=' bg-black rounded-t-none rounded-2xl text-center py-3'>
          <h1 className=' font-medium text-sm text-gray-500'>Don't have an Account? <Link to="/signup" className=' font-bold text-green-600 hover:text-green-400'>Sign Up</Link></h1>
        </div>
      </div>
    </div>
    </motion.div>
  )
}
