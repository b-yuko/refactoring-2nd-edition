export type Play = {
  name: string;
  type: "tragedy" | "comedy";
};

export type Plays = {
  [key: string]: Play;
};

export const plays: Plays = {
  hamlet: {
    name: "Hamlet",
    type: "tragedy",
  },
  asLike: {
    name: "As You Like It",
    type: "comedy",
  },
  othello: {
    name: "Othello",
    type: "tragedy",
  },
};
