import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import NoteState from "./context/NoteState";
import Alert from "./components/Alert";
import AlertState from './context/AlertState'

function App() {
  return (
    <>
      <AlertState>
        <NoteState>
          <Navbar />
          <Alert />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </NoteState>
      </AlertState>
    </>
  )
}

export default App
