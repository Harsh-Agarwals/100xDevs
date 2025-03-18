import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import NoteState from "./context/NoteState";
import Alert from "./components/Alert";

function App() {
  return (
    <>
    <NoteState>
        <Navbar />
        <Alert message={"This is awesome"} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </NoteState>
    </>
  )
}

export default App
