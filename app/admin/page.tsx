"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "@/lib/api/todo";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.email !== "admin@nodewave.id") {
      router.push("/dashboard");
    } else {
      setAuthorized(true);
    }
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["adminTodos", page, filter],
    queryFn: () => fetchTodos(page, filter),
    enabled: authorized, // ✅ important (wait until auth checked)
  });

  if (!authorized) return <p>Checking access...</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  console.log(data);

  return (
    <div className="p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <select
        onChange={(e) => {
          setFilter(e.target.value);
          setPage(1);
        }}
      >
        <option value="">All</option>
        <option value="DONE">Done</option>
        <option value="UNDONE">Undone</option>
      </select>

      <table className="w-full border rounded-lg overflow-hidden mt-4">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Todo</th>
            <th className="p-3">Status</th>
            <th className="p-3">User</th>
          </tr>
        </thead>
        <tbody>
          {data?.content?.entries
            ?.filter((todo: any) => {
              if (filter === "DONE") return todo.isDone === true;
              if (filter === "UNDONE") return todo.isDone === false;
              return true;
            })
            .map((todo: any) => (
              <tr key={todo.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{todo.item}</td>

                <td className="p-3">{todo.isDone ? "Done" : "Pending"}</td>
                <td className="p-3">{todo.userId}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Page {page} of {data?.content?.totalPage || "-"}
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-md border text-sm disabled:opacity-50 hover:bg-gray-100"
          >
            Prev
          </button>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= data?.content?.totalPage}
            className="px-4 py-2 rounded-md border text-sm disabled:opacity-50 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
