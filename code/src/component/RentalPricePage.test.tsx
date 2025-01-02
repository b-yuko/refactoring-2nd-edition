import { render, screen } from "@testing-library/react";
import { RentalPricePage } from "./RentalPricePage";
import { plays } from "../repository/plays.ts";
import { invoices } from "../repository/invoices.ts";

const mockStatement = vi.fn().mockReturnValue("Mocked Statement");

describe("RentalPricePage", () => {
  test("statement 関数が呼ばれ、ステートメントが正しく表示されること", () => {
    // WHEN
    render(
      <RentalPricePage
        videoRentalCalculator={mockStatement}
        invoicesData={invoices}
        playsData={plays}
      />,
    );

    // THEN
    expect(screen.getByText("Mocked Statement")).toBeInTheDocument();
  });

  test("statement 関数が正しい引数で呼ばれること", () => {
    // WHEN
    render(
      <RentalPricePage
        videoRentalCalculator={mockStatement}
        invoicesData={invoices}
        playsData={plays}
      />,
    );

    // THEN
    expect(mockStatement).toHaveBeenCalledWith(invoices, plays);
  });

  test("ステートメントが複数行で正しく表示されること", () => {
    const mockMultiLineStatement = vi
      .fn()
      .mockReturnValue("Line 1\nLine 2\nLine 3");
    render(
      <RentalPricePage
        videoRentalCalculator={mockMultiLineStatement}
        invoicesData={invoices}
        playsData={plays}
      />,
    );

    // 各行が表示されていることを確認
    expect(screen.getByText("Line 1")).toBeInTheDocument();
    expect(screen.getByText("Line 2")).toBeInTheDocument();
    expect(screen.getByText("Line 3")).toBeInTheDocument();
  });

  test("レンダリングが1回のみ行われること", () => {
    const mockStatementOnce = vi.fn().mockReturnValue("Mocked Statement");
    const { rerender } = render(
      <RentalPricePage
        videoRentalCalculator={mockStatementOnce}
        invoicesData={invoices}
        playsData={plays}
      />,
    );

    // 初回レンダリング
    expect(mockStatementOnce).toHaveBeenCalledTimes(1);

    // 再レンダリング
    rerender(
      <RentalPricePage
        videoRentalCalculator={mockStatementOnce}
        invoicesData={invoices}
        playsData={plays}
      />,
    );

    // 再レンダリングは1回のみ
    expect(mockStatementOnce).toHaveBeenCalledTimes(1);
  });
});
