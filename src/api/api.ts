import type {  ReadTodo } from '../types/todo';

const url = 'https://api.todos.in.jt-lab.ch/todos';
const arrOfTask: ReadTodo[] = []

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchTodosFromApi(): Promise<ReadTodo[]> {

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Error fetching todos');
  }

  const data: ReadTodo[] = await response.json();
  return data;
}

export async function addTodoToApi(data: FormData): Promise<ReadTodo> {
  const title = data.get("title")
  const descritption = data.get("description")
  const due_date = data.get("due_date")

  await delay(500)

    try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        title: title,
        content: descritption,
        due_date: due_date ? due_date : null, 
        done: false,
      }),
    })

    if (!resp.ok) {
      throw new Error(`HTTP Error Status: ${resp.status}`)
      
    }

    const Data: ReadTodo[] = await resp.json()
    const newTask = Data[0]

    arrOfTask.push(newTask)

    return newTask
  } catch (error) {
    console.error(error)
    throw new Error("impossible to create the todo")
  }
}

