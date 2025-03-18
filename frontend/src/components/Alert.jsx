import React, { useEffect, useState } from 'react'

const Alert = (props) => {
    const [msg, setMsg] = useState(props.message);
    const [style, setStyle] = useState("bg-sky-300");

    useEffect(() => {
        setTimeout(() => {
            setMsg("");
            setStyle("hidden");
        }, 1200);
    }, [])
  return (
    <div className={style}>
      <p className=' text-blue-700 py-2 px-4 font-medium'>{msg}</p>
    </div>
  )
}

export default Alert
