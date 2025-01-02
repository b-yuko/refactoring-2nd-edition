import type { Plays } from "../repository/plays.ts";
import type { Invoice } from "../repository/invoices.ts";
import { statement } from "../service/VideoRentalCalculator.ts";

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
  const result = videoRentalCalculator(invoicesData, playsData);
  const formattedResult = result.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  return <div>{formattedResult}</div>;
}
