import { STATE } from "../helpers/const";
import { ILetter, Rules } from "../helpers/word";

export async function getWord(
  rules: Rules,
  setWord: (word: ILetter[]) => void
) {
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
