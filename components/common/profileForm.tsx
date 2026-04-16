"use client";

import React, { useState } from "react";
// lib
import { updateProfile } from "@/lib/auth";
// stores
import { useAuthStore } from "@/store/authStore";
// icons
import { User as UserIcon, Mail, Shield } from "lucide-react";
// ui components
import { Button } from "@/components/ui/button";

const ProfileForm = () => {
  const { user, updateUser } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <UserIcon className="size-16 text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">
          Please sign in to view your profile
        </h2>
      </div>
    );
  }

  // Get initials for avatar
  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  // Capitalize role for display
  const displayRole =
    user.role === "learn"
      ? "Student"
      : user.role === "teach"
        ? "Instructor"
        : user.role;

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const firstName = (formData.get("firstName") as string)?.trim();
    const lastName = (formData.get("lastName") as string)?.trim();

    const nameRegex = /^[a-zA-Z]{2,30}$/;

    if (!firstName || !lastName) {
      setMessage({
        type: "error",
        text: "Please fill in all required fields.",
      });
      return;
    }
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      setMessage({
        type: "error",
        text: "Names can only contain letters (2-30 characters).",
      });
      return;
    }

    setIsSaving(true);
    setMessage(null);

    const result = await updateProfile({
      firstName,
      lastName,
      email: user.email,
      role: user.role,
    });

    setIsSaving(false);

    if (result.success) {
      // Update the local store
      updateUser({ firstName, lastName });
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } else {
      setMessage({
        type: "error",
        text: result.error || "Failed to update profile.",
      });
    }
  };

  return (
    <section className="flex flex-col justify-center items-center w-full py-8">
      <div className="w-full max-w-2xl space-y-8">
        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account information and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-card border border-border rounded-sm p-6 md:p-8 space-y-6">
          {/* Profile Header - Avatar, Name, Email, Role */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-border">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-primary/30 flex items-center justify-center border-4 border-primary/20">
                <span className="text-4xl font-bold text-primary">
                  {initials}
                </span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex flex-col items-center sm:items-start flex-1">
              <h2 className="text-2xl font-bold text-foreground capitalize">
                {user.firstName} {user.lastName}
              </h2>
              <div className="flex flex-col gap-2 mt-2 w-full">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="size-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="size-4" />
                  <span className="text-sm text-primary-foreground capitalize bg-primary px-3 py-1 rounded-sm ">{displayRole}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name Input */}
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
                defaultValue={user.firstName}
                placeholder="Enter your first name"
                className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder-muted-foreground"
                required
              />
            </div>

            {/* Last Name Input */}
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
                defaultValue={user.lastName}
                placeholder="Enter your last name"
                className="w-full px-4 py-2 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder-muted-foreground"
                required
              />
            </div>

            {/* Email Input (Read Only) */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={user.email}
                readOnly
                className="w-full px-4 py-2 border border-border rounded-sm bg-muted/50 text-muted-foreground cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Emails cannot be changed.
              </p>
            </div>

            {/* Message Display */}
            {message && (
              <div
                className={`p-3 rounded-sm text-sm ${
                  message.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {message.text}
              </div>
            )}

            {/* Save Button */}
            <Button
              type="submit"
              disabled={isSaving}
              className="w-full bg-primary text-primary-foreground font-semibold p-5 rounded-sm hover:bg-primary/90 transition duration-200 mt-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ProfileForm;
