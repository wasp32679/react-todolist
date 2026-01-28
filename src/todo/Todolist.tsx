import './Todolist.css';
import TodoItem from './TodoItem';
import type { TodoListProps } from '../types/todo';

function TodoDisplay({ todos }: TodoListProps) {
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

export default function Todolist({ todos }: TodoListProps) {
  return (
    <>
      <TodoDisplay todos={todos} />
    </>
  );
}
