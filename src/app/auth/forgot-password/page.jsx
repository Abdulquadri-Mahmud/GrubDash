"use client";

import Header2 from '@/app/components/App_Header/Header2'
import dynamic from "next/dynamic";
// Dynamically import ResetPassword 
const ForgotPassword = dynamic(
  () => import("@/app/components/auth_component/ForgotPassword"));

export default function page() {
  return (
    <div className="bg-zinc-50 font-display text-[#181410]">
        {/* <Header2 /> */}
        <ForgotPassword />
    </div>
  )
}
