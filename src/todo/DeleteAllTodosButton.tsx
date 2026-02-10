import { createPortal } from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ErrorsManagment';
import Overlay from '../components/Overlay';
import './DeleteAllTodosButton.css';
import { useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useStore } from '../store';

export default function DeleteAllTodosBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const { showBoundary } = useErrorBoundary();
  const deleteAllTodosFromApi = useStore((state) => state.deleteAllTodo);

  async function deleteAllTodos() {
    try {
      await deleteAllTodosFromApi();
      setIsOpen(false);
    } catch (err) {
      showBoundary(err);
    }
  }

  return (
    <>
      <button
        className="border small-el delete-btn shadow"
        onClick={() => setIsOpen(true)}
      >
        Delete All
      </button>

      {isOpen &&
        createPortal(
          <div>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Overlay onClick={() => setIsOpen(false)} />
              <div className="buttons-container form-index shadow border">
                <button
                  className="border shadow action-btn red"
                  onClick={() => deleteAllTodos()}
                >
                  Confirm
                </button>
                <button
                  className="border shadow action-btn"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </ErrorBoundary>
          </div>,
          document.body,
        )}
    </>
  );
}
