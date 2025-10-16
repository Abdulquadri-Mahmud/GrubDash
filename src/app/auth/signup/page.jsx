import Header2 from "@/app/components/App_Header/Header2";

import dynamic from "next/dynamic";

// Dynamically import ResetPassword 
const Signup = dynamic(
  () => import("@/app/components/auth_component/SignUp"));

export default function SignupPage() {
  return (
    <div className="bg-zinc-50 font-display text-[#181410]">
      {/* <Header2 /> */}
      <Signup />
    </div>
  );
}
