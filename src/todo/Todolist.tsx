import { useShallow } from 'zustand/shallow';
import ErrorFallback from '../components/ErrorsManagment';
import { getSortedTodos, useStore } from '../store';
import TodoItem from './TodoItem';
import './Todolist.css';

function TodoDisplay() {
  const { errorMsg, setErrorMsg } = useStore(
    useShallow((state) => ({
      errorMsg: state.errorMsg,
      setErrorMsg: state.setErrorMsg,
    })),
  );
  const sortedTodos = useStore(useShallow(getSortedTodos));
  function onReset() {
    setErrorMsg(null);
  }

  return (
    <>
      {errorMsg && (
        <ErrorFallback error={errorMsg} resetErrorBoundary={onReset} />
      )}
      <ul>
        {sortedTodos.map((t) => (
          <TodoItem
            key={t.id}
            title={t.title}
            content={t.content}
            date={t.due_date === null ? '' : t.due_date}
            isDone={t.done}
            todoId={t.id}
            errorMsg={errorMsg}
          />
        ))}
      </ul>
    </>
  );
}

export default function Todolist() {
  return (
    <>
      <TodoDisplay />
    </>
  );
}
