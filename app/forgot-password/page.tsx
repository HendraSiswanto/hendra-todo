"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSent(true);
    }, 1000);
  };

  if (isSent) {
    return (
      <div className="flex flex-col items-center justify-center w-screen min-h-screen">
        <h1 className="text-3xl font-bold mb-4 text-green-600">
          ✅ Reset Link Sent!
        </h1>
        <p className="text-gray-700">
          We’ve sent a password reset link to <strong>{email}</strong>.
        </p>
        <a href="/login" className="mt-6 text-blue-600 hover:underline">
          Back to Login
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen ">
      <div className="w-130 h-50 flex justify-center flex-col items-center rounded-[20px] shadow-sm ">
        <h1 className="text-3xl font-bold mb-6">Forgot Password</h1>
        <p className="text-gray-600 mb-4">Enter your email to reset password</p>

        <form onSubmit={handleSubmit} >
          <div className="flex flex-row justify-between items-center">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded w-80"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-1"
            >
              Send Reset Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
