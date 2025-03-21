import React, { useState, useEffect } from 'react'
import axios from 'axios'

const SignUp = () => {
  let [user, setUser] = useState({"username": "", "email": "", "password": ""});
  const BACKEND_PORT = import.meta.env.VITE_BACKEND_HOST;
  const host = `http://localhost:${BACKEND_PORT}`
  const changeInp = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const signup = async () => {
    try {
      const url = `${host}/api/auth/signup`;
      const response = await axios.post(url, user);
      if (response.data.success) {
        const accessToken = response.data.accessToken;
        alert(`Signup Successful! New User Created\n\n ${response.data.message}`);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
  
  const signupClick = async (e) => {
    if (user.username.length<5 || user.email.length<8 || user.password.length<8) {
      alert("Please enter correct username, email and password!");
    } else {
      await signup();
      console.log(e);
      console.log('signup');
    }
    e.preventDefault();
  }

  return (
    <div>
      <div className=" mx-12 my-4 flex flex-col items-center">
      <h1 className=" font-bold text-2xl text-center text-purple-600">SignUp</h1>

      <div className="form flex flex-col border border-purple-700 rounded-md px-8 py-4 m-12 gap-2 w-[60%] justify-between">
        <div className="un  border-2 rounded-md px-4 py-2">
          <p className=" font-medium py-1">Username</p>
          <input className=" border-2 border-purple-300 rounded-md focus:outline-none focus:border-purple-500 px-2 py-2 text-sm w-[80%]" type="text" name="username" id="username" placeholder="Username" onChange={changeInp} required />
        </div>
        <div className="pwd border-2 rounded-md px-4 py-2">
          <p className=" font-medium py-1">Email</p>
          <input className=" border-2 border-purple-300 rounded-md focus:outline-none focus:border-purple-500 px-2 py-2 text-sm w-[80%]" type="email" name="email" id="email" placeholder="Email" onChange={changeInp} required />
        </div>
        <div className="pwd border-2 rounded-md px-4 py-2">
          <p className=" font-medium py-1">Password</p>
          <input className=" border-2 border-purple-300 rounded-md focus:outline-none focus:border-purple-500 px-2 py-2 text-sm w-[80%]" type="password" name="password" id="password" placeholder="Password" onChange={changeInp} required />
        </div>
        <div className="btn">
          <button className=" bg-green-400 px-6 py-2 font-semibold text-white hover:bg-green-600 rounded-md" onClick={signupClick}>Sign Up</button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SignUp
