import tasksAPI from "@/entities/task/api/tasksAPI";
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
  // для хранения id исчезающей задачи(для анимации)
  const [disappearingTaskId, setDisappearingTaskId] = useState(null);
  // для хранения id новой задачи(для анимации)
  const [appearingTaskId, setAppearingTaskId] = useState(null);

  //Сохраняем тудушки на сервере, после перезагрузки страницы
  useEffect(() => {
    tasksAPI.getAll().then(setTasks);
  }, []);

  const searchedTodos = useMemo(() => {
    if (!searchTask.trim()) return tasks;
    return tasks.filter((task) =>
      task.title?.toLowerCase().includes(searchTask.toLowerCase()),
    );
  }, [searchTask, tasks]);

  //Фильтрация для Select
  const filteredBySelect = useMemo(() => {
    switch (filter) {
      case "Complete":
        return searchedTodos.filter((task) => task.isDone === true);
      case "Incomplete":
        return searchedTodos.filter((task) => task.isDone === false);
      case "All":
      default:
        return searchedTodos;
    }
  }, [filter, searchedTodos]);

  //Если задач нету или не найдена , то показываем img
  const showNotFound = filteredBySelect.length === 0;

  // Добавление задачи
  const addNewTask = useCallback((title) => {
    if (title.trim().length > 0) {
      const newTask = {
        title: title.trim().toLowerCase(),
        isDone: false,
      };
      tasksAPI.add(newTask).then((addedTask) => {
        setTasks((prev) => [...prev, addedTask]);
        closeAddModal();
        setAppearingTaskId(addedTask.id);
        setTimeout(() => {
          setAppearingTaskId(null);
        }, 400);
      });
    }
  }, []);
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

  //Удалить задачу
  const onClickDelete = useCallback(
    (id) => {
      setDisappearingTaskId(id);
      tasksAPI.delete(id).then(() => {
        setTimeout(() => {
          setTasks((prev) => prev.filter((t) => t.id !== id));
          setDisappearingTaskId(null);
        }, 400);
      });
    },
    [setTasks],
  );
  //отмечаем галочкой
  const handleCheckboxChange = useCallback(
    (event, id) => {
      const newIsDoneValue = event.target.checked;

      tasksAPI.toggleComplete(id, newIsDoneValue).then(() => {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === id ? { ...task, isDone: newIsDoneValue } : task,
          ),
        );
      });
    },
    [setTasks],
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
    onClickDelete,
    handleCheckboxChange,
    disappearingTaskId,
    appearingTaskId,
  };
};
