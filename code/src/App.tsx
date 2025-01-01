import { Routes, Route } from "react-router";
import { RentalPricePage } from "./component/RentalPricePage.tsx";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<RentalPricePage />} />
    </Routes>
  );
}
