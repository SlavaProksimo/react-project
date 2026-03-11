import { useCallback, useEffect, useMemo, useRef, useState } from "react";
export const useTodos = ({ closeModal, open }) => {
  const [tasks, setTasks] = useState(() => {
    //Сохраняем тудушки после перезагрузки страницы
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [];
  });
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchTask, setSearchTask] = useState("");
  const [filter, setFilter] = useState("All");
  const [taskToEdit, setTaskToEdit] = useState(null); // Для редактирование задачи

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  //Сохраняем тудушки после перезагрузки страницы
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //Проверка для кнопки Apply, чтобы закрывать модалку только если было что-то введено
  const addNewTask = useCallback(() => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        title: newTaskTitle.trim(),
        isDone: false,
      };
      setTasks((prev) => [...prev, newTask]);
      setNewTaskTitle("");
      closeModal();
    }
  }, [newTaskTitle, closeModal]);
  // Редактируем задачу
  const updateTask = useCallback(() => {
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
  }, [taskToEdit, tasks, closeModal, newTaskTitle, taskToEdit]);

  const handleInputChange = useCallback(
    (event) => {
      const value = event.target.value;
      setSearchTask(value);
    },
    [setSearchTask],
  );
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

  const finalTodos = filteredBySelect;

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
    taskToEdit,
    setTaskToEdit,
    inputRef,
  };
};
