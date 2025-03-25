import { Link } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='nav'>
            <p>Calulator</p>
            <h2>Balance:</h2>
        </div>
        <div className='links'>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
        </div>
    </div>
  )
}

export default Navbar
