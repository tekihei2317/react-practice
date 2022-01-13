import axios from "axios";

const todoDataUrl = "http://localhost:3100/todos";

export async function fetchTodos() {
  const response = await axios.get(todoDataUrl);
  return response.data;
}
