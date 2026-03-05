import { useState } from "react";
export const useTodos = ({ closeModal, taskToEdit }) => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchTask, setSearchTask] = useState("");
  const [filter, setFilter] = useState("All");

  //Проверка для кнопки Apply, чтобы закрывать модалку только если было что-то введено
  const addNewTask = () => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        title: newTaskTitle.trim(),
        isDone: false,
      };
      setTasks((prev) => [...prev, newTask]);
      setNewTaskTitle("");
      closeModal();
    }
  };
  // Редактируем задачу
  const updateTask = () => {
    if (taskToEdit !== null) {
      const updatedTasks = tasks.map((task, index) => {
        if (index === taskToEdit && newTaskTitle.trim().length > 0) {
          return {
            ...task,
            title: newTaskTitle,
          };
        }
        return task;
      });
      setTasks(updatedTasks);
      closeModal();
    }
  };
  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTask(value);
  };
  //поиск задач
  const filteredTodos = searchTask
    ? tasks.filter((task) => task.title?.includes(searchTask.toLowerCase()))
    : tasks;

  //Если задач нету или не найдена , то показываем img
  const showNotFound = filteredTodos.length === 0;
  //Фильтрация для Select
  const filteredBySelect = () => {
    switch (filter) {
      case "All":
      default:
        return filteredTodos;
      case "Complete":
        return filteredTodos.filter((task) => task.isDone === true);
      case "Incomplete":
        return filteredTodos.filter((task) => task.isDone === false);
    }
  };

  const finalTodos = filteredBySelect();
  return {
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
  };
};
