import React, { useContext, useState } from 'react'
import ProfileComponent from './ProfileComponent'
import Colors from './Colors'
import colorContext from '../context/ColorContext'
import ShowGithub from './ShowGithub'
import ColorContext from '../context/ColorContext'

const Profile = () => {
    const { color } = useContext(ColorContext);
    const [stats, setStates] = useState({
        'followers': 80000,
        'likes': 8030000,
        'photos': 1400
    })

    const [about, setAbout] = useState({
        'name': 'Harsha Agarwal',
        'age': 25,
        'place': 'Mumbai, India'
    })
  return (
    <div style={{backgroundColor: color, minHeight: "100vh"}}>
      <Colors />
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '1rem'}}>
        <ProfileComponent stats={stats} about={about} />
        <ProfileComponent stats={stats} about={about} />
      </div>
      <ShowGithub />
    </div>
  )
}

export default Profile
