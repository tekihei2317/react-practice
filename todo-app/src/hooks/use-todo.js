import { useState, useEffect } from "react";
import { ulid } from "ulid";

import * as todoApi from "../apis/todos";

export const useTodo = () => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    todoApi.fetchTodos().then((todos) => {
      // ここはtodos.reverse()では駄目？
      setTodoList([...todos].reverse());
    });
  }, []);

  const toggleTodoListItemStatus = (id, done) => {
    const todoItem = todoList.find((item) => item.id === id);
    const newTodoItem = { ...todoItem, done: !done };

    todoApi.updateTodo(id, newTodoItem).then((updatedTodo) => {
      const newTodoList = todoList.map((item) => (item.id !== updatedTodo.id ? item : updatedTodo));
      setTodoList(newTodoList);
    });
  };

  const addTodoListItem = (todoContent) => {
    const newTodoItem = {
      content: todoContent,
      id: ulid(),
      done: false,
    };

    return todoApi.addTodo(newTodoItem).then((addedTodo) => {
      setTodoList([addedTodo, ...todoList]);
    });
  };

  const deleteTodoListItem = (id) => {
    todoApi.deleteTodo(id).then((deletedTodoId) => {
      const newTodoList = todoList.filter((todo) => todo.id !== deletedTodoId);
      setTodoList(newTodoList);
    });
  };

  return {
    todoList,
    toggleTodoListItemStatus,
    addTodoListItem,
    deleteTodoListItem,
  };
};
