import type { Invoice, Performance } from "../repository/invoices.ts";
import type { Plays } from "../repository/plays.ts";

export function statement(invoices: Invoice[], plays: Plays): string {
  let totalAmount = 0;
  let result = `Statement for ${invoices[0].customer} \n`;

  for (const perf of invoices[0].performances) {
    // 注文の内訳を出力
    result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats) \n`;
    totalAmount += amountFor(perf);
  }

  const volumeCredits = totalVolumeCredits()

  result += `Amount owed is ${usd(totalAmount)} \n`;
  result += `You earned ${volumeCredits} credits \n`;

  return result;

  function amountFor(aPerformance: Performance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
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
        throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }
    return result;
  }

  function playFor(aPerformance: Performance) {
    return plays[aPerformance.playID];
  }

  function volumeCreditsFor(aPerformance: Performance){
    let result = 0

    result += Math.max(aPerformance.audience - 30, 0);

    if ("comedy" === playFor(aPerformance).type)
      result += Math.floor(aPerformance.audience / 5)

    return result
  }

  function usd(aNumber: number){
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function totalVolumeCredits(){
    let volumeCredits = 0;
    for (const perf of invoices[0].performances) {
      volumeCredits += volumeCreditsFor(perf)
    }

    return volumeCredits
  }
}
