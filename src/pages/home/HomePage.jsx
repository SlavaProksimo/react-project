import { useContext, useRef, useState } from "react";
import ButtonAddTodo from "@/ui/button/ButtonAddTodo";
import TodoAdd from "@/ui/todo-add/todoAdd";
import NewTasks from "ui/new-tasks/NewTasks";
import Search from "ui/search/Search";
import NotFound from "@/ui/not-found/NotFound";
import { useTodos } from "@/hooks/use-todos";
import ModalEditTask from "@/ui/edit-add/ModalEditTask";

const HomePage = () => {
  const [open, setOpen] = useState(false);

  //Закрыть модалку
  const closeModal = () => {
    setOpen(false);
    editTitleRef.current = "";
  };

  const {
    tasks,
    setTasks,
    searchTask,
    setFilter,
    addNewTask,
    updateTask,
    handleInputChange,
    showNotFound,
    finalTodos,
    handleEditClick,
    editTitleRef,
    currentTaskId,
  } = useTodos({ closeModal, open, setOpen });

  return (
    <div className="general-wrapper">
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
              onEditClick={handleEditClick}
            />
          </div>
          <ButtonAddTodo open={open} setOpen={setOpen} />
        </div>
      </div>
      {open && currentTaskId === null && (
        <TodoAdd close={closeModal} onApply={addNewTask} open={open} />
      )}
      {open && currentTaskId !== null && (
        <ModalEditTask
          close={closeModal}
          onApply={updateTask}
          open={open}
          initialValue={editTitleRef.current}
        />
      )}
    </div>
  );
};
export default HomePage;
