export type Performance = {
  playID: string;
  audience: number;
};

export type Invoice = {
  customer: string;
  performances: Performance[];
};

export const invoices: Invoice = {
  customer: "BigCo",
  performances: [
    {
      playID: "hamlet",
      audience: 55,
    },
    {
      playID: "asLike",
      audience: 35,
    },
    {
      playID: "othello",
      audience: 40,
    },
  ],
};
