"use client";

import React from "react";
import GrubDashLogo from "../GrubDashLogo/GrubDashLogo";

export default function SplashScreen() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-background-light dark:bg-background-dark">
        <div
          className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-5"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAF9SOi49N2Znpt0DgKdLLWBiAvZfK7c9z2_PYZuSPUFpHe2xZPbynfpd8OnA5YdDr25GKbwWQNvTugj72Yz64LHhMw-XuRbXV3HmKzfxhXwnKF1QknX45uvZUuc8IztKCIMQNcjKri1q1DLTOUASwxVuEEklj2TV7YrmrSICCEcZuTf1qSBezYW1fPaWTZByD8B7JzijiOH3MYKc7XnpV7M_QSBbV6_A_uVGlEaekrPAEsTo-ZkI8xmvr-8hZ6GFAl64HLFQKxdK82")',
          }}
        ></div>
      </div>

      {/* Center Content */}
      <div className="relative flex flex-col items-center justify-center space-y-4">
        {/* Logo Animation */}

        <GrubDashLogo />

        {/* Title */}
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <h1 className="text-background-dark dark:text-background-light tracking-light text-[32px] font-bold leading-tight px-4 text-center">
            GrubDash
          </h1>
        </div>

        {/* Subtitle */}
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: "1s" }}
        >
          <p className="text-background-dark/70 font-semibold dark:text-background-light/70 text-base text-gray-600 leading-normal px-4 text-center">
            Your Culinary Journey Begins Here
          </p>
        </div>
      </div>
    </div>
  );
}
