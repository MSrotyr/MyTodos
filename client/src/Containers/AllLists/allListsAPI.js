const baseUrl = 'http://localhost:3001';

export async function fetchAllLists(userId) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists`);
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function addList(userId, title) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function updateListsOrderInDb(userId, lists) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lists }),
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function updateTasksOrderInDb(userId, listId, sections) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists/${listId}/order`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sections }),
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function deleteList(userId, listId) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists/${listId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function addSection(userId, { title, listId }) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists/${listId}/sections/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function deleteSection(userId, { listId, sectionId }) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists/${listId}/sections/${sectionId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function addNewTask(userId, { title, listId, sectionId }) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists/${listId}/sections/${sectionId}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function addExistingTask(userId, taskId, listId, sectionId) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/lists/${listId}/sections/${sectionId}/tasks`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId }),
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}

export async function updateTask(userId, { taskId, payload }) {
  try {
    const res = await fetch(`${baseUrl}/users/${userId}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return await res.json();
  } catch (error) {
    console.error(error); // eslint-disable-line
    return null;
  }
}
