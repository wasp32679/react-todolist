import trash from '../assets/trash-bin.png';
import './TodoItem.css';
import { useState } from 'react';
import Editable from '../components/Editable';
import { useStore } from '../store';

interface TodoItemProps {
  title: string;
  content?: string;
  date?: string;
  isDone: boolean;
  todoId: string;
  errorMsg: unknown;
}

export default function TodoItem({
  title,
  content,
  date,
  isDone,
  todoId,
}: TodoItemProps) {
  const editTodo = useStore((state) => state.editTodo);
  const deleteTodo = useStore((state) => state.deleteTodo);

  const [titleValue, setTitleValue] = useState(title);
  const [descValue, setDescValue] = useState(content);
  const [doneValue, setDoneValue] = useState(isDone);
  const [dueDateValue, setDueDateValue] = useState(date);

  return (
    <li className="border shadow todo-item">
      <input
        type="checkbox"
        checked={doneValue}
        onChange={(e) => {
          const newValue = e.target.checked;
          setDoneValue(newValue);
          editTodo(todoId, { done: newValue });
        }}
      />

      <div className="title-desc">
        <Editable text={titleValue} canClose={titleValue.trim() !== ''}>
          <input
            autoFocus
            type="text"
            value={titleValue}
            onChange={(e) => {
              setTitleValue(e.target.value);
            }}
            onBlur={() => editTodo(todoId, { title: titleValue })}
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
            onBlur={() => editTodo(todoId, { content: descValue })}
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
          onBlur={() =>
            editTodo(todoId, {
              due_date: dueDateValue === '' ? null : dueDateValue,
            })
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.currentTarget.blur();
            }
          }}
        ></input>
      </Editable>

      <button className="item-btn" onClick={() => deleteTodo(todoId)}>
        <img src={trash} alt="delete" className="item-img" />
      </button>
    </li>
  );
}
