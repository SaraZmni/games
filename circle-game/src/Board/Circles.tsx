import { FC } from "react";
import { CirclesProps, CircleType } from "./types";

const Circle: FC<CircleType> = ({ x, y, bgColor }) => {
  return (
    <div
      className="circle"
      style={{
        backgroundColor: bgColor,
        top: `${y}px`,
        left: `${x}px`,
      }}
    />
  );
};

const Circles: FC<CirclesProps> = ({ circles }) => {
  return circles.map((circle) => {
    return <Circle key={circle.id} {...circle} />;
  });
};
export default Circles;
