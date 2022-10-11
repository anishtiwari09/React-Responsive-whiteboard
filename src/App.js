import logo from './logo.svg';
import './App.css';
import { Layer, Line, Stage, Text } from 'react-konva';
import { useEffect, useRef, useState } from 'react';
const sceneHeight=600
const sceneWidth=1200
function App() {
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  let width=window.innerWidth-100
  let height=window.innerHeight-100
  let scale={
    x:width/sceneWidth,
    y:height/sceneHeight
  }
  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    pos.x=pos.x/scale.x
    pos.y=pos.y/scale.y
    setLines([...lines, { tool, points: [pos.x, pos.y] }]);
  };

  const handleMouseMove = (e) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    point.x=point.x/scale.x
    point.y=point.y/scale.y
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last
    lines.splice(lines.length - 1, 1, lastLine);
    let y=lines.concat()
   
    setLines(y);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };
 
  const [state,setState]=useState(false)
useEffect(()=>{
window.addEventListener('resize',()=>{

setState(prev=>!prev)
})

return ()=>{
  window.removeEventListener('resize',()=>{

  })
}
},[])

  return (
    <div style={{border:'1px solid black',width:width,height:height,margin:'auto',display:"flex",justifyContent:"center"}}>
      <Stage
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
       scale={scale}
      >
        <Layer>
        
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="#df4b26"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>

    </div>
  );
}

export default App;
