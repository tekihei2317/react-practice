import axios from "axios";

const todoDataUrl = "http://localhost:3100/todos";

export const fetchTodos = async () => {
  const response = await axios.get(todoDataUrl);
  return response.data;
};

export const addTodo = async (todo) => {
  const response = await axios.post(todoDataUrl, todo);

  return response.data;
};

export const deleteTodo = async (id) => {
  await axios.delete(`${todoDataUrl}/${id}`);

  return id;
};

export const updateTodo = async (id, todo) => {
  const response = await axios.put(`${todoDataUrl}/${id}`, todo);

  return response.data;
};
