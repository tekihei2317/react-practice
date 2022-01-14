import { useRef } from "react";
import { useTodo } from "../hooks/use-todo";

const TodoTitle = ({ title, as }) => {
  if (as === "h1") return <h1>{title}</h1>;
  if (as === "h2") return <h2>{title}</h2>;
  return <p>{title}</p>;
};

const TodoItem = ({ todo, toggleTodoListItemStatus, deleteTodoListItem }) => {
  const handleToggleTodoListItemStatus = () => toggleTodoListItemStatus(todo.id, todo.done);
  const handleDeleteTodoListItem = () => deleteTodoListItem(todo.id);

  return (
    <li>
      {todo.content}
      <button onClick={handleToggleTodoListItemStatus}>{todo.done ? "未完了リストへ" : "完了リストへ"}</button>
      <button onClick={handleDeleteTodoListItem}>削除</button>
    </li>
  );
};

const TodoList = ({ todoList, toggleTodoListItemStatus, deleteTodoListItem }) => {
  return (
    <ul>
      {todoList.map((todo) => (
        <TodoItem
          todo={todo}
          key={todo.id}
          toggleTodoListItemStatus={toggleTodoListItemStatus}
          deleteTodoListItem={deleteTodoListItem}
        />
      ))}
    </ul>
  );
};

const TodoAdd = ({ inputElement, handleAddTodoListItem }) => {
  return (
    <>
      <textarea ref={inputElement} />
      <button onClick={handleAddTodoListItem}>+ TODOを追加</button>
    </>
  );
};

function App() {
  const { todoList, addTodoListItem, toggleTodoListItemStatus, deleteTodoListItem } = useTodo();
  const incompletedList = todoList.filter((todo) => !todo.done);
  const completedList = todoList.filter((todo) => todo.done);

  const inputElement = useRef(null);
  const handleAddTodoListItem = () => {
    if (inputElement.current.value === "") return;

    addTodoListItem(inputElement.current.value);
    inputElement.current.value = "";
  };

  console.log("TODOリスト:", todoList);

  return (
    <>
      <h1>TODO進捗管理</h1>
      <TodoTitle title="TODOタイトル管理" as="h1" />

      <TodoAdd inputElement={inputElement} handleAddTodoListItem={handleAddTodoListItem} />

      <TodoTitle title="未完了TODOリスト" as="h2" />
      <TodoList
        todoList={incompletedList}
        toggleTodoListItemStatus={toggleTodoListItemStatus}
        deleteTodoListItem={deleteTodoListItem}
      />

      <TodoTitle title="完了TODOリスト" as="h2" />
      <TodoList
        todoList={completedList}
        toggleTodoListItemStatus={toggleTodoListItemStatus}
        deleteTodoListItem={deleteTodoListItem}
      />
    </>
  );
}

export default App;
