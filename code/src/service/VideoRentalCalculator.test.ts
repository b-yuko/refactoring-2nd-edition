import { describe, expect } from "vitest";
import { statement } from "./VideoRentalCalculator"; // 関数をインポート
import { Invoice } from "../repository/invoices.ts";
import { Plays } from "../repository/plays.ts";

const realDataPlays: Plays = {
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

const realDataInvoices: Invoice[] = [
  {
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
  },
];

describe("関数型バージョンでテスト", () => {
  test("正常なステートメントが返されること", () => {
    const result = statement(realDataInvoices, realDataPlays);

    // 結果が文字列であることを確認
    expect(result).toBeTypeOf("string");
  });

  test("異なる種類の演劇が計算されること", () => {
    const result = statement(realDataInvoices, realDataPlays);

    // 演劇ごとに期待される料金が計算されているか確認
    // Hamlet の料金計算
    expect(result).toContain("Hamlet: $650.00 (55 seats)");
    // As You Like It の料金計算
    expect(result).toContain("As You Like It: $580.00 (35 seats)");
    // Othello の料金計算
    expect(result).toContain("Othello: $500.00 (40 seats)");
  });

  test("合計金額が正しく計算されること", () => {
    const result = statement(realDataInvoices, realDataPlays);

    // 合計金額が正しく計算されているか確認
    expect(result).toContain("Amount owed is $1,730.00");
  });

  test("ボリューム特典ポイントが正しく計算されること", () => {
    const result = statement(realDataInvoices, realDataPlays);

    // ボリューム特典が正しく計算されているか確認
    expect(result).toContain("You earned 47 credits");
  });
});
