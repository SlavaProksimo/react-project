import { useState } from "react";
import { ButtonAddTodo } from "@/shared/ui/ButtonAddTodo";
import NewTasks from "@/entities/task/ui/NewTasks";
import Search from "@/features/search/ui/search";
import NotFound from "@/shared/ui/NotFound/NotFound";
import { useTodos } from "@/entities/task/model/use-todos";
import ModalEditTask from "@/features/edit-todo/ui/ModalEditTask";
import TodoAdd from "@/features/add-todo/ui/TodoAdd.jsx";
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
    setTasks,
    searchTask,
    setFilter,
    addNewTask,
    updateTask,
    handleInputChange,
    showNotFound,
    finalTodos,
    handleEditClick,
    onClickDelete,
    handleCheckboxChange,
    disappearingTaskId,
    appearingTaskId,
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
              onEditClick={handleEditClick}
              onClickDelete={onClickDelete}
              handleCheckboxChange={handleCheckboxChange}
              disappearingTaskId={disappearingTaskId}
              appearingTaskId={appearingTaskId}
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
