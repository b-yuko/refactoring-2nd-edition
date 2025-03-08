import type { Invoice, Performance } from "../repository/invoices.ts";
import type { Plays } from "../repository/plays.ts";

export function statement(invoice: Invoice, plays: Plays) {
  const statementData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
  };

  return renderPlainText(statementData);

  function enrichPerformance(aPerformance: Performance) {
    const result = Object.assign({}, aPerformance);
    result.play = playFor(result);
    result.amount = amountFor(result);
    return result;
  }

  function amountFor(aPerformance: Performance) {
    let result = 0;
    if (!aPerformance.play) return;
    switch (aPerformance.play.type) {
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
        throw new Error(`unknown type: ${aPerformance.play.type}`);
    }

    return result;
  }

  function playFor(aPerformance: Performance) {
    return plays[aPerformance.playID];
  }
}

function renderPlainText(data: Invoice) {
  let result = `Statement for ${data.customer} \n`;
  for (const perf of data.performances) {
    if (perf.play && perf.amount) {
      result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats) \n`;
    }
  }

  result += `Amount owed is ${usd(totalAmount())} \n`;
  result += `You earned ${totalVolumeCredits()} credits \n`;

  return result;

  function volumeCreditsFor(aPerformance: Performance) {
    let result = 0;

    result += Math.max(aPerformance.audience - 30, 0);

    if (aPerformance.play && "comedy" === aPerformance.play.type)
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

  function totalAmount(): number {
    let result = 0;
    for (const perf of data.performances) {
      if (perf.amount) {
        result += perf.amount;
      }
    }
    return result;
  }
}
