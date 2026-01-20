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
    <>
      <h1>TODO APP</h1>
      <div className="todo-popup">
        <TodoInputs />
        <AddTodoBtn />
      </div>
      {/*delete later*/}
      <p>Add Todo will open the pop up containing above inputs</p>
      <div>
        <OpenAddTodoFormBtn />
        <Filter />
      </div>
      <SortBy />
      <Todolist />
      <DeleteAllTodosBtn />
    </>
  );
}
