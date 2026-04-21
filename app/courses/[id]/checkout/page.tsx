import React from "react";

// components
import CheckoutForm from "@/components/common/checkoutForm";

// lib
import { getCourseById } from "@/lib/api";

interface CheckoutProps {
  params: Promise<{ id: string }>;
}

const Checkout = async ({ params }: CheckoutProps) => {
  const { id } = await params;
  const course = await getCourseById(id);


  return (
    <div className="w-fit space-y-8 pt-6 pb-14 mx-auto">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <CheckoutForm course={course} />
    </div>
  );
};

export default Checkout;
