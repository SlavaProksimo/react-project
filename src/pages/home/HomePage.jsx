import { useState } from "react";
import ButtonAddTodo from "@/ui/button/ButtonAddTodo";
import TodoAdd from "@/ui/todo-add/todoAdd";
import NewTasks from "ui/new-tasks/NewTasks";
import Search from "ui/search/Search";
import NotFound from "@/ui/not-found/NotFound";
import { useTodos } from "@/hooks/use-todos";
import ModalEditTask from "@/ui/edit-add/ModalEditTask";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null); // Для редактирование задачи
  //Закрыть модалку
  const closeModal = () => {
    setOpen(false);
    setNewTaskTitle("");
    setTaskToEdit(null);
  };
  const {
    tasks,
    setTasks,
    newTaskTitle,
    setNewTaskTitle,
    searchTask,
    setFilter,
    addNewTask,
    updateTask,
    handleInputChange,
    showNotFound,
    finalTodos,
  } = useTodos({ closeModal, taskToEdit });

  return (
    <div className="general-wrapper" onMouseDown={closeModal}>
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
              setNewTaskTitle={setNewTaskTitle}
              newTaskTitle={newTaskTitle}
              setTaskToEdit={setTaskToEdit}
            />
          </div>
          <ButtonAddTodo open={open} setOpen={setOpen} />
        </div>
      </div>
      {open && taskToEdit === null && (
        <TodoAdd
          close={closeModal}
          newTaskTitle={newTaskTitle}
          setNewTaskTitle={setNewTaskTitle}
          onApply={addNewTask}
        />
      )}
      {open && taskToEdit !== null && (
        <ModalEditTask
          close={closeModal}
          newTaskTitle={newTaskTitle}
          setNewTaskTitle={setNewTaskTitle}
          onApply={updateTask}
        />
      )}
    </div>
  );
};
export default HomePage;
