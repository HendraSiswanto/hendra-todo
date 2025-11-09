"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function RegisterPage() {
  const router = useRouter();
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handlePasswordInvisible = (field: "password" | "confirmPassword") => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    } else {
      setShowConfirmPassword((prev) => !prev);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formdata.password !== formdata.confirmPassword) {
      alert("password do not match!");
      return;
    }

    const fullEmail = `${formdata.email}@nodewave.id`;
    const fullName = `${formdata.firstname} ${formdata.lastname}`;
    const finalData = {
      fullName,
      email: fullEmail,
      password: formdata.password,
    };

    try {
      const response = await fetch(
        "https://fe-test-api.nwappservice.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        console.log("Error:", data);
        alert("Registration failed: " + data.message);
        return;
      }

      console.log("Success:", data);
      alert("Registration successful!");
      router.push("/login")
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again later.");
    }
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
          style={{ fontFamily: "Roboto, sans-serif" }}
        >
          Let’s Sign up first for enter into Square Website. Uh She Up!
        </h2>
      </div>
      <div className="w-[560px] h-[597px] bg-gray rounded-[20px] shadow-sm p-[30px]">
        <form onSubmit={handleSubmit} className="space-y-5 mt-5">
          <div className="flex flex-row justify-between relative mt-5">
            <label className="absolute -top-2 ml-[15px] w-[68px] bg-[#ffffff] text-center block text-[12px] font-normal text-[#50B5FF] mb-1">
              First Name
            </label>
            <input
              name="firstname"
              className="w-60 h-[48] placeholder:text-[#B5B5BE] text-[#44444F] pl-[15px] border border-[#50B5FF] rounded-[10px] focus:outline-none focus:ring-1 focus:ring-[#3bacfd]"
              placeholder="First Name"
              value={formdata.firstname}
              onChange={handleChange}
              required
            />
            <input
              name="lastname"
              className="w-60 h-[48] placeholder:text-[#B5B5BE] text-[#44444F] pl-[15px] border border-[#E2E2EA] rounded-[10px]  focus:outline-none focus:ring-1 focus:ring-[#3bacfd]"
              placeholder="Last Name"
              value={formdata.lastname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-row justify-between  mt-5">
            <div className="flex flex-row justify-between w-60 ">
              <select
                className="w-[50px]  cursor-pointer text-center appearance-none h-12 placeholder:text-[#B5B5BE] text-[#50B5FF] border border-[#50B5FF] rounded-[10px]  focus:outline-none focus:ring-1 focus:ring-[#3bacfd]"
                value={formdata.countryCode}
                onChange={handleChange}
                name="countryCode"
                required
              >
                <option value="+62">+62</option>
                <option value="+60">+60</option>
                <option value="+91">+91</option>
              </select>
              <input
                name="phonenumber"
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
                <i className="w-4 h-4 text-[#B5B5BE] bi bi-caret-down-fill"></i>
              </div>
            </div>
          </div>
          <div className="relative flex flex-row items-center">
            <input
              type="text"
              name="email"
              className="w-[500px] h-12 placeholder:text-[#B5B5BE] text-[#44444F] pl-[15px] border border-[#E2E2EA] rounded-[10px]  focus:outline-none focus:ring-1 focus:ring-[#3bacfd]"
              placeholder="Mail Address"
              value={formdata.email}
              onChange={handleChange}
              required
            />
            <span className="absolute right-[15px] text-[#44444F]">
              @nodewave.id{" "}
            </span>
          </div>

          <div className="flex flex-row justify-between mt-5">
            <div className="relative flex items-center">
              <input
                name="password"
                minLength={10}
                type={showPassword ? "text" : "password"}
                className="w-60 h-12 placeholder:text-[#B5B5BE] text-[#44444F] pl-[15px] border border-[#E2E2EA] rounded-[10px]  focus:outline-none focus:ring-1 focus:ring-[#3bacfd]"
                placeholder="Password"
                value={formdata.password}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="absolute right-4 "
                onClick={() => handlePasswordInvisible("password")}
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash text-[#92929D] cursor-pointer "></i>
                ) : (
                  <i className="bi bi-eye text-[#92929D] cursor-pointer"></i>
                )}
              </button>
            </div>

            <div className="relative flex items-center">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="w-60 h-12 placeholder:text-[#B5B5BE] text-[#44444F] pl-[15px] border border-[#E2E2EA] rounded-[10px]  focus:outline-none focus:ring-1 focus:ring-[#3bacfd]"
                placeholder="Confirm Password"
                value={formdata.confirmPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="absolute right-4 "
                onClick={() => handlePasswordInvisible("confirmPassword")}
              >
                {showConfirmPassword ? (
                  <i className="bi bi-eye-slash text-[#92929D] cursor-pointer "></i>
                ) : (
                  <i className="bi bi-eye text-[#92929D] cursor-pointer"></i>
                )}
              </button>
            </div>
          </div>

          <div className=" flex flex-col w-[500px] h-[127px] space-y-2 mt-[30px] mb-[70px]">
            <label className="text-[14px] w-[136px] h-4 text-[#44444F]">
              Tell us about yourself
            </label>
            <textarea
              name="about"
              className="mt-[15px] placeholder:text-[#B5B5BE] w-[500px] h-24 border border-[#E2E2EA] rounded-[10px] pt-4 p-[15px] resize-none focus:outline-none focus:ring-1 focus:ring-[#3bacfd]"
              rows={3}
              value={formdata.about}
              onChange={handleChange}
              placeholder="Hello my name..."
            ></textarea>
          </div>

          <div className="w-[500px] h-12 flex flex-row justify-between">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="w-[150px] h-12 border-none rounded-[10px] cursor-pointer bg-[#F1F1F5] text-[12px] font-semibold text-[#696974]"
            >
              Login
            </button>
            <button
              type="submit"
              className="cursor-pointer w-[340px] h-12 bg-[#0062FF] text-white rounded-[10px] font-semibold text-[12px] hover:bg-[#044dc3] transition"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
