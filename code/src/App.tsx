import { Routes, Route } from "react-router";
import { RentalPricePage } from "./component/RentalPricePage.tsx";
import { VideoRentalCalculatorImpl } from "./service/VideoRentalCalculator.ts";
import { plays } from "./repository/plays.ts";
import { invoices } from "./repository/invoices.ts";

export function App() {
  const videoRentalCalculator = new VideoRentalCalculatorImpl();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RentalPricePage
            videoRentalCalculator={videoRentalCalculator}
            invoicesData={invoices}
            playsData={plays}
          />
        }
      />
    </Routes>
  );
}
