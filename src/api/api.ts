import type { Todo } from '../types/todo';

const url = 'https://api.todos.in.jt-lab.ch/todos';

export async function fetchTodosFromApi(): Promise<Todo[]> {

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération du Todo');
  }

  const data: Todo[] = await response.json();
  return data;
}
