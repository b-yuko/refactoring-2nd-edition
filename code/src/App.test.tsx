import App from "./App.tsx";
import { render, screen } from "@testing-library/react";
import { expect } from "vitest";

test("Vite + React", () => {
  render(<App />)
  expect(screen.getByText("Vite + React")).toBeInTheDocument()
})