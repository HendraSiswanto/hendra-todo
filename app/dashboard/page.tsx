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

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        setList(JSON.parse(savedTodos));
      } catch (error) {
        console.error("Failed to parse saved todos:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(list));
  }, [list]);

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
  const handleDeleteSelected = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You need to login first!");

    const doneTodos = list.filter((item) => item.isDone);
    if (doneTodos.length === 0) {
      alert("No completed todos to delete");
      return;
    }

    try {
      await Promise.all(
        doneTodos.map(async (todo) => {
          await fetch(`https://fe-test-api.nwappservice.com/todos/${todo.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        })
      );

      setList(list.filter((item) => !item.isDone));
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleToggle = async (id: string, isDone: boolean) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("You need to login first!");

    try {
      const response = await fetch(
        `https://fe-test-api.nwappservice.com/todos/${id}/mark`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            action: isDone ? "UNDONE" : "DONE",
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setList((prevList) =>
          prevList.map((list) =>
            list.id === id ? { ...list, isDone: !isDone } : list
          )
        );
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("error:", error);
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

        <div className="flex flex-col mt-[65px] z-10 border rounded-3xl border-[#B5B5BE] w-[850px] h-auto min-h-[504px] p-12 ">
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
                  className="focus:outline-none focus:border-b-[3px] focus:border-b-[#174286] transition-all duration-200 bg-[#FAFAFA] rounded-[3px] w-[560px] text-[24px] border-b-2 border-b-[#174286] pl-4 text-[#323232] font-medium h-11"
                />
                <button
                  type="submit"
                  className="cursor-pointer rounded-lg w-40 h-11 text-white bg-[#0062FF] text-[20px] font-medium items-center"
                >
                  Add Todo
                </button>
              </div>
            </div>
          </form>

          {list.map((list) => (
            <div
              className=" mt-6 pb-6 flex flex-row items-center  border-b-[#979797] border-b mb-5 "
              key={list.id}
            >
              <label className="w-[60px] cursor-pointer ">
                {" "}
                <input
                  type="checkbox"
                  checked={list.isDone}
                  onChange={() => handleToggle(list.id, list.isDone)}
                  className="hidden"
                />
                <div
                  className={` flex justify-center w-7 h-7  rounded-xs p-[5px] items-center ${
                    list.isDone ? "bg-[#afeb9f59]" : "bg-[#E6E6E6]"
                  }`}
                >
                  <img
                    src="/assets/Shape.svg"
                    alt="check"
                    className={`w-4 h-4 transition-opacity duration-150 ${
                      list.isDone ? "opacity-100 " : "opacity-0"
                    }`}
                  />
                </div>
              </label>
              <div className="flex flex-row justify-between w-full items-center ">
                <ul className="pl-1 text-[24px] font-normal">{list.item}</ul>
                <img
                  src={
                    list.isDone
                      ? `/assets/Vector.svg`
                      : `/assets/gg_check-o.svg`
                  }
                  className=" w-7 "
                ></img>
              </div>
            </div>
          ))}
          {list.length > 0 ? (
            <div
              className={
                list.length > 2
                  ? ""
                  : `flex absolute h-102 items-end pointer-events-none`
              }
            >
              <button
                className={`bg-[#FC5A5A] pointer-events-auto text-white font-medium w-[180px] h-10 py-2 px-4 rounded-sm text-[16px] cursor-pointer ${
                  list.length > 2 ? "mt-8" : ""
                } `}
                onClick={handleDeleteSelected}
              >
                Deleted Selected
              </button>
            </div>
          ) : (
            "There is no Todo List"
          )}
        </div>
      </div>
    </>
  );
}
