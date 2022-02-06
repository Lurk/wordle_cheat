import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import { Word } from "../components/word";
import { STATE, NEXT_STATE } from "../helpers/const";
import { set } from "../helpers/array";
import { wordsReducer, defaultValues, ILetter } from "../helpers/word";
import { getWord } from "../api_helpers/word";

import Head from "next/head";
import { useDebounce } from "../components/use_debounce";
import { Letter } from "../components/letter";
import { Help } from "../components/help";

const Home: NextPage = () => {
  const [words, updateWords] = useState<ILetter[][]>([]);
  const [changed, setChanged] = useState(Date.now());
  const [currentWord, setCurrentWord] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const addWord = useCallback(
    (word) => {
      updateWords(set(words.slice(0, currentWord + 1), currentWord + 1, word));
      setIsLoading(false);
    },
    [words, currentWord]
  );

  const update = useCallback(() => {
    setIsLoading(true);
    getWord(words.slice(0, currentWord + 1), addWord);
  }, [words, addWord, currentWord]);

  const debouncedUpdate = useDebounce(update, 500);

  useEffect(update, []);

  useEffect(debouncedUpdate, [changed]);

  const reset = useCallback(() => {
    updateWords([]);
    setCurrentWord(0);
    setChanged(Date.now());
  }, []);

  const updateLetter = useCallback(
    (wordIndex, letterIndex) => {
      if (isLoading) return;
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
    [words, setCurrentWord, isLoading]
  );

  return (
    <div className="App">
      <Head>
        <title>Wordle game cheat</title>
        <meta name="description" content="Wordle game cheat" />
        <link rel="icon" href="/favicon.ico?v1" />
      </Head>
      <h1>
        This is <a href="https://www.powerlanguage.co.uk/wordle/">Wordle</a>{" "}
        game cheat
      </h1>

      {words.map((word, index) => (
        <Word
          word={word}
          key={index}
          updateWord={updateLetter.bind(null, index)}
        />
      ))}
      <button className="Reset" onClick={reset}>
        reset
      </button>

      <Help />

      <p>
        <a href="https://github.com/Lurk/wordle_cheat">fork me</a>
      </p>
    </div>
  );
};

export default Home;
