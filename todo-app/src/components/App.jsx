import { useRef } from "react";
import { useTodo } from "../hooks/use-todo";
import { TodoTitle } from "./TodoTitle";
import { TodoAdd } from "./TodoAdd";
import { TodoList } from "./TodoList";

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
