export enum STATE {
  DEFAULT = "default",
  MISS = "miss",
  HIT = "hit",
  HIT_BUT_NOT_REALLY = "hit_but_not_really",
}

export const NEXT_STATE = {
  [STATE.DEFAULT]: STATE.MISS,
  [STATE.MISS]: STATE.HIT,
  [STATE.HIT]: STATE.HIT_BUT_NOT_REALLY,
  [STATE.HIT_BUT_NOT_REALLY]: STATE.DEFAULT,
};
