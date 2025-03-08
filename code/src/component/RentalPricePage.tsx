import type { Plays } from "../repository/plays.ts";
import type { Invoice } from "../repository/invoices.ts";
import { statement } from "../service/VideoRentalCalculator.ts";
import { useMemo } from "react";

type RentalPricePageProps = {
  videoRentalCalculator: typeof statement;
  invoicesData: Invoice[];
  playsData: Plays;
};

export function RentalPricePage({
  videoRentalCalculator,
  invoicesData,
  playsData,
}: RentalPricePageProps) {
  // // useMemo で statement をメモ化
  // const result = useMemo(
  //   () => videoRentalCalculator(invoice, playsData),
  //   [videoRentalCalculator, invoicesData, playsData],
  // );
  //
  // const formattedResult = result.split("\n").map((line, index) => (
  //   <span key={index}>
  //     {line}
  //     <br />
  //   </span>
  // ));
  //
  // return <div>{formattedResult}</div>;

  const memoizedResults = useMemo(() => {
    return invoicesData.map((invoice) => ({
      customer: invoice.customer,
      result: videoRentalCalculator(invoice, playsData).split("\n"),
    }));
  }, [videoRentalCalculator, invoicesData, playsData]);

  return (
    <div>
      {memoizedResults.map((memoizedResult, index) => (
        <div key={index}>
          <h2>{memoizedResult.customer}</h2>
          <div>
            {memoizedResult.result.map((line, lineIndex) => (
              <span key={lineIndex}>
                {line}
                <br />
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
