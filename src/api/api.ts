import type { Todo } from '../types/todo';

const url = 'https://api.todos.in.jt-lab.ch/todos';

export async function fetchTodosFromApi(): Promise<Todo[]> {

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Error fetching todos');
  }

  const data: Todo[] = await response.json();
  return data;
}
