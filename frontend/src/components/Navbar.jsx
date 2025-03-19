import React, { useEffect } from 'react'
import {Link, useLocation} from 'react-router-dom'

const Navbar = () => {
  let currentLocation = useLocation();

  useEffect(() => {
    console.log(currentLocation);
  }, [currentLocation])

  const locationNav = (path) => {
    return `hover:text-purple-600 ${currentLocation.pathname == path?"text-red-600":""}`
  };
  return (
    <div className=' px-12 py-4 bg-purple-100'>
        <div className=' flex flex-row justify-between'>
            <Link to="/"><h1 className=' text-lg font-bold text-purple-800'>iNotebook</h1></Link>
            <ul className=' flex flex-row gap-4 font-medium text-purple-800'>
                <Link to="/"><li className={locationNav("/")}>Home</li></Link>
                <Link to="/about" ><li className={locationNav("/about")}>About</li></Link>
                <Link to="/blog" ><li className={locationNav("/blog")}>Blog</li></Link>
                <Link to="/contact" ><li className={locationNav("/contact")}>Contact</li></Link>
            </ul>
            <div>
              <Link to="/login" className=' bg-purple-800 text-white px-6 mx-2 py-1 rounded-3xl font-medium hover:bg-indigo-600'>Login</Link>
              <Link to="/signup" className=' bg-red-600  text-white px-6 py-1 rounded-3xl font-medium hover:bg-red-700'>SignUp</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar
