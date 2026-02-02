import { useState, type HTMLInputTypeAttribute, type ReactNode } from 'react';

interface EditableProps {
  text?: string;
  children: ReactNode;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  canClose?: boolean;
}

export default function Editable({
  text,
  children,
  placeholder,
  canClose,
}: EditableProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(false);

  const handleBlur = () => {
    if (canClose === false) {
      setError(true);
      return;
    }
    setError(false);
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <div
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              handleBlur();
            }
          }}
          onBlur={handleBlur}
        >
          {error && <p className="error-txt">This field is required</p>}
          {children}
        </div>
      ) : (
        <div onClick={() => setIsEditing(true)}>
          {text ? (
            <span className="">{text}</span>
          ) : (
            <span className="placeholder">{placeholder}</span>
          )}
        </div>
      )}
    </>
  );
}
