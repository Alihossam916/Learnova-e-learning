// lib
import { getCurrentUser } from "@/lib/auth";
// components
import NavbarClient from "./navbarClient";

const Navbar = async () => {
  const user = await getCurrentUser();

  return <NavbarClient user={user} />;
};

export default Navbar;
