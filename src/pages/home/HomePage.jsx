import { useContext, useState } from "react";
import ButtonAddTodo from "@/ui/button/ButtonAddTodo";
import TodoAdd from "@/ui/todo-add/todoAdd";
import NewTasks from "ui/new-tasks/NewTasks";
import Search from "ui/search/Search";
import NotFound from "@/ui/not-found/NotFound";
import { useTodos } from "@/hooks/use-todos";
import ModalEditTask from "@/ui/edit-add/ModalEditTask";
import clsx from "clsx";
import { ThemeContext } from "@/context/themeContext";

const HomePage = () => {
  const [open, setOpen] = useState(false);

  //Закрыть модалку
  const closeModal = () => {
    setOpen(false);
  };

  const {
    tasks,
    setTasks,
    newTaskTitle,
    searchTask,
    setFilter,
    addNewTask,
    updateTask,
    handleInputChange,
    showNotFound,
    finalTodos,
    taskToEdit,
  } = useTodos({ closeModal, open });

  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={clsx("general-wrapper", {
        dark: theme === true,
        light: theme === false,
      })}
      onMouseDown={closeModal}
    >
      <div className="container">
        <div className="todo">
          <h1 className="todo-title">TODO LIST</h1>

          <Search
            value={searchTask}
            onInputChange={handleInputChange}
            tasks={tasks}
            setFilter={setFilter}
          />
          {showNotFound && <NotFound />}
          <div className="todo-list">
            <NewTasks
              tasks={finalTodos}
              setTasks={setTasks}
              open={open}
              setOpen={setOpen}
              newTaskTitle={newTaskTitle}
              taskToEdit={taskToEdit}
            />
          </div>
          <ButtonAddTodo open={open} setOpen={setOpen} />
        </div>
      </div>
      {open && taskToEdit.current === null && (
        <TodoAdd
          close={closeModal}
          newTaskTitle={newTaskTitle}
          onApply={addNewTask}
          open={open}
        />
      )}
      {open && taskToEdit.current !== null && (
        <ModalEditTask
          close={closeModal}
          newTaskTitle={newTaskTitle}
          onApply={updateTask}
          open={open}
        />
      )}
    </div>
  );
};
export default HomePage;
