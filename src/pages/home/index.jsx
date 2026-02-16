import Button from "../../ui/button/button";
import Tasks from "../../ui/newTasks/Tasks";
import Search from "../../ui/search/search";
const Index = () =>{
	return(
    <div className="wrapper">
      <div className="container">
        <div className="todo">
          <h1 className="todo-tittle">TODO LIST</h1>
<Search/>
          <div className="todo-list">
            <Tasks />
          </div>
          <div className="btn btn-todo-add">
<Button />
          </div>
        </div>
      </div>
    </div>
	);
};
export default Index;