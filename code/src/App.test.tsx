import { act, render } from "@testing-library/react";
import { expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { App } from "./App.tsx";
import { RentalPricePage } from "./component/RentalPricePage.tsx";

vi.mock("./component/RentalPricePage.tsx");

test("/ を開いたとき、RentalPricePage が開く", async () => {
  // WHEN
  await act(async () => {
    render(
      <MemoryRouter>
        <App />;
      </MemoryRouter>,
    );
  });

  // THEN
  expect(RentalPricePage).toHaveBeenCalled();
});
