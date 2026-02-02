import trash from '../assets/trash-bin.png';
import './TodoItem.css';
import type { ReadTodo } from '../types/todo';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { deleteTodoFromApi, editTodoInApi } from '../api/api';
import Editable from '../components/Editable';

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

  const [titleValue, setTitleValue] = useState(title);
  const [descValue, setDescValue] = useState(content);
  const [doneValue, setDoneValue] = useState(isDone);
  const [dueDateValue, setDueDateValue] = useState(date);

  const handleToggle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    setDoneValue(newValue);
    await editTodoInApi(todoId, { done: newValue });
    setTodos((prevTodos) =>
      prevTodos.map((t) => {
        if (t.id === todoId) {
          return { ...t, ...{ done: newValue } };
        } else {
          return t;
        }
      }),
    );
  };

  const handleBlur = async (updates: {
    title?: string;
    content?: string;
    due_date?: string;
    done?: boolean;
  }) => {
    await editTodoInApi(todoId, updates);
    setTodos((prevTodos) =>
      prevTodos.map((t) => {
        if (t.id === todoId) {
          return { ...t, ...updates };
        } else {
          return t;
        }
      }),
    );
  };

  return (
    <li className="border shadow todo-item">
      <input type="checkbox" checked={doneValue} onChange={handleToggle} />

      <div className="title-desc">
        <Editable text={titleValue} canClose={titleValue.trim() !== ''}>
          <input
            autoFocus
            type="text"
            value={titleValue}
            onChange={(e) => {
              setTitleValue(e.target.value);
            }}
            onBlur={() => handleBlur({ title: titleValue })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.currentTarget.blur();
              }
            }}
          ></input>
        </Editable>
        <Editable
          text={descValue}
          className="description"
          placeholder="Click to add description"
        >
          <textarea
            autoFocus
            onBlur={() => handleBlur({ content: descValue })}
            value={descValue ?? ''}
            onChange={(e) => setDescValue(e.target.value)}
            onFocus={(e) => {
              const val = e.target.value;
              e.target.setSelectionRange(val.length, val.length);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.currentTarget.blur();
              }
            }}
          ></textarea>
        </Editable>
      </div>

      <Editable text={dueDateValue} placeholder="Click to add due date">
        <input
          autoFocus
          type="date"
          value={dueDateValue ?? ''}
          onChange={(e) => setDueDateValue(e.target.value)}
          onBlur={() => handleBlur({ due_date: dueDateValue })}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.currentTarget.blur();
            }
          }}
        ></input>
      </Editable>

      <button className="item-btn" onClick={deleteTodo}>
        <img src={trash} alt="delete" className="item-img" />
      </button>
    </li>
  );
}
