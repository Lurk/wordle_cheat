import ca from "classnames";
import React from "react";
import { STATE } from "../helpers/const";

interface LetterProps {
  state: STATE;
  changeState: () => void;
  letter: string;
}

export const Letter: React.FC<LetterProps> = ({
  state,
  changeState,
  letter,
}) => {
  return (
    <div
      className={ca("Letter", { [state]: true })}
      onClick={(e) => {
        e.preventDefault();
        changeState();
      }}
    >
      {letter}
    </div>
  );
};
