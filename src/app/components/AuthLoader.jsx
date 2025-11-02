"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "../SplashScreen/SplashScreen";
import { fetchUser } from "../lib/api";

export default function AuthLoader() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setTimeout(() => router.push("/auth/signin"), 1500); // show splash briefly
        return;
      }

      try {
        const data = await fetchUser(token);
        // console.log("✅ User profile:", data);
        setTimeout(() => router.push("/order"), 1000);
        
      } catch (err) {
        console.error("❌ Auth error:", err);
        setTimeout(() => router.push("/auth/signin"), 1500);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return <SplashScreen />;

  return null; // nothing else renders (Splash handles the visual)
}
