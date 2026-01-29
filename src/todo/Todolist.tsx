import './Todolist.css';
import TodoItem from './TodoItem';
import type { TodoListProps } from '../types/todo';

function TodoDisplay({ todos, setTodos }: TodoListProps) {
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
            setTodos={setTodos}
            todoId={t.id}
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
