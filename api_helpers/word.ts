import { STATE } from "../helpers/const";
import { ILetter, Rules, wordsReducer, defaultValues } from "../helpers/word";

export async function getWord(
  words: ILetter[][],
  setWord: (word: ILetter[]) => void
) {
  const rules = words.reduce(wordsReducer, defaultValues());
  console.log({ rules, words });
  try {
    const raw = await fetch("/api/word", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rules),
    });
    const res = await raw.text();
    setWord(
      res.split("").map((letter, index) => ({
        letter,
        state:
          rules.positional_contains[index] === letter
            ? STATE.HIT
            : STATE.DEFAULT,
      }))
    );
  } catch (e) {
    console.error(e);
  }
}
