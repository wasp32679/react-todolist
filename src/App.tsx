import './App.css';
import OpenAddTodoFormBtn from './todo/OpenAddTodoFormButton';
import Filter from './todo/Filter';
import SortBy from './todo/Sort';
import Todolist from './todo/Todolist';
import DeleteAllTodosBtn from './todo/DeleteAllTodosButton';
import { use, useMemo, useState } from 'react';
import type { ReadTodo } from './types/todo';
import { fetchTodosFromApi } from './api/api';

const todoPromise = fetchTodosFromApi();

export default function App() {
  const initialTodos = use(todoPromise);
  const [todos, setTodos] = useState<ReadTodo[]>(initialTodos);
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');

  const sortedTodos = useMemo(() => {
    let filteredTodos = todos;
    if (filter === 'undone') {
      filteredTodos = todos.filter((t) => !t.done);
    } else if (filter === 'done') {
      filteredTodos = todos.filter((t) => t.done);
    }

    const sorted = [...filteredTodos];

    if (sort === 'name') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'due-date') {
      sorted.sort((a, b) => {
        if (!a.due_date && !b.due_date) return 0;
        if (!a.due_date) return 1;
        if (!b.due_date) return -1;
        return a.due_date.localeCompare(b.due_date);
      });
    }

    return sorted;
  }, [todos, sort, filter]);

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
