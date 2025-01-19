import { FC } from "react";

interface ControlsProps {
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  hasCircles: boolean;
  hasHistory: boolean;
}

const Controls: FC<ControlsProps> = ({
  onUndo,
  onRedo,
  onReset,
  hasCircles,
  hasHistory,
}) => {
  return (
    <div className="controls" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={onUndo}
        className={hasCircles ? "" : "disabled"}
        disabled={!hasCircles}
      >
        Undo
      </button>
      <button
        onClick={onRedo}
        className={hasHistory ? "" : "disabled"}
        disabled={!hasHistory}
      >
        Redo
      </button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
};
export default Controls;
