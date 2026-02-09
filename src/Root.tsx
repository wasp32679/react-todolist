import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import ErrorFallback from './components/ErrorsManagment';
import { useStore } from './store';

export default function Root() {
  const reset = useStore((state) => state.resetTodoPromise);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
      <Suspense fallback={<div className="spinner"></div>}>
        <App />
      </Suspense>
    </ErrorBoundary>
  );
}
