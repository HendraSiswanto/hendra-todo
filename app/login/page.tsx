"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMassage, setErrMessage] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://fe-test-api.nwappservice.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login Failed");
        return;
      }

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      localStorage.setItem("token", data.content.token);
      localStorage.setItem("user", JSON.stringify(data.content.user));
      router.push("/dashboard");
    } catch (error) {
      setErrMessage("Something went wrong. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-[#ffffff] px-4">
      <div className="mb-10">
        <h1
          className=" text-[56px] font-semibold text-center mb-8 text-[#44444F]"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Sign In
        </h1>
        <h2
          className="w-[438px] text-[16px] font-normal text-center  text-[#92929D]"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Just sign in if you have an account in here. Enjoy our Website
        </h2>
      </div>
      <div className="w-[560px] h-[314px] bg-gray rounded-[20px] shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative mt-3">
            <label className="absolute -top-2 ml-[15px] w-[133px] bg-[#ffffff] text-center block text-[12px] font-normal text-[#50B5FF] mb-1">
              Your Email / Username
            </label>
            <input
              type="email"
              className="w-[500px] h-[48] text-[#44444F] pl-[15px] border border-[#50B5FF] rounded-[10px] focus:outline-none focus:ring-1 focus:ring-[#3bacfd]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative mt-6">
            <label className="absolute -top-2 ml-[15px] w-16 bg-[#ffffff] text-center block text-[12px] font-normal text-[#FC5A5A] mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-[500px] h-[48] text-[#44444F] pl-[15px] border border-[#FC5A5A] rounded-[10px] focus:outline-none focus:ring-1 focus:ring-[#fe4f4f]"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-row justify-between align-middle">
            <label className="flex items-center space-x-2 cursor-pointer">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
                className="data-[state=checked]:bg-[#50B5FF]  data-[state=checked]:text-white cursor-pointer"
              />
              <span  className="text-[14px] text-[#696974] ml-1">
                Remember me
              </span>
            </label>

            <a href="/forgot-password" className="size-3.5 w-fit h-fit text-[#50B5FF] font-medium cursor-pointer hover:underline">
              Forgot Password
            </a>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-[500px] h-12 bg-[#0062FF] text-white rounded-[10px] font-semibold text-[12px] hover:bg-[#044dc3] transition"
          >
            Login
          </button>
        </form>
        {errMassage && <p style={{ color: "red" }}>{errMassage}</p>}
      </div>
      <p className="text-center font-medium text-[14px] text-[#0062FF] mt-[15px]">
        Don’t have an account?{" "}
        <a href="/register" className="text-blue-600 hover:underline">
          Register
        </a>
      </p>
    </div>
  );
}
