import React, { useState, useEffect } from "react";
import { fetchTodos } from "../services/fetch-todos";

function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const todoList = await fetchTodos();
      setTodoList(todoList);
    };
    fetchData();
  }, []);

  const incompletedList = todoList.filter((todo) => !todo.done);
  const completedList = todoList.filter((todo) => todo.done);

  return (
    <>
      <h1>TODO進捗管理</h1>

      <textarea />
      <button>+ TODOを追加</button>

      <h2>未完了TODOリスト</h2>
      <ul>
        {incompletedList.map((todo) => (
          <li key={todo.id}>
            {todo.content}
            <button>{todo.done ? "未完了リストへ" : "完了リストへ"}</button>
            <button>削除</button>
          </li>
        ))}
      </ul>

      <h2>完了TODOリスト</h2>
      <ul>
        {completedList.map((todo) => (
          <li key={todo.id}>
            {todo.content}
            <button>{todo.done ? "未完了リストへ" : "完了リストへ"}</button>
            <button>削除</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
