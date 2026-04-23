// components
import ProfileForm from "@/components/common/profileForm";

// lib
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Profile() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="w-full">
      <ProfileForm />
    </div>
  );
}
