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
): Promise<PaymentResponse> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));
  
  const expiryDate = paymentDetails.expiry.split("/");

  // Mock validation
  if (
    paymentDetails.cardNumber.length === 16 &&
    paymentDetails.cvv.length === 3 &&
    parseInt(expiryDate[0]) <= 12 &&
    parseInt(expiryDate[1]) <= 50 
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
