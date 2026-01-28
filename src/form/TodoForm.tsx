import './TodoForm.css';
import Button from '../components/Button';
import { useActionState } from 'react';
import { addTodoToApi } from '../api/api';
import type { TodoFormProps } from '../types/todo';

export default function TodoForm({ setTodos, setIsOpen }: TodoFormProps) {
  const [state, action, pending] = useActionState(
    async (_: unknown, formData: FormData) => {
      try {
        const newTodo = await addTodoToApi(formData);
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setIsOpen(false);
        return 'Todo added !';
      } catch {
        return 'Error while adding todo.';
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
          <Button
            className="border small-el add-btn shadow"
            title="Add"
            type="submit"
            disabled={pending}
          />
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
