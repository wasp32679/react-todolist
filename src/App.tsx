import './App.css';
import OpenAddTodoFormBtn from './todo/OpenAddTodoFormButton';
import Filter from './todo/Filter';
import SortBy from './todo/Sort';
import Todolist from './todo/Todolist';
import DeleteAllTodosBtn from './todo/DeleteAllTodosButton';
import { use, useState } from 'react';
import type { ReadTodo } from './types/todo';
import { fetchTodosFromApi } from './api/api';

const todoPromise = fetchTodosFromApi();

export default function App() {
  const initialTodos = use(todoPromise);
  const [todos, setTodos] = useState<ReadTodo[]>(initialTodos);

  return (
    <div className="app-section">
      <h1>TODO APP</h1>
      <div className="top-controls">
        <OpenAddTodoFormBtn setTodos={setTodos} todos={todos} />
        <Filter />
      </div>
      <SortBy />
      <Todolist todos={todos} />
      <div className="delete-all-wrapper">
        <DeleteAllTodosBtn />
      </div>
    </div>
  );
}
