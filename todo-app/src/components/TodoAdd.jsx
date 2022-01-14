export const TodoAdd = ({ inputElement, handleAddTodoListItem }) => {
  return (
    <>
      <textarea ref={inputElement} />
      <button onClick={handleAddTodoListItem}>+ TODOを追加</button>
    </>
  );
};
