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
    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
      const {button} = e;
      const currentId = button === 0 ? 'left':'right'

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
    useEffect(() => {
      document.addEventListener('contextmenu',handleContextMenu)

      return () => document.removeEventListener('contextmenu',handleContextMenu)
    }, [])   
    return(
        <div className="board" onMouseDown={handleMouseDown}>
          {circles.map((circle) => {
            return (<div style={{
              position:'absolute',
              width:circle.width,
              height:circle.height,
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