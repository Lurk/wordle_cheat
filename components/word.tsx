import React from "react";
import { Letter } from "./letter";
import { ILetter } from "../helpers/word";

interface WordProps {
  word: ILetter[];
  updateWord: (letterIndex: number) => void; // eslint-disable-line
}

export const Word: React.FC<WordProps> = ({ word, updateWord }) => {
  return (
    <div className="Word">
      {word.map((letter, index) => (
        <Letter
          letter={letter.letter}
          key={index}
          changeState={updateWord.bind(null, index)}
          state={letter.state}
        />
      ))}
    </div>
  );
};
