"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [formdata, setFormData] = useState({
    firstname: "",
    lastname: "",
    countryCode: "+62",
    phonenumber: "",
    country: "",
    email: "",
    password: "",
    confirmPassword: "",
    about: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formdata);
  };

  return (
    <div className="w-screen min-h-screen  flex flex-col items-center justify-center bg-[#ffffff] px-4">
      <div className="mb-10">
        <h1
          className=" text-[56px] font-semibold text-center mb-8 text-[#44444F]"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Register
        </h1>
        <h2
          className="w-[438px] text-[16px] font-normal text-center  text-[#92929D]"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Let’s Sign up first for enter into Square Website. Uh She Up!
        </h2>
      </div>
      <div className="w-[560px] h-[597px] bg-gray rounded-[20px] shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-row justify-between relative mt-3">
            <label className="absolute -top-2 ml-[15px] w-[68px] bg-[#ffffff] text-center block text-[12px] font-normal text-[#50B5FF] mb-1">
              First Name
            </label>
            <input
              className="w-60 h-[48] placeholder:text-[#B5B5BE] text-[#44444F] pl-[15px] border border-[#50B5FF] rounded-[10px] focus:outline-none focus:ring-1 focus:ring-[#3bacfd]"
              placeholder="First Name"
              value={formdata.firstname}
              onChange={handleChange}
              required
            />
            <input
              className="w-60 h-[48] placeholder:text-[#B5B5BE] text-[#44444F] pl-[15px] border border-[#E2E2EA] rounded-[10px]  focus:outline-none focus:ring-1 focus:ring-[#3bacfd]"
              placeholder="Last Name"
              value={formdata.lastname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-row justify-between w-60  mt-6">
            <select
              className="w-[50px] text-center appearance-none h-12 placeholder:text-[#B5B5BE] text-[#50B5FF] border border-[#50B5FF] rounded-[10px]  focus:outline-none focus:ring-1 focus:ring-[#3bacfd]"
              value={formdata.countryCode}
              onChange={handleChange}
              name="countryCode"
              required
            >
              <option value="+62">+62</option>
              <option value="+1">+1</option>
              <option value="+91">+91</option>
            </select>
          </div>

          <div className="flex flex-row justify-between mt-6">
            <input
              type="password"
              className="w-[500px] h-[48] placeholder:text-[#B5B5BE] text-[#44444F] pl-[15px] border border-[#E2E2EA] rounded-[10px]  focus:outline-none focus:ring-1 focus:ring-[#3bacfd]"
              placeholder="Password"
              value={formdata.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer w-[500px] h-12 bg-[#0062FF] text-white rounded-[10px] font-semibold text-[12px] hover:bg-[#044dc3] transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
