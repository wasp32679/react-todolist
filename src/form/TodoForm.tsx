import { useActionState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useStore } from '../store';
import type { TodoFormProps } from '../types/todo';
import './TodoForm.css';

export default function TodoForm({ setIsOpen }: TodoFormProps) {
  const addTodo = useStore((state) => state.addTodo);
  const { showBoundary } = useErrorBoundary();

  const [state, action, pending] = useActionState(
    async (_: unknown, formData: FormData) => {
      try {
        await addTodo(formData);
        setIsOpen(false);
        return 'Todo added !';
      } catch (err) {
        showBoundary(err);
      }
    },
    null,
  );

  return (
    <>
      <form action={action} className="form-todo">
        <label htmlFor="title">Title :</label>
        <input
          type="text"
          id="title"
          className="shadow"
          name="title"
          required
        />
        <label htmlFor="description">Description :</label>
        <textarea
          id="description"
          className="shadow"
          name="description"
        ></textarea>
        <label htmlFor="due-date">Due-Date :</label>
        <input type="date" id="due-date" className="shadow" name="due_date" />
        <div className="form-btn">
          <button
            type="submit"
            disabled={pending}
            className="border small-el add-btn shadow"
          >
            Add
          </button>
        </div>
      </form>
      {(pending || state) && (
        <div className="state-text">
          {pending ? <div className="spinner"></div> : state}
        </div>
      )}
    </>
  );
}
