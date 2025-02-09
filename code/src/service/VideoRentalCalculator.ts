import type { Invoice, Performance } from "../repository/invoices.ts";
import type { Plays } from "../repository/plays.ts";

interface PerformanceWithPlay extends Performance {
  play: Plays[keyof Plays];
}

export function statement(invoices: Invoice[], plays: Plays): string {
  const statementData: Invoice = {} as Invoice;
  statementData.customer = invoices[0].customer;
  statementData.performances = invoices[0].performances.map(enrichPerformance);
  return renderPlainText(statementData, plays);

  function enrichPerformance(aPerformance: Performance): PerformanceWithPlay {
    const result: PerformanceWithPlay = {
      ...aPerformance,
      play: playFor(aPerformance),
    };
    return result;
  }

  function playFor(aPerformance: Performance) {
    return plays[aPerformance.playID];
  }
}

function renderPlainText(data: Invoice, plays: Plays) {
  let result = `Statement for ${data.customer} \n`;
  for (const perf of data.performances) {
    result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats) \n`;
  }

  result += `Amount owed is ${usd(totalAmount())} \n`;
  result += `You earned ${totalVolumeCredits()} credits \n`;

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

  function volumeCreditsFor(aPerformance: Performance) {
    let result = 0;

    result += Math.max(aPerformance.audience - 30, 0);

    if ("comedy" === playFor(aPerformance).type)
      result += Math.floor(aPerformance.audience / 5);

    return result;
  }

  function usd(aNumber: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function totalVolumeCredits() {
    let result = 0;
    for (const perf of data.performances) {
      result += volumeCreditsFor(perf);
    }

    return result;
  }

  function totalAmount() {
    let result = 0;
    for (const perf of data.performances) {
      result += amountFor(perf);
    }
    return result;
  }
}
