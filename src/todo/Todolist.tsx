import './Todolist.css';
import TodoItem from './TodoItem';
import type { TodoListProps } from '../types/todo';
import ErrorFallback from '../components/ErrorsManagment';
import { useState } from 'react';

function TodoDisplay({ todos, setTodos }: TodoListProps) {
  const [errorMsg, setErrorMsg] = useState<unknown>(null);
  function onReset() {
    setErrorMsg(null);
  }

  return (
    <>
      {errorMsg && (
        <ErrorFallback error={errorMsg} resetErrorBoundary={onReset} />
      )}
      <ul>
        {todos.map((t) => (
          <TodoItem
            key={t.id}
            title={t.title}
            content={t.content}
            date={t.due_date}
            isDone={t.done}
            setTodos={setTodos}
            todoId={t.id}
            errorMsg={errorMsg}
            setErrorMsg={setErrorMsg}
          />
        ))}
      </ul>
    </>
  );
}

export default function Todolist({ todos, setTodos }: TodoListProps) {
  return (
    <>
      <TodoDisplay todos={todos} setTodos={setTodos} />
    </>
  );
}
