import React, { useCallback, useContext } from 'react'
import ColorBtn from './ColorBtn'
import '../App.css'
import ColorContext from '../context/ColorContext'

const Colors = () => {
    const {setColor} = useContext(ColorContext);
    const clickBtn = useCallback((e) => {
        console.log('btn clicked');
        const clr = e.target.innerHTML.toLowerCase();
        console.log(clr);
        setColor(clr);
    }, []);
  return (
    <div className='btnBlock'>
      <ColorBtn color={'red'} clickBtn={clickBtn} />
      <ColorBtn color={'orange'} clickBtn={clickBtn} />
      <ColorBtn color={'green'} clickBtn={clickBtn} />
      <ColorBtn color={'blue'} clickBtn={clickBtn} />
    </div>
  )
}

export default Colors
