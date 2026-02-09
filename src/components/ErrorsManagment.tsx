import type { FallbackProps } from 'react-error-boundary';
import './ErrorsManagment.css';

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';

  return (
    <div className="error-div error-index">
      <h3>Oops...</h3>
      <pre>{errorMessage}</pre>
      <button onClick={resetErrorBoundary} className="shadow">
        Close
      </button>
    </div>
  );
}
