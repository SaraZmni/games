import { FC,useEffect,MouseEvent, useState } from "react";


const handleContextMenu = (e: Event) => {
    e.preventDefault()
}

interface Circle {
    id: string;
    width: number;
    height: number;
    startX: number;
    startY: number;
    x: number;
    y: number;
}

const Circle:FC = () => {

   const [circles,setCircles] = useState<Circle[]>([{
    id:'left',
    width:0,
    height:0,
    startX:0,
    startY:0,
    x:0,
    y:0
   },
   { id:'right',
    width:0,
    height:0,
    startX:0,
    startY:0,
    x:0,
    y:0}])

    const [currentCircleId,setCurrentCircleId] = useState<null | string>(null)
    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
      const {button} = e;
      const currentId = button === 0 ? 'left':'right';

      setCurrentCircleId(currentId)

      setCircles((prev:Circle[]) => {
        return prev.map((circle:Circle) => {
          if(circle.id === currentId){
            return {
              ...circle,
              startX:e.clientX,
              startY:e.clientY
            }
          }
          return circle
        })      
      })
    }
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
     if(currentCircleId === null){
        return
     }
     const updatedCircles:Circle[] = circles.map((circle) => {
        if(circle.id === currentCircleId){
          //calculate where start and where end
          const distanceX = e.clientX - circle.startX
          const distanceY = e.clientY - circle.startY
          const size = Math.max(Math.abs(distanceX),Math.abs(distanceY))

          const newX = distanceX < 0 ? circle.startX - size :circle.startX ;
          const newY = distanceY < 0 ? circle.startY - size :circle.startY ;

          return {
            ...circle,
            width:size,
            height:size, 
            x:newX,
            y:newY,
          }
        }
        return circle
     })
      setCircles(updatedCircles) 
    }
    const handleMouseUp = () => {
      setCurrentCircleId(null)
    }
    useEffect(() => {
      document.addEventListener('contextmenu',handleContextMenu)

      return () => document.removeEventListener('contextmenu',handleContextMenu)
    }, [])   
    return(
        <div className="board" onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
          {circles.map((circle) => {
            return (<div 
              key={circle.id}
              style={{
              position:'absolute',
              width:`${circle.width}px`,
              height:`${circle.height}px`,
              top:`${circle.x}px`,
              left:`${circle.y}px`,
              backgroundColor:'red',
              borderRadius:'50%'
            }}/>)
          })}
        </div>
    )
}

export default Circle;