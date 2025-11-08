"use client";
import { useEffect, useState } from "react";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="fixed right-0 left-0 flex flex-row justify-between border border-[#D8D8D8] pb-3 items-center">
      <div className="w-[169px] flex flex-row justify-between pl-3.5 pt-3 items-center">
        <div className="w-9 flex justify-center items-center">
          <i className="bi bi-star-fill  text-[19px] text-[#4C4E648A]"></i>
        </div>
        <span className="pl-1 text-[#4C4E6461] text-[16px] w-[115px] h-6">
          Search (Ctrl+/)
        </span>
      </div>

      <div className="w-[168px] mr-[100px]">
        <p className="text-[#323232] text-[16px] w-36 border flex justify-center">{user.fullName}</p>
        
      </div>
    </div>
  );
}
