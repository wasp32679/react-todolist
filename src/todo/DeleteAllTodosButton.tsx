import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { useErrorBoundary } from 'react-error-boundary';
import Overlay from '../components/Overlay';
import { useStore } from '../store';
import './DeleteAllTodosButton.css';

export default function DeleteAllTodosBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const { showBoundary } = useErrorBoundary();
  const deleteAllTodos = useStore((state) => state.deleteAllTodo);

  const handleOpen = () => setIsOpen(true);
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleDeleteAll = useCallback(async () => {
    try {
      await deleteAllTodos();
      handleClose();
    } catch (err) {
      showBoundary(err);
    }
  }, [deleteAllTodos, handleClose, showBoundary]);

  return (
    <>
      <button
        className="border small-el delete-btn shadow"
        onClick={handleOpen}
      >
        Delete All
      </button>

      {isOpen &&
        createPortal(
          <div>
            <Overlay onClick={handleClose} />
            <div className="buttons-container form-index shadow border">
              <button
                className="border shadow action-btn red"
                onClick={handleDeleteAll}
              >
                Confirm
              </button>
              <button
                className="border shadow action-btn"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
