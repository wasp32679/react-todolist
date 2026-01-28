import Button from '../components/Button';
import './OpenAddTodoFormButton.css';
import TodoForm from '../form/TodoForm';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Overlay from '../components/Overlay';
import type { OpenAddTodoFormBtnProps } from '../types/todo';

export default function OpenAddTodoFormBtn({
  setTodos,
  todos,
}: OpenAddTodoFormBtnProps) {
  const [isOpen, setisOpen] = useState(false);

  return (
    <>
      <Button
        className="border add-btn small-el shadow"
        title="Add Task"
        onClick={() => setisOpen(true)}
      />

      {isOpen &&
        createPortal(
          <div>
            <Overlay />
            <div className="form-wrapper top-index border shadow">
              <TodoForm
                setIsOpen={setisOpen}
                setTodos={setTodos}
                todos={todos}
              />
              <button
                className="border close-form-btn"
                onClick={() => setisOpen(false)}
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
