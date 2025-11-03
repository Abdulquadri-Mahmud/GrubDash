"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthLoader from "./components/AuthLoader";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      router.push("/home");
    } else {
      router.push("/auth/signin");
    }
  }, [router]);

  return <AuthLoader/>;
}
