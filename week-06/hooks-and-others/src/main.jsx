import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Assignment1 from './Assignment1.jsx'
import Assignment2 from './Assignment2.jsx'
import { Assignment3 } from './Assignment3.jsx'
import { Assignment4 } from './Assignment4.jsx'
import { Assignment5 } from './Assignment5.jsx'
import { Assignment6 } from './Assignment6.jsx'
import { Assignment7 } from './Assignment7.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Assignment2 /> */}
    {/* <Assignment3 /> */}
    {/* <Assignment4 /> */}
    {/* <Assignment5 /> */}
    {/* <Assignment6 /> */}
    <Assignment7 />
  </StrictMode>,
)
