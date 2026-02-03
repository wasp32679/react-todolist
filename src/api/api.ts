import type { ReadTodo } from '../types/todo';

const url = 'https://api.todos.in.jt-lab.ch/todos';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchTodosFromApi(): Promise<ReadTodo[]> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Error fetching todos');
  }

  const data: ReadTodo[] = await response.json();
  return data;
}

export async function addTodoToApi(data: FormData): Promise<ReadTodo> {
  const title = data.get('title');
  const description = data.get('description');
  const due_date = data.get('due_date');

  await delay(0);

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        title: title,
        content: description,
        due_date: due_date ? due_date : null,
        done: false,
      }),
    });

    if (!resp.ok) {
      throw new Error(`Impossible to create the task: ${resp.status}`);
    }

    const data: ReadTodo[] = await resp.json();
    const newTask = data[0];

    return newTask;
  } catch (error) {
    console.error(error);
    throw new Error(`${error}`);
  }
}

export async function deleteTodoFromApi(todoId: string) {
  try {
    const resp = await fetch(`${url}?id=eq.${todoId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });
    if (!resp.ok) {
      throw new Error(`Failed to delete task: ${resp.status}`);
    }
  } catch (error) {
    console.error(error);
    throw new Error(` ${error}`);
  }
}

export async function editTodoInApi(
  todoId: string,
  updates: {
    title?: string;
    content?: string;
    due_date?: string;
    done?: boolean;
  },
) {
  try {
    const resp = await fetch(`${url}?id=eq.${todoId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(updates),
    });
    if (!resp.ok) {
      throw new Error(`Failed to edit task ${resp.status}`);
    }

    const data: ReadTodo[] = await resp.json();
    const updatedTodo = data[0];

    return updatedTodo;
  } catch (error) {
    console.error(`${error}`);
    throw new Error(`${error}`);
  }
}
