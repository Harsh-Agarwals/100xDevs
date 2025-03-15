import React from 'react'
import Profile from './components/Profile'
import { ColorProvider } from './context/ColorContext'

const App = () => {
  return (
    <ColorProvider>
      <div>
        <Profile />
      </div>
    </ColorProvider>
  )
}

export default App
