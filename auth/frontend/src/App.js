import './App.css';
import MotionElement from './components/MotionElement';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'
import {Route, BrowserRouter as Router, Routes, Link} from 'react-router-dom'

function App() {
  return (
    <div className=' min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex justify-center items-center'>
      <MotionElement color="bg-green-200" size="w-40 h-40" top="0%" left="5%" delay={0} />
      <MotionElement color="bg-green-200" size="w-48 h-48" top="15%" left="55%" delay={5} />
      <MotionElement color="bg-green-200" size="w-32 h-32" top="70%" left="65%" delay={2} />

      <Router>      
        <Routes>
        <Route path='/' element={<div />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
