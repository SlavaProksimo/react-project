import { useCallback, useEffect, useMemo, useState } from "react";
const getDataFromLocalStorage = () => {
  try {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [];
  } catch (error) {
    console.error("Ошибка LocalStorage");
    return [];
  }
};

export const useTodos = ({
  closeAddModal,
  closeEditModal,
  setIsEditModalOpen,
  setEditingTask,
}) => {
  //Сохраняем тудушки после перезагрузки страницы
  const [tasks, setTasks] = useState(getDataFromLocalStorage());

  const [searchTask, setSearchTask] = useState("");
  const [filter, setFilter] = useState("All");

  //Сохраняем тудушки после перезагрузки страницы
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //Проверка для кнопки Apply, чтобы закрывать модалку только если было что-то введено
  const addNewTask = useCallback(
    (title) => {
      if (title.trim().length > 0) {
        const newTask = {
          id: crypto.randomUUID(),
          title: title.trim(),
          isDone: false,
        };
        setTasks((prev) => [...prev, newTask]);
        closeAddModal();
      }
    },
    [closeAddModal],
  );
  // Редактируем задачу
  const updateTask = useCallback(
    (taskId, newTitle) => {
      if (newTitle?.trim().length > 0) {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === taskId ? { ...task, title: newTitle.trim() } : task,
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
