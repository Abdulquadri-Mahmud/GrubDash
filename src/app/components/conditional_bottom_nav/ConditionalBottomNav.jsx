"use client";

import { usePathname } from "next/navigation";
import BottomBar from "../BottomNav";

export default function ConditionalBottomNav() {
  const pathname = usePathname();

  // Routes where BottomNav should NOT show
  const noNavRoutes = ["/", "/auth/signin", "/auth/verify-account", "/auth/signup", "/auth/forgot-password", "/auth/reset-password"];

  // Only show nav on main pages
  const showNav = !noNavRoutes.includes(pathname);

  return showNav ? <BottomBar /> : null ;
}
