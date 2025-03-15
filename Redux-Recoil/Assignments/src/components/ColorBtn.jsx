import React from 'react'
import '../App.css'

const ColorBtn = ({color, clickBtn}) => {
  return (
    <div>
      <button className='btn' style={{backgroundColor: color}} onClick={clickBtn}>{color.slice(0, 1).toUpperCase()+color.slice(1)}</button>
    </div>
  )
}

export default ColorBtn
