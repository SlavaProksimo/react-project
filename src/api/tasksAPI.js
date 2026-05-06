// Работа с сервером
const BASE_URL = import.meta.env.VITE_API_URL;
const TASKS_URL = `${BASE_URL}/tasks`;

const headers = {
  "Content-Type": "application/json",
};

const tasksAPI = {
  // Получаем все задачи
  getAll: async () => {
    const response = await fetch(TASKS_URL);
    return response.json();
  },
  // Добавление задач на сервер
  add: async (task) => {
    const response = await fetch(TASKS_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(task),
    });
    return response.json();
  },
  // Удаление
  delete: async (id) => {
    await fetch(`${TASKS_URL}/${id}`, {
      method: "DELETE",
    });
  },
  // изменение состояние таски
  toggleComplete: async (id, newIsDoneValue) => {
    const response = await fetch(`${TASKS_URL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ isDone: newIsDoneValue }),
    });
    return response.json();
  },
  // Редактирование таски
  edit: async (id, newTitle) => {
    const response = await fetch(`${TASKS_URL}/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ title: newTitle }),
    });

    return response.json();
  },
};

export default tasksAPI;
// npm run server
