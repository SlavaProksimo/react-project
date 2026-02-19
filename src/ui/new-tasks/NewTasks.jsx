import TodoItem from "../todo-item/TodoItem";

const NewTasks = () => {
  return (
    <ul className="todo-list__ul">
      <TodoItem title="Проснуться" isDone={false} id />
      <hr />
      <TodoItem title="Не уснуть" isDone />
      <hr />
      <TodoItem title="Купить молоко" isDone={false} />
    </ul>
  );
};
export default NewTasks;
