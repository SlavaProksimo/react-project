import TodoItem from "../todo-item/TodoItem";

const NewTasks = () => {
  return (
    <ul className="todo-list__ul">
      <TodoItem title="Проснуться" />
      <hr />
      <TodoItem title="Не уснуть" />
      <hr />
      <TodoItem title="Купить молоко" />
    </ul>
  );
};
export default NewTasks;
