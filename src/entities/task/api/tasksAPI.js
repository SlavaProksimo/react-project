// Работа с сервером + localStorage
const BASE_URL = import.meta.env.VITE_API_URL;
const TASKS_URL = `${BASE_URL}/tasks`;

const headers = {
  "Content-Type": "application/json",
};

// Ключ для localStorage
const STORAGE_KEY = "todos";

// для localStorage
const storageAPI = {
  getAll: () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      console.error("Ошибка чтения данных");
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
  },
  save: (tasks) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Не удалось сохранить", error);
    }
  },
  add: (task) => {
    const tasks = storageAPI.getAll();
    const newTask = { ...task, id: Date.now() };
    tasks.push(newTask);
    storageAPI.save(tasks);
    return newTask;
  },
  delete: (id) => {
    const tasks = storageAPI.getAll();
    const filtered = tasks.filter((t) => t.id !== id);
    storageAPI.save(filtered);
  },
  toggleComplete: (id, newIsDoneValue) => {
    const tasks = storageAPI.getAll();
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.isDone = newIsDoneValue;
      storageAPI.save(tasks);
      return task;
    }
    return null;
  },
  edit: (id, newTitle) => {
    const tasks = storageAPI.getAll();
    const task = tasks.find((t) => t.id === id);
    if (task) {
      task.title = newTitle;
      storageAPI.save(tasks);
      return task;
    }
    return null;
  },
};

// Флаг для определения, доступен ли сервер
let isServerAvailable = true;

const checkServer = async () => {
  try {
    const response = await fetch(BASE_URL, { method: "HEAD", mode: "cors" });
    isServerAvailable = response.ok;
  } catch {
    isServerAvailable = false;
  }
  return isServerAvailable;
};

const tasksAPI = {
  // Получаем все задачи
  getAll: async () => {
    await checkServer();
    if (isServerAvailable) {
      try {
        const response = await fetch(TASKS_URL);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
      } catch {
        return storageAPI.getAll();
      }
    }
    return storageAPI.getAll();
  },

  // Добавление задач
  add: async (task) => {
    await checkServer();
    if (isServerAvailable) {
      try {
        const response = await fetch(TASKS_URL, {
          method: "POST",
          headers,
          body: JSON.stringify(task),
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server error: ${response.status} - ${errorText}`);
        }

        const newTask = await response.json();

        const allTasks = storageAPI.getAll();
        allTasks.push(newTask);
        storageAPI.save(allTasks);

        return newTask;
      } catch {
        return storageAPI.add(task);
      }
    }
    return storageAPI.add(task);
  },

  // Удаление
  delete: async (id) => {
    const serverUp = await checkServer();

    if (serverUp) {
      try {
        const response = await fetch(`${TASKS_URL}/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        storageAPI.delete(id);
      } catch (error) {
        console.error("Delete failed:", error);
        throw error;
      }
    } else {
      storageAPI.delete(id);
    }
  },

  // Изменение состояния таски
  toggleComplete: async (id, newIsDoneValue) => {
    await checkServer();

    if (isServerAvailable) {
      try {
        const response = await fetch(`${TASKS_URL}/${id}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify({ isDone: newIsDoneValue }),
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const updatedTask = await response.json();
        storageAPI.toggleComplete(id, newIsDoneValue);
        return updatedTask;
      } catch {
        return storageAPI.toggleComplete(id, newIsDoneValue);
      }
    }
    return storageAPI.toggleComplete(id, newIsDoneValue);
  },

  // Редактирование таски
  edit: async (id, newTitle) => {
    await checkServer();
    if (isServerAvailable) {
      try {
        const response = await fetch(`${TASKS_URL}/${id}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify({ title: newTitle }),
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const updatedTask = await response.json();
        storageAPI.edit(id, newTitle);
        return updatedTask;
      } catch {
        return storageAPI.edit(id, newTitle);
      }
    }
    return storageAPI.edit(id, newTitle);
  },
};

export default tasksAPI;
