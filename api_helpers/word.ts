import { STATE } from "../helpers/const";
import { ILetter, Rules, wordsReducer, defaultValues } from "../helpers/word";

export async function getWord(
  words: ILetter[][],
  setWord: (word: ILetter[]) => void
) {
  const rules = words.reduce(wordsReducer, defaultValues());
  rules.positional_not_contains = rules.positional_not_contains.filter((v)=>v);
  console.log({ rules, words });
  try {
    const raw = await fetch("/api/word", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({rules, times: [{step: "sending request", time: Date.now()}]}),
    });
    const res = await raw.json();
    res.times.push({step: "got response from vercel", time: Date.now()});
    console.table(res.times);
    setWord(
      res.word.split("").map((letter:string, index:number) => ({
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
