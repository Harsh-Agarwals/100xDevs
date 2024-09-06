import React from 'react'
import {motion} from 'framer-motion'

export default function MotionElement({color, size, top, left, delay}) {
  return (
      <motion.div className={`${color} ${size} absolute rounded-full opacity-20 blur-xl`}
      style={{top: top, left: left}}
      animate={{y:["0%", "100%", "0%"], x:["0%", "100%", "0%"], rotate:[0, 360]}}
      transition={{ease:"linear", duration:20, repeat:Infinity, delay:delay}} aria-hidden='true' />
  )
}
