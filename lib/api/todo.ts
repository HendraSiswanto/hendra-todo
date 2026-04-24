export const fetchTodos = async (page: number, status: string) => {
  const token = localStorage.getItem("token");

  let url = `https://fe-test-api.nwappservice.com/todos?page=${page}`;

  if (status === "DONE") {
    url += `&isDone=true`;
  } else if (status === "UNDONE") {
    url += `&isDone=false`;
  }

  console.log("FETCH URL:", url); // 🔥 debu
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();
  return json;
};
