import { Routes, Route } from "react-router";
import { RentalPricePage } from "./component/RentalPricePage.tsx";
import { statement } from "./service/VideoRentalCalculator.ts";
import { plays } from "./repository/plays.ts";
import { invoices } from "./repository/invoices.ts";

export function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RentalPricePage
            videoRentalCalculator={statement}
            invoicesData={invoices}
            playsData={plays}
          />
        }
      />
    </Routes>
  );
}
