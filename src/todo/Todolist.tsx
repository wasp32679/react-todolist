import './Todolist.css';
import TodoItem from './TodoItem';
import ErrorFallback from '../components/ErrorsManagment';
import { getSortedTodos, useStore } from '../store';
import { useShallow } from 'zustand/shallow';

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
