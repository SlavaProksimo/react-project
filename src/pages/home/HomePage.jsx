import { useState } from "react";
import ButtonAddTodo from "@/ui/button/ButtonAddTodo";
import NewTasks from "@/ui/new-tasks/NewTasks";
import Search from "@/ui/search/Search";
import NotFound from "@/ui/not-found/NotFound";
import { useTodos } from "@/hooks/use-todos";
import ModalEditTask from "@/ui/edit-add/ModalEditTask";
import TodoAdd from "@/ui/todo-add/TodoAdd";
const HomePage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  //Закрыть модалку
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTask(null);
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
  } = useTodos({
    closeAddModal,
    closeEditModal,
    setIsAddModalOpen,
    setIsEditModalOpen,
    setEditingTask,
  });

  return (
    <div className="general-wrapper">
      <div className="container">
        <div className="todo">
          <h1 className="todo-title">TODO LIST</h1>

          <Search
            value={searchTask}
            onInputChange={handleInputChange}
            setFilter={setFilter}
          />
          {showNotFound && <NotFound />}
          <div className="todo-list">
            <NewTasks
              tasks={finalTodos}
              setTasks={setTasks}
              setIsAddModalOpen={setIsAddModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
              onEditClick={handleEditClick}
            />
          </div>
          <ButtonAddTodo setIsAddModalOpen={setIsAddModalOpen} />
        </div>
      </div>

      {isAddModalOpen && (
        <TodoAdd
          close={closeAddModal}
          onApply={addNewTask}
          open={isAddModalOpen}
        />
      )}
      {isEditModalOpen && editingTask && (
        <ModalEditTask
          close={closeEditModal}
          onApply={(newTitle) => updateTask(editingTask.id, newTitle)}
          open={isEditModalOpen}
          initialValue={editingTask.title}
        />
      )}
    </div>
  );
};
export default HomePage;
