"use client";
import { useEffect, useState } from "react";
import SplashScreen from "../SplashScreen/SplashScreen";
import { fetchUser } from "../lib/api";

export default function AuthLoader() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const data = await fetchUser(token);
        if (data) setIsAuthenticated(true);
      } catch (err) {
        console.error("❌ Auth verification failed:", err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  if (loading) return <SplashScreen />;

  // No redirects — just return null when done
  return null;
}
