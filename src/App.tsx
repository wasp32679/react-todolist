import './App.css';
import OpenAddTodoFormBtn from './todo/OpenAddTodoFormButton';
import Filter from './todo/Filter';
import SortBy from './todo/Sort';
import Todolist from './todo/Todolist';
import DeleteAllTodosBtn from './todo/DeleteAllTodosButton';
import { use, useEffect } from 'react';
import { useStore } from './store';

export default function App() {
  const todoPromise = useStore((state) => state.todoPromise);
  const initialTodos = use(todoPromise);
  const setTodos = useStore((state) => state.setTodos);

  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos, setTodos]);

  return (
    <div className="app-section">
      <h1>TODO APP</h1>
      <div className="top-controls">
        <OpenAddTodoFormBtn />
        <Filter />
      </div>
      <SortBy />
      <Todolist />
      <div className="delete-all-wrapper">
        <DeleteAllTodosBtn />
      </div>
    </div>
  );
}
