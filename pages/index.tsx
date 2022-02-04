import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { Word } from "../components/word";
import { NEXT_STATE } from "../helpers/const";
import { set } from "../helpers/array";
import { wordsReducer, defaultValues, ILetter } from "../helpers/word";
import { getWord } from "../api/word";

import Head from "next/head";

const Home: NextPage = () => {
  const [words, updateWords] = useState<ILetter[][]>([]);
  const [changed, setChanged] = useState(Date.now());
  const [currentWord, setCurrentWord] = useState(0);

  const addWord = useCallback(
    (word) => {
      updateWords(set(words, currentWord + 1, word));
    },
    [words, currentWord]
  );

  useEffect(() => {
    const rules = words.reduce(wordsReducer, defaultValues());
    getWord(rules, addWord);
  }, [changed]);

  const reset = useCallback(() => {
    updateWords([]);
    setCurrentWord(0);
    setChanged(Date.now());
  }, []);

  const updateLetter = useCallback(
    (wordIndex, letterIndex) => {
      setCurrentWord(wordIndex);
      updateWords(
        set(
          words,
          wordIndex,
          set(words[wordIndex], letterIndex, {
            ...words[wordIndex][letterIndex],
            state: NEXT_STATE[words[wordIndex][letterIndex].state],
          })
        )
      );
      setChanged(Date.now());
    },
    [words, setCurrentWord]
  );

  return (
    <div className="App">
      <Head>
        <title>Wordle game cheat</title>
        <meta name="description" content="Wordle game cheat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>
        This is <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a>{" "}
        game cheat
      </h1>
      <button className="Reset" onClick={reset}>
        reset
      </button>
      {words.map((word, index) => (
        <Word
          word={word}
          key={index}
          updateWord={updateLetter.bind(null, index)}
        />
      ))}
    </div>
  );
};

export default Home;
