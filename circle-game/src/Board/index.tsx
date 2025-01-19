import { FC, useState, MouseEvent } from "react";
import { COLORS } from "../constants";
import { CircleFullType } from "./types";

import Controls from "./Controls";
import Circles from "./Circles";

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * COLORS.length);
  return COLORS[randomIndex];
};

const Board: FC = () => {
  const [circles, setCircles] = useState<CircleFullType[]>([]);
  const [history, setHistory] = useState<CircleFullType[]>([]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    setCircles((prevState: CircleFullType[]) => {
      return [
        ...prevState,
        {
          x: e.clientX,
          y: e.clientY,
          id: +new Date(),
          bgColor: getRandomColor(),
        },
      ];
    });
  };

  const handleUndo = () => {
    const copy = [...circles];
    const lastCircle = copy.pop();
    if (lastCircle) {
      setHistory((prev) => [...prev, lastCircle]);
      setCircles(copy);
    }
    console.warn("no circle to undo.");
  };

  const handleRedo = () => {
    const copy = [...history];
    const lastHistory = copy.pop();
    if (lastHistory) {
      setCircles((prev) => [...prev, lastHistory]);
      setHistory(copy);
    }
    console.warn("no circle to redo.");
  };

  const handleReset = () => {
    setCircles([]);
    setHistory([]);
  };
  return (
    <div className="board" onClick={handleClick}>
      <Circles circles={circles} />
      <Controls
        onUndo={handleUndo}
        onRedo={handleRedo}
        onReset={handleReset}
        hasCircles={circles.length > 0}
        hasHistory={history.length > 0}
      />
    </div>
  );
};
export default Board;
