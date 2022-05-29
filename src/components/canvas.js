
import React, { useRef, useEffect } from 'react'

const Canvas = props => {
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const c = canvas.getContext('2d')
    //Our first draw
    canvas.width = 1024
    canvas.height = 576
   
    c.fillRect(0,0,canvas.width,canvas.height)
   
  }, [])
  
  return <canvas ref={canvasRef} {...props}/>
}

export default Canvas