import { FC,useEffect,MouseEvent } from "react";


const handleContextMenu = (e: Event) => {
    e.preventDefault()
}

const Circle:FC = () => {
    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
      console.log('e', e)
    }
    useEffect(() => {
      document.addEventListener('contextmenu',handleContextMenu)

      return () => document.removeEventListener('contextmenu',handleContextMenu)
    }, [])   
    return(
        <div className="board" onMouseDown={handleMouseDown}>hello world</div>
    )
}

export default Circle;