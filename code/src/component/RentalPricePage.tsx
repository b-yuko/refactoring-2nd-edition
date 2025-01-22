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
  // useMemo で statement をメモ化
  const result = useMemo(
    () => videoRentalCalculator(invoicesData, playsData),
    [videoRentalCalculator, invoicesData, playsData],
  );

  const formattedResult = result.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  return <div>{formattedResult}</div>;
}
