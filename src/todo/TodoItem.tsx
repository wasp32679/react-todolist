import trash from '../assets/trash-bin.png';
import './TodoItem.css';
import type { ReadTodo } from '../types/todo';
import type { Dispatch, SetStateAction } from 'react';
import { deleteTodoFromApi } from '../api/api';

interface TodoItemProps {
  title: string;
  content?: string;
  date?: string;
  isDone: boolean;
  setTodos: Dispatch<SetStateAction<ReadTodo[]>>;
  todoId: string;
}

export default function TodoItem({
  title,
  content,
  date,
  isDone,
  todoId,
  setTodos,
}: TodoItemProps) {
  const deleteTodo = async () => {
    try {
      await deleteTodoFromApi(todoId);
      setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todoId));
    } catch (error) {
      console.error('Error while deleting todo:', error);
      alert('Failed to delete todo. Please try again.');
    }
  };

  return (
    <li className="border shadow">
      <div className="todo-content">
        <input type="checkbox" checked={isDone} />
        <p>{title}</p>
        <p>{content}</p>
        <span className="date">{date}</span>
      </div>

      <div className="todo-actions">
        <button className="item-btn" onClick={deleteTodo}>
          <img src={trash} alt="delete" className="item-img" />
        </button>
      </div>
    </li>
  );
}
