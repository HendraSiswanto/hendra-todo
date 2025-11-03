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

          <div className="flex flex-row justify-between  mt-6">
            <div className="flex flex-row justify-between w-60 ">
              <select
                className="w-[50px]  cursor-pointer text-center appearance-none h-12 placeholder:text-[#B5B5BE] text-[#50B5FF] border border-[#50B5FF] rounded-[10px]  focus:outline-none focus:ring-1 focus:ring-[#3bacfd]"
                value={formdata.countryCode}
                onChange={handleChange}
                name="countryCode"
                required
              >
                <option value="+62">+62</option>
                <option value="+1">+1</option>
                <option value="+91">+91</option>
              </select>
              <input
                className="w-[180px] h-12 placeholder:text-[#B5B5BE] text-[#44444F] pl-[15px] border border-[#E2E2EA] rounded-[10px]  focus:outline-none focus:ring-1 focus:ring-[#3bacfd]"
                placeholder="Phone Number"
                value={formdata.phonenumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="relative flex flex-row content-center">
              <select
                className={`relative w-60 h-12  appearance-none cursor-pointer pl-[15px]  border border-[#E2E2EA] rounded-[10px]  focus:outline-none focus:ring-1 focus:ring-[#3bacfd]
              ${
                formdata.country === "" ? "text-[#B5B5BE]" : "text-[#44444F]"
              } `}
                value={formdata.country}
                onChange={handleChange}
                name="country"
                required
              >
                <option value="" disabled hidden>
                  Your Country
                </option>
                <option value="indonesia">Indonesia</option>
                <option value="malaysia">Malaysia</option>
                <option value="india">India</option>
              </select>
              <div className="absolute top-4 right-4 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-4 h-4 text-[#B5B5BE] bi bi-caret-down-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </div>
            </div>
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
