import React from "react";
import { Letter } from "./letter";
import { STATE } from "../helpers/const";
import { Word } from "./word";

export const Help: React.FC = () => (
  <div className="Legend">
    <p>To change letter state click/touch the letter.</p>
    <h2>Legend:</h2>
    <div className="Help">
      <Word
        word={[
          { letter: "s", state: STATE.HIT },
          { letter: "k", state: STATE.DEFAULT },
          { letter: "i", state: STATE.DEFAULT },
          { letter: "l", state: STATE.DEFAULT },
          { letter: "l", state: STATE.DEFAULT },
        ]}
        updateWord={() => {}}
      />
      letter S is in the right spot
    </div>
    <div className="Help">
      <Word
        word={[
          { letter: "s", state: STATE.HIT_BUT_NOT_REALLY },
          { letter: "k", state: STATE.DEFAULT },
          { letter: "i", state: STATE.DEFAULT },
          { letter: "l", state: STATE.DEFAULT },
          { letter: "l", state: STATE.DEFAULT },
        ]}
        updateWord={() => {}}
      />
      letter S is in the word, but not in the right spot
    </div>
    <div className="Help">
      <Word
        word={[
          { letter: "s", state: STATE.MISS },
          { letter: "k", state: STATE.DEFAULT },
          { letter: "i", state: STATE.DEFAULT },
          { letter: "l", state: STATE.DEFAULT },
          { letter: "l", state: STATE.DEFAULT },
        ]}
        updateWord={() => {}}
      />
      letter S is not in the word in any spot
    </div>
  </div>
);
