import trash from '../assets/trash-bin.png';
import './TodoItem.css';

interface TodoItemProps {
  title: string;
  content?: string;
  date?: string;
  isDone: boolean;
}

export default function TodoItem({
  title,
  content,
  date,
  isDone,
}: TodoItemProps) {
  return (
    <li className="border shadow">
      <div className="todo-content">
        <input type="checkbox" checked={isDone} />
        <p>{title}</p>
        <p>{content}</p>
        <span className="date">{date}</span>
      </div>

      <div className="todo-actions">
        <button className="item-btn">
          <img src={trash} alt="delete" className="item-img" />
        </button>
      </div>
    </li>
  );
}
