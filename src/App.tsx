import './App.css';
import TodoInputs from './form/TodoInputs';
import AddTodoBtn from './form/AddTodoFormButton';
import OpenAddTodoFormBtn from './todo/OpenAddTodoFormButton';
import Filter from './todo/Filter';
import SortBy from './todo/Sort';
import Todolist from './todo/Todolist';
import DeleteAllTodosBtn from './todo/DeleteAllTodosButton';

export default function App() {
  return (
    <div className="app-section">
      <h1>TODO APP</h1>
      <div className="todo-popup border shadow">
        <TodoInputs />
        <AddTodoBtn />
      </div>
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
