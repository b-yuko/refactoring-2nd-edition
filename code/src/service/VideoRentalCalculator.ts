import type { Invoice, Performance } from "../repository/invoices.ts";
import type { Play, Plays } from "../repository/plays.ts";

export function statement(invoices: Invoice[], plays: Plays): string {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoices[0].customer} \n`;

  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (const perf of invoices[0].performances) {
    const thisAmount = amountFor(perf, playFor(perf));

    // ボリューム特典のポイントを加算
    volumeCredits += Math.max(perf.audience - 30, 0);

    // 喜劇のときは10人につき、さらにポイントを加算
    if ("comedy" === playFor(perf).type)
      volumeCredits += Math.floor(perf.audience / 5);

    // 注文の内訳を出力
    result += `${playFor(perf).name}: ${format(thisAmount / 100)} (${perf.audience} seats) \n`;
    totalAmount += thisAmount;
  }

  result += `Amount owed is ${format(totalAmount / 100)} \n`;
  result += `You earned ${volumeCredits} creditsin \n`;

  return result;

  function amountFor(aPerformance: Performance, play: Play) {
    let result = 0;
    switch (play.type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error("unknown type: $(play.type}");
    }
    return result;
  }

  function playFor(aPerformance: Performance) {
    return plays[aPerformance.playID];
  }
}
