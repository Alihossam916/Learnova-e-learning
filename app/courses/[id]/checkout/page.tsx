import React from "react";
import { redirect } from "next/navigation";

// components
import CheckoutForm from "@/components/common/checkoutForm";

// lib
import { getCourseById } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";

interface CheckoutProps {
  params: Promise<{ id: string }>;
}

const Checkout = async ({ params }: CheckoutProps) => {
  const { id } = await params;
  const course = await getCourseById(id);
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="w-fit space-y-8 pt-6 pb-14 mx-auto">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <CheckoutForm course={course} />
    </div>
  );
};

export default Checkout;
