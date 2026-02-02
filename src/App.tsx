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
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');

  let sortedTodos = [...todos];

  if (sort === 'name') {
    sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (sort === 'due-date') {
    sortedTodos.sort((a, b) => {
      if (!a.due_date && !b.due_date) return 0;
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      return a.due_date > b.due_date ? 1 : -1;
    });
  }

  if (filter === 'undone') {
    sortedTodos = sortedTodos.filter((t) => !t.done);
  }
  if (filter === 'done') {
    sortedTodos = sortedTodos.filter((t) => t.done);
  }

  const handleSortChange = (newSortValue: string) => {
    setSort(newSortValue);
  };

  const handleFilterChange = (newFilterValue: string) => {
    setFilter(newFilterValue);
  };

  return (
    <div className="app-section">
      <h1>TODO APP</h1>
      <div className="top-controls">
        <OpenAddTodoFormBtn setTodos={setTodos} />
        <Filter filterValue={handleFilterChange} />
      </div>
      <SortBy sortValue={handleSortChange} />
      <Todolist todos={sortedTodos} setTodos={setTodos} />
      <div className="delete-all-wrapper">
        <DeleteAllTodosBtn />
      </div>
    </div>
  );
}
