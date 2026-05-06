import tasksAPI from "@/api/tasksAPI";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useTodos = ({
  closeAddModal,
  closeEditModal,
  setIsEditModalOpen,
  setEditingTask,
}) => {
  //Сохраняем тудушки после перезагрузки страницы
  const [tasks, setTasks] = useState([]);

  const [searchTask, setSearchTask] = useState("");
  const [filter, setFilter] = useState("All");

  //Сохраняем тудушки на сервере, после перезагрузки страницы
  useEffect(() => {
    tasksAPI.getAll().then(setTasks);
  }, []);

  // Добавление задачи
  const addNewTask = useCallback(
    (title) => {
      if (title.trim().length > 0) {
        const newTask = {
          title: title.trim(),
          isDone: false,
        };
        tasksAPI.add(newTask).then((addedTask) => {
          setTasks((prev) => [...prev, addedTask]);
          closeAddModal();
        });
      }
    },
    [closeAddModal],
  );
  // Редактируем задачу
  const updateTask = useCallback(
    async (taskId, newTitle) => {
      if (newTitle?.trim().length > 0) {
        // сохраняем задачу после перезагрузки стр.
        const updatedTasks = await tasksAPI.edit(taskId, newTitle.trim());
        setTasks((prev) =>
          prev.map((task) =>
            task.id === taskId ? { ...task, title: updatedTasks.title } : task,
          ),
        );
        closeEditModal();
      }
    },
    [closeEditModal],
  );
  // Обработчик клика на редактирование
  const handleEditClick = useCallback(
    (taskId, taskTitle) => {
      setEditingTask({ id: taskId, title: taskTitle });
      setIsEditModalOpen(true);
    },
    [setEditingTask, setIsEditModalOpen],
  );
  const handleInputChange = (value) => {
    setSearchTask(value);
  };
  //поиск задач
  const filteredTodos = useMemo(() => {
    return searchTask
      ? tasks.filter((task) => task.title?.includes(searchTask.toLowerCase()))
      : tasks;
  }, [searchTask, tasks]);

  //Если задач нету или не найдена , то показываем img
  const showNotFound = filteredTodos.length === 0;
  //Фильтрация для Select
  const filteredBySelect = useMemo(() => {
    switch (filter) {
      case "All":
      default:
        return filteredTodos;
      case "Complete":
        return filteredTodos.filter((task) => task.isDone === true);
      case "Incomplete":
        return filteredTodos.filter((task) => task.isDone === false);
    }
  }, [filter, filteredTodos]);

  return {
    tasks,
    setTasks,
    searchTask,
    setFilter,
    addNewTask,
    updateTask,
    handleInputChange,
    showNotFound,
    finalTodos: filteredBySelect,
    handleEditClick,
  };
};
