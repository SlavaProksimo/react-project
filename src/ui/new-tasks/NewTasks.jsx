import TodoItem from "../todo-item/TodoItem";

const NewTasks = () => {
  return (
    <ul className="todo-list__ul">
      <TodoItem />
      <hr />
      <TodoItem />
      <hr />
      <TodoItem />
    </ul>
  );
};
export default NewTasks;
