import React from 'react'
import Notes from '../components/Notes'

const Home = () => {
  return (
    <div>
      <h2 className=' px-20 font-bold text-3xl pt-6 pb-4 underline text-teal-700'>My Notes</h2>
      <Notes />
    </div>
  )
}

export default Home
