import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
  let [user, setUser] = useState({"username": "", "password": ""});
  const [accessToken, setAccessToken] = useState("");
  const BACKEND_PORT = import.meta.env.VITE_BACKEND_HOST;
  const host = `http://localhost:${BACKEND_PORT}`
  const navigate = useNavigate();

  const changeInp = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  }

  const login = async () => {
    try {
      const url = `${host}/api/auth/login`;
      console.log(url, user);
      
      const response = await axios.post(url, user);
      console.log(response);
      
      if (response.data.success) {
        const token = response.data.accessToken;
        setAccessToken(token);
        sessionStorage.setItem("accessToken", token);
        console.log(token);
        alert(`Successfully Logged In \n\n ${response.data.message}`);
        navigate("/")
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      console.log(error.response);
      
      if (error.response) {
        alert(`Error: ${error.response.data.message}` || "Login Failed");
      } else {
        alert("Network error, please login again");
      }
    }
  }

  const loginClick = async (e) => {
    e.preventDefault();
    if (user.username.length<5 || user.password.length<8) {
      alert("Please enter correct username and password");
      return;
    } else {
      await login();
      console.log(e);
      console.log('login');
    }
  }

  return (
    <div className=" mx-12 my-4 flex flex-col items-center">
      <h1 className=" font-bold text-2xl text-center text-purple-600">Login</h1>

      <div className="form flex flex-col border border-purple-700 rounded-md px-8 py-4 m-12 gap-2 w-[60%] justify-between">
        <div className="un  border-2 rounded-md px-4 py-2">
          <p className=" font-medium py-1">Username</p>
          <input className=" border-2 border-purple-300 rounded-md focus:outline-none focus:border-purple-500 px-2 py-2 text-sm" type="text" name="username" id="username" placeholder="Username" onChange={changeInp} required />
        </div>
        <div className="pwd border-2 rounded-md px-4 py-2">
          <p className=" font-medium py-1">Password</p>
          <input className=" border-2 border-purple-300 rounded-md focus:outline-none focus:border-purple-500 px-2 py-2 text-sm" type="password" name="password" id="password" placeholder="Password" onChange={changeInp} required />
        </div>
        <div className="btn">
          <button className=" bg-green-400 px-6 py-2 font-semibold text-white hover:bg-green-600 rounded-md" onClick={loginClick}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login
