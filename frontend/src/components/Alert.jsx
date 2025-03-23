import React, { useEffect, useState, useContext } from 'react'
import { AlertContext } from '../context/AlertState'

const Alert = (props) => {
    const {style, message, color, setStyle, alertNow, setAlert} = useContext(AlertContext);

    useEffect(() => {
        setTimeout(() => {
            setStyle("hidden");
            setAlert(false);
        }, 1200);
    }, [alertNow])
  return (
    <div className={style}>
      <p className={`${color} py-2 px-4 font-medium`}>{message}</p>
    </div>
  )
}

export default Alert
