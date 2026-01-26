import './Todolist.css';
import { Suspense, use } from 'react';
import { fetchTodosFromApi } from '../api/api';
import TodoItem from './TodoItem';

const todoPromise = fetchTodosFromApi();

function TodoDisplay() {
  const todos = use(todoPromise);
  return (
    <>
      <ul>
        {todos.map((t) => (
          <TodoItem
            key={t.id}
            title={t.title}
            content={t.content}
            date={t.due_date}
            isDone={t.done}
          />
        ))}
      </ul>
    </>
  );
}

export default function Todolist() {
  return (
    <>
      <Suspense fallback={<div className="spinner"></div>}>
        <TodoDisplay />
      </Suspense>
    </>
  );
}
