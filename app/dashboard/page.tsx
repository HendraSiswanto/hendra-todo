"use client";
import { useEffect, useState } from "react";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}
interface Todo {
  id: string;
  item: string;
  userId: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const [list, setList] = useState<Todo[]>([]);
  const [todo, setTodo] = useState("");
  const [massage, setMassage] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to login first!");
      return;
    }
    try {
      const response = await fetch(
        "https://fe-test-api.nwappservice.com/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json ",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ item: todo }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setList((prevList) => [...prevList, data.content]);
        setMassage(data.message);
        setTodo("");
        console.log(massage);
      } else {
        setMassage(data.message);
        console.log(massage);
      }
    } catch (error) {
      console.error(error);
      setMassage("Something went wrong");
    }
  };
  return (
    <>
      <div className="fixed right-0 left-0 top-0 flex flex-row justify-between border border-[#D8D8D8] pb-3 items-center bg-white">
        <div className="w-[169px] flex flex-row justify-between pl-3.5 pt-3 items-center">
          <div className="w-9 flex justify-center items-center">
            <i className="bi bi-star-fill  text-[19px] text-[#4C4E648A]"></i>
          </div>
          <span
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
            className=" text-[#4C4E6461] text-[16px] w-[115px] h-6"
          >
            Search (Ctrl+/)
          </span>
        </div>

        <div className=" w-[187px] mr-[100px] flex justify-between items-center mt-3 ">
          <p
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
            className="font-normal text-[#323232] text-[16px] w-36 flex justify-center"
          >
            {user.fullName}
          </p>
          <div className="relative ">
            <img src="/assets/Avatar.svg" alt="Profile Icon" className="ml-6" />
            <span className="absolute w-3 h-3 border-2 bg-[#72E128] border-white bottom-0 -right-1.5 rounded-[64px]"></span>
          </div>
        </div>
      </div>

      <div
        className=" flex flex-col mt-[120px] items-center"
        style={{ fontFamily: "var(--font-rubik),sans-serif" }}
      >
        <span className="w-[150px] text-center h-11 text-[36px] font-bold text-[#174286]">
          To Do
        </span>

        <div className="flex flex-col mt-[65px] border rounded-3xl border-[#B5B5BE] w-[850px] h-[504px] p-12 ">
          <form onSubmit={handleSubmit}>
            <div>
              <label className="text-[20px font-medium text-[#7D7D7D] block">
                Add new task
              </label>
              <div className="flex flex-row justify-between items-center mt-2.5">
                <input
                  type="text"
                  value={todo}
                  onChange={(e) => setTodo(e.target.value)}
                  className=" bg-[#FAFAFA] rounded-[3px] w-[560px] text-[24px] border-b-2 border-b-[#174286] pl-4 text-[#323232] font-medium h-11"
                />
                <button
                  type="submit"
                  className="rounded-lg w-40 h-11 text-white bg-[#0062FF] text-[20px] font-medium items-center"
                >
                  Add Todo
                </button>
              </div>
            </div>
          </form>

          {list.map((list) => (
            <li key={list.id}>{list.item}</li>
          ))}
        </div>
      </div>
    </>
  );
}
