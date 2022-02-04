import { Interface } from "readline";
import { STATE } from "./const";
import {
  addLetter,
  addLetterToPosition,
  stringOrPostionalTemplate as stringOrPositionalTemplate,
} from "./str";

export interface ILetter {
  letter: string;
  state: STATE;
}

export interface Rules {
  contains: string;
  not_contains: string;
  positional_contains: string;
  positional_not_contains: string[];
}

export function wordsReducer(
  acc: Rules,
  word: ILetter[],
  wordIndex: number
): Rules {
  word.forEach((letter, i) => {
    if (letter.state === STATE.MISS) {
      acc.not_contains = addLetter(acc.not_contains, letter.letter);
    } else if (
      letter.state === STATE.HIT ||
      letter.state === STATE.HIT_BUT_NOT_REALLY
    ) {
      acc.contains = addLetter(acc.contains, letter.letter);
      if (letter.state === STATE.HIT) {
        acc.positional_contains = addLetterToPosition(
          stringOrPositionalTemplate(acc.positional_contains),
          i,
          letter.letter
        );
      } else {
        acc.positional_not_contains[wordIndex] = addLetterToPosition(
          stringOrPositionalTemplate(acc.positional_not_contains[wordIndex]),
          i,
          letter.letter
        );
      }
    }
  });
  return acc;
}

export function defaultValues(): Rules {
  return {
    contains: "",
    not_contains: "",
    positional_contains: stringOrPositionalTemplate(),
    positional_not_contains: [],
  };
}
