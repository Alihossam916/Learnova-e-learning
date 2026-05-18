import { describe, test, expect } from "@jest/globals";
import { processPayment } from "../mockPayment";

// ─── processPayment ─────────────────────────────────────────────────────────
describe("processPayment", () => {
  test("returns invalid payment details when card number isn't made of 16 numbers", async () => {
    expect(
      await processPayment({
        cardNumber: "123412341234",
        cardHolder: "Ali Hossam",
        expiry: "12/30",
        cvv: "123",
      }),
    ).toEqual({
      success: false,
      error: "Invalid payment details",
    });
  });

  test("returns invalid payment details when cvv is invalid", async () => {
    expect(
      await processPayment({
        cardNumber: "1234123412341234",
        cardHolder: "Ali Hossam",
        expiry: "12/30",
        cvv: "12",
      }),
    ).toEqual({
      success: false,
      error: "Invalid payment details",
    });
  });

  test("returns invalid payment details when expiry is invalid", async () => {
    expect(
      await processPayment({
        cardNumber: "1234123412341234",
        cardHolder: "Ali Hossam",
        expiry: "11/100",
        cvv: "123",
      }),
    ).toEqual({
      success: false,
      error: "Invalid payment details",
    });
  });
});
