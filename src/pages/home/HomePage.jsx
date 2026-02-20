import ButtonAddTodo from "@/ui/button/ButtonAddTodo";
import NewTasks from "ui/new-tasks/NewTasks";
import Search from "ui/search/Search";
const HomePage = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="todo">
          <h1 className="todo-tittle">TODO LIST</h1>
          <Search />
          <div className="todo-list">
            <NewTasks />
          </div>
          <div className="btn btn-todo-add">
            <ButtonAddTodo />
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
