// lib/mockPayment.ts
export interface PaymentDetails {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export async function processPayment(
  paymentDetails: PaymentDetails,
  amount: number,
): Promise<PaymentResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock validation
  if (
    paymentDetails.cardNumber.length === 16 &&
    paymentDetails.cvv.length === 3
  ) {
    // Success card
    return {
      success: true,
      transactionId: `TXN-${Date.now()}`,
    };
  }
  return {
    success: false,
    error: "Invalid payment details",
  };
}
