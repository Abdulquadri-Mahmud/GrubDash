"use client";

import { useApi } from "@/app/context/ApiContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";


const LogoImage = () => (
  <img
    src="/logo.png"
    alt="ChowConnect Logo"
    className="w-[170px] object-contain"
  />
);

export default function Signup() {
  const { baseUrl } = useApi();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    avatar: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${baseUrl}/user/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setMessage("Signup successful! 🎉");
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          avatar: "",
          password: "",
        });
        router.push("/auth/signin");
      } else {
        setMessage(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-full my-4 flex items-center justify-center md:px-4 px-2">
      <div className="bg-white w-full max-w-md md:p-8 p-3 rounded-2xl">
        <div className="w-full flex justify-center items-center">
          <LogoImage />
        </div>
        <p className="text-center text-sm mt-4 text-gray-600 mb-6">
          Create your account to start ordering
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-2">
              {/* First Name */}
              <div className="relative">
                <FiUser className="absolute left-3 top-3.5 text-gray-400 text-lg" />
                <input
                  type="text"
                  name="firstname"
                  placeholder="First name"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  required
                />
              </div>

              {/* Last Name */}
              <div className="relative">
                <FiUser className="absolute left-3 top-3.5 text-gray-400 text-lg" />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last name"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg p-3 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <FiMail className="absolute left-3 top-3.5 text-gray-400 text-lg" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg w-full p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                required
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <FiPhone className="absolute left-3 top-3.5 text-gray-400 text-lg" />
              <input
                type="number"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg w-full p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                required
              />
            </div>

          {/* Password with toggle */}
          <div className="relative">
            <FiLock className="absolute left-3 top-3.5 text-gray-400 text-lg" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg w-full p-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </form>

        {message && (
          <p
            className={`text-center mt-4 text-sm ${
              message.includes("successful") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account?{" "}
          <a
            href="/auth/signin"
            className="text-[#FF6B00] font-medium hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
