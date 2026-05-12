import TodoItem from "../todo-item/TodoItem";
import styles from "../todo-item/TodoItem.module.scss";
import { Flipper, Flipped } from "react-flip-toolkit";
const NewTasks = ({
  tasks,
  setTasks,
  onEditClick,
  onClickDelete,
  handleCheckboxChange,
  disappearingTaskId,
  appearingTaskId,
}) => {
  return (
    <Flipper flipKey={tasks.length}>
      <ul className="todo-list__ul">
        {tasks.map((task) => (
          <Flipped key={task.id} flipId={task.id}>
            <div key={task.id}>
              <TodoItem
                title={task.title}
                isDone={task.isDone}
                git
                id={task.id}
                setTasks={setTasks}
                onEditClick={onEditClick}
                onClickDelete={() => onClickDelete(task.id)}
                handleCheckboxChange={handleCheckboxChange}
                disappearingTaskId={disappearingTaskId}
                appearingTaskId={appearingTaskId}
              />
              <hr
                className={`
                  ${disappearingTaskId === task.id ? styles.isDisappearing : ""}
                  ${appearingTaskId === task.id ? styles.isAppearing : ""}`}
              />
            </div>
          </Flipped>
        ))}
      </ul>
    </Flipper>
  );
};
export default NewTasks;
