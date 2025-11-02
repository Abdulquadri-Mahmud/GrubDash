"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import SplashScreen from "../SplashScreen/SplashScreen";
import { fetchUser } from "../lib/api";

export default function AuthLoader() {
  const router = useRouter();
  const pathname = usePathname(); // ✅ get current route
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("userToken");

      if (!token) {
        // If user not logged in, send them to signin
        setTimeout(() => router.push("/auth/signin"), 1500);
        return;
      }

      try {
        await fetchUser(token);
        // ✅ Only redirect to /home if they are on splash or root
        if (pathname === "/" || pathname === "/splash") {
          setTimeout(() => router.push("/home"), 1000);
        }
      } catch (err) {
        console.error("❌ Auth error:", err);
        setTimeout(() => router.push("/auth/signin"), 1500);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, pathname]);

  if (loading) return <SplashScreen />;

  return null; // Nothing else renders (Splash handles visuals)
}
