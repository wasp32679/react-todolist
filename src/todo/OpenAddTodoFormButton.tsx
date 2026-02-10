import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ErrorsManagment';
import Overlay from '../components/Overlay';
import TodoForm from '../form/TodoForm';
import './OpenAddTodoFormButton.css';

export default function OpenAddTodoFormBtn() {
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
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Overlay onClick={() => setIsOpen(false)} />
              <div className="form-wrapper form-index border shadow">
                <TodoForm setIsOpen={setIsOpen} />
                <button
                  className="border close-form-btn"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </ErrorBoundary>
          </div>,
          document.body,
        )}
    </>
  );
}
