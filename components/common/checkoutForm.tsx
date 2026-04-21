"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// types
import { Course } from "@/lib/filterCourses";

// icons
import { CreditCard } from "lucide-react";

// lib
import { processPayment } from "@/lib/mockPayment";

const CheckoutForm = ({ course }: { course: Course }) => {
  const router = useRouter();

  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Card holder name handiling function
  const handleCardHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^a-z\s]+/gi, "");
    setCardHolder(input);
  };

  // Card number handling function
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ""); //keep only digits
    setCardNumber(input);
  };

  // Expiry date handling function
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, ""); // Keep only digits
    if (input.length > 2) {
      input = input.substring(0, 2) + "/" + input.substring(2, 4); // Format as MM/YY
    }
    setExpiry(input);
  };

  // CVV handling function
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, ""); // Keep only digits
    if (input.length > 3) {
      input = input.substring(0, 3);
    }
    setCvv(input);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // collect form data
    const formDetails = {
      cardHolder: cardHolder,
      cardNumber: cardNumber,
      expiry: expiry,
      cvv: cvv,
    };
    // verify payment proccess
    const result = await processPayment(formDetails, course.price);
    if (result.success == false) {
      alert(result.error);
    } else {
      alert(`Successful Transaction: ${result.transactionId}`);
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex gap-8 justify-center flex-col-reverse lg:flex-row">
      {/* payment form */}
      <div className="border-2 border-border p-6 rounded-sm max-w-[500px]">
        <div className="flex items-center gap-2 mb-6">
          <CreditCard className="size-6 text-primary" />
          <h3 className="font-bold text-xl">Payment Details</h3>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* card details */}
          <label htmlFor="name">Name on Card</label>
          <input
            type="text"
            placeholder="John Doe"
            id="name"
            value={cardHolder}
            onChange={handleCardHolderChange}
            className="p-2 rounded-[8px] border-2 border-border"
            required
          />
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            placeholder="0123 4567 8901 2345"
            id="cardNumber"
            value={cardNumber}
            onChange={handleCardNumberChange}
            className="p-2 rounded-[8px] border-2 border-border"
            required
          />
          {/* expiry and cvv */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex flex-col gap-2">
              <label htmlFor="expiry">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                id="expiry"
                value={expiry}
                onChange={handleExpiryChange}
                className="p-2 rounded-[8px] border-2 border-border"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                placeholder="123"
                id="cvv"
                value={cvv}
                onChange={handleCvvChange}
                className="p-2 rounded-[8px] border-2 border-border"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 bg-primary text-white cursor-pointer px-4 py-2 rounded-sm hover:bg-primary/90 transition-colors duration-300"
          >
            Pay Now
          </button>
        </form>
      </div>
      {/* order summary */}
      <div className="border-2 border-border p-6 rounded-sm h-fit">
        <h3 className="font-bold text-xl mb-4">Order Summary</h3>
        <div className="flex flex-col space-y-5">
          <div className="flex flex-wrap gap-4">
            <Image
              src={course?.imageUrl || "/placeholder-image.jpg"}
              alt={course?.title || "Course Image"}
              width={200}
              height={120}
              className="object-cover rounded-sm aspect-video"
            />
            <div className="flex flex-col gap-2">
              <h4 className="font-bold text-lg mt-2">{course?.title}</h4>
              <p>By {course?.instructor}</p>
            </div>
          </div>
          <hr className="w-full border-2" />
          {/* course price and taxes */}
          <div className="w-full">
            <div className="flex justify-between w-full">
              <p className="text-muted-foreground">Subtotal</p>
              <p className="text-md">${course?.price}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-muted-foreground">Tax</p>
              <p className="text-md">$0.00</p>
            </div>
          </div>
          <hr className="w-full border-2" />
          {/* total */}
          <div className="flex justify-between w-full">
            <p className="font-bold text-lg">Total</p>
            <p className="font-bold text-lg">${course?.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
