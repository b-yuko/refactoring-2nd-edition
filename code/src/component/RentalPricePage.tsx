import type { VideoRentalCalculator } from "../service/VideoRentalCalculator.ts";
import type { Plays } from "../repository/plays.ts";
import type { Invoice } from "../repository/invoices.ts";

type RentalPricePageProps = {
  videoRentalCalculator: VideoRentalCalculator;
  invoicesData: Invoice[];
  playsData: Plays;
};

export function RentalPricePage({
  videoRentalCalculator,
  invoicesData,
  playsData,
}: RentalPricePageProps) {
  const result = videoRentalCalculator.statement(invoicesData, playsData);
  const formattedResult = result.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  return <div>{formattedResult}</div>;
}
