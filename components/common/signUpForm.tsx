"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
// lib
import { signUp } from "@/lib/auth";

const SignUpForm = () => {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: role || "learn",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // basic validation
    const { firstName, lastName, email, password } = formData;
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill in all required fields.");
      return;
    }
    const result = await signUp(formData);
    if (!result.success) {
      alert(result.error || "Error creating account. Please try again.");
      return;
    }
    alert("Account created successfully!");
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* First Name */}
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-foreground mb-2"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Enter your first name"
          className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder-muted-foreground"
          required
        />
      </div>

      {/* Last Name */}
      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Enter your last name"
          className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder-muted-foreground"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address"
          className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder-muted-foreground"
          required
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-foreground mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder-muted-foreground"
          required
        />
      </div>

      {/* Role Selection */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          I want to
        </label>
        <div className="flex gap-3">
          <label className="flex-1 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="learn"
              checked={formData.role === "learn"}
              onChange={handleChange}
              className="hidden"
            />
            <div
              className={`w-full py-2 px-4 rounded-sm text-center font-medium transition duration-200 ${
                formData.role === "learn"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border border-border text-foreground hover:bg-muted"
              }`}
            >
              Learn
            </div>
          </label>
          <label className="flex-1 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="teach"
              checked={formData.role === "teach"}
              onChange={handleChange}
              className="hidden"
            />
            <div
              className={`w-full py-2 px-4 rounded-sm text-center font-medium transition duration-200 ${
                formData.role === "teach"
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border border-border text-foreground hover:bg-muted"
              }`}
            >
              Teach
            </div>
          </label>
        </div>
      </div>

      {/* Create Account Button */}
      <button
        type="submit"
        className="cursor-pointer w-full bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-sm hover:bg-primary/90 transition duration-200 mt-6"
      >
        Create Account
      </button>
    </form>
  );
};

export default SignUpForm;
