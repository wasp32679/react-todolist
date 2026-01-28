import './OpenAddTodoFormButton.css';
import TodoForm from '../form/TodoForm';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Overlay from '../components/Overlay';
import type { OpenAddTodoFormBtnProps } from '../types/todo';

export default function OpenAddTodoFormBtn({
  setTodos,
}: OpenAddTodoFormBtnProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="border add-btn small-el shadow"
        onClick={() => setIsOpen(true)}
      >
        Add Task
      </button>

      {isOpen &&
        createPortal(
          <div>
            <Overlay />
            <div className="form-wrapper top-index border shadow">
              <TodoForm setIsOpen={setIsOpen} setTodos={setTodos} />
              <button
                className="border close-form-btn"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
