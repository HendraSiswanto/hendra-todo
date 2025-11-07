"use client"
import { useEffect, useState } from "react";


export default function DashboardPage() {
    const [user,setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex flex-row justify-between border border-[#D8D8D8] pb-3">

    <div className="w-[169px] flex flex-row justify-between pl-3.5 pt-3 items-center">
      <div className="w-9 flex justify-center items-center">
      <i className="bi bi-star-fill  text-[19px] text-[#4C4E648A]"></i>
      </div>  
      <span className="pl-1 text-[#4C4E6461] text-[16px] w-[115px] h-6">Search (Ctrl+/)</span>
    </div>

    <div>
        <p>{user.fullName}</p>
    </div>
    </div>
  );
}
